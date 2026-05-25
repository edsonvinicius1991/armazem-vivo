// Executor de tools — queries somente leitura no Supabase
// Adaptado ao schema real: estoque_localizacao, movimentacoes, lotes, localizacoes, produtos, profiles, alertas_estoque
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

// Cria cliente Supabase com service role (somente leitura aqui)
function getSupabaseClient() {
    return createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
}

// Limite padrão para evitar timeout/OOM na Edge Function
const QUERY_LIMIT = 200;

// Calcula a data de início com base no período
function getPeriodStartDate(period: string): Date {
    const now = new Date();
    switch (period) {
        case "today":
            now.setHours(0, 0, 0, 0);
            return now;
        case "week":
            now.setDate(now.getDate() - 7);
            return now;
        case "month":
            now.setMonth(now.getMonth() - 1);
            return now;
        case "quarter":
            now.setMonth(now.getMonth() - 3);
            return now;
        default:
            now.setMonth(now.getMonth() - 1);
            return now;
    }
}

// Executa a tool chamada pelo Gemini e retorna os dados do banco
export async function executeToolCall(
    name: string,
    args: Record<string, unknown>
): Promise<unknown> {
    const supabase = getSupabaseClient();

    switch (name) {
        // ─── LISTAGEM COMPLETA DE PRODUTOS ────────────────────────
        case "list_all_products": {
            // Query direta em produtos, sem join em estoque — nunca falha por tabela vazia
            const t0 = Date.now();

            let query = supabase
                .from("produtos")
                .select("id, sku, nome, categoria, unidade_medida, estoque_minimo, status")
                .order("nome", { ascending: true })
                .limit(100);

            if (args.categoria) {
                query = query.ilike("categoria", args.categoria as string);
            }
            if (args.status) {
                query = query.eq("status", args.status as string);
            }

            const { data, error } = await query;
            console.log(`[Tool:list_all_products] ${Date.now() - t0}ms | total=${data?.length ?? 0}`);

            if (error) {
                console.error("[Tool:list_all_products] Erro Supabase:", error.message);
                return { error: "Erro ao listar produtos. Tente novamente." };
            }

            return {
                timestamp_consulta: new Date().toISOString(),
                total_produtos: (data ?? []).length,
                produtos: (data ?? []).map((p: any) => ({
                    sku: p.sku,
                    nome: p.nome,
                    categoria: p.categoria ?? "Sem categoria",
                    unidade_medida: p.unidade_medida ?? "",
                    estoque_minimo: Number(p.estoque_minimo ?? 0),
                    status: p.status ?? "ativo",
                })),
            };
        }

        // ─── SALDO DE ESTOQUE ────────────────────────────────
        case "search_products": {
            // Busca produtos por nome parcial (ilike) ou SKU exato
            const t0 = Date.now();

            if (!args.nome && !args.sku) {
                return { error: "Informe ao menos 'nome' ou 'sku' para buscar produtos." };
            }

            let query = supabase
                .from("produtos")
                .select("id, sku, nome, categoria, unidade_medida, estoque_minimo, status")
                .limit(20);

            if (args.sku) {
                // Filtro exato por SKU (case-insensitive)
                query = query.ilike("sku", args.sku as string);
            } else if (args.nome) {
                // Busca parcial por nome
                query = query.ilike("nome", `%${args.nome}%`);
            }

            const { data, error } = await query;
            console.log(`[Tool:search_products] ${Date.now() - t0}ms | nome=${args.nome ?? ""} sku=${args.sku ?? ""}`);

            if (error) {
                console.error("[Tool:search_products] Erro Supabase:", error.message);
                return { error: "Erro ao buscar produtos. Tente novamente." };
            }

            return {
                total_encontrados: (data ?? []).length,
                produtos: (data ?? []).map((p: any) => ({
                    id: p.id,
                    sku: p.sku,
                    nome: p.nome,
                    categoria: p.categoria,
                    unidade_medida: p.unidade_medida,
                    estoque_minimo: Number(p.estoque_minimo ?? 0),
                    status: p.status,
                })),
            };
        }

        case "get_product_stock": {
            // Retorna estoque detalhado por localização de um produto específico
            const t0 = Date.now();

            if (!args.produto_id && !args.sku) {
                return { error: "Informe 'produto_id' ou 'sku' para consultar o estoque do produto." };
            }

            // Resolve produto_id a partir do SKU se necessário
            let produtoId = args.produto_id as string | undefined;
            let produtoInfo: any = null;

            if (!produtoId && args.sku) {
                const { data: prodData, error: prodError } = await supabase
                    .from("produtos")
                    .select("id, sku, nome, categoria, unidade_medida, estoque_minimo, estoque_maximo, status")
                    .ilike("sku", args.sku as string)
                    .single();

                if (prodError || !prodData) {
                    return { total_registros: 0, produtos: [], mensagem: `Produto com SKU '${args.sku}' não encontrado.` };
                }
                produtoId = prodData.id;
                produtoInfo = prodData;
            }

            // Busca estoque por produto_id com join em localizacoes
            const { data: estoqueData, error: estError } = await supabase
                .from("estoque_localizacao")
                .select(`
                    id,
                    quantidade,
                    reservado,
                    produto_id,
                    lote_id,
                    produtos!inner (id, sku, nome, categoria, unidade_medida, estoque_minimo, estoque_maximo, status),
                    localizacoes!inner (id, codigo, tipo, rua, prateleira, nivel, box)
                `)
                .eq("produto_id", produtoId!)
                .limit(50);

            console.log(`[Tool:get_product_stock] ${Date.now() - t0}ms | produto_id=${produtoId} sku=${args.sku ?? ""}`);

            if (estError) {
                console.error("[Tool:get_product_stock] Erro Supabase:", estError.message);
                return { error: "Erro ao consultar estoque do produto. Tente novamente." };
            }

            const registros = estoqueData ?? [];

            // Usa info do produto do primeiro registro ou da consulta prévia
            const produto = produtoInfo ?? registros[0]?.produtos ?? null;

            const quantidadeTotal = registros.reduce((acc: number, e: any) => acc + Number(e.quantidade ?? 0), 0);
            const reservadoTotal = registros.reduce((acc: number, e: any) => acc + Number(e.reservado ?? 0), 0);
            const estoqueMinimo = Number(produto?.estoque_minimo ?? 0);

            return {
                timestamp_consulta: new Date().toISOString(),
                produto: produto ? {
                    id: produto.id,
                    sku: produto.sku,
                    nome: produto.nome,
                    categoria: produto.categoria,
                    unidade_medida: produto.unidade_medida,
                    estoque_minimo: estoqueMinimo,
                    estoque_maximo: Number(produto.estoque_maximo ?? 0),
                    status: produto.status,
                } : null,
                saldo_consolidado: {
                    quantidade_total: quantidadeTotal,
                    reservado_total: reservadoTotal,
                    disponivel: quantidadeTotal - reservadoTotal,
                    abaixo_minimo: quantidadeTotal < estoqueMinimo,
                    saldo_negativo: quantidadeTotal < 0,
                },
                total_localizacoes: registros.length,
                localizacoes: registros.map((e: any) => ({
                    codigo: e.localizacoes?.codigo,
                    tipo: e.localizacoes?.tipo,
                    rua: e.localizacoes?.rua,
                    prateleira: e.localizacoes?.prateleira,
                    nivel: e.localizacoes?.nivel,
                    box: e.localizacoes?.box,
                    quantidade: Number(e.quantidade),
                    reservado: Number(e.reservado ?? 0),
                    lote_id: e.lote_id,
                })),
            };
        }

        case "get_stock_summary": {
            // Busca estoque com joins left (não !inner) para não falhar com tabela vazia
            const t0 = Date.now();
            const { data: estoqueData, error } = await supabase
                .from("estoque_localizacao")
                .select(`
          id,
          quantidade,
          reservado,
          produto_id,
          localizacao_id,
          lote_id,
          produtos (id, sku, nome, categoria, unidade_medida, estoque_minimo),
          localizacoes (id, codigo, tipo, almoxarifado_id)
        `)
                .limit(QUERY_LIMIT);

            console.log(`[Tool:get_stock_summary] ${Date.now() - t0}ms | registros_raw=${estoqueData?.length ?? 0}`);

            if (error) {
                console.error("[Tool:get_stock_summary] Erro Supabase:", error.message);
                return { error: "Erro ao consultar estoque. Tente novamente." };
            }

            let result = estoqueData ?? [];

            // Filtro por SKU
            if (args.sku) {
                result = result.filter(
                    (e: any) =>
                        e.produtos?.sku?.toLowerCase() === (args.sku as string).toLowerCase()
                );
            }

            // Filtro por categoria
            if (args.category) {
                result = result.filter(
                    (e: any) =>
                        e.produtos?.categoria?.toLowerCase() ===
                        (args.category as string).toLowerCase()
                );
            }

            // Filtro por almoxarifado
            if (args.warehouse_id) {
                result = result.filter(
                    (e: any) => e.localizacoes?.almoxarifado_id === args.warehouse_id
                );
            }

            // Filtro por status do estoque
            if (args.filter === "zero_stock") {
                result = result.filter((e: any) => Number(e.quantidade) === 0);
            } else if (args.filter === "below_minimum") {
                result = result.filter(
                    (e: any) =>
                        Number(e.quantidade) < Number(e.produtos?.estoque_minimo ?? 0)
                );
            }

            // Agrupa por produto para dar visão consolidada (só inclui registros com produto válido)
            const grouped: Record<string, any> = {};
            for (const item of result) {
                // Pula registros sem produto associado (join left pode retornar null)
                if (!item.produtos) continue;
                const sku = (item.produtos as any)?.sku ?? "desconhecido";
                if (!grouped[sku]) {
                    grouped[sku] = {
                        sku,
                        nome: (item.produtos as any)?.nome,
                        categoria: (item.produtos as any)?.categoria,
                        unidade_medida: (item.produtos as any)?.unidade_medida,
                        estoque_minimo: Number((item.produtos as any)?.estoque_minimo ?? 0),
                        quantidade_total: 0,
                        reservado_total: 0,
                        localizacoes: [],
                    };
                }
                grouped[sku].quantidade_total += Number(item.quantidade ?? 0);
                grouped[sku].reservado_total += Number(item.reservado ?? 0);
                grouped[sku].localizacoes.push({
                    codigo: (item.localizacoes as any)?.codigo ?? "N/A",
                    tipo: (item.localizacoes as any)?.tipo,
                    quantidade: Number(item.quantidade),
                });
            }

            const produtosAgrupados = Object.values(grouped);
            const truncado = (estoqueData?.length ?? 0) >= QUERY_LIMIT;

            return {
                timestamp_consulta: new Date().toISOString(),
                total_registros: produtosAgrupados.length,
                truncado,
                ...(truncado && {
                    mensagem: `Exibindo os primeiros ${QUERY_LIMIT} registros de estoque. Use filtros (categoria, sku, almoxarifado) para refinar a busca.`,
                }),
                produtos: produtosAgrupados,
            };
        }

        // ─── KPIs OPERACIONAIS ───────────────────────────────────
        case "get_kpi_metrics": {
            const period = (args.period as string) ?? "month";
            const startDate = getPeriodStartDate(period);
            const t0 = Date.now();

            // Busca movimentações do período
            const { data: movimentacoes, error: movError } = await supabase
                .from("movimentacoes")
                .select("tipo, quantidade, realizada_em, produto_id, produtos!inner(sku, nome, categoria)")
                .gte("realizada_em", startDate.toISOString());

            if (movError) {
                console.error("[Tool:get_kpi_metrics] Erro movimentacoes:", movError.message);
                return { error: "Erro ao buscar movimentações para KPIs." };
            }

            // Busca estoque atual
            const { data: estoqueAtual, error: estError } = await supabase
                .from("estoque_localizacao")
                .select("quantidade, produto_id, produtos!inner(sku, nome, categoria, estoque_minimo)");

            if (estError) {
                console.error("[Tool:get_kpi_metrics] Erro estoque:", estError.message);
                return { error: "Erro ao buscar estoque para KPIs." };
            }

            const movs = movimentacoes ?? [];
            const estoque = estoqueAtual ?? [];

            // Filtra por categoria se especificada
            const filteredMovs = args.category
                ? movs.filter((m: any) => m.produtos?.categoria?.toLowerCase() === (args.category as string).toLowerCase())
                : movs;

            const filteredEstoque = args.category
                ? estoque.filter((e: any) => e.produtos?.categoria?.toLowerCase() === (args.category as string).toLowerCase())
                : estoque;

            // Calcula KPIs
            const totalProdutosEstoque = new Set(filteredEstoque.map((e: any) => e.produto_id)).size;

            // Agrupa estoque por produto
            const estoquePorProduto: Record<string, { qtd: number; minimo: number; nome: string; sku: string }> = {};
            for (const e of filteredEstoque) {
                const pid = e.produto_id;
                if (!estoquePorProduto[pid]) {
                    estoquePorProduto[pid] = {
                        qtd: 0,
                        minimo: Number((e as any).produtos?.estoque_minimo ?? 0),
                        nome: (e as any).produtos?.nome ?? "",
                        sku: (e as any).produtos?.sku ?? "",
                    };
                }
                estoquePorProduto[pid].qtd += Number(e.quantidade ?? 0);
            }

            // Produtos em ruptura (estoque zerado)
            const produtosRuptura = Object.values(estoquePorProduto).filter((p) => p.qtd <= 0);
            const taxaRuptura = totalProdutosEstoque > 0
                ? (produtosRuptura.length / totalProdutosEstoque) * 100
                : 0;

            // Produtos abaixo do mínimo
            const produtosAbaixoMinimo = Object.values(estoquePorProduto).filter(
                (p) => p.qtd < p.minimo && p.qtd > 0
            );

            // Total de entradas e saídas
            const totalEntradas = filteredMovs
                .filter((m: any) => m.tipo === "entrada")
                .reduce((acc: number, m: any) => acc + Number(m.quantidade), 0);
            const totalSaidas = filteredMovs
                .filter((m: any) => m.tipo === "saida")
                .reduce((acc: number, m: any) => acc + Number(m.quantidade), 0);
            const totalAjustes = filteredMovs
                .filter((m: any) => m.tipo === "ajuste")
                .reduce((acc: number, m: any) => acc + Number(m.quantidade), 0);

            // Giro de estoque (saídas / estoque médio)
            const estoqueTotal = Object.values(estoquePorProduto).reduce((acc, p) => acc + p.qtd, 0);
            const giro = estoqueTotal > 0 ? totalSaidas / estoqueTotal : 0;

            // Acurácia estimada (100% - ajustes/estoque)
            const acuracia = estoqueTotal > 0
                ? Math.max(0, 100 - (Math.abs(totalAjustes) / estoqueTotal) * 100)
                : 100;

            // Picking productivity
            const pickingMovs = filteredMovs.filter((m: any) => m.tipo === "saida");
            const diasPeriodo = Math.max(1, Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
            const pickingProdutividade = pickingMovs.length / diasPeriodo;

            const metric = args.metric as string;
            const allKpis = {
                acuracia: {
                    nome: "Acurácia de Estoque",
                    valor: Number(acuracia.toFixed(1)),
                    meta: 98,
                    unidade: "%",
                    status: acuracia >= 98 ? "🟢 Dentro do target" : "🔴 Abaixo do target",
                },
                ruptura: {
                    nome: "Taxa de Ruptura",
                    valor: Number(taxaRuptura.toFixed(1)),
                    meta: 2,
                    unidade: "%",
                    status: taxaRuptura <= 2 ? "🟢 Dentro do target" : "🔴 Acima do limite",
                    produtos_em_ruptura: produtosRuptura.map((p) => ({ sku: p.sku, nome: p.nome })),
                },
                giro: {
                    nome: "Giro de Estoque",
                    valor: Number(giro.toFixed(2)),
                    unidade: "x",
                    descricao: "Saídas / Estoque total no período",
                },
                cobertura: {
                    nome: "Cobertura de Estoque",
                    valor: totalSaidas > 0 ? Number((estoqueTotal / (totalSaidas / diasPeriodo)).toFixed(0)) : 0,
                    unidade: "dias",
                    descricao: "Estoque atual / Consumo médio diário",
                },
                picking_productivity: {
                    nome: "Produtividade de Picking",
                    valor: Number(pickingProdutividade.toFixed(1)),
                    unidade: "operações/dia",
                    total_operacoes: pickingMovs.length,
                },
                resumo: {
                    total_movimentacoes: filteredMovs.length,
                    total_entradas: totalEntradas,
                    total_saidas: totalSaidas,
                    total_ajustes: totalAjustes,
                    produtos_abaixo_minimo: produtosAbaixoMinimo.length,
                    estoque_total: estoqueTotal,
                },
            };

            console.log(`[Tool:get_kpi_metrics] ${Date.now() - t0}ms | period=${period}`);
            if (metric === "all") return { periodo: period, kpis: allKpis };
            if (metric === "accuracy") return { periodo: period, kpi: allKpis.acuracia, resumo: allKpis.resumo };
            if (metric === "ruptura") return { periodo: period, kpi: allKpis.ruptura, resumo: allKpis.resumo };
            if (metric === "turnover") return { periodo: period, kpi: allKpis.giro, resumo: allKpis.resumo };
            if (metric === "coverage") return { periodo: period, kpi: allKpis.cobertura, resumo: allKpis.resumo };
            if (metric === "picking_productivity") return { periodo: period, kpi: allKpis.picking_productivity, resumo: allKpis.resumo };
            return { periodo: period, kpis: allKpis };
        }

        // ─── ALERTAS DE VALIDADE DE LOTES ────────────────────────
        case "get_lot_expiry_alerts": {
            const t0 = Date.now();
            const daysAhead = (args.days_ahead as number) ?? 30;
            const targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + daysAhead);
            const today = new Date().toISOString().split("T")[0];
            const targetStr = targetDate.toISOString().split("T")[0];

            const { data, error } = await supabase
                .from("lotes")
                .select("id, numero_lote, data_validade, data_fabricacao, quantidade_atual, bloqueado, produtos!inner(sku, nome, categoria)")
                .lte("data_validade", targetStr)
                .gte("data_validade", today)
                .eq("bloqueado", false)
                .gt("quantidade_atual", 0)
                .order("data_validade", { ascending: true })
                .limit(100);

            console.log(`[Tool:get_lot_expiry_alerts] ${Date.now() - t0}ms | days_ahead=${daysAhead}`);
            if (error) {
                console.error("[Tool:get_lot_expiry_alerts] Erro Supabase:", error.message);
                return { error: "Erro ao buscar alertas de lotes. Tente novamente." };
            }

            let result = data ?? [];

            // Filtrar por SKU se especificado
            if (args.sku) {
                result = result.filter(
                    (l: any) => l.produtos?.sku?.toLowerCase() === (args.sku as string).toLowerCase()
                );
            }

            return {
                total_lotes_proximos_vencimento: result.length,
                dias_verificados: daysAhead,
                lotes: result.map((l: any) => ({
                    numero_lote: l.numero_lote,
                    sku: l.produtos?.sku,
                    produto: l.produtos?.nome,
                    categoria: l.produtos?.categoria,
                    data_validade: l.data_validade,
                    dias_restantes: Math.ceil(
                        (new Date(l.data_validade).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    ),
                    quantidade_atual: Number(l.quantidade_atual),
                })),
            };
        }

        // ─── HISTÓRICO DE MOVIMENTAÇÕES ──────────────────────────
        case "get_movement_history": {
            const t0 = Date.now();
            const period = (args.period as string) ?? "week";
            const startDate = getPeriodStartDate(period);

            let query = supabase
                .from("movimentacoes")
                .select(`
          id, tipo, quantidade, realizada_em, documento, observacao, custo_unitario,
          produtos!inner (sku, nome),
          profiles (nome_completo)
        `)
                .gte("realizada_em", startDate.toISOString())
                .order("realizada_em", { ascending: false })
                .limit(100);

            if (args.movement_type && args.movement_type !== "todos") {
                query = query.eq("tipo", args.movement_type as string);
            }
            if (args.user_id) {
                query = query.eq("realizada_por", args.user_id as string);
            }

            const { data, error } = await query;
            console.log(`[Tool:get_movement_history] ${Date.now() - t0}ms | period=${period}`);
            if (error) {
                console.error("[Tool:get_movement_history] Erro Supabase:", error.message);
                return { error: "Erro ao buscar histórico de movimentações. Tente novamente." };
            }

            let result = data ?? [];

            // Filtro por SKU (post-query pois é em tabela joinada)
            if (args.sku) {
                result = result.filter(
                    (m: any) => m.produtos?.sku?.toLowerCase() === (args.sku as string).toLowerCase()
                );
            }

            return {
                total_movimentacoes: result.length,
                periodo: period,
                movimentacoes: result.map((m: any) => ({
                    tipo: m.tipo,
                    sku: m.produtos?.sku,
                    produto: m.produtos?.nome,
                    quantidade: Number(m.quantidade),
                    data: m.realizada_em,
                    operador: m.profiles?.nome_completo ?? "Não identificado",
                    documento: m.documento,
                    observacao: m.observacao,
                })),
            };
        }

        // ─── OCUPAÇÃO DE LOCALIZAÇÕES ────────────────────────────
        case "get_location_occupancy": {
            const t0 = Date.now();
            // Busca localizações
            const { data: localizacoes, error: locError } = await supabase
                .from("localizacoes")
                .select("id, codigo, tipo, capacidade_maxima, ativo, almoxarifado_id, rua, prateleira, nivel, box, descricao")
                .limit(QUERY_LIMIT);

            if (locError) {
                console.error("[Tool:get_location_occupancy] Erro localizacoes:", locError.message);
                return { error: "Erro ao buscar localizações. Tente novamente." };
            }

            // Busca estoque por localização
            const { data: estoqueData, error: estError } = await supabase
                .from("estoque_localizacao")
                .select("localizacao_id, quantidade")
                .limit(QUERY_LIMIT);

            console.log(`[Tool:get_location_occupancy] ${Date.now() - t0}ms`);
            if (estError) {
                console.error("[Tool:get_location_occupancy] Erro estoque:", estError.message);
                return { error: "Erro ao buscar ocupação de estoque. Tente novamente." };
            }

            // Agrupa estoque por localização
            const estoquePorLoc: Record<string, number> = {};
            for (const e of estoqueData ?? []) {
                const lid = e.localizacao_id;
                estoquePorLoc[lid] = (estoquePorLoc[lid] ?? 0) + Number(e.quantidade ?? 0);
            }

            let result = (localizacoes ?? []).map((loc: any) => {
                const qtdOcupada = estoquePorLoc[loc.id] ?? 0;
                const capacidade = Number(loc.capacidade_maxima ?? 0);
                const ocupacaoPct = capacidade > 0 ? (qtdOcupada / capacidade) * 100 : 0;

                return {
                    codigo: loc.codigo,
                    tipo: loc.tipo,
                    rua: loc.rua,
                    prateleira: loc.prateleira,
                    nivel: loc.nivel,
                    box: loc.box,
                    capacidade_maxima: capacidade,
                    quantidade_ocupada: qtdOcupada,
                    ocupacao_percentual: Number(ocupacaoPct.toFixed(1)),
                    disponivel: capacidade > 0 ? capacidade - qtdOcupada : null,
                    ativo: loc.ativo,
                };
            });

            // Filtros
            if (args.address) {
                result = result.filter((l: any) =>
                    l.codigo?.toLowerCase().includes((args.address as string).toLowerCase())
                );
            }
            if (args.location_type && args.location_type !== "todos") {
                result = result.filter((l: any) => l.tipo === args.location_type);
            }
            if (args.filter === "occupied") {
                result = result.filter((l: any) => l.quantidade_ocupada > 0);
            } else if (args.filter === "available") {
                result = result.filter(
                    (l: any) => l.capacidade_maxima === 0 || l.quantidade_ocupada < l.capacidade_maxima
                );
            }

            return {
                total_localizacoes: result.length,
                localizacoes: result,
            };
        }

        // ─── RELATÓRIO DE DIVERGÊNCIAS ───────────────────────────
        case "get_divergences_report": {
            const t0 = Date.now();
            const period = (args.period as string) ?? "week";
            const startDate = getPeriodStartDate(period);

            let query = supabase
                .from("alertas_estoque")
                .select(`
          id, tipo_alerta, nivel_criticidade, quantidade_atual, quantidade_referencia,
          mensagem, ativo, data_criacao, data_resolucao, observacoes,
          produtos (sku, nome, categoria)
        `)
                .gte("data_criacao", startDate.toISOString())
                .order("data_criacao", { ascending: false })
                .limit(100);

            if (args.active_only === true) {
                query = query.eq("ativo", true);
            }

            const { data, error } = await query;
            console.log(`[Tool:get_divergences_report] ${Date.now() - t0}ms | period=${period}`);
            if (error) {
                console.error("[Tool:get_divergences_report] Erro Supabase:", error.message);
                return { error: "Erro ao buscar relatório de divergências. Tente novamente." };
            }

            return {
                total_alertas: (data ?? []).length,
                periodo: period,
                alertas: (data ?? []).map((a: any) => ({
                    tipo: a.tipo_alerta,
                    criticidade: a.nivel_criticidade,
                    sku: a.produtos?.sku,
                    produto: a.produtos?.nome,
                    quantidade_atual: Number(a.quantidade_atual),
                    quantidade_referencia: a.quantidade_referencia ? Number(a.quantidade_referencia) : null,
                    mensagem: a.mensagem,
                    ativo: a.ativo,
                    data_criacao: a.data_criacao,
                    data_resolucao: a.data_resolucao,
                })),
            };
        }

        // ─── PRODUTIVIDADE DE PICKING ────────────────────────────
        case "get_picking_performance": {
            const t0 = Date.now();
            const period = (args.period as string) ?? "week";
            const startDate = getPeriodStartDate(period);

            let query = supabase
                .from("movimentacoes")
                .select(`
          id, quantidade, realizada_em, realizada_por,
          profiles (id, nome_completo)
        `)
                .eq("tipo", "saida")
                .gte("realizada_em", startDate.toISOString())
                .limit(500);

            if (args.user_id) {
                query = query.eq("realizada_por", args.user_id as string);
            }

            const { data, error } = await query;
            console.log(`[Tool:get_picking_performance] ${Date.now() - t0}ms | period=${period}`);
            if (error) {
                console.error("[Tool:get_picking_performance] Erro Supabase:", error.message);
                return { error: "Erro ao buscar dados de picking. Tente novamente." };
            }

            const movs = data ?? [];

            // Agrupa por operador
            const porOperador: Record<string, { nome: string; operacoes: number; quantidade_total: number }> = {};
            for (const m of movs) {
                const operadorId = (m as any).realizada_por ?? "desconhecido";
                const nome = (m as any).profiles?.nome_completo ?? "Não identificado";
                if (!porOperador[operadorId]) {
                    porOperador[operadorId] = { nome, operacoes: 0, quantidade_total: 0 };
                }
                porOperador[operadorId].operacoes++;
                porOperador[operadorId].quantidade_total += Number(m.quantidade ?? 0);
            }

            const diasPeriodo = Math.max(1, Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

            const resultado = Object.entries(porOperador)
                .map(([_id, op]) => ({
                    operador: op.nome,
                    total_operacoes: op.operacoes,
                    quantidade_total: op.quantidade_total,
                    media_operacoes_dia: Number((op.operacoes / diasPeriodo).toFixed(1)),
                    media_quantidade_dia: Number((op.quantidade_total / diasPeriodo).toFixed(1)),
                }))
                .sort((a, b) => b.total_operacoes - a.total_operacoes);

            return {
                periodo: period,
                dias_analisados: diasPeriodo,
                total_operacoes: movs.length,
                operadores: resultado,
            };
        }

        default:
            console.error(`[Executor] Tool desconhecida chamada: ${name}`);
            return { error: `Ferramenta '${name}' não reconhecida pelo executor.` };
    }
}