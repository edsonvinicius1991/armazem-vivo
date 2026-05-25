# PRD - Armazém Vivo
## Product Requirements Document

### 1. Visão do Produto

O **Armazém Vivo** é uma aplicação web responsiva para operar e controlar processos de almoxarifado ponta a ponta, reduzindo erros, melhorando acurácia de estoque e aumentando produtividade operacional.

A solução consolida operações de recebimento, armazenagem, separação, packing, expedição, transferências e inventário, com relatórios e dashboards gerenciais para decisão rápida. A plataforma é complementada por um Assistente Inteligente (chatbot baseado em IA) que facilita as operações e a extração de dados através de linguagem natural.

Este PRD descreve o que construir, para quem e por que agora, garantindo alinhamento de valor e viabilidade em releases iterativas.

**Versão:** 2.0.0  
**Data:** Janeiro 2025  
**Status:** Em desenvolvimento ativo

### 2. Objetivos Estratégicos

#### 2.1 Objetivos Primários
- **Elevar acurácia de estoque** através de fluxos digitais e indicadores operacionais acionáveis
- **Reduzir lead time de pedidos** e diminuir rupturas por meio de processos padronizados
- **Aumentar o giro de estoque** e a produtividade de picking com visibilidade em tempo real
- **Prover governança** com auditoria por usuário e conformidade de processos críticos como FEFO para itens com validade

#### 2.2 Métricas de Sucesso
- **Acurácia de estoque:** ≥ 98%
- **Taxa de ruptura:** ≤ 2%
- **Giro de estoque:** Alinhado ao benchmark do segmento definido na implantação
- **Tempo de ciclo do pedido:** Redução de 20% após 90 dias
- **Produtividade de picking:** Aumento de 15% após 90 dias
- **Adoção:** ≥ 80% de usuários ativos semanais e ≥ 90% de ordens processadas sem intervenção manual

### 3. Personas e Usuários

#### 3.1 Estoquista
- **Perfil:** Executa recebimento, putaway, picking, packing e contagens
- **Foco:** Velocidade e usabilidade móvel
- **Necessidades:** Interface intuitiva, processos guiados, feedback visual imediato

#### 3.2 Conferente/Supervisor
- **Perfil:** Valida qualidade, resolve divergências e gerencia priorização
- **Foco:** Controle de qualidade e gestão de tarefas
- **Necessidades:** Ferramentas de validação, relatórios de divergências, contagens rotativas

#### 3.3 Gestor
- **Perfil:** Acompanha KPIs, capacidade, rupturas e cobertura
- **Foco:** Tomada de decisão tático-operacional
- **Necessidades:** Dashboards executivos, relatórios gerenciais, análises de tendências

### 4. Escopo MVP

#### 4.1 Incluído no MVP
- **Cadastro de produtos:** SKU, EAN/UPC, unidade, categoria, lote, validade, foto
- **Localizações endereçadas:** Múltiplos almoxarifados com hierarquia
- **Recebimento:** Por pedido, conferência, etiquetagem e putaway com regras FIFO/FEFO
- **Picking:** Por lista/onda, packing, expedição e emissão de documentos básicos
- **Inventário:** Rotativo e geral, ajustes controlados e trilha de auditoria
- **Relatórios operacionais:** Dashboard gerencial com KPIs críticos e exportação CSV/Excel

#### 4.2 Fora de Escopo Inicial
- Faturamento 3PL e tarifação logística avançada
- WMS com automações de MHE/ASRS
- Otimização de rotas de frota e TMS completo
- Algoritmos de slotting avançado e voice picking

### 5. Requisitos Funcionais Detalhados

#### 5.1 Gestão de Produtos
- **CRUD completo** com atributos técnicos
- **Múltiplos códigos de barras** e associação a lotes e validades
- **Campos obrigatórios:** SKU único, nome, categoria, unidade de medida
- **Campos opcionais:** EAN/UPC, dimensões, peso, custo, foto, descrição
- **Controle de status:** Ativo, inativo, bloqueado
- **Validações:** Impedir duplicação de SKU, validar códigos de barras

#### 5.2 Localizações e Endereçamento
- **Hierarquia:** Almoxarifado → Rua → Prateleira → Nível → Box
- **Endereçamento único** por localização com integridade referencial
- **Tipos de localização:** Picking, bulk, quarentena, expedição
- **Capacidade e status:** Controle de ocupação e disponibilidade
- **Validações:** Respeitar capacidade e tipo na sugestão de putaway

#### 5.3 Recebimento e Armazenagem
- **Recebimento por pedido** com conferência quantitativa/qualitativa
- **Registro de divergências** e etiquetagem automática
- **Putaway guiado** com regras FIFO/FEFO configuráveis
- **Sugestão de localização** por política e capacidade
- **Validações:** Localização existente, capacidade disponível

#### 5.4 Picking e Expedição
- **Picking por lista e por onda** com priorização
- **Gestão de substitutos** e registro de faltas/rupturas
- **Packing/Expedição:** Consolidação e impressão de etiquetas
- **Documentos básicos** e confirmação de embarque
- **Validações:** Bloquear picking de lotes vencidos, orientar FEFO

#### 5.5 Transferências e Movimentações
- **Transferências** entre localizações/almoxarifados
- **Autorizações** e rastreabilidade completa
- **Tipos:** Entrada, saída, transferência, ajuste, devolução
- **Auditoria:** Usuário, timestamp e motivo obrigatórios

#### 5.6 Inventário e Controle
- **Cycle counting** programado por curva ABC
- **Inventário geral** com reconciliação
- **Ajustes controlados** com motivos obrigatórios
- **Devoluções RMA** com inspeção e retorno ao estoque

#### 5.7 Assistente Inteligente de WMS (Antigravity WMS)
- **Chatbot Integrado:** Processamento de linguagem natural utilizando o modelo LLM Gemini.
- **Consultas em Tempo Real:** Permite consultar saldo de estoque, KPIs operacionais, alertas de lotes próximos ao vencimento e produtividade de picking.
- **Integração Segura:** O assistente acessa o banco PostgreSQL do Supabase via Edge Functions utilizando Function Calling para fornecer respostas precisas e baseadas em dados atualizados.

### 6. Regras de Negócio Críticas

#### 6.1 Controle de Estoque
- **Impedir saldo negativo** em qualquer localização e consolidado por SKU
- **Validar movimentações** antes de confirmar operações
- **Rastreabilidade completa** de todas as transações

#### 6.2 Gestão de Lotes
- **Bloquear picking/expedição** de lotes vencidos
- **Orientar FEFO** para produtos perecíveis
- **Controle de validade** com alertas preventivos

#### 6.3 Auditoria e Compliance
- **Registrar usuário, timestamp e motivo** em ajustes e contagens
- **Histórico completo** de transações para conformidade
- **Logs de auditoria** centralizados e imutáveis

### 7. Dashboards e KPIs

#### 7.1 KPIs Principais
- **Acurácia de estoque:** Percentual de precisão do inventário
- **Taxa de ruptura:** Percentual de produtos em falta
- **Giro de estoque:** Rotatividade dos produtos
- **OTIF/Fill rate:** Entregas no prazo e completas
- **Produtividade de picking:** Itens por hora/operador
- **Tempo de ciclo:** Tempo médio de processamento
- **Cobertura:** Dias de estoque disponível

#### 7.2 Princípios de Design
- **Clareza:** Informações objetivas e diretas
- **Hierarquia visual:** Destaque para métricas críticas
- **Foco nos objetivos:** Alinhamento com metas estratégicas
- **Carga cognitiva reduzida:** Poucos visuais por tela

#### 7.3 Práticas de UX
- **Destacar exceções/alertas** com cores e ícones
- **Responsividade total** para todos os dispositivos
- **Consistência tipográfica e cromática** em toda aplicação

### 8. Relatórios Operacionais

#### 8.1 Relatórios Diários
- **Recebimento pendente:** Pedidos aguardando conferência
- **Divergências:** Discrepâncias encontradas
- **Tarefas de picking:** Lista de separação pendente
- **Contagens programadas:** Inventários do dia

#### 8.2 Relatórios Gerenciais
- **Valor de estoque:** Consolidado por categoria/almoxarifado
- **Cobertura por família:** Análise de disponibilidade
- **Aging de lotes:** Produtos próximos ao vencimento
- **Rupturas por causa:** Análise de causas raiz

#### 8.3 Exportações
- **CSV/Excel** em todas as listagens
- **Filtros persistentes** para análise offline
- **Agendamento** de relatórios recorrentes

### 9. Modelagem de Dados

#### 9.1 Entidades Principais
- **Produto:** SKU, EAN/UPC, unidade, categoria, custo, dimensões
- **Localização:** Código, tipo, capacidade, status, hierarquia
- **Lote:** Número, validade, status, produto_id
- **Movimentação:** Tipo, quantidade, origem, destino, usuário, timestamp
- **Pedido/Ordem:** Número, status, tipo, data, observações
- **Inventário:** Data, tipo, status, responsável
- **Usuário:** Perfil, permissões, almoxarifado
- **Auditoria:** Ação, usuário, timestamp, dados_anteriores, dados_novos
- **Alerta:** Registro de alerta (vencimentos e estoque crítico) com criticidade e status de resolução.

#### 9.2 Relacionamentos Críticos
- **Produto ↔ Lote:** 1:N (um produto pode ter múltiplos lotes)
- **Localização ↔ Estoque:** 1:N (uma localização pode ter múltiplos produtos)
- **Movimentação ↔ Usuário:** N:1 (múltiplas movimentações por usuário)
- **Almoxarifado ↔ Localização:** 1:N (um almoxarifado tem múltiplas localizações)

#### 9.3 Views e Triggers Críticas
- **vw_estoque_consolidado:** View agregadora de estoque por produto, fornecendo quantidade total consolidada e indicador de status (CRÍTICO, BAIXO, EXCESSO, NORMAL).
- **vw_lotes_vencimento:** Lista todos os lotes calculando automaticamente dias restantes e status de vencimento (VENCIDO, VENCENDO_30_DIAS, etc.).
- **Triggers de Movimentação e Auditoria:** Ao criar uma `movimentacao`, os triggers atualizam imediatamente as tabelas de `estoque_localizacao` (garantindo atomicidade) e gravam as diferenças em `historico_estoque`.
- **Triggers de Alerta:** Avaliam regras de ponto de reposição em tempo real, disparando ou resolvendo registros na tabela `alertas_estoque`.

### 10. Fluxos Principais

#### 10.1 Inbound (Entrada)
1. **Pedido de compra** → Criação no sistema
2. **Recebimento/conferência** → Validação quantitativa/qualitativa
3. **Etiquetagem** → Geração de códigos de rastreamento
4. **Putaway guiado** → Sugestão de localização otimizada

#### 10.2 Operação Interna
1. **Reabastecimento interno** → Quando mínimos de picking são atingidos
2. **Transferências** → Entre localizações conforme política
3. **Contagens cíclicas** → Programadas por curva ABC
4. **Ajustes** → Correções com justificativa obrigatória

#### 10.3 Outbound (Saída)
1. **Geração de listas/ondas** → Otimização de rotas de picking
2. **Picking** → Separação guiada com validação
3. **Packing** → Consolidação e embalagem
4. **Expedição** → Confirmação e documentos de saída

#### 10.4 Inventário
1. **Agendamento** → Contagens cíclicas por política
2. **Execução** → Contagem física com dispositivos móveis
3. **Reconciliação** → Comparação com sistema
4. **Ajustes** → Correções aprovadas com auditoria

#### 10.5 Consulta de Dados Natural com Inteligência Artificial
1. **Pergunta:** Usuário abre o assistente na interface e pergunta em linguagem natural (ex: "Qual o giro de estoque da categoria Fixação?").
2. **Processamento (Edge Function):** A solicitação passa pela função `chat`, que conecta-se à API Gemini e avalia o contexto.
3. **Execução de Tool:** A LLM decide invocar as ferramentas analíticas cadastradas (`get_kpi_metrics`, `get_stock_summary`, etc), as quais buscam dados estruturados do banco de forma segura.
4. **Devolução do Relatório:** A resposta estruturada é entregue ao chat em formato Markdown (com tabelas de dados) instantaneamente.

### 11. Requisitos Não-Funcionais

#### 11.1 Performance
- **Responsividade mobile-first** para operações em campo
- **Tempo de resposta sub-segundo** em consultas críticas
- **Escalabilidade horizontal** no backend
- **Paginação/filtragem** em todas as listas

#### 11.2 Disponibilidade
- **Uptime ≥ 99,5%** para operações críticas
- **Logs/auditoria centralizados** para suporte
- **Backup automático** com retenção configurável
- **Recuperação de desastres** em até 4 horas

#### 11.3 Observabilidade
- **Métricas de saúde** do sistema em tempo real
- **Tracing de chamadas** para diagnósticos
- **Alertas proativos** para problemas críticos
- **Dashboards técnicos** para monitoramento

### 12. Segurança e Acesso

#### 12.1 Autenticação e Autorização
- **Autenticação obrigatória** via Supabase Auth
- **RBAC por perfil** e escopo por almoxarifado
- **Permissões granulares** para operações sensíveis
- **Sessões seguras** com timeout configurável

#### 12.2 Auditoria e Compliance
- **Auditoria obrigatória** de cada transação
- **Logs imutáveis** com usuário, data/hora e origem
- **Rastreabilidade completa** de alterações
- **Relatórios de compliance** para auditorias externas

### 13. Arquitetura Técnica

#### 13.1 Stack Tecnológico
- **Frontend:** React 18.3.1 + TypeScript + Vite
- **UI/UX:** Tailwind CSS + Radix UI + shadcn/ui
- **Backend/Database:** Supabase (PostgreSQL + Auth + Realtime)
- **Funções Serverless:** Supabase Edge Functions (Deno) hospedando a lógica de backend isolada (ex: Chatbot).
- **Inteligência Artificial:** Integração via Google Gemini API nativa com Function Calling e Agentic Workflow.
- **State Management:** TanStack React Query
- **Forms:** React Hook Form + Zod

#### 13.2 Padrões de Desenvolvimento
- **Mobile-first:** Design responsivo prioritário
- **TypeScript:** Tipagem forte para contratos estáveis
- **Trunk-based development:** Commits pequenos e integrações frequentes
- **Clean Architecture:** Separação de responsabilidades

### 14. Roadmap de Desenvolvimento

#### 14.1 Fase 1 - Fundação (Concluída)
- ✅ Estrutura base da aplicação
- ✅ Sistema de autenticação
- ✅ Dashboard básico
- ✅ Visualização de produtos e localizações
- ✅ Estrutura de movimentações

#### 14.2 Fase 2 - Operações Básicas (Em Desenvolvimento)
- 🔄 CRUD completo de produtos
- 🔄 CRUD completo de localizações
- 🔄 Sistema de movimentações funcional
- 🔄 Controle básico de estoque
- 🔄 Relatórios operacionais

#### 14.3 Fase 3 - Operações Avançadas (Próxima)
- 📋 Controle de lotes e validades
- 📋 Recebimento com conferência
- 📋 Picking guiado
- 📋 Inventário rotativo
- 📋 Auditoria completa

#### 14.4 Fase 4 - Otimizações (Futura)
- 📋 Dashboard avançado com gráficos
- 📋 Exportação de relatórios
- 📋 Notificações em tempo real
- 📋 Aplicativo móvel nativo

### 15. Critérios de Aceite

#### 15.1 Funcionalidades
- [ ] Todos os CRUDs funcionais com validações
- [ ] Fluxos de movimentação completos
- [ ] Relatórios gerados corretamente
- [ ] Auditoria registrando todas as ações

#### 15.2 Performance
- [ ] Carregamento inicial < 3 segundos
- [ ] Operações CRUD < 1 segundo
- [ ] Relatórios gerados < 5 segundos

#### 15.3 Segurança
- [ ] Autenticação obrigatória funcionando
- [ ] Controle de acesso por perfil
- [ ] Logs de auditoria completos
- [ ] Validações de entrada implementadas

#### 15.4 Usabilidade
- [ ] Interface responsiva em todos os dispositivos
- [ ] Navegação intuitiva e consistente
- [ ] Feedback visual para todas as ações
- [ ] Tratamento de erros amigável

### 16. Riscos e Mitigações

#### 16.1 Riscos Técnicos
- **Performance com grande volume:** Implementar paginação e índices otimizados
- **Falhas de integração:** Implementar fallbacks e tratamento de erros robusto
- **Complexidade de regras de negócio:** Documentação detalhada e testes abrangentes

#### 16.2 Riscos de Negócio
- **Resistência à mudança:** Treinamento e interface intuitiva
- **Requisitos em evolução:** Desenvolvimento iterativo e feedback constante
- **Prazo de entrega:** Priorização clara e MVP bem definido

### 17. Conclusão

O Armazém Vivo representa uma solução moderna e abrangente para gestão de almoxarifados, combinando as melhores práticas de WMS com tecnologias atuais. O sistema está estruturado para crescer incrementalmente, entregando valor desde as primeiras funcionalidades até se tornar uma plataforma completa de gestão operacional.

A abordagem iterativa garante que cada release agregue valor tangível aos usuários, enquanto a arquitetura técnica sólida permite escalabilidade e manutenibilidade a longo prazo.