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
import KPICard from '@/components/charts/KPICard';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

const Estoque = () => {
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

  // Carregar estatísticas
  useEffect(() => {
    const carregarEstatisticas = async () => {
      const stats = await obterEstatisticasEstoque();
      setEstatisticas(stats);
      
      const contadores = await obterContadoresAlertas();
      setContadoresAlertas(contadores);
    };

    carregarEstatisticas();
  }, [obterEstatisticasEstoque, obterContadoresAlertas]);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Controle de Estoque</h1>
          <p className="text-muted-foreground">
            Gestão completa e consultas rápidas do estoque
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setShowMovimentacaoDialog(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Movimentação
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <KPICard
          title="Produtos Críticos"
          value={estatisticas.produtosCriticos}
          icon={<TrendingDown className="h-5 w-5" />}
          description="Estoque zerado/baixo"
          format="number"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status do Estoque</CardTitle>
            <CardDescription>Distribuição por nível de estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={dadosStatusEstoque} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor por Categoria</CardTitle>
            <CardDescription>Top 10 categorias por valor</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={dadosCategoriasValor} />
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou SKU..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
              <SelectTrigger className="w-full md:w-48">
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
              <SelectTrigger className="w-full md:w-48">
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
        </CardContent>
      </Card>

      {/* Tabela de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos em Estoque</CardTitle>
          <CardDescription>
            {produtosFiltrados.length} de {estoqueConsolidado.length} produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Localizações</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : produtosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  produtosFiltrados.map((produto) => (
                    <TableRow key={produto.produto_id}>
                      <TableCell className="font-mono text-sm">
                        {produto.sku}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.produto_nome}</div>
                          <div className="text-sm text-muted-foreground">
                            {produto.unidade}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{produto.categoria || '—'}</TableCell>
                      <TableCell className="text-right">
                        <div>
                          <div className="font-medium">{produto.quantidade_total}</div>
                          {produto.estoque_minimo > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Min: {produto.estoque_minimo}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatarMoeda(produto.valor_unitario)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatarMoeda(produto.valor_total_estoque)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(produto.status_estoque)}>
                          {produto.status_estoque}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="text-sm">{produto.localizacoes_ocupadas}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(produto)}
                        >
                          <Eye className="h-4 w-4" />
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