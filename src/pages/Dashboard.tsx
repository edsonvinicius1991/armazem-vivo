import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "@/components/StatCard";
import HologramAnimation from "@/components/HologramAnimation";
import { Package, MapPin, TrendingUp, DollarSign, AlertTriangle, Loader2 } from "lucide-react";
import techWarehouseImage from "../assets/tech-warehouse.png";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/charts/KPICard";
import BarChart from "@/components/charts/BarChart";
import ParetoChart from "@/components/charts/ParetoChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import Sparkline from "@/components/charts/Sparkline";
import AlertasEstoque from "@/components/AlertasEstoque";
import { useEstoque } from "@/hooks/use-estoque";
import { useIsMobile } from "@/hooks/use-mobile";

type PeriodoFiltro = 'semanal' | 'mensal' | 'trimestral' | 'anual';

const Dashboard = () => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<PeriodoFiltro>('semanal');
  const isMobile = useIsMobile();
  
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalLocalizacoes: 0,
    valorEstoque: 0,
    movimentacoesHoje: 0,
    produtosAbaixoEstoqueMinimo: 0,
    almoxarifadosAtivos: 0,
  });

  const [estatisticasEstoque, setEstatisticasEstoque] = useState({
    totalItensEstoque: 0,
    totalProdutos: 0,
    valorTotalEstoque: 0,
    produtosCriticos: 0,
    produtosBaixos: 0,
    produtosExcesso: 0,
    produtosNormais: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentMovements, setRecentMovements] = useState<any[]>([]);
  const [movimentacoesPorTipo, setMovimentacoesPorTipo] = useState<any[]>([]);
  const [movimentacoesPorDia, setMovimentacoesPorDia] = useState<any[]>([]);
  const [produtosMaisMovimentados, setProdutosMaisMovimentados] = useState<any[]>([]);
  const [estoquesPorCategoria, setEstoquesPorCategoria] = useState<any[]>([]);

  const { obterEstatisticasEstoque } = useEstoque();

  // Funções auxiliares para o filtro temporal
  const getPeriodoConfig = (periodo: PeriodoFiltro) => {
    const agora = new Date();
    let dataInicio: Date;
    let dias: number;
    let formatoData: Intl.DateTimeFormatOptions;
    let descricao: string;

    switch (periodo) {
      case 'semanal':
        dataInicio = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
        dias = 7;
        formatoData = { weekday: 'short' };
        descricao = 'Últimos 7 dias';
        break;
      case 'mensal':
        dataInicio = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
        dias = 30;
        formatoData = { day: '2-digit', month: '2-digit' };
        descricao = 'Últimos 30 dias';
        break;
      case 'trimestral':
        dataInicio = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000);
        dias = 90;
        formatoData = { day: '2-digit', month: '2-digit' };
        descricao = 'Últimos 90 dias';
        break;
      case 'anual':
        dataInicio = new Date(agora.getTime() - 365 * 24 * 60 * 60 * 1000);
        dias = 365;
        formatoData = { month: 'short', year: '2-digit' };
        descricao = 'Últimos 12 meses';
        break;
      default:
        dataInicio = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);
        dias = 30;
        formatoData = { day: '2-digit', month: '2-digit' };
        descricao = 'Últimos 30 dias';
    }

    return { dataInicio, dias, formatoData, descricao };
  };

  const opcoesPeriodo = [
    { valor: 'semanal' as PeriodoFiltro, label: isMobile ? 'Sem.' : 'Semanal' },
    { valor: 'mensal' as PeriodoFiltro, label: isMobile ? 'Men.' : 'Mensal' },
    { valor: 'trimestral' as PeriodoFiltro, label: isMobile ? 'Tri.' : 'Trimestral' },
    { valor: 'anual' as PeriodoFiltro, label: 'Anual' },
  ];

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const hoje = new Date().toISOString().split("T")[0];

      // Todas as queries independentes em paralelo
      const [
        { count: totalProdutos },
        { count: totalLocalizacoes },
        { count: almoxarifadosAtivos },
        { count: movimentacoesHoje },
        { data: estoqueData },
        { data: estoqueConsolidado },
        { data: movements },
      ] = await Promise.all([
        supabase.from("produtos").select("*", { count: "exact", head: true }).eq("status", "ativo"),
        supabase.from("localizacoes").select("*", { count: "exact", head: true }).eq("ativo", true),
        supabase.from("almoxarifados").select("*", { count: "exact", head: true }).eq("ativo", true),
        supabase.from("movimentacoes").select("*", { count: "exact", head: true }).gte("realizada_em", `${hoje}T00:00:00`),
        supabase.from("estoque_localizacao").select("quantidade, produtos!inner(valor_unitario)"),
        supabase.from("vw_estoque_consolidado").select("quantidade_total, estoque_minimo"),
        supabase.from("movimentacoes").select("*, produtos(sku, nome)").order("realizada_em", { ascending: false }).limit(5),
      ]);

      const valorEstoque = (estoqueData || []).reduce((acc, item: any) =>
        acc + (item.quantidade * (item.produtos?.valor_unitario || 0)), 0);

      const produtosAbaixoMinimo = (estoqueConsolidado || []).filter(
        (item: any) => (item.quantidade_total || 0) < (item.estoque_minimo || 0)
      ).length;

      setStats({
        totalProdutos: totalProdutos || 0,
        totalLocalizacoes: totalLocalizacoes || 0,
        valorEstoque,
        movimentacoesHoje: movimentacoesHoje || 0,
        produtosAbaixoEstoqueMinimo: produtosAbaixoMinimo,
        almoxarifadosAtivos: almoxarifadosAtivos || 0,
      });

      setRecentMovements(movements || []);

      // Estatísticas de estoque e gráficos em paralelo
      const [statsEstoque] = await Promise.all([
        obterEstatisticasEstoque(),
        loadChartsData(),
      ]);
      setEstatisticasEstoque(statsEstoque);
    } catch (error: any) {
      const msg = String(error?.message || "").toLowerCase();
      if (error?.name !== "AbortError" && !msg.includes("abort")) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [periodoSelecionado]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const loadChartsData = async () => {
    try {
      const { dataInicio, dias, formatoData, descricao } = getPeriodoConfig(periodoSelecionado);
      
      // Movimentações por tipo
      const { data: movTipos } = await supabase
        .from("movimentacoes")
        .select("tipo, quantidade")
        .gte("realizada_em", dataInicio.toISOString());

      if (movTipos) {
        const tiposAgrupados = movTipos.reduce((acc: any, mov: any) => {
          const tipo = mov.tipo;
          if (!acc[tipo]) {
            acc[tipo] = { name: getTipoLabel(tipo), value: 0, color: getTipoColor(tipo) };
          }
          acc[tipo].value += mov.quantidade;
          return acc;
        }, {});
        setMovimentacoesPorTipo(Object.values(tiposAgrupados));
      }

      // Movimentações por dia
      const { data: movDias } = await supabase
        .from("movimentacoes")
        .select("realizada_em, quantidade")
        .gte("realizada_em", dataInicio.toISOString())
        .order("realizada_em", { ascending: true });

      if (movDias) {
        // Criar array com todos os dias do período selecionado
        const diasCompletos = [];
        for (let i = dias - 1; i >= 0; i--) {
          const data = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
          const diaFormatado = data.toLocaleDateString("pt-BR", formatoData);
          diasCompletos.push({ name: diaFormatado, value: 0, date: data.toISOString().split('T')[0] });
        }

        // Agrupar movimentações por dia
        const diasAgrupados = movDias.reduce((acc: any, mov: any) => {
          const dataMovimentacao = new Date(mov.realizada_em).toISOString().split('T')[0];
          
          const diaExistente = acc.find((d: any) => d.date === dataMovimentacao);
          if (diaExistente) {
            diaExistente.value += mov.quantidade;
          }
          
          return acc;
        }, diasCompletos);

        setMovimentacoesPorDia(diasAgrupados);
      }

      // Produtos mais movimentados
      const { data: produtosMov } = await supabase
        .from("movimentacoes")
        .select("produto_id, quantidade, produtos!inner(nome, sku)")
        .gte("realizada_em", dataInicio.toISOString());

      if (produtosMov) {
        const produtosAgrupados = produtosMov.reduce((acc: any, mov: any) => {
          const produtoId = mov.produto_id;
          if (!acc[produtoId]) {
            acc[produtoId] = { 
              name: mov.produtos.nome, 
              sku: mov.produtos.sku,
              value: 0 
            };
          }
          acc[produtoId].value += mov.quantidade;
          return acc;
        }, {});
        
        const topProdutos = Object.values(produtosAgrupados)
          .sort((a: any, b: any) => b.value - a.value)
          .slice(0, 5);
        setProdutosMaisMovimentados(topProdutos);
      }

      // Estoque por categoria
      const { data: estoqueCategoria } = await supabase
        .from("estoque_localizacao")
        .select("quantidade, produtos!inner(categoria)")
        .not("produtos.categoria", "is", null);

      if (estoqueCategoria) {
        const categoriasAgrupadas = estoqueCategoria.reduce((acc: any, item: any) => {
          const categoria = item.produtos.categoria || "Sem categoria";
          if (!acc[categoria]) {
            acc[categoria] = { name: categoria, value: 0 };
          }
          acc[categoria].value += item.quantidade;
          return acc;
        }, {});
        setEstoquesPorCategoria(Object.values(categoriasAgrupadas));
      }
    } catch (error) {
      console.error("Erro ao carregar dados dos gráficos:", error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      entrada: "Entrada",
      saida: "Saída",
      transferencia: "Transferência",
      ajuste: "Ajuste",
      devolucao: "Devolução",
    };
    return labels[tipo] || tipo;
  };

  const getTipoVariant = (tipo: string) => {
    const variants: Record<string, any> = {
      entrada: "default",
      saida: "destructive",
      transferencia: "secondary",
      ajuste: "outline",
      devolucao: "secondary",
    };
    return variants[tipo] || "default";
  };

  const getTipoColor = (tipo: string) => {
    const colors: Record<string, string> = {
      entrada: "#22c55e",
      saida: "#ef4444",
      transferencia: "#3b82f6",
      ajuste: "#f59e0b",
      devolucao: "#8b5cf6",
    };
    return colors[tipo] || "#6b7280";
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${isMobile ? 'px-2' : ''}`}>
        {/* Hero skeleton */}
        <div className={`w-full rounded-lg bg-slate-900 animate-pulse ${
          isMobile ? 'h-[140px]' : 'h-[180px] sm:h-[210px] md:h-[240px] lg:h-[270px]'
        }`}>
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-slate-400 animate-spin" />
              <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">Carregando dashboard</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        </div>
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-72 rounded-md bg-muted animate-pulse" />
        </div>
        {/* KPI cards skeleton */}
        <div className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 space-y-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 rounded bg-muted" />
                <div className="h-8 w-8 rounded-full bg-muted" />
              </div>
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-3 w-40 rounded bg-muted" />
            </div>
          ))}
        </div>
        {/* Charts skeleton */}
        <div className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : 'md:grid-cols-2'
        }`}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-5 space-y-3 animate-pulse">
              <div className="h-5 w-40 rounded bg-muted" />
              <div className="h-48 rounded-lg bg-muted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isMobile ? 'px-2' : ''}` }>
      {/* Hero Hologram Animation */}
      <div className={`
        w-full overflow-hidden rounded-lg shadow-sm bg-slate-900
        ${isMobile ? 'h-[140px]' : 'h-[180px] sm:h-[210px] md:h-[240px] lg:h-[270px]'}
      `}>
        <HologramAnimation 
          backgroundImage={techWarehouseImage}
          className="w-full h-full"
        />
      </div>

      <div className={isMobile ? 'text-center' : ''}>
        <h1 className={`font-bold tracking-tight ${isMobile ? 'text-2xl' : 'text-3xl'}`}>
          Dashboard
        </h1>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm mt-1' : ''}`}>
          Visão geral do almoxarifado em tempo real
        </p>
      </div>

      {/* KPIs Grid */}
      <div className={`
        grid gap-4
        ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}
      `}>
        <KPICard
          title="Itens em Estoque"
          value={estatisticasEstoque.totalItensEstoque}
          icon={<Package className="h-5 w-5" />}
          description="Total itens em estoque"
          format="number"
        />
        
        <KPICard
          title="Produtos Registrados"
          value={stats.totalProdutos}
          icon={<Package className="h-5 w-5" />}
          description="Produtos ativos no sistema"
          format="number"
        />
        <KPICard
          title="Localizações Ativas"
          value={stats.totalLocalizacoes}
          icon={<MapPin className="h-5 w-5" />}
          description={`Em ${stats.almoxarifadosAtivos} almoxarifados`}
        />
        <KPICard
          title="Valor do Estoque"
          value={stats.valorEstoque}
          icon={<DollarSign className="h-5 w-5" />}
          description="Valor total inventariado"
          format="currency"
        />
        <KPICard
          title="Movimentações Hoje"
          value={stats.movimentacoesHoje}
          previousValue={stats.movimentacoesHoje > 0 ? Math.max(0, stats.movimentacoesHoje - 2) : 0}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Operações realizadas"
          format="number"
        />
        <KPICard
          title="Alertas de Estoque"
          value={stats.produtosAbaixoEstoqueMinimo}
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Produtos abaixo do mínimo"
          format="number"
        />
      </div>
      
      {/* Filtro de Período Temporal */}
      <div className="flex flex-col gap-4">
        <div className={`
          flex items-center justify-between
          ${isMobile ? 'flex-col gap-3' : ''}
        `}>
          <h2 className={`font-bold tracking-tight ${isMobile ? 'text-xl text-center' : 'text-2xl'}`}>
            Análise Temporal
          </h2>
          <div className={`
            flex gap-1 p-1 bg-muted rounded-lg
            ${isMobile ? 'w-full justify-center' : 'gap-2'}
          `}>
            {opcoesPeriodo.map((opcao) => (
              <Button
                key={opcao.valor}
                variant={periodoSelecionado === opcao.valor ? "default" : "ghost"}
                size={isMobile ? "sm" : "sm"}
                onClick={() => setPeriodoSelecionado(opcao.valor)}
                className={`
                  transition-all duration-200
                  ${isMobile ? 'flex-1 text-xs px-2' : ''}
                  ${periodoSelecionado === opcao.valor 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-background"
                  }
                `}
              >
                {opcao.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Gráficos de Análise */}
        <div className={`
          grid gap-6
          ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}
        `}>
          <LineChart
            title="Movimentações por Tempo"
            description={`Quantidades de movimentações - ${getPeriodoConfig(periodoSelecionado).descricao}`}
            data={movimentacoesPorDia}
            dataKey="value"
            nameKey="name"
            height={isMobile ? 280 : 350}
            color="hsl(var(--primary))"
            showDots={true}
            formatValue={(value) => `${value} itens`}
          />
          
          <PieChart
            title="Movimentações por Tipo"
            description={getPeriodoConfig(periodoSelecionado).descricao}
            data={movimentacoesPorTipo}
            height={isMobile ? 280 : 300}
            innerRadius={isMobile ? 40 : 60}
          />
        </div>

        <div className={`
          grid gap-6
          ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}
        `}>
          <ParetoChart
            title="Produtos Mais Movimentados"
            description={`Top 5 - ${getPeriodoConfig(periodoSelecionado).descricao}`}
            data={produtosMaisMovimentados}
            dataKey="value"
            nameKey="name"
            height={isMobile ? 280 : 300}
          />
          
          <PieChart
            title="Estoque por Categoria"
            description="Distribuição atual"
            data={estoquesPorCategoria}
            height={isMobile ? 280 : 300}
            showLegend={!isMobile}
          />
        </div>
      </div>

      {/* Sparklines para Tendências Rápidas */}
      <div className={`
        grid gap-4
        ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}
      `}>
        <Sparkline
          data={movimentacoesPorDia.map(d => ({ value: d.value }))}
          label="Tendência Semanal"
          currentValue={stats.movimentacoesHoje}
          previousValue={Math.max(0, stats.movimentacoesHoje - 1)}
          format="number"
          color="hsl(var(--primary))"
        />
        <Sparkline
          data={[
            { value: stats.valorEstoque * 0.95 },
            { value: stats.valorEstoque * 0.98 },
            { value: stats.valorEstoque * 1.02 },
            { value: stats.valorEstoque }
          ]}
          label="Valor do Estoque"
          currentValue={stats.valorEstoque}
          previousValue={stats.valorEstoque * 0.98}
          format="currency"
          color="#22c55e"
        />
        <Sparkline
          data={[
            { value: 97.2 },
            { value: 97.8 },
            { value: 98.1 },
            { value: 98.5 }
          ]}
          label="Acurácia"
          currentValue={98.5}
          previousValue={98.1}
          format="percentage"
          color="#3b82f6"
        />
      </div>

      {/* Recent Movements */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className={isMobile ? 'text-lg' : ''}>Últimas Movimentações</CardTitle>
          <CardDescription className={isMobile ? 'text-sm' : ''}>
            Operações mais recentes no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentMovements.length === 0 ? (
            <p className={`
              text-muted-foreground text-center py-8
              ${isMobile ? 'text-sm' : ''}
            `}>
              Nenhuma movimentação registrada ainda
            </p>
          ) : (
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <div
                  key={movement.id}
                  className={`
                    flex items-center justify-between border border-border rounded-lg hover:bg-muted/50 transition-colors
                    ${isMobile ? 'p-3 flex-col gap-2' : 'p-4'}
                  `}
                >
                  <div className={`${isMobile ? 'w-full' : 'flex-1'}`}>
                    <div className={`
                      flex items-center gap-2 mb-1
                      ${isMobile ? 'flex-wrap' : ''}
                    `}>
                      <Badge variant={getTipoVariant(movement.tipo)}>
                        {getTipoLabel(movement.tipo)}
                      </Badge>
                      <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                        {movement.produtos?.sku}
                      </span>
                    </div>
                    <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {movement.produtos?.nome}
                    </p>
                    <p className={`text-muted-foreground mt-1 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      Por {movement.profiles?.nome_completo} •{" "}
                      {new Date(movement.realizada_em).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className={`text-right ${isMobile ? 'w-full text-center' : ''}`}>
                    <p className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>
                      {movement.quantidade} UN
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seção de Alertas de Estoque */}
      <Card>
        <CardHeader>
          <CardTitle className={`
            flex items-center gap-2
            ${isMobile ? 'text-lg flex-col text-center' : ''}
          `}>
            <AlertTriangle className="h-5 w-5" />
            Alertas de Estoque
          </CardTitle>
          <CardDescription className={isMobile ? 'text-sm text-center' : ''}>
            Monitoramento de alertas críticos e produtos que requerem atenção
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertasEstoque />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
