-- Adiciona política de INSERT em alertas_estoque para usuários autenticados
-- e garante que gerar_alertas_estoque() rode com privilégios de owner (SECURITY DEFINER)

CREATE POLICY "Usuários autenticados podem criar alertas" ON alertas_estoque
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Usuários autenticados podem deletar alertas resolvidos" ON alertas_estoque
    FOR DELETE USING (auth.role() = 'authenticated');

-- Garante que a função ignore RLS ao gerar alertas via trigger/chamada interna
ALTER FUNCTION gerar_alertas_estoque() SECURITY DEFINER;
