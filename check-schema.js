// Script para verificar a estrutura das tabelas
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jonwzrzciznkemfiviyk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvbnd6cnpjaXpua2VtZml2aXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyMjEyNjAsImV4cCI6MjA3NTc5NzI2MH0.1KS0MlUOCTzys16t7FNZ3YYm2RDtTb--s47fLLLKsfo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  try {
    console.log('🔍 Verificando estrutura das tabelas...\n');

    // Verificar produtos
    console.log('📦 Estrutura da tabela produtos:');
    const { data: produtos, error: produtosError } = await supabase
      .from('produtos')
      .select('*')
      .limit(1);
    
    if (produtosError) {
      console.log('❌ Erro:', produtosError.message);
    } else {
      console.log('✅ Colunas disponíveis:', produtos.length > 0 ? Object.keys(produtos[0]) : 'Tabela vazia');
    }

    // Verificar lotes
    console.log('\n📋 Estrutura da tabela lotes:');
    const { data: lotes, error: lotesError } = await supabase
      .from('lotes')
      .select('*')
      .limit(1);
    
    if (lotesError) {
      console.log('❌ Erro:', lotesError.message);
    } else {
      console.log('✅ Colunas disponíveis:', lotes.length > 0 ? Object.keys(lotes[0]) : 'Tabela vazia');
    }

    // Verificar estoque_localizacao
    console.log('\n📍 Estrutura da tabela estoque_localizacao:');
    const { data: estoque, error: estoqueError } = await supabase
      .from('estoque_localizacao')
      .select('*')
      .limit(1);
    
    if (estoqueError) {
      console.log('❌ Erro:', estoqueError.message);
    } else {
      console.log('✅ Colunas disponíveis:', estoque.length > 0 ? Object.keys(estoque[0]) : 'Tabela vazia');
    }

    // Verificar localizacoes
    console.log('\n🏢 Estrutura da tabela localizacoes:');
    const { data: localizacoes, error: localizacoesError } = await supabase
      .from('localizacoes')
      .select('*')
      .limit(1);
    
    if (localizacoesError) {
      console.log('❌ Erro:', localizacoesError.message);
    } else {
      console.log('✅ Colunas disponíveis:', localizacoes.length > 0 ? Object.keys(localizacoes[0]) : 'Tabela vazia');
    }

    // Contar registros existentes
    console.log('\n📊 Contagem de registros:');
    
    const { count: produtosCount } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true });
    console.log(`📦 Produtos: ${produtosCount || 0}`);

    const { count: lotesCount } = await supabase
      .from('lotes')
      .select('*', { count: 'exact', head: true });
    console.log(`📋 Lotes: ${lotesCount || 0}`);

    const { count: estoqueCount } = await supabase
      .from('estoque_localizacao')
      .select('*', { count: 'exact', head: true });
    console.log(`📍 Estoque localização: ${estoqueCount || 0}`);

    const { count: localizacoesCount } = await supabase
      .from('localizacoes')
      .select('*', { count: 'exact', head: true });
    console.log(`🏢 Localizações: ${localizacoesCount || 0}`);

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

checkSchema();