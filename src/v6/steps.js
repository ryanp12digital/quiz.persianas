/**
 * Steps do Quiz V6 (modelo e tecido na mesma etapa).
 * Combinações vêm de getCombinacoesModeloTecido → ambienteQuizData + V1 (rolô/romana/double: `passo4RoloRomanaDoubleFabricOptions.js`).
 */

export const STEPS = [
  {
    id: 'passo_1_ambiente',
    phase: 1,
    question: 'Para qual ambiente você está buscando sua Cortina/Persiana?',
    subtext: 'Escolha o ambiente para ver opções modelo + tecido recomendadas.',
    type: 'radio',
    nextStep: 'passo_2_modelo_tecido',
  },
  {
    id: 'passo_2_modelo_tecido',
    phase: 2,
    question: 'Escolha o modelo e tecido ideal para você:',
    subtext: 'Cada opção já combina modelo e tecido recomendados.',
    type: 'radio',
    options: [], // preenchido por getCombinacoesModeloTecido(ambiente)
  },
  {
    id: 'passo_3_acabamento',
    phase: 3,
    question: 'Escolha o acabamento:',
    subtext: 'Acabamento para sua cortina.',
    type: 'radio',
    options: [],
  },
  {
    id: 'passo_4_acionamento',
    phase: 4,
    question: 'Como você prefere o acionamento?',
    subtext: 'Manual ou motorizada.',
    type: 'radio',
    options: [],
  },
  {
    id: 'passo_5_medidas',
    phase: 5,
    question: 'Informe as medidas da sua janela/porta:',
    subtext: '*Medidas aproximadas são suficientes. Confirmamos na visita técnica sem custo adicional.',
    type: 'medidas',
    inputs: [
      { id: 'largura', label: 'Largura', placeholder: 'Ex: 120', suffix: 'cm', required: true },
      { id: 'altura', label: 'Altura', placeholder: 'Ex: 140', suffix: 'cm', required: true },
    ],
    nextStep: 'passo_6_observacoes',
  },
  {
    id: 'passo_6_observacoes',
    phase: 6,
    question: 'Observações ou Outras Persianas/Cortinas para orçar:',
    subtext: 'Campo opcional para informações adicionais.<br/><i>ex: Persiana Rolo Blackout 160x170 para Sala.</i>',
    type: 'textarea',
    inputs: [{ id: 'observacoes', label: '', placeholder: 'Ex: outro ambiente, preferências...', type: 'textarea' }],
    nextStep: 'passo_7_captura',
  },
  {
    id: 'passo_7_captura',
    phase: 7,
    question: 'Perfeito! Para te enviar este pré-orçamento',
    subtext: 'Preencha seus dados para receber a estimativa.',
    type: 'mixed',
    inputs: [
      { id: 'nome', label: 'Nome', placeholder: 'Seu nome', required: true },
      { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone', required: true },
      { id: 'email', label: 'E-mail', placeholder: 'seu@email.com' },
      { id: 'cidade', label: 'Cidade', placeholder: 'São Paulo' },
      { id: 'bairro', label: 'Bairro', placeholder: 'Centro' },
    ],
    isFinal: true,
  },
];
