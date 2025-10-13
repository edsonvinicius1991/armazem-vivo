-- Script para criar tabelas e views faltantes

-- 1. TABELA DE HISTÓRICO DE ESTOQUE
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

-- 2. VIEW PARA ESTOQUE CONSOLIDADO
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

-- 3. VIEW PARA PRODUTOS COM LOTES VENCIDOS/VENCENDO
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
GROUP BY l.id, l.numero_lote, l.produto_id, p.sku, p.nome, l.data_validade
HAVING COALESCE(SUM(el.quantidade), 0) > 0;

-- 3. Inserir alguns dados de exemplo para teste
INSERT INTO alertas_estoque (produto_id, tipo_alerta, nivel_criticidade, quantidade_atual, quantidade_referencia, mensagem)
SELECT 
    p.id,
    'estoque_minimo',
    'alto',
    0,
    p.estoque_minimo,
    'Produto com estoque abaixo do mínimo'
FROM produtos p
WHERE p.estoque_minimo > 0
  AND NOT EXISTS (
    SELECT 1 FROM alertas_estoque a 
    WHERE a.produto_id = p.id AND a.tipo_alerta = 'estoque_minimo' AND a.ativo = true
  )
LIMIT 3;