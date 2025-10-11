import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "@/components/StatCard";
import { Package, MapPin, TrendingUp, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Total de produtos
    const { count: totalProdutos } = await supabase
      .from("produtos")
      .select("*", { count: "exact", head: true })
      .eq("status", "ativo");

    // Total de localizações
    const { count: totalLocalizacoes } = await supabase
      .from("localizacoes")
      .select("*", { count: "exact", head: true })
      .eq("ativo", true);

    // Valor do estoque (soma dos produtos com estoque)
    const { data: estoqueData } = await supabase
      .from("estoque_localizacao")
      .select("quantidade, produtos!inner(custo_unitario)");

    let valorEstoque = 0;
    if (estoqueData) {
      valorEstoque = estoqueData.reduce((acc, item: any) => {
        return acc + (item.quantidade * (item.produtos?.custo_unitario || 0));
      }, 0);
    }

    // Movimentações de hoje
    const hoje = new Date().toISOString().split("T")[0];
    const { count: movimentacoesHoje } = await supabase
      .from("movimentacoes")
      .select("*", { count: "exact", head: true })
      .gte("realizada_em", `${hoje}T00:00:00`);

    // Produtos abaixo do estoque mínimo
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

    // Almoxarifados ativos
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

    // Carregar últimas movimentações
    const { data: movements } = await supabase
      .from("movimentacoes")
      .select("*, produtos(sku, nome), profiles(nome_completo)")
      .order("realizada_em", { ascending: false })
      .limit(5);

    setRecentMovements(movements || []);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do almoxarifado em tempo real</p>
      </div>

      {/* KPIs Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total de Produtos"
          value={stats.totalProdutos}
          icon={<Package className="h-5 w-5" />}
          description="Produtos ativos no sistema"
        />
        <StatCard
          title="Localizações Ativas"
          value={stats.totalLocalizacoes}
          icon={<MapPin className="h-5 w-5" />}
          description={`Em ${stats.almoxarifadosAtivos} almoxarifados`}
          variant="success"
        />
        <StatCard
          title="Valor do Estoque"
          value={formatCurrency(stats.valorEstoque)}
          icon={<DollarSign className="h-5 w-5" />}
          description="Valor total inventariado"
        />
        <StatCard
          title="Movimentações Hoje"
          value={stats.movimentacoesHoje}
          icon={<TrendingUp className="h-5 w-5" />}
          description="Operações realizadas"
          variant="success"
        />
        <StatCard
          title="Alertas de Estoque"
          value={stats.produtosAbaixoEstoqueMinimo}
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Produtos abaixo do mínimo"
          variant={stats.produtosAbaixoEstoqueMinimo > 0 ? "warning" : "default"}
        />
        <StatCard
          title="Acurácia"
          value="98.5%"
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Precisão do inventário"
          variant="success"
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
