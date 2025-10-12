import { useEffect, useState, useCallback } from 'react';
import { useMultiTableSync, useSyncEvents } from './use-realtime-sync';
import { dataCache, type SyncEventData } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

// Configuração das tabelas principais para sincronização
const MAIN_TABLES = [
  'produtos',
  'almoxarifados', 
  'localizacoes',
  'lotes',
  'estoque_localizacao',
  'recebimentos',
  'recebimento_itens',
  'movimentacoes',
] as const;

interface GlobalSyncStatus {
  isOnline: boolean;
  lastSync: Date | null;
  syncErrors: Array<{ table: string; error: string; timestamp: Date }>;
  pendingChanges: number;
  totalTables: number;
  connectedTables: number;
}

interface SyncNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  table?: string;
  action?: string;
}

export function useGlobalSync() {
  const { toast } = useToast();
  
  const [globalStatus, setGlobalStatus] = useState<GlobalSyncStatus>({
    isOnline: false,
    lastSync: null,
    syncErrors: [],
    pendingChanges: 0,
    totalTables: MAIN_TABLES.length,
    connectedTables: 0,
  });

  const [notifications, setNotifications] = useState<SyncNotification[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Configurar sincronização para todas as tabelas principais
  const { overallStatus, forceReconnectAll, disconnectAll } = useMultiTableSync(
    MAIN_TABLES.map(table => ({
      table,
      enabled: true,
      onInsert: (payload) => handleTableChange(table, 'INSERT', payload),
      onUpdate: (payload) => handleTableChange(table, 'UPDATE', payload),
      onDelete: (payload) => handleTableChange(table, 'DELETE', payload),
    }))
  );

  // Função para lidar com mudanças nas tabelas
  const handleTableChange = useCallback((
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    payload: any
  ) => {
    const notification: SyncNotification = {
      id: `${table}-${action}-${Date.now()}`,
      type: 'info',
      title: 'Dados Atualizados',
      message: getChangeMessage(table, action, payload),
      timestamp: new Date(),
      table,
      action,
    };

    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Manter apenas 10 notificações

    // Mostrar toast para mudanças importantes
    if (shouldShowToast(table, action)) {
      toast({
        title: notification.title,
        description: notification.message,
        duration: 3000,
      });
    }
  }, [toast]);

  // Determinar se deve mostrar toast para uma mudança
  const shouldShowToast = (table: string, action: string): boolean => {
    // Mostrar toast para mudanças em tabelas críticas
    const criticalTables = ['produtos', 'estoque_localizacao', 'recebimentos'];
    return criticalTables.includes(table) && action !== 'UPDATE';
  };

  // Gerar mensagem para mudança
  const getChangeMessage = (table: string, action: string, payload: any): string => {
    const tableNames: Record<string, string> = {
      produtos: 'Produtos',
      almoxarifados: 'Almoxarifados',
      localizacoes: 'Localizações',
      lotes: 'Lotes',
      estoque_localizacao: 'Estoque',
      recebimentos: 'Recebimentos',
      recebimento_itens: 'Itens de Recebimento',
      movimentacoes: 'Movimentações',
    };

    const tableName = tableNames[table] || table;
    
    switch (action) {
      case 'INSERT':
        return `Novo registro adicionado em ${tableName}`;
      case 'UPDATE':
        return `Registro atualizado em ${tableName}`;
      case 'DELETE':
        return `Registro removido de ${tableName}`;
      default:
        return `Mudança em ${tableName}`;
    }
  };

  // Atualizar status global baseado no status das tabelas
  useEffect(() => {
    setGlobalStatus(prev => ({
      ...prev,
      isOnline: overallStatus.connected,
      lastSync: overallStatus.lastSync,
      connectedTables: MAIN_TABLES.length - overallStatus.errors.length,
      syncErrors: overallStatus.errors.map(error => ({
        table: error.table,
        error: error.error,
        timestamp: new Date(),
      })),
    }));

    // Marcar como inicializado após primeira verificação
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [overallStatus, isInitialized]);

  // Escutar todos os eventos de sincronização
  useSyncEvents('*', useCallback((data: SyncEventData) => {
    setGlobalStatus(prev => ({
      ...prev,
      lastSync: new Date(data.timestamp),
    }));
  }, []));

  // Monitorar conectividade da rede
  useEffect(() => {
    const handleOnline = () => {
      setGlobalStatus(prev => ({ ...prev, isOnline: true }));
      forceReconnectAll();
      
      toast({
        title: 'Conexão Restaurada',
        description: 'Sincronização automática reativada',
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setGlobalStatus(prev => ({ ...prev, isOnline: false }));
      
      toast({
        title: 'Conexão Perdida',
        description: 'Trabalhando offline. Dados serão sincronizados quando a conexão for restaurada.',
        variant: 'destructive',
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [forceReconnectAll, toast]);

  // Função para limpar cache de uma tabela específica
  const clearTableCache = useCallback((table: string) => {
    dataCache.invalidatePattern(`^${table}`);
    
    toast({
      title: 'Cache Limpo',
      description: `Cache da tabela ${table} foi limpo`,
      duration: 2000,
    });
  }, [toast]);

  // Função para limpar todo o cache
  const clearAllCache = useCallback(() => {
    dataCache.clear();
    
    toast({
      title: 'Cache Limpo',
      description: 'Todo o cache foi limpo. Dados serão recarregados.',
      duration: 3000,
    });
  }, [toast]);

  // Função para forçar sincronização completa
  const forceSyncAll = useCallback(() => {
    clearAllCache();
    forceReconnectAll();
    
    toast({
      title: 'Sincronização Forçada',
      description: 'Todos os dados estão sendo recarregados',
      duration: 3000,
    });
  }, [clearAllCache, forceReconnectAll, toast]);

  // Função para limpar notificações
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Função para remover notificação específica
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Função para obter estatísticas de sincronização
  const getSyncStats = useCallback(() => {
    const now = new Date();
    const recentNotifications = notifications.filter(
      n => now.getTime() - n.timestamp.getTime() < 5 * 60 * 1000 // Últimos 5 minutos
    );

    return {
      totalNotifications: notifications.length,
      recentChanges: recentNotifications.length,
      errorCount: globalStatus.syncErrors.length,
      healthScore: Math.round((globalStatus.connectedTables / globalStatus.totalTables) * 100),
      lastSyncAgo: globalStatus.lastSync 
        ? Math.round((now.getTime() - globalStatus.lastSync.getTime()) / 1000)
        : null,
    };
  }, [notifications, globalStatus]);

  // Cleanup
  useEffect(() => {
    return () => {
      disconnectAll();
    };
  }, [disconnectAll]);

  return {
    globalStatus,
    notifications,
    isInitialized,
    stats: getSyncStats(),
    
    // Ações
    forceSyncAll,
    clearAllCache,
    clearTableCache,
    clearNotifications,
    removeNotification,
    forceReconnectAll,
    disconnectAll,
  };
}

// Hook para status de sincronização simplificado
export function useSyncStatus() {
  const { globalStatus, stats } = useGlobalSync();
  
  return {
    isOnline: globalStatus.isOnline,
    isHealthy: stats.healthScore > 80,
    lastSync: globalStatus.lastSync,
    errorCount: globalStatus.syncErrors.length,
    healthScore: stats.healthScore,
  };
}

// Hook para notificações de sincronização
export function useSyncNotifications() {
  const { notifications, clearNotifications, removeNotification } = useGlobalSync();
  
  return {
    notifications,
    unreadCount: notifications.length,
    clearAll: clearNotifications,
    remove: removeNotification,
  };
}