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
import { useIsMobile } from '@/hooks/use-mobile';
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
  List,
  Filter
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
  const isMobile = useIsMobile();

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
      const { error } = await supabase
        .from("recebimentos")
        .update({ 
          status: novoStatus,
          data_recebimento: novoStatus === "finalizado" ? new Date().toISOString() : null
        })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Status atualizado com sucesso!");
      loadRecebimentos();
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      toast.error(error.message || "Erro ao atualizar status");
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pendente: "Pendente",
      em_conferencia: "Em Conferência",
      conferido: "Conferido",
      finalizado: "Finalizado"
    };
    return labels[status] || status;
  };

  const getStatusVariant = (status: string): any => {
    const variants: Record<string, any> = {
      pendente: "secondary",
      em_conferencia: "default",
      conferido: "outline",
      finalizado: "default"
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      pendente: Clock,
      em_conferencia: Package,
      conferido: CheckCircle,
      finalizado: CheckCircle
    };
    const Icon = icons[status] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const filteredRecebimentos = recebimentos.filter(recebimento => {
    const matchesSearch = 
      recebimento.numero_documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recebimento.fornecedor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "todos" || recebimento.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleFormSuccess = () => {
    setDialogOpen(false);
    setEditingRecebimento(null);
    setModoForm("criacao");
    loadRecebimentos();
  };

  const handleEdit = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("criacao");
    setDialogOpen(true);
  };

  const handleConferencia = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("conferencia");
    setDialogOpen(true);
  };

  const handlePutaway = (recebimento: Recebimento) => {
    setEditingRecebimento(recebimento);
    setModoForm("putaway");
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Package className="h-8 w-8 animate-pulse mx-auto mb-4" />
            <p>Carregando recebimentos...</p>
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
            Recebimentos
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Gerencie os recebimentos de mercadorias
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className={`gap-2 ${isMobile ? 'w-full' : ''}`}
              size={isMobile ? "sm" : "default"}
              onClick={() => {
                setEditingRecebimento(null);
                setModoForm("criacao");
              }}
            >
              <Plus className="h-4 w-4" />
              {isMobile ? 'Novo Recebimento' : 'Novo Recebimento'}
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
            <DialogHeader>
              <DialogTitle className={`${isMobile ? 'text-lg' : ''}`}>
                {editingRecebimento 
                  ? modoForm === "conferencia" 
                    ? "Conferir Recebimento"
                    : modoForm === "putaway"
                    ? "Endereçar Produtos"
                    : "Editar Recebimento"
                  : "Novo Recebimento"
                }
              </DialogTitle>
            </DialogHeader>
            <RecebimentoForm 
              recebimento={editingRecebimento}
              modo={modoForm}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
          <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
            <CardTitle className={`${isMobile ? 'text-lg' : 'text-lg'}`}>
              Filtros e Busca
            </CardTitle>
            {!isMobile && (
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value) => value && setViewMode(value as "cards" | "table")}
                className="border rounded-md"
              >
                <ToggleGroupItem value="cards" aria-label="Visualização em cards" className="gap-2">
                  <Grid3X3 className="h-4 w-4" />
                  Cards
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Visualização em tabela" className="gap-2">
                  <List className="h-4 w-4" />
                  Tabela
                </ToggleGroupItem>
              </ToggleGroup>
            )}
          </div>
        </CardHeader>
        <CardContent className={`${isMobile ? 'p-4 pt-2' : ''}`}>
          <div className={`${isMobile ? 'space-y-3' : 'flex gap-4'}`}>
            <div className={`relative ${isMobile ? 'w-full' : 'flex-1'}`}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por documento ou fornecedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${isMobile ? 'text-base' : ''}`}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className={`${isMobile ? 'w-full' : 'w-[200px]'}`}>
                <SelectValue placeholder="Status" />
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

      {/* Lista de recebimentos */}
      {filteredRecebimentos.length === 0 ? (
        <Card>
          <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'py-8' : 'py-12'}`}>
            <Package className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-muted-foreground mb-4`} />
            <p className={`text-muted-foreground text-center mb-4 ${isMobile ? 'text-sm' : ''}`}>
              {searchTerm || statusFilter !== "todos"
                ? "Nenhum recebimento encontrado com os filtros aplicados"
                : "Nenhum recebimento cadastrado ainda"}
            </p>
            {!searchTerm && statusFilter === "todos" && (
              <Button 
                className="gap-2" 
                onClick={() => setDialogOpen(true)}
                size={isMobile ? "sm" : "default"}
              >
                <Plus className="h-4 w-4" />
                Criar Primeiro Recebimento
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (isMobile || viewMode === "cards") ? (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredRecebimentos.map((recebimento) => (
            <Card key={recebimento.id} className="hover:shadow-md transition-shadow">
              <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-3'}`}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
                      {recebimento.numero_documento}
                    </CardTitle>
                    <Badge variant={getStatusVariant(recebimento.status)} className={`gap-1 ${isMobile ? 'text-xs' : ''}`}>
                      {getStatusIcon(recebimento.status)}
                      {getStatusLabel(recebimento.status)}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(recebimento)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {recebimento.status === "pendente" && (
                        <DropdownMenuItem onClick={() => handleConferencia(recebimento)}>
                          <Package className="mr-2 h-4 w-4" />
                          Conferir
                        </DropdownMenuItem>
                      )}
                      {recebimento.status === "conferido" && (
                        <DropdownMenuItem onClick={() => handlePutaway(recebimento)}>
                          <MapPin className="mr-2 h-4 w-4" />
                          Endereçar
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => handleDelete(recebimento.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className={`${isMobile ? 'p-4 pt-2' : 'pt-0'}`}>
                <div className={`space-y-${isMobile ? '1' : '2'}`}>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
                      {recebimento.fornecedor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
                      Previsto: {new Date(recebimento.data_prevista).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  {recebimento.data_recebimento && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-green-600`}>
                        Recebido: {new Date(recebimento.data_recebimento).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                  {recebimento.itens && recebimento.itens.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
                        {recebimento.itens.length} {recebimento.itens.length === 1 ? 'item' : 'itens'}
                      </span>
                    </div>
                  )}
                  {recebimento.observacoes && (
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground italic`}>
                      {recebimento.observacoes}
                    </p>
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
                    <TableHead>Documento</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Prevista</TableHead>
                    <TableHead>Data Recebimento</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecebimentos.map((recebimento) => (
                    <TableRow key={recebimento.id}>
                      <TableCell className="font-medium">{recebimento.numero_documento}</TableCell>
                      <TableCell>{recebimento.fornecedor}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(recebimento.status)} className="gap-1">
                          {getStatusIcon(recebimento.status)}
                          {getStatusLabel(recebimento.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(recebimento.data_prevista).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        {recebimento.data_recebimento 
                          ? new Date(recebimento.data_recebimento).toLocaleDateString("pt-BR")
                          : "-"
                        }
                      </TableCell>
                      <TableCell>
                        {recebimento.itens?.length || 0} {(recebimento.itens?.length || 0) === 1 ? 'item' : 'itens'}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(recebimento)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            {recebimento.status === "pendente" && (
                              <DropdownMenuItem onClick={() => handleConferencia(recebimento)}>
                                <Package className="mr-2 h-4 w-4" />
                                Conferir
                              </DropdownMenuItem>
                            )}
                            {recebimento.status === "conferido" && (
                              <DropdownMenuItem onClick={() => handlePutaway(recebimento)}>
                                <MapPin className="mr-2 h-4 w-4" />
                                Endereçar
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDelete(recebimento.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
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
    </div>
  );
}