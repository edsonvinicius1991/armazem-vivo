import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MapPin, Warehouse } from "lucide-react";
import { toast } from "sonner";

const Localizacoes = () => {
  const [localizacoes, setLocalizacoes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocalizacoes();
  }, []);

  const loadLocalizacoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("localizacoes")
        .select("*, almoxarifados(nome, codigo)")
        .order("codigo", { ascending: true });

      if (error) throw error;
      setLocalizacoes(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar localizações");
    } finally {
      setLoading(false);
    }
  };

  const filteredLocalizacoes = localizacoes.filter(
    (loc) =>
      loc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.rua.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      picking: "Picking",
      bulk: "Bulk",
      quarentena: "Quarentena",
      expedicao: "Expedição",
    };
    return labels[tipo] || tipo;
  };

  const getTipoVariant = (tipo: string): any => {
    const variants: Record<string, any> = {
      picking: "default",
      bulk: "secondary",
      quarentena: "destructive",
      expedicao: "outline",
    };
    return variants[tipo] || "default";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Localizações</h1>
          <p className="text-muted-foreground">Gerencie os endereços do almoxarifado</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Localização
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Pesquisar Localizações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por código ou rua..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando localizações...
        </div>
      ) : filteredLocalizacoes.length === 0 ? (
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm
                ? "Nenhuma localização encontrada com este termo"
                : "Nenhuma localização cadastrada ainda"}
            </p>
            {!searchTerm && (
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Cadastrar Primeira Localização
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocalizacoes.map((loc) => (
            <Card key={loc.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{loc.codigo}</Badge>
                      <Badge variant={getTipoVariant(loc.tipo)}>
                        {getTipoLabel(loc.tipo)}
                      </Badge>
                      {!loc.ativo && <Badge variant="destructive">Inativo</Badge>}
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      {loc.rua}-{loc.prateleira}-{loc.nivel}-{loc.box}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Warehouse className="h-4 w-4" />
                  <span>{loc.almoxarifados?.nome || "—"}</span>
                </div>
                {loc.capacidade_maxima && (
                  <div className="text-sm">
                    <p className="text-muted-foreground">Capacidade Máxima</p>
                    <p className="font-medium">{loc.capacidade_maxima} UN</p>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Conteúdo
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Localizacoes;
