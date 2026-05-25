// Declaração das ferramentas analíticas e operacionais do WMS para o Gemini
export const warehouseTools = [
  {
    functionDeclarations: [
      // ─── LISTAGEM COMPLETA DE PRODUTOS ───────────────────────────
      {
        name: "list_all_products",
        description:
          "Lista todos os produtos cadastrados no sistema. Use quando o usuário pedir 'liste os produtos', 'quais produtos existem', 'mostrar todos os produtos' ou qualquer variação. Não requer parâmetros.",
        parameters: {
          type: "OBJECT",
          properties: {
            categoria: {
              type: "STRING",
              description: "Opcional: filtra por categoria específica.",
            },
            status: {
              type: "STRING",
              description: "Opcional: filtra por status do produto (ativo/inativo).",
            },
          },
        },
      },

      // ─── BUSCA DE PRODUTO ────────────────────────────────────────
      {
        name: "search_products",
        description:
          "Busca produtos pelo nome parcial ou SKU exato. USE ESTA FERRAMENTA PRIMEIRO quando o usuário mencionar o nome de um produto (ex: 'parafuso M6') para descobrir o SKU/ID antes de consultar o estoque. Retorna lista de produtos correspondentes com id, sku, nome, categoria e estoque mínimo.",
        parameters: {
          type: "OBJECT",
          properties: {
            nome: {
              type: "STRING",
              description:
                "Nome parcial do produto para busca (ex: 'parafuso M6', 'caixa papelão'). Use quando o usuário mencionar nome, não SKU.",
            },
            sku: {
              type: "STRING",
              description:
                "Código SKU exato do produto (ex: PROD001). Use quando o usuário informar o SKU diretamente.",
            },
          },
        },
      },

      // ─── ESTOQUE DE PRODUTO ESPECÍFICO ──────────────────────────
      {
        name: "get_product_stock",
        description:
          "Retorna o saldo de estoque detalhado de um produto específico por localização. É a ferramenta preferencial para perguntas como 'Quanto temos do produto X?' quando o SKU ou ID já é conhecido. Inclui timestamp da consulta.",
        parameters: {
          type: "OBJECT",
          properties: {
            produto_id: {
              type: "STRING",
              description:
                "ID interno do produto (UUID). Use quando obtido via search_products.",
            },
            sku: {
              type: "STRING",
              description:
                "Código SKU do produto (ex: PROD001). Use quando o usuário informar o SKU diretamente.",
            },
          },
        },
      },

      // ─── VISÃO GERAL DE ESTOQUE ──────────────────────────────────
      {
        name: "get_stock_summary",
        description:
          "Retorna o saldo de estoque consolidado por produto. Use para visão geral de todo o estoque ou quando filtrar por categoria, almoxarifado ou status (zerado/abaixo do mínimo). EVITE usar sem filtros quando o usuário pedir um produto específico — prefira get_product_stock nesse caso. Resultado limitado a 200 produtos.",
        parameters: {
          type: "OBJECT",
          properties: {
            sku: {
              type: "STRING",
              description: "Código SKU do produto para filtrar (ex: PROD001).",
            },
            category: {
              type: "STRING",
              description: "Categoria de produtos para filtrar (ex: Fixação).",
            },
            warehouse_id: {
              type: "STRING",
              description: "ID do almoxarifado específico.",
            },
            filter: {
              type: "STRING",
              description:
                "Filtro de status: 'zero_stock' para produtos esgotados, ou 'below_minimum' para produtos abaixo do estoque mínimo.",
              enum: ["zero_stock", "below_minimum"],
            },
          },
        },
      },

      // ─── KPIs OPERACIONAIS ───────────────────────────────────────
      {
        name: "get_kpi_metrics",
        description:
          "Calcula e retorna os principais indicadores de desempenho (KPIs) operacionais do armazém como acurácia, taxa de ruptura, giro de estoque, cobertura e produtividade de picking.",
        parameters: {
          type: "OBJECT",
          properties: {
            period: {
              type: "STRING",
              description:
                "Período de análise para cálculo dos KPIs. Padrão: 'month'.",
              enum: ["today", "week", "month", "quarter"],
            },
            category: {
              type: "STRING",
              description: "Categoria de produtos para filtrar a análise.",
            },
            metric: {
              type: "STRING",
              description:
                "Retorna uma métrica específica ou 'all' para todas.",
              enum: [
                "all",
                "accuracy",
                "ruptura",
                "turnover",
                "coverage",
                "picking_productivity",
              ],
            },
          },
        },
      },

      // ─── ALERTAS DE VALIDADE DE LOTES ────────────────────────────
      {
        name: "get_lot_expiry_alerts",
        description:
          "Busca e retorna alertas de vencimento de lotes dentro de um período em dias. Mostra quais lotes estão vencidos ou próximos de vencer.",
        parameters: {
          type: "OBJECT",
          properties: {
            days_ahead: {
              type: "INTEGER",
              description:
                "Quantidade de dias à frente para verificar o vencimento. Padrão: 30.",
            },
            sku: {
              type: "STRING",
              description: "Código SKU do produto para filtrar os alertas.",
            },
          },
        },
      },

      // ─── HISTÓRICO DE MOVIMENTAÇÕES ──────────────────────────────
      {
        name: "get_movement_history",
        description:
          "Consulta o histórico de movimentações físicas de estoque do armazém no período solicitado.",
        parameters: {
          type: "OBJECT",
          properties: {
            period: {
              type: "STRING",
              description: "Período para buscar o histórico. Padrão: 'week'.",
              enum: ["today", "week", "month", "quarter"],
            },
            movement_type: {
              type: "STRING",
              description: "Filtro por tipo de operação.",
              enum: ["todos", "entrada", "saida", "transferencia", "ajuste"],
            },
            user_id: {
              type: "STRING",
              description:
                "ID do operador/usuário que realizou a movimentação.",
            },
            sku: {
              type: "STRING",
              description: "Código SKU do produto para filtrar o histórico.",
            },
          },
        },
      },

      // ─── OCUPAÇÃO DE LOCALIZAÇÕES ────────────────────────────────
      {
        name: "get_location_occupancy",
        description:
          "Consulta e retorna o nível de ocupação física de todas as localizações de armazenamento no armazém.",
        parameters: {
          type: "OBJECT",
          properties: {
            address: {
              type: "STRING",
              description:
                "Código ou endereço parcial da localização (ex: A01-01).",
            },
            location_type: {
              type: "STRING",
              description:
                "Tipo de localização para filtrar (ex: prateleira, gaveta).",
            },
            filter: {
              type: "STRING",
              description:
                "Filtro especial: 'occupied' para locais com itens, ou 'available' para locais com espaço livre.",
              enum: ["occupied", "available"],
            },
          },
        },
      },

      // ─── RELATÓRIO DE DIVERGÊNCIAS ───────────────────────────────
      {
        name: "get_divergences_report",
        description:
          "Gera um relatório de divergências e alertas automáticos registrados no banco de dados (ex: estoque mínimo atingido, excesso ou vencimento).",
        parameters: {
          type: "OBJECT",
          properties: {
            period: {
              type: "STRING",
              description:
                "Período para buscar os alertas. Padrão: 'week'.",
              enum: ["today", "week", "month", "quarter"],
            },
            active_only: {
              type: "BOOLEAN",
              description:
                "Retorna apenas alertas que continuam ativos/não resolvidos.",
            },
          },
        },
      },

      // ─── PRODUTIVIDADE DE PICKING ────────────────────────────────
      {
        name: "get_picking_performance",
        description:
          "Retorna o ranking e indicadores de produtividade de separação (picking) de pedidos por operador.",
        parameters: {
          type: "OBJECT",
          properties: {
            period: {
              type: "STRING",
              description:
                "Período de análise da performance. Padrão: 'week'.",
              enum: ["today", "week", "month", "quarter"],
            },
            user_id: {
              type: "STRING",
              description: "ID de um operador específico para filtrar.",
            },
          },
        },
      },
    ],
  },
];
