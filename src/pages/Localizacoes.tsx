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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Localizações</h1>
          <p className="text-muted-foreground">Gerencie os endereços do almoxarifado</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Localização
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Localização</DialogTitle>
            </DialogHeader>
            <LocalizacaoForm onSuccess={handleCreateSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Pesquisar Localizações</CardTitle>
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
          </div>
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
              <Button className="gap-2" onClick={() => setShowCreateDialog(true)}>
                <Plus className="h-4 w-4" />
                Cadastrar Primeira Localização
              </Button>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "cards" ? (
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
                      {loc.codigo}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-mono">
                      {[loc.rua, loc.prateleira, loc.nivel, loc.box].filter(Boolean).join("-") || "Endereço não definido"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(loc)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(loc)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setLocalizacaoToDelete(loc)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-md">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Almoxarifado</TableHead>
                  <TableHead>Capacidade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocalizacoes.map((loc) => (
                  <TableRow key={loc.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <Badge variant="outline">{loc.codigo}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-mono text-sm">
                        {[loc.rua, loc.prateleira, loc.nivel, loc.box].filter(Boolean).join("-") || "Endereço não definido"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTipoVariant(loc.tipo)}>
                        {getTipoLabel(loc.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {loc.ativo ? (
                        <Badge variant="default">Ativo</Badge>
                      ) : (
                        <Badge variant="destructive">Inativo</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Warehouse className="h-4 w-4 text-muted-foreground" />
                        <span>{loc.almoxarifados?.nome || "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {loc.capacidade_maxima ? `${loc.capacidade_maxima} UN` : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(loc)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(loc)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => setLocalizacaoToDelete(loc)}
                            className="text-red-600"
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
          </CardContent>
        </Card>
      )}

      {/* Dialog de Edição */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Localização</DialogTitle>
          </DialogHeader>
          {selectedLocalizacao && (
            <LocalizacaoForm 
              localizacao={selectedLocalizacao} 
              onSuccess={handleEditSuccess} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Detalhes */}
      {selectedLocalizacao && (
        <LocalizacaoDetailsDialog
          localizacao={selectedLocalizacao}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!localizacaoToDelete} onOpenChange={() => setLocalizacaoToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a localização "{localizacaoToDelete?.codigo}"? 
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

export default Localizacoes;
