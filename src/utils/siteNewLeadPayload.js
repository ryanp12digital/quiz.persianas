/**
 * Webhook adicional: corpo próprio para `site-new-lead` (mais enxuto que n8n/GHL,
 * sem duplicar `_flat`, porém com todas as seleções e campos do quiz).
 *
 * Envio ao Python (`site-new-lead`): usa POST com Content-Type `text/plain` e
 * `mode: 'no-cors'` para não depender de CORS (requisição “simples”, sem preflight).
 * O corpo continua sendo JSON; o servidor deve interpretar o body com json.loads.
 *
 * URL: `VITE_WEBHOOK_SITE_NEW_LEAD_URL` (preferencial) ou `VITE_WEBHOOK_META_NEW_LEAD_URL` (legado).
 */
export const CODI_ID = '32321675219277591366962199773271';

/** Versão do objeto JSON para o endpoint evoluir sem quebrar consumidores. */
export const SITE_LEAD_SCHEMA_VERSION = 3;

const DEFAULT_SITE_NEW_LEAD =
  'https://python-auto-relatorio-trafego.axmxa0.easypanel.host/site-new-lead';

export const WEBHOOK_SITE_NEW_LEAD_URL =
  import.meta.env.VITE_WEBHOOK_SITE_NEW_LEAD_URL ||
  import.meta.env.VITE_WEBHOOK_META_NEW_LEAD_URL ||
  DEFAULT_SITE_NEW_LEAD;

/** Nome legado do export; mesmo valor que {@link WEBHOOK_SITE_NEW_LEAD_URL}. */
export const WEBHOOK_META_NEW_LEAD_URL = WEBHOOK_SITE_NEW_LEAD_URL;


/**
 * @typedef {object} SiteLeadExtras
 * @property {Record<string, unknown>} [currentItem] — acúmulo de respostas por passo (passo_*).
 * @property {unknown[]} [items] — itens extras / lista de produtos no carrinho (V1–V3).
 * @property {Record<string, unknown>} [stepData] — dados do passo final (captura).
 * @property {Record<string, unknown>} [leadData] — UTMs e parâmetros da entrada.
 * @property {number[]} [history] — índices dos passos visitados (ordem no fluxo).
 */

/**
 * POST para site-new-lead.
 * Por padrão: `text/plain` + `no-cors` (evita bloqueio por falta de CORS no servidor).
 * Se `VITE_SITE_NEW_LEAD_USE_CORS_FETCH=true` e o servidor tiver CORS ok: `application/json` + fetch normal.
 */
export function fetchSiteNewLead(url, bodyObject) {
  if (!url) return Promise.resolve(new Response(null, { status: 204 }));
  const body = JSON.stringify(bodyObject);
  if (import.meta.env.VITE_SITE_NEW_LEAD_USE_CORS_FETCH === 'true') {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  }
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body,
    keepalive: true,
  });
}

/**
 * Registra falhas de fetch ou HTTP não-2xx após Promise.allSettled nos webhooks.
 * Em produção também emite avisos (não só em DEV), para facilitar diagnóstico no console.
 * @param {string} quizLabel - ex.: 'v2'
 * @param {string[]} labels - rótulos na mesma ordem das promises
 * @param {PromiseSettledResult<Response>[]} results
 */
export function logWebhookSettledResults(quizLabel, labels, results) {
  const prefix = `[quiz ${quizLabel}] webhooks`;
  results.forEach((r, i) => {
    const name = labels[i] ?? `request_${i}`;
    if (r.status === 'rejected') {
      console.warn(`${prefix} ${name} failed:`, r.reason);
      return;
    }
    const res = r.value;
    if (res && res.type === 'opaque') {
      console.info(`${prefix} ${name}: enviado (no-cors). Resposta opaca — confira no servidor.`);
      return;
    }
    if (res && typeof res.ok === 'boolean' && !res.ok) {
      console.warn(`${prefix} ${name}: HTTP ${res.status}`);
    } else if (import.meta.env.DEV && res?.ok) {
      console.debug(`${prefix} ${name}: ok`);
    }
  });
}


/**
 * Monta o corpo para `site-new-lead`: campos de `_flat` + `codi_id` no topo.
 *
 * O servidor `/site-new-lead` roteia o lead pela chave `codi_id` (28–36 dígitos
 * cadastrados em `site_lead_routes`). Sem ela, o webhook responde
 * `CODI_ID_OBRIGATORIO` e o lead é descartado.
 *
 * @param {Record<string, unknown>} full — mesmo objeto enviado ao n8n/GHL.
 * @param {SiteLeadExtras | null} [_extras] — não utilizado, mantido por compatibilidade.
 */
export function buildMetaNewLeadFromFullPayload(full, _extras = null) {
  if (!full || typeof full !== 'object') return { codi_id: CODI_ID };
  return { codi_id: CODI_ID, ...(full._flat || {}) };
}
