import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Filter } from "lucide-react";
import { toast } from "sonner";

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Movimentações</h1>
          <p className="text-muted-foreground">Histórico de operações do almoxarifado</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Movimentação
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando movimentações...
        </div>
      ) : movimentacoes.length === 0 ? (
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center mb-4">
              Nenhuma movimentação registrada ainda
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Registrar Primeira Movimentação
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Últimas Movimentações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {movimentacoes.map((mov) => (
                <div
                  key={mov.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={getTipoVariant(mov.tipo)}>
                        {getTipoLabel(mov.tipo)}
                      </Badge>
                      <span className="font-medium">{mov.produtos?.sku}</span>
                      {mov.documento && (
                        <Badge variant="outline">Doc: {mov.documento}</Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{mov.quantidade} UN</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">{mov.produtos?.nome}</p>

                    {mov.lotes && (
                      <p className="text-xs text-muted-foreground">
                        Lote: {mov.lotes.numero_lote}
                      </p>
                    )}

                    {(mov.localizacao_origem || mov.localizacao_destino) && (
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
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
                      <p className="text-xs text-muted-foreground italic">
                        {mov.observacao}
                      </p>
                    )}

                    <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                      Por {mov.profiles?.nome_completo} •{" "}
                      {new Date(mov.realizada_em).toLocaleString("pt-BR")}
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
