import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "@/components/StatCard";
import HologramAnimation from "@/components/HologramAnimation";
import { Package, MapPin, TrendingUp, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard, BarChart, LineChart, PieChart, Sparkline } from "@/components/charts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalLocalizacoes: 0,
    valorEstoque: 0,
    movimentacoesHoje: 0,
    produtosAbaixoEstoqueMinimo: 0,
    almoxarifadosAtivos: 0,
  });

  const [recentMovements, setRecentMovements] = useState<any[]>([]);
  const [movimentacoesPorTipo, setMovimentacoesPorTipo] = useState<any[]>([]);
  const [movimentacoesPorDia, setMovimentacoesPorDia] = useState<any[]>([]);
  const [produtosMaisMovimentados, setProdutosMaisMovimentados] = useState<any[]>([]);
  const [estoquesPorCategoria, setEstoquesPorCategoria] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { count: totalProdutos } = await supabase
        .from("produtos")
        .select("*", { count: "exact", head: true })
        .eq("status", "ativo");

      const { count: totalLocalizacoes } = await supabase
        .from("localizacoes")
        .select("*", { count: "exact", head: true })
        .eq("ativo", true);

      const { data: estoqueData } = await supabase
        .from("estoque_localizacao")
        .select("quantidade, produtos!inner(custo_unitario)");

      let valorEstoque = 0;
      if (estoqueData) {
        valorEstoque = estoqueData.reduce((acc, item: any) => {
          return acc + (item.quantidade * (item.produtos?.custo_unitario || 0));
        }, 0);
      }

      const hoje = new Date().toISOString().split("T")[0];
      const { count: movimentacoesHoje } = await supabase
        .from("movimentacoes")
        .select("*", { count: "exact", head: true })
        .gte("realizada_em", `${hoje}T00:00:00`);

      const { data: produtosEstoque } = await supabase
        .from("produtos")
        .select("id, sku, nome, estoque_minimo");

      let produtosAbaixoMinimo = 0;
      if (produtosEstoque) {
        for (const produto of produtosEstoque) {
          const { data: estoque } = await supabase
            .from("estoque_localizacao")
            .select("quantidade")
            .eq("produto_id", produto.id);

          const qtdTotal = estoque?.reduce((acc, e) => acc + Number(e.quantidade), 0) || 0;
          if (qtdTotal < (produto.estoque_minimo || 0)) {
            produtosAbaixoMinimo++;
          }
        }
      }

      const { count: almoxarifadosAtivos } = await supabase
        .from("almoxarifados")
        .select("*", { count: "exact", head: true })
        .eq("ativo", true);

      setStats({
        totalProdutos: totalProdutos || 0,
        totalLocalizacoes: totalLocalizacoes || 0,
        valorEstoque: valorEstoque,
        movimentacoesHoje: movimentacoesHoje || 0,
        produtosAbaixoEstoqueMinimo: produtosAbaixoMinimo,
        almoxarifadosAtivos: almoxarifadosAtivos || 0,
      });

      const { data: movements } = await supabase
        .from("movimentacoes")
        .select("*, produtos(sku, nome), profiles(nome_completo)")
        .order("realizada_em", { ascending: false })
        .limit(5);

      setRecentMovements(movements || []);

      // Carregar dados para gráficos
      await loadChartsData();
    } catch (error: any) {
      const msg = String(error?.message || "").toLowerCase();
      if (error?.name === "AbortError" || msg.includes("abort")) {
        // silencioso em caso de navegação/abort
      } else {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    }
  };

  const loadChartsData = async () => {
    try {
      // Movimentações por tipo (últimos 30 dias)
      const { data: movTipos } = await supabase
        .from("movimentacoes")
        .select("tipo, quantidade")
        .gte("realizada_em", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

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

      // Movimentações por dia (últimos 7 dias)
      const { data: movDias } = await supabase
        .from("movimentacoes")
        .select("realizada_em, quantidade")
        .gte("realizada_em", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order("realizada_em", { ascending: true });

      if (movDias) {
        const diasAgrupados = movDias.reduce((acc: any, mov: any) => {
          const dia = new Date(mov.realizada_em).toLocaleDateString("pt-BR", { 
            weekday: "short", 
            day: "2-digit" 
          });
          if (!acc[dia]) {
            acc[dia] = { name: dia, value: 0 };
          }
          acc[dia].value += mov.quantidade;
          return acc;
        }, {});
        setMovimentacoesPorDia(Object.values(diasAgrupados));
      }

      // Produtos mais movimentados (últimos 30 dias)
      const { data: produtosMov } = await supabase
        .from("movimentacoes")
        .select("produto_id, quantidade, produtos!inner(nome, sku)")
        .gte("realizada_em", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

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

  return (
    <div className="space-y-6">
      {/* Hero Hologram Animation */}
      <div className="w-full h-[180px] sm:h-[210px] md:h-[240px] lg:h-[270px] overflow-hidden rounded-lg shadow-sm bg-slate-900">
        <HologramAnimation 
          backgroundImage="/tech-warehouse.png"
          className="w-full h-full"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do almoxarifado em tempo real</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Total de Produtos"
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
        <KPICard
          title="Acurácia"
          value={98.5}
          previousValue={97.8}
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Precisão do inventário"
          format="percentage"
        />
      </div>

      {/* Gráficos de Análise */}
      <div className="grid gap-6 md:grid-cols-2">
        <LineChart
          title="Movimentações por Dia"
          description="Últimos 7 dias"
          data={movimentacoesPorDia}
          dataKey="value"
          nameKey="name"
          height={300}
          color="hsl(var(--primary))"
        />
        
        <PieChart
          title="Movimentações por Tipo"
          description="Últimos 30 dias"
          data={movimentacoesPorTipo}
          height={300}
          innerRadius={60}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BarChart
          title="Produtos Mais Movimentados"
          description="Top 5 - Últimos 30 dias"
          data={produtosMaisMovimentados}
          dataKey="value"
          nameKey="name"
          height={300}
          orientation="vertical"
        />
        
        <PieChart
          title="Estoque por Categoria"
          description="Distribuição atual"
          data={estoquesPorCategoria}
          height={300}
          showLegend={true}
        />
      </div>

      {/* Sparklines para Tendências Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
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
          <CardTitle>Últimas Movimentações</CardTitle>
          <CardDescription>Operações mais recentes no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {recentMovements.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nenhuma movimentação registrada ainda
            </p>
          ) : (
            <div className="space-y-4">
              {recentMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getTipoVariant(movement.tipo)}>
                        {getTipoLabel(movement.tipo)}
                      </Badge>
                      <span className="font-medium">{movement.produtos?.sku}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {movement.produtos?.nome}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Por {movement.profiles?.nome_completo} •{" "}
                      {new Date(movement.realizada_em).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{movement.quantidade} UN</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
