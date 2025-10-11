import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Package, Thermometer, Ruler, Weight, Calendar, User } from "lucide-react";

interface LocalizacaoDetailsDialogProps {
  localizacao: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocalizacaoDetailsDialog({ 
  localizacao, 
  open, 
  onOpenChange 
}: LocalizacaoDetailsDialogProps) {
  if (!localizacao) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  const formatNumber = (value: number | null | undefined, unit = "") => {
    if (value === null || value === undefined) return "Não informado";
    return `${value.toLocaleString("pt-BR")}${unit}`;
  };

  const getTipoLabel = (tipo: string) => {
    const tipos = {
      picking: "Picking",
      bulk: "Bulk/Estoque",
      recebimento: "Recebimento",
      expedicao: "Expedição",
      quarentena: "Quarentena"
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      picking: "bg-blue-100 text-blue-800",
      bulk: "bg-green-100 text-green-800",
      recebimento: "bg-purple-100 text-purple-800",
      expedicao: "bg-orange-100 text-orange-800",
      quarentena: "bg-red-100 text-red-800"
    };
    return colors[tipo as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getEnderecoCompleto = () => {
    const partes = [
      localizacao.rua,
      localizacao.prateleira,
      localizacao.nivel,
      localizacao.posicao
    ].filter(Boolean);
    
    return partes.length > 0 ? partes.join("-") : "Não definido";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Detalhes da Localização
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Código</p>
                  <p className="text-lg font-mono">{localizacao.codigo}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nome</p>
                  <p className="text-lg">{localizacao.nome}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tipo</p>
                  <Badge className={getTipoColor(localizacao.tipo)}>
                    {getTipoLabel(localizacao.tipo)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge variant={localizacao.ativo ? "default" : "secondary"}>
                    {localizacao.ativo ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Endereço Completo</p>
                <p className="text-lg font-mono">{getEnderecoCompleto()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Endereçamento Detalhado */}
          <Card>
            <CardHeader>
              <CardTitle>Endereçamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rua</p>
                  <p className="text-base">{localizacao.rua || "Não definida"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prateleira</p>
                  <p className="text-base">{localizacao.prateleira || "Não definida"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nível</p>
                  <p className="text-base">{localizacao.nivel || "Não definido"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Posição</p>
                  <p className="text-base">{localizacao.posicao || "Não definida"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Capacidade e Dimensões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                Capacidade e Dimensões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    Capacidade
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Máxima (unidades):</span>
                      <span className="text-sm font-medium">
                        {formatNumber(localizacao.capacidade_maxima)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peso (kg):</span>
                      <span className="text-sm font-medium">
                        {formatNumber(localizacao.capacidade_peso, " kg")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Dimensões
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Altura:</span>
                      <span className="text-sm font-medium">
                        {formatNumber(localizacao.altura, " cm")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Largura:</span>
                      <span className="text-sm font-medium">
                        {formatNumber(localizacao.largura, " cm")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Profundidade:</span>
                      <span className="text-sm font-medium">
                        {formatNumber(localizacao.profundidade, " cm")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controle de Temperatura */}
          {(localizacao.temperatura_min !== null || localizacao.temperatura_max !== null) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Controle de Temperatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Temperatura Mínima:</span>
                    <span className="text-sm font-medium">
                      {formatNumber(localizacao.temperatura_min, "°C")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Temperatura Máxima:</span>
                    <span className="text-sm font-medium">
                      {formatNumber(localizacao.temperatura_max, "°C")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Observações */}
          {localizacao.observacoes && (
            <Card>
              <CardHeader>
                <CardTitle>Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{localizacao.observacoes}</p>
              </CardContent>
            </Card>
          )}

          {/* Informações de Auditoria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Informações de Auditoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Criado em</p>
                  <p className="text-sm">{formatDate(localizacao.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Atualizado em</p>
                  <p className="text-sm">{formatDate(localizacao.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}