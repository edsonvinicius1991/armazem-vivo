import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Package, MapPin, BarChart3, Download } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Relatorios = () => {
  const isMobile = useIsMobile();

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
    <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      {/* Header */}
      <div>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>
          Relatórios
        </h1>
        <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
          Análises e exportações de dados do sistema
        </p>
      </div>

      {/* Grid de Relatórios */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {reports.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${isMobile ? 'h-8 w-8' : 'h-10 w-10'} rounded-lg flex items-center justify-center bg-primary/10`}>
                    <Icon className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
                  </div>
                </div>
                <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'}`}>
                  {report.title}
                </CardTitle>
                <CardDescription className={`${isMobile ? 'text-sm' : ''}`}>
                  {report.description}
                </CardDescription>
              </CardHeader>
              <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'gap-2'}`}>
                  <Button 
                    variant="outline" 
                    className={`${isMobile ? 'w-full' : 'flex-1'} gap-2`}
                    size={isMobile ? "sm" : "default"}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`gap-2 ${isMobile ? 'w-full' : ''}`}
                    size={isMobile ? "sm" : "default"}
                  >
                    <Download className="h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Exportações Personalizadas */}
      <Card className="shadow-md">
        <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
          <CardTitle className={`${isMobile ? 'text-lg' : ''}`}>
            Exportações Personalizadas
          </CardTitle>
          <CardDescription className={`${isMobile ? 'text-sm' : ''}`}>
            Configure relatórios customizados com os filtros e campos desejados
          </CardDescription>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
          <div className={`flex items-center justify-center ${isMobile ? 'py-6' : 'py-8'}`}>
            <Button 
              size={isMobile ? "default" : "lg"} 
              className={`gap-2 ${isMobile ? 'w-full' : ''}`}
            >
              <FileText className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              Criar Relatório Personalizado
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
