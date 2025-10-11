import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Barcode, Ruler, Weight, DollarSign, Calendar, Tag } from "lucide-react";

interface ProdutoDetailsDialogProps {
  produto: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProdutoDetailsDialog({ produto, open, onOpenChange }: ProdutoDetailsDialogProps) {
  if (!produto) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      ativo: "default",
      inativo: "secondary",
      bloqueado: "destructive",
    };
    
    const labels: Record<string, string> = {
      ativo: "Ativo",
      inativo: "Inativo",
      bloqueado: "Bloqueado",
    };

    return (
      <Badge variant={variants[status] || "secondary"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatCurrency = (value: number | null) => {
    if (!value) return "Não informado";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalhes do Produto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Informações Básicas</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">SKU:</span>
                    <p className="font-mono text-sm">{produto.sku}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Nome:</span>
                    <p className="font-medium">{produto.nome}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <div className="mt-1">{getStatusBadge(produto.status)}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Categoria:</span>
                    <p>{produto.categoria || "Não informada"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Unidade:</span>
                    <p>{produto.unidade}</p>
                  </div>
                </div>
              </div>

              {produto.descricao && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Descrição:</span>
                  <p className="text-sm mt-1">{produto.descricao}</p>
                </div>
              )}
            </div>

            {produto.foto_url && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Foto</h3>
                <img
                  src={produto.foto_url}
                  alt={produto.nome}
                  className="w-full max-w-xs rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <Separator />

          {/* Códigos de Identificação */}
          {(produto.codigo_barras || produto.codigo_ean) && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Barcode className="h-5 w-5" />
                  Códigos de Identificação
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {produto.codigo_barras && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Código de Barras:</span>
                      <p className="font-mono text-sm">{produto.codigo_barras}</p>
                    </div>
                  )}
                  {produto.codigo_ean && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Código EAN:</span>
                      <p className="font-mono text-sm">{produto.codigo_ean}</p>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Dimensões e Peso */}
          {(produto.peso_kg || produto.altura_cm || produto.largura_cm || produto.profundidade_cm) && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Dimensões e Peso
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {produto.peso_kg && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Weight className="h-4 w-4" />
                        Peso:
                      </span>
                      <p>{produto.peso_kg} kg</p>
                    </div>
                  )}
                  {produto.altura_cm && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Altura:</span>
                      <p>{produto.altura_cm} cm</p>
                    </div>
                  )}
                  {produto.largura_cm && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Largura:</span>
                      <p>{produto.largura_cm} cm</p>
                    </div>
                  )}
                  {produto.profundidade_cm && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Profundidade:</span>
                      <p>{produto.profundidade_cm} cm</p>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Informações Financeiras */}
          {(produto.custo_unitario || produto.preco_venda) && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Informações Financeiras
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Custo Unitário:</span>
                    <p className="font-medium">{formatCurrency(produto.custo_unitario)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Preço de Venda:</span>
                    <p className="font-medium">{formatCurrency(produto.preco_venda)}</p>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Controle de Estoque */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Controle de Estoque
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Estoque Mínimo:</span>
                <p>{produto.estoque_minimo || 0}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Estoque Máximo:</span>
                <p>{produto.estoque_maximo || "Não definido"}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Controla Lote:</span>
                  <Badge variant={produto.controla_lote ? "default" : "secondary"}>
                    {produto.controla_lote ? "Sim" : "Não"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Controla Validade:</span>
                  <Badge variant={produto.controla_validade ? "default" : "secondary"}>
                    {produto.controla_validade ? "Sim" : "Não"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações de Auditoria */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Informações de Auditoria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Criado em:</span>
                <p className="text-sm">{formatDate(produto.created_at)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Atualizado em:</span>
                <p className="text-sm">{formatDate(produto.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}