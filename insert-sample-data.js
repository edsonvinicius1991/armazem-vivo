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

async function insertSampleData() {
  console.log('📦 Inserindo dados de exemplo...\n');

  try {
    // Inserir produtos de exemplo
    console.log('1. Inserindo produtos de exemplo...');
    
    const produtos = [
      {
        sku: 'PROD001',
        nome: 'Paracetamol 500mg',
        descricao: 'Analgésico e antitérmico',
        categoria: 'Medicamentos',
        unidade: 'COMPRIMIDO',
        codigo_barras: '7891234567890',
        peso_kg: 0.001,
        altura_cm: 1,
        largura_cm: 1,
        profundidade_cm: 0.5,
        custo_unitario: 0.15,
        preco_venda: 0.25
      },
      {
        sku: 'PROD002',
        nome: 'Dipirona 500mg',
        descricao: 'Analgésico e antitérmico',
        categoria: 'Medicamentos',
        unidade: 'COMPRIMIDO',
        codigo_barras: '7891234567891',
        peso_kg: 0.001,
        altura_cm: 1,
        largura_cm: 1,
        profundidade_cm: 0.5,
        custo_unitario: 0.12,
        preco_venda: 0.20
      },
      {
        sku: 'PROD003',
        nome: 'Ibuprofeno 600mg',
        descricao: 'Anti-inflamatório',
        categoria: 'Medicamentos',
        unidade: 'COMPRIMIDO',
        codigo_barras: '7891234567892',
        peso_kg: 0.002,
        altura_cm: 1.2,
        largura_cm: 1.2,
        profundidade_cm: 0.6,
        custo_unitario: 0.30,
        preco_venda: 0.50
      },
      {
        sku: 'PROD004',
        nome: 'Soro Fisiológico 500ml',
        descricao: 'Solução salina estéril',
        categoria: 'Soluções',
        unidade: 'FRASCO',
        codigo_barras: '7891234567893',
        peso_kg: 0.5,
        altura_cm: 15,
        largura_cm: 8,
        profundidade_cm: 8,
        custo_unitario: 2.50,
        preco_venda: 4.00
      },
      {
        sku: 'PROD005',
        nome: 'Gaze Estéril 10x10cm',
        descricao: 'Gaze estéril para curativos',
        categoria: 'Material Hospitalar',
        unidade: 'PACOTE',
        codigo_barras: '7891234567894',
        peso_kg: 0.05,
        altura_cm: 2,
        largura_cm: 12,
        profundidade_cm: 12,
        custo_unitario: 1.20,
        preco_venda: 2.00
      }
    ];

    const { data: produtosInseridos, error: produtosError } = await supabase
      .from('produtos')
      .insert(produtos)
      .select();

    if (produtosError) {
      console.error('❌ Erro ao inserir produtos:', produtosError.message);
      return;
    }

    console.log(`✅ ${produtosInseridos.length} produtos inseridos com sucesso`);

    // Inserir lotes de exemplo
    console.log('\n2. Inserindo lotes de exemplo...');
    
    const lotes = [
      {
        produto_id: produtosInseridos[0].id, // Paracetamol
        numero_lote: 'LT001-2024',
        data_fabricacao: '2024-01-15',
        data_validade: '2026-01-15',
        quantidade_inicial: 1000,
        quantidade_atual: 850,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[0].id, // Paracetamol
        numero_lote: 'LT002-2024',
        data_fabricacao: '2024-03-10',
        data_validade: '2026-03-10',
        quantidade_inicial: 500,
        quantidade_atual: 500,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[1].id, // Dipirona
        numero_lote: 'LT003-2024',
        data_fabricacao: '2024-02-20',
        data_validade: '2026-02-20',
        quantidade_inicial: 750,
        quantidade_atual: 600,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[2].id, // Ibuprofeno
        numero_lote: 'LT004-2024',
        data_fabricacao: '2024-01-05',
        data_validade: '2025-01-05',
        quantidade_inicial: 300,
        quantidade_atual: 50,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[3].id, // Soro Fisiológico
        numero_lote: 'LT005-2024',
        data_fabricacao: '2024-04-01',
        data_validade: '2027-04-01',
        quantidade_inicial: 200,
        quantidade_atual: 180,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[4].id, // Gaze
        numero_lote: 'LT006-2024',
        data_fabricacao: '2024-03-15',
        data_validade: '2029-03-15',
        quantidade_inicial: 100,
        quantidade_atual: 75,
        bloqueado: false
      },
      {
        produto_id: produtosInseridos[2].id, // Ibuprofeno (lote vencido)
        numero_lote: 'LT007-2023',
        data_fabricacao: '2023-06-01',
        data_validade: '2024-06-01',
        quantidade_inicial: 200,
        quantidade_atual: 200,
        bloqueado: true,
        motivo_bloqueio: 'Produto vencido'
      }
    ];

    const { data: lotesInseridos, error: lotesError } = await supabase
      .from('lotes')
      .insert(lotes)
      .select();

    if (lotesError) {
      console.error('❌ Erro ao inserir lotes:', lotesError.message);
      return;
    }

    console.log(`✅ ${lotesInseridos.length} lotes inseridos com sucesso`);

    // Verificar dados inseridos
    console.log('\n3. Verificando dados inseridos...');
    
    const { data: verificacaoLotes, error: verificacaoError } = await supabase
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
      .order('created_at', { ascending: false });

    if (verificacaoError) {
      console.error('❌ Erro na verificação:', verificacaoError.message);
      return;
    }

    console.log(`📊 Total de lotes no banco: ${verificacaoLotes.length}`);
    
    if (verificacaoLotes.length > 0) {
      console.log('\n📦 Lotes inseridos:');
      verificacaoLotes.forEach((lote, index) => {
        console.log(`   ${index + 1}. ${lote.numero_lote}`);
        console.log(`      Produto: ${lote.produtos?.nome || 'N/A'}`);
        console.log(`      SKU: ${lote.produtos?.sku || 'N/A'}`);
        console.log(`      Quantidade: ${lote.quantidade_atual}/${lote.quantidade_inicial}`);
        console.log(`      Validade: ${lote.data_validade || 'N/A'}`);
        console.log(`      Status: ${lote.bloqueado ? 'Bloqueado' : 'Ativo'}`);
        console.log('      ---');
      });
    }

    console.log('\n🎉 Dados de exemplo inseridos com sucesso!');
    console.log('   Agora você pode acessar a página de Lotes para visualizar os dados.');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

insertSampleData();