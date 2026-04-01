import {
  PASSO_4_TECIDO_ROLO_OPTIONS,
  PASSO_4_TECIDO_ROMANA_OPTIONS,
  PASSO_4_TECIDO_DOUBLE_OPTIONS,
} from '../data/passo4RoloRomanaDoubleFabricOptions.js';

export const STEPS = [
    // [FASE 1] INTENÇÃO DO USUÁRIO
    {
        id: 'passo_1_intencao',
        phase: 1,
        question: 'Orçamento de Persiana / Cortina',
        subtext: 'Escolha o que combina com seu ambiente e receba uma estimativa alinhada às suas escolhas.',
        type: 'radio',
        options: [
            { label: 'Escolha o modelo que combina com o seu ambiente', value: 'ver_opcoes', nextStep: 'passo_4_modelo', featured: true },
            { label: 'Já sei o modelo e tecido e tenho as medidas', description: 'Persiana Rolô blackout tamanho 1,50m x 1,50m', value: 'direto_atendente', nextStep: 'passo_8_captura' }
        ]
    },

    // [FASE 3] ACIONAMENTO
    {
        id: 'passo_3_acionamento',
        phase: 3,
        question: 'Você prefere manual ou automática?',
        type: 'radio',
        options: [
            { label: 'Manual (com corrente, haste ou bastão)', value: 'manual', nextStep: 'passo_5_estagio', image: '/acionamento/manual-corrente-haste-bastao.png' },
            { label: 'Motorizada', value: 'motorizada', nextStep: 'passo_5_estagio', image: '/acionamento/Motorizada.png' },
            { label: 'Ainda não sei', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4] MODELO (Adicionado para V1 para suportar imagens e fluxo unificado)
    {
        id: 'passo_4_modelo',
        phase: 4,
        question: 'Qual modelo você prefere?',
        subtext: 'Escolha o que combina com seu ambiente',
        type: 'radio',
        options: [
            { label: 'Persiana Rolô', image: '/modelos/persiana-rolo.webp', description: 'Prática e minimalista, o tecido enrola totalmente no topo quando aberta.', value: 'rolo', nextStep: 'passo_4_tecido_rolo' },
            { label: 'Persiana Romana', image: '/modelos/persiana-romana.webp', description: 'Elegante, o tecido dobra-se em camadas horizontais conforme é suspensa.', value: 'romana', nextStep: 'passo_4_tecido_romana' },
            { label: 'Persiana Double Vision', image: '/modelos/persiana-double-vision-vertical.webp', description: 'Faixas alternadas que permitem ver o exterior ou fechar totalmente a visão.', value: 'double_vision', nextStep: 'passo_4_tecido_double' },
            { label: 'Persiana Vertical', image: '/modelos/persiana-vertical.webp', description: 'Lâminas que giram e correm lateralmente, ideal para grandes vãos e escritórios.', value: 'vertical', nextStep: 'passo_4_tecido_vertical' },
            { label: 'Horizontal de Madeira', image: '/modelos/horizontal-madeira.webp', description: 'Sofisticada e térmica, traz um visual nobre e rústico ao ambiente.', value: 'madeira', nextStep: 'passo_4_tecido_madeira' },
            { label: 'Horizontal de Alumínio', image: '/modelos/horizontal-aluminio.webp', description: 'Funcional e resistente à umidade, ótima para cozinhas e banheiros.', value: 'aluminio', nextStep: 'passo_4_tecido_aluminio' },
            { label: 'Persiana de Teto', image: '/modelos/persiana-teto.webp', description: 'Feita sob medida para controlar o sol em claraboias e tetos de vidro.', value: 'teto', nextStep: 'passo_4_modelo_teto' },
            { label: 'Persiana Painel', image: '/modelos/persiana-painel.webp', description: 'Painéis largos que correm lateralmente, ideal para portas de varanda.', value: 'painel', nextStep: 'passo_4_tecido_painel' },
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
        options: PASSO_4_TECIDO_ROLO_OPTIONS
    },

    // [FASE 4.2] TECIDOS ROMANA
    {
        id: 'passo_4_tecido_romana',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Romana:',
        type: 'radio',
        options: PASSO_4_TECIDO_ROMANA_OPTIONS
    },

    // [FASE 4.3] TECIDOS DOUBLE VISION
    {
        id: 'passo_4_tecido_double',
        phase: 4,
        question: 'Escolha o tecido para sua Double Vision:',
        type: 'radio',
        options: PASSO_4_TECIDO_DOUBLE_OPTIONS
    },

    // [FASE 4.4] TECIDOS VERTICAL
    {
        id: 'passo_4_tecido_vertical',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Vertical:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio', image: '/tecidos/vertical-01-blackout.png' },
            { label: 'PVC Blackout', description: 'Lâminas em PVC opaco, fáceis de limpar, alta durabilidade e ótimo custo-benefício em áreas úmidas.', value: 'pvc_blackout', nextStep: 'passo_5_estagio', image: '/tecidos/vertical-02-pvc-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio', image: '/tecidos/vertical-03-translucida.png' },
            { label: 'Decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_5_estagio', image: '/tecidos/vertical-04-decorativo.png' },
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
            { label: 'Madeira natural com cadarço', description: 'Persiana clássica de lâminas largas com cadarço aparente, une beleza natural e controle eficiente da luz.', value: 'natural_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-01-madeira-natural-50mm-cadarco.png' },
            { label: 'Madeira natural com fita', description: 'Versão com fitas têxteis largas que cobrem os furos, oferecendo acabamento sofisticado e mais privacidade.', value: 'natural_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-02-madeira-natural-50mm-fita.png' },
            { label: 'Eco wood com cadarço', description: 'Persiana sustentável feita com composto sintético e fibras recicláveis, resistente à umidade e fácil de limpar.', value: 'eco_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-03-eco-wood-cadarco.png' },
            { label: 'Eco wood com fita', description: 'Versão com fitas têxteis que aumentam a privacidade e o apelo decorativo, mantendo o caráter ecológico.', value: 'eco_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-04-eco-wood-fita.png' },
            { label: 'Bambu com cadarço', description: 'Persiana natural de bambu trançado, com cadarços aparentes e textura leve e tropical.', value: 'bambu_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-05-bambu-cadarco.png' },
            { label: 'Bambu com fita', description: 'Modelo com fitas de tecido decorativas, que trazem toque artesanal e sofisticação ao estilo natural do bambu.', value: 'bambu_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-06-bambu-fita.png' },
            { label: 'PVC com cadarço', description: 'Persiana em PVC com cadarço aparente, resistente à umidade e fácil de limpar.', value: 'pvc_cadarco', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-07-pvc-cadarco.png' },
            { label: 'PVC com fita', description: 'Versão em PVC com fitas têxteis, acabamento discreto e maior privacidade.', value: 'pvc_fita', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-madeira-08-pvc-fita.png' },
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
            { label: 'Lâmina 16 mm (micro)', description: 'Lâminas finas e delicadas, ideais para janelas pequenas ou portas de vidro.', value: 'lamina_16', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-01-lamina-16mm-micro.png' },
            { label: 'Lâmina 25 mm (padrão)', description: 'Modelo mais comum, permite bom controle da luz e ventilação.', value: 'lamina_25', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-02-lamina-25mm-padrao.png' },
            { label: 'Lâmina (larga)', description: 'Visual moderno e robusto, com maior espaçamento entre as lâminas.', value: 'lamina_50', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-03-lamina-50mm-larga.png' },
            { label: 'Perfurada (micro furos)', description: 'Lâminas com microperfurações que suavizam a entrada de luz e calor.', value: 'perfurada', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-04-perfurada-micro-furos.png' },
            { label: 'Acabamento brilhante ou metálico', description: 'Efeito decorativo, com brilho e reflexão de luz.', value: 'brilhante', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-05-acabamento-brilhante-metalico.png' },
            { label: 'Acabamento fosco ou acetinado', description: 'Visual discreto e sofisticado, reduz reflexos.', value: 'fosco', nextStep: 'passo_3_acionamento', image: '/tecidos/horizontal-aluminio-06-acabamento-fosco-acetinado.png' },
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
            { label: 'Romana de Teto', description: 'Sistema com dobras horizontais elegantes, ideal para claraboias e tetos de vidro, proporcionando charme e controle de luz.', value: 'romana_teto', nextStep: 'passo_4_tecido_teto_romana', image: '/modelos/teto-romana.png' },
            { label: 'Celular de Teto', description: 'Tecido com estrutura colmeia (celular) que cria isolamento natural, garantindo eficiência térmica e controle de luminosidade.', value: 'celular_teto', nextStep: 'passo_4_tecido_teto_celular', image: '/modelos/teto-celular.png' },
            { label: 'Plissada de Teto', description: 'Modelo com tecido em pregas finas que se recolhem suavemente, oferecendo leveza, difusão de luz e conforto térmico.', value: 'plissada_teto', nextStep: 'passo_4_tecido_teto_plissada', image: '/modelos/teto-plissada.png' },
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
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/romana-teto-01-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/romana-teto-02-translucida.png' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_3_acionamento', image: '/tecidos/romana-teto-03-tela-solar-1pct.png' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_3_acionamento', image: '/tecidos/romana-teto-04-tela-solar-3pct.png' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_3_acionamento', image: '/tecidos/romana-teto-05-tela-solar-5pct.png' },
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
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/celular-teto-01-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/celular-teto-02-translucida.png' },
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
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_3_acionamento', image: '/tecidos/plissada-teto-01-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_3_acionamento', image: '/tecidos/plissada-teto-02-translucida.png' },
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
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio', image: '/tecidos/painel-01-blackout.png' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio', image: '/tecidos/painel-02-translucida.png' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_5_estagio', image: '/tecidos/painel-03-tela-solar-1pct.png' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_5_estagio', image: '/tecidos/painel-04-tela-solar-3pct.png' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_5_estagio', image: '/tecidos/painel-05-tela-solar-5pct.png' },
            { label: 'Decorativa/Texturizada', description: 'Estética refinada com texturas que valorizam a decoração do ambiente.', value: 'decorativa', nextStep: 'passo_5_estagio', image: '/tecidos/painel-06-decorativa.png' },
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
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/cortina-01-blackout.png' },
            { label: 'Semi-Blackout 70%', description: 'Mantém cerca de 70% da luminosidade.', value: 'semi_blackout_70', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/cortina-02-semi-blackout-70pct.png' },
            { label: 'Translúcido Voil', description: 'Cortina leve, com excelente passagem de luz natural.', value: 'voil', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/cortina-03-translucido-voil.png' },
            { label: 'Translúcido de Linho', description: 'Cortina com visual mais encorpado e sofisticado, mantendo translucidez e trazendo textura natural ao ambiente.', value: 'linho', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/cortina-04-translucido-linho.png' },
            { label: 'Cortina Dupla (Voil + Blackout)', description: 'Combinação funcional e elegante: o voil garante leveza durante o dia e o blackout proporciona bloqueio de luz e privacidade quando necessário.', value: 'dupla', nextStep: 'passo_4_acabamento_cortina', image: '/tecidos/cortina-05-dupla-voil-blackout.png' },
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
            { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-01-ilhos.png' },
            { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-02-wave-ripplefold.png' },
            { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-03-prega-americana.png' },
            { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-04-prega-macho.png' },
            { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-05-prega-femea.png' },
            { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-06-prega-franzida.png' },
            { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
        ],
        optionsByTecido: {
            blackout: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-01-ilhos.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-02-wave-ripplefold.png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-03-prega-americana.png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-04-prega-macho.png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-05-prega-femea.png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-blackout-06-prega-franzida.png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            semi_blackout_70: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-01-ilhos.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-02-wave-ripplefold.png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-03-prega-americana.png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-04-prega-macho.png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-05-prega-femea.png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-semi-blackout-70pct-06-prega-franzida.png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            voil: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-01-ilhos.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-02-wave-ripplefold.png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-03-prega-americana.png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-04-prega-macho.png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-05-prega-femea.png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-voil-06-prega-franzida.png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            linho: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-01-ilhos.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-02-wave-ripplefold.png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-03-prega-americana.png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-04-prega-macho.png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-05-prega-femea.png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-translucida-linho-06-prega-franzida.png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ],
            dupla: [
                { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-01-ilhos.png' },
                { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-02-wave-ripplefold.png' },
                { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-03-prega-americana.png' },
                { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-04-prega-macho.png' },
                { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-05-prega-femea.png' },
                { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_3_acionamento', image: '/tecidos/cortina-dupla-voil-blackout-06-prega-franzida.png' },
                { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
            ]
        }
    },

    // [FASE 5] ESTÁGIO
    {
        id: 'passo_5_estagio',
        phase: 5,
        question: 'Você já tem as medidas?',
        subtext: 'Medidas aproximadas são suficientes. Confirmamos na visita técnica.',
        type: 'radio',
        options: [
            { label: 'Sim, já tenho as medidas', value: 'orcamento', nextStep: 'passo_6_medidas' },
            { label: 'Não, ainda não tenho as medidas', value: 'catalogo', nextStep: 'passo_8_captura_catalogo' }
        ]
    },

    // [FASE 6] MEDIDAS
    {
        id: 'passo_6_medidas',
        phase: 6,
        question: 'Envie as medidas necessárias',
        subtext: '*Medidas aproximadas são suficientes. Confirmamos na visita técnica sem custo adicional.',
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
        question: 'Deseja adicionar mais persianas ou cortinas?',
        subtext: 'Você pode informar outras peças ou seguir com o pré-orçamento atual.',
        type: 'mixed',
        inputs: [],
        options: [
            { label: 'Adicionar outra persiana/cortina', value: 'adicionar_outro', nextStep: 'passo_7_adicionar_item' },
            { label: 'Finalizar', value: 'finalizar', nextStep: 'passo_8_captura' }
        ]
    },

    // [FASE 8] CAPTURA FINAL
    {
        id: 'passo_8_captura',
        phase: 8,
        question: 'Perfeito! Para te enviar este pré-orçamento',
        subtext: 'Preencha seus dados para receber a estimativa. O valor final será confirmado após visita técnica.',
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

    // [FASE 8 Alternate] CAPTURA CATÁLOGO (Opção 5 — Não sei - Quero Recomendação)
    {
        id: 'passo_8_captura_catalogo',
        phase: 8,
        question: 'Receber Catálogo',
        subtext: 'Preencha seus dados para receber o catálogo com todas as opções e sugestões personalizadas.',
        type: 'mixed',
        inputs: [
            { id: 'nome', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
            { id: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
            { id: 'cidade', label: 'Cidade', placeholder: 'São Paulo' },
            { id: 'bairro', label: 'Bairro', placeholder: 'Centro' },
            {
                id: 'acionamento',
                label: 'Você prefere manual ou automática?',
                type: 'radio',
                options: [
                    { label: 'Manual (corrente, haste ou bastão)', value: 'manual' },
                    { label: 'Motorizada', value: 'motorizada' },
                    { label: 'Ainda não sei', value: 'nao_sei' }
                ]
            },
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
