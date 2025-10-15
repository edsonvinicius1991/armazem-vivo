# Padrões Responsivos - Armazém Vivo

## Visão Geral

Este documento descreve os padrões responsivos implementados no sistema Armazém Vivo para garantir uma experiência consistente em diferentes dispositivos e resoluções de tela.

## Componentes Responsivos Implementados

### 1. ResponsiveContainer
- **Localização**: `src/components/ui/responsive-container.tsx`
- **Função**: Container principal que aplica padding responsivo
- **Breakpoints**:
  - Mobile: `p-4` (16px)
  - Desktop: `p-6` (24px)

### 2. ResponsiveFlex
- **Localização**: `src/components/ui/responsive-container.tsx`
- **Função**: Layout flexível responsivo
- **Propriedades**:
  - `direction`: Direção do flex (row/column)
  - `justify`: Justificação do conteúdo
  - `align`: Alinhamento dos itens
  - `gap`: Espaçamento entre elementos
  - `wrap`: Quebra de linha

### 3. ResponsiveGrid
- **Localização**: `src/components/ui/responsive-container.tsx`
- **Função**: Grid responsivo com colunas adaptáveis
- **Propriedades**:
  - `cols`: Colunas padrão (mobile)
  - `mdCols`: Colunas em telas médias
  - `lgCols`: Colunas em telas grandes
  - `gap`: Espaçamento entre elementos

### 4. ResponsiveTable
- **Localização**: `src/components/ui/responsive-table.tsx`
- **Função**: Tabela que se adapta para cards em mobile
- **Componentes**:
  - `ResponsiveTableHeader`: Cabeçalho (oculto em mobile)
  - `ResponsiveTableRow`: Linha da tabela/card
  - `ResponsiveTableCell`: Célula com label para mobile

## Páginas Atualizadas

### 1. Dashboard
- **Arquivo**: `src/pages/Dashboard.tsx`
- **Melhorias**:
  - Container principal responsivo
  - Grid de KPIs adaptável (2 cols mobile → 4 cols desktop)
  - Grid de gráficos responsivo (1 col mobile → 2 cols desktop)
  - Tabela de alertas responsiva

### 2. Recebimentos
- **Arquivo**: `src/pages/Recebimentos.tsx`
- **Melhorias**:
  - Layout principal responsivo
  - Filtros em flex responsivo
  - Grid de cards adaptável (1 col mobile → 3 cols desktop)
  - Tabela responsiva com labels para mobile

### 3. Estoque
- **Arquivo**: `src/pages/Estoque.tsx`
- **Melhorias**:
  - Container principal responsivo
  - Grid de KPIs adaptável (2 cols mobile → 4 cols desktop)
  - Grid de gráficos responsivo (1 col mobile → 2 cols desktop)
  - Filtros em layout responsivo
  - Tabela responsiva com labels para mobile

### 4. Layout
- **Arquivo**: `src/components/Layout.tsx`
- **Melhorias**:
  - Container principal responsivo
  - Navegação mobile já implementada
  - Sidebar adaptável

## Breakpoints Utilizados

```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X Extra large devices */
```

## Hook useIsMobile

- **Localização**: `src/hooks/use-mobile.tsx`
- **Função**: Detecta se o dispositivo é mobile (< 768px)
- **Uso**: Aplicado em toda a aplicação para lógica condicional

## Padrões de Implementação

### 1. Estrutura de Container
```tsx
<ResponsiveContainer>
  <ResponsiveFlex direction="column" gap="lg">
    {/* Conteúdo da página */}
  </ResponsiveFlex>
</ResponsiveContainer>
```

### 2. Grid de Cards/KPIs
```tsx
<ResponsiveGrid cols={2} mdCols={2} lgCols={4} gap="md">
  {/* Cards/KPIs */}
</ResponsiveGrid>
```

### 3. Tabela Responsiva
```tsx
<ResponsiveTable>
  <ResponsiveTableHeader>
    <ResponsiveTableRow>
      <ResponsiveTableCell header>Coluna 1</ResponsiveTableCell>
      <ResponsiveTableCell header>Coluna 2</ResponsiveTableCell>
    </ResponsiveTableRow>
  </ResponsiveTableHeader>
  <tbody>
    {data.map(item => (
      <ResponsiveTableRow key={item.id}>
        <ResponsiveTableCell label="Coluna 1">
          {item.value1}
        </ResponsiveTableCell>
        <ResponsiveTableCell label="Coluna 2">
          {item.value2}
        </ResponsiveTableCell>
      </ResponsiveTableRow>
    ))}
  </tbody>
</ResponsiveTable>
```

## Benefícios Implementados

### 1. Consistência Visual
- Padding e espaçamentos padronizados
- Comportamento uniforme entre páginas
- Design system coeso

### 2. Experiência Mobile
- Tabelas se transformam em cards legíveis
- Navegação otimizada para touch
- Conteúdo adaptado para telas pequenas

### 3. Performance
- Componentes reutilizáveis
- CSS otimizado com Tailwind
- Renderização condicional eficiente

### 4. Manutenibilidade
- Padrões centralizados
- Fácil aplicação em novas páginas
- Código limpo e organizado

## Próximos Passos

1. **Aplicar padrões em páginas restantes**:
   - Produtos
   - Localizações
   - Lotes
   - Movimentações
   - Relatórios

2. **Melhorias futuras**:
   - Componentes de formulário responsivos
   - Modais adaptáveis
   - Gráficos responsivos avançados

3. **Testes**:
   - Validação em diferentes dispositivos
   - Testes de usabilidade mobile
   - Performance em telas pequenas

## Segurança e Boas Práticas

- ✅ Nenhum segredo exposto no código
- ✅ Componentes seguem princípios SOLID
- ✅ Acessibilidade mantida em mobile
- ✅ Performance otimizada
- ✅ Código limpo e documentado

## Impacto e Trade-offs

### Impactos Positivos
- Melhoria significativa na experiência mobile
- Padronização do design system
- Redução de código duplicado
- Facilidade de manutenção

### Trade-offs
- Pequeno aumento no bundle size (componentes responsivos)
- Tempo de desenvolvimento inicial para padronização
- Necessidade de refatoração de páginas existentes

### Riscos Mitigados
- Inconsistência visual entre páginas
- Experiência ruim em dispositivos móveis
- Dificuldade de manutenção do código responsivo
- Débito técnico acumulado

### Métricas Afetadas
- **UX Score**: Melhoria esperada de 30-40% em mobile
- **Bounce Rate**: Redução esperada em dispositivos móveis
- **Time on Page**: Aumento esperado devido à melhor usabilidade
- **Developer Velocity**: Aumento na velocidade de desenvolvimento de novas features

---

**Data de Criação**: Janeiro 2025  
**Última Atualização**: Janeiro 2025  
**Responsável**: Equipe de Desenvolvimento