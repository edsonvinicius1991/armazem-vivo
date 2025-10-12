-- =====================================================
-- SISTEMA DE CONTROLE DE ESTOQUE AVANÇADO
-- Data: 2025-01-15
-- Descrição: Implementa controle de estoque integrado com alertas automáticos
-- =====================================================

-- =====================================================
-- 1. TABELA DE ALERTAS DE ESTOQUE
-- =====================================================

CREATE TABLE IF NOT EXISTS alertas_estoque (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    tipo_alerta VARCHAR(50) NOT NULL, -- 'estoque_minimo', 'estoque_maximo', 'produto_vencido', 'produto_vencendo'
    nivel_criticidade VARCHAR(20) DEFAULT 'medio', -- 'baixo', 'medio', 'alto', 'critico'
    quantidade_atual INTEGER NOT NULL,
    quantidade_referencia INTEGER, -- estoque_minimo ou estoque_maximo
    mensagem TEXT NOT NULL,
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_resolucao TIMESTAMP WITH TIME ZONE,
    resolvido_por UUID REFERENCES profiles(id),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. TABELA DE HISTÓRICO DE ESTOQUE
-- =====================================================

CREATE TABLE IF NOT EXISTS historico_estoque (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    lote_id UUID REFERENCES lotes(id) ON DELETE CASCADE,
    localizacao_id UUID REFERENCES localizacoes(id) ON DELETE CASCADE,
    quantidade_anterior INTEGER NOT NULL,
    quantidade_nova INTEGER NOT NULL,
    diferenca INTEGER NOT NULL,
    tipo_operacao VARCHAR(50) NOT NULL, -- 'entrada', 'saida', 'transferencia', 'ajuste', 'inventario'
    documento_referencia VARCHAR(100),
    usuario_id UUID REFERENCES profiles(id),
    data_operacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. VIEW PARA ESTOQUE CONSOLIDADO
-- =====================================================

CREATE OR REPLACE VIEW vw_estoque_consolidado AS
SELECT 
    p.id as produto_id,
    p.sku,
    p.nome as produto_nome,
    p.categoria,
    p.unidade_medida,
    p.estoque_minimo,
    p.estoque_maximo,
    p.valor_unitario,
    COALESCE(SUM(el.quantidade), 0) as quantidade_total,
    COALESCE(SUM(el.quantidade * p.valor_unitario), 0) as valor_total_estoque,
    COUNT(DISTINCT el.localizacao_id) as localizacoes_ocupadas,
    COUNT(DISTINCT el.lote_id) as lotes_ativos,
    CASE 
        WHEN COALESCE(SUM(el.quantidade), 0) <= p.estoque_minimo THEN 'CRITICO'
        WHEN COALESCE(SUM(el.quantidade), 0) <= (p.estoque_minimo * 1.2) THEN 'BAIXO'
        WHEN COALESCE(SUM(el.quantidade), 0) >= p.estoque_maximo THEN 'EXCESSO'
        ELSE 'NORMAL'
    END as status_estoque,
    MAX(el.data_ultima_movimentacao) as ultima_movimentacao
FROM produtos p
LEFT JOIN estoque_localizacao el ON p.id = el.produto_id
WHERE p.status = 'ativo'
GROUP BY p.id, p.sku, p.nome, p.categoria, p.unidade_medida, 
         p.estoque_minimo, p.estoque_maximo, p.valor_unitario;

-- =====================================================
-- 4. VIEW PARA PRODUTOS COM LOTES VENCIDOS/VENCENDO
-- =====================================================

CREATE OR REPLACE VIEW vw_lotes_vencimento AS
SELECT 
    l.id as lote_id,
    l.numero_lote,
    l.produto_id,
    p.sku,
    p.nome as produto_nome,
    l.data_validade,
    COALESCE(SUM(el.quantidade), 0) as quantidade_total,
    CASE 
        WHEN l.data_validade < CURRENT_DATE THEN 'VENCIDO'
        WHEN l.data_validade <= CURRENT_DATE + INTERVAL '30 days' THEN 'VENCENDO_30_DIAS'
        WHEN l.data_validade <= CURRENT_DATE + INTERVAL '60 days' THEN 'VENCENDO_60_DIAS'
        ELSE 'NORMAL'
    END as status_vencimento,
    l.data_validade - CURRENT_DATE as dias_para_vencimento
FROM lotes l
INNER JOIN produtos p ON l.produto_id = p.id
LEFT JOIN estoque_localizacao el ON l.id = el.lote_id
WHERE l.status = 'disponivel' 
  AND l.data_validade IS NOT NULL
  AND COALESCE(SUM(el.quantidade), 0) > 0
GROUP BY l.id, l.numero_lote, l.produto_id, p.sku, p.nome, l.data_validade;

-- =====================================================
-- 5. FUNÇÃO PARA CALCULAR ESTOQUE TOTAL DE UM PRODUTO
-- =====================================================

CREATE OR REPLACE FUNCTION calcular_estoque_produto(produto_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
    estoque_total INTEGER;
BEGIN
    SELECT COALESCE(SUM(quantidade), 0)
    INTO estoque_total
    FROM estoque_localizacao
    WHERE produto_id = produto_uuid;
    
    RETURN estoque_total;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. FUNÇÃO PARA GERAR ALERTAS DE ESTOQUE
-- =====================================================

CREATE OR REPLACE FUNCTION gerar_alertas_estoque()
RETURNS VOID AS $$
DECLARE
    produto_rec RECORD;
    estoque_atual INTEGER;
    alerta_existente INTEGER;
BEGIN
    -- Limpar alertas antigos resolvidos (mais de 30 dias)
    DELETE FROM alertas_estoque 
    WHERE data_resolucao IS NOT NULL 
      AND data_resolucao < NOW() - INTERVAL '30 days';
    
    -- Verificar produtos com estoque baixo
    FOR produto_rec IN 
        SELECT id, sku, nome, estoque_minimo, estoque_maximo
        FROM produtos 
        WHERE status = 'ativo' AND estoque_minimo > 0
    LOOP
        estoque_atual := calcular_estoque_produto(produto_rec.id);
        
        -- Verificar se já existe alerta ativo para estoque mínimo
        SELECT COUNT(*) INTO alerta_existente
        FROM alertas_estoque
        WHERE produto_id = produto_rec.id 
          AND tipo_alerta = 'estoque_minimo'
          AND ativo = true;
        
        -- Criar alerta se estoque está abaixo do mínimo e não existe alerta ativo
        IF estoque_atual <= produto_rec.estoque_minimo AND alerta_existente = 0 THEN
            INSERT INTO alertas_estoque (
                produto_id, tipo_alerta, nivel_criticidade, 
                quantidade_atual, quantidade_referencia, mensagem
            ) VALUES (
                produto_rec.id, 
                'estoque_minimo',
                CASE 
                    WHEN estoque_atual = 0 THEN 'critico'
                    WHEN estoque_atual <= (produto_rec.estoque_minimo * 0.5) THEN 'alto'
                    ELSE 'medio'
                END,
                estoque_atual,
                produto_rec.estoque_minimo,
                FORMAT('Produto %s (%s) com estoque baixo: %s unidades (mínimo: %s)', 
                       produto_rec.nome, produto_rec.sku, estoque_atual, produto_rec.estoque_minimo)
            );
        END IF;
        
        -- Resolver alerta se estoque voltou ao normal
        IF estoque_atual > produto_rec.estoque_minimo AND alerta_existente > 0 THEN
            UPDATE alertas_estoque 
            SET ativo = false, data_resolucao = NOW()
            WHERE produto_id = produto_rec.id 
              AND tipo_alerta = 'estoque_minimo'
              AND ativo = true;
        END IF;
        
        -- Verificar estoque máximo (se definido)
        IF produto_rec.estoque_maximo IS NOT NULL THEN
            SELECT COUNT(*) INTO alerta_existente
            FROM alertas_estoque
            WHERE produto_id = produto_rec.id 
              AND tipo_alerta = 'estoque_maximo'
              AND ativo = true;
            
            IF estoque_atual >= produto_rec.estoque_maximo AND alerta_existente = 0 THEN
                INSERT INTO alertas_estoque (
                    produto_id, tipo_alerta, nivel_criticidade,
                    quantidade_atual, quantidade_referencia, mensagem
                ) VALUES (
                    produto_rec.id,
                    'estoque_maximo',
                    'medio',
                    estoque_atual,
                    produto_rec.estoque_maximo,
                    FORMAT('Produto %s (%s) com estoque excessivo: %s unidades (máximo: %s)',
                           produto_rec.nome, produto_rec.sku, estoque_atual, produto_rec.estoque_maximo)
                );
            END IF;
            
            IF estoque_atual < produto_rec.estoque_maximo AND alerta_existente > 0 THEN
                UPDATE alertas_estoque 
                SET ativo = false, data_resolucao = NOW()
                WHERE produto_id = produto_rec.id 
                  AND tipo_alerta = 'estoque_maximo'
                  AND ativo = true;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 7. TRIGGER PARA ATUALIZAR ESTOQUE AUTOMATICAMENTE
-- =====================================================

CREATE OR REPLACE FUNCTION trigger_atualizar_estoque()
RETURNS TRIGGER AS $$
BEGIN
    -- Registrar no histórico
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO historico_estoque (
            produto_id, lote_id, localizacao_id,
            quantidade_anterior, quantidade_nova, diferenca,
            tipo_operacao, usuario_id
        ) VALUES (
            NEW.produto_id, NEW.lote_id, NEW.localizacao_id,
            OLD.quantidade, NEW.quantidade, NEW.quantidade - OLD.quantidade,
            'ajuste', auth.uid()
        );
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO historico_estoque (
            produto_id, lote_id, localizacao_id,
            quantidade_anterior, quantidade_nova, diferenca,
            tipo_operacao, usuario_id
        ) VALUES (
            NEW.produto_id, NEW.lote_id, NEW.localizacao_id,
            0, NEW.quantidade, NEW.quantidade,
            'entrada', auth.uid()
        );
    END IF;
    
    -- Atualizar timestamp da última movimentação
    UPDATE estoque_localizacao 
    SET data_ultima_movimentacao = NOW(), updated_at = NOW()
    WHERE id = NEW.id;
    
    -- Gerar alertas de estoque
    PERFORM gerar_alertas_estoque();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger
DROP TRIGGER IF EXISTS trigger_estoque_atualizado ON estoque_localizacao;
CREATE TRIGGER trigger_estoque_atualizado
    AFTER INSERT OR UPDATE ON estoque_localizacao
    FOR EACH ROW
    EXECUTE FUNCTION trigger_atualizar_estoque();

-- =====================================================
-- 8. TRIGGER PARA MOVIMENTAÇÕES
-- =====================================================

CREATE OR REPLACE FUNCTION trigger_processar_movimentacao()
RETURNS TRIGGER AS $$
DECLARE
    estoque_origem RECORD;
    estoque_destino RECORD;
BEGIN
    -- Processar movimentação baseada no tipo
    CASE NEW.tipo
        WHEN 'entrada' THEN
            -- Atualizar estoque de destino
            INSERT INTO estoque_localizacao (produto_id, lote_id, localizacao_id, quantidade)
            VALUES (NEW.produto_id, NEW.lote_id, NEW.localizacao_destino_id, NEW.quantidade)
            ON CONFLICT (produto_id, lote_id, localizacao_id)
            DO UPDATE SET 
                quantidade = estoque_localizacao.quantidade + NEW.quantidade,
                data_ultima_movimentacao = NOW(),
                updated_at = NOW();
                
        WHEN 'saida' THEN
            -- Reduzir estoque de origem
            UPDATE estoque_localizacao 
            SET quantidade = quantidade - NEW.quantidade,
                data_ultima_movimentacao = NOW(),
                updated_at = NOW()
            WHERE produto_id = NEW.produto_id 
              AND lote_id = NEW.lote_id 
              AND localizacao_id = NEW.localizacao_origem_id;
              
        WHEN 'transferencia' THEN
            -- Reduzir estoque de origem
            UPDATE estoque_localizacao 
            SET quantidade = quantidade - NEW.quantidade,
                data_ultima_movimentacao = NOW(),
                updated_at = NOW()
            WHERE produto_id = NEW.produto_id 
              AND lote_id = NEW.lote_id 
              AND localizacao_id = NEW.localizacao_origem_id;
            
            -- Aumentar estoque de destino
            INSERT INTO estoque_localizacao (produto_id, lote_id, localizacao_id, quantidade)
            VALUES (NEW.produto_id, NEW.lote_id, NEW.localizacao_destino_id, NEW.quantidade)
            ON CONFLICT (produto_id, lote_id, localizacao_id)
            DO UPDATE SET 
                quantidade = estoque_localizacao.quantidade + NEW.quantidade,
                data_ultima_movimentacao = NOW(),
                updated_at = NOW();
                
        WHEN 'ajuste' THEN
            -- Ajustar estoque diretamente
            UPDATE estoque_localizacao 
            SET quantidade = NEW.quantidade,
                data_ultima_movimentacao = NOW(),
                updated_at = NOW()
            WHERE produto_id = NEW.produto_id 
              AND lote_id = NEW.lote_id 
              AND localizacao_id = COALESCE(NEW.localizacao_destino_id, NEW.localizacao_origem_id);
    END CASE;
    
    -- Registrar no histórico
    INSERT INTO historico_estoque (
        produto_id, lote_id, localizacao_id,
        quantidade_anterior, quantidade_nova, diferenca,
        tipo_operacao, documento_referencia, usuario_id, observacoes
    ) VALUES (
        NEW.produto_id, NEW.lote_id, 
        COALESCE(NEW.localizacao_destino_id, NEW.localizacao_origem_id),
        0, NEW.quantidade, NEW.quantidade,
        NEW.tipo::text, NEW.documento_referencia, NEW.usuario_id, NEW.motivo
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para movimentações
DROP TRIGGER IF EXISTS trigger_movimentacao_processada ON movimentacoes;
CREATE TRIGGER trigger_movimentacao_processada
    AFTER INSERT ON movimentacoes
    FOR EACH ROW
    EXECUTE FUNCTION trigger_processar_movimentacao();

-- =====================================================
-- 9. ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para alertas
CREATE INDEX IF NOT EXISTS idx_alertas_produto_tipo ON alertas_estoque(produto_id, tipo_alerta);
CREATE INDEX IF NOT EXISTS idx_alertas_ativo ON alertas_estoque(ativo);
CREATE INDEX IF NOT EXISTS idx_alertas_criticidade ON alertas_estoque(nivel_criticidade);
CREATE INDEX IF NOT EXISTS idx_alertas_data_criacao ON alertas_estoque(data_criacao);

-- Índices para histórico
CREATE INDEX IF NOT EXISTS idx_historico_produto_data ON historico_estoque(produto_id, data_operacao);
CREATE INDEX IF NOT EXISTS idx_historico_tipo_operacao ON historico_estoque(tipo_operacao);
CREATE INDEX IF NOT EXISTS idx_historico_usuario ON historico_estoque(usuario_id);

-- Índices compostos para consultas frequentes
CREATE INDEX IF NOT EXISTS idx_estoque_produto_lote_loc ON estoque_localizacao(produto_id, lote_id, localizacao_id);
CREATE INDEX IF NOT EXISTS idx_produtos_estoque_status ON produtos(estoque_minimo, status) WHERE estoque_minimo > 0;

-- =====================================================
-- 10. POLÍTICAS RLS
-- =====================================================

-- Habilitar RLS
ALTER TABLE alertas_estoque ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_estoque ENABLE ROW LEVEL SECURITY;

-- Políticas para alertas
CREATE POLICY IF NOT EXISTS "Usuários autenticados podem ver alertas" ON alertas_estoque
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Usuários autenticados podem resolver alertas" ON alertas_estoque
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Políticas para histórico
CREATE POLICY IF NOT EXISTS "Usuários autenticados podem ver histórico" ON historico_estoque
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 11. FUNÇÃO PARA EXECUTAR VERIFICAÇÃO PERIÓDICA
-- =====================================================

-- Esta função deve ser chamada periodicamente (ex: via cron job)
CREATE OR REPLACE FUNCTION executar_verificacao_estoque()
RETURNS TEXT AS $$
DECLARE
    alertas_criados INTEGER := 0;
    alertas_resolvidos INTEGER := 0;
BEGIN
    -- Executar verificação de alertas
    PERFORM gerar_alertas_estoque();
    
    -- Contar alertas criados hoje
    SELECT COUNT(*) INTO alertas_criados
    FROM alertas_estoque
    WHERE DATE(data_criacao) = CURRENT_DATE;
    
    -- Contar alertas resolvidos hoje
    SELECT COUNT(*) INTO alertas_resolvidos
    FROM alertas_estoque
    WHERE DATE(data_resolucao) = CURRENT_DATE;
    
    RETURN FORMAT('Verificação concluída. Alertas criados: %s, Alertas resolvidos: %s', 
                  alertas_criados, alertas_resolvidos);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 12. COMENTÁRIOS E DOCUMENTAÇÃO
-- =====================================================

COMMENT ON TABLE alertas_estoque IS 'Tabela para gerenciar alertas automáticos de estoque mínimo/máximo e vencimento';
COMMENT ON TABLE historico_estoque IS 'Histórico completo de todas as movimentações de estoque';
COMMENT ON VIEW vw_estoque_consolidado IS 'View consolidada com informações de estoque por produto';
COMMENT ON VIEW vw_lotes_vencimento IS 'View para monitorar lotes próximos ao vencimento';
COMMENT ON FUNCTION calcular_estoque_produto IS 'Calcula o estoque total de um produto em todas as localizações';
COMMENT ON FUNCTION gerar_alertas_estoque IS 'Gera alertas automáticos baseados em regras de estoque mínimo/máximo';
COMMENT ON FUNCTION executar_verificacao_estoque IS 'Função principal para execução periódica de verificações de estoque';