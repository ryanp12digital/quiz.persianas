/**
 * Dados derivados dos steps V1 para o quiz V3 (tecido primeiro, depois modelo).
 * Lista unificada de tecidos, mapa tecido → modelos e opções de modelo para exibição.
 */

import { STEPS as V1_STEPS } from '../v1/steps.js';

// passo_4_tecido_XXX -> modelKey (valor usado no payload e no passo_4_modelo)
const TECIDO_STEP_TO_MODEL = {
  passo_4_tecido_rolo: 'rolo',
  passo_4_tecido_romana: 'romana',
  passo_4_tecido_double: 'double_vision',
  passo_4_tecido_vertical: 'vertical',
  passo_4_tecido_madeira: 'madeira',
  passo_4_tecido_aluminio: 'aluminio',
  passo_4_tecido_painel: 'painel',
  passo_4_tecido_cortina: 'cortina',
  passo_4_tecido_teto_romana: 'romana_teto',
  passo_4_tecido_teto_celular: 'celular_teto',
  passo_4_tecido_teto_plissada: 'plissada_teto',
};

// Construir TECIDO_TO_MODELS: valor_tecido -> [{ modelKey, tecidoStepId }]
const TECIDO_TO_MODELS = {};
const FABRIC_OPTIONS_MAP = {}; // value -> { label, value, image, description } (primeira ocorrência)

// Semi-blackout e Semi-blackout 70% tratados como a mesma opção; exibir apenas "Semi-blackout 70%"
const UNIFIED_SEMI_BLACKOUT_KEY = 'semi_blackout_70';

V1_STEPS.forEach((step) => {
  if (!step.id || !step.id.startsWith('passo_4_tecido_') || step.id === 'passo_4_acabamento_cortina') return;
  const tecidoStepId = step.id;
  const modelKey = TECIDO_STEP_TO_MODEL[tecidoStepId];
  if (!modelKey) return;

  (step.options || []).forEach((opt) => {
    const v = opt.value;
    const keyForModels = v === 'semi_blackout' ? UNIFIED_SEMI_BLACKOUT_KEY : v;
    if (!TECIDO_TO_MODELS[keyForModels]) TECIDO_TO_MODELS[keyForModels] = [];
    TECIDO_TO_MODELS[keyForModels].push({ modelKey, tecidoStepId });
    // Não adicionar entrada "Semi-blackout" ao mapa; só "Semi-blackout 70%" aparece na lista
    if (v === 'semi_blackout') return;
    if (!FABRIC_OPTIONS_MAP[v]) {
      FABRIC_OPTIONS_MAP[v] = {
        label: opt.label,
        value: opt.value,
        image: opt.image,
        description: opt.description,
      };
    }
  });
});

// Lista unificada de tecidos: "Não sei" no final do primeiro grupo (6ª posição), antes do botão "Ver mais"
const allFabricOptions = Object.values(FABRIC_OPTIONS_MAP).map(({ label, value, image, description }) => ({
  label,
  value,
  image: image || undefined,
  description: description || undefined,
}));
const semNaoSei = allFabricOptions.filter((o) => o.value !== 'nao_sei');
const naoSei = allFabricOptions.find((o) => o.value === 'nao_sei');
const FIRST_GROUP_SIZE = 5; // primeiras 5 opções + "não sei" = 6 itens no primeiro bloco
export const FABRIC_OPTIONS_UNIFIED = naoSei
  ? [...semNaoSei.slice(0, FIRST_GROUP_SIZE), naoSei, ...semNaoSei.slice(FIRST_GROUP_SIZE)]
  : semNaoSei;

export { TECIDO_TO_MODELS };

// Opções de modelo para exibição no passo_3v3_modelo (label, value, image, description)
const passo4Modelo = V1_STEPS.find((s) => s.id === 'passo_4_modelo');
const passo4ModeloTeto = V1_STEPS.find((s) => s.id === 'passo_4_modelo_teto');

const MODEL_OPTIONS_MAIN = (passo4Modelo?.options || []).filter((o) => o.value !== 'nao_sei').map((o) => ({
  label: o.label,
  value: o.value,
  image: o.image,
  description: o.description,
}));

const MODEL_OPTIONS_TETO = (passo4ModeloTeto?.options || []).filter((o) => o.value !== 'nao_sei').map((o) => ({
  label: o.label,
  value: o.value,
  image: o.image,
  description: o.description,
}));

export const MODEL_OPTIONS_BY_KEY = {};
[...MODEL_OPTIONS_MAIN, ...MODEL_OPTIONS_TETO].forEach((o) => {
  MODEL_OPTIONS_BY_KEY[o.value] = { label: o.label, value: o.value, image: o.image, description: o.description };
});

// Para teto "genérico" não temos valor único no passo_4_modelo; os valores são romana_teto, celular_teto, plissada_teto
// MODEL_OPTIONS_BY_KEY já cobre esses três a partir de passo_4_modelo_teto.
