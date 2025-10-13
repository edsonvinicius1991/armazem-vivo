import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Plus, Search, Package, Calendar, AlertTriangle, Eye, Edit, Trash2, MoreHorizontal, Filter, Grid3X3, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoteForm } from "@/components/forms/LoteForm";
import { LoteDetailsDialog } from "@/components/dialogs/LoteDetailsDialog";

export default function Lotes() {
  const [lotes, setLotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [validadeFilter, setValidadeFilter] = useState("todos");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [selectedLote, setSelectedLote] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [loteToDelete, setLoteToDelete] = useState<any>(null);

  useEffect(() => {
    loadLotes();
  }, []);

  const loadLotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("lotes")
        .select(`
          *,
          produtos (
            id,
            nome,
            sku,
            unidade
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLotes(data || []);
    } catch (error) {
      console.error("Erro ao carregar lotes:", error);
      toast.error("Erro ao carregar lotes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateDialog(false);
    loadLotes();
  };

  const handleEditSuccess = () => {
    setShowEditDialog(false);
    setSelectedLote(null);
    loadLotes();
  };

  const handleViewDetails = (lote: any) => {
    setSelectedLote(lote);
    setShowDetailsDialog(true);
  };

  const handleEdit = (lote: any) => {
    setSelectedLote(lote);
    setShowEditDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!loteToDelete) return;

    try {
      const { error } = await supabase
        .from("lotes")
        .delete()
        .eq("id", loteToDelete.id);

      if (error) throw error;

      toast.success("Lote excluído com sucesso!");
      setLoteToDelete(null);
      loadLotes();
    } catch (error: any) {
      console.error("Erro ao excluir lote:", error);
      toast.error(error.message || "Erro ao excluir lote");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800";
      case "bloqueado":
        return "bg-yellow-100 text-yellow-800";
      case "vencido":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "bloqueado":
        return "Bloqueado";
      case "vencido":
        return "Vencido";
      default:
        return status;
    }
  };

  const isVencido = (dataValidade: string) => {
    if (!dataValidade) return false;
    return new Date(dataValidade) < new Date();
  };

  const diasParaVencer = (dataValidade: string) => {
    if (!dataValidade) return null;
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diffTime = validade.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredLotes = lotes.filter((lote) => {
    const matchesSearch = 
      lote.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lote.produtos?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lote.produtos?.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lote.fornecedor?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "todos" || lote.status === statusFilter;

    let matchesValidade = true;
    if (validadeFilter === "vencidos") {
      matchesValidade = isVencido(lote.data_validade);
    } else if (validadeFilter === "vencendo") {
      const dias = diasParaVencer(lote.data_validade);
      matchesValidade = dias !== null && dias > 0 && dias <= 30;
    } else if (validadeFilter === "validos") {
      const dias = diasParaVencer(lote.data_validade);
      matchesValidade = dias === null || dias > 30;
    }

    return matchesSearch && matchesStatus && matchesValidade;
  });

  const formatDate = (date: string) => {
    if (!date) return "Não informado";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando lotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Lotes</h1>
          <p className="text-gray-600">Controle de lotes com rastreabilidade e validade</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Lote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Lote</DialogTitle>
            </DialogHeader>
            <LoteForm onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Filtros e Busca</CardTitle>
            </div>
            <ToggleGroup 
              type="single" 
              value={viewMode} 
              onValueChange={(value) => value && setViewMode(value as "cards" | "table")}
              className="border rounded-lg p-1"
            >
              <ToggleGroupItem value="cards" aria-label="Visualização em cards" size="sm">
                <Grid3X3 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="Visualização em tabela" size="sm">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por número, produto, SKU ou fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="bloqueado">Bloqueado</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={validadeFilter} onValueChange={setValidadeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Validade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  <SelectItem value="validos">Válidos</SelectItem>
                  <SelectItem value="vencendo">Vencendo (30d)</SelectItem>
                  <SelectItem value="vencidos">Vencidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Lotes */}
      {filteredLotes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lotes.length === 0 ? "Nenhum lote cadastrado" : "Nenhum lote encontrado"}
            </h3>
            <p className="text-gray-600 text-center mb-6">
              {lotes.length === 0 
                ? "Comece criando seu primeiro lote para controlar o estoque."
                : "Tente ajustar os filtros para encontrar o que procura."
              }
            </p>
            {lotes.length === 0 && (
              <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Cadastrar Primeiro Lote
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLotes.map((lote) => {
            const dias = diasParaVencer(lote.data_validade);
            const vencido = isVencido(lote.data_validade);
            
            return (
              <Card key={lote.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{lote.numero}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {lote.produtos?.sku} - {lote.produtos?.nome}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(lote)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(lote)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setLoteToDelete(lote)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Status e Alertas */}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(lote.status)}>
                      {getStatusLabel(lote.status)}
                    </Badge>
                    
                    {vencido && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Vencido
                      </Badge>
                    )}
                    
                    {dias !== null && dias > 0 && dias <= 30 && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {dias}d
                      </Badge>
                    )}
                  </div>

                  {/* Quantidades */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Qtd. Atual</p>
                      <p className="font-semibold text-green-600">
                        {lote.quantidade_atual?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Qtd. Inicial</p>
                      <p className="font-semibold text-blue-600">
                        {lote.quantidade_inicial?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                      </p>
                    </div>
                  </div>

                  {/* Datas */}
                  <div className="space-y-1">
                    {lote.data_fabricacao && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        Fab: {formatDate(lote.data_fabricacao)}
                      </div>
                    )}
                    {lote.data_validade && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="h-3 w-3" />
                        Val: {formatDate(lote.data_validade)}
                      </div>
                    )}
                  </div>

                  {/* Fornecedor */}
                  {lote.fornecedor && (
                    <div className="text-xs text-gray-600">
                      Fornecedor: {lote.fornecedor}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lote</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Qtd. Atual</TableHead>
                  <TableHead>Qtd. Inicial</TableHead>
                  <TableHead>Validade</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLotes.map((lote) => {
                  const dias = diasParaVencer(lote.data_validade);
                  const vencido = isVencido(lote.data_validade);
                  
                  return (
                    <TableRow key={lote.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{lote.numero}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lote.produtos?.nome}</p>
                          <p className="text-sm text-muted-foreground">{lote.produtos?.sku}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge className={getStatusColor(lote.status)}>
                            {getStatusLabel(lote.status)}
                          </Badge>
                          {vencido && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Vencido
                            </Badge>
                          )}
                          {dias !== null && dias > 0 && dias <= 30 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {dias}d
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          {lote.quantidade_atual?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-blue-600">
                          {lote.quantidade_inicial?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {lote.data_validade ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {formatDate(lote.data_validade)}
                            </div>
                          ) : (
                            "—"
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lote.fornecedor || "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(lote)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(lote)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setLoteToDelete(lote)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Lote</DialogTitle>
          </DialogHeader>
          {selectedLote && (
            <LoteForm lote={selectedLote} onSuccess={handleEditSuccess} />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes */}
      <LoteDetailsDialog
        lote={selectedLote}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!loteToDelete} onOpenChange={() => setLoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o lote "{loteToDelete?.numero}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}