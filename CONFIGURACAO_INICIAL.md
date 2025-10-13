# 🚀 Configuração Inicial do Sistema Armazém Vivo

## Problema: Página de Estoque em Branco

Se a página de estoque está aparecendo em branco, siga este guia para configurar o sistema corretamente.

## 📋 Pré-requisitos

1. **Conta no Supabase**: Crie uma conta gratuita em [supabase.com](https://supabase.com)
2. **Node.js**: Versão 18 ou superior
3. **Git**: Para clonar o repositório

## 🔧 Passo a Passo

### 1. Configurar o Supabase

1. Acesse [supabase.com/dashboard](https://supabase.com/dashboard)
2. Clique em "New Project"
3. Escolha uma organização e dê um nome ao projeto
4. Defina uma senha para o banco de dados
5. Selecione uma região próxima
6. Aguarde a criação do projeto (2-3 minutos)

### 2. Obter as Credenciais

1. No dashboard do seu projeto, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL** (algo como: `https://xxxxx.supabase.co`)
   - **anon public key** (chave pública)

### 3. Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env`:

```bash
# Copie o arquivo .env.example
cp .env.example .env
```

2. Edite o arquivo `.env` com suas credenciais:

```env
VITE_SUPABASE_URL=https://seu-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_aqui
```

### 4. Executar as Migrações

Execute as migrações para criar as tabelas no banco:

```bash
# Instalar dependências se ainda não fez
npm install

# Executar migrações (se usando Supabase CLI)
npx supabase db push

# OU executar manualmente no SQL Editor do Supabase
# Copie e execute o conteúdo dos arquivos em supabase/migrations/
```

### 5. Inserir Dados de Exemplo

Execute o script para inserir dados fictícios:

```bash
# Instalar dotenv se necessário
npm install dotenv

# Executar script de dados de exemplo
node insert-sample-data.js
```

### 6. Reiniciar o Servidor

```bash
# Parar o servidor (Ctrl+C)
# Reiniciar
npm run dev
```

## 🔍 Verificação

Após seguir os passos:

1. Acesse `http://localhost:8080`
2. Faça login (ou crie uma conta)
3. Navegue para a página de **Estoque**
4. Você deve ver produtos listados

## 🐛 Solução de Problemas

### Erro de Conexão
- Verifique se as credenciais no `.env` estão corretas
- Confirme se o projeto Supabase está ativo
- Teste a conexão no SQL Editor do Supabase

### Página Ainda em Branco
- Abra o console do navegador (F12)
- Procure por erros JavaScript
- Verifique se as migrações foram executadas
- Confirme se há dados nas tabelas

### Erro de Autenticação
- Verifique se o RLS (Row Level Security) está configurado
- Confirme se as políticas de acesso estão corretas

## 📞 Suporte

Se ainda tiver problemas:

1. Verifique os logs no console do navegador
2. Verifique os logs do servidor no terminal
3. Consulte a documentação do Supabase
4. Abra uma issue no repositório

## 🎯 Próximos Passos

Após configurar o sistema:

1. Explore as funcionalidades do WMS
2. Customize os dados conforme sua necessidade
3. Configure usuários e permissões
4. Implemente integrações específicas

---

**Nota**: Este sistema é um WMS (Warehouse Management System) completo com funcionalidades de controle de estoque, movimentações, recebimentos e relatórios.