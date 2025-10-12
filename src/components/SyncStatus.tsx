import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Bell,
  Trash2,
  Activity
} from 'lucide-react';
import { useSyncStatus, useSyncNotifications, useGlobalSync } from '@/hooks/use-global-sync';
import { cn } from '@/lib/utils';

interface SyncStatusProps {
  className?: string;
  showDetails?: boolean;
}

export function SyncStatus({ className, showDetails = false }: SyncStatusProps) {
  const { isOnline, isHealthy, lastSync, errorCount, healthScore } = useSyncStatus();
  const { notifications, unreadCount, clearAll, remove } = useSyncNotifications();
  const { forceSyncAll, stats } = useGlobalSync();

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="h-4 w-4" />;
    if (!isHealthy) return <AlertTriangle className="h-4 w-4" />;
    return <Wifi className="h-4 w-4" />;
  };

  const getStatusColor = () => {
    if (!isOnline) return 'destructive';
    if (!isHealthy) return 'secondary';
    return 'default';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (!isHealthy) return 'Instável';
    return 'Online';
  };

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Nunca';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'Agora mesmo';
    if (diff < 3600) return `${Math.floor(diff / 60)}m atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)}d atrás`;
  };

  const formatNotificationTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!showDetails) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("relative", className)}
          >
            {getStatusIcon()}
            <span className="ml-2 hidden sm:inline">{getStatusText()}</span>
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <SyncStatusDetails />
        </PopoverContent>
      </Popover>
    );
  }

  return <SyncStatusDetails />;
}

function SyncStatusDetails() {
  const { isOnline, isHealthy, lastSync, errorCount, healthScore } = useSyncStatus();
  const { notifications, clearAll, remove } = useSyncNotifications();
  const { forceSyncAll, stats } = useGlobalSync();

  return (
    <div className="space-y-4">
      {/* Status Principal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <WifiOff className="h-5 w-5 text-red-500" />
          )}
          <div>
            <p className="font-medium">
              {isOnline ? 'Sincronizado' : 'Offline'}
            </p>
            <p className="text-sm text-muted-foreground">
              Última sincronização: {formatLastSync(lastSync)}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={forceSyncAll}
          disabled={!isOnline}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Sincronizar
        </Button>
      </div>

      <Separator />

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Saúde</p>
                <p className="text-lg font-bold">{healthScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Mudanças</p>
                <p className="text-lg font-bold">{stats.recentChanges}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Erros */}
      {errorCount > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p className="font-medium text-red-500">
                {errorCount} erro(s) de sincronização
              </p>
            </div>
          </div>
        </>
      )}

      {/* Notificações */}
      {notifications.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <p className="font-medium">Atividade Recente</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatNotificationTime(notification.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(notification.id)}
                      className="h-6 w-6 p-0 ml-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {notifications.length > 5 && (
              <p className="text-xs text-muted-foreground text-center">
                +{notifications.length - 5} mais notificações
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Componente simples para indicador de status
export function SyncIndicator({ className }: { className?: string }) {
  const { isOnline, isHealthy } = useSyncStatus();
  
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          isOnline && isHealthy ? "bg-green-500" : 
          isOnline ? "bg-yellow-500" : "bg-red-500"
        )}
      />
      <span className="text-xs text-muted-foreground">
        {isOnline ? (isHealthy ? "Sincronizado" : "Instável") : "Offline"}
      </span>
    </div>
  );
}

function formatLastSync(date: Date | null): string {
  if (!date) return 'Nunca';
  
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return 'Agora mesmo';
  if (diff < 3600) return `${Math.floor(diff / 60)}m atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  return `${Math.floor(diff / 86400)}d atrás`;
}

function formatNotificationTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}