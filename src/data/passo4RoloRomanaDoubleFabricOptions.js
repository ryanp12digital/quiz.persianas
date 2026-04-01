/**
 * Opções de tecido para Rolô, Romana e Double Vision — fonte única.
 * - V1/V2: importam estes arrays em steps.js
 * - V3: stepsData.js deriva a lista unificada a partir de V1_STEPS
 * - V4–V6: ambienteQuizData + getTecidosParaOutros usam V1_STEPS (mesmas opções)
 */

const NEXT = 'passo_3_acionamento';
const NEXT_NAO_SEI = 'passo_5_estagio';

export const PASSO_4_TECIDO_ROLO_OPTIONS = [
  { label: 'Tela Solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: NEXT, image: '/tecidos/rolo-04-tela-solar-1pct.png' },
  { label: 'Tela Solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: NEXT, image: '/tecidos/rolo-05-tela-solar-3pct.png' },
  { label: 'Tela Solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: NEXT, image: '/tecidos/rolo-06-tela-solar-5pct.png' },
  { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: NEXT, image: '/tecidos/rolo-01-blackout.png' },
  { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: NEXT, image: '/tecidos/rolo-07-translucida.png' },
  { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: NEXT_NAO_SEI },
];

export const PASSO_4_TECIDO_ROMANA_OPTIONS = [
  { label: 'Tela Solar 1%', description: 'Visibilidade externa mínima e forte bloqueio de luminosidade.', value: 'tela_1', nextStep: NEXT, image: '/tecidos/romana-03-tela-solar-1pct.png' },
  { label: 'Tela Solar 3%', description: 'Equilíbrio entre visibilidade externa e bloqueio de luz.', value: 'tela_3', nextStep: NEXT, image: '/tecidos/romana-04-tela-solar-3pct.png' },
  { label: 'Tela Solar 5%', description: 'Maior entrada de luz, mantendo visão externa com proteção solar.', value: 'tela_5', nextStep: NEXT, image: '/tecidos/romana-05-tela-solar-5pct.png' },
  { label: 'Blackout', description: 'Bloqueio total da luz e máxima privacidade.', value: 'blackout', nextStep: NEXT, image: '/tecidos/romana-01-blackout.png' },
  { label: 'Translúcida', description: 'Difunde a luz, garantindo privacidade com ambiente iluminado.', value: 'translucida', nextStep: NEXT, image: '/tecidos/romana-06-translucida.png' },
  { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: NEXT_NAO_SEI },
];

/** Imagens alinhadas ao visual: semi-blackout → 01, translúcido → 02 (nomes de arquivo legados). */
export const PASSO_4_TECIDO_DOUBLE_OPTIONS = [
  { label: 'Semi-blackout', description: 'Forte bloqueio de luminosidade e máxima privacidade para o ambiente.', value: 'semi_blackout_translucido', nextStep: NEXT, image: '/tecidos/double-vision-01-blackout-translucido.png' },
  { label: 'Translúcido', description: 'Filtragem suave da luz natural com total privacidade interna.', value: 'blackout_translucido', nextStep: NEXT, image: '/tecidos/double-vision-02-semi-blackout-translucido.png' },
  { label: 'Não sei — Quero recomendação', description: 'Para quem prefere receber uma recomendação personalizada.', value: 'nao_sei', nextStep: NEXT_NAO_SEI },
];
