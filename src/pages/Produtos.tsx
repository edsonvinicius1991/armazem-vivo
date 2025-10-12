import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Search, Package, AlertTriangle, Eye, Edit, Trash2, MoreHorizontal, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { ProdutoForm } from "@/components/forms/ProdutoForm";
import { ProdutoDetailsDialog } from "@/components/dialogs/ProdutoDetailsDialog";
// import { useSyncData } from "@/hooks/use-sync-data";
// import { useSyncContext } from "@/providers/SyncProvider";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<any>(null);

  // Estado para produtos
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar produtos
  const fetchProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('produtos')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      setProdutos(data || []);
    } catch (err: any) {
      console.error('Erro ao carregar produtos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Carregar produtos na inicialização
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Tratamento de erros
  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar produtos");
      console.error("Erro ao carregar produtos:", error);
    }
  }, [error]);

  const handleCreateSuccess = () => {
    setShowCreateDialog(false);
    fetchProdutos(); // Recarregar dados após criação
  };

  const handleEditSuccess = () => {
    setShowEditDialog(false);
    setSelectedProduto(null);
    fetchProdutos(); // Recarregar dados após edição
  };

  const handleViewDetails = (produto: any) => {
    setSelectedProduto(produto);
    setShowDetailsDialog(true);
  };

  const handleEdit = (produto: any) => {
    setSelectedProduto(produto);
    setShowEditDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!produtoToDelete) return;

    try {
      const { error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", produtoToDelete.id);

      if (error) throw error;

      toast.success("Produto excluído com sucesso!");
      setProdutoToDelete(null);
      fetchProdutos(); // Recarregar dados após exclusão
    } catch (error: any) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto");
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
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              fetchProdutos();
              toast.success("Dados atualizados");
            }}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Sincronizar
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Produto</DialogTitle>
              </DialogHeader>
              <ProdutoForm onSuccess={handleCreateSuccess} />
            </DialogContent>
          </Dialog>
        </div>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(produto)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(produto)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setProdutoToDelete(produto)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          {selectedProduto && (
            <ProdutoForm 
              produto={selectedProduto} 
              onSuccess={handleEditSuccess} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes */}
      {selectedProduto && (
        <ProdutoDetailsDialog
          produto={selectedProduto}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!produtoToDelete} onOpenChange={() => setProdutoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{produtoToDelete?.nome}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Produtos;
