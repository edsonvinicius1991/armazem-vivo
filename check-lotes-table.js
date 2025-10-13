import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLotesTable() {
  console.log('🔍 Verificando tabela de lotes...\n');

  try {
    // Verificar se há dados na tabela
    console.log('1. Verificando dados na tabela de lotes...');
    const { data: lotes, error: lotesError, count } = await supabase
      .from('lotes')
      .select('*', { count: 'exact' })
      .limit(5);

    if (lotesError) {
      console.error('❌ Erro ao consultar lotes:', lotesError.message);
      return;
    }

    console.log(`📊 Total de lotes na tabela: ${count || 0}`);

    if (lotes && lotes.length > 0) {
      console.log('\n📦 Primeiros 5 lotes encontrados:');
      lotes.forEach((lote, index) => {
        console.log(`   ${index + 1}. ID: ${lote.id}`);
        console.log(`      Número: ${lote.numero_lote || 'N/A'}`);
        console.log(`      Produto ID: ${lote.produto_id || 'N/A'}`);
        console.log(`      Quantidade Atual: ${lote.quantidade_atual || 0}`);
        console.log(`      Data Validade: ${lote.data_validade || 'N/A'}`);
        console.log(`      Status: ${lote.status || 'N/A'}`);
        console.log('      ---');
      });
    } else {
      console.log('📭 Nenhum lote encontrado na tabela');
    }

    // Verificar se há produtos para relacionar
    console.log('\n2. Verificando produtos disponíveis...');
    const { data: produtos, error: produtosError, count: produtosCount } = await supabase
      .from('produtos')
      .select('id, sku, nome', { count: 'exact' })
      .limit(3);

    if (produtosError) {
      console.error('❌ Erro ao consultar produtos:', produtosError.message);
      return;
    }

    console.log(`📊 Total de produtos na tabela: ${produtosCount || 0}`);

    if (produtos && produtos.length > 0) {
      console.log('\n📦 Primeiros 3 produtos encontrados:');
      produtos.forEach((produto, index) => {
        console.log(`   ${index + 1}. ID: ${produto.id}`);
        console.log(`      SKU: ${produto.sku}`);
        console.log(`      Nome: ${produto.nome}`);
        console.log('      ---');
      });
    } else {
      console.log('📭 Nenhum produto encontrado na tabela');
    }

    // Testar consulta da página de lotes
    console.log('\n3. Testando consulta da página de lotes...');
    const { data: lotesComProdutos, error: queryError } = await supabase
      .from('lotes')
      .select(`
        *,
        produtos (
          id,
          nome,
          sku,
          unidade
        )
      `)
      .order('created_at', { ascending: false })
      .limit(3);

    if (queryError) {
      console.error('❌ Erro na consulta da página de lotes:', queryError.message);
      console.error('   Detalhes:', queryError);
      return;
    }

    console.log(`✅ Consulta da página executada com sucesso`);
    console.log(`📊 Lotes retornados: ${lotesComProdutos?.length || 0}`);

    if (lotesComProdutos && lotesComProdutos.length > 0) {
      console.log('\n📦 Lotes com produtos:');
      lotesComProdutos.forEach((lote, index) => {
        console.log(`   ${index + 1}. Lote: ${lote.numero_lote || 'N/A'}`);
        console.log(`      Produto: ${lote.produtos?.nome || 'Produto não encontrado'}`);
        console.log(`      SKU: ${lote.produtos?.sku || 'N/A'}`);
        console.log('      ---');
      });
    }

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkLotesTable();