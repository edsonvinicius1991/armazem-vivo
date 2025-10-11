import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Package, MapPin, BarChart3, Download } from "lucide-react";

const Relatorios = () => {
  const reports = [
    {
      icon: TrendingUp,
      title: "Movimentações por Período",
      description: "Análise detalhada de todas as operações realizadas",
      variant: "default" as const,
    },
    {
      icon: Package,
      title: "Inventário Completo",
      description: "Relatório de estoque atual por produto e localização",
      variant: "default" as const,
    },
    {
      icon: BarChart3,
      title: "Acurácia do Inventário",
      description: "Comparativo entre estoque físico e sistema",
      variant: "success" as const,
    },
    {
      icon: MapPin,
      title: "Ocupação de Localizações",
      description: "Análise de utilização dos espaços do almoxarifado",
      variant: "default" as const,
    },
    {
      icon: FileText,
      title: "Produtos com Baixo Giro",
      description: "Identificação de produtos com movimentação lenta",
      variant: "warning" as const,
    },
    {
      icon: TrendingUp,
      title: "Custo Médio de Estoque",
      description: "Análise financeira do valor investido em estoque",
      variant: "default" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Análises e exportações de dados do sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10`}>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Visualizar
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Exportações Personalizadas</CardTitle>
          <CardDescription>
            Configure relatórios customizados com os filtros e campos desejados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Button size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Criar Relatório Personalizado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
