# 🚀 Guia de Migração para Supabase

## 📋 Informações do Projeto

- **Project ID**: `jonwzrzciznkemfiviyk`
- **URL**: `https://jonwzrzciznkemfiviyk.supabase.co`
- **Dashboard**: [https://supabase.com/dashboard/project/jonwzrzciznkemfiviyk](https://supabase.com/dashboard/project/jonwzrzciznkemfiviyk)

## 🎯 Objetivo

Migrar completamente a base de dados do sistema Armazém Vivo para o Supabase, garantindo:
- ✅ Integridade dos dados
- ✅ Compatibilidade com a aplicação
- ✅ Segurança (RLS configurado)
- ✅ Performance otimizada

## 📝 Passos da Migração

### 1. Executar o Script de Migração

1. **Acesse o painel do Supabase**:
   - URL: https://supabase.com/dashboard/project/jonwzrzciznkemfiviyk
   - Faça login com sua conta

2. **Navegue para o SQL Editor**:
   - No menu lateral, clique em "SQL Editor"
   - Clique em "New query"

3. **Execute o script de migração**:
   - Abra o arquivo `migracao_completa_supabase.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor do Supabase
   - Clique em "Run" para executar

### 2. Verificar a Migração

Após executar o script, verifique se foram criadas as seguintes tabelas:

#### 📊 Tabelas Principais
- `profiles` - Perfis de usuário
- `user_roles` - Roles dos usuários
- `almoxarifados` - Almoxarifados/depósitos
- `localizacoes` - Localizações dentro dos almoxarifados
- `produtos` - Catálogo de produtos
- `lotes` - Controle de lotes
- `estoque_localizacao` - Estoque por localização
- `recebimentos` - Recebimentos de mercadorias
- `recebimento_itens` - Itens dos recebimentos
- `movimentacoes` - Histórico de movimentações

#### 🔧 Tipos Enum Criados
- `app_role` - Roles de usuário (admin, operador, visualizador)
- `tipo_movimentacao` - Tipos de movimentação (entrada, saida, transferencia, ajuste)
- `status_produto` - Status do produto (ativo, inativo, descontinuado)
- `tipo_localizacao` - Tipos de localização (picking, bulk, quarentena)
- `status_recebimento` - Status de recebimento (pendente, em_conferencia, finalizado, cancelado)

### 3. Configurar Autenticação

1. **Habilitar provedores de autenticação**:
   - Vá para "Authentication" > "Providers"
   - Habilite "Email" (já deve estar habilitado)
   - Configure outros provedores se necessário (Google, GitHub, etc.)

2. **Configurar políticas de senha**:
   - Vá para "Authentication" > "Settings"
   - Configure requisitos de senha conforme necessário

### 4. Testar a Aplicação

1. **Reiniciar o servidor de desenvolvimento**:
   ```bash
   # Se estiver rodando, pare com Ctrl+C
   npm run dev
   ```

2. **Verificar conectividade**:
   - Acesse http://localhost:8081
   - Teste o login/cadastro
   - Verifique se os dados aparecem corretamente

### 5. Dados de Exemplo Incluídos

O script de migração já inclui dados de exemplo:

#### 📦 Produtos (10 itens)
- PROD001: Parafuso Phillips M6x20
- PROD002: Tinta Acrílica Branca 18L (com controle de lote)
- PROD003: Cabo Elétrico 2,5mm² 100m
- PROD004: Cimento Portland CP-II 50kg (com controle de lote)
- PROD005: Tubo PVC 100mm 6m
- PROD006: Broca HSS 8mm
- PROD007: Lixa d'Água Grão 220
- PROD008: Adesivo PVC 175g (com controle de lote)
- PROD009: Chave Philips Nº2
- PROD010: Fita Isolante 19mm

#### 🏢 Almoxarifados (3 unidades)
- ALM001: Almoxarifado Central
- ALM002: Depósito Norte
- ALM003: Armazém Sul

#### 📍 Localizações
- 24 localizações no Almoxarifado Central
- Estrutura: Rua > Prateleira > Nível > Box
- Tipos: picking, bulk, quarentena

#### 📋 Lotes e Recebimentos
- 3 lotes para produtos que controlam lote
- 3 recebimentos de exemplo em diferentes status

## 🔒 Segurança Configurada

### Row Level Security (RLS)
- ✅ Habilitado em todas as tabelas
- ✅ Políticas básicas configuradas
- ✅ Acesso restrito a usuários autenticados

### Políticas Implementadas
- Usuários podem ver/editar seus próprios perfis
- Usuários autenticados têm acesso às tabelas operacionais
- Estrutura preparada para refinamento de permissões

## 🚨 Próximos Passos Recomendados

### 1. Configuração de Produção
- [ ] Configurar backup automático
- [ ] Configurar monitoramento
- [ ] Revisar políticas RLS para ambiente de produção

### 2. Otimizações
- [ ] Analisar performance das consultas
- [ ] Adicionar índices específicos se necessário
- [ ] Configurar cache se aplicável

### 3. Dados Adicionais
- [ ] Importar dados reais se existirem
- [ ] Configurar usuários administrativos
- [ ] Personalizar dados de exemplo conforme necessário

## 🆘 Solução de Problemas

### Erro de Conexão
1. Verifique se as variáveis no `.env` estão corretas
2. Confirme se o projeto está ativo no Supabase
3. Verifique se a chave de API está válida

### Erro de Permissão
1. Verifique se RLS está configurado corretamente
2. Confirme se o usuário está autenticado
3. Revise as políticas de acesso

### Dados Não Aparecem
1. Confirme se o script foi executado completamente
2. Verifique se há erros no console do navegador
3. Teste as consultas diretamente no SQL Editor

## 📞 Suporte

- **Documentação Supabase**: https://supabase.com/docs
- **Dashboard do Projeto**: https://supabase.com/dashboard/project/jonwzrzciznkemfiviyk
- **SQL Editor**: https://supabase.com/dashboard/project/jonwzrzciznkemfiviyk/sql

---

## ✅ Checklist de Migração

- [ ] Script de migração executado com sucesso
- [ ] Todas as tabelas criadas
- [ ] Dados de exemplo inseridos
- [ ] Aplicação conectando corretamente
- [ ] Autenticação funcionando
- [ ] Funcionalidades básicas testadas
- [ ] RLS configurado e testado

**Status da Migração**: 🟡 Pronto para execução