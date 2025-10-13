import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas');
  process.exit(1);
}

// Cliente Supabase com chave pública
const supabase = createClient(supabaseUrl, supabaseKey);

async function createSampleData() {
  console.log('🚀 Iniciando criação de dados de exemplo...\n');

  try {
    // Verificar se já existem dados
    console.log('1. Verificando dados existentes...');
    
    const { data: produtosExistentes } = await supabase
      .from('produtos')
      .select('id, sku, nome');

    const { data: lotesExistentes } = await supabase
      .from('lotes')
      .select('id, numero');

    console.log(`📦 Produtos existentes: ${produtosExistentes?.length || 0}`);
    console.log(`📋 Lotes existentes: ${lotesExistentes?.length || 0}`);

    if (produtosExistentes && produtosExistentes.length > 0) {
      console.log('\n✅ Já existem dados no banco!');
      console.log('🌐 Acesse http://localhost:5173 para ver os lotes na interface');
      return;
    }

    console.log('\n2. Tentando inserir dados de exemplo...');
    console.log('⚠️  Nota: Se houver erro de RLS, você precisará criar os dados através da interface web autenticada.');

    // Tentar inserir produtos
    const produtos = [
      {
        sku: 'PROD001',
        nome: 'Arroz Branco 5kg',
        descricao: 'Arroz branco tipo 1, pacote de 5kg',
        categoria: 'Alimentos',
        unidade: 'kg',
        codigo_barras: '7891234567890',
        peso_kg: 5.0,
        altura_cm: 30,
        largura_cm: 20,
        profundidade_cm: 8,
        custo_unitario: 12.50,
        preco_venda: 18.90
      },
      {
        sku: 'PROD002',
        nome: 'Feijão Preto 1kg',
        descricao: 'Feijão preto tipo 1, pacote de 1kg',
        categoria: 'Alimentos',
        unidade: 'kg',
        codigo_barras: '7891234567891',
        peso_kg: 1.0,
        altura_cm: 15,
        largura_cm: 12,
        profundidade_cm: 5,
        custo_unitario: 4.20,
        preco_venda: 6.90
      }
    ];

    const { data: produtosInseridos, error: errorProdutos } = await supabase
      .from('produtos')
      .insert(produtos)
      .select();

    if (errorProdutos) {
      console.error('❌ Erro ao inserir produtos (RLS ativo):', errorProdutos.message);
      console.log('\n📝 INSTRUÇÕES PARA CRIAR DADOS:');
      console.log('1. Acesse http://localhost:5173');
      console.log('2. Faça login na aplicação');
      console.log('3. Vá para a página de Produtos e crie alguns produtos');
      console.log('4. Depois vá para a página de Lotes e crie alguns lotes');
      console.log('\n💡 Produtos sugeridos para criar:');
      produtos.forEach(p => {
        console.log(`   - SKU: ${p.sku}, Nome: ${p.nome}, Unidade: ${p.unidade}`);
      });
      return;
    }

    console.log(`✅ ${produtosInseridos.length} produtos inseridos com sucesso`);

    // Inserir lotes
    const hoje = new Date();
    const lotes = [
      {
        numero: 'LT001-2024',
        produto_id: produtosInseridos[0].id,
        quantidade: 100,
        data_fabricacao: new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data_validade: new Date(hoje.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        fornecedor: 'Distribuidora ABC Ltda',
        custo_unitario: 12.50,
        localizacao: 'A-01-01',
        status: 'ativo',
        observacoes: 'Lote em perfeitas condições'
      },
      {
        numero: 'LT002-2024',
        produto_id: produtosInseridos[1].id,
        quantidade: 50,
        data_fabricacao: new Date(hoje.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        data_validade: new Date(hoje.getTime() + 730 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        fornecedor: 'Fornecedor XYZ S.A.',
        custo_unitario: 4.20,
        localizacao: 'B-02-03',
        status: 'ativo',
        observacoes: 'Produto de alta qualidade'
      }
    ];

    const { data: lotesInseridos, error: errorLotes } = await supabase
      .from('lotes')
      .insert(lotes)
      .select();

    if (errorLotes) {
      console.error('❌ Erro ao inserir lotes:', errorLotes.message);
      return;
    }

    console.log(`✅ ${lotesInseridos.length} lotes inseridos com sucesso`);
    console.log('\n🎉 Dados de exemplo criados com sucesso!');
    console.log('🌐 Acesse http://localhost:5173 para ver os lotes na interface');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

createSampleData();