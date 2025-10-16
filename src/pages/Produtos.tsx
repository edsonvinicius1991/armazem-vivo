import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Search, Package, AlertTriangle, Eye, Edit, Trash2, MoreHorizontal, RefreshCw, Grid3X3, List } from "lucide-react";
import { toast } from "sonner";
import { ProdutoForm } from "@/components/forms/ProdutoForm";
import { ProdutoDetailsDialog } from "@/components/dialogs/ProdutoDetailsDialog";
import { useIsMobile } from '@/hooks/use-mobile';
// import { useSyncData } from "@/hooks/use-sync-data";
// import { useSyncContext } from "@/providers/SyncProvider";

const Produtos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const isMobile = useIsMobile();

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

  // Filtrar produtos baseado na busca
  const filteredProdutos = produtos.filter(produto =>
    produto.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'ativo': { variant: 'default', label: 'Ativo' },
      'inativo': { variant: 'secondary', label: 'Inativo' },
      'descontinuado': { variant: 'destructive', label: 'Descontinuado' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.ativo;
    return <Badge variant={config.variant as any}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Carregando produtos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-center'}`}>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold flex items-center gap-2`}>
            <Package className="h-8 w-8" />
            Produtos
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Gerencie o catálogo de produtos do seu armazém
          </p>
        </div>
        
        <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
          <Button 
            onClick={fetchProdutos} 
            variant="outline" 
            size={isMobile ? "sm" : "sm"}
            className={isMobile ? 'flex-1' : ''}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            {isMobile ? 'Atualizar' : 'Atualizar'}
          </Button>
          
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button 
                size={isMobile ? "sm" : "sm"}
                className={isMobile ? 'flex-1' : ''}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isMobile ? 'Novo' : 'Novo Produto'}
              </Button>
            </DialogTrigger>
            <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw]' : 'max-w-4xl'} overflow-hidden max-h-[90vh]`}>
              <DialogHeader className="pb-2">
                <DialogTitle>Criar Novo Produto</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto pr-1 max-h-[calc(90vh-80px)]">
                <ProdutoForm onSuccess={handleCreateSuccess} onCancel={() => setShowCreateDialog(false)} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Controles de busca e visualização */}
      <Card>
        <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-center gap-4'}`}>
            <div className={`relative ${isMobile ? 'w-full' : 'flex-1 max-w-sm'}`}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${isMobile ? 'text-base' : ''}`}
              />
            </div>
            
            {!isMobile && (
              <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "cards" | "table")}>
                <ToggleGroupItem value="cards" aria-label="Visualização em cards">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Visualização em tabela">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-4 gap-4'}`}>
        <Card>
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-500" />
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>Total</p>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{produtos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-green-500" />
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>Ativos</p>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
                  {produtos.filter(p => p.status === 'ativo').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>Baixo Estoque</p>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
                  {produtos.filter(p => p.estoque_minimo && p.estoque_atual <= p.estoque_minimo).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-500" />
              <div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground`}>Categorias</p>
                <p className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>
                  {new Set(produtos.map(p => p.categoria).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de produtos */}
      {(viewMode === "cards" || isMobile) ? (
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
          {filteredProdutos.map((produto) => (
            <Card key={produto.id} className="hover:shadow-md transition-shadow">
              <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-3'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} line-clamp-2`}>
                      {produto.nome}
                    </CardTitle>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-mono`}>
                      {produto.sku}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(produto)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(produto)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setProdutoToDelete(produto)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className={`${isMobile ? 'p-4 pt-0' : 'pt-0'}`}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Categoria:</span>
                    <Badge variant="outline" className={isMobile ? 'text-xs' : ''}>
                      {produto.categoria || 'Sem categoria'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Status:</span>
                    {getStatusBadge(produto.status)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Valor:</span>
                    <span className={`${isMobile ? 'text-sm' : ''} font-medium`}>
                      {formatCurrency(produto.valor_unitario || 0)}
                    </span>
                  </div>
                  
                  {produto.estoque_minimo && (
                    <div className="flex justify-between items-center">
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Est. Mín:</span>
                      <span className={`${isMobile ? 'text-sm' : ''} font-medium`}>
                        {produto.estoque_minimo}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Est. Mín</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProdutos.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell className="font-mono text-sm">
                        {produto.sku}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{produto.nome}</div>
                          <div className="text-sm text-muted-foreground">
                            {produto.unidade_medida}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {produto.categoria || 'Sem categoria'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(produto.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(produto.valor_unitario || 0)}
                      </TableCell>
                      <TableCell className="text-right">
                        {produto.estoque_minimo || '—'}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(produto)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(produto)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setProdutoToDelete(produto)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estado vazio */}
      {filteredProdutos.length === 0 && !loading && (
        <Card>
          <CardContent className={`${isMobile ? 'p-8' : 'p-12'} text-center`}>
            <Package className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'} mx-auto text-muted-foreground mb-4`} />
            <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-2`}>
              {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
            </h3>
            <p className={`text-muted-foreground mb-4 ${isMobile ? 'text-sm' : ''}`}>
              {searchTerm 
                ? 'Tente ajustar os termos de busca ou limpar os filtros.'
                : 'Comece criando seu primeiro produto para gerenciar o estoque.'
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar primeiro produto
              </Button>
            )}
          </CardContent>
        </Card>
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
              onCancel={() => setShowEditDialog(false)}
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
