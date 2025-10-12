import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, MapPin } from "lucide-react";

const localizacaoSchema = z.object({
  codigo: z.string().min(1, "Código é obrigatório").max(50, "Código deve ter no máximo 50 caracteres"),
  tipo: z.enum(["picking", "bulk", "quarentena"], {
    required_error: "Tipo é obrigatório"
  }),
  almoxarifado_id: z.string().min(1, "Almoxarifado é obrigatório"),
  rua: z.string().optional(),
  prateleira: z.string().optional(),
  nivel: z.string().optional(),
  box: z.string().optional(),
  capacidade_maxima: z.number().min(0, "Capacidade deve ser positiva").optional(),
  capacidade_peso: z.number().min(0, "Capacidade de peso deve ser positiva").optional(),
  altura: z.number().min(0, "Altura deve ser positiva").optional(),
  largura: z.number().min(0, "Largura deve ser positiva").optional(),
  profundidade: z.number().min(0, "Profundidade deve ser positiva").optional(),
  temperatura_min: z.number().optional(),
  temperatura_max: z.number().optional(),
  observacoes: z.string().optional(),
  ativo: z.boolean().default(true),
});

type LocalizacaoFormData = z.infer<typeof localizacaoSchema>;

interface LocalizacaoFormProps {
  localizacao?: any;
  onSuccess: () => void;
}

export function LocalizacaoForm({ localizacao, onSuccess }: LocalizacaoFormProps) {
  const [loading, setLoading] = useState(false);
  const [almoxarifados, setAlmoxarifados] = useState<any[]>([]);
  const isEditing = !!localizacao;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocalizacaoFormData>({
    resolver: zodResolver(localizacaoSchema),
    defaultValues: {
      codigo: localizacao?.codigo || "",
      tipo: localizacao?.tipo || "picking",
      almoxarifado_id: localizacao?.almoxarifado_id || "",
      rua: localizacao?.rua || "",
      prateleira: localizacao?.prateleira || "",
      nivel: localizacao?.nivel || "",
      box: localizacao?.box || "",
      capacidade_maxima: localizacao?.capacidade_maxima || undefined,
      capacidade_peso: localizacao?.capacidade_peso || undefined,
      altura: localizacao?.altura || undefined,
      largura: localizacao?.largura || undefined,
      profundidade: localizacao?.profundidade || undefined,
      temperatura_min: localizacao?.temperatura_min || undefined,
      temperatura_max: localizacao?.temperatura_max || undefined,
      observacoes: localizacao?.observacoes || "",
      ativo: localizacao?.ativo ?? true,
    },
  });

  useEffect(() => {
    loadAlmoxarifados();
  }, []);

  const loadAlmoxarifados = async () => {
    try {
      const { data, error } = await supabase
        .from("almoxarifados")
        .select("id, nome")
        .eq("ativo", true)
        .order("nome");

      if (error) throw error;
      setAlmoxarifados(data || []);
    } catch (error) {
      console.error("Erro ao carregar almoxarifados:", error);
      toast.error("Erro ao carregar almoxarifados");
    }
  };

  const onSubmit = async (data: LocalizacaoFormData) => {
    setLoading(true);
    try {
      const payload = {
        codigo: data.codigo,
        tipo: data.tipo,
        almoxarifado_id: data.almoxarifado_id,
        rua: data.rua || null,
        prateleira: data.prateleira || null,
        nivel: data.nivel || null,
        box: data.box || null,
        capacidade_maxima: data.capacidade_maxima || null,
        capacidade_peso: data.capacidade_peso || null,
        altura: data.altura || null,
        largura: data.largura || null,
        profundidade: data.profundidade || null,
        temperatura_min: data.temperatura_min ?? null,
        temperatura_max: data.temperatura_max ?? null,
        observacoes: data.observacoes || null,
        ativo: data.ativo ?? true,
        updated_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from("localizacoes")
          .update(payload)
          .eq("id", localizacao.id);

        if (error) throw error;
        toast.success("Localização atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("localizacoes")
          .insert([payload]);

        if (error) throw error;
        toast.success("Localização criada com sucesso!");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Erro ao salvar localização:", error);
      toast.error(error.message || "Erro ao salvar localização");
    } finally {
      setLoading(false);
    }
  };

  const tipoOptions = [
    { value: "picking", label: "Picking" },
    { value: "bulk", label: "Bulk/Estoque" },
    { value: "quarentena", label: "Quarentena" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Informações Básicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código *</Label>
              <Input
                id="codigo"
                {...register("codigo")}
                placeholder="Ex: A01-01-01"
              />
              {errors.codigo && (
                <p className="text-sm text-red-600">{errors.codigo.message}</p>
              )}
            </div>

            {/* Campo 'nome' removido: não existe na tabela remota */}

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select
                value={watch("tipo")}
                onValueChange={(value) => setValue("tipo", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tipo && (
                <p className="text-sm text-red-600">{errors.tipo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="almoxarifado_id">Almoxarifado *</Label>
              <Select
                value={watch("almoxarifado_id")}
                onValueChange={(value) => setValue("almoxarifado_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o almoxarifado" />
                </SelectTrigger>
                <SelectContent>
                  {almoxarifados.map((almoxarifado) => (
                    <SelectItem key={almoxarifado.id} value={almoxarifado.id}>
                      {almoxarifado.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.almoxarifado_id && (
                <p className="text-sm text-red-600">{errors.almoxarifado_id.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ativo"
              checked={watch("ativo")}
              onCheckedChange={(checked) => setValue("ativo", checked)}
            />
            <Label htmlFor="ativo">Localização ativa</Label>
          </div>
        </CardContent>
      </Card>

      {/* Endereçamento */}
      <Card>
        <CardHeader>
          <CardTitle>Endereçamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rua">Rua</Label>
              <Input
                id="rua"
                {...register("rua")}
                placeholder="Ex: A"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prateleira">Prateleira</Label>
              <Input
                id="prateleira"
                {...register("prateleira")}
                placeholder="Ex: 01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel">Nível</Label>
              <Input
                id="nivel"
                {...register("nivel")}
                placeholder="Ex: 01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="box">Box</Label>
              <Input
                id="box"
                {...register("box")}
                placeholder="Ex: A"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Capacidade e Dimensões */}
      <Card>
        <CardHeader>
          <CardTitle>Capacidade e Dimensões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacidade_maxima">Capacidade Máxima (unidades)</Label>
              <Input
                id="capacidade_maxima"
                type="number"
                step="1"
                min="0"
                {...register("capacidade_maxima", { valueAsNumber: true })}
                placeholder="Ex: 100"
              />
              {errors.capacidade_maxima && (
                <p className="text-sm text-red-600">{errors.capacidade_maxima.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacidade_peso">Capacidade de Peso (kg)</Label>
              <Input
                id="capacidade_peso"
                type="number"
                step="0.01"
                min="0"
                {...register("capacidade_peso", { valueAsNumber: true })}
                placeholder="Ex: 1000.50"
              />
              {errors.capacidade_peso && (
                <p className="text-sm text-red-600">{errors.capacidade_peso.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                min="0"
                {...register("altura", { valueAsNumber: true })}
                placeholder="Ex: 200.5"
              />
              {errors.altura && (
                <p className="text-sm text-red-600">{errors.altura.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="largura">Largura (cm)</Label>
              <Input
                id="largura"
                type="number"
                step="0.01"
                min="0"
                {...register("largura", { valueAsNumber: true })}
                placeholder="Ex: 120.5"
              />
              {errors.largura && (
                <p className="text-sm text-red-600">{errors.largura.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profundidade">Profundidade (cm)</Label>
              <Input
                id="profundidade"
                type="number"
                step="0.01"
                min="0"
                {...register("profundidade", { valueAsNumber: true })}
                placeholder="Ex: 80.5"
              />
              {errors.profundidade && (
                <p className="text-sm text-red-600">{errors.profundidade.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controle de Temperatura */}
      <Card>
        <CardHeader>
          <CardTitle>Controle de Temperatura</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperatura_min">Temperatura Mínima (°C)</Label>
              <Input
                id="temperatura_min"
                type="number"
                step="0.1"
                {...register("temperatura_min", { valueAsNumber: true })}
                placeholder="Ex: -18.0"
              />
              {errors.temperatura_min && (
                <p className="text-sm text-red-600">{errors.temperatura_min.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperatura_max">Temperatura Máxima (°C)</Label>
              <Input
                id="temperatura_max"
                type="number"
                step="0.1"
                {...register("temperatura_max", { valueAsNumber: true })}
                placeholder="Ex: 25.0"
              />
              {errors.temperatura_max && (
                <p className="text-sm text-red-600">{errors.temperatura_max.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Observações */}
      <Card>
        <CardHeader>
          <CardTitle>Observações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              {...register("observacoes")}
              placeholder="Informações adicionais sobre a localização..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Atualizar" : "Criar"} Localização
        </Button>
      </div>
    </form>
  );
}