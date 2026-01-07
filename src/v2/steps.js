export const STEPS = [
    // [FASE 1] INTENÇÃO DO USUÁRIO
    {
        id: 'passo_1_intencao',
        phase: 1,
        question: 'Você já sabe exatamente o que precisa ou gostaria de ver as opções disponíveis?',
        subtext: 'ex: Persiana Rolô blackout tamanho 1,50m x 1,50m',
        type: 'radio',
        options: [
            { label: 'Quero ver as opções disponíveis', value: 'ver_opcoes', nextStep: 'passo_2_ambiente' },
            { label: 'Já sei o tipo de persiana/cortina e tenho as medidas e quero falar direto com um atendente', value: 'direto_atendente', nextStep: 'passo_8_captura' }
        ]
    },

    // [FASE 2] AMBIENTE
    {
        id: 'passo_2_ambiente',
        phase: 2,
        question: 'Em qual ambiente você quer instalar essa persiana ou cortina?',
        subtext: 'Informe primeiro sobre a primeira persiana que deseja orçar',
        type: 'radio',
        options: [
            { label: 'Varanda / Sacada / Área externa Envidraçada', value: 'varanda', nextStep: 'passo_3_acionamento' },
            { label: 'Quarto', value: 'quarto', nextStep: 'passo_3_acionamento' },
            { label: 'Sala de Estar / Jantar', value: 'sala', nextStep: 'passo_3_acionamento' },
            { label: 'Cozinha / Área Gourmet', value: 'cozinha', nextStep: 'passo_3_acionamento' },
            { label: 'Banheiro / Lavabo', value: 'banheiro', nextStep: 'passo_3_acionamento' },
            { label: 'Escritório / Home Office', value: 'escritorio', nextStep: 'passo_3_acionamento' },
            { label: 'Outro', value: 'outro', nextStep: 'passo_3_acionamento' }
        ]
    },

    // [FASE 3] ACIONAMENTO
    {
        id: 'passo_3_acionamento',
        phase: 3,
        question: 'Você gostaria dessa persiana manual ou automática?',
        type: 'radio',
        options: [
            { label: 'Manual (com corrente, haste ou bastão)', value: 'manual', nextStep: 'passo_4_modelo' },
            { label: 'Motorizada', value: 'motorizada', nextStep: 'passo_4_modelo' },
            { label: 'Ainda não sei', value: 'nao_sei', nextStep: 'passo_4_modelo' }
        ]
    },

    // [FASE 4] MODELO
    {
        id: 'passo_4_modelo',
        phase: 4,
        question: 'Qual modelo você prefere?',
        type: 'radio',
        options: [
            { label: 'Persiana Rolô', description: 'Prática e minimalista, o tecido enrola totalmente no topo quando aberta.', value: 'rolo', nextStep: 'passo_4_tecido_rolo' },
            { label: 'Persiana Romana', description: 'Elegante, o tecido dobra-se em camadas horizontais conforme é suspensa.', value: 'romana', nextStep: 'passo_4_tecido_romana' },
            { label: 'Persiana Double Vision', description: 'Faixas alternadas que permitem ver o exterior ou fechar totalmente a visão.', value: 'double_vision', nextStep: 'passo_4_tecido_double' },
            { label: 'Persiana Vertical', description: 'Lâminas que giram e correm lateralmente, ideal para grandes vãos e escritórios.', value: 'vertical', nextStep: 'passo_4_tecido_vertical' },
            { label: 'Horizontal de Madeira', description: 'Sofisticada e térmica, traz um visual nobre e rústico ao ambiente.', value: 'madeira', nextStep: 'passo_4_tecido_madeira' },
            { label: 'Horizontal de Alumínio', description: 'Funcional e resistente à umidade, ótima para cozinhas e banheiros.', value: 'aluminio', nextStep: 'passo_4_tecido_aluminio' },
            { label: 'Persiana de Teto', description: 'Feita sob medida para controlar o sol em claraboias e tetos de vidro.', value: 'teto', nextStep: 'passo_4_modelo_teto' },
            { label: 'Persiana Painel', description: 'Painéis largos que correm lateralmente, ideal para portas de varanda.', value: 'painel', nextStep: 'passo_4_tecido_painel' },
            { label: 'Cortina', description: 'Tecido tradicional em varão ou trilho, focada em aconchego e volume decorativo.', value: 'cortina', nextStep: 'passo_4_tecido_cortina' }
        ]
    },

    // [FASE 4.1] TECIDOS ROLÔ
    {
        id: 'passo_4_tecido_rolo',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Rolô:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Tecido FR Blackout', description: 'Blackout com proteção anti-chama certificada.', value: 'fr_blackout', nextStep: 'passo_5_estagio' },
            { label: 'Semi-blackout', description: 'Nível intermediário de luz, com leve escurecimento.', value: 'semi_blackout', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' },
            { label: 'Tecido decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_5_estagio' },
            { label: 'Tecido FR Translúcido', description: 'Translúcido com retardante de chama para maior segurança.', value: 'fr_translucido', nextStep: 'passo_5_estagio' },
            { label: 'Hospitalar Antimicrobiano', description: 'Superfície higiênica, alta privacidade e bloqueio de luz.', value: 'hospitalar', nextStep: 'passo_5_estagio' },
            { label: 'Screen Metalizado 1%', description: 'Máximo controle de luz e calor para áreas muito ensolaradas.', value: 'metalizado_1', nextStep: 'passo_5_estagio' },
            { label: 'Screen Metalizado 3%', description: 'Reduz ofuscamento e calor, mantendo parte da vista externa.', value: 'metalizado_3', nextStep: 'passo_5_estagio' },
            { label: 'Screen Metalizado 5%', description: 'Combina controle solar com maior transparência e conforto visual.', value: 'metalizado_5', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.2] TECIDOS ROMANA
    {
        id: 'passo_4_tecido_romana',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Romana:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Semi-blackout', description: 'Nível intermediário de luz, com leve escurecimento.', value: 'semi_blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_5_estagio' },
            { label: 'Tecido decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.3] TECIDOS DOUBLE VISION
    {
        id: 'passo_4_tecido_double',
        phase: 4,
        question: 'Escolha o tecido para sua Double Vision:',
        type: 'radio',
        options: [
            { label: 'Blackout com translucido', description: 'Combina faixas blackout e transparentes em sistema duplo, permitindo alternar entre escuro total, luz parcial e visão externa.', value: 'blackout_translucido', nextStep: 'passo_5_estagio' },
            { label: 'Semi-Blackout com translucido', description: 'Faixas opacas mais densas, reduzem bem a luminosidade.', value: 'semi_blackout_translucido', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.4] TECIDOS VERTICAL
    {
        id: 'passo_4_tecido_vertical',
        phase: 4,
        question: 'Escolha o tecido para sua Persiana Vertical:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'PVC Blackout', description: 'Lâminas em PVC opaco, fáceis de limpar, alta durabilidade e ótimo custo-benefício em áreas úmidas.', value: 'pvc_blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' },
            { label: 'Tecido decorativo', description: 'Foco estético, com leve filtragem de luz e acabamento visual.', value: 'decorativo', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.5] TECIDOS MADEIRA
    {
        id: 'passo_4_tecido_madeira',
        phase: 4,
        question: 'Escolha o acabamento para sua Persiana de Madeira:',
        type: 'radio',
        options: [
            { label: 'Madeira natural 50 mm com cadarço', description: 'Persiana clássica de lâminas largas com cadarço aparente, une beleza natural e controle eficiente da luz.', value: 'natural_cadarco', nextStep: 'passo_5_estagio' },
            { label: 'Madeira natural 50 mm com fita', description: 'Versão com fitas têxteis largas que cobrem os furos, oferecendo acabamento sofisticado e mais privacidade.', value: 'natural_fita', nextStep: 'passo_5_estagio' },
            { label: 'Eco wood com cadarço', description: 'Persiana sustentável feita com composto sintético e fibras recicláveis, resistente à umidade e fácil de limpar.', value: 'eco_cadarco', nextStep: 'passo_5_estagio' },
            { label: 'Eco wood com fita', description: 'Versão com fitas têxteis que aumentam a privacidade e o apelo decorativo, mantendo o caráter ecológico.', value: 'eco_fita', nextStep: 'passo_5_estagio' },
            { label: 'Bambu com cadarço', description: 'Persiana natural de bambu trançado, com cadarços aparentes e textura leve e tropical.', value: 'bambu_cadarco', nextStep: 'passo_5_estagio' },
            { label: 'Bambu com fita', description: 'Modelo com fitas de tecido decorativas, que trazem toque artesanal e sofisticação ao estilo nautral do bambu.', value: 'bambu_fita', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.6] TECIDOS ALUMÍNIO
    {
        id: 'passo_4_tecido_aluminio',
        phase: 4,
        question: 'Escolha o acabamento para sua Persiana de Alumínio:',
        type: 'radio',
        options: [
            { label: 'Lâmina 16 mm (micro)', description: 'Lâminas finas e delicadas, ideais para janelas pequenas ou portas de vidro.', value: 'lamina_16', nextStep: 'passo_5_estagio' },
            { label: 'Lâmina 25 mm (padrão)', description: 'Modelo mais comum, permite bom controle da luz e ventilação.', value: 'lamina_25', nextStep: 'passo_5_estagio' },
            { label: 'Lâmina 50 mm (larga)', description: 'Visual moderno e robusto, com maior espaçamento entre as lâminas.', value: 'lamina_50', nextStep: 'passo_5_estagio' },
            { label: 'Perfurada (micro furos)', description: 'Lâminas com microperfurações que suavizam a entrada de luz e calor.', value: 'perfurada', nextStep: 'passo_5_estagio' },
            { label: 'Acabamento brilhante ou métalico', description: 'Efeito decorativo, com brilho e reflexão de luz.', value: 'brilhante', nextStep: 'passo_5_estagio' },
            { label: 'Acabamento fosco ou acetinado', description: 'Visual discreto e sofisticado, reduz reflexos.', value: 'fosco', nextStep: 'passo_5_estagio' },
            { label: 'Tonalidade amadeirada', description: 'Alumínio pintado imitando madeira, une resistência e estética natural.', value: 'amadeirada', nextStep: 'passo_5_estagio' },
            { label: 'Com fita têxtil decorativa', description: 'Fitas largas de tecido que cobrem os furos das lâminas, aumentando a privacidade.', value: 'fita_decorativa', nextStep: 'passo_5_estagio' }
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
            { label: 'Persianas celular de teto', description: 'Tecido com estrutura colmeia (celular) que cria isolamento natural, garantindo eficiência térmica e controle de luminosidade.', value: 'celular_teto', nextStep: 'passo_4_tecido_teto_celular' },
            { label: 'Persianas plissadas de teto', description: 'Modelo com tecido em pregas finas que se recolhem suavemente, oferecendo leveza, difusão de luz e conforto térmico.', value: 'plissada_teto', nextStep: 'passo_4_tecido_teto_plissada' }
        ]
    },

    // [FASE 4.7.1] TECIDOS TETO ROMANA
    {
        id: 'passo_4_tecido_teto_romana',
        phase: 4,
        question: 'Escolha o tecido para sua Romana de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: 'passo_5_estagio' },
            { label: 'Tela solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7.2] TECIDOS TETO CELULAR
    {
        id: 'passo_4_tecido_teto_celular',
        phase: 4,
        question: 'Escolha o tecido para sua Celular de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.7.3] TECIDOS TETO PLISSADA
    {
        id: 'passo_4_tecido_teto_plissada',
        phase: 4,
        question: 'Escolha o tecido para sua Plissada de Teto:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: 'passo_5_estagio' }
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
            { label: 'Decorativa/Texturizada', description: 'Estética refinada com texturas que valorizam a decoração do ambiente.', value: 'decorativa', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 4.9] TECIDOS CORTINA
    {
        id: 'passo_4_tecido_cortina',
        phase: 4,
        question: 'Escolha o tecido para sua Cortina:',
        type: 'radio',
        options: [
            { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: 'passo_4_acabamento_cortina' },
            { label: 'Semi-blacKout 70%', description: 'Mantém cerca de 70% da luminosidade.', value: 'semi_blackout_70', nextStep: 'passo_4_acabamento_cortina' },
            { label: 'Translúcido Voil', description: 'Cortina leve, com excelente passagem de luz natural.', value: 'voil', nextStep: 'passo_4_acabamento_cortina' },
            { label: 'Translúcido de Linho', description: 'Cortina com visual mais encorpado e sofisticado, mantendo translucidez e trazendo textura natural ao ambiente.', value: 'linho', nextStep: 'passo_4_acabamento_cortina' },
            { label: 'Cortina Dupla (Voil + Blackout)', description: 'Combinação funcional e elegante: o voil garante leveza durante o dia e o blackout proporciona bloqueio de luz e privacidade quando necessário.', value: 'dupla', nextStep: 'passo_4_acabamento_cortina' }
        ]
    },

    // [FASE 4.9.1] ACABAMENTO CORTINA
    {
        id: 'passo_4_acabamento_cortina',
        phase: 4,
        question: 'Escolha o acabamento para sua Cortina:',
        type: 'radio',
        options: [
            { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', nextStep: 'passo_5_estagio' },
            { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', nextStep: 'passo_5_estagio' },
            { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', nextStep: 'passo_5_estagio' },
            { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', nextStep: 'passo_5_estagio' },
            { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', nextStep: 'passo_5_estagio' },
            { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', nextStep: 'passo_5_estagio' }
        ]
    },

    // [FASE 5] ESTÁGIO
    {
        id: 'passo_5_estagio',
        phase: 5,
        question: 'Em que fase você está agora?',
        type: 'radio',
        options: [
            { label: 'Já tenho as medidas e quero um pré-orçamento', value: 'orcamento', nextStep: 'passo_6_medidas' },
            { label: 'Estou apenas pesquisando ideias e quero receber um catálogo', value: 'catalogo', nextStep: 'passo_8_captura_catalogo' }
        ]
    },

    // [FASE 6] MEDIDAS
    {
        id: 'passo_6_medidas',
        phase: 6,
        question: 'Perfeito! Envie suas medidas abaixo',
        subtext: 'Informe largura e altura de cada janela (cm). Não precisam ser exatas.',
        type: 'mixed',
        inputs: [
            { id: 'largura', label: 'Largura', placeholder: 'Ex: 120', suffix: 'cm' },
            { id: 'altura', label: 'Altura', placeholder: 'Ex: 140', suffix: 'cm' },
            { id: 'urgencia', label: 'Nível de Urgência', type: 'select', options: ['O quanto antes (Urgente)', 'Nos próximos 30 dias', 'Estou em obra (Sem pressa)', 'Apenas pesquisando'] }
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
            { label: 'Informar sobre outra persiana (Adicionar novo item)', value: 'adicionar_outro', action: 'loop' },
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
        question: 'Receber Catálogo',
        subtext: 'Preencha seus dados para receber o catálogo com todas as opções.',
        type: 'mixed',
        inputs: [
            { id: 'nome', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
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
