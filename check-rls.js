import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://jonwzrzciznkemfiviyk.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRLSAndStructure() {
  try {
    console.log('🔍 Verificando políticas RLS e estrutura das tabelas...\n');

    // Verificar estrutura da tabela estoque_localizacao
    console.log('📋 Estrutura da tabela estoque_localizacao:');
    const { data: estoqueColumns, error: estoqueError } = await supabase
      .from('estoque_localizacao')
      .select('*')
      .limit(0);
    
    if (estoqueError) {
      console.log('❌ Erro ao verificar estoque_localizacao:', estoqueError.message);
    } else {
      console.log('✅ Tabela estoque_localizacao acessível');
    }

    // Tentar inserir um registro simples para testar RLS
    console.log('\n🧪 Testando inserção simples...');
    
    // Teste com almoxarifado
    const { data: almoxTest, error: almoxError } = await supabase
      .from('almoxarifados')
      .insert({
        codigo: 'TEST001',
        nome: 'Teste',
        ativo: true
      })
      .select();

    if (almoxError) {
      console.log('❌ Erro RLS almoxarifados:', almoxError.message);
    } else {
      console.log('✅ Inserção em almoxarifados funcionou');
      
      // Limpar teste
      await supabase
        .from('almoxarifados')
        .delete()
        .eq('codigo', 'TEST001');
    }

    // Verificar se há dados existentes
    console.log('\n📊 Verificando dados existentes...');
    
    const tables = ['almoxarifados', 'localizacoes', 'produtos', 'lotes', 'estoque_localizacao'];
    
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`📋 ${table}: ${count} registros`);
      }
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

checkRLSAndStructure();