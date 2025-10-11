import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Package, User, AlertTriangle, DollarSign } from "lucide-react";

interface LoteDetailsDialogProps {
  lote: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoteDetailsDialog = ({ lote, open, onOpenChange }: LoteDetailsDialogProps) => {
  if (!lote) return null;

  const formatDate = (date: string) => {
    if (!date) return "Não informado";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    if (!value) return "Não informado";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
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

  const isVencido = () => {
    if (!lote.data_validade) return false;
    return new Date(lote.data_validade) < new Date();
  };

  const diasParaVencer = () => {
    if (!lote.data_validade) return null;
    const hoje = new Date();
    const validade = new Date(lote.data_validade);
    const diffTime = validade.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const dias = diasParaVencer();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalhes do Lote: {lote.numero}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status e Alertas */}
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(lote.status)}>
              {getStatusLabel(lote.status)}
            </Badge>
            
            {isVencido() && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Vencido
              </Badge>
            )}
            
            {dias !== null && dias > 0 && dias <= 30 && (
              <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-600">
                <AlertTriangle className="h-3 w-3" />
                Vence em {dias} dias
              </Badge>
            )}
          </div>

          {/* Informações do Produto */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Produto</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{lote.produtos?.nome || "Produto não encontrado"}</p>
              <p className="text-sm text-gray-600">SKU: {lote.produtos?.sku || "N/A"}</p>
              {lote.produtos?.descricao && (
                <p className="text-sm text-gray-600 mt-1">{lote.produtos.descricao}</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Informações do Lote */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Informações do Lote</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Data de Fabricação</p>
                    <p className="text-sm text-gray-600">{formatDate(lote.data_fabricacao)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Data de Validade</p>
                    <p className="text-sm text-gray-600">{formatDate(lote.data_validade)}</p>
                  </div>
                </div>

                {lote.fornecedor && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Fornecedor</p>
                      <p className="text-sm text-gray-600">{lote.fornecedor}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Quantidade Inicial</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {lote.quantidade_inicial?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium">Quantidade Atual</p>
                  <p className="text-lg font-semibold text-green-600">
                    {lote.quantidade_atual?.toLocaleString("pt-BR")} {lote.produtos?.unidade_medida || "un"}
                  </p>
                </div>

                {lote.custo_unitario && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Custo Unitário</p>
                      <p className="text-sm text-gray-600">{formatCurrency(lote.custo_unitario)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Valor Total */}
          {lote.custo_unitario && lote.quantidade_atual && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Valor Total do Estoque</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(lote.custo_unitario * lote.quantidade_atual)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lote.quantidade_atual?.toLocaleString("pt-BR")} × {formatCurrency(lote.custo_unitario)}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Observações */}
          {lote.observacoes && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Observações</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{lote.observacoes}</p>
                </div>
              </div>
            </>
          )}

          {/* Informações de Auditoria */}
          <Separator />
          <div>
            <h3 className="font-semibold text-lg mb-3">Auditoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">Criado em</p>
                <p>{formatDate(lote.created_at)}</p>
              </div>
              <div>
                <p className="font-medium">Última atualização</p>
                <p>{formatDate(lote.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};