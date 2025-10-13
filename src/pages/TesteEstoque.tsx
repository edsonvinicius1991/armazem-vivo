import React from 'react';

const TesteEstoque = () => {
  console.log('🧪 [TESTE] Componente TesteEstoque renderizado - versão simples');
  console.log('🧪 [TESTE] Timestamp:', new Date().toISOString());
  console.log('🧪 [TESTE] Window location:', window.location.href);
  
  // Adicionar um alert para ter certeza absoluta
  setTimeout(() => {
    console.log('🧪 [TESTE] Componente montado com sucesso!');
  }, 100);
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#ff0000', 
      minHeight: '100vh',
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold'
    }}>
      <h1 style={{ 
        color: 'yellow', 
        fontSize: '48px',
        textAlign: 'center',
        margin: '20px 0',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
      }}>
        🚀 TESTE ESTOQUE - FUNCIONANDO! 🚀
      </h1>
      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px 0'
      }}>
        <h2 style={{ color: 'yellow' }}>✅ Status do Teste:</h2>
        <p>✅ Componente React renderizado</p>
        <p>✅ Roteamento funcionando</p>
        <p>✅ Estilos aplicados</p>
        <p>✅ JavaScript executando</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px 0'
      }}>
        <h2 style={{ color: 'yellow' }}>🔍 Informações de Debug:</h2>
        <p>URL atual: {window.location.href}</p>
        <p>Timestamp: {new Date().toLocaleString()}</p>
        <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        padding: '20px', 
        borderRadius: '10px',
        margin: '20px 0'
      }}>
        <h2 style={{ color: 'yellow' }}>📋 Próximos Passos:</h2>
        <p>1. ✅ Verificar se este componente aparece</p>
        <p>2. 🔄 Adicionar o hook useEstoque</p>
        <p>3. 🔄 Comparar com o componente Estoque original</p>
        <p>4. 🔄 Identificar o problema específico</p>
      </div>
      
      <div style={{ 
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'yellow',
        color: 'black',
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold',
        zIndex: 9999
      }}>
        🎯 TESTE ATIVO
      </div>
    </div>
  );
};

export default TesteEstoque;