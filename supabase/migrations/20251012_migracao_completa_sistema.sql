-- =====================================================
-- SCRIPT DE MIGRAÇÃO COMPLETA PARA SUPABASE
-- Projeto: Armazém Vivo WMS
-- Data: 2024
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CRIAÇÃO DE TIPOS ENUM (com verificação)
-- =====================================================

-- Tipo para roles de usuário
DO $$ BEGIN
    CREATE TYPE app_role AS ENUM ('admin', 'operador', 'visualizador');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tipo para status de produto
DO $$ BEGIN
    CREATE TYPE produto_status AS ENUM ('ativo', 'inativo', 'bloqueado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tipo para status de lote
DO $$ BEGIN
    CREATE TYPE lote_status AS ENUM ('disponivel', 'reservado', 'bloqueado', 'vencido');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tipo para status de recebimento
DO $$ BEGIN
    CREATE TYPE recebimento_status AS ENUM ('pendente', 'em_andamento', 'concluido', 'cancelado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Tipo para tipo de movimentação
DO $$ BEGIN
    CREATE TYPE movimentacao_tipo AS ENUM ('entrada', 'saida', 'transferencia', 'ajuste', 'inventario');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- 2. CRIAÇÃO DE TABELAS (com verificação)
-- =====================================================

-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role app_role DEFAULT 'operador',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de roles de usuário (para controle granular)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    granted_by UUID REFERENCES profiles(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, role)
);

-- Tabela de almoxarifados
CREATE TABLE IF NOT EXISTS almoxarifados (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    endereco TEXT,
    responsavel_id UUID REFERENCES profiles(id),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de localizações
CREATE TABLE IF NOT EXISTS localizacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    almoxarifado_id UUID REFERENCES almoxarifados(id) ON DELETE CASCADE,
    codigo VARCHAR(50) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50), -- 'corredor', 'prateleira', 'gaveta', etc.
    capacidade_maxima INTEGER,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(almoxarifado_id, codigo)
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100),
    unidade_medida VARCHAR(20) DEFAULT 'UN',
    peso_unitario DECIMAL(10,3),
    dimensoes JSONB, -- {altura, largura, profundidade}
    valor_unitario DECIMAL(15,2),
    estoque_minimo INTEGER DEFAULT 0,
    estoque_maximo INTEGER,
    status produto_status DEFAULT 'ativo',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de lotes
CREATE TABLE IF NOT EXISTS lotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    numero_lote VARCHAR(100) NOT NULL,
    data_fabricacao DATE,
    data_validade DATE,
    quantidade_inicial INTEGER NOT NULL DEFAULT 0,
    quantidade_atual INTEGER NOT NULL DEFAULT 0,
    status lote_status DEFAULT 'disponivel',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(produto_id, numero_lote)
);

-- Tabela de estoque por localização
CREATE TABLE IF NOT EXISTS estoque_localizacao (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    lote_id UUID REFERENCES lotes(id) ON DELETE CASCADE,
    localizacao_id UUID REFERENCES localizacoes(id) ON DELETE CASCADE,
    quantidade INTEGER NOT NULL DEFAULT 0,
    data_ultima_movimentacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(produto_id, lote_id, localizacao_id)
);

-- Tabela de recebimentos
CREATE TABLE IF NOT EXISTS recebimentos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    numero_documento VARCHAR(100) UNIQUE NOT NULL,
    fornecedor VARCHAR(200),
    data_recebimento DATE NOT NULL,
    data_prevista DATE,
    status recebimento_status DEFAULT 'pendente',
    observacoes TEXT,
    usuario_id UUID REFERENCES profiles(id),
    almoxarifado_id UUID REFERENCES almoxarifados(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens de recebimento
CREATE TABLE IF NOT EXISTS recebimento_itens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recebimento_id UUID REFERENCES recebimentos(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    lote_id UUID REFERENCES lotes(id),
    quantidade_esperada INTEGER NOT NULL,
    quantidade_recebida INTEGER DEFAULT 0,
    valor_unitario DECIMAL(15,2),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de movimentações
CREATE TABLE IF NOT EXISTS movimentacoes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
    lote_id UUID REFERENCES lotes(id),
    localizacao_origem_id UUID REFERENCES localizacoes(id),
    localizacao_destino_id UUID REFERENCES localizacoes(id),
    tipo movimentacao_tipo NOT NULL,
    quantidade INTEGER NOT NULL,
    motivo TEXT,
    documento_referencia VARCHAR(100),
    usuario_id UUID REFERENCES profiles(id),
    data_movimentacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. CRIAÇÃO DE ÍNDICES (com verificação)
-- =====================================================

-- Índices para produtos
CREATE INDEX IF NOT EXISTS idx_produtos_sku ON produtos(sku);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_status ON produtos(status);

-- Índices para lotes
CREATE INDEX IF NOT EXISTS idx_lotes_produto_id ON lotes(produto_id);
CREATE INDEX IF NOT EXISTS idx_lotes_numero ON lotes(numero_lote);
CREATE INDEX IF NOT EXISTS idx_lotes_validade ON lotes(data_validade);

-- Índices para estoque
CREATE INDEX IF NOT EXISTS idx_estoque_produto_id ON estoque_localizacao(produto_id);
CREATE INDEX IF NOT EXISTS idx_estoque_localizacao_id ON estoque_localizacao(localizacao_id);
CREATE INDEX IF NOT EXISTS idx_estoque_lote_id ON estoque_localizacao(lote_id);

-- Índices para movimentações
CREATE INDEX IF NOT EXISTS idx_movimentacoes_produto_id ON movimentacoes(produto_id);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_data ON movimentacoes(data_movimentacao);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_tipo ON movimentacoes(tipo);

-- Índices para recebimentos
CREATE INDEX IF NOT EXISTS idx_recebimentos_data ON recebimentos(data_recebimento);
CREATE INDEX IF NOT EXISTS idx_recebimentos_status ON recebimentos(status);
CREATE INDEX IF NOT EXISTS idx_recebimentos_almoxarifado ON recebimentos(almoxarifado_id);

-- =====================================================
-- 4. POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS nas tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE almoxarifados ENABLE ROW LEVEL SECURITY;
ALTER TABLE localizacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque_localizacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE recebimentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE recebimento_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE movimentacoes ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (permitir acesso autenticado)
CREATE POLICY IF NOT EXISTS "Usuários podem ver próprio perfil" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Usuários podem atualizar próprio perfil" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Políticas para outras tabelas (acesso geral para usuários autenticados)
CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON almoxarifados
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON localizacoes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON produtos
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON lotes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON estoque_localizacao
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON recebimentos
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON recebimento_itens
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS "Acesso autenticado" ON movimentacoes
    FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 5. DADOS DE EXEMPLO
-- =====================================================

-- Inserir almoxarifado exemplo (se não existir)
INSERT INTO almoxarifados (id, nome, descricao, endereco, ativo)
SELECT 
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'Almoxarifado Central',
    'Almoxarifado principal da empresa',
    'Rua Principal, 123 - Centro',
    true
WHERE NOT EXISTS (
    SELECT 1 FROM almoxarifados WHERE nome = 'Almoxarifado Central'
);

-- Inserir localizações exemplo (se não existirem)
INSERT INTO localizacoes (id, almoxarifado_id, codigo, descricao, tipo, capacidade_maxima, ativo)
SELECT * FROM (VALUES
    ('550e8400-e29b-41d4-a716-446655440002'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'A01-01', 'Corredor A, Prateleira 1, Nível 1', 'prateleira', 100, true),
    ('550e8400-e29b-41d4-a716-446655440003'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'A01-02', 'Corredor A, Prateleira 1, Nível 2', 'prateleira', 100, true),
    ('550e8400-e29b-41d4-a716-446655440004'::uuid, '550e8400-e29b-41d4-a716-446655440001'::uuid, 'B01-01', 'Corredor B, Prateleira 1, Nível 1', 'prateleira', 150, true)
) AS v(id, almoxarifado_id, codigo, descricao, tipo, capacidade_maxima, ativo)
WHERE NOT EXISTS (
    SELECT 1 FROM localizacoes WHERE codigo = v.codigo AND almoxarifado_id = v.almoxarifado_id
);

-- Inserir produtos exemplo (se não existirem)
INSERT INTO produtos (id, sku, nome, descricao, categoria, unidade_medida, peso_unitario, valor_unitario, estoque_minimo, estoque_maximo, status)
SELECT * FROM (VALUES
    ('550e8400-e29b-41d4-a716-446655440005'::uuid, 'PROD001', 'Parafuso Phillips M6x20', 'Parafuso Phillips cabeça panela M6 x 20mm', 'Fixação', 'UN', 0.015, 0.25, 100, 1000, 'ativo'::produto_status),
    ('550e8400-e29b-41d4-a716-446655440006'::uuid, 'PROD002', 'Porca Sextavada M6', 'Porca sextavada zincada M6', 'Fixação', 'UN', 0.008, 0.15, 200, 2000, 'ativo'::produto_status),
    ('550e8400-e29b-41d4-a716-446655440007'::uuid, 'PROD003', 'Arruela Lisa M6', 'Arruela lisa zincada M6', 'Fixação', 'UN', 0.003, 0.05, 500, 5000, 'ativo'::produto_status)
) AS v(id, sku, nome, descricao, categoria, unidade_medida, peso_unitario, valor_unitario, estoque_minimo, estoque_maximo, status)
WHERE NOT EXISTS (
    SELECT 1 FROM produtos WHERE sku = v.sku
);

-- Inserir lotes exemplo (se não existirem)
INSERT INTO lotes (id, produto_id, numero_lote, data_fabricacao, data_validade, quantidade_inicial, quantidade_atual, status)
SELECT * FROM (VALUES
    ('550e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440005'::uuid, 'LOTE001-2024', '2024-01-15', '2026-01-15', 500, 500, 'disponivel'::lote_status),
    ('550e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440006'::uuid, 'LOTE002-2024', '2024-01-20', '2026-01-20', 1000, 1000, 'disponivel'::lote_status),
    ('550e8400-e29b-41d4-a716-44665544000a'::uuid, '550e8400-e29b-41d4-a716-446655440007'::uuid, 'LOTE003-2024', '2024-01-25', '2026-01-25', 2000, 2000, 'disponivel'::lote_status)
) AS v(id, produto_id, numero_lote, data_fabricacao, data_validade, quantidade_inicial, quantidade_atual, status)
WHERE NOT EXISTS (
    SELECT 1 FROM lotes WHERE numero_lote = v.numero_lote AND produto_id = v.produto_id
);

-- Inserir estoque por localização (se não existir)
INSERT INTO estoque_localizacao (produto_id, lote_id, localizacao_id, quantidade)
SELECT * FROM (VALUES
    ('550e8400-e29b-41d4-a716-446655440005'::uuid, '550e8400-e29b-41d4-a716-446655440008'::uuid, '550e8400-e29b-41d4-a716-446655440002'::uuid, 500),
    ('550e8400-e29b-41d4-a716-446655440006'::uuid, '550e8400-e29b-41d4-a716-446655440009'::uuid, '550e8400-e29b-41d4-a716-446655440003'::uuid, 1000),
    ('550e8400-e29b-41d4-a716-446655440007'::uuid, '550e8400-e29b-41d4-a716-44665544000a'::uuid, '550e8400-e29b-41d4-a716-446655440004'::uuid, 2000)
) AS v(produto_id, lote_id, localizacao_id, quantidade)
WHERE NOT EXISTS (
    SELECT 1 FROM estoque_localizacao 
    WHERE produto_id = v.produto_id AND lote_id = v.lote_id AND localizacao_id = v.localizacao_id
);

-- Inserir recebimento exemplo (se não existir)
INSERT INTO recebimentos (id, numero_documento, fornecedor, data_recebimento, data_prevista, status, observacoes)
SELECT 
    '550e8400-e29b-41d4-a716-44665544000b'::uuid,
    'REC-2024-001',
    'Fornecedor ABC Ltda',
    '2024-01-15',
    '2024-01-15',
    'concluido'::recebimento_status,
    'Recebimento inicial de estoque'
WHERE NOT EXISTS (
    SELECT 1 FROM recebimentos WHERE numero_documento = 'REC-2024-001'
);

-- =====================================================
-- SCRIPT EXECUTADO COM SUCESSO!
-- =====================================================

-- Verificar se tudo foi criado corretamente
SELECT 'Migração executada com sucesso!' as status,
       (SELECT COUNT(*) FROM produtos) as total_produtos,
       (SELECT COUNT(*) FROM almoxarifados) as total_almoxarifados,
       (SELECT COUNT(*) FROM localizacoes) as total_localizacoes,
       (SELECT COUNT(*) FROM lotes) as total_lotes;