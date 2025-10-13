import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Package, 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  RefreshCw,
  Plus,
  Eye,
  ArrowUpDown,
  Calendar,
  MapPin
} from "lucide-react";
import { useEstoque, EstoqueConsolidado } from '@/hooks/use-estoque';
import { useAlertasEstoque } from '@/hooks/use-alertas-estoque';
import { useIsMobile } from '@/hooks/use-mobile';
import KPICard from '@/components/charts/KPICard';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

const Estoque = () => {
  console.log('🚀 [DEBUG] Componente Estoque renderizado');
  
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState<EstoqueConsolidado | null>(null);
  const [showMovimentacaoDialog, setShowMovimentacaoDialog] = useState(false);

  const {
    estoqueConsolidado,
    historicoEstoque,
    loading,
    carregarEstoqueConsolidado,
    carregarHistoricoEstoque,
    obterEstatisticasEstoque,
    executarVerificacaoEstoque
  } = useEstoque();

  const {
    alertas,
    obterContadoresAlertas
  } = useAlertasEstoque();

  const isMobile = useIsMobile();

  const [estatisticas, setEstatisticas] = useState({
    totalItensEstoque: 0,
    totalProdutos: 0,
    valorTotalEstoque: 0,
    produtosCriticos: 0,
    produtosBaixos: 0,
    produtosExcesso: 0,
    produtosNormais: 0,
  });

  const [contadoresAlertas, setContadoresAlertas] = useState({
    total: 0,
    criticos: 0,
    altos: 0,
    medios: 0,
    baixos: 0,
    estoque_minimo: 0,
    estoque_maximo: 0,
    produto_vencido: 0,
    produto_vencendo: 0,
  });

  // Carregar dados iniciais
  useEffect(() => {
    console.log('🔍 [DEBUG] useEffect executado - carregando dados');
    console.log('🔍 [DEBUG] Estado inicial:', {
      estoqueConsolidado: estoqueConsolidado.length,
      loading,
      error
    });
    
    const carregarDados = async () => {
      try {
        // Carregar estoque consolidado
        console.log('🔍 [DEBUG] Carregando estoque consolidado...');
        await carregarEstoqueConsolidado();
        console.log('✅ [DEBUG] Estoque consolidado carregado');
        
        // Carregar estatísticas
        console.log('🔍 [DEBUG] Carregando estatísticas...');
        const stats = await obterEstatisticasEstoque();
        setEstatisticas(stats);
        console.log('✅ [DEBUG] Estatísticas carregadas:', stats);
        
        // Carregar alertas
        console.log('🔍 [DEBUG] Carregando alertas...');
        const contadores = await obterContadoresAlertas();
        setContadoresAlertas(contadores);
        console.log('✅ [DEBUG] Alertas carregados:', contadores);
      } catch (error) {
        console.error('❌ [DEBUG] Erro ao carregar dados:', error);
      }
    };

    carregarDados();
  }, [carregarEstoqueConsolidado, obterEstatisticasEstoque, obterContadoresAlertas]);

  // Aplicar filtros
  const produtosFiltrados = estoqueConsolidado.filter(produto => {
    const matchBusca = !busca || 
      produto.produto_nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.sku.toLowerCase().includes(busca.toLowerCase());
    
    const matchCategoria = !categoriaFiltro || categoriaFiltro === 'todas' || produto.categoria === categoriaFiltro;
    const matchStatus = !statusFiltro || statusFiltro === 'todos' || produto.status_estoque === statusFiltro;
    
    return matchBusca && matchCategoria && matchStatus;
  });

  // Obter categorias únicas
  const categorias = Array.from(new Set(estoqueConsolidado.map(p => p.categoria).filter(Boolean)));

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CRITICO': return 'destructive';
      case 'BAIXO': return 'secondary';
      case 'EXCESSO': return 'outline';
      case 'NORMAL': return 'default';
      default: return 'default';
    }
  };

  // Função para formatar valor monetário
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  // Dados para gráficos
  const dadosStatusEstoque = [
    { name: 'Normal', value: estatisticas.produtosNormais, color: '#22c55e' },
    { name: 'Baixo', value: estatisticas.produtosBaixos, color: '#f59e0b' },
    { name: 'Crítico', value: estatisticas.produtosCriticos, color: '#ef4444' },
    { name: 'Excesso', value: estatisticas.produtosExcesso, color: '#8b5cf6' },
  ];

  const dadosCategoriasValor = categorias.map(categoria => {
    const valorCategoria = estoqueConsolidado
      .filter(p => p.categoria === categoria)
      .reduce((acc, p) => acc + p.valor_total_estoque, 0);
    
    return {
      name: categoria || 'Sem categoria',
      value: valorCategoria
    };
  }).sort((a, b) => b.value - a.value).slice(0, 10);

  const handleRefresh = async () => {
    await carregarEstoqueConsolidado();
    await executarVerificacaoEstoque();
  };

  const handleViewDetails = (produto: EstoqueConsolidado) => {
    setProdutoSelecionado(produto);
    carregarHistoricoEstoque(produto.produto_id, 20);
  };

  // Debug: Log dos dados para diagnóstico
  console.log('🔍 [DEBUG] Estado atual do componente:', {
    loading,
    error,
    estoqueConsolidado: estoqueConsolidado.length,
    estatisticas,
    contadoresAlertas,
    produtosFiltrados: produtosFiltrados.length
  });
  
  // Debug adicional dos produtos
  if (estoqueConsolidado.length > 0) {
    console.log('🔍 [DEBUG] Primeiro produto:', estoqueConsolidado[0]);
  }

  // Se há erro, mostrar mensagem de erro
  if (error) {
    return (
      <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
        <div className="text-center py-12">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-destructive mb-2">Erro de Conexão</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Não foi possível carregar os dados do estoque. Verifique sua conexão com o banco de dados.
            </p>
            <p className="text-xs text-muted-foreground mb-4 font-mono bg-muted p-2 rounded">
              {error}
            </p>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-center'}`}>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>Controle de Estoque</h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Gestão completa e consultas rápidas do estoque
          </p>
          {/* Debug info */}
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-muted-foreground mt-1">
              Debug: {estoqueConsolidado.length} produtos carregados
            </p>
          )}
        </div>
        <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size={isMobile ? "sm" : "sm"}
            className={isMobile ? 'flex-1' : ''}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {isMobile ? 'Atualizar' : 'Atualizar'}
          </Button>
          <Button 
            onClick={() => setShowMovimentacaoDialog(true)} 
            size={isMobile ? "sm" : "sm"}
            className={isMobile ? 'flex-1' : ''}
          >
            <Plus className="h-4 w-4 mr-2" />
            {isMobile ? 'Nova' : 'Nova Movimentação'}
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        <KPICard
          title="Total de Itens"
          value={estatisticas.totalItensEstoque}
          icon={<Package className="h-5 w-5" />}
          description="Itens em estoque"
          format="number"
        />
        <KPICard
          title="Total de Produtos"
          value={estatisticas.totalProdutos}
          icon={<Package className="h-5 w-5" />}
          description="Produtos ativos"
          format="number"
        />
        <KPICard
          title="Valor Total"
          value={estatisticas.valorTotalEstoque}
          icon={<BarChart3 className="h-5 w-5" />}
          description="Valor do estoque"
          format="currency"
        />
        <KPICard
          title="Alertas Ativos"
          value={contadoresAlertas.total}
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Requerem atenção"
          format="number"
        />
      </div>

      {/* Gráficos */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
        <Card>
          <CardHeader>
            <CardTitle className={isMobile ? 'text-lg' : ''}>Status do Estoque</CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Distribuição por níveis de estoque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={isMobile ? 'h-48' : 'h-64'}>
              <PieChart data={dadosStatusEstoque} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={isMobile ? 'text-lg' : ''}>Valor por Categoria</CardTitle>
            <CardDescription className={isMobile ? 'text-sm' : ''}>
              Top 10 categorias por valor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={isMobile ? 'h-48' : 'h-64'}>
              <BarChart data={dadosCategoriasValor} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className={isMobile ? 'text-lg' : ''}>Produtos em Estoque</CardTitle>
          <CardDescription className={isMobile ? 'text-sm' : ''}>
            Consulte e gerencie o estoque de produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`${isMobile ? 'space-y-3' : 'flex gap-4 mb-6'}`}>
            <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className={`pl-10 ${isMobile ? 'text-base' : ''}`}
              />
            </div>
            
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className={isMobile ? 'w-full' : 'w-48'}>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as categorias</SelectItem>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFiltro} onValueChange={setStatusFiltro}>
              <SelectTrigger className={isMobile ? 'w-full' : 'w-48'}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="NORMAL">Normal</SelectItem>
                <SelectItem value="BAIXO">Baixo</SelectItem>
                <SelectItem value="CRITICO">Crítico</SelectItem>
                <SelectItem value="EXCESSO">Excesso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela de Produtos */}
          <div className={`${isMobile ? 'overflow-x-auto' : ''}`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isMobile ? 'min-w-32' : ''}>SKU</TableHead>
                  <TableHead className={isMobile ? 'min-w-40' : ''}>Produto</TableHead>
                  {!isMobile && <TableHead>Categoria</TableHead>}
                  <TableHead className={isMobile ? 'min-w-24' : ''}>Qtd</TableHead>
                  <TableHead className={isMobile ? 'min-w-20' : ''}>Status</TableHead>
                  {!isMobile && <TableHead>Valor Total</TableHead>}
                  <TableHead className={isMobile ? 'min-w-20' : ''}>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 7} className="text-center py-8">
                      Carregando produtos...
                    </TableCell>
                  </TableRow>
                ) : produtosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 7} className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <Package className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium text-lg">Nenhum produto encontrado</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {estoqueConsolidado.length === 0 
                              ? 'Não há produtos cadastrados no sistema. Configure o banco de dados e insira dados de exemplo.'
                              : 'Tente ajustar os filtros de busca para encontrar produtos.'
                            }
                          </p>
                          {estoqueConsolidado.length === 0 && (
                            <div className="mt-4 p-4 bg-muted rounded-lg text-left">
                              <h4 className="font-medium text-sm mb-2">Para configurar o sistema:</h4>
                              <ol className="text-xs text-muted-foreground space-y-1">
                                <li>1. Crie um arquivo .env com suas credenciais do Supabase</li>
                                <li>2. Execute as migrações do banco de dados</li>
                                <li>3. Insira dados de exemplo usando o script insert-sample-data.js</li>
                              </ol>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  produtosFiltrados.map((produto) => (
                    <TableRow key={produto.produto_id}>
                      <TableCell className={`font-mono ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {produto.sku}
                      </TableCell>
                      <TableCell className={isMobile ? 'text-sm' : ''}>
                        <div>
                          <div className="font-medium">{produto.produto_nome}</div>
                          {isMobile && (
                            <div className="text-xs text-muted-foreground">
                              {produto.categoria}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      {!isMobile && (
                        <TableCell>
                          <Badge variant="outline">{produto.categoria}</Badge>
                        </TableCell>
                      )}
                      <TableCell className={isMobile ? 'text-sm' : ''}>
                        <div className="text-right">
                          <div className="font-medium">{produto.quantidade_total}</div>
                          <div className={`text-xs text-muted-foreground ${isMobile ? 'hidden' : ''}`}>
                            {produto.unidade_medida}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(produto.status_estoque) as any}>
                          {produto.status_estoque}
                        </Badge>
                      </TableCell>
                      {!isMobile && (
                        <TableCell className="text-right font-medium">
                          {formatarMoeda(produto.valor_total_estoque)}
                        </TableCell>
                      )}
                      <TableCell>
                        <Button
                          variant="ghost"
                          size={isMobile ? "sm" : "sm"}
                          onClick={() => handleViewDetails(produto)}
                        >
                          <Eye className="h-4 w-4" />
                          {!isMobile && <span className="ml-2">Ver</span>}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Produto */}
      <Dialog open={!!produtoSelecionado} onOpenChange={() => setProdutoSelecionado(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Estoque</DialogTitle>
            <DialogDescription>
              {produtoSelecionado?.produto_nome} ({produtoSelecionado?.sku})
            </DialogDescription>
          </DialogHeader>
          
          {produtoSelecionado && (
            <div className="space-y-6">
              {/* Informações Gerais */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Quantidade Total
                  </label>
                  <p className="text-2xl font-bold">{produtoSelecionado.quantidade_total}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Valor Total
                  </label>
                  <p className="text-2xl font-bold">
                    {formatarMoeda(produtoSelecionado.valor_total_estoque)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Localizações
                  </label>
                  <p className="text-2xl font-bold">{produtoSelecionado.localizacoes_ocupadas}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Lotes Ativos
                  </label>
                  <p className="text-2xl font-bold">{produtoSelecionado.lotes_ativos}</p>
                </div>
              </div>

              {/* Histórico de Movimentações */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Histórico de Movimentações</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Operação</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Observações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicoEstoque.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            Nenhuma movimentação encontrada
                          </TableCell>
                        </TableRow>
                      ) : (
                        historicoEstoque.slice(0, 10).map((historico) => (
                          <TableRow key={historico.id}>
                            <TableCell>
                              {new Date(historico.data_operacao).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {historico.tipo_operacao}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={historico.diferenca > 0 ? 'text-green-600' : 'text-red-600'}>
                                {historico.diferenca > 0 ? '+' : ''}{historico.diferenca}
                              </span>
                            </TableCell>
                            <TableCell>{historico.documento_referencia || '—'}</TableCell>
                            <TableCell>{historico.observacoes || '—'}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Estoque;