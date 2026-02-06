export const STEPS = [
    // [FASE 1] INTENÇÃO DO USUÁRIO
    {
        id: 'passo_1_intencao',
        phase: 1,
        question: 'Você já sabe exatamente o que precisa ou gostaria de ver as opções disponíveis?',
        subtext: 'ex: Persiana Rolô blackout tamanho 1,50m x 1,50m',
        type: 'radio',
        options: [
            { label: 'Quero ver as opções disponíveis', value: 'ver_opcoes', nextStep: 'passo_3_acionamento' },
            { label: 'Já sei o tipo de persiana/cortina e tenho as medidas e quero falar direto com um atendente', value: 'direto_atendente', nextStep: 'passo_8_captura' }
        ]
    },

    // [FASE 3] ACIONAMENTO
    {
        id: 'passo_3_acionamento',
        phase: 3,
        question: 'Você gostaria dessa persiana manual ou automática?',
        type: 'radio',
        options: [
            { label: 'Manual (com corrente, haste ou bastão)', value: 'manual', nextStep: 'passo_5_estagio', image: '/acionamento/Manual (com corrente, haste ou bastão).png' },
            { label: 'Motorizada', value: 'motorizada', nextStep: 'passo_5_estagio', image: '/acionamento/Motorizada.png' },
            { label: 'Ainda não sei', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4] MODELO
    {
        id: 'passo_4_modelo',
        phase: 4,
        question: 'Qual modelo você prefere?',
        type: 'radio',
        options: [
            { label: 'Persiana Rolô', image: '/modelos/Persiana Rolô.webp', description: 'Prática e minimalista, o tecido enrola totalmente no topo quando aberta.', value: 'rolo', nextStep: 'passo_4_tecido_rolo' },
            { label: 'Persiana Romana', image: '/modelos/Persiana Romana.webp', description: 'Elegante, o tecido dobra-se em camadas horizontais conforme é suspensa.', value: 'romana', nextStep: 'passo_4_tecido_romana' },
            { label: 'Persiana Double Vision', image: '/modelos/Persiana Double Vision  Persiana Vertical.webp', description: 'Faixas alternadas que permitem ver o exterior ou fechar totalmente a visão.', value: 'double_vision', nextStep: 'passo_4_tecido_double' },
            { label: 'Persiana Vertical', image: '/modelos/Persiana Vertical.webp', description: 'Lâminas que giram e correm lateralmente, ideal para grandes vãos e escritórios.', value: 'vertical', nextStep: 'passo_4_tecido_vertical' },
            { label: 'Horizontal de Madeira', image: '/modelos/Horizontal de Madeira.webp', description: 'Sofisticada e térmica, traz um visual nobre e rústico ao ambiente.', value: 'madeira', nextStep: 'passo_4_tecido_madeira' },
            { label: 'Horizontal de Alumínio', image: '/modelos/Horizontal de Alumínio.webp', description: 'Funcional e resistente à umidade, ótima para cozinhas e banheiros.', value: 'aluminio', nextStep: 'passo_4_tecido_aluminio' },
            { label: 'Persiana de Teto', image: '/modelos/Persiana de Teto.webp', description: 'Feita sob medida para controlar o sol em claraboias e tetos de vidro.', value: 'teto', nextStep: 'passo_4_modelo_teto' },
            { label: 'Persiana Painel', image: '/modelos/Persiana Painel.webp', description: 'Painéis largos que correm lateralmente, ideal para portas de varanda.', value: 'painel', nextStep: 'passo_4_tecido_painel' },
            { label: 'Cortina', image: '/modelos/Cortina.webp', description: 'Tecido tradicional em varão ou trilho, focada em aconchego e volume decorativo.', value: 'cortina', nextStep: 'passo_4_tecido_cortina' },
            { label: 'Não sei — Quero recomendação', value: 'nao_sei', nextStep: 'passo_8_captura_catalogo' }
        ]
    },

    // [FASE 4.1] TECIDOS ROLÔ
    {
        id: 'passo_4_tecido_rolo',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Rolô:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 01-Blackout.png' },
            { label: 'FR Blackout', description: 'Blackout com proteção anti-chama certificada.', value: 'fr_blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 02-FR Blackout.png' },
            { label: 'Semi-blackout', description: 'Nível intermediário de luz, com leve escurecimento.', value: 'semi_blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 03-Semi-blackout.png' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 04-Tela solar 1%.png' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 05-Tela solar 3%.png' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 06-Tela solar 5%.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 07-Translúcida.png' },
            { label: 'Decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 08-Decorativo.png' },
            { label: 'FR Translúcido', description: 'Translúcido com retardante de chama para maior segurança.', value: 'fr_translucido', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 09-FR Translúcido.png' },
            { label: 'Hospitalar Antimicrobiano', description: 'Superfície higiênica, alta privacidade e bloqueio de luz.', value: 'hospitalar', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 10-Hospitalar Antimicrobiano.png' },
            { label: 'Screen Metalizado 1%', description: 'Máximo controle de luz e calor para áreas muito ensolaradas.', value: 'metalizado_1', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 11-Screen Metalizado 1%.png' },
            { label: 'Screen Metalizado 3%', description: 'Reduz ofuscamento e calor, mantendo parte da vista externa.', value: 'metalizado_3', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 12-Screen Metalizado 3%.png' },
            { label: 'Screen Metalizado 5%', description: 'Combina controle solar com maior transparência e conforto visual.', value: 'metalizado_5', nextStep: 'passo_3_acionamento', image: '/tecidos/Rolô 13-Screen Metalizado 5%.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.2] TECIDOS ROMANA
    {
        id: 'passo_4_tecido_romana',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Romana:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 01-Blackout.png' },
            { label: 'Semi-blackout', description: 'Nível intermediário de luz, com leve escurecimento.', value: 'semi_blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 02-Semi-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 06-Translúcida.png' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 03-Tela solar 1%.png' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 04-Tela solar 3%.png' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 05-Tela solar 5%.png' },
            { label: 'Decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana 07-Decorativo.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.3] TECIDOS DOUBLE VISION
    {
        id: 'passo_4_tecido_double',
        phase: 4,
        question: 'Escolha o tecido para sua Double Vision:',
        type: 'radio',
        options: [
            { label: 'Blackout com translucido', description: 'Combina faixas blackout e transparentes em sistema duplo, permitindo alternar entre escuro total, luz parcial e visão externa.', value: 'blackout_translucido', nextStep: 'passo_3_acionamento', image: '/tecidos/Double Vision 01-Blackout com Translúcido.png' },
            { label: 'Semi-Blackout com translucido', description: 'Faixas opacas mais densas, reduzem bem a luminosidade.', value: 'semi_blackout_translucido', nextStep: 'passo_3_acionamento', image: '/tecidos/Double Vision 02-Semi-blackout com Translúcido.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.4] TECIDOS VERTICAL
    {
        id: 'passo_4_tecido_vertical',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Vertical:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio', image: '/tecidos/Vertical 01-Blackout.png' },
            { label: 'PVC Blackout', description: 'Lâminas em PVC opaco, fáceis de limpar, alta durabilidade e ótimo custo-benefício em áreas úmidas.', value: 'pvc_blackout', nextStep: 'passo_5_estagio', image: '/tecidos/Vertical 02-PVC Blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio', image: '/tecidos/Vertical 03-Translúcida.png' },
            { label: 'Decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_5_estagio', image: '/tecidos/Vertical 04-Decorativo.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.5] TECIDOS MADEIRA
    {
        id: 'passo_4_tecido_madeira',
        phase: 4,
        question: 'Escolha o acabamento para sua Persiana de Madeira:',
        type: 'radio',
        options: [
            { label: 'Madeira natural 50 mm com cadarço', description: 'Persiana clássica de lâminas largas com cadarço aparente, une beleza natural e controle eficiente da luz.', value: 'natural_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 01-Madeira natural 50mm com cadarço.png' },
            { label: 'Madeira natural 50 mm com fita', description: 'Versão com fitas têxteis largas que cobrem os furos, oferecendo acabamento sofisticado e mais privacidade.', value: 'natural_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 02-Madeira natural 50mm com fita.png' },
            { label: 'Eco wood com cadarço', description: 'Persiana sustentável feita com composto sintético e fibras recicláveis, resistente à umidade e fácil de limpar.', value: 'eco_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 03-Eco wood com cadarço.png' },
            { label: 'Eco wood com fita', description: 'Versão com fitas têxteis que aumentam a privacidade e o apelo decorativo, mantendo o caráter ecológico.', value: 'eco_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 04-Eco wood com fita.png' },
            { label: 'Bambu com cadarço', description: 'Persiana natural de bambu trançado, com cadarços aparentes e textura leve e tropical.', value: 'bambu_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 05-Bambu com cadarço.png' },
            { label: 'Bambu com fita', description: 'Modelo com fitas de tecido decorativas, que trazem toque artesanal e sofisticação ao estilo nautral do bambu.', value: 'bambu_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Madeira 06-Bambu com fita.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.6] TECIDOS ALUMÍNIO
    {
        id: 'passo_4_tecido_aluminio',
        phase: 4,
        question: 'Escolha o acabamento para sua Persiana de Alumínio:',
        type: 'radio',
        options: [
            { label: 'Lâmina 16 mm (micro)', description: 'Lâminas finas e delicadas, ideais para janelas pequenas ou portas de vidro.', value: 'lamina_16', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 01-Lâmina 16mm (micro).png' },
            { label: 'Lâmina 25 mm (padrão)', description: 'Modelo mais comum, permite bom controle da luz e ventilação.', value: 'lamina_25', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 02-Lâmina 25mm (padrão).png' },
            { label: 'Lâmina 50 mm (larga)', description: 'Visual moderno e robusto, com maior espaçamento entre as lâminas.', value: 'lamina_50', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 03-Lâmina 50mm (larga).png' },
            { label: 'Perfurada (micro furos)', description: 'Lâminas com microperfurações que suavizam a entrada de luz e calor.', value: 'perfurada', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 04-Perfurada (micro furos).png' },
            { label: 'Acabamento brilhante ou métalico', description: 'Efeito decorativo, com brilho e reflexão de luz.', value: 'brilhante', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 05-Acabamento brilhante ou metálico.png' },
            { label: 'Acabamento fosco ou acetinado', description: 'Visual discreto e sofisticado, reduz reflexos.', value: 'fosco', nextStep: 'passo_3_acionamento', image: '/tecidos/Horizontal de Alumínio 06-Acabamento fosco ou acetinado.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7] MODELO TETO
    {
        id: 'passo_4_modelo_teto',
        phase: 4,
        question: 'Qual modelo de Persiana de Teto você prefere?',
        type: 'radio',
        options: [
            { label: 'Persiana Romana de Teto', description: 'Sistema com dobras horizontais elegantes, ideal para claraboias e tetos de vidro, proporcionando charme e controle de luz.', value: 'romana_teto', nextStep: 'passo_4_tecido_teto_romana' },
            { label: 'Persiana celular de Teto', description: 'Tecido com estrutura colmeia (celular) que cria isolamento natural, garantindo eficiência térmica e controle de luminosidade.', value: 'celular_teto', nextStep: 'passo_4_tecido_teto_celular' },
            { label: 'Persiana plissada de Teto', description: 'Modelo com tecido em pregas finas que se recolhem suavemente, oferecendo leveza, difusão de luz e conforto térmico.', value: 'plissada_teto', nextStep: 'passo_4_tecido_teto_plissada' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7.1] TECIDOS TETO ROMANA
    {
        id: 'passo_4_tecido_teto_romana',
        phase: 4,
        question: 'Escolha o tecido para sua Romana de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana de Teto 01-Blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana de Teto 02-Translúcida.png' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana de Teto 03-Tela solar 1%.png' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana de Teto 04-Tela solar 3%.png' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_3_acionamento', image: '/tecidos/Romana de Teto 05-Tela solar 5%.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7.2] TECIDOS TETO CELULAR
    {
        id: 'passo_4_tecido_teto_celular',
        phase: 4,
        question: 'Escolha o tecido para sua Celular de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio', image: '/tecidos/Celular de Teto 01-Blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio', image: '/tecidos/Celular de Teto 02-Translúcida.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7.3] TECIDOS TETO PLISSADA
    {
        id: 'passo_4_tecido_teto_plissada',
        phase: 4,
        question: 'Escolha o tecido para sua Plissada de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio', image: '/tecidos/Plissadade Teto 01-Blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio', image: '/tecidos/Plissadade Teto 02-Translúcida.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.8] TECIDOS PAINEL
    {
        id: 'passo_4_tecido_painel',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Painel:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_5_estagio' },
            { label: 'Decorativa/Texturizada', description: 'Estética refinada com texturas que valorizam a decoração do ambiente.', value: 'decorativa', nextStep: 'passo_5_estagio' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.9] TECIDOS CORTINA
    {
        id: 'passo_4_tecido_cortina',
        phase: 4,
        question: 'Escolha o tecido para sua Cortina:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/Cortina 01-Blackout.png' },
            { label: 'Semi-blacKout 70%', description: 'Mantém cerca de 70% da luminosidade.', value: 'semi_blackout_70', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/Cortina 02-Semi-Blackout 70%.png' },
            { label: 'Translúcido Voil', description: 'Cortina leve, com excelente passagem de luz natural.', value: 'voil', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/Cortina 03-Translúcido Voil.png' },
            { label: 'Translúcido de Linho', description: 'Cortina com visual mais encorpado e sofisticado, mantendo translucidez e trazendo textura natural ao ambiente.', value: 'linho', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/Cortina 04-Translúcido de Linho.png' },
            { label: 'Cortina Dupla (Voil + Blackout)', description: 'Combinação funcional e elegante: o voil garante leveza durante o dia e o blackout proporciona bloqueio de luz e privacidade quando necessário.', value: 'dupla', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/Cortina 05-Cortina Dupla (Voil + Blackout).png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.9.1] ACABAMENTO CORTINA — imagens por tecido escolhido (passo_4_tecido_cortina)
    {
        id: 'passo_4_acabamento_cortina',
        phase: 4,
        question: 'Escolha o acabamento para sua Cortina:',
        type: 'radio',
        options: [
            { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 01-Ilhós.png' },
            { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 02-Wave (Ripplefold).png' },
            { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 03-Prega Americana (argola ou trilho).png' },
            { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 04-Prega Macho (argola ou trilho).png' },
            { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 05-Prega Fêmea (Argola ou trilho).png' },
            { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 06-Prega Franzida (argola ou trilho).png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ],
        optionsByTecido: {
            blackout: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 01-Ilhós.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 02-Wave (Ripplefold).png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 03-Prega Americana (argola ou trilho).png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 04-Prega Macho (argola ou trilho).png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 05-Prega Fêmea (Argola ou trilho).png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Blackout 06-Prega Franzida (argola ou trilho).png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            semi_blackout_70: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 01-Ilhós.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 02-Wave (Ripplefold).png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 03-Prega Americana (argola ou trilho).png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 04-Prega Macho (argola ou trilho).png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 05-Prega Fêmea (Argola ou trilho).png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Semi-Blackout 70% 06-Prega Franzida (argola ou trilho).png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            voil: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 01-Ilhós.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 02-Wave (Ripplefold).png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 03-Prega Americana (argola ou trilho).png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 04-Prega Macho (argola ou trilho).png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 05-Prega Fêmea (Argola ou trilho).png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida Voil 06-Prega Franzida (argola ou trilho).png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            linho: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 01-Ilhós.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 02-Wave (Ripplefold).png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 03-Prega Americana (argola ou trilho).png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 04-Prega Macho (argola ou trilho).png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 05-Prega Fêmea (Argola ou trilho).png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Translúcida de Linho 06-Prega Franzida (argola ou trilho).png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            dupla: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 01-Ilhós.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 02-Wave (Ripplefold).png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 03-Prega Americana (argola ou trilho).png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 04-Prega Macho (argola ou trilho).png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 05-Prega Fêmea (Argola ou trilho).png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/Cortina Dupla (Voil + Blackout) 06-Prega Franzida (argola ou trilho).png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ]
        }
    },

    // [FASE 5] ESTÁGIO
    {
        id: 'passo_5_estagio',
        phase: 5,
        question: 'Em que fase você está agora?',
        type: 'radio',
        options: [
            { label: 'Já tenho as medidas e quero um pré-orçamento', value: 'orcamento', nextStep: 'passo_6_medidas' },
            { label: 'Não tenho medidas e quero um pré-orçamento', value: 'catalogo', nextStep: 'passo_8_captura_catalogo' }
        ]
    },

    // [FASE 6] MEDIDAS
    {
        id: 'passo_6_medidas',
        phase: 6,
        question: 'Perfeito! Envie as medidas necessárias',
        subtext: '*Não se preocupe, essas informações são apenas para você receber um pré orçamento. Antes de enviar para produção, um técnico da nossa equipe vai até o local para tirar as medidas exatas e confirmar tudo com você, sem custo adicional.',
        type: 'medidas',
        inputs: [
            { id: 'largura', label: 'Largura', placeholder: 'Ex: 120', suffix: 'cm', required: true },
            { id: 'altura', label: 'Altura', placeholder: 'Ex: 140', suffix: 'cm', required: true }
        ],
        nextStep: 'passo_7_mais_itens'
    },

    // [FASE 7] ADICIONAR NOVO ITEM (TEXTO LIVRE)
    {
        id: 'passo_7_adicionar_item',
        phase: 7,
        question: 'Informe sobre as próximas persianas e cortinas que deseja',
        subtext: 'Ex: Persiana rolô Blackout 1,50 larg x 3,00 Alt\nEx: Persiana Double Vision Translúcida 1,30 x 2,50',
        type: 'textarea',
        inputs: [
            { 
                id: 'descricao_item', 
                label: '', 
                placeholder: 'Descreva o que você deseja...',
                type: 'textarea'
            }
        ],
        nextStep: 'passo_7_mais_itens'
    },

    // [FASE 7] MAIS ITENS
    {
        id: 'passo_7_mais_itens',
        phase: 7,
        question: 'Caso deseje, pode escolher uma nova persiana/cortina ou pode prosseguir para próxima etapa!',
        subtext: 'Escolha como prosseguir.',
        type: 'mixed',
        inputs: [],
        options: [
            { label: 'Informar sobre outra persiana (Adicionar novo item)', value: 'adicionar_outro', nextStep: 'passo_7_adicionar_item' },
            { label: 'Seguir somente com este orçamento', value: 'finalizar', nextStep: 'passo_8_captura' }
        ]
    },

    // [FASE 8] CAPTURA FINAL
    {
        id: 'passo_8_captura',
        phase: 8,
        question: 'Perfeito! Para te enviar este pré orçamento',
        subtext: 'Preencha seus dados para receber as sugestões.',
        type: 'mixed',
        inputs: [
            { id: 'nome', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
            { id: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
            { id: 'cidade', label: 'Cidade', placeholder: 'São Paulo' },
            { id: 'bairro', label: 'Bairro', placeholder: 'Centro' },
            {
                id: 'ambientes',
                label: 'Qual(is) ambiente(s) deseja?',
                placeholder: 'Selecione os ambientes',
                type: 'multi-select',
                options: [
                    'Varanda / Sacada / Área externa Envidraçada',
                    'Quarto',
                    'Sala de Estar / Jantar',
                    'Cozinha / Área Gourmet',
                    'Banheiro / Lavabo',
                    'Escritório / Home Office',
                    'Outro'
                ]
            }
        ],
        isFinal: true
    },

    // [FASE 8 Alternate] CAPTURA CATÁLOGO
    {
        id: 'passo_8_captura_catalogo',
        phase: 8,
        question: 'Perfeito! Para te enviar este pré orçamento',
        subtext: 'Preencha seus dados para receber as sugestões.',
        type: 'mixed',
        inputs: [
            { id: 'nome', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
            { id: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
            {
                id: 'ambientes',
                label: 'Qual(is) ambiente(s) deseja?',
                placeholder: 'Selecione os ambientes',
                type: 'multi-select',
                options: [
                    'Varanda / Sacada / Área externa Envidraçada',
                    'Quarto',
                    'Sala de Estar / Jantar',
                    'Cozinha / Área Gourmet',
                    'Banheiro / Lavabo',
                    'Escritório / Home Office',
                    'Outro'
                ]
            }
        ],
        isFinal: true
    }
];
