import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Plus, Minus, Package, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

const itemRecebimentoSchema = z.object({
  produto_id: z.string().min(1, "Produto é obrigatório"),
  lote_numero: z.string().min(1, "Número do lote é obrigatório"),
  quantidade_esperada: z.number().min(0, "Quantidade deve ser maior ou igual a zero"),
  quantidade_recebida: z.number().min(0, "Quantidade deve ser maior ou igual a zero"),
  data_fabricacao: z.string().optional(),
  data_validade: z.string().optional(),
  observacoes: z.string().optional(),
  localizacao_sugerida: z.string().optional(),
  localizacao_confirmada: z.string().optional(),
});

const recebimentoSchema = z.object({
  numero_documento: z.string().min(1, "Número do documento é obrigatório"),
  fornecedor: z.string().min(1, "Fornecedor é obrigatório"),
  data_prevista: z.string().min(1, "Data prevista é obrigatória"),
  observacoes: z.string().optional(),
  status: z.enum(["pendente", "em_conferencia", "conferido", "finalizado"]).default("pendente"),
  itens: z.array(itemRecebimentoSchema).min(1, "Pelo menos um item é obrigatório"),
});

type RecebimentoFormData = z.infer<typeof recebimentoSchema>;
type ItemRecebimento = z.infer<typeof itemRecebimentoSchema>;

interface RecebimentoFormProps {
  recebimento?: any;
  onSuccess: () => void;
  modo?: "criacao" | "conferencia" | "putaway";
}

export const RecebimentoForm = ({ recebimento, onSuccess, modo = "criacao" }: RecebimentoFormProps) => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [localizacoes, setLocalizacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState<ItemRecebimento[]>([]);

  const form = useForm<RecebimentoFormData>({
    resolver: zodResolver(recebimentoSchema),
    defaultValues: {
      numero_documento: recebimento?.numero_documento || "",
      fornecedor: recebimento?.fornecedor || "",
      data_prevista: recebimento?.data_prevista || new Date().toISOString().split('T')[0],
      observacoes: recebimento?.observacoes || "",
      status: recebimento?.status || "pendente",
      itens: recebimento?.itens || [],
    },
  });

  useEffect(() => {
    loadProdutos();
    loadLocalizacoes();
    if (recebimento?.itens) {
      setItens(recebimento.itens);
    }
  }, [recebimento]);

  const loadProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome, sku, unidade")
        .eq("status", "ativo")
        .order("nome");

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    }
  };

  const loadLocalizacoes = async () => {
    try {
      const { data, error } = await supabase
        .from("localizacoes")
        .select("id, nome, rua, prateleira, nivel, posicao, status")
        .eq("status", "ativo")
        .order("nome");

      if (error) throw error;
      setLocalizacoes(data || []);
    } catch (error) {
      console.error("Erro ao carregar localizações:", error);
      toast.error("Erro ao carregar localizações");
    }
  };

  const sugerirLocalizacao = async (produtoId: string) => {
    try {
      // Buscar localizações com o mesmo produto
      const { data: movimentacoes, error } = await supabase
        .from("movimentacoes")
        .select("localizacao_id, localizacoes(id, nome, rua, prateleira, nivel, posicao)")
        .eq("produto_id", produtoId)
        .eq("tipo", "entrada")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;

      if (movimentacoes && movimentacoes.length > 0) {
        // Retorna a localização mais usada recentemente
        return movimentacoes[0].localizacao_id;
      }

      // Se não há histórico, sugere uma localização vazia
      const { data: localizacoesVazias, error: errorVazias } = await supabase
        .from("localizacoes")
        .select("id")
        .eq("status", "ativo")
        .limit(1);

      if (errorVazias) throw errorVazias;
      return localizacoesVazias?.[0]?.id || null;
    } catch (error) {
      console.error("Erro ao sugerir localização:", error);
      return null;
    }
  };

  const adicionarItem = () => {
    const novoItem: ItemRecebimento = {
      produto_id: "",
      lote_numero: "",
      quantidade_esperada: 0,
      quantidade_recebida: 0,
      data_fabricacao: "",
      data_validade: "",
      observacoes: "",
      localizacao_sugerida: "",
      localizacao_confirmada: "",
    };
    setItens([...itens, novoItem]);
  };

  const removerItem = (index: number) => {
    const novosItens = itens.filter((_, i) => i !== index);
    setItens(novosItens);
    form.setValue("itens", novosItens);
  };

  const atualizarItem = async (index: number, campo: keyof ItemRecebimento, valor: any) => {
    const novosItens = [...itens];
    novosItens[index] = { ...novosItens[index], [campo]: valor };

    // Se mudou o produto, sugerir localização
    if (campo === "produto_id" && valor) {
      const localizacaoSugerida = await sugerirLocalizacao(valor);
      if (localizacaoSugerida) {
        novosItens[index].localizacao_sugerida = localizacaoSugerida;
      }
    }

    setItens(novosItens);
    form.setValue("itens", novosItens);
  };

  const onSubmit = async (data: RecebimentoFormData) => {
    setLoading(true);
    try {
      const recebimentoData = {
        ...data,
        itens: itens,
        observacoes: data.observacoes || null,
      };

      if (recebimento) {
        // Editar recebimento existente
        const { error } = await supabase
          .from("recebimentos")
          .update(recebimentoData)
          .eq("id", recebimento.id);

        if (error) throw error;
        toast.success("Recebimento atualizado com sucesso!");
      } else {
        // Criar novo recebimento
        const { error } = await supabase
          .from("recebimentos")
          .insert([recebimentoData]);

        if (error) throw error;
        toast.success("Recebimento criado com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar recebimento:", error);
      toast.error(error.message || "Erro ao salvar recebimento");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800";
      case "em_conferencia":
        return "bg-blue-100 text-blue-800";
      case "conferido":
        return "bg-green-100 text-green-800";
      case "finalizado":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calcularDivergencia = (item: ItemRecebimento) => {
    return item.quantidade_recebida - item.quantidade_esperada;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Cabeçalho do Recebimento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Informações do Recebimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="numero_documento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Documento *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: NF-001234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fornecedor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do fornecedor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="data_prevista"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Prevista *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="em_conferencia">Em Conferência</SelectItem>
                        <SelectItem value="conferido">Conferido</SelectItem>
                        <SelectItem value="finalizado">Finalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Observações sobre o recebimento..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Itens do Recebimento */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Itens do Recebimento</CardTitle>
              <Button type="button" onClick={adicionarItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {itens.map((item, index) => {
              const produto = produtos.find(p => p.id === item.produto_id);
              const divergencia = calcularDivergencia(item);
              const temDivergencia = divergencia !== 0;
              
              return (
                <Card key={index} className={`border ${temDivergencia ? 'border-orange-200 bg-orange-50' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        {temDivergencia && (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Divergência: {divergencia > 0 ? '+' : ''}{divergencia}
                          </Badge>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerItem(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium">Produto *</label>
                        <Select 
                          value={item.produto_id} 
                          onValueChange={(value) => atualizarItem(index, "produto_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um produto" />
                          </SelectTrigger>
                          <SelectContent>
                            {produtos.map((produto) => (
                              <SelectItem key={produto.id} value={produto.id}>
                                {produto.sku} - {produto.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Número do Lote *</label>
                        <Input
                          value={item.lote_numero}
                          onChange={(e) => atualizarItem(index, "lote_numero", e.target.value)}
                          placeholder="Ex: L001-2024"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Qtd. Esperada *</label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantidade_esperada}
                          onChange={(e) => atualizarItem(index, "quantidade_esperada", parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Qtd. Recebida *</label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantidade_recebida}
                          onChange={(e) => atualizarItem(index, "quantidade_recebida", parseFloat(e.target.value) || 0)}
                          className={temDivergencia ? "border-orange-300" : ""}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Data de Fabricação</label>
                        <Input
                          type="date"
                          value={item.data_fabricacao}
                          onChange={(e) => atualizarItem(index, "data_fabricacao", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Data de Validade</label>
                        <Input
                          type="date"
                          value={item.data_validade}
                          onChange={(e) => atualizarItem(index, "data_validade", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Putaway - Sugestão de Localização */}
                    {(modo === "putaway" || modo === "conferencia") && (
                      <div className="border-t pt-4">
                        <h5 className="font-medium mb-3 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Putaway - Localização
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Localização Sugerida</label>
                            <Select 
                              value={item.localizacao_sugerida} 
                              onValueChange={(value) => atualizarItem(index, "localizacao_sugerida", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sistema sugerirá automaticamente" />
                              </SelectTrigger>
                              <SelectContent>
                                {localizacoes.map((loc) => (
                                  <SelectItem key={loc.id} value={loc.id}>
                                    {loc.nome} - {loc.rua}/{loc.prateleira}/{loc.nivel}/{loc.posicao}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Localização Confirmada</label>
                            <Select 
                              value={item.localizacao_confirmada} 
                              onValueChange={(value) => atualizarItem(index, "localizacao_confirmada", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Confirme a localização" />
                              </SelectTrigger>
                              <SelectContent>
                                {localizacoes.map((loc) => (
                                  <SelectItem key={loc.id} value={loc.id}>
                                    {loc.nome} - {loc.rua}/{loc.prateleira}/{loc.nivel}/{loc.posicao}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Observações</label>
                      <Textarea
                        value={item.observacoes}
                        onChange={(e) => atualizarItem(index, "observacoes", e.target.value)}
                        placeholder="Observações sobre este item..."
                        className="min-h-[60px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {itens.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum item adicionado ainda.</p>
                <p className="text-sm">Clique em "Adicionar Item" para começar.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={loading || itens.length === 0}>
            {loading ? "Salvando..." : recebimento ? "Atualizar Recebimento" : "Criar Recebimento"}
          </Button>
        </div>
      </form>
    </Form>
  );
};