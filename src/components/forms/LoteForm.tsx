import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const loteSchema = z.object({
  numero: z.string().min(1, "Número do lote é obrigatório"),
  produto_id: z.string().min(1, "Produto é obrigatório"),
  data_fabricacao: z.string().optional(),
  data_validade: z.string().optional(),
  quantidade_inicial: z.number().min(0, "Quantidade deve ser maior ou igual a zero"),
  quantidade_atual: z.number().min(0, "Quantidade deve ser maior ou igual a zero"),
  custo_unitario: z.number().min(0, "Custo deve ser maior ou igual a zero").optional(),
  fornecedor: z.string().optional(),
  observacoes: z.string().optional(),
  status: z.enum(["ativo", "bloqueado", "vencido"]).default("ativo"),
});

type LoteFormData = z.infer<typeof loteSchema>;

interface LoteFormProps {
  lote?: any;
  onSuccess: () => void;
}

export const LoteForm = ({ lote, onSuccess }: LoteFormProps) => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      numero: lote?.numero || "",
      produto_id: lote?.produto_id || "",
      data_fabricacao: lote?.data_fabricacao || "",
      data_validade: lote?.data_validade || "",
      quantidade_inicial: lote?.quantidade_inicial || 0,
      quantidade_atual: lote?.quantidade_atual || 0,
      custo_unitario: lote?.custo_unitario || 0,
      fornecedor: lote?.fornecedor || "",
      observacoes: lote?.observacoes || "",
      status: lote?.status || "ativo",
    },
  });

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const { data, error } = await supabase
        .from("produtos")
        .select("id, nome, sku")
        .eq("status", "ativo")
        .order("nome");

      if (error) throw error;
      setProdutos(data || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast.error("Erro ao carregar produtos");
    }
  };

  const onSubmit = async (data: LoteFormData) => {
    setLoading(true);
    try {
      const loteData = {
        ...data,
        data_fabricacao: data.data_fabricacao || null,
        data_validade: data.data_validade || null,
        custo_unitario: data.custo_unitario || null,
        fornecedor: data.fornecedor || null,
        observacoes: data.observacoes || null,
      };

      if (lote) {
        // Editar lote existente
        const { error } = await supabase
          .from("lotes")
          .update(loteData)
          .eq("id", lote.id);

        if (error) throw error;
        toast.success("Lote atualizado com sucesso!");
      } else {
        // Criar novo lote
        const { error } = await supabase
          .from("lotes")
          .insert([loteData]);

        if (error) throw error;
        toast.success("Lote criado com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar lote:", error);
      toast.error(error.message || "Erro ao salvar lote");
    } finally {
      setLoading(false);
    }
  };

  // Validação automática de validade
  const dataValidade = form.watch("data_validade");
  useEffect(() => {
    if (dataValidade) {
      const hoje = new Date();
      const validade = new Date(dataValidade);
      
      if (validade < hoje) {
        form.setValue("status", "vencido");
      } else if (form.getValues("status") === "vencido") {
        form.setValue("status", "ativo");
      }
    }
  }, [dataValidade, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Lote *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: L001-2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="produto_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {produtos.map((produto) => (
                      <SelectItem key={produto.id} value={produto.id}>
                        {produto.sku} - {produto.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_fabricacao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Fabricação</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="data_validade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Validade</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantidade_inicial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade Inicial *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantidade_atual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade Atual *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="custo_unitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo Unitário (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01"
                    placeholder="0,00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
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
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="bloqueado">Bloqueado</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="fornecedor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fornecedor</FormLabel>
              <FormControl>
                <Input placeholder="Nome do fornecedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Observações adicionais sobre o lote..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : lote ? "Atualizar Lote" : "Criar Lote"}
          </Button>
        </div>
      </form>
    </Form>
  );
};