# Armazém Vivo - Sistema de Gestão de Armazém (WMS)

Um sistema completo de gestão de armazém desenvolvido com React, TypeScript e Supabase.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Métricas em tempo real do armazém
- **Gestão de Produtos**: Cadastro completo com controle de estoque
- **Gestão de Localizações**: Organização hierárquica do armazém
- **Controle de Movimentações**: Entrada, saída, transferência e ajustes
- **Sistema de Relatórios**: Análises detalhadas de operações
- **Controle de Acesso**: Sistema de roles e permissões
- **Controle de Lotes**: Rastreabilidade completa

## 🛠️ Tecnologias

### Frontend
- **React 18.3.1** com TypeScript
- **Vite 5.4.19** - Build tool
- **Tailwind CSS 3.4.17** - Styling
- **shadcn/ui** - Componentes UI
- **React Router DOM** - Roteamento
- **TanStack React Query** - State management
- **React Hook Form + Zod** - Formulários e validação

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados
- **Row Level Security (RLS)** - Segurança

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd armazem-vivo
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo .env.example para .env
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_PROJECT_ID="seu-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-publishable-key"
VITE_SUPABASE_URL="https://seu-project-id.supabase.co"
```

4. **Execute as migrações do banco de dados**
```bash
# Se estiver usando Supabase CLI
supabase db push

# Ou execute manualmente o arquivo SQL no painel do Supabase
# supabase/migrations/20251011055216_b1c75494-265a-4fba-9e44-e7a52c416a3b.sql
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:8080`

### Build para produção
```bash
npm run build
```

### Preview da build
```bash
npm run preview
```

## 🌐 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### Configuração Inicial

1. **Faça push do código para o GitHub**
```bash
git add .
git commit -m "Configuração inicial para GitHub Pages"
git push origin main
```

2. **Configure as variáveis de ambiente no GitHub**
   - Vá para Settings > Secrets and variables > Actions
   - Adicione as seguintes secrets:
     - `VITE_SUPABASE_PROJECT_ID`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_URL`

3. **Habilite GitHub Pages**
   - Vá para Settings > Pages
   - Source: GitHub Actions
   - O deploy será automático a cada push na branch main

4. **Ajuste o base path no vite.config.ts**
   - Certifique-se de que o `base` está configurado com o nome correto do repositório
   - Exemplo: `base: '/nome-do-seu-repositorio/'`

### URL de Acesso
Após o deploy, a aplicação estará disponível em:
`https://seu-usuario.github.io/nome-do-repositorio/`

## 📊 Estrutura do Banco de Dados

### Principais Tabelas
- `profiles` - Perfis de usuário
- `user_roles` - Roles e permissões
- `almoxarifados` - Almoxarifados
- `localizacoes` - Localizações físicas
- `produtos` - Catálogo de produtos
- `lotes` - Controle de lotes
- `estoque_localizacao` - Estoque por localização
- `movimentacoes` - Histórico de movimentações

### Tipos de Usuário
- **Admin**: Acesso total ao sistema
- **Gestor**: Gestão de almoxarifados e relatórios
- **Supervisor**: Gestão de produtos e localizações
- **Conferente**: Gestão de lotes e estoque
- **Estoquista**: Operações básicas de movimentação

## 🔐 Autenticação

O sistema utiliza Supabase Auth para autenticação. Para criar o primeiro usuário administrador:

1. Acesse o painel do Supabase
2. Vá em Authentication > Users
3. Crie um novo usuário
4. Execute o SQL para adicionar role de admin:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-do-usuario', 'admin');
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── Layout.tsx      # Layout principal
│   └── StatCard.tsx    # Card de estatísticas
├── pages/              # Páginas da aplicação
│   ├── Auth.tsx        # Página de login
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Produtos.tsx    # Gestão de produtos
│   ├── Localizacoes.tsx # Gestão de localizações
│   ├── Movimentacoes.tsx # Gestão de movimentações
│   └── Relatorios.tsx  # Relatórios
├── integrations/       # Integrações externas
│   └── supabase/       # Configuração do Supabase
├── hooks/              # Hooks customizados
├── lib/                # Utilitários
└── main.tsx           # Ponto de entrada
```

## 🎯 Roadmap

### ✅ Fase 1 - MVP (Atual)
- Estrutura base da aplicação
- Sistema de autenticação
- Dashboard básico
- Visualização de produtos e localizações

### 🔄 Fase 2 - Funcionalidades Completas
- CRUD completo de produtos
- CRUD completo de localizações
- Sistema de movimentações funcional
- Controle de lotes
- Relatórios interativos

### 📈 Fase 3 - Otimizações
- Dashboard avançado com gráficos
- Exportação de relatórios
- Notificações em tempo real
- Mobile app

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para otimizar operações de armazém**
