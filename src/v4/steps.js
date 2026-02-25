/**
 * Definições de steps do Quiz V4 (por ambiente - só recomendados).
 * Opções dos passos passo_2_modelo e passo_3_tecido são preenchidas em runtime a partir de ambienteQuizData.
 */

export const STEPS = [
  {
    id: 'passo_1_ambiente',
    phase: 1,
    question: 'Para qual ambiente você está buscando sua Cortina/Persiana?',
    subtext: 'Escolha o ambiente para ver modelos e tecidos recomendados.',
    type: 'radio',
    nextStep: 'passo_2_modelo',
  },
  {
    id: 'passo_2_modelo',
    phase: 2,
    question: 'Escolha o modelo ideal para você:',
    subtext: 'Modelos recomendados para o ambiente escolhido.',
    type: 'radio',
    options: [], // preenchido em runtime por getModelosPorAmbiente(ambiente)
  },
  {
    id: 'passo_3_tecido',
    phase: 3,
    question: 'Escolha o tecido:',
    subtext: 'Tecidos recomendados para o modelo e ambiente.',
    type: 'radio',
    options: [], // preenchido em runtime por getTecidosPorAmbienteModelo(ambiente, modelo)
  },
  {
    id: 'passo_4_acabamento',
    phase: 4,
    question: 'Escolha o acabamento:',
    subtext: 'Acabamento para sua cortina.',
    type: 'radio',
    options: [], // preenchido com ACABAMENTO_CORTINA_OPTIONS no componente
  },
  {
    id: 'passo_5_acionamento',
    phase: 5,
    question: 'Como você prefere o acionamento?',
    subtext: 'Manual ou motorizada.',
    type: 'radio',
    options: [], // preenchido com ACIONAMENTO_OPTIONS (filtrado se Painel/Vertical)
  },
  {
    id: 'passo_6_medidas',
    phase: 6,
    question: 'Informe as medidas da sua janela/porta:',
    subtext: '*Medidas aproximadas são suficientes. Confirmamos na visita técnica sem custo adicional.',
    type: 'medidas',
    inputs: [
      { id: 'largura', label: 'Largura', placeholder: 'Ex: 120', suffix: 'cm', required: true },
      { id: 'altura', label: 'Altura', placeholder: 'Ex: 140', suffix: 'cm', required: true },
    ],
    nextStep: 'passo_7_observacoes',
  },
  {
    id: 'passo_7_observacoes',
    phase: 7,
    question: 'Observações ou outros ambientes para orçar:',
    subtext: 'Campo opcional para informações adicionais.',
    type: 'textarea',
    inputs: [
      { id: 'observacoes', label: '', placeholder: 'Ex: outro ambiente, preferências...', type: 'textarea' },
    ],
    nextStep: 'passo_8_captura',
  },
  {
    id: 'passo_8_captura',
    phase: 8,
    question: 'Perfeito! Para te enviar este pré-orçamento',
    subtext: 'Preencha seus dados para receber a estimativa. O valor final será confirmado após visita técnica.',
    type: 'mixed',
    inputs: [
      { id: 'nome', label: 'Nome', placeholder: 'Seu nome', required: true },
      { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone', required: true },
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
          'Outro',
        ],
      },
    ],
    isFinal: true,
  },
];
