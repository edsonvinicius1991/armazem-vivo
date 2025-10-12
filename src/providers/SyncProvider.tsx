import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useGlobalSync } from '@/hooks/use-global-sync';
import { toast } from 'sonner';

interface SyncContextType {
  isConnected: boolean;
  isLoading: boolean;
  lastSync: Date | null;
  errorCount: number;
  clearCache: () => void;
  forceSync: () => void;
  enableNotifications: boolean;
  setEnableNotifications: (enabled: boolean) => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

interface SyncProviderProps {
  children: ReactNode;
}

export const SyncProvider: React.FC<SyncProviderProps> = ({ children }) => {
  const globalSync = useGlobalSync();

  // Notificações de erro
  useEffect(() => {
    if (globalSync.errorCount > 0 && globalSync.enableNotifications) {
      toast.error(
        `Erro de sincronização detectado. ${globalSync.errorCount} erro(s) encontrado(s).`,
        {
          action: {
            label: 'Tentar novamente',
            onClick: globalSync.forceSync,
          },
        }
      );
    }
  }, [globalSync.errorCount, globalSync.enableNotifications, globalSync.forceSync]);

  // Notificação de reconexão
  useEffect(() => {
    if (globalSync.isConnected && globalSync.enableNotifications) {
      const wasDisconnected = localStorage.getItem('sync:wasDisconnected') === 'true';
      if (wasDisconnected) {
        toast.success('Sincronização reestabelecida com sucesso!');
        localStorage.removeItem('sync:wasDisconnected');
      }
    } else if (!globalSync.isConnected) {
      localStorage.setItem('sync:wasDisconnected', 'true');
    }
  }, [globalSync.isConnected, globalSync.enableNotifications]);

  const contextValue: SyncContextType = {
    isConnected: globalSync.isConnected,
    isLoading: globalSync.isLoading,
    lastSync: globalSync.lastSync,
    errorCount: globalSync.errorCount,
    clearCache: globalSync.clearCache,
    forceSync: globalSync.forceSync,
    enableNotifications: globalSync.enableNotifications,
    setEnableNotifications: globalSync.setEnableNotifications,
  };

  return (
    <SyncContext.Provider value={contextValue}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSyncContext = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSyncContext deve ser usado dentro de um SyncProvider');
  }
  return context;
};

// Hook para verificar se a sincronização está ativa
export const useIsSyncActive = (): boolean => {
  const { isConnected, isLoading } = useSyncContext();
  return isConnected && !isLoading;
};

// Hook para obter estatísticas de sincronização
export const useSyncStats = () => {
  const { lastSync, errorCount, isConnected } = useSyncContext();
  
  const getLastSyncText = () => {
    if (!lastSync) return 'Nunca sincronizado';
    
    const now = new Date();
    const diffMs = now.getTime() - lastSync.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Agora mesmo';
    if (diffMinutes < 60) return `${diffMinutes} min atrás`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} dia(s) atrás`;
  };

  const getSyncHealth = () => {
    if (!isConnected) return 'disconnected';
    if (errorCount > 5) return 'error';
    if (errorCount > 0) return 'warning';
    return 'healthy';
  };

  return {
    lastSyncText: getLastSyncText(),
    syncHealth: getSyncHealth(),
    errorCount,
    isConnected,
  };
};