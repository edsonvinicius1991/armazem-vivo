// Teste específico para simular o hook useEstoque
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testEstoqueHook() {
  console.log('🧪 Testando exatamente o que o hook useEstoque faz...\n');
  
  try {
    // Simular exatamente a query do hook
    console.log('1. Executando query da view vw_estoque_consolidado...');
    
    let query = supabase
      .from('vw_estoque_consolidado')
      .select('*')
      .order('produto_nome');

    const { data, error } = await query;

    if (error) {
      console.error('❌ Erro na query:', error);
      console.log('Detalhes do erro:', JSON.stringify(error, null, 2));
      return;
    }

    console.log(`✅ Query executada com sucesso!`);
    console.log(`📊 Registros encontrados: ${data?.length || 0}`);
    
    if (data && data.length > 0) {
      console.log('\n📋 Primeiros 3 registros:');
      data.slice(0, 3).forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.produto_nome} (${item.sku})`);
        console.log(`   Categoria: ${item.categoria}`);
        console.log(`   Quantidade: ${item.quantidade_total}`);
        console.log(`   Status: ${item.status_estoque}`);
        console.log(`   Valor Total: R$ ${item.valor_total_estoque}`);
      });
      
      console.log('\n🔍 Verificando estrutura do primeiro registro:');
      console.log('Campos disponíveis:', Object.keys(data[0]));
      
      // Verificar se todos os campos esperados estão presentes
      const camposEsperados = [
        'produto_id', 'sku', 'produto_nome', 'categoria', 'unidade_medida',
        'estoque_minimo', 'estoque_maximo', 'valor_unitario', 'quantidade_total',
        'valor_total_estoque', 'localizacoes_ocupadas', 'lotes_ativos',
        'status_estoque', 'ultima_movimentacao'
      ];
      
      const camposFaltando = camposEsperados.filter(campo => !(campo in data[0]));
      
      if (camposFaltando.length > 0) {
        console.log('⚠️  Campos faltando:', camposFaltando);
      } else {
        console.log('✅ Todos os campos esperados estão presentes');
      }
      
    } else {
      console.log('⚠️  Nenhum registro encontrado na view');
      
      // Verificar se a view existe
      console.log('\n🔍 Verificando se a view existe...');
      const { data: viewData, error: viewError } = await supabase
        .rpc('check_view_exists', { view_name: 'vw_estoque_consolidado' })
        .single();
        
      if (viewError) {
        console.log('❌ Erro ao verificar view:', viewError.message);
      }
    }
    
    // Testar com filtros (como o componente faz)
    console.log('\n2. Testando com filtros...');
    
    const { data: filteredData, error: filterError } = await supabase
      .from('vw_estoque_consolidado')
      .select('*')
      .order('produto_nome')
      .limit(5);
      
    if (filterError) {
      console.error('❌ Erro com filtros:', filterError);
    } else {
      console.log(`✅ Query com filtros: ${filteredData?.length || 0} registros`);
    }
    
  } catch (err) {
    console.error('❌ Erro inesperado:', err);
  }
}

async function testAuth() {
  console.log('\n🔐 Testando autenticação...');
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('⚠️  Não autenticado:', error.message);
      console.log('💡 Isso pode ser normal se não há autenticação obrigatória');
    } else if (user) {
      console.log('✅ Usuário autenticado:', user.email);
    } else {
      console.log('⚠️  Nenhum usuário autenticado');
      console.log('💡 Verificar se RLS permite acesso anônimo');
    }
  } catch (err) {
    console.log('❌ Erro ao verificar autenticação:', err.message);
  }
}

async function main() {
  await testAuth();
  await testEstoqueHook();
  
  console.log('\n🎯 Conclusões:');
  console.log('- Se há dados mas a página está em branco, o problema pode ser:');
  console.log('  1. Erro de JavaScript no frontend (verificar console do navegador)');
  console.log('  2. Problema de renderização no React');
  console.log('  3. Estado não sendo atualizado corretamente');
  console.log('  4. Problema de autenticação/RLS');
  console.log('\n- Próximos passos:');
  console.log('  1. Verificar console do navegador (F12)');
  console.log('  2. Adicionar mais logs no componente React');
  console.log('  3. Verificar se useEffect está sendo executado');
}

main().catch(console.error);