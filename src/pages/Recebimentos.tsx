import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RecebimentoForm } from "@/components/forms/RecebimentoForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Package, 
  Calendar, 
  User, 
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Eye,
  Grid3X3,
  List
} from "lucide-react";

interface Recebimento {
  id: string;
  numero_documento: string;
  fornecedor: string;
  data_prevista: string;
  data_recebimento?: string;
  status: "pendente" | "em_conferencia" | "conferido" | "finalizado";
  observacoes?: string;
  itens?: any[];
  created_at: string;
  updated_at: string;
}

export default function Recebimentos() {
  const [recebimentos, setRecebimentos] = useState<Recebimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecebimento, setEditingRecebimento] = useState<Recebimento | null>(null);
  const [modoForm, setModoForm] = useState<"criacao" | "conferencia" | "putaway">("criacao");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  useEffect(() => {
    loadRecebimentos();
  }, []);

  const loadRecebimentos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("recebimentos")
        .select(`
          *,
          itens:recebimento_itens(*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRecebimentos(data || []);
    } catch (error) {
      console.error("Erro ao carregar recebimentos:", error);
      toast.error("Erro ao carregar recebimentos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("recebimentos")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Recebimento excluído com sucesso!");
      loadRecebimentos();
    } catch (error: any) {
      console.error("Erro ao excluir recebimento:", error);
      toast.error(error.message || "Erro ao excluir recebimento");
    }
  };

  const handleStatusChange = async (id: string, novoStatus: string) => {
    try {
      const updates: any = { status: novoStatus };
      
      if (novoStatus === "finalizado") {
        updates.data_recebimento = new Date().toISOString();
      }

      const { error } = await supabase
        .from("recebimentos")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Status atualizado com sucesso!");
      loadRecebimentos();
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      toast.error(error.message || "Erro ao atualizar status");
    }
  };

  const iniciarConferencia = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("conferencia");
    setDialogOpen(true);
    handleStatusChange(recebimento.id, "em_conferencia");
  };

  const iniciarPutaway = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("putaway");
    setDialogOpen(true);
  };

  const filteredRecebimentos = recebimentos.filter((recebimento) => {
    const matchesSearch = 
      recebimento.numero_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recebimento.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || recebimento.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "em_conferencia":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "conferido":
        return "bg-green-100 text-green-800 border-green-200";
      case "finalizado":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-3 w-3" />;
      case "em_conferencia":
        return <Eye className="h-3 w-3" />;
      case "conferido":
        return <CheckCircle className="h-3 w-3" />;
      case "finalizado":
        return <Package className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "em_conferencia":
        return "Em Conferência";
      case "conferido":
        return "Conferido";
      case "finalizado":
        return "Finalizado";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const calcularResumoItens = (itens: any[]) => {
    if (!itens || itens.length === 0) return { total: 0, divergencias: 0 };
    
    const total = itens.length;
    const divergencias = itens.filter(item => 
      item.quantidade_recebida !== item.quantidade_esperada
    ).length;
    
    return { total, divergencias };
  };

  const handleFormSuccess = () => {
    setDialogOpen(false);
    setEditingRecebimento(null);
    setModoForm("criacao");
    loadRecebimentos();
  };

  const openCreateDialog = () => {
    setEditingRecebimento(null);
    setModoForm("criacao");
    setDialogOpen(true);
  };

  const openEditDialog = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("criacao");
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando recebimentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Recebimentos</h1>
          <p className="text-gray-600">Gerencie recebimentos, conferência e putaway</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Recebimento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {modoForm === "criacao" && (editingRecebimento ? "Editar Recebimento" : "Novo Recebimento")}
                {modoForm === "conferencia" && "Conferência de Recebimento"}
                {modoForm === "putaway" && "Putaway - Definir Localizações"}
              </DialogTitle>
            </DialogHeader>
            <RecebimentoForm
              recebimento={editingRecebimento}
              onSuccess={handleFormSuccess}
              modo={modoForm}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Filtros</CardTitle>
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por documento ou fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_conferencia">Em Conferência</SelectItem>
                <SelectItem value="conferido">Conferido</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Recebimentos */}
      {filteredRecebimentos.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || statusFilter !== "todos" 
                  ? "Nenhum recebimento encontrado" 
                  : "Nenhum recebimento cadastrado"
                }
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "todos"
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando seu primeiro recebimento"
                }
              </p>
              {!searchTerm && statusFilter === "todos" && (
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Recebimento
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : viewMode === "cards" ? (
        <div className="grid gap-4">
          {filteredRecebimentos.map((recebimento) => {
            const resumoItens = calcularResumoItens(recebimento.itens || []);
            
            return (
              <Card key={recebimento.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      {/* Linha 1: Documento e Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{recebimento.numero_documento}</h3>
                          <Badge className={getStatusColor(recebimento.status)}>
                            {getStatusIcon(recebimento.status)}
                            <span className="ml-1">{getStatusLabel(recebimento.status)}</span>
                          </Badge>
                          {resumoItens.divergencias > 0 && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {resumoItens.divergencias} divergência(s)
                            </Badge>
                          )}
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(recebimento)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            {recebimento.status === "pendente" && (
                              <DropdownMenuItem onClick={() => iniciarConferencia(recebimento)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Iniciar Conferência
                              </DropdownMenuItem>
                            )}
                            
                            {recebimento.status === "conferido" && (
                              <DropdownMenuItem onClick={() => iniciarPutaway(recebimento)}>
                                <MapPin className="h-4 w-4 mr-2" />
                                Putaway
                              </DropdownMenuItem>
                            )}
                            
                            {recebimento.status === "conferido" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(recebimento.id, "finalizado")}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Finalizar
                              </DropdownMenuItem>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o recebimento "{recebimento.numero_documento}"? 
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(recebimento.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Linha 2: Informações principais */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Fornecedor:</span>
                          <span className="font-medium">{recebimento.fornecedor}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Data Prevista:</span>
                          <span className="font-medium">{formatDate(recebimento.data_prevista)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Itens:</span>
                          <span className="font-medium">{resumoItens.total}</span>
                        </div>
                      </div>

                      {/* Linha 3: Data de recebimento e observações */}
                      <div className="space-y-2">
                        {recebimento.data_recebimento && (
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600">Recebido em:</span>
                            <span className="font-medium">{formatDate(recebimento.data_recebimento)}</span>
                          </div>
                        )}
                        
                        {recebimento.observacoes && (
                          <div className="flex items-start gap-2 text-sm">
                            <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                            <span className="text-gray-600">Obs:</span>
                            <span className="text-gray-800">{recebimento.observacoes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Documento</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data Prevista</TableHead>
                  <TableHead>Data Recebimento</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Divergências</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecebimentos.map((recebimento) => {
                  const resumoItens = calcularResumoItens(recebimento.itens || []);
                  
                  return (
                    <TableRow key={recebimento.id}>
                      <TableCell className="font-medium">{recebimento.numero_documento}</TableCell>
                      <TableCell>{recebimento.fornecedor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(recebimento.status)}>
                          {getStatusIcon(recebimento.status)}
                          <span className="ml-1">{getStatusLabel(recebimento.status)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(recebimento.data_prevista)}</TableCell>
                      <TableCell>
                        {recebimento.data_recebimento ? formatDate(recebimento.data_recebimento) : "-"}
                      </TableCell>
                      <TableCell>{resumoItens.total}</TableCell>
                      <TableCell>
                        {resumoItens.divergencias > 0 ? (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            {resumoItens.divergencias}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(recebimento)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            
                            {recebimento.status === "pendente" && (
                              <DropdownMenuItem onClick={() => iniciarConferencia(recebimento)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Iniciar Conferência
                              </DropdownMenuItem>
                            )}
                            
                            {recebimento.status === "conferido" && (
                              <DropdownMenuItem onClick={() => iniciarPutaway(recebimento)}>
                                <MapPin className="h-4 w-4 mr-2" />
                                Putaway
                              </DropdownMenuItem>
                            )}
                            
                            {recebimento.status === "conferido" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(recebimento.id, "finalizado")}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Finalizar
                              </DropdownMenuItem>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja excluir o recebimento "{recebimento.numero_documento}"? 
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDelete(recebimento.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
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
    </div>
  );
}