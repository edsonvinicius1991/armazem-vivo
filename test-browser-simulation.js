// Script para simular o comportamento do navegador
// Usando fetch nativo do Node.js (v18+)

async function testBrowserSimulation() {
  console.log('🌐 [BROWSER-SIM] Iniciando simulação do navegador...\n');
  
  let html = '';
  
  try {
    // Teste 1: Verificar se o servidor está respondendo
    console.log('📡 [TESTE 1] Verificando servidor...');
    const response = await fetch('http://localhost:8080/');
    console.log(`Status: ${response.status}`);
    console.log(`Content-Type: ${response.headers.get('content-type')}`);
    
    if (response.ok) {
      html = await response.text();
      console.log(`HTML Length: ${html.length} caracteres`);
      
      // Verificar se contém elementos React básicos
      if (html.includes('id="root"')) {
        console.log('✅ Elemento root encontrado');
      } else {
        console.log('❌ Elemento root NÃO encontrado');
      }
      
      if (html.includes('script')) {
        console.log('✅ Scripts encontrados');
      } else {
        console.log('❌ Scripts NÃO encontrados');
      }
      
      // Mostrar início do HTML
      console.log('\n📄 Início do HTML:');
      console.log(html.substring(0, 500) + '...');
      
    } else {
      console.log('❌ Servidor não está respondendo corretamente');
    }
    
    console.log('\n' + '='.repeat(50));
    
    // Teste 2: Verificar rota específica
    console.log('📡 [TESTE 2] Verificando rota /teste-estoque...');
    const testResponse = await fetch('http://localhost:8080/teste-estoque');
    console.log(`Status: ${testResponse.status}`);
    
    if (testResponse.ok) {
      const testHtml = await testResponse.text();
      console.log(`HTML Length: ${testHtml.length} caracteres`);
      
      // Verificar se é o mesmo HTML (SPA)
      if (testHtml.length === html.length) {
        console.log('✅ SPA detectado - mesmo HTML para todas as rotas');
      } else {
        console.log('⚠️ HTML diferente para rota específica');
      }
    }
    
    console.log('\n' + '='.repeat(50));
    
    // Teste 3: Verificar assets
    console.log('📡 [TESTE 3] Verificando assets...');
    
    // Tentar encontrar o arquivo JS principal
    const jsMatch = html.match(/src="([^"]*\.js[^"]*)"/);
    if (jsMatch) {
      const jsUrl = jsMatch[1].startsWith('/') ? 
        `http://localhost:8080${jsMatch[1]}` : 
        `http://localhost:8080/${jsMatch[1]}`;
      
      console.log(`Testando JS: ${jsUrl}`);
      const jsResponse = await fetch(jsUrl);
      console.log(`JS Status: ${jsResponse.status}`);
      
      if (jsResponse.ok) {
        const jsContent = await jsResponse.text();
        console.log(`JS Length: ${jsContent.length} caracteres`);
        
        // Verificar se contém nossos componentes
        if (jsContent.includes('TesteEstoque')) {
          console.log('✅ Componente TesteEstoque encontrado no JS');
        } else {
          console.log('❌ Componente TesteEstoque NÃO encontrado no JS');
        }
        
        if (jsContent.includes('Estoque')) {
          console.log('✅ Componente Estoque encontrado no JS');
        } else {
          console.log('❌ Componente Estoque NÃO encontrado no JS');
        }
      }
    } else {
      console.log('❌ Arquivo JS principal não encontrado no HTML');
    }
    
  } catch (error) {
    console.error('❌ Erro na simulação:', error.message);
  }
  
  console.log('\n🏁 [BROWSER-SIM] Simulação concluída');
}

// Executar teste
testBrowserSimulation();