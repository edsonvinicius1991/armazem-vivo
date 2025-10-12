# Sistema de Sincronização Automática - Armazém Vivo

## Visão Geral

O sistema de sincronização automática foi implementado para garantir que todas as informações da base de dados estejam sempre atualizadas na aplicação em tempo real. O sistema utiliza WebSockets do Supabase para receber notificações instantâneas de mudanças no banco de dados.

## Componentes Implementados

### 1. Cliente Supabase Configurado (`src/integrations/supabase/client.ts`)
- Configuração otimizada para real-time
- Cache local para melhor performance
- Sistema de eventos para sincronização

### 2. Hooks de Sincronização

#### `useRealtimeSync` (`src/hooks/use-realtime-sync.ts`)
- Conecta a tabelas específicas para receber atualizações em tempo real
- Gerencia reconexões automáticas com backoff exponencial
- Suporte a múltiplas tabelas simultaneamente

#### `useSyncData` (`src/hooks/use-sync-data.ts`)
- Substitui consultas manuais ao banco
- Cache inteligente com invalidação automática
- Sincronização automática em tempo real

#### `useGlobalSync` (`src/hooks/use-global-sync.ts`)
- Gerencia sincronização de todas as tabelas principais
- Monitora status de conectividade
- Controla notificações de sincronização

### 3. Provider Global (`src/providers/SyncProvider.tsx`)
- Contexto global para gerenciar sincronização
- Notificações automáticas de erros e reconexões
- Estatísticas de sincronização

### 4. Componentes de Interface

#### `SyncStatus` (`src/components/SyncStatus.tsx`)
- Indicador visual do status de sincronização
- Exibe última sincronização e erros
- Controles para sincronização manual

## Como Usar

### 1. Em Páginas/Componentes

Substitua consultas manuais:

```typescript
// ❌ Antes (manual)
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadData = async () => {
    const { data } = await supabase.from('produtos').select('*');
    setData(data);
    setLoading(false);
  };
  loadData();
}, []);

// ✅ Agora (automático)
const { data, loading, error } = useSyncData({
  table: 'produtos',
  select: '*',
  enableRealtime: true
});
```

### 2. Sincronização Manual

```typescript
const { forceSync, clearCache } = useSyncContext();

// Forçar sincronização
const handleSync = () => {
  forceSync();
  toast.success("Sincronização iniciada");
};

// Limpar cache
const handleClearCache = () => {
  clearCache();
  toast.success("Cache limpo");
};
```

### 3. Monitoramento de Status

```typescript
const { isConnected, lastSync, errorCount } = useSyncContext();
const { syncHealth, lastSyncText } = useSyncStats();

// Verificar se está conectado
if (!isConnected) {
  // Mostrar indicador de desconexão
}
```

## Tabelas Monitoradas

O sistema monitora automaticamente as seguintes tabelas:
- `produtos`
- `almoxarifados`
- `localizacoes`
- `lotes`
- `estoque_localizacao`
- `recebimentos`
- `recebimento_itens`
- `movimentacoes`

## Funcionalidades

### ✅ Implementado

1. **Sincronização em Tempo Real**
   - Atualizações instantâneas via WebSockets
   - Suporte a INSERT, UPDATE, DELETE

2. **Cache Inteligente**
   - Armazenamento local para melhor performance
   - Invalidação automática quando dados mudam

3. **Reconexão Automática**
   - Backoff exponencial para reconexões
   - Notificações de status de conexão

4. **Interface de Status**
   - Indicador visual no sidebar
   - Informações detalhadas de sincronização

5. **Sincronização Manual**
   - Botões para forçar sincronização
   - Limpeza de cache quando necessário

6. **Notificações**
   - Alertas de erros de sincronização
   - Confirmações de reconexão

### 🔄 Benefícios

1. **Performance Melhorada**
   - Menos consultas ao banco
   - Cache local reduz latência

2. **Experiência do Usuário**
   - Dados sempre atualizados
   - Interface responsiva

3. **Confiabilidade**
   - Reconexão automática
   - Tratamento de erros robusto

4. **Manutenibilidade**
   - Código mais limpo
   - Menos lógica de carregamento manual

## Configuração de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no `.env`:

```env
VITE_SUPABASE_URL=https://jonwzrzciznkemfiviyk.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_aqui
```

## Monitoramento e Debug

### Logs de Sincronização
O sistema registra automaticamente:
- Conexões e desconexões
- Erros de sincronização
- Atualizações de dados

### Ferramentas de Debug
- Console do navegador mostra eventos de sincronização
- Componente SyncStatus exibe estatísticas em tempo real
- Notificações toast para eventos importantes

## Próximos Passos

1. **Otimizações**
   - Implementar debounce para atualizações frequentes
   - Adicionar compressão de dados

2. **Monitoramento Avançado**
   - Métricas de performance
   - Alertas de saúde do sistema

3. **Funcionalidades Extras**
   - Sincronização offline
   - Resolução de conflitos

## Suporte

Para problemas ou dúvidas sobre o sistema de sincronização:
1. Verifique os logs no console do navegador
2. Confirme se as variáveis de ambiente estão corretas
3. Teste a conectividade com o Supabase
4. Use o botão de sincronização manual se necessário