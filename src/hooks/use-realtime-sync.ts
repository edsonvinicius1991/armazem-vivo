import { useEffect, useRef, useState, useCallback } from 'react';
import { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { supabase, dataCache, syncEvents, type TableName, type SyncEventData } from '@/integrations/supabase/client';

interface UseRealtimeSyncOptions {
  table: TableName;
  filter?: string;
  enabled?: boolean;
  onInsert?: (payload: RealtimePostgresChangesPayload<any>) => void;
  onUpdate?: (payload: RealtimePostgresChangesPayload<any>) => void;
  onDelete?: (payload: RealtimePostgresChangesPayload<any>) => void;
}

interface SyncStatus {
  connected: boolean;
  lastSync: Date | null;
  error: string | null;
  retryCount: number;
}

export function useRealtimeSync(options: UseRealtimeSyncOptions) {
  const { table, filter, enabled = true, onInsert, onUpdate, onDelete } = options;
  
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    connected: false,
    lastSync: null,
    error: null,
    retryCount: 0,
  });

  const channelRef = useRef<RealtimeChannel | null>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 5;
  const baseRetryDelay = 1000; // 1 segundo

  const handleRealtimeEvent = useCallback((
    event: 'INSERT' | 'UPDATE' | 'DELETE',
    payload: RealtimePostgresChangesPayload<any>
  ) => {
    const syncEventData: SyncEventData = {
      table,
      event,
      old: payload.old,
      new: payload.new,
      timestamp: Date.now(),
    };

    // Emitir evento global
    syncEvents.emit(`${table}:${event}`, syncEventData);
    syncEvents.emit(`${table}:*`, syncEventData);
    syncEvents.emit('*', syncEventData);

    // Invalidar cache relacionado
    dataCache.invalidatePattern(`^${table}`);

    // Atualizar status de sincronização
    setSyncStatus(prev => ({
      ...prev,
      lastSync: new Date(),
      error: null,
    }));

    // Executar callbacks específicos
    switch (event) {
      case 'INSERT':
        onInsert?.(payload);
        break;
      case 'UPDATE':
        onUpdate?.(payload);
        break;
      case 'DELETE':
        onDelete?.(payload);
        break;
    }
  }, [table, onInsert, onUpdate, onDelete]);

  const connectToRealtime = useCallback(() => {
    if (!enabled || channelRef.current) return;

    try {
      const channelName = filter ? `${table}:${filter}` : table;
      const channel = supabase.channel(channelName);

      // Configurar listeners para mudanças na tabela
      let query = channel.on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table as string,
          ...(filter && { filter }),
        },
        (payload) => {
          handleRealtimeEvent(payload.eventType as any, payload);
        }
      );

      // Configurar callbacks de status do canal
      channel
        .on('system', {}, (payload) => {
          if (payload.type === 'connected') {
            setSyncStatus(prev => ({
              ...prev,
              connected: true,
              error: null,
              retryCount: 0,
            }));
          }
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setSyncStatus(prev => ({
              ...prev,
              connected: true,
              error: null,
            }));
          } else if (status === 'CHANNEL_ERROR') {
            setSyncStatus(prev => ({
              ...prev,
              connected: false,
              error: 'Erro na conexão do canal',
            }));
            
            // Tentar reconectar
            scheduleReconnect();
          } else if (status === 'TIMED_OUT') {
            setSyncStatus(prev => ({
              ...prev,
              connected: false,
              error: 'Timeout na conexão',
            }));
            
            scheduleReconnect();
          }
        });

      channelRef.current = channel;
    } catch (error) {
      console.error('Erro ao conectar ao realtime:', error);
      setSyncStatus(prev => ({
        ...prev,
        connected: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
      
      scheduleReconnect();
    }
  }, [enabled, table, filter, handleRealtimeEvent]);

  const scheduleReconnect = useCallback(() => {
    setSyncStatus(prev => {
      if (prev.retryCount >= maxRetries) {
        return {
          ...prev,
          error: 'Máximo de tentativas de reconexão atingido',
        };
      }

      const delay = baseRetryDelay * Math.pow(2, prev.retryCount); // Backoff exponencial
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }

      retryTimeoutRef.current = setTimeout(() => {
        disconnect();
        connectToRealtime();
      }, delay);

      return {
        ...prev,
        retryCount: prev.retryCount + 1,
      };
    });
  }, []); // Removendo connectToRealtime das dependências

  const disconnect = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    setSyncStatus(prev => ({
      ...prev,
      connected: false,
    }));
  }, []);

  const forceReconnect = useCallback(() => {
    setSyncStatus(prev => ({
      ...prev,
      retryCount: 0,
      error: null,
    }));
    
    disconnect();
    connectToRealtime();
  }, []); // Removendo disconnect e connectToRealtime das dependências

  // Conectar quando o hook é montado
  useEffect(() => {
    if (enabled) {
      connectToRealtime();
    }
    
    return () => {
      disconnect();
    };
  }, [enabled, table, filter]); // Removendo connectToRealtime e disconnect das dependências

  // Reconectar quando a aba volta ao foco
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && enabled && !syncStatus.connected) {
        forceReconnect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, syncStatus.connected, forceReconnect]);

  return {
    syncStatus,
    forceReconnect,
    disconnect,
  };
}

// Hook para sincronização de múltiplas tabelas
export function useMultiTableSync(tables: UseRealtimeSyncOptions[]) {
  const syncResults = tables.map(options => useRealtimeSync(options));
  
  const overallStatus = {
    connected: syncResults.every(result => result.syncStatus.connected),
    hasErrors: syncResults.some(result => result.syncStatus.error !== null),
    lastSync: syncResults.reduce((latest, result) => {
      if (!result.syncStatus.lastSync) return latest;
      if (!latest) return result.syncStatus.lastSync;
      return result.syncStatus.lastSync > latest ? result.syncStatus.lastSync : latest;
    }, null as Date | null),
    errors: syncResults
      .filter(result => result.syncStatus.error)
      .map((result, index) => ({
        table: tables[index].table,
        error: result.syncStatus.error!,
      })),
  };

  const forceReconnectAll = useCallback(() => {
    syncResults.forEach(result => result.forceReconnect());
  }, [syncResults]);

  const disconnectAll = useCallback(() => {
    syncResults.forEach(result => result.disconnect());
  }, [syncResults]);

  return {
    overallStatus,
    syncResults,
    forceReconnectAll,
    disconnectAll,
  };
}

// Hook para escutar eventos de sincronização específicos
export function useSyncEvents(eventPattern: string, callback: (data: SyncEventData) => void) {
  useEffect(() => {
    const unsubscribe = syncEvents.on(eventPattern, callback);
    return unsubscribe;
  }, [eventPattern, callback]);
}