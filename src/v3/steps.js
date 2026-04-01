/**
 * Steps do Quiz V3: fluxo Tecido → Modelo → Acionamento → (resto igual V1).
 * Lista unificada de tecidos (FABRIC_OPTIONS_UNIFIED) deriva de V1, incluindo rolô/romana/double em passo4RoloRomanaDoubleFabricOptions.js.
 */

import { FABRIC_OPTIONS_UNIFIED } from './stepsData.js';
import { STEPS as V1_STEPS } from '../v1/steps.js';

const passo4AcabamentoCortina = V1_STEPS.find((s) => s.id === 'passo_4_acabamento_cortina');

export const STEPS = [
  {
    id: 'passo_1_intencao',
    phase: 1,
    question: 'Orçamento de Persiana / Cortina',
    subtext: 'Escolha o que combina com seu ambiente e receba uma estimativa alinhada às suas escolhas.',
    type: 'radio',
    options: [
      { label: 'Escolha o tecido que combina com o seu ambiente', value: 'ver_opcoes', nextStep: 'passo_3v3_tecido', featured: true },
      { label: 'Já sei o modelo e tecido e tenho as medidas', description: 'Persiana Rolô blackout tamanho 1,50m x 1,50m', value: 'direto_atendente', nextStep: 'passo_8_captura' }
    ]
  },
  {
    id: 'passo_3v3_tecido',
    phase: 4,
    question: 'Qual tecido você prefere?',
    subtext: 'Escolha o que combina com seu ambiente',
    type: 'radio',
    options: FABRIC_OPTIONS_UNIFIED
  },
  {
    id: 'passo_3v3_modelo',
    phase: 4,
    question: 'Qual modelo você prefere?',
    subtext: 'Escolha o que combina com seu ambiente',
    type: 'radio',
    options: []
  },
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
  ...(passo4AcabamentoCortina ? [passo4AcabamentoCortina] : []),
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
  {
    id: 'passo_7_adicionar_item',
    phase: 7,
    question: 'Observações ou Outras Persianas/Cortinas para orçar:',
    subtext: 'Campo opcional para informações adicionais. ex: Persiana Rolo Blackout 160x170 para Sala.\nEx: Persiana rolô Blackout 1,50 larg x 3,00 Alt\nEx: Persiana Double Vision Translúcida 1,30 x 2,50',
    type: 'textarea',
    inputs: [
      { id: 'descricao_item', label: '', placeholder: 'Descreva o que você deseja...', type: 'textarea' }
    ],
    nextStep: 'passo_7_mais_itens'
  },
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
    ],
    isFinal: true
  },
  {
    id: 'passo_8_captura_catalogo',
    phase: 8,
    question: 'Receber Catálogo',
    subtext: 'Preencha seus dados para receber o catálogo com todas as opções e sugestões personalizadas.',
    type: 'mixed',
    inputs: [
      { id: 'nome', label: 'Nome', placeholder: 'Seu nome' },
      { id: 'whatsapp', label: 'DDD+Whatsapp', placeholder: '(11) 99999-9999', mask: 'phone' },
    ],
    isFinal: true
  }
];
