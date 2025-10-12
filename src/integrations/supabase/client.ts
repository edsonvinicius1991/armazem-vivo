// Cliente Supabase configurado para sincronização em tempo real
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Configuração conforme especificado
const supabaseUrl = 'https://jonwzrzciznkemfiviyk.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Cliente principal com configurações otimizadas para tempo real
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'x-application-name': 'armazem-vivo',
    },
  },
});

// Sistema de cache local para otimização
class DataCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos

  set(key: string, data: any, ttl: number = this.DEFAULT_TTL) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string) {
    const item = this.cache.get(key);
    if (!item) return null;

    const isExpired = Date.now() - item.timestamp > item.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: string) {
    const regex = new RegExp(pattern);
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.cache.clear();
  }
}

export const dataCache = new DataCache();

// Tipos para eventos de sincronização
export type SyncEvent = 'INSERT' | 'UPDATE' | 'DELETE';
export type TableName = keyof Database['public']['Tables'];

export interface SyncEventData {
  table: TableName;
  event: SyncEvent;
  old?: any;
  new?: any;
  timestamp: number;
}

// Sistema de eventos para sincronização
class SyncEventEmitter {
  private listeners = new Map<string, Set<(data: SyncEventData) => void>>();

  on(event: string, callback: (data: SyncEventData) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Retorna função para remover o listener
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit(event: string, data: SyncEventData) {
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Erro no listener de sincronização:', error);
      }
    });
  }

  off(event: string, callback?: (data: SyncEventData) => void) {
    if (callback) {
      this.listeners.get(event)?.delete(callback);
    } else {
      this.listeners.delete(event);
    }
  }
}

export const syncEvents = new SyncEventEmitter();