-- Criação das tabelas para o módulo de Recebimentos

-- Enum para status de recebimento
CREATE TYPE public.status_recebimento AS ENUM ('pendente', 'em_conferencia', 'conferido', 'finalizado');

-- Tabela principal de recebimentos
CREATE TABLE public.recebimentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_documento TEXT NOT NULL UNIQUE,
  fornecedor TEXT NOT NULL,
  data_prevista DATE NOT NULL,
  data_recebimento TIMESTAMPTZ,
  status public.status_recebimento NOT NULL DEFAULT 'pendente',
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Tabela de itens do recebimento
CREATE TABLE public.recebimento_itens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recebimento_id UUID NOT NULL REFERENCES public.recebimentos(id) ON DELETE CASCADE,
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE RESTRICT,
  lote_numero TEXT NOT NULL,
  quantidade_esperada DECIMAL(10,2) NOT NULL DEFAULT 0,
  quantidade_recebida DECIMAL(10,2) NOT NULL DEFAULT 0,
  data_fabricacao DATE,
  data_validade DATE,
  localizacao_sugerida UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,
  localizacao_confirmada UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_recebimentos_status ON public.recebimentos(status);
CREATE INDEX idx_recebimentos_data_prevista ON public.recebimentos(data_prevista);
CREATE INDEX idx_recebimentos_fornecedor ON public.recebimentos(fornecedor);
CREATE INDEX idx_recebimento_itens_recebimento ON public.recebimento_itens(recebimento_id);
CREATE INDEX idx_recebimento_itens_produto ON public.recebimento_itens(produto_id);
CREATE INDEX idx_recebimento_itens_lote ON public.recebimento_itens(lote_numero);

-- Enable RLS
ALTER TABLE public.recebimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recebimento_itens ENABLE ROW LEVEL SECURITY;

-- Triggers para updated_at
CREATE TRIGGER update_recebimentos_updated_at 
  BEFORE UPDATE ON public.recebimentos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_recebimento_itens_updated_at 
  BEFORE UPDATE ON public.recebimento_itens
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Políticas RLS básicas (permitir tudo para usuários autenticados por enquanto)
CREATE POLICY "Usuários autenticados podem ver recebimentos" ON public.recebimentos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir recebimentos" ON public.recebimentos
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar recebimentos" ON public.recebimentos
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar recebimentos" ON public.recebimentos
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem ver itens de recebimento" ON public.recebimento_itens
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem inserir itens de recebimento" ON public.recebimento_itens
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem atualizar itens de recebimento" ON public.recebimento_itens
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar itens de recebimento" ON public.recebimento_itens
  FOR DELETE USING (auth.role() = 'authenticated');

-- Função para criar movimentações automaticamente quando um recebimento é finalizado
CREATE OR REPLACE FUNCTION public.processar_recebimento_finalizado()
RETURNS TRIGGER AS $$
BEGIN
  -- Só processa se o status mudou para 'finalizado'
  IF NEW.status = 'finalizado' AND OLD.status != 'finalizado' THEN
    -- Criar movimentações de entrada para cada item do recebimento
    INSERT INTO public.movimentacoes (
      tipo,
      produto_id,
      lote_id,
      localizacao_destino_id,
      quantidade,
      documento,
      observacao,
      realizada_por
    )
    SELECT 
      'entrada'::public.tipo_movimentacao,
      ri.produto_id,
      l.id, -- lote_id (será criado se não existir)
      ri.localizacao_confirmada,
      ri.quantidade_recebida,
      NEW.numero_documento,
      'Recebimento finalizado: ' || COALESCE(ri.observacoes, ''),
      NEW.created_by
    FROM public.recebimento_itens ri
    LEFT JOIN public.lotes l ON (l.produto_id = ri.produto_id AND l.numero_lote = ri.lote_numero)
    WHERE ri.recebimento_id = NEW.id
      AND ri.quantidade_recebida > 0
      AND ri.localizacao_confirmada IS NOT NULL;

    -- Criar ou atualizar lotes
    INSERT INTO public.lotes (
      produto_id,
      numero_lote,
      data_fabricacao,
      data_validade,
      quantidade_inicial,
      quantidade_atual
    )
    SELECT 
      ri.produto_id,
      ri.lote_numero,
      ri.data_fabricacao,
      ri.data_validade,
      ri.quantidade_recebida,
      ri.quantidade_recebida
    FROM public.recebimento_itens ri
    WHERE ri.recebimento_id = NEW.id
      AND ri.quantidade_recebida > 0
    ON CONFLICT (produto_id, numero_lote) 
    DO UPDATE SET
      quantidade_atual = public.lotes.quantidade_atual + EXCLUDED.quantidade_inicial,
      updated_at = NOW();

    -- Atualizar estoque por localização
    INSERT INTO public.estoque_localizacao (
      produto_id,
      localizacao_id,
      lote_id,
      quantidade
    )
    SELECT 
      ri.produto_id,
      ri.localizacao_confirmada,
      l.id,
      ri.quantidade_recebida
    FROM public.recebimento_itens ri
    JOIN public.lotes l ON (l.produto_id = ri.produto_id AND l.numero_lote = ri.lote_numero)
    WHERE ri.recebimento_id = NEW.id
      AND ri.quantidade_recebida > 0
      AND ri.localizacao_confirmada IS NOT NULL
    ON CONFLICT (produto_id, localizacao_id, lote_id)
    DO UPDATE SET
      quantidade = public.estoque_localizacao.quantidade + EXCLUDED.quantidade,
      updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para processar recebimento finalizado
CREATE TRIGGER trigger_processar_recebimento_finalizado
  AFTER UPDATE ON public.recebimentos
  FOR EACH ROW
  EXECUTE FUNCTION public.processar_recebimento_finalizado();