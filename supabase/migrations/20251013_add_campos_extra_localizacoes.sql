-- Adiciona campos extras à tabela public.localizacoes para armazenar dimensões, temperatura e observações
-- Execute esta migração no ambiente onde está seu banco de dados (local ou remoto) para refletir as mudanças

begin;

alter table public.localizacoes
  add column if not exists capacidade_peso numeric,
  add column if not exists altura numeric,
  add column if not exists largura numeric,
  add column if not exists profundidade numeric,
  add column if not exists temperatura_min numeric,
  add column if not exists temperatura_max numeric,
  add column if not exists observacoes text;

commit;

-- Observação: após aplicar a migração, regenere os tipos do Supabase se estiver usando tipagem gerada
-- Exemplo (ajuste conforme seu setup):
-- supabase gen types typescript --project-id <seu-project-ref> --schema public > src/integrations/supabase/types.ts