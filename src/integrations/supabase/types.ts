export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      almoxarifados: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          endereco: string | null
          id: string
          nome: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          endereco?: string | null
          id?: string
          nome: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          endereco?: string | null
          id?: string
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      estoque_localizacao: {
        Row: {
          id: string
          localizacao_id: string
          lote_id: string | null
          produto_id: string
          quantidade: number
          updated_at: string
        }
        Insert: {
          id?: string
          localizacao_id: string
          lote_id?: string | null
          produto_id: string
          quantidade?: number
          updated_at?: string
        }
        Update: {
          id?: string
          localizacao_id?: string
          lote_id?: string | null
          produto_id?: string
          quantidade?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "estoque_localizacao_localizacao_id_fkey"
            columns: ["localizacao_id"]
            isOneToOne: false
            referencedRelation: "localizacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estoque_localizacao_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estoque_localizacao_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      localizacoes: {
        Row: {
          almoxarifado_id: string
          ativo: boolean
          box: string
          capacidade_maxima: number | null
          codigo: string
          created_at: string
          id: string
          nivel: string
          prateleira: string
          rua: string
          tipo: Database["public"]["Enums"]["tipo_localizacao"]
          updated_at: string
        }
        Insert: {
          almoxarifado_id: string
          ativo?: boolean
          box: string
          capacidade_maxima?: number | null
          codigo: string
          created_at?: string
          id?: string
          nivel: string
          prateleira: string
          rua: string
          tipo?: Database["public"]["Enums"]["tipo_localizacao"]
          updated_at?: string
        }
        Update: {
          almoxarifado_id?: string
          ativo?: boolean
          box?: string
          capacidade_maxima?: number | null
          codigo?: string
          created_at?: string
          id?: string
          nivel?: string
          prateleira?: string
          rua?: string
          tipo?: Database["public"]["Enums"]["tipo_localizacao"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "localizacoes_almoxarifado_id_fkey"
            columns: ["almoxarifado_id"]
            isOneToOne: false
            referencedRelation: "almoxarifados"
            referencedColumns: ["id"]
          },
        ]
      }
      lotes: {
        Row: {
          bloqueado: boolean
          created_at: string
          data_fabricacao: string | null
          data_validade: string | null
          id: string
          motivo_bloqueio: string | null
          numero_lote: string
          produto_id: string
          quantidade_atual: number
          quantidade_inicial: number
          updated_at: string
        }
        Insert: {
          bloqueado?: boolean
          created_at?: string
          data_fabricacao?: string | null
          data_validade?: string | null
          id?: string
          motivo_bloqueio?: string | null
          numero_lote: string
          produto_id: string
          quantidade_atual: number
          quantidade_inicial: number
          updated_at?: string
        }
        Update: {
          bloqueado?: boolean
          created_at?: string
          data_fabricacao?: string | null
          data_validade?: string | null
          id?: string
          motivo_bloqueio?: string | null
          numero_lote?: string
          produto_id?: string
          quantidade_atual?: number
          quantidade_inicial?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lotes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      movimentacoes: {
        Row: {
          created_at: string
          custo_unitario: number | null
          documento: string | null
          id: string
          localizacao_destino_id: string | null
          localizacao_origem_id: string | null
          lote_id: string | null
          observacao: string | null
          produto_id: string
          quantidade: number
          realizada_em: string
          realizada_por: string
          tipo: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Insert: {
          created_at?: string
          custo_unitario?: number | null
          documento?: string | null
          id?: string
          localizacao_destino_id?: string | null
          localizacao_origem_id?: string | null
          lote_id?: string | null
          observacao?: string | null
          produto_id: string
          quantidade: number
          realizada_em?: string
          realizada_por: string
          tipo: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Update: {
          created_at?: string
          custo_unitario?: number | null
          documento?: string | null
          id?: string
          localizacao_destino_id?: string | null
          localizacao_origem_id?: string | null
          lote_id?: string | null
          observacao?: string | null
          produto_id?: string
          quantidade?: number
          realizada_em?: string
          realizada_por?: string
          tipo?: Database["public"]["Enums"]["tipo_movimentacao"]
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_localizacao_destino_id_fkey"
            columns: ["localizacao_destino_id"]
            isOneToOne: false
            referencedRelation: "localizacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_localizacao_origem_id_fkey"
            columns: ["localizacao_origem_id"]
            isOneToOne: false
            referencedRelation: "localizacoes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_realizada_por_fkey"
            columns: ["realizada_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      produtos: {
        Row: {
          altura_cm: number | null
          categoria: string | null
          codigo_barras: string | null
          codigo_ean: string | null
          controla_lote: boolean
          controla_validade: boolean
          created_at: string
          created_by: string | null
          custo_unitario: number | null
          descricao: string | null
          estoque_maximo: number | null
          estoque_minimo: number | null
          foto_url: string | null
          id: string
          largura_cm: number | null
          nome: string
          peso_kg: number | null
          preco_venda: number | null
          profundidade_cm: number | null
          sku: string
          status: Database["public"]["Enums"]["status_produto"]
          unidade: string
          updated_at: string
        }
        Insert: {
          altura_cm?: number | null
          categoria?: string | null
          codigo_barras?: string | null
          codigo_ean?: string | null
          controla_lote?: boolean
          controla_validade?: boolean
          created_at?: string
          created_by?: string | null
          custo_unitario?: number | null
          descricao?: string | null
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          largura_cm?: number | null
          nome: string
          peso_kg?: number | null
          preco_venda?: number | null
          profundidade_cm?: number | null
          sku: string
          status?: Database["public"]["Enums"]["status_produto"]
          unidade?: string
          updated_at?: string
        }
        Update: {
          altura_cm?: number | null
          categoria?: string | null
          codigo_barras?: string | null
          codigo_ean?: string | null
          controla_lote?: boolean
          controla_validade?: boolean
          created_at?: string
          created_by?: string | null
          custo_unitario?: number | null
          descricao?: string | null
          estoque_maximo?: number | null
          estoque_minimo?: number | null
          foto_url?: string | null
          id?: string
          largura_cm?: number | null
          nome?: string
          peso_kg?: number | null
          preco_venda?: number | null
          profundidade_cm?: number | null
          sku?: string
          status?: Database["public"]["Enums"]["status_produto"]
          unidade?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "produtos_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          nome_completo: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nome_completo: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome_completo?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recebimentos: {
        Row: {
          created_at: string
          data_esperada: string
          documento: string
          fornecedor: string
          id: string
          observacoes: string | null
          status: Database["public"]["Enums"]["status_recebimento"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_esperada: string
          documento: string
          fornecedor: string
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_recebimento"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_esperada?: string
          documento?: string
          fornecedor?: string
          id?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_recebimento"]
          updated_at?: string
        }
        Relationships: []
      }
      recebimento_itens: {
        Row: {
          created_at: string
          custo_unitario: number | null
          data_fabricacao: string | null
          data_validade: string | null
          id: string
          localizacao_confirmada: string | null
          localizacao_sugerida: string | null
          numero_lote: string | null
          observacoes: string | null
          produto_id: string
          quantidade_esperada: number
          quantidade_recebida: number | null
          recebimento_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custo_unitario?: number | null
          data_fabricacao?: string | null
          data_validade?: string | null
          id?: string
          localizacao_confirmada?: string | null
          localizacao_sugerida?: string | null
          numero_lote?: string | null
          observacoes?: string | null
          produto_id: string
          quantidade_esperada: number
          quantidade_recebida?: number | null
          recebimento_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custo_unitario?: number | null
          data_fabricacao?: string | null
          data_validade?: string | null
          id?: string
          localizacao_confirmada?: string | null
          localizacao_sugerida?: string | null
          numero_lote?: string | null
          observacoes?: string | null
          produto_id?: string
          quantidade_esperada?: number
          quantidade_recebida?: number | null
          recebimento_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recebimento_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recebimento_itens_recebimento_id_fkey"
            columns: ["recebimento_id"]
            isOneToOne: false
            referencedRelation: "recebimentos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          almoxarifado_id: string | null
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          almoxarifado_id?: string | null
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          almoxarifado_id?: string | null
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "gestor" | "supervisor" | "conferente" | "estoquista"
      status_produto: "ativo" | "inativo" | "bloqueado"
      status_recebimento: "pendente" | "em_conferencia" | "conferido" | "finalizado"
      tipo_localizacao: "picking" | "bulk" | "quarentena" | "expedicao"
      tipo_movimentacao:
        | "entrada"
        | "saida"
        | "transferencia"
        | "ajuste"
        | "devolucao"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "gestor", "supervisor", "conferente", "estoquista"],
      status_produto: ["ativo", "inativo", "bloqueado"],
      status_recebimento: ["pendente", "em_conferencia", "conferido", "finalizado"],
      tipo_localizacao: ["picking", "bulk", "quarentena", "expedicao"],
      tipo_movimentacao: [
        "entrada",
        "saida",
        "transferencia",
        "ajuste",
        "devolucao",
      ],
    },
  },
} as const
