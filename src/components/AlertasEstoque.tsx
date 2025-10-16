import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Clock, 
  Package, 
  Calendar,
  Eye,
  Check,
  X,
  Filter,
  RefreshCw,
  Grid3X3,
  List
} from "lucide-react";
import { useAlertasEstoque, AlertaEstoque, LoteVencimento } from '@/hooks/use-alertas-estoque';
import { useIsMobile } from '@/hooks/use-mobile';

const AlertasEstoque = () => {
  const isMobile = useIsMobile();
  
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroCriticidade, setFiltroCriticidade] = useState('');
  const [alertasSelecionados, setAlertasSelecionados] = useState<string[]>([]);
  const [showResolverDialog, setShowResolverDialog] = useState(false);
  const [observacoesResolucao, setObservacoesResolucao] = useState('');
  
  // Controle de visualização: cards (melhor no mobile) ou tabela
  const [viewMode, setViewMode] = useState<"cards" | "table">(isMobile ? "cards" : "table");
  
  useEffect(() => {
    if (isMobile) {
      setViewMode("cards");
    }
  }, [isMobile]);

  const {
    alertas,
    lotesVencimento,
    loading,
    carregarAlertas,
    carregarLotesVencimento,
    resolverAlerta,
    resolverMultiplosAlertas,
    obterContadoresAlertas
  } = useAlertasEstoque();

  // Filtrar alertas
  const alertasFiltrados = alertas.filter(alerta => {
    const matchTipo = !filtroTipo || filtroTipo === 'todos' || alerta.tipo_alerta === filtroTipo;
    const matchCriticidade = !filtroCriticidade || filtroCriticidade === 'todas' || alerta.nivel_criticidade === filtroCriticidade;
    return matchTipo && matchCriticidade;
  });

  // Filtrar lotes por vencimento
  const lotesVencidos = lotesVencimento.filter(lote => lote.status_vencimento === 'VENCIDO');
  const lotesVencendo30 = lotesVencimento.filter(lote => lote.status_vencimento === 'VENCENDO_30_DIAS');
  const lotesVencendo60 = lotesVencimento.filter(lote => lote.status_vencimento === 'VENCENDO_60_DIAS');

  // Função para obter ícone do nível de criticidade
  const getCriticidadeIcon = (nivel: string) => {
    switch (nivel) {
      case 'critico': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'alto': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medio': return <Info className="h-4 w-4 text-yellow-500" />;
      case 'baixo': return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  // Função para obter cor do badge de criticidade
  const getCriticidadeColor = (nivel: string) => {
    switch (nivel) {
      case 'critico': return 'destructive';
      case 'alto': return 'secondary';
      case 'medio': return 'outline';
      case 'baixo': return 'default';
      default: return 'default';
    }
  };

  // Função para obter cor do status de vencimento
  const getVencimentoColor = (status: string) => {
    switch (status) {
      case 'VENCIDO': return 'destructive';
      case 'VENCENDO_30_DIAS': return 'secondary';
      case 'VENCENDO_60_DIAS': return 'outline';
      default: return 'default';
    }
  };

  // Função para formatar data
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para selecionar/deselecionar alerta
  const toggleAlertaSelecionado = (alertaId: string) => {
    setAlertasSelecionados(prev => 
      prev.includes(alertaId) 
        ? prev.filter(id => id !== alertaId)
        : [...prev, alertaId]
    );
  };

  // Função para selecionar todos os alertas
  const toggleTodosAlertas = () => {
    if (alertasSelecionados.length === alertasFiltrados.length) {
      setAlertasSelecionados([]);
    } else {
      setAlertasSelecionados(alertasFiltrados.map(alerta => alerta.id));
    }
  };

  // Função para resolver alertas selecionados
  const handleResolverSelecionados = async () => {
    try {
      if (alertasSelecionados.length === 1) {
        await resolverAlerta(alertasSelecionados[0], observacoesResolucao);
      } else {
        await resolverMultiplosAlertas(alertasSelecionados, observacoesResolucao);
      }
      
      setAlertasSelecionados([]);
      setObservacoesResolucao('');
      setShowResolverDialog(false);
    } catch (error) {
      console.error('Erro ao resolver alertas:', error);
    }
  };

  const handleRefresh = async () => {
    await carregarAlertas();
    await carregarLotesVencimento();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Alertas de Estoque</h2>
          <p className="text-muted-foreground">
            Monitoramento e gestão de alertas automáticos
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          {alertasSelecionados.length > 0 && (
            <Button onClick={() => setShowResolverDialog(true)} size="sm">
              <Check className="h-4 w-4 mr-2" />
              Resolver ({alertasSelecionados.length})
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="alertas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alertas">Alertas Ativos</TabsTrigger>
          <TabsTrigger value="vencimento">Lotes Vencendo</TabsTrigger>
        </TabsList>

        <TabsContent value="alertas" className="space-y-4">
          {/* Filtros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Tipo de alerta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="estoque_minimo">Estoque Mínimo</SelectItem>
                    <SelectItem value="estoque_maximo">Estoque Máximo</SelectItem>
                    <SelectItem value="produto_vencido">Produto Vencido</SelectItem>
                    <SelectItem value="produto_vencendo">Produto Vencendo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroCriticidade} onValueChange={setFiltroCriticidade}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Criticidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as criticidades</SelectItem>
                    <SelectItem value="critico">Crítico</SelectItem>
                    <SelectItem value="alto">Alto</SelectItem>
                    <SelectItem value="medio">Médio</SelectItem>
                    <SelectItem value="baixo">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Alternador de visualização (apenas desktop). No mobile, usamos automaticamente "cards" */}
          {!isMobile && (
            <div className="flex justify-end mb-4">
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as "cards" | "table")}
              >
                <ToggleGroupItem value="cards" aria-label="Visualização em cards">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Visualização em tabela">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}

          {/* Alertas Ativos - Cards ou Tabela */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas Ativos</CardTitle>
              <CardDescription>
                {alertasFiltrados.length} de {alertas.length} alertas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Visualização em Cards (mobile ou quando selecionado) */}
              {(viewMode === "cards" || isMobile) ? (
                <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                  {loading ? (
                    <div className="col-span-full text-center py-8">Carregando alertas...</div>
                  ) : alertasFiltrados.length === 0 ? (
                    <div className="col-span-full">
                      <Card>
                        <CardContent className={isMobile ? "p-8 text-center" : "p-12 text-center"}>
                          <AlertTriangle className={isMobile ? "h-12 w-12 mx-auto text-muted-foreground mb-4" : "h-16 w-16 mx-auto text-muted-foreground mb-4"} />
                          <h3 className={isMobile ? "text-lg font-semibold mb-2" : "text-xl font-semibold mb-2"}>
                            Nenhum alerta encontrado
                          </h3>
                          <p className={isMobile ? "text-sm text-muted-foreground" : "text-muted-foreground"}>
                            {alertas.length === 0
                              ? "Não há alertas ativos no sistema."
                              : "Tente ajustar os filtros para encontrar alertas."
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    alertasFiltrados.map((alerta) => (
                      <Card key={alerta.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className={isMobile ? "p-4 pb-2" : "pb-3"}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {getCriticidadeIcon(alerta.nivel_criticidade)}
                                <Badge variant={getCriticidadeColor(alerta.nivel_criticidade)}>
                                  {alerta.nivel_criticidade}
                                </Badge>
                              </div>
                              <CardTitle className={isMobile ? "text-base line-clamp-2" : "text-lg line-clamp-2"}>
                                {alerta.produto?.nome}
                              </CardTitle>
                              <p className={isMobile ? "text-xs text-muted-foreground font-mono" : "text-sm text-muted-foreground font-mono"}>
                                {alerta.produto?.sku}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Checkbox
                                checked={alertasSelecionados.includes(alerta.id)}
                                onCheckedChange={() => toggleAlertaSelecionado(alerta.id)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setAlertasSelecionados([alerta.id]);
                                  setShowResolverDialog(true);
                                }}
                                title="Resolver alerta"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className={isMobile ? "p-4 pt-0" : "pt-0"}>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Tipo:</span>
                              <Badge variant="outline" className={isMobile ? "text-xs" : undefined}>
                                {alerta.tipo_alerta.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Qtd Atual:</span>
                              <span className={isMobile ? "text-sm font-medium" : "font-medium"}>{alerta.quantidade_atual}</span>
                            </div>
                            {alerta.quantidade_referencia && (
                              <div className="flex justify-between items-center">
                                <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Qtd Ref:</span>
                                <span className={isMobile ? "text-sm font-medium" : "font-medium"}>{alerta.quantidade_referencia}</span>
                              </div>
                            )}
                            <div className="mt-3">
                              <p className={isMobile ? "text-xs text-muted-foreground line-clamp-2" : "text-sm text-muted-foreground line-clamp-2"} title={alerta.mensagem}>
                                {alerta.mensagem}
                              </p>
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                              <span>{formatarData(alerta.data_criacao)}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              ) : (
                // Visualização em Tabela (desktop apenas)
                <div className="overflow-x-auto">
                  <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={alertasSelecionados.length === alertasFiltrados.length && alertasFiltrados.length > 0}
                          onCheckedChange={toggleTodosAlertas}
                        />
                      </TableHead>
                      <TableHead>Criticidade</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Mensagem</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          Carregando...
                        </TableCell>
                      </TableRow>
                    ) : alertasFiltrados.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          Nenhum alerta encontrado
                        </TableCell>
                      </TableRow>
                    ) : (
                      alertasFiltrados.map((alerta) => (
                        <TableRow key={alerta.id}>
                          <TableCell>
                            <Checkbox
                              checked={alertasSelecionados.includes(alerta.id)}
                              onCheckedChange={() => toggleAlertaSelecionado(alerta.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCriticidadeIcon(alerta.nivel_criticidade)}
                              <Badge variant={getCriticidadeColor(alerta.nivel_criticidade)}>
                                {alerta.nivel_criticidade}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{alerta.produto?.nome}</div>
                              <div className="text-sm text-muted-foreground">
                                {alerta.produto?.sku}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {alerta.tipo_alerta.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{alerta.quantidade_atual}</div>
                              {alerta.quantidade_referencia && (
                                <div className="text-sm text-muted-foreground">
                                  Ref: {alerta.quantidade_referencia}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm truncate" title={alerta.mensagem}>
                              {alerta.mensagem}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {formatarData(alerta.data_criacao)}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setAlertasSelecionados([alerta.id]);
                                setShowResolverDialog(true);
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vencimento" className="space-y-4">
          {/* Lotes Vencidos */}
          {lotesVencidos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Lotes Vencidos</CardTitle>
                <CardDescription>
                  {lotesVencidos.length} lotes vencidos requerem ação imediata
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Visualização em Cards (mobile ou quando selecionado) */}
                {(viewMode === "cards" || isMobile) ? (
                  <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                    {lotesVencidos.map((lote) => (
                      <Card key={lote.lote_id} className="hover:shadow-md transition-shadow border-red-200">
                        <CardHeader className={isMobile ? "p-4 pb-2" : "pb-3"}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className={isMobile ? "text-base line-clamp-2" : "text-lg line-clamp-2"}>
                                {lote.produto_nome}
                              </CardTitle>
                              <p className={isMobile ? "text-xs text-muted-foreground font-mono" : "text-sm text-muted-foreground font-mono"}>
                                {lote.sku}
                              </p>
                            </div>
                            <Badge variant={getVencimentoColor(lote.status_vencimento)} className="text-red-600">
                              VENCIDO
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className={isMobile ? "p-4 pt-0" : "pt-0"}>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Lote:</span>
                              <span className={isMobile ? "text-sm font-mono font-medium" : "font-mono font-medium"}>{lote.numero_lote}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Vencimento:</span>
                              <span className={isMobile ? "text-sm font-medium text-red-600" : "font-medium text-red-600"}>
                                {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Quantidade:</span>
                              <span className={isMobile ? "text-sm font-medium" : "font-medium"}>{lote.quantidade_total}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Visualização em Tabela (desktop apenas)
                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Data Vencimento</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lotesVencidos.map((lote) => (
                        <TableRow key={lote.lote_id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{lote.produto_nome}</div>
                              <div className="text-sm text-muted-foreground">{lote.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{lote.numero_lote}</TableCell>
                          <TableCell>
                            {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>{lote.quantidade_total}</TableCell>
                          <TableCell>
                            <Badge variant={getVencimentoColor(lote.status_vencimento)}>
                              VENCIDO
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Lotes Vencendo em 30 dias */}
          {lotesVencendo30.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Vencendo em 30 dias</CardTitle>
                <CardDescription>
                  {lotesVencendo30.length} lotes vencendo nos próximos 30 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Visualização em Cards (mobile ou quando selecionado) */}
                {(viewMode === "cards" || isMobile) ? (
                  <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                    {lotesVencendo30.map((lote) => (
                      <Card key={lote.lote_id} className="hover:shadow-md transition-shadow border-orange-200">
                        <CardHeader className={isMobile ? "p-4 pb-2" : "pb-3"}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className={isMobile ? "text-base line-clamp-2" : "text-lg line-clamp-2"}>
                                {lote.produto_nome}
                              </CardTitle>
                              <p className={isMobile ? "text-xs text-muted-foreground font-mono" : "text-sm text-muted-foreground font-mono"}>
                                {lote.sku}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-orange-600">
                              {lote.dias_para_vencimento} dias
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className={isMobile ? "p-4 pt-0" : "pt-0"}>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Lote:</span>
                              <span className={isMobile ? "text-sm font-mono font-medium" : "font-mono font-medium"}>{lote.numero_lote}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Vencimento:</span>
                              <span className={isMobile ? "text-sm font-medium text-orange-600" : "font-medium text-orange-600"}>
                                {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Quantidade:</span>
                              <span className={isMobile ? "text-sm font-medium" : "font-medium"}>{lote.quantidade_total}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Visualização em Tabela (desktop apenas)
                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Data Vencimento</TableHead>
                        <TableHead>Dias Restantes</TableHead>
                        <TableHead>Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lotesVencendo30.map((lote) => (
                        <TableRow key={lote.lote_id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{lote.produto_nome}</div>
                              <div className="text-sm text-muted-foreground">{lote.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{lote.numero_lote}</TableCell>
                          <TableCell>
                            {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {lote.dias_para_vencimento} dias
                            </Badge>
                          </TableCell>
                          <TableCell>{lote.quantidade_total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Lotes Vencendo em 60 dias */}
          {lotesVencendo60.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Vencendo em 60 dias</CardTitle>
                <CardDescription>
                  {lotesVencendo60.length} lotes vencendo nos próximos 60 dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Visualização em Cards (mobile ou quando selecionado) */}
                {(viewMode === "cards" || isMobile) ? (
                  <div className={isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
                    {lotesVencendo60.map((lote) => (
                      <Card key={lote.lote_id} className="hover:shadow-md transition-shadow border-yellow-200">
                        <CardHeader className={isMobile ? "p-4 pb-2" : "pb-3"}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className={isMobile ? "text-base line-clamp-2" : "text-lg line-clamp-2"}>
                                {lote.produto_nome}
                              </CardTitle>
                              <p className={isMobile ? "text-xs text-muted-foreground font-mono" : "text-sm text-muted-foreground font-mono"}>
                                {lote.sku}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-yellow-600">
                              {lote.dias_para_vencimento} dias
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className={isMobile ? "p-4 pt-0" : "pt-0"}>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Lote:</span>
                              <span className={isMobile ? "text-sm font-mono font-medium" : "font-mono font-medium"}>{lote.numero_lote}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Vencimento:</span>
                              <span className={isMobile ? "text-sm font-medium text-yellow-600" : "font-medium text-yellow-600"}>
                                {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={isMobile ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>Quantidade:</span>
                              <span className={isMobile ? "text-sm font-medium" : "font-medium"}>{lote.quantidade_total}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Visualização em Tabela (desktop apenas)
                  <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Data Vencimento</TableHead>
                        <TableHead>Dias Restantes</TableHead>
                        <TableHead>Quantidade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lotesVencendo60.map((lote) => (
                        <TableRow key={lote.lote_id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{lote.produto_nome}</div>
                              <div className="text-sm text-muted-foreground">{lote.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{lote.numero_lote}</TableCell>
                          <TableCell>
                            {new Date(lote.data_validade).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {lote.dias_para_vencimento} dias
                            </Badge>
                          </TableCell>
                          <TableCell>{lote.quantidade_total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {lotesVencimento.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Nenhum lote próximo ao vencimento</h3>
                <p className="text-muted-foreground">
                  Todos os lotes estão dentro do prazo de validade
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog para Resolver Alertas */}
      <Dialog open={showResolverDialog} onOpenChange={setShowResolverDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolver Alertas</DialogTitle>
            <DialogDescription>
              {alertasSelecionados.length === 1 
                ? 'Resolver 1 alerta selecionado'
                : `Resolver ${alertasSelecionados.length} alertas selecionados`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Observações (opcional)
              </label>
              <Textarea
                placeholder="Descreva a ação tomada para resolver o alerta..."
                value={observacoesResolucao}
                onChange={(e) => setObservacoesResolucao(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowResolverDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleResolverSelecionados}>
                Resolver Alertas
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AlertasEstoque;