import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Filter, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    loadMovimentacoes();
  }, []);

  const loadMovimentacoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("movimentacoes")
        .select(`
          *,
          produtos(sku, nome),
          profiles(nome_completo),
          lotes(numero_lote),
          localizacao_origem:localizacoes!movimentacoes_localizacao_origem_id_fkey(codigo, rua, prateleira),
          localizacao_destino:localizacoes!movimentacoes_localizacao_destino_id_fkey(codigo, rua, prateleira)
        `)
        .order("realizada_em", { ascending: false })
        .limit(50);

      if (error) throw error;
      setMovimentacoes(data || []);
    } catch (error: any) {
      const msg = String(error?.message || "").toLowerCase();
      if (error?.name === "AbortError" || msg.includes("abort")) {
        // silencioso em caso de navegação/abort
      } else {
        toast.error("Erro ao carregar movimentações");
        console.error("Erro ao carregar movimentações:", error);
      }
    } finally {
      setLoading(false);
    }
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

  const getTipoVariant = (tipo: string): any => {
    const variants: Record<string, any> = {
      entrada: "default",
      saida: "destructive",
      transferencia: "secondary",
      ajuste: "outline",
      devolucao: "secondary",
    };
    return variants[tipo] || "default";
  };

  if (loading) {
    return (
      <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Carregando movimentações...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>
            Movimentações
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Histórico de operações do almoxarifado
          </p>
        </div>
        
        <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
          <Button 
            onClick={loadMovimentacoes} 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            className={`gap-2 ${isMobile ? 'flex-1' : ''}`}
          >
            <RefreshCw className="h-4 w-4" />
            {isMobile ? 'Atualizar' : 'Atualizar'}
          </Button>
          
          {!isMobile && (
            <>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </>
          )}
          
          <Button 
            className={`gap-2 ${isMobile ? 'flex-1' : ''}`}
            size={isMobile ? "sm" : "default"}
          >
            <Plus className="h-4 w-4" />
            {isMobile ? 'Nova' : 'Nova Movimentação'}
          </Button>
        </div>
      </div>

      {/* Ações móveis */}
      {isMobile && (
        <div className="flex gap-2 w-full">
          <Button variant="outline" className="gap-2 flex-1" size="sm">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2 flex-1" size="sm">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      )}

      {/* Lista de movimentações */}
      {movimentacoes.length === 0 ? (
        <Card>
          <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'py-8' : 'py-12'}`}>
            <p className={`text-muted-foreground text-center mb-4 ${isMobile ? 'text-sm' : ''}`}>
              Nenhuma movimentação registrada ainda
            </p>
            <Button className="gap-2" size={isMobile ? "sm" : "default"}>
              <Plus className="h-4 w-4" />
              Registrar Primeira Movimentação
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
            <CardTitle className={`${isMobile ? 'text-lg' : ''}`}>
              Últimas Movimentações
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
            <div className={`space-y-${isMobile ? '3' : '4'}`}>
              {movimentacoes.map((mov) => (
                <div
                  key={mov.id}
                  className={`${isMobile ? 'p-3' : 'p-4'} border border-border rounded-lg hover:bg-muted/50 transition-colors`}
                >
                  <div className={`flex items-start justify-between ${isMobile ? 'mb-2' : 'mb-3'}`}>
                    <div className={`flex items-center gap-2 ${isMobile ? 'flex-wrap' : ''}`}>
                      <Badge variant={getTipoVariant(mov.tipo)}>
                        {getTipoLabel(mov.tipo)}
                      </Badge>
                      <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                        {mov.produtos?.sku}
                      </span>
                      {mov.documento && (
                        <Badge variant="outline" className={`${isMobile ? 'text-xs' : ''}`}>
                          Doc: {mov.documento}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>
                        {mov.quantidade} UN
                      </p>
                    </div>
                  </div>

                  <div className={`space-y-${isMobile ? '1' : '2'}`}>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                      {mov.produtos?.nome}
                    </p>

                    {mov.lotes && (
                      <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground`}>
                        Lote: {mov.lotes.numero_lote}
                      </p>
                    )}

                    {(mov.localizacao_origem || mov.localizacao_destino) && (
                      <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground flex items-center gap-2 ${isMobile ? 'flex-wrap' : ''}`}>
                        {mov.localizacao_origem && (
                          <span>
                            De: {mov.localizacao_origem.codigo}
                          </span>
                        )}
                        {mov.localizacao_origem && mov.localizacao_destino && (
                          <span>→</span>
                        )}
                        {mov.localizacao_destino && (
                          <span>
                            Para: {mov.localizacao_destino.codigo}
                          </span>
                        )}
                      </div>
                    )}

                    {mov.observacao && (
                      <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground italic`}>
                        {mov.observacao}
                      </p>
                    )}

                    <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground ${isMobile ? 'pt-1' : 'pt-2'} border-t border-border`}>
                      Por {mov.profiles?.nome_completo} •{" "}
                      {new Date(mov.realizada_em).toLocaleString("pt-BR", {
                        day: '2-digit',
                        month: '2-digit',
                        year: isMobile ? '2-digit' : 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Movimentacoes;
