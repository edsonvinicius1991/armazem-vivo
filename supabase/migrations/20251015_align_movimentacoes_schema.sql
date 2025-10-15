-- Alinhamento de esquema para tabela 'movimentacoes'
-- Objetivo: garantir compatibilidade com o frontend (documento/documento_referencia,
-- observacao/motivo, realizada_por/usuario_id, realizada_em/data_movimentacao, custo_unitario)

-- Criar tipos ENUM se não existirem (mantém compatibilidade)
DO $$ BEGIN
    CREATE TYPE movimentacao_tipo AS ENUM ('entrada', 'saida', 'transferencia', 'ajuste', 'inventario');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Adicionar colunas opcionais (IF NOT EXISTS) para compatibilidade total
ALTER TABLE IF EXISTS public.movimentacoes
    ADD COLUMN IF NOT EXISTS documento VARCHAR(100),
    ADD COLUMN IF NOT EXISTS observacao TEXT,
    ADD COLUMN IF NOT EXISTS realizada_por UUID,
    ADD COLUMN IF NOT EXISTS realizada_em TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS custo_unitario NUMERIC,
    ADD COLUMN IF NOT EXISTS motivo TEXT,
    ADD COLUMN IF NOT EXISTS documento_referencia VARCHAR(100),
    ADD COLUMN IF NOT EXISTS usuario_id UUID,
    ADD COLUMN IF NOT EXISTS data_movimentacao TIMESTAMPTZ DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Chaves estrangeiras (com verificação de existência)
DO $$ BEGIN
    ALTER TABLE public.movimentacoes
      ADD CONSTRAINT movimentacoes_usuario_id_fkey
      FOREIGN KEY (usuario_id) REFERENCES public.profiles(id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.movimentacoes
      ADD CONSTRAINT movimentacoes_realizada_por_fkey
      FOREIGN KEY (realizada_por) REFERENCES public.profiles(id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Índices úteis para busca/ordenacao
CREATE INDEX IF NOT EXISTS idx_movimentacoes_documento ON public.movimentacoes(documento);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_documento_ref ON public.movimentacoes(documento_referencia);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_realizada_em ON public.movimentacoes(realizada_em DESC);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_data_movimentacao ON public.movimentacoes(data_movimentacao DESC);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_created_at ON public.movimentacoes(created_at DESC);

-- Garantir FKs para localizações (em alguns ambientes podem não existir)
DO $$ BEGIN
    ALTER TABLE public.movimentacoes
      ADD CONSTRAINT movimentacoes_localizacao_origem_id_fkey
      FOREIGN KEY (localizacao_origem_id) REFERENCES public.localizacoes(id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.movimentacoes
      ADD CONSTRAINT movimentacoes_localizacao_destino_id_fkey
      FOREIGN KEY (localizacao_destino_id) REFERENCES public.localizacoes(id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Habilitar RLS se ainda não estiver habilitado
DO $$ BEGIN
    ALTER TABLE public.movimentacoes ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN others THEN NULL; END $$;

-- Políticas básicas de acesso autenticado (mantém compatibilidade com app)
CREATE POLICY IF NOT EXISTS "Acesso autenticado movimentacoes" ON public.movimentacoes
  FOR ALL USING (auth.role() = 'authenticated');

-- Fim do alinhamento