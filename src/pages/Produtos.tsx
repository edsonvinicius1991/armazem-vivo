import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Package, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Produtos = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
    } catch (error: any) {
      const msg = String(error?.message || "").toLowerCase();
      if (error?.name === "AbortError" || msg.includes("abort")) {
        // silencioso em caso de navegação/abort
      } else {
        toast.error("Erro ao carregar produtos");
        console.error("Erro ao carregar produtos:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredProdutos = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      ativo: "default",
      inativo: "secondary",
      bloqueado: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie o catálogo de produtos</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Pesquisar Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          Carregando produtos...
        </div>
      ) : filteredProdutos.length === 0 ? (
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm
                ? "Nenhum produto encontrado com este termo"
                : "Nenhum produto cadastrado ainda"}
            </p>
            {!searchTerm && (
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Cadastrar Primeiro Produto
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProdutos.map((produto) => (
            <Card key={produto.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{produto.sku}</Badge>
                      {getStatusBadge(produto.status)}
                    </div>
                    <CardTitle className="text-lg mt-2">{produto.nome}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {produto.descricao && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {produto.descricao}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Unidade</p>
                    <p className="font-medium">{produto.unidade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Categoria</p>
                    <p className="font-medium">{produto.categoria || "—"}</p>
                  </div>
                </div>
                {produto.estoque_minimo > 0 && (
                  <div className="flex items-center gap-2 p-2 rounded bg-warning/10 text-warning">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs">Estoque mín: {produto.estoque_minimo}</span>
                  </div>
                )}
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Detalhes
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

export default Produtos;
