import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://ixqjqjqjqjqjqjqjqjqj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4cWpxanFqcWpxanFqcWpxanFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5NTU2MDAsImV4cCI6MjA0OTUzMTYwMH0.example';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugEstoque() {
  console.log('🔍 Iniciando debug do estoque...');
  
  try {
    // 1. Verificar conexão
    console.log('\n1. Testando conexão com Supabase...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('produtos')
      .select('count')
      .limit(1);
    
    if (connectionError) {
      console.error('❌ Erro de conexão:', connectionError);
      return;
    }
    console.log('✅ Conexão estabelecida');

    // 2. Verificar se existem produtos
    console.log('\n2. Verificando produtos...');
    const { data: produtos, error: produtosError } = await supabase
      .from('produtos')
      .select('id, sku, nome, status')
      .limit(5);
    
    if (produtosError) {
      console.error('❌ Erro ao buscar produtos:', produtosError);
    } else {
      console.log(`✅ Encontrados ${produtos?.length || 0} produtos:`, produtos);
    }

    // 3. Verificar se existe a view vw_estoque_consolidado
    console.log('\n3. Verificando view vw_estoque_consolidado...');
    const { data: estoque, error: estoqueError } = await supabase
      .from('vw_estoque_consolidado')
      .select('*')
      .limit(5);
    
    if (estoqueError) {
      console.error('❌ Erro ao buscar estoque consolidado:', estoqueError);
    } else {
      console.log(`✅ Encontrados ${estoque?.length || 0} itens no estoque:`, estoque);
    }

    // 4. Verificar estoque_localizacao
    console.log('\n4. Verificando estoque_localizacao...');
    const { data: estoqueLocalizacao, error: estoqueLocalizacaoError } = await supabase
      .from('estoque_localizacao')
      .select('*')
      .limit(5);
    
    if (estoqueLocalizacaoError) {
      console.error('❌ Erro ao buscar estoque_localizacao:', estoqueLocalizacaoError);
    } else {
      console.log(`✅ Encontrados ${estoqueLocalizacao?.length || 0} registros em estoque_localizacao:`, estoqueLocalizacao);
    }

    // 5. Verificar lotes
    console.log('\n5. Verificando lotes...');
    const { data: lotes, error: lotesError } = await supabase
      .from('lotes')
      .select('*')
      .limit(5);
    
    if (lotesError) {
      console.error('❌ Erro ao buscar lotes:', lotesError);
    } else {
      console.log(`✅ Encontrados ${lotes?.length || 0} lotes:`, lotes);
    }

    // 6. Verificar localizações
    console.log('\n6. Verificando localizações...');
    const { data: localizacoes, error: localizacoesError } = await supabase
      .from('localizacoes')
      .select('*')
      .limit(5);
    
    if (localizacoesError) {
      console.error('❌ Erro ao buscar localizações:', localizacoesError);
    } else {
      console.log(`✅ Encontradas ${localizacoes?.length || 0} localizações:`, localizacoes);
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

debugEstoque();