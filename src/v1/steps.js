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
            { label: 'Manual (com corrente, haste ou bastão)', value: 'manual', nextStep: 'passo_4_modelo' },
            { label: 'Motorizada', value: 'motorizada', nextStep: 'passo_4_modelo' },
            { label: 'Ainda não sei', value: 'nao_sei', nextStep: 'passo_4_modelo' }
        ]
    },

    // [FASE 4] MODELO (Adicionado para V1 para suportar imagens e fluxo unificado)
    {
        id: 'passo_4_modelo',
        phase: 4,
        question: 'Qual modelo você prefere?',
        type: 'radio',
        options: [
            { label: 'Persiana Rolô', image: '/modelos/Persiana Rolô.webp', value: 'rolo', nextStep: 'passo_4_tecido' },
            { label: 'Persiana Romana', image: '/modelos/Persiana Romana.webp', value: 'romana', nextStep: 'passo_4_tecido' },
            { label: 'Persiana Double Vision', image: '/modelos/Persiana Double Vision  Persiana Vertical.webp', value: 'double_vision', nextStep: 'passo_4_tecido' },
            { label: 'Persiana Vertical', image: '/modelos/Persiana Vertical.webp', value: 'vertical', nextStep: 'passo_4_tecido' },
            { label: 'Horizontal de Madeira', image: '/modelos/Horizontal de Madeira.webp', value: 'madeira', nextStep: 'passo_4_tecido' },
            { label: 'Horizontal de Alumínio', image: '/modelos/Horizontal de Alumínio.webp', value: 'aluminio', nextStep: 'passo_4_tecido' },
            { label: 'Persiana de Teto', image: '/modelos/Persiana de Teto.webp', value: 'teto', nextStep: 'passo_4_tecido' },
            { label: 'Persiana Painel', image: '/modelos/Persiana Painel.webp', value: 'painel', nextStep: 'passo_4_tecido' },
            { label: 'Cortina', image: '/modelos/Cortina.webp', value: 'cortina', nextStep: 'passo_4_tecido' }
        ]
    },

    // [FASE 4] TECIDO
    {
        id: 'passo_4_tecido',
        phase: 4,
        question: 'Tipo de Tecido',
        type: 'radio',
        options: [
            { label: 'Blackout — Bloqueia 100% da luz.', value: 'blackout', nextStep: 'passo_5_estagio' },
            { label: 'Semi Blackout — Reduz significativamente a luz.', value: 'semi_blackout', nextStep: 'passo_5_estagio' },
            { label: 'Translúcido — Filtra a luz suavemente.', value: 'translucido', nextStep: 'passo_5_estagio' },
            { label: 'Tela Solar 1% — Privacidade máxima.', value: 'tela_solar_1', nextStep: 'passo_5_estagio' },
            { label: 'Tela Solar 3% — Equilíbrio visibilidade/proteção.', value: 'tela_solar_3', nextStep: 'passo_5_estagio' },
            { label: 'Tela Solar 5% — Visão externa e luz.', value: 'tela_solar_5', nextStep: 'passo_5_estagio' },
            { label: 'Decorativo — Foco estético.', value: 'decorativo', nextStep: 'passo_5_estagio' },
            { label: 'Outros — Antichama, etc.', value: 'outros', nextStep: 'passo_5_estagio' },
            { label: 'Ainda não sei — Quero recomendação.', value: 'nao_sei', nextStep: 'passo_5_estagio' }
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
        subtext: '*Não se preocupe, essas informações são apenas para você receber um pré orçamento. Antes de enviar para produção, um técnico da nossa equipe vai até o local para tirar as medidas exatas e confirmar tudo com você, sem custo adicional.',
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
