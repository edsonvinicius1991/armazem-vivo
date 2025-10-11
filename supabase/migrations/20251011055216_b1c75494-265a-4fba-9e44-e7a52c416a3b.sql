-- Tipos enum para o sistema
CREATE TYPE public.app_role AS ENUM ('admin', 'gestor', 'supervisor', 'conferente', 'estoquista');
CREATE TYPE public.tipo_movimentacao AS ENUM ('entrada', 'saida', 'transferencia', 'ajuste', 'devolucao');
CREATE TYPE public.status_produto AS ENUM ('ativo', 'inativo', 'bloqueado');
CREATE TYPE public.tipo_localizacao AS ENUM ('picking', 'bulk', 'quarentena', 'expedicao');

-- Tabela de perfis de usuário
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de roles de usuário
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  almoxarifado_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role, almoxarifado_id)
);

-- Tabela de almoxarifados
CREATE TABLE public.almoxarifados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  endereco TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de localizações
CREATE TABLE public.localizacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  almoxarifado_id UUID NOT NULL REFERENCES public.almoxarifados(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  rua TEXT NOT NULL,
  prateleira TEXT NOT NULL,
  nivel TEXT NOT NULL,
  box TEXT NOT NULL,
  tipo public.tipo_localizacao NOT NULL DEFAULT 'picking',
  capacidade_maxima DECIMAL(10,2),
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(almoxarifado_id, rua, prateleira, nivel, box)
);

-- Tabela de produtos
CREATE TABLE public.produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT,
  unidade TEXT NOT NULL DEFAULT 'UN',
  codigo_barras TEXT,
  codigo_ean TEXT,
  peso_kg DECIMAL(10,3),
  altura_cm DECIMAL(10,2),
  largura_cm DECIMAL(10,2),
  profundidade_cm DECIMAL(10,2),
  custo_unitario DECIMAL(10,2),
  preco_venda DECIMAL(10,2),
  estoque_minimo INTEGER DEFAULT 0,
  estoque_maximo INTEGER,
  foto_url TEXT,
  controla_lote BOOLEAN NOT NULL DEFAULT false,
  controla_validade BOOLEAN NOT NULL DEFAULT false,
  status public.status_produto NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Tabela de lotes
CREATE TABLE public.lotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
  numero_lote TEXT NOT NULL,
  data_fabricacao DATE,
  data_validade DATE,
  quantidade_inicial DECIMAL(10,2) NOT NULL,
  quantidade_atual DECIMAL(10,2) NOT NULL,
  bloqueado BOOLEAN NOT NULL DEFAULT false,
  motivo_bloqueio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(produto_id, numero_lote)
);

-- Tabela de estoque por localização
CREATE TABLE public.estoque_localizacao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
  localizacao_id UUID NOT NULL REFERENCES public.localizacoes(id) ON DELETE CASCADE,
  lote_id UUID REFERENCES public.lotes(id) ON DELETE SET NULL,
  quantidade DECIMAL(10,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(produto_id, localizacao_id, lote_id)
);

-- Tabela de movimentações
CREATE TABLE public.movimentacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo public.tipo_movimentacao NOT NULL,
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE RESTRICT,
  lote_id UUID REFERENCES public.lotes(id) ON DELETE SET NULL,
  localizacao_origem_id UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,
  localizacao_destino_id UUID REFERENCES public.localizacoes(id) ON DELETE SET NULL,
  quantidade DECIMAL(10,2) NOT NULL,
  documento TEXT,
  observacao TEXT,
  realizada_por UUID NOT NULL REFERENCES public.profiles(id),
  realizada_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  custo_unitario DECIMAL(10,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_movimentacoes_produto ON public.movimentacoes(produto_id);
CREATE INDEX idx_movimentacoes_realizada_em ON public.movimentacoes(realizada_em DESC);
CREATE INDEX idx_movimentacoes_tipo ON public.movimentacoes(tipo);
CREATE INDEX idx_estoque_produto ON public.estoque_localizacao(produto_id);
CREATE INDEX idx_estoque_localizacao ON public.estoque_localizacao(localizacao_id);
CREATE INDEX idx_lotes_produto ON public.lotes(produto_id);
CREATE INDEX idx_lotes_validade ON public.lotes(data_validade);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.almoxarifados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.localizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque_localizacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movimentacoes ENABLE ROW LEVEL SECURITY;

-- Função para verificar role do usuário
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies para profiles
CREATE POLICY "Usuários podem ver todos os perfis" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Usuários podem atualizar próprio perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Sistema pode inserir perfis" ON public.profiles FOR INSERT WITH CHECK (true);

-- RLS Policies para user_roles
CREATE POLICY "Admins e gestores podem ver roles" ON public.user_roles FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));
CREATE POLICY "Admins podem gerenciar roles" ON public.user_roles FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies para almoxarifados
CREATE POLICY "Todos podem ver almoxarifados" ON public.almoxarifados FOR SELECT USING (true);
CREATE POLICY "Admins e gestores podem gerenciar almoxarifados" ON public.almoxarifados FOR ALL 
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'gestor'));

-- RLS Policies para localizações
CREATE POLICY "Todos podem ver localizações" ON public.localizacoes FOR SELECT USING (true);
CREATE POLICY "Supervisores+ podem gerenciar localizações" ON public.localizacoes FOR ALL 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor')
  );

-- RLS Policies para produtos
CREATE POLICY "Todos podem ver produtos" ON public.produtos FOR SELECT USING (true);
CREATE POLICY "Supervisores+ podem gerenciar produtos" ON public.produtos FOR INSERT 
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor')
  );
CREATE POLICY "Supervisores+ podem atualizar produtos" ON public.produtos FOR UPDATE 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor')
  );

-- RLS Policies para lotes
CREATE POLICY "Todos podem ver lotes" ON public.lotes FOR SELECT USING (true);
CREATE POLICY "Conferentes+ podem gerenciar lotes" ON public.lotes FOR ALL 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor') OR
    public.has_role(auth.uid(), 'conferente')
  );

-- RLS Policies para estoque
CREATE POLICY "Todos podem ver estoque" ON public.estoque_localizacao FOR SELECT USING (true);
CREATE POLICY "Estoquistas+ podem gerenciar estoque" ON public.estoque_localizacao FOR ALL 
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor') OR
    public.has_role(auth.uid(), 'conferente') OR
    public.has_role(auth.uid(), 'estoquista')
  );

-- RLS Policies para movimentações
CREATE POLICY "Todos podem ver movimentações" ON public.movimentacoes FOR SELECT USING (true);
CREATE POLICY "Estoquistas+ podem registrar movimentações" ON public.movimentacoes FOR INSERT 
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'gestor') OR 
    public.has_role(auth.uid(), 'supervisor') OR
    public.has_role(auth.uid(), 'conferente') OR
    public.has_role(auth.uid(), 'estoquista')
  );

-- Trigger para criar perfil ao criar usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome_completo, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_almoxarifados_updated_at BEFORE UPDATE ON public.almoxarifados
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_localizacoes_updated_at BEFORE UPDATE ON public.localizacoes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_produtos_updated_at BEFORE UPDATE ON public.produtos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_lotes_updated_at BEFORE UPDATE ON public.lotes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_estoque_updated_at BEFORE UPDATE ON public.estoque_localizacao
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();