/**
 * Converte valores internos (ex.: blackout_translucido) nos labels do quiz para o payload do webhook.
 * Fonte: STEPS do V1 (mesmas opções exibidas ao usuário).
 */

import { STEPS } from '../v1/steps.js';

function buildFabricAndAcabamentoLabelMap() {
  const map = Object.create(null);
  for (const step of STEPS) {
    if (!step?.id) continue;
    if (step.id.startsWith('passo_4_tecido_')) {
      for (const opt of step.options || []) {
        if (opt?.value != null && opt.label) map[opt.value] = opt.label;
      }
    }
    if (step.id === 'passo_4_acabamento_cortina') {
      for (const opt of step.options || []) {
        if (opt?.value != null && opt.label) map[opt.value] = opt.label;
      }
      const byTecido = step.optionsByTecido || {};
      for (const arr of Object.values(byTecido)) {
        for (const opt of arr || []) {
          if (opt?.value != null && opt.label) map[opt.value] = opt.label;
        }
      }
    }
  }
  return map;
}

function buildModeloLabelMap() {
  const map = Object.create(null);
  for (const step of STEPS) {
    if (step?.id === 'passo_4_modelo' || step?.id === 'passo_4_modelo_teto') {
      for (const opt of step.options || []) {
        if (opt?.value != null && opt.label) map[opt.value] = opt.label;
      }
    }
  }
  return map;
}

const FABRIC_LABEL_BY_VALUE = buildFabricAndAcabamentoLabelMap();
const MODELO_LABEL_BY_VALUE = buildModeloLabelMap();

/** Label amigável para tecido (persiana) ou acabamento (cortina no campo tecido do produto). */
export function resolveTecidoPayloadLabel(codigo) {
  if (codigo == null || codigo === '') return codigo;
  return FABRIC_LABEL_BY_VALUE[codigo] || codigo;
}

/** Label amigável para modelo (ex.: double_vision → Persiana Double Vision). */
export function resolveModeloPayloadLabel(modelo) {
  if (modelo == null || modelo === '') return modelo;
  if (typeof modelo === 'string' && modelo.startsWith('cortina ')) {
    const rest = modelo.slice('cortina '.length).trim();
    const fabricLabel = resolveTecidoPayloadLabel(rest);
    return fabricLabel && fabricLabel !== rest ? `Cortina ${fabricLabel}` : modelo;
  }
  return MODELO_LABEL_BY_VALUE[modelo] || modelo;
}

/**
 * Preenche produto para webhook: tecido/modelo/acabamento legíveis + códigos originais em *_codigo.
 */
export function enrichProdutoForWebhook(produto) {
  if (!produto) return produto;
  const tecidoCodigo = produto.tecido;
  const modeloCodigo = produto.modelo;
  const acabamentoCodigo = produto.acabamento;
  const tecidoLabel = tecidoCodigo ? resolveTecidoPayloadLabel(tecidoCodigo) : tecidoCodigo;
  const modeloLabel = modeloCodigo ? resolveModeloPayloadLabel(modeloCodigo) : modeloCodigo;
  const acabamentoLabel = acabamentoCodigo ? resolveTecidoPayloadLabel(acabamentoCodigo) : acabamentoCodigo;
  return {
    ...produto,
    modelo: modeloLabel,
    modelo_codigo: modeloCodigo,
    tecido: tecidoLabel,
    tecido_codigo: tecidoCodigo,
    acabamento: acabamentoLabel,
    acabamento_codigo: acabamentoCodigo,
  };
}
