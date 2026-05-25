import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const movimentacaoSchema = z.object({
  produto_id: z.string().min(1, "Produto é obrigatório"),
  tipo: z.enum(["entrada", "saida", "transferencia", "ajuste", "inventario"], {
    required_error: "Tipo é obrigatório",
  }),
  quantidade: z.number({ invalid_type_error: "Quantidade é obrigatória" }).int().min(1, "Quantidade mínima é 1"),
  localizacao_origem_id: z.string().optional(),
  localizacao_destino_id: z.string().optional(),
  lote_id: z.string().optional(),
  motivo: z.string().optional(),
  observacao: z.string().optional(),
  documento_referencia: z.string().optional(),
}).refine((data) => {
  if (data.tipo === "transferencia") {
    return !!data.localizacao_origem_id && !!data.localizacao_destino_id;
  }
  return true;
}, { message: "Transferência requer origem e destino", path: ["localizacao_destino_id"] });

type MovimentacaoFormData = z.infer<typeof movimentacaoSchema>;

interface MovimentacaoFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const tiposMovimentacao = [
  { value: "entrada", label: "Entrada" },
  { value: "saida", label: "Saída" },
  { value: "transferencia", label: "Transferência" },
  { value: "ajuste", label: "Ajuste" },
  { value: "inventario", label: "Inventário" },
];

export function MovimentacaoForm({ onSuccess, onCancel }: MovimentacaoFormProps) {
  const [produtos, setProdutos] = useState<{ id: string; sku: string; nome: string }[]>([]);
  const [localizacoes, setLocalizacoes] = useState<{ id: string; codigo: string; descricao: string | null }[]>([]);
  const [lotes, setLotes] = useState<{ id: string; numero_lote: string }[]>([]);
  const [loadingDeps, setLoadingDeps] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<MovimentacaoFormData>({
    resolver: zodResolver(movimentacaoSchema),
    defaultValues: {
      produto_id: "",
      tipo: undefined,
      quantidade: undefined,
      localizacao_origem_id: undefined,
      localizacao_destino_id: undefined,
      lote_id: undefined,
      motivo: "",
      observacao: "",
      documento_referencia: "",
    },
  });

  const tipoSelecionado = form.watch("tipo");
  const produtoSelecionado = form.watch("produto_id");

  useEffect(() => {
    const carregar = async () => {
      setLoadingDeps(true);
      const [{ data: prods }, { data: locs }] = await Promise.all([
        supabase.from("produtos").select("id, sku, nome").eq("status", "ativo").order("nome"),
        supabase.from("localizacoes").select("id, codigo, descricao").eq("ativo", true).order("codigo"),
      ]);
      setProdutos(prods || []);
      setLocalizacoes(locs || []);
      setLoadingDeps(false);
    };
    carregar();
  }, []);

  useEffect(() => {
    if (!produtoSelecionado) {
      setLotes([]);
      form.setValue("lote_id", undefined);
      return;
    }
    supabase
      .from("lotes")
      .select("id, numero_lote")
      .eq("produto_id", produtoSelecionado)
      .gt("quantidade_atual", 0)
      .order("numero_lote")
      .then(({ data }) => setLotes(data || []));
  }, [produtoSelecionado]);

  const onSubmit = async (data: MovimentacaoFormData) => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from("movimentacoes").insert({
        produto_id: data.produto_id,
        tipo: data.tipo,
        quantidade: data.quantidade,
        localizacao_origem_id: data.localizacao_origem_id || null,
        localizacao_destino_id: data.localizacao_destino_id || null,
        lote_id: data.lote_id || null,
        motivo: data.motivo || null,
        observacao: data.observacao || null,
        documento_referencia: data.documento_referencia || null,
        usuario_id: user?.id || null,
        realizada_por: user?.id || null,
      });

      if (error) throw error;
      toast.success("Movimentação registrada com sucesso!");
      onSuccess();
    } catch (error: any) {
      console.error("Erro ao registrar movimentação:", error);
      toast.error(error.message || "Erro ao registrar movimentação");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDeps) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
        Carregando dados...
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Produto */}
        <FormField
          control={form.control}
          name="produto_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto *</FormLabel>
              <FormControl>
                <SearchableSelect
                  options={produtos.map((p) => ({ value: p.id, label: `${p.sku} — ${p.nome}` }))}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Selecione o produto"
                  searchPlaceholder="Pesquisar por SKU ou nome..."
                  emptyMessage="Nenhum produto encontrado."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tipo e Quantidade */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo *</FormLabel>
                <FormControl>
                  <SearchableSelect
                    options={tiposMovimentacao}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione o tipo"
                    searchPlaceholder="Pesquisar tipo..."
                    emptyMessage="Tipo não encontrado."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Localização Origem */}
        {(tipoSelecionado === "saida" || tipoSelecionado === "transferencia") && (
          <FormField
            control={form.control}
            name="localizacao_origem_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização de Origem {tipoSelecionado === "transferencia" ? "*" : ""}</FormLabel>
                <FormControl>
                  <SearchableSelect
                    options={localizacoes.map((l) => ({ value: l.id, label: l.descricao ? `${l.codigo} — ${l.descricao}` : l.codigo }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione a origem"
                    searchPlaceholder="Pesquisar localização..."
                    emptyMessage="Localização não encontrada."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Localização Destino */}
        {(tipoSelecionado === "entrada" || tipoSelecionado === "transferencia" || tipoSelecionado === "ajuste") && (
          <FormField
            control={form.control}
            name="localizacao_destino_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localização de Destino {tipoSelecionado === "transferencia" ? "*" : ""}</FormLabel>
                <FormControl>
                  <SearchableSelect
                    options={localizacoes.map((l) => ({ value: l.id, label: l.descricao ? `${l.codigo} — ${l.descricao}` : l.codigo }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione o destino"
                    searchPlaceholder="Pesquisar localização..."
                    emptyMessage="Localização não encontrada."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Lote (opcional) */}
        {lotes.length > 0 && (
          <FormField
            control={form.control}
            name="lote_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lote</FormLabel>
                <FormControl>
                  <SearchableSelect
                    options={lotes.map((l) => ({ value: l.id, label: l.numero_lote }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Selecione o lote (opcional)"
                    searchPlaceholder="Pesquisar lote..."
                    emptyMessage="Lote não encontrado."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Motivo */}
        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo</FormLabel>
              <FormControl>
                <Input placeholder="Motivo da movimentação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Documento de Referência */}
        <FormField
          control={form.control}
          name="documento_referencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documento de Referência</FormLabel>
              <FormControl>
                <Input placeholder="NF, OS, pedido..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Observação */}
        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação</FormLabel>
              <FormControl>
                <Textarea placeholder="Observações adicionais..." rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ações */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Registrando..." : "Registrar Movimentação"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
