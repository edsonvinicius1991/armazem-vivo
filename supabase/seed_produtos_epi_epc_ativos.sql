INSERT INTO produtos (sku, nome, descricao, categoria, unidade_medida, peso_unitario, valor_unitario, estoque_minimo, estoque_maximo, status)
VALUES

-- EPI
('EPI-001', 'Capacete de Segurança Classe A', 'Capacete de proteção contra impactos e choques elétricos, Classe A, cor branca', 'EPI', 'UN', 0.350, 45.90, 20, 200, 'ativo'),
('EPI-002', 'Luva de Raspa de Couro', 'Luva de proteção mecânica em raspa de couro, tamanho M', 'EPI', 'PAR', 0.180, 18.50, 30, 300, 'ativo'),
('EPI-003', 'Óculos de Segurança Incolor', 'Óculos de proteção contra impactos e respingos, lente incolor, antirrisco', 'EPI', 'UN', 0.080, 12.90, 50, 500, 'ativo'),
('EPI-004', 'Protetor Auricular Plug Espuma', 'Protetor auricular tipo plug em espuma descartável, NRRsf 15dB', 'EPI', 'PAR', 0.010, 2.50, 100, 2000, 'ativo'),
('EPI-005', 'Bota de Segurança Bico de Aço', 'Bota de couro com bico de aço e solado antiderrapante, número 42', 'EPI', 'PAR', 1.200, 189.90, 10, 100, 'ativo'),
('EPI-006', 'Respirador PFF2 Sem Válvula', 'Máscara respiratória PFF2 (N95) sem válvula, caixa com 10 unidades', 'EPI', 'CX', 0.120, 89.00, 20, 200, 'ativo'),
('EPI-007', 'Colete Refletivo Laranja', 'Colete de alta visibilidade com faixas refletivas, tamanho único', 'EPI', 'UN', 0.200, 35.00, 15, 150, 'ativo'),

-- EPC
('EPC-001', 'Extintor CO2 6kg', 'Extintor de incêndio a CO2 com 6kg de capacidade, classe B e C', 'EPC', 'UN', 11.500, 420.00, 5, 30, 'ativo'),
('EPC-002', 'Chuveiro Lava-Olhos Portátil', 'Lava-olhos portátil com garrafa de 1L para emergências com produtos químicos', 'EPC', 'UN', 1.200, 155.00, 3, 20, 'ativo'),
('EPC-003', 'Placa Fotoluminescente Saída de Emergência', 'Placa fotoluminescente de saída de emergência 30x15cm', 'EPC', 'UN', 0.100, 22.00, 10, 100, 'ativo'),
('EPC-004', 'Kit Primeiros Socorros Completo', 'Kit de primeiros socorros com 54 itens em maleta rígida', 'EPC', 'UN', 1.800, 210.00, 3, 20, 'ativo'),
('EPC-005', 'Cone de Sinalização 75cm', 'Cone de sinalização em PVC laranja fluorescente com faixa refletiva', 'EPC', 'UN', 0.600, 48.00, 10, 80, 'ativo'),

-- Ativos
('ATI-001', 'Notebook Dell Latitude 5540', 'Notebook corporativo Intel Core i5 13ª geração, 16GB RAM, SSD 512GB, tela 15.6"', 'Ativos', 'UN', 1.800, 4890.00, 0, 50, 'ativo'),
('ATI-002', 'Monitor LG 24" Full HD', 'Monitor LED 24 polegadas Full HD IPS, entrada HDMI e DisplayPort', 'Ativos', 'UN', 3.200, 1290.00, 0, 30, 'ativo'),
('ATI-003', 'Kit Teclado e Mouse Sem Fio', 'Kit teclado e mouse wireless 2.4GHz, layout ABNT2', 'Ativos', 'UN', 0.450, 189.00, 0, 40, 'ativo'),
('ATI-004', 'Headset USB com Microfone', 'Headset com fio USB, microfone com cancelamento de ruído para videoconferência', 'Ativos', 'UN', 0.280, 245.00, 0, 30, 'ativo'),
('ATI-005', 'Switch de Rede 24 Portas Gigabit', 'Switch gerenciável 24 portas Gigabit Ethernet, rack 19"', 'Ativos', 'UN', 2.100, 1850.00, 0, 10, 'ativo'),
('ATI-006', 'Nobreak Senoidal 1500VA', 'Nobreak senoidal 1500VA/900W, 8 tomadas, USB e software de gerenciamento', 'Ativos', 'UN', 8.500, 1390.00, 0, 10, 'ativo')

ON CONFLICT (sku) DO NOTHING;
