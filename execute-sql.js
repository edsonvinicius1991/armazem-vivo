// Script para executar SQL diretamente no Supabase
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://jonwzrzciznkemfiviyk.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSQLCommands() {
  try {
    console.log('🔧 Executando comandos SQL...\n');

    // 1. Criar tabela historico_estoque
    console.log('📋 Criando tabela historico_estoque...');
    const createHistoricoSQL = `
      CREATE TABLE IF NOT EXISTS historico_estoque (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
        lote_id UUID REFERENCES lotes(id) ON DELETE CASCADE,
        localizacao_id UUID REFERENCES localizacoes(id) ON DELETE CASCADE,
        quantidade_anterior INTEGER NOT NULL,
        quantidade_nova INTEGER NOT NULL,
        diferenca INTEGER NOT NULL,
        tipo_operacao VARCHAR(50) NOT NULL,
        documento_referencia VARCHAR(100),
        usuario_id UUID REFERENCES profiles(id),
        data_operacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        observacoes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const { error: historicoError } = await supabase.rpc('exec_sql', { 
      sql_query: createHistoricoSQL 
    });
    
    if (historicoError) {
      console.log('❌ Erro ao criar historico_estoque:', historicoError.message);
    } else {
      console.log('✅ Tabela historico_estoque criada');
    }

    // 2. Criar view vw_estoque_consolidado
    console.log('\n📊 Criando view vw_estoque_consolidado...');
    const createEstoqueViewSQL = `
      CREATE OR REPLACE VIEW vw_estoque_consolidado AS
      SELECT 
        p.id as produto_id,
        p.sku,
        p.nome as produto_nome,
        p.categoria,
        p.unidade as unidade_medida,
        p.estoque_minimo,
        p.estoque_maximo,
        p.preco_venda as valor_unitario,
        COALESCE(SUM(el.quantidade), 0) as quantidade_total,
        COALESCE(SUM(el.quantidade * p.preco_venda), 0) as valor_total_estoque,
        COUNT(DISTINCT el.localizacao_id) as localizacoes_ocupadas,
        COUNT(DISTINCT el.lote_id) as lotes_ativos,
        CASE 
          WHEN COALESCE(SUM(el.quantidade), 0) <= p.estoque_minimo THEN 'CRITICO'
          WHEN COALESCE(SUM(el.quantidade), 0) <= (p.estoque_minimo * 1.2) THEN 'BAIXO'
          WHEN COALESCE(SUM(el.quantidade), 0) >= p.estoque_maximo THEN 'EXCESSO'
          ELSE 'NORMAL'
        END as status_estoque,
        MAX(el.updated_at) as ultima_movimentacao
      FROM produtos p
      LEFT JOIN estoque_localizacao el ON p.id = el.produto_id
      GROUP BY p.id, p.sku, p.nome, p.categoria, p.unidade, 
               p.estoque_minimo, p.estoque_maximo, p.preco_venda;
    `;

    const { error: estoqueViewError } = await supabase.rpc('exec_sql', { 
      sql_query: createEstoqueViewSQL 
    });
    
    if (estoqueViewError) {
      console.log('❌ Erro ao criar vw_estoque_consolidado:', estoqueViewError.message);
    } else {
      console.log('✅ View vw_estoque_consolidado criada');
    }

    // 3. Criar view vw_lotes_vencimento
    console.log('\n📅 Criando view vw_lotes_vencimento...');
    const createLotesViewSQL = `
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
      WHERE l.bloqueado = false 
        AND l.data_validade IS NOT NULL
      GROUP BY l.id, l.numero_lote, l.produto_id, p.sku, p.nome, l.data_validade
      HAVING COALESCE(SUM(el.quantidade), 0) > 0;
    `;

    const { error: lotesViewError } = await supabase.rpc('exec_sql', { 
      sql_query: createLotesViewSQL 
    });
    
    if (lotesViewError) {
      console.log('❌ Erro ao criar vw_lotes_vencimento:', lotesViewError.message);
    } else {
      console.log('✅ View vw_lotes_vencimento criada');
    }

    console.log('\n🎉 Execução concluída!');

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

executeSQLCommands();