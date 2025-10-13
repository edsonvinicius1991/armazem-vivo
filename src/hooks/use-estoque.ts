import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EstoqueConsolidado {
  produto_id: string;
  sku: string;
  produto_nome: string;
  categoria: string;
  unidade_medida: string;
  estoque_minimo: number;
  estoque_maximo: number;
  valor_unitario: number;
  quantidade_total: number;
  valor_total_estoque: number;
  localizacoes_ocupadas: number;
  lotes_ativos: number;
  status_estoque: 'CRITICO' | 'BAIXO' | 'NORMAL' | 'EXCESSO';
  ultima_movimentacao: string;
}

export interface HistoricoEstoque {
  id: string;
  produto_id: string;
  lote_id: string;
  localizacao_id: string;
  quantidade_anterior: number;
  quantidade_nova: number;
  diferenca: number;
  tipo_operacao: string;
  documento_referencia?: string;
  usuario_id?: string;
  data_operacao: string;
  observacoes?: string;
}

export interface MovimentacaoEstoque {
  produto_id: string;
  lote_id?: string;
  localizacao_origem_id?: string;
  localizacao_destino_id?: string;
  tipo: 'entrada' | 'saida' | 'transferencia' | 'ajuste' | 'inventario';
  quantidade: number;
  motivo?: string;
  documento_referencia?: string;
}

export const useEstoque = () => {
  const [estoqueConsolidado, setEstoqueConsolidado] = useState<EstoqueConsolidado[]>([]);
  const [historicoEstoque, setHistoricoEstoque] = useState<HistoricoEstoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Carregar estoque consolidado
  const carregarEstoqueConsolidado = useCallback(async (filtros?: {
    categoria?: string;
    status_estoque?: string;
    busca?: string;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('vw_estoque_consolidado')
        .select('*')
        .order('produto_nome');

      // Aplicar filtros
      if (filtros?.categoria) {
        query = query.eq('categoria', filtros.categoria);
      }
      
      if (filtros?.status_estoque) {
        query = query.eq('status_estoque', filtros.status_estoque);
      }
      
      if (filtros?.busca) {
        query = query.or(`produto_nome.ilike.%${filtros.busca}%,sku.ilike.%${filtros.busca}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setEstoqueConsolidado(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar estoque';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Carregar histórico de estoque
  const carregarHistoricoEstoque = useCallback(async (produtoId?: string, limite = 50) => {
    setLoading(true);
    setError(null);
    
    try {
      let query = supabase
        .from('historico_estoque')
        .select(`
          *,
          produtos!inner(nome, sku),
          lotes(numero_lote),
          localizacoes(codigo, descricao),
          profiles(full_name)
        `)
        .order('data_operacao', { ascending: false })
        .limit(limite);

      if (produtoId) {
        query = query.eq('produto_id', produtoId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setHistoricoEstoque(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar histórico';
      setError(errorMessage);
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Executar movimentação de estoque
  const executarMovimentacao = useCallback(async (movimentacao: MovimentacaoEstoque) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validações básicas
      if (movimentacao.quantidade <= 0) {
        throw new Error('Quantidade deve ser maior que zero');
      }

      if (movimentacao.tipo === 'transferencia' && 
          (!movimentacao.localizacao_origem_id || !movimentacao.localizacao_destino_id)) {
        throw new Error('Transferência requer localização de origem e destino');
      }

      if (movimentacao.tipo === 'saida' && !movimentacao.localizacao_origem_id) {
        throw new Error('Saída requer localização de origem');
      }

      if (movimentacao.tipo === 'entrada' && !movimentacao.localizacao_destino_id) {
        throw new Error('Entrada requer localização de destino');
      }

      // Verificar estoque disponível para saídas e transferências
      if (['saida', 'transferencia'].includes(movimentacao.tipo)) {
        const { data: estoqueAtual } = await supabase
          .from('estoque_localizacao')
          .select('quantidade')
          .eq('produto_id', movimentacao.produto_id)
          .eq('localizacao_id', movimentacao.localizacao_origem_id!)
          .eq('lote_id', movimentacao.lote_id!)
          .single();

        if (!estoqueAtual || estoqueAtual.quantidade < movimentacao.quantidade) {
          throw new Error('Estoque insuficiente para a operação');
        }
      }

      // Inserir movimentação (triggers irão processar automaticamente)
      const { error } = await supabase
        .from('movimentacoes')
        .insert({
          produto_id: movimentacao.produto_id,
          lote_id: movimentacao.lote_id,
          localizacao_origem_id: movimentacao.localizacao_origem_id,
          localizacao_destino_id: movimentacao.localizacao_destino_id,
          tipo: movimentacao.tipo,
          quantidade: movimentacao.quantidade,
          motivo: movimentacao.motivo,
          documento_referencia: movimentacao.documento_referencia,
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Movimentação executada com sucesso",
      });

      // Recarregar dados
      await carregarEstoqueConsolidado();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao executar movimentação';
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
  }, [toast, carregarEstoqueConsolidado]);

  // Calcular estoque de um produto específico
  const calcularEstoqueProduto = useCallback(async (produtoId: string): Promise<number> => {
    try {
      const { data, error } = await supabase
        .rpc('calcular_estoque_produto', { produto_uuid: produtoId });

      if (error) throw error;
      
      return data || 0;
    } catch (err) {
      console.error('Erro ao calcular estoque:', err);
      return 0;
    }
  }, []);

  // Obter produtos com estoque crítico
  const obterProdutosCriticos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('vw_estoque_consolidado')
        .select('*')
        .in('status_estoque', ['CRITICO', 'BAIXO'])
        .order('quantidade_total');

      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error('Erro ao obter produtos críticos:', err);
      return [];
    }
  }, []);

  // Obter estatísticas de estoque
  const obterEstatisticasEstoque = useCallback(async () => {
    try {
      const { data: consolidado, error } = await supabase
        .from('vw_estoque_consolidado')
        .select('*');

      if (error) throw error;

      const stats = {
        totalItensEstoque: consolidado?.reduce((acc, item) => acc + (item.quantidade_total || 0), 0) || 0,
        totalProdutos: consolidado?.length || 0,
        valorTotalEstoque: consolidado?.reduce((acc, item) => acc + (item.valor_total_estoque || 0), 0) || 0,
        produtosCriticos: consolidado?.filter(item => item.status_estoque === 'CRITICO').length || 0,
        produtosBaixos: consolidado?.filter(item => item.status_estoque === 'BAIXO').length || 0,
        produtosExcesso: consolidado?.filter(item => item.status_estoque === 'EXCESSO').length || 0,
        produtosNormais: consolidado?.filter(item => item.status_estoque === 'NORMAL').length || 0,
      };

      return stats;
    } catch (err) {
      console.error('Erro ao obter estatísticas:', err);
      return {
        totalItensEstoque: 0,
        totalProdutos: 0,
        valorTotalEstoque: 0,
        produtosCriticos: 0,
        produtosBaixos: 0,
        produtosExcesso: 0,
        produtosNormais: 0,
      };
    }
  }, []);

  // Executar verificação de estoque (função administrativa)
  const executarVerificacaoEstoque = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .rpc('executar_verificacao_estoque');

      if (error) throw error;

      toast({
        title: "Verificação Concluída",
        description: data || "Verificação de estoque executada com sucesso",
      });

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro na verificação';
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    }
  }, [toast]);

  // Carregar dados iniciais
  useEffect(() => {
    carregarEstoqueConsolidado();
  }, [carregarEstoqueConsolidado]);

  return {
    // Estados
    estoqueConsolidado,
    historicoEstoque,
    loading,
    error,
    
    // Funções
    carregarEstoqueConsolidado,
    carregarHistoricoEstoque,
    executarMovimentacao,
    calcularEstoqueProduto,
    obterProdutosCriticos,
    obterEstatisticasEstoque,
    executarVerificacaoEstoque,
  };
};