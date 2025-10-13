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
import { Plus, Search, MapPin, Warehouse, Eye, Edit, Trash2, MoreHorizontal, Grid3X3, List } from "lucide-react";
import { toast } from "sonner";
import { LocalizacaoForm } from "@/components/forms/LocalizacaoForm";
import { LocalizacaoDetailsDialog } from "@/components/dialogs/LocalizacaoDetailsDialog";
import { useIsMobile } from '@/hooks/use-mobile';

const Localizacoes = () => {
  const [localizacoes, setLocalizacoes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedLocalizacao, setSelectedLocalizacao] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [localizacaoToDelete, setLocalizacaoToDelete] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const isMobile = useIsMobile();

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
      const msg = String(error?.message || "").toLowerCase();
      if (error?.name === "AbortError" || msg.includes("abort")) {
        // silencioso em caso de navegação/abort
      } else {
        toast.error("Erro ao carregar localizações");
        console.error("Erro ao carregar localizações:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateDialog(false);
    loadLocalizacoes();
  };

  const handleEditSuccess = () => {
    setShowEditDialog(false);
    setSelectedLocalizacao(null);
    loadLocalizacoes();
  };

  const handleViewDetails = (localizacao: any) => {
    setSelectedLocalizacao(localizacao);
    setShowDetailsDialog(true);
  };

  const handleEdit = (localizacao: any) => {
    setSelectedLocalizacao(localizacao);
    setShowEditDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!localizacaoToDelete) return;

    try {
      const { error } = await supabase
        .from("localizacoes")
        .delete()
        .eq("id", localizacaoToDelete.id);

      if (error) throw error;

      toast.success("Localização excluída com sucesso!");
      setLocalizacaoToDelete(null);
      loadLocalizacoes();
    } catch (error: any) {
      console.error("Erro ao excluir localização:", error);
      toast.error("Erro ao excluir localização");
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
    <div className={`container mx-auto ${isMobile ? 'p-4' : 'p-6'} space-y-6`}>
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
        <div>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold tracking-tight`}>
            Localizações
          </h1>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : ''}`}>
            Gerencie os endereços do almoxarifado
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button 
              className={`gap-2 ${isMobile ? 'w-full' : ''}`}
              size={isMobile ? "sm" : "default"}
            >
              <Plus className="h-4 w-4" />
              {isMobile ? 'Nova Localização' : 'Nova Localização'}
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
            <DialogHeader>
              <DialogTitle className={`${isMobile ? 'text-lg' : ''}`}>
                Criar Nova Localização
              </DialogTitle>
            </DialogHeader>
            <LocalizacaoForm onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardHeader className={`${isMobile ? 'p-4 pb-2' : ''}`}>
          <div className={`${isMobile ? 'space-y-3' : 'flex items-center justify-between'}`}>
            <CardTitle className={`${isMobile ? 'text-lg' : 'text-lg'}`}>
              Pesquisar Localizações
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por código ou rua..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${isMobile ? 'text-base' : ''}`}
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className={`text-center ${isMobile ? 'py-8' : 'py-12'} text-muted-foreground`}>
          Carregando localizações...
        </div>
      ) : filteredLocalizacoes.length === 0 ? (
        <Card>
          <CardContent className={`flex flex-col items-center justify-center ${isMobile ? 'py-8' : 'py-12'}`}>
            <MapPin className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-muted-foreground mb-4`} />
            <p className={`text-muted-foreground text-center mb-4 ${isMobile ? 'text-sm' : ''}`}>
              {searchTerm
                ? "Nenhuma localização encontrada com este termo"
                : "Nenhuma localização cadastrada ainda"}
            </p>
            {!searchTerm && (
              <Button 
                className="gap-2" 
                onClick={() => setShowCreateDialog(true)}
                size={isMobile ? "sm" : "default"}
              >
                <Plus className="h-4 w-4" />
                Cadastrar Primeira Localização
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (isMobile || viewMode === "cards") ? (
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredLocalizacoes.map((localizacao) => (
            <Card key={localizacao.id} className="hover:shadow-md transition-shadow">
              <CardHeader className={`${isMobile ? 'p-4 pb-2' : 'pb-3'}`}>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
                      {localizacao.codigo}
                    </CardTitle>
                    <Badge variant={getTipoVariant(localizacao.tipo)} className={`${isMobile ? 'text-xs' : ''}`}>
                      {getTipoLabel(localizacao.tipo)}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(localizacao)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(localizacao)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setLocalizacaoToDelete(localizacao)}
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
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
                      Rua {localizacao.rua}, Prateleira {localizacao.prateleira}
                    </span>
                  </div>
                  {localizacao.almoxarifados && (
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-4 w-4 text-muted-foreground" />
                      <span className={`${isMobile ? 'text-sm' : 'text-sm'} text-muted-foreground`}>
                        {localizacao.almoxarifados.nome}
                      </span>
                    </div>
                  )}
                  {localizacao.observacao && (
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-muted-foreground italic`}>
                      {localizacao.observacao}
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
                    <TableHead>Código</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Almoxarifado</TableHead>
                    <TableHead>Observação</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocalizacoes.map((localizacao) => (
                    <TableRow key={localizacao.id}>
                      <TableCell className="font-medium">{localizacao.codigo}</TableCell>
                      <TableCell>
                        <Badge variant={getTipoVariant(localizacao.tipo)}>
                          {getTipoLabel(localizacao.tipo)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        Rua {localizacao.rua}, Prateleira {localizacao.prateleira}
                      </TableCell>
                      <TableCell>{localizacao.almoxarifados?.nome || "-"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {localizacao.observacao || "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(localizacao)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(localizacao)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setLocalizacaoToDelete(localizacao)}
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

      {/* Dialogs */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={`${isMobile ? 'text-lg' : ''}`}>
              Editar Localização
            </DialogTitle>
          </DialogHeader>
          {selectedLocalizacao && (
            <LocalizacaoForm 
              localizacao={selectedLocalizacao} 
              onSuccess={handleEditSuccess} 
            />
          )}
        </DialogContent>
      </Dialog>

      <LocalizacaoDetailsDialog
        localizacao={selectedLocalizacao}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />

      <AlertDialog open={!!localizacaoToDelete} onOpenChange={() => setLocalizacaoToDelete(null)}>
        <AlertDialogContent className={`${isMobile ? 'max-w-[95vw]' : ''}`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`${isMobile ? 'text-lg' : ''}`}>
              Confirmar Exclusão
            </AlertDialogTitle>
            <AlertDialogDescription className={`${isMobile ? 'text-sm' : ''}`}>
              Tem certeza que deseja excluir a localização "{localizacaoToDelete?.codigo}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className={`${isMobile ? 'flex-col gap-2' : ''}`}>
            <AlertDialogCancel className={`${isMobile ? 'w-full' : ''}`}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className={`${isMobile ? 'w-full' : ''} bg-destructive hover:bg-destructive/90`}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Localizacoes;
