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

async function insertSampleDataSQL() {
  console.log('📦 Inserindo dados de exemplo via SQL...\n');

  try {
    // SQL para inserir produtos
    const sqlProdutos = `
      INSERT INTO produtos (sku, nome, descricao, categoria, unidade, codigo_barras, peso_kg, altura_cm, largura_cm, profundidade_cm, custo_unitario, preco_venda)
      VALUES 
        ('PROD001', 'Paracetamol 500mg', 'Analgésico e antitérmico', 'Medicamentos', 'COMPRIMIDO', '7891234567890', 0.001, 1, 1, 0.5, 0.15, 0.25),
        ('PROD002', 'Dipirona 500mg', 'Analgésico e antitérmico', 'Medicamentos', 'COMPRIMIDO', '7891234567891', 0.001, 1, 1, 0.5, 0.12, 0.20),
        ('PROD003', 'Ibuprofeno 600mg', 'Anti-inflamatório', 'Medicamentos', 'COMPRIMIDO', '7891234567892', 0.002, 1.2, 1.2, 0.6, 0.30, 0.50),
        ('PROD004', 'Soro Fisiológico 500ml', 'Solução salina estéril', 'Soluções', 'FRASCO', '7891234567893', 0.5, 15, 8, 8, 2.50, 4.00),
        ('PROD005', 'Gaze Estéril 10x10cm', 'Gaze estéril para curativos', 'Material Hospitalar', 'PACOTE', '7891234567894', 0.05, 2, 12, 12, 1.20, 2.00)
      ON CONFLICT (sku) DO NOTHING
      RETURNING id, sku, nome;
    `;

    console.log('1. Inserindo produtos...');
    const { data: produtosResult, error: produtosError } = await supabase.rpc('exec_sql', { 
      sql_query: sqlProdutos 
    });

    if (produtosError) {
      console.error('❌ Erro ao inserir produtos:', produtosError.message);
      
      // Tentar inserção direta se RPC não funcionar
      console.log('   Tentando inserção direta...');
      const { data: produtosDireto, error: produtosDiretoError } = await supabase
        .from('produtos')
        .upsert([
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
          }
        ], { onConflict: 'sku' })
        .select();

      if (produtosDiretoError) {
        console.error('❌ Erro na inserção direta:', produtosDiretoError.message);
        console.log('   Isso indica que as políticas RLS estão ativas e bloqueando a inserção.');
        console.log('   Você precisa configurar as políticas RLS ou usar um usuário autenticado.');
        return;
      }
      
      console.log('✅ Inserção direta funcionou');
    } else {
      console.log('✅ Produtos inseridos via SQL');
    }

    // Buscar produtos existentes para criar lotes
    console.log('\n2. Buscando produtos existentes...');
    const { data: produtos, error: buscaError } = await supabase
      .from('produtos')
      .select('id, sku, nome')
      .in('sku', ['PROD001', 'PROD002', 'PROD003', 'PROD004', 'PROD005']);

    if (buscaError) {
      console.error('❌ Erro ao buscar produtos:', buscaError.message);
      return;
    }

    if (!produtos || produtos.length === 0) {
      console.log('❌ Nenhum produto encontrado. Verifique se os produtos foram inseridos.');
      return;
    }

    console.log(`✅ ${produtos.length} produtos encontrados`);

    // Criar mapeamento de SKU para ID
    const produtoMap = {};
    produtos.forEach(produto => {
      produtoMap[produto.sku] = produto.id;
    });

    // Inserir lotes
    console.log('\n3. Inserindo lotes...');
    const lotes = [
      {
        produto_id: produtoMap['PROD001'],
        numero_lote: 'LT001-2024',
        data_fabricacao: '2024-01-15',
        data_validade: '2026-01-15',
        quantidade_inicial: 1000,
        quantidade_atual: 850,
        bloqueado: false
      },
      {
        produto_id: produtoMap['PROD001'],
        numero_lote: 'LT002-2024',
        data_fabricacao: '2024-03-10',
        data_validade: '2026-03-10',
        quantidade_inicial: 500,
        quantidade_atual: 500,
        bloqueado: false
      },
      {
        produto_id: produtoMap['PROD002'],
        numero_lote: 'LT003-2024',
        data_fabricacao: '2024-02-20',
        data_validade: '2026-02-20',
        quantidade_inicial: 750,
        quantidade_atual: 600,
        bloqueado: false
      },
      {
        produto_id: produtoMap['PROD003'],
        numero_lote: 'LT004-2024',
        data_fabricacao: '2024-01-05',
        data_validade: '2025-01-05',
        quantidade_inicial: 300,
        quantidade_atual: 50,
        bloqueado: false
      },
      {
        produto_id: produtoMap['PROD004'],
        numero_lote: 'LT005-2024',
        data_fabricacao: '2024-04-01',
        data_validade: '2027-04-01',
        quantidade_inicial: 200,
        quantidade_atual: 180,
        bloqueado: false
      }
    ];

    // Filtrar lotes com produto_id válido
    const lotesValidos = lotes.filter(lote => lote.produto_id);

    if (lotesValidos.length === 0) {
      console.log('❌ Nenhum lote válido para inserir');
      return;
    }

    const { data: lotesInseridos, error: lotesError } = await supabase
      .from('lotes')
      .upsert(lotesValidos, { onConflict: 'numero_lote' })
      .select();

    if (lotesError) {
      console.error('❌ Erro ao inserir lotes:', lotesError.message);
      return;
    }

    console.log(`✅ ${lotesInseridos?.length || 0} lotes inseridos`);

    // Verificar resultado final
    console.log('\n4. Verificando dados inseridos...');
    const { data: verificacao, error: verificacaoError } = await supabase
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

    console.log(`📊 Total de lotes no banco: ${verificacao?.length || 0}`);
    
    if (verificacao && verificacao.length > 0) {
      console.log('\n📦 Lotes encontrados:');
      verificacao.slice(0, 5).forEach((lote, index) => {
        console.log(`   ${index + 1}. ${lote.numero_lote}`);
        console.log(`      Produto: ${lote.produtos?.nome || 'N/A'}`);
        console.log(`      Quantidade: ${lote.quantidade_atual}/${lote.quantidade_inicial}`);
        console.log('      ---');
      });
    }

    console.log('\n🎉 Processo concluído!');

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

insertSampleDataSQL();