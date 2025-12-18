export const STEPS = [
    // [FASE 1] INTENÇÃO DO USUÁRIO
    {
        id: 'step_1_intention',
        phase: 1,
        question: 'Você já sabe exatamente o que precisa ou gostaria de ver as opções disponíveis?',
        subtext: 'ex: Persiana Rolô blackout tamanho 1,50m x 1,50m',
        type: 'radio',
        options: [
            { label: 'Quero ver as opções disponíveis', value: 'browse', nextStep: 'step_2_environment' },
            { label: 'Já sei o tipo de persiana/cortina e tenho as medidas e quero falar direto com um atendente', value: 'direct', nextStep: 'step_8_capture' } // Shortcut
        ]
    },

    // [FASE 2] AMBIENTE (Loop Start)
    {
        id: 'step_2_environment',
        phase: 2,
        question: 'Em qual ambiente você quer instalar essa persiana ou cortina?',
        subtext: 'Informe primeiro sobre a primeira persiana que deseja orçar',
        type: 'radio',
        options: [
            { label: 'Varanda / Sacada / Área externa Envidraçada', value: 'varanda', nextStep: 'step_3_action' },
            { label: 'Quarto', value: 'quarto', nextStep: 'step_3_action' },
            { label: 'Sala de Estar / Jantar', value: 'sala', nextStep: 'step_3_action' },
            { label: 'Cozinha / Área Gourmet', value: 'cozinha', nextStep: 'step_3_action' },
            { label: 'Banheiro / Lavabo', value: 'banheiro', nextStep: 'step_3_action' },
            { label: 'Escritório / Home Office', value: 'escritorio', nextStep: 'step_3_action' },
            { label: 'Outro', value: 'outro', nextStep: 'step_3_action' }
        ]
    },

    // [FASE 3] ACIONAMENTO
    {
        id: 'step_3_action',
        phase: 3,
        question: 'Você gostaria dessa persiana manual ou automática?',
        type: 'radio',
        options: [
            { label: 'Manual (com corrente, haste ou bastão)', value: 'manual', nextStep: 'step_4_fabric' },
            { label: 'Motorizada', value: 'motorizada', nextStep: 'step_4_fabric' },
            { label: 'Ainda não sei', value: 'dunno', nextStep: 'step_4_fabric' }
        ]
    },

    // [FASE 4] TECIDO
    {
        id: 'step_4_fabric',
        phase: 4,
        question: 'Tipo de Tecido',
        type: 'radio',
        options: [
            { label: 'Blackout — Bloqueia 100% da luz.', value: 'blackout', nextStep: 'step_5_stage' },
            { label: 'Semi Blackout — Reduz significativamente a luz.', value: 'semi_blackout', nextStep: 'step_5_stage' },
            { label: 'Translúcido — Filtra a luz suavemente.', value: 'translucido', nextStep: 'step_5_stage' },
            { label: 'Tela Solar 1% — Privacidade máxima.', value: 'screen_1', nextStep: 'step_5_stage' },
            { label: 'Tela Solar 3% — Equilíbrio visibilidade/proteção.', value: 'screen_3', nextStep: 'step_5_stage' },
            { label: 'Tela Solar 5% — Visão externa e luz.', value: 'screen_5', nextStep: 'step_5_stage' },
            { label: 'Decorativo — Foco estético.', value: 'decorative', nextStep: 'step_5_stage' },
            { label: 'Outros — Antichama, etc.', value: 'others', nextStep: 'step_5_stage' },
            { label: 'Ainda não sei — Quero recomendação.', value: 'dunno', nextStep: 'step_5_stage' }
        ]
    },

    // [FASE 5] ESTÁGIO
    {
        id: 'step_5_stage',
        phase: 5,
        question: 'Em que fase você está agora?',
        type: 'radio',
        options: [
            { label: 'Já tenho as medidas e quero um pré-orçamento', value: 'budget', nextStep: 'step_6_measurements' },
            { label: 'Estou apenas pesquisando ideias e quero receber um catálogo', value: 'catalog', nextStep: 'step_8_capture_catalog' }
        ]
    },

    // [FASE 6] MEDIDAS
    {
        id: 'step_6_measurements',
        phase: 6,
        question: 'Perfeito! Envie suas medidas abaixo',
        subtext: 'Informe largura e altura de cada janela (cm). Não precisam ser exatas.',
        type: 'mixed', // Inputs + Next Button
        inputs: [
            { id: 'width', label: 'Largura', placeholder: 'Ex: 120 cm' },
            { id: 'height', label: 'Altura', placeholder: 'Ex: 140 cm' },
            { id: 'urgency', label: 'Nível de Urgência', type: 'select', options: ['O quanto antes (Urgente)', 'Nos próximos 30 dias', 'Estou em obra (Sem pressa)', 'Apenas pesquisando'] }
        ],
        nextStep: 'step_7_photo'
    },

    // [FASE 7] FOTO + PROSSEGUIR
    {
        id: 'step_7_photo',
        phase: 7,
        question: 'Caso deseje, pode escolher uma nova persiana/cortina ou pode prosseguir para próxima etapa!',
        subtext: 'Escolha como prosseguir.',
        type: 'mixed',
        inputs: [], // Photo upload removed
        options: [
            { label: 'Informar sobre outra persiana (Adicionar novo item)', value: 'add_another', action: 'loop' },
            { label: 'Seguir somente com este orçamento', value: 'finish', nextStep: 'step_8_capture' }
        ]
    },

    // [FASE 8] CAPTURA FINAL (Pré-Orçamento)
    {
        id: 'step_8_capture',
        phase: 8,
        question: 'Perfeito! Para te enviar este pré orçamento',
        subtext: 'Preencha seus dados para receber as sugestões.',
        type: 'mixed',
        inputs: [
            { id: 'name', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
            { id: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
            { id: 'city', label: 'Cidade', placeholder: 'São Paulo' },
            { id: 'neighborhood', label: 'Bairro', placeholder: 'Centro' },
            {
                id: 'environments',
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
        id: 'step_8_capture_catalog',
        phase: 8,
        question: 'Receber Catálogo',
        subtext: 'Preencha seus dados para receber o catálogo com todas as opções.',
        type: 'mixed',
        inputs: [
            { id: 'name', label: 'Nome', placeholder: 'Seu nome' },
            { id: 'whatsapp', label: 'WhatsApp com DDD', placeholder: '(11) 99999-9999' },
            { id: 'environments', label: 'Qual(is) ambiente(s) deseja?', placeholder: 'Ex: Sala e Quarto' }
        ],
        isFinal: true
    }
];
