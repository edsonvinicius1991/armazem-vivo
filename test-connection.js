// Script para testar conexão com Supabase e verificar dados
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('🔍 Testando conexão com Supabase...\n');

// Verificar se as variáveis estão definidas
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Erro: Variáveis de ambiente não encontradas!');
  console.log('📝 Verifique se o arquivo .env existe e contém:');
  console.log('   VITE_SUPABASE_URL=sua_url_aqui');
  console.log('   VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_aqui');
  console.log('\n💡 Use o arquivo .env.example como referência');
  process.exit(1);
}

console.log('✅ Variáveis de ambiente encontradas:');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseKey.substring(0, 20)}...`);

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔗 Testando conexão...');
    
    // Teste básico de conexão
    const { data, error } = await supabase
      .from('produtos')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('❌ Erro na conexão:', error.message);
      return false;
    }
    
    console.log('✅ Conexão estabelecida com sucesso!');
    return true;
    
  } catch (err) {
    console.error('❌ Erro inesperado:', err.message);
    return false;
  }
}

async function checkTables() {
  console.log('\n📊 Verificando tabelas e dados...');
  
  const tables = [
    'produtos',
    'estoque_localizacao', 
    'lotes',
    'localizacoes',
    'almoxarifados'
  ];
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: Erro - ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${count || 0} registros`);
      }
    } catch (err) {
      console.log(`❌ ${table}: Erro inesperado - ${err.message}`);
    }
  }
}

async function checkView() {
  console.log('\n🔍 Verificando view vw_estoque_consolidado...');
  
  try {
    const { data, error, count } = await supabase
      .from('vw_estoque_consolidado')
      .select('*', { count: 'exact' })
      .limit(5);
    
    if (error) {
      console.log(`❌ vw_estoque_consolidado: Erro - ${error.message}`);
      console.log('💡 Dica: Execute as migrações do banco de dados');
    } else {
      console.log(`✅ vw_estoque_consolidado: ${count || 0} registros`);
      if (data && data.length > 0) {
        console.log('📋 Exemplo de dados:');
        console.log(JSON.stringify(data[0], null, 2));
      }
    }
  } catch (err) {
    console.log(`❌ vw_estoque_consolidado: Erro inesperado - ${err.message}`);
  }
}

async function main() {
  const connected = await testConnection();
  
  if (connected) {
    await checkTables();
    await checkView();
    
    console.log('\n🎯 Resumo:');
    console.log('1. Se todas as tabelas mostram 0 registros, execute: node insert-sample-data.js');
    console.log('2. Se alguma tabela deu erro, execute as migrações do banco');
    console.log('3. Se a view deu erro, verifique se as migrações foram aplicadas');
    console.log('4. Após inserir dados, reinicie o servidor: npm run dev');
  }
  
  console.log('\n✨ Teste concluído!');
}

main().catch(console.error);