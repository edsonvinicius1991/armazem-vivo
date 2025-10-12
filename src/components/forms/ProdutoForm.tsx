import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

const produtoSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório").max(50, "SKU deve ter no máximo 50 caracteres"),
  nome: z.string().min(1, "Nome é obrigatório").max(200, "Nome deve ter no máximo 200 caracteres"),
  descricao: z.string().optional(),
  categoria: z.string().optional(),
  unidade: z.string().min(1, "Unidade é obrigatória"),
  codigo_barras: z.string().optional(),
  peso_kg: z.number().min(0, "Peso deve ser positivo").optional(),
  altura_cm: z.number().min(0, "Altura deve ser positiva").optional(),
  largura_cm: z.number().min(0, "Largura deve ser positiva").optional(),
  profundidade_cm: z.number().min(0, "Profundidade deve ser positiva").optional(),
  custo_unitario: z.number().min(0, "Custo deve ser positivo").optional(),
  preco_venda: z.number().min(0, "Preço deve ser positivo").optional(),
  estoque_minimo: z.number().min(0, "Estoque mínimo deve ser positivo").default(0),
  estoque_maximo: z.number().min(0, "Estoque máximo deve ser positivo").optional(),
  controla_lote: z.boolean().default(false),
  controla_validade: z.boolean().default(false),
  status: z.enum(["ativo", "inativo", "bloqueado"]).default("ativo"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ProdutoFormProps {
  produto?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const unidadesMedida = [
  { value: "UN", label: "Unidade" },
  { value: "KG", label: "Quilograma" },
  { value: "G", label: "Grama" },
  { value: "L", label: "Litro" },
  { value: "ML", label: "Mililitro" },
  { value: "M", label: "Metro" },
  { value: "CM", label: "Centímetro" },
  { value: "M2", label: "Metro Quadrado" },
  { value: "M3", label: "Metro Cúbico" },
  { value: "CX", label: "Caixa" },
  { value: "PC", label: "Peça" },
  { value: "PAR", label: "Par" },
];

const categorias = [
  "Eletrônicos",
  "Roupas e Acessórios",
  "Casa e Jardim",
  "Esportes e Lazer",
  "Livros e Mídia",
  "Saúde e Beleza",
  "Automotivo",
  "Ferramentas",
  "Alimentação",
  "Outros",
];

export function ProdutoForm({ produto, onSuccess, onCancel }: ProdutoFormProps) {
  const isEditing = !!produto;

  const form = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      sku: "",
      nome: "",
      descricao: "",
      categoria: "",
      unidade: "UN",
      codigo_barras: "",
      peso_kg: undefined,
      altura_cm: undefined,
      largura_cm: undefined,
      profundidade_cm: undefined,
      custo_unitario: undefined,
      preco_venda: undefined,
      estoque_minimo: 0,
      estoque_maximo: undefined,
      controla_lote: false,
      controla_validade: false,
      status: "ativo",
    },
  });

  useEffect(() => {
    if (produto) {
      form.reset({
        sku: produto.sku || "",
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        categoria: produto.categoria || "",
        unidade: produto.unidade || "UN",
        codigo_barras: produto.codigo_barras || "",
        peso_kg: produto.peso_kg || undefined,
        altura_cm: produto.altura_cm || undefined,
        largura_cm: produto.largura_cm || undefined,
        profundidade_cm: produto.profundidade_cm || undefined,
        custo_unitario: produto.custo_unitario || undefined,
        preco_venda: produto.preco_venda || undefined,
        estoque_minimo: produto.estoque_minimo || 0,
        estoque_maximo: produto.estoque_maximo || undefined,
        controla_lote: produto.controla_lote || false,
        controla_validade: produto.controla_validade || false,
        status: produto.status || "ativo",
      });
    }
  }, [produto, form]);

  const onSubmit = async (data: ProdutoFormData) => {
    try {
      // Mapear os dados do formulário para as colunas da tabela produtos (migração ativa)
      const produtoData = {
        sku: data.sku,
        nome: data.nome,
        descricao: data.descricao || null,
        categoria: data.categoria || null,
        unidade: data.unidade,
        codigo_barras: data.codigo_barras || null,
        peso_kg: data.peso_kg || null,
        altura_cm: data.altura_cm || null,
        largura_cm: data.largura_cm || null,
        profundidade_cm: data.profundidade_cm || null,
        custo_unitario: data.custo_unitario || null,
        preco_venda: data.preco_venda || null,
        estoque_minimo: data.estoque_minimo || 0,
        estoque_maximo: data.estoque_maximo || null,
        controla_lote: data.controla_lote || false,
        controla_validade: data.controla_validade || false,
        status: data.status,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("produtos")
          .update(produtoData)
          .eq("id", produto.id);

        if (error) throw error;
        toast.success("Produto atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from("produtos")
          .insert([produtoData]);

        if (error) throw error;
        toast.success("Produto criado com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error);
      if (error.code === "23505") {
        toast.error("SKU já existe. Escolha um SKU único.");
      } else {
        toast.error("Erro ao salvar produto");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: PROD001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
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
            name="unidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {unidadesMedida.map((unidade) => (
                      <SelectItem key={unidade.value} value={unidade.value}>
                        {unidade.label}
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
            name="codigo_barras"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Barras</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123456789012" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        </div>

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrição detalhada do produto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="peso_kg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.001"
                    placeholder="0.000"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="altura_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="largura_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Largura (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profundidade_cm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profundidade (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="custo_unitario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Custo Unitário (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preco_venda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço de Venda (R$)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estoque_minimo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque Mínimo</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="estoque_maximo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estoque Máximo</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
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

        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="controla_lote"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Controla Lote</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Produto requer controle de lote
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="controla_validade"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Controla Validade</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Produto possui data de validade
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                    <SelectItem value="bloqueado">Bloqueado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? "Atualizar" : "Criar"} Produto
          </Button>
        </div>
      </form>
    </Form>
  );
}