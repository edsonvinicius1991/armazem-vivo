import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AlertaEstoque {
  id: string;
  produto_id: string;
  tipo_alerta: 'estoque_minimo' | 'estoque_maximo' | 'produto_vencido' | 'produto_vencendo';
  nivel_criticidade: 'baixo' | 'medio' | 'alto' | 'critico';
  quantidade_atual: number;
  quantidade_referencia?: number;
  mensagem: string;
  ativo: boolean;
  data_criacao: string;
  data_resolucao?: string;
  resolvido_por?: string;
  observacoes?: string;
  // Dados do produto (via join)
  produto?: {
    sku: string;
    nome: string;
    categoria: string;
    unidade_medida: string;
  };
}

export interface LoteVencimento {
  lote_id: string;
  numero_lote: string;
  produto_id: string;
  sku: string;
  produto_nome: string;
  data_validade: string;
  quantidade_total: number;
  status_vencimento: 'VENCIDO' | 'VENCENDO_30_DIAS' | 'VENCENDO_60_DIAS' | 'NORMAL';
  dias_para_vencimento: number;
}

export const useAlertasEstoque = () => {
  const [alertas, setAlertas] = useState<AlertaEstoque[]>([]);
  const [lotesVencimento, setLotesVencimento] = useState<LoteVencimento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar alertas ativos
  const carregarAlertas = useCallback(async (filtros?: {
    tipo_alerta?: string;
    nivel_criticidade?: string;
    apenas_ativos?: boolean;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('alertas_estoque')
        .select(`
          *,
          produtos!inner(sku, nome, categoria, unidade_medida)
        `)
        .order('data_criacao', { ascending: false });

      // Aplicar filtros
      if (filtros?.apenas_ativos !== false) {
        query = query.eq('ativo', true);
      }
      
      if (filtros?.tipo_alerta) {
        query = query.eq('tipo_alerta', filtros.tipo_alerta);
      }
      
      if (filtros?.nivel_criticidade) {
        query = query.eq('nivel_criticidade', filtros.nivel_criticidade);
      }

      const { data, error } = await query;

      if (error) {
        // Se a tabela não existir, não mostrar erro ao usuário
        if (error.message.includes('relation "alertas_estoque" does not exist') || 
            error.message.includes('table "alertas_estoque" does not exist')) {
          console.warn('Tabela alertas_estoque não existe. Retornando lista vazia.');
          setAlertas([]);
          return;
        }
        throw error;
      }
      
      // Transformar dados para incluir informações do produto
      const alertasFormatados = data?.map(alerta => ({
        ...alerta,
        produto: alerta.produtos
      })) || [];
      
      setAlertas(alertasFormatados);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar alertas';
      setError(errorMessage);
      console.error('Erro ao carregar alertas:', err);
      // Não mostrar toast de erro para problemas de tabela inexistente
      if (!errorMessage.includes('does not exist')) {
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Carregar lotes próximos ao vencimento
  const carregarLotesVencimento = useCallback(async (filtros?: {
    status_vencimento?: string;
    dias_limite?: number;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('vw_lotes_vencimento')
        .select('*')
        .order('dias_para_vencimento');

      // Aplicar filtros
      if (filtros?.status_vencimento) {
        query = query.eq('status_vencimento', filtros.status_vencimento);
      }
      
      if (filtros?.dias_limite) {
        query = query.lte('dias_para_vencimento', filtros.dias_limite);
      }

      const { data, error } = await query;

      if (error) {
        // Se a view não existir, não mostrar erro ao usuário
        if (error.message.includes('relation "vw_lotes_vencimento" does not exist') || 
            error.message.includes('view "vw_lotes_vencimento" does not exist')) {
          console.warn('View vw_lotes_vencimento não existe. Retornando lista vazia.');
          setLotesVencimento([]);
          return;
        }
        throw error;
      }
      
      setLotesVencimento(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar lotes';
      setError(errorMessage);
      console.error('Erro ao carregar lotes:', err);
      // Não mostrar toast de erro para problemas de view inexistente
      if (!errorMessage.includes('does not exist')) {
        toast({
          title: "Erro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Resolver alerta
  const resolverAlerta = useCallback(async (alertaId: string, observacoes?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('alertas_estoque')
        .update({
          ativo: false,
          data_resolucao: new Date().toISOString(),
          observacoes: observacoes,
        })
        .eq('id', alertaId);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Alerta resolvido com sucesso",
      });

      // Recarregar alertas
      await carregarAlertas();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao resolver alerta';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, carregarAlertas]);

  // Resolver múltiplos alertas
  const resolverMultiplosAlertas = useCallback(async (alertaIds: string[], observacoes?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('alertas_estoque')
        .update({
          ativo: false,
          data_resolucao: new Date().toISOString(),
          observacoes: observacoes,
        })
        .in('id', alertaIds);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: `${alertaIds.length} alertas resolvidos com sucesso`,
      });

      // Recarregar alertas
      await carregarAlertas();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao resolver alertas';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, carregarAlertas]);

  // Obter contadores de alertas
  const obterContadoresAlertas = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('alertas_estoque')
        .select('tipo_alerta, nivel_criticidade')
        .eq('ativo', true);

      if (error) {
        // Se a tabela não existir, retornar contadores zerados
        if (error.message.includes('relation "alertas_estoque" does not exist') || 
            error.message.includes('table "alertas_estoque" does not exist')) {
          console.warn('Tabela alertas_estoque não existe. Retornando contadores zerados.');
          return {
            total: 0,
            criticos: 0,
            altos: 0,
            medios: 0,
            baixos: 0,
            estoque_minimo: 0,
            estoque_maximo: 0,
            produto_vencido: 0,
            produto_vencendo: 0,
          };
        }
        throw error;
      }

      const contadores = {
        total: data?.length || 0,
        criticos: data?.filter(a => a.nivel_criticidade === 'critico').length || 0,
        altos: data?.filter(a => a.nivel_criticidade === 'alto').length || 0,
        medios: data?.filter(a => a.nivel_criticidade === 'medio').length || 0,
        baixos: data?.filter(a => a.nivel_criticidade === 'baixo').length || 0,
        estoque_minimo: data?.filter(a => a.tipo_alerta === 'estoque_minimo').length || 0,
        estoque_maximo: data?.filter(a => a.tipo_alerta === 'estoque_maximo').length || 0,
        produto_vencido: data?.filter(a => a.tipo_alerta === 'produto_vencido').length || 0,
        produto_vencendo: data?.filter(a => a.tipo_alerta === 'produto_vencendo').length || 0,
      };

      return contadores;
    } catch (err) {
      console.error('Erro ao obter contadores:', err);
      return {
        total: 0,
        criticos: 0,
        altos: 0,
        medios: 0,
        baixos: 0,
        estoque_minimo: 0,
        estoque_maximo: 0,
        produto_vencido: 0,
        produto_vencendo: 0,
      };
    }
  }, []);

  // Criar alerta manual
  const criarAlertaManual = useCallback(async (alerta: {
    produto_id: string;
    tipo_alerta: string;
    nivel_criticidade: string;
    quantidade_atual: number;
    quantidade_referencia?: number;
    mensagem: string;
    observacoes?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('alertas_estoque')
        .insert(alerta);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Alerta criado com sucesso",
      });

      // Recarregar alertas
      await carregarAlertas();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar alerta';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast, carregarAlertas]);

  // Obter alertas por produto
  const obterAlertasPorProduto = useCallback(async (produtoId: string) => {
    try {
      const { data, error } = await supabase
        .from('alertas_estoque')
        .select('*')
        .eq('produto_id', produtoId)
        .eq('ativo', true)
        .order('data_criacao', { ascending: false });

      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error('Erro ao obter alertas do produto:', err);
      return [];
    }
  }, []);

  // Verificar se produto tem alertas ativos
  const produtoTemAlertas = useCallback((produtoId: string): boolean => {
    return alertas.some(alerta => 
      alerta.produto_id === produtoId && alerta.ativo
    );
  }, [alertas]);

  // Obter nível de criticidade mais alto para um produto
  const obterCriticidadeProduto = useCallback((produtoId: string): string | null => {
    const alertasProduto = alertas.filter(alerta => 
      alerta.produto_id === produtoId && alerta.ativo
    );

    if (alertasProduto.length === 0) return null;

    const niveis = ['critico', 'alto', 'medio', 'baixo'];
    
    for (const nivel of niveis) {
      if (alertasProduto.some(alerta => alerta.nivel_criticidade === nivel)) {
        return nivel;
      }
    }

    return null;
  }, [alertas]);

  // Configurar notificações em tempo real
  useEffect(() => {
    const channel = supabase
      .channel('alertas_estoque_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alertas_estoque',
        },
        (payload) => {
          console.log('Mudança em alertas_estoque:', payload);
          // Recarregar alertas quando houver mudanças
          carregarAlertas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [carregarAlertas]);

  // Carregar dados iniciais
  useEffect(() => {
    carregarAlertas();
    carregarLotesVencimento();
  }, [carregarAlertas, carregarLotesVencimento]);

  return {
    // Estados
    alertas,
    lotesVencimento,
    loading,
    error,
    
    // Funções
    carregarAlertas,
    carregarLotesVencimento,
    resolverAlerta,
    resolverMultiplosAlertas,
    obterContadoresAlertas,
    criarAlertaManual,
    obterAlertasPorProduto,
    produtoTemAlertas,
    obterCriticidadeProduto,
  };
};