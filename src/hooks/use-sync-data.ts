import { useState, useEffect, useCallback, useRef } from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabase, dataCache, type TableName } from '@/integrations/supabase/client';
import { useRealtimeSync, useSyncEvents } from './use-realtime-sync';

interface UseSyncDataOptions<T = any> {
  table: TableName;
  select?: string;
  filter?: (query: any) => any;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  enabled?: boolean;
  cacheKey?: string;
  cacheTTL?: number;
  realtime?: boolean;
  realtimeFilter?: string;
}

interface SyncDataState<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
  lastFetch: Date | null;
  fromCache: boolean;
}

export function useSyncData<T = any>(options: UseSyncDataOptions<T>) {
  const {
    table,
    select = '*',
    filter,
    orderBy,
    limit,
    enabled = true,
    cacheKey,
    cacheTTL,
    realtime = true,
    realtimeFilter,
  } = options;

  const [state, setState] = useState<SyncDataState<T>>({
    data: null,
    loading: false,
    error: null,
    lastFetch: null,
    fromCache: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Gerar chave de cache baseada nos parâmetros
  const generateCacheKey = useCallback(() => {
    if (cacheKey) return cacheKey;
    
    const params = {
      table,
      select,
      filter: filter?.toString(),
      orderBy,
      limit,
    };
    
    return `${table}:${JSON.stringify(params)}`;
  }, [table, select, filter, orderBy, limit, cacheKey]);

  // Função para buscar dados
  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!enabled || !isMountedRef.current) return;

    const key = generateCacheKey();
    
    // Verificar cache primeiro (se não for refresh forçado)
    if (!forceRefresh) {
      const cachedData = dataCache.get(key);
      if (cachedData) {
        setState(prev => ({
          ...prev,
          data: cachedData,
          loading: false,
          error: null,
          fromCache: true,
        }));
        return;
      }
    }

    // Cancelar requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      fromCache: false,
    }));

    try {
      let query = supabase.from(table as string).select(select);

      // Aplicar filtros
      if (filter) {
        query = filter(query);
      }

      // Aplicar ordenação
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      }

      // Aplicar limite
      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query.abortSignal(abortControllerRef.current.signal);

      if (!isMountedRef.current) return;

      if (error) {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
        return;
      }

      // Salvar no cache
      dataCache.set(key, data, cacheTTL);

      setState(prev => ({
        ...prev,
        data: data as T[],
        loading: false,
        error: null,
        lastFetch: new Date(),
        fromCache: false,
      }));

    } catch (error: any) {
      if (!isMountedRef.current) return;
      
      // Ignorar erros de abort
      if (error.name === 'AbortError') return;

      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erro ao buscar dados',
      }));
    }
  }, [enabled, table, select, filter, orderBy, limit, generateCacheKey, cacheTTL]);

  // Configurar sincronização em tempo real
  const { syncStatus } = useRealtimeSync({
    table,
    filter: realtimeFilter,
    enabled: realtime && enabled,
    onInsert: () => fetchData(true),
    onUpdate: () => fetchData(true),
    onDelete: () => fetchData(true),
  });

  // Escutar eventos de sincronização para invalidar cache
  useSyncEvents(`${table}:*`, useCallback(() => {
    const key = generateCacheKey();
    dataCache.invalidate(key);
    fetchData(true);
  }, [generateCacheKey, fetchData]));

  // Buscar dados inicialmente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Função para refresh manual
  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  // Função para invalidar cache
  const invalidateCache = useCallback(() => {
    const key = generateCacheKey();
    dataCache.invalidate(key);
  }, [generateCacheKey]);

  return {
    ...state,
    refresh,
    invalidateCache,
    syncStatus,
    isConnected: syncStatus.connected,
  };
}

// Hook para um único item
export function useSyncItem<T = any>(
  table: TableName,
  id: string | number,
  options?: Omit<UseSyncDataOptions<T>, 'filter' | 'limit'>
) {
  const result = useSyncData<T>({
    ...options,
    table,
    filter: (query) => query.eq('id', id),
    limit: 1,
    cacheKey: `${table}:item:${id}`,
  });

  return {
    ...result,
    data: result.data?.[0] || null,
  };
}

// Hook para contagem de registros
export function useSyncCount(
  table: TableName,
  filter?: (query: any) => any,
  options?: Pick<UseSyncDataOptions, 'enabled' | 'cacheKey' | 'cacheTTL' | 'realtime'>
) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCount = useCallback(async () => {
    if (!options?.enabled ?? true) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase.from(table as string).select('*', { count: 'exact', head: true });

      if (filter) {
        query = filter(query);
      }

      const { count: resultCount, error } = await query;

      if (error) {
        setError(error.message);
        return;
      }

      setCount(resultCount || 0);
    } catch (error: any) {
      setError(error.message || 'Erro ao buscar contagem');
    } finally {
      setLoading(false);
    }
  }, [table, filter, options?.enabled]);

  // Configurar sincronização em tempo real
  useRealtimeSync({
    table,
    enabled: options?.realtime ?? true,
    onInsert: fetchCount,
    onUpdate: fetchCount,
    onDelete: fetchCount,
  });

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return {
    count,
    loading,
    error,
    refresh: fetchCount,
  };
}

// Hook para múltiplas consultas relacionadas
export function useSyncRelatedData<T extends Record<string, any>>(
  queries: Record<keyof T, UseSyncDataOptions>
) {
  const results = {} as Record<keyof T, ReturnType<typeof useSyncData>>;
  
  for (const [key, options] of Object.entries(queries)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[key as keyof T] = useSyncData(options);
  }

  const loading = Object.values(results).some(result => result.loading);
  const hasError = Object.values(results).some(result => result.error);
  const allConnected = Object.values(results).every(result => result.isConnected);

  const refreshAll = useCallback(() => {
    Object.values(results).forEach(result => result.refresh());
  }, [results]);

  return {
    results,
    loading,
    hasError,
    allConnected,
    refreshAll,
  };
}