# Dados de Exemplo - Armazém Vivo

Este documento descreve os dados de exemplo criados para validar e testar as funcionalidades do sistema Armazém Vivo.

## 📋 Resumo dos Dados Inseridos

### 🏭 **Produtos (10 itens)**
- **PROD001**: Parafuso Phillips M6x20 (Fixação)
- **PROD002**: Tinta Acrílica Branca 18L (Tintas) - *controla lote e validade*
- **PROD003**: Cabo Elétrico 2,5mm² 100m (Elétrica)
- **PROD004**: Cimento Portland CP-II 50kg (Construção) - *controla lote e validade*
- **PROD005**: Tubo PVC 100mm 6m (Hidráulica)
- **PROD006**: Broca HSS 8mm (Ferramentas)
- **PROD007**: Lixa d'Água Grão 220 (Abrasivos)
- **PROD008**: Adesivo PVC 175g (Químicos) - *controla lote e validade*
- **PROD009**: Chave Philips Nº2 (Ferramentas)
- **PROD010**: Fita Isolante 19mm (Elétrica)

### 🏢 **Almoxarifados (3 unidades)**
- **ALM001**: Almoxarifado Central (120 localizações)
- **ALM002**: Depósito Norte (72 localizações)
- **ALM003**: Armazém Sul

### 📍 **Localizações**
- **Almoxarifado Central**: 5 ruas × 4 prateleiras × 3 níveis × 2 boxes = 120 localizações
- **Depósito Norte**: 3 ruas × 3 prateleiras × 2 níveis × 2 boxes = 72 localizações
- Tipos: picking, bulk, quarentena

### 📦 **Lotes (4 lotes)**
- **LT2024001**: Tinta Acrílica (ativo, 85/100 unidades)
- **LT2024002**: Cimento Portland (ativo, 450/500 unidades)
- **LT2024003**: Adesivo PVC (ativo, 180/200 unidades)
- **LT2024004**: Tinta Acrílica (bloqueado, defeito de fabricação)

### 📥 **Recebimentos (4 documentos)**
- **REC2024001**: Finalizado (Fornecedor ABC Ltda)
- **REC2024002**: Finalizado (Distribuidora XYZ)
- **REC2024003**: Pendente (Indústria 123 S.A.)
- **REC2024004**: Em conferência (Fornecedor DEF)

### 📊 **Movimentações**
- **Entradas**: Recebimentos de produtos
- **Saídas**: Saídas para obras
- **Transferências**: Entre localizações
- **Ajustes**: Positivos e negativos

## 🚀 Como Executar os Dados de Exemplo

### Opção 1: Supabase Cloud
1. Acesse [Supabase Dashboard](https://supabase.com)
2. Vá para seu projeto > **SQL Editor**
3. Abra o arquivo `dados_exemplo.sql`
4. Cole o conteúdo e execute

### Opção 2: Supabase Local
```bash
# Iniciar Supabase local
npx supabase start

# Resetar banco (opcional - limpa dados existentes)
npx supabase db reset

# Executar script de dados
psql -h localhost -p 54322 -U postgres -d postgres -f dados_exemplo.sql
```

### Opção 3: PostgreSQL Direto
```bash
psql -h [host] -p [porta] -U [usuario] -d [database] -f dados_exemplo.sql
```

## 🧪 Casos de Uso Testáveis

### ✅ **Gestão de Produtos**
- Produtos com diferentes categorias e unidades
- Controle de lote ativo/inativo
- Controle de validade
- Status de produto (ativo/bloqueado)

### ✅ **Gestão de Estoque**
- Estoque distribuído em múltiplas localizações
- Diferentes tipos de localização
- Capacidades máximas por localização

### ✅ **Controle de Lotes**
- Lotes ativos e bloqueados
- Rastreabilidade por data de fabricação/validade
- Motivos de bloqueio

### ✅ **Recebimentos**
- Diferentes status de recebimento
- Itens com e sem lote
- Localizações sugeridas vs confirmadas

### ✅ **Movimentações**
- Todos os tipos: entrada, saída, transferência, ajuste
- Rastreabilidade completa
- Documentação de movimentações

### ✅ **Relatórios e Dashboards**
- Dados suficientes para gráficos
- Métricas de estoque
- Histórico de movimentações

## 📈 Validação das Funcionalidades

Após executar os dados de exemplo, você pode validar:

1. **Dashboard**: Visualizar métricas e gráficos
2. **Produtos**: Listar, filtrar e editar produtos
3. **Localizações**: Navegar pela estrutura de armazéns
4. **Lotes**: Verificar controle de lotes e validades
5. **Recebimentos**: Processar recebimentos pendentes
6. **Movimentações**: Consultar histórico completo
7. **Relatórios**: Gerar relatórios com dados reais

## 🔍 Consultas Úteis para Validação

```sql
-- Verificar produtos inseridos
SELECT COUNT(*) as total_produtos FROM produtos;

-- Verificar estoque por localização
SELECT p.nome, l.codigo, el.quantidade 
FROM estoque_localizacao el
JOIN produtos p ON p.id = el.produto_id
JOIN localizacoes l ON l.id = el.localizacao_id
ORDER BY p.nome;

-- Verificar movimentações por tipo
SELECT tipo, COUNT(*) as quantidade
FROM movimentacoes
GROUP BY tipo;

-- Verificar recebimentos por status
SELECT status, COUNT(*) as quantidade
FROM recebimentos
GROUP BY status;
```

## 🎯 Próximos Passos

1. Execute o script `dados_exemplo.sql`
2. Inicie a aplicação: `npm run dev`
3. Navegue pelas diferentes telas
4. Teste as funcionalidades com os dados inseridos
5. Valide se todos os módulos estão funcionando corretamente

Os dados de exemplo foram criados para cobrir todos os cenários principais do sistema, permitindo uma validação completa das funcionalidades implementadas! 🚀