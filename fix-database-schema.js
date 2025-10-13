const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function corrigirSchema() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente do Supabase não encontradas');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    console.log('🔧 Diagnosticando problemas no banco de dados...\n');
    
    // 1. Verificar se a tabela alertas_estoque existe
    console.log('🔍 Verificando tabela alertas_estoque...');
    const { data: alertas, error: alertasError } = await supabase
      .from('alertas_estoque')
      .select('id')
      .limit(1);
    
    if (alertasError && alertasError.message.includes('does not exist')) {
      console.log('❌ Tabela alertas_estoque NÃO EXISTE');
      console.log('   Isso explica o erro "Erro ao carregar alertas"');
    } else if (alertasError) {
      console.log('❌ Erro ao verificar alertas_estoque:', alertasError.message);
    } else {
      console.log('✅ Tabela alertas_estoque existe');
    }
    
    // 2. Verificar a view vw_estoque_consolidado
    console.log('\n🔍 Verificando view vw_estoque_consolidado...');
    const { data: testeView, error: testeError } = await supabase
      .from('vw_estoque_consolidado')
      .select('*')
      .limit(1);
    
    if (testeError) {
      console.log('❌ Erro na view vw_estoque_consolidado:', testeError.message);
      if (testeError.message.includes('unidade_medida')) {
        console.log('   Problema: A view está tentando acessar coluna "unidade_medida" que não existe');
        console.log('   Solução: A coluna correta é "unidade"');
      }
    } else {
      console.log('✅ View vw_estoque_consolidado funcionando');
    }
    
    // 3. Verificar estrutura da tabela produtos
    console.log('\n🔍 Verificando estrutura da tabela produtos...');
    const { data: produtos, error: produtosError } = await supabase
      .from('produtos')
      .select('sku, nome, unidade, categoria')
      .limit(1);
    
    if (produtosError) {
      console.log('❌ Erro ao verificar produtos:', produtosError.message);
    } else {
      console.log('✅ Tabela produtos acessível');
      if (produtos && produtos.length > 0) {
        console.log('📊 Estrutura confirmada:', Object.keys(produtos[0]));
      }
    }
    
    // 4. Testar consulta que está falhando nos alertas
    console.log('\n🧪 Testando consulta de alertas que está falhando...');
    const { data: testeAlertas, error: testeAlertasError } = await supabase
      .from('alertas_estoque')
      .select(`
        *,
        produtos!inner(sku, nome, categoria, unidade)
      `)
      .limit(1);
    
    if (testeAlertasError) {
      console.log('❌ Erro na consulta de alertas:', testeAlertasError.message);
      if (testeAlertasError.message.includes('unidade_medida')) {
        console.log('   🔧 SOLUÇÃO IDENTIFICADA: Alterar "unidade_medida" para "unidade" no código');
      }
    } else {
      console.log('✅ Consulta de alertas funcionando');
    }
    
    console.log('\n📋 RESUMO DOS PROBLEMAS ENCONTRADOS:');
    console.log('1. ❌ Referências incorretas a "unidade_medida" (deveria ser "unidade")');
    console.log('2. ❌ Possível falta da tabela "alertas_estoque"');
    console.log('3. ❌ View "vw_estoque_consolidado" pode ter colunas incorretas');
    
    console.log('\n🔧 CORREÇÕES NECESSÁRIAS:');
    console.log('1. Alterar todas as referências de "unidade_medida" para "unidade" no código');
    console.log('2. Verificar se as migrations foram executadas corretamente');
    console.log('3. Recriar a view com as colunas corretas');
    
  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

corrigirSchema();