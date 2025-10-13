// Script para verificar se as tabelas necessárias existem no Supabase
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const supabaseUrl = 'https://jonwzrzciznkemfiviyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvbnd6cnpjaXpua2VtZml2aXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjEyNjAsImV4cCI6MjA3NTc5NzI2MH0.1KS0MlUOCTzys16t7FNZ3YYm2RDtTb--s47fLLLKsfo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verificarTabelas() {
  console.log('🔍 Verificando tabelas no Supabase...\n');

  const tabelas = [
    'produtos',
    'lotes', 
    'localizacoes',
    'estoque_localizacao',
    'almoxarifados',
    'movimentacoes',
    'historico_estoque'
  ];

  const views = [
    'vw_estoque_consolidado',
    'vw_lotes_vencimento'
  ];

  // Verificar tabelas
  for (const tabela of tabelas) {
    try {
      const { data, error } = await supabase
        .from(tabela)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ Tabela '${tabela}': ${error.message}`);
      } else {
        console.log(`✅ Tabela '${tabela}': OK`);
      }
    } catch (err) {
      console.log(`❌ Tabela '${tabela}': ${err.message}`);
    }
  }

  console.log('\n🔍 Verificando views...\n');

  // Verificar views
  for (const view of views) {
    try {
      const { data, error } = await supabase
        .from(view)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ View '${view}': ${error.message}`);
      } else {
        console.log(`✅ View '${view}': OK`);
      }
    } catch (err) {
      console.log(`❌ View '${view}': ${err.message}`);
    }
  }

  // Verificar dados de exemplo
  console.log('\n🔍 Verificando dados de exemplo...\n');

  try {
    const { data: produtos, error: errorProdutos } = await supabase
      .from('produtos')
      .select('*')
      .limit(5);

    if (errorProdutos) {
      console.log(`❌ Produtos: ${errorProdutos.message}`);
    } else {
      console.log(`✅ Produtos encontrados: ${produtos?.length || 0}`);
    }

    const { data: lotes, error: errorLotes } = await supabase
      .from('lotes')
      .select('*')
      .limit(5);

    if (errorLotes) {
      console.log(`❌ Lotes: ${errorLotes.message}`);
    } else {
      console.log(`✅ Lotes encontrados: ${lotes?.length || 0}`);
    }

    const { data: estoque, error: errorEstoque } = await supabase
      .from('estoque_localizacao')
      .select('*')
      .limit(5);

    if (errorEstoque) {
      console.log(`❌ Estoque localização: ${errorEstoque.message}`);
    } else {
      console.log(`✅ Registros de estoque encontrados: ${estoque?.length || 0}`);
    }

  } catch (err) {
    console.log(`❌ Erro ao verificar dados: ${err.message}`);
  }
}

verificarTabelas().catch(console.error);