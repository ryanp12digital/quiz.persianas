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

function cloneJsonSafe(value) {
  if (value === undefined) return undefined;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.fromEntries(
        Object.entries(value).filter(([, v]) => typeof v !== 'function')
      );
    }
    return value;
  }
}

function remapWhatsappToPhone(value) {
  if (Array.isArray(value)) return value.map(remapWhatsappToPhone);
  if (!value || typeof value !== 'object') return value;
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    const nextKey = k === 'whatsapp' ? 'phone' : k;
    out[nextKey] = remapWhatsappToPhone(v);
  }
  return out;
}

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
 * Monta o corpo para `site-new-lead`: estrutura única (sem `_flat` duplicado) + bloco
 * `selecoes` com todos os campos brutos do fluxo quando `extras` for passado.
 *
 * @param {Record<string, unknown>} full — mesmo objeto enviado ao n8n/GHL (buildStandardizedPayload / buildPayloadV*).
 * @param {SiteLeadExtras | null} [extras] — estado bruto do quiz no envio (obrigatório para não faltar seleção).
 */
export function buildMetaNewLeadFromFullPayload(full, extras = null) {
  if (!full || typeof full !== 'object') {
    return { codi_id: CODI_ID, schema: SITE_LEAD_SCHEMA_VERSION, quiz_version: '', form_id: '' };
  }

  const metadata = full.metadata || {};
  const contact = full.contact || {};
  const utm = { ...(full.utm || {}) };
  const p = full.produto || {};
  const med = p.medidas && typeof p.medidas === 'object' ? p.medidas : { largura: '', altura: '', unidade: 'cm' };

  if (extras?.leadData && typeof extras.leadData === 'object') {
    const ld = extras.leadData;
    if (ld.ab_variant != null && String(ld.ab_variant) !== '' && (utm.ab_variant == null || utm.ab_variant === '')) {
      utm.ab_variant = ld.ab_variant;
    }
    for (const k of ['gclid', 'fbclid', 'wbraid']) {
      if (ld[k] != null && String(ld[k]) !== '') utm[k] = ld[k];
    }
  }

  const ambienteLista =
    (extras?.stepData && Array.isArray(extras.stepData.ambientes) && extras.stepData.ambientes) ||
    (typeof contact.ambientes === 'string' && contact.ambientes
      ? contact.ambientes.split(',').map((s) => s.trim()).filter(Boolean)
      : []);

  const contato = {
    ...remapWhatsappToPhone(cloneJsonSafe(contact)),
    ...(ambienteLista.length ? { ambientes_lista: ambienteLista } : {}),
  };

  const selecoes =
    extras && typeof extras === 'object'
      ? (() => {
          const out = {
            parametros_entrada: remapWhatsappToPhone(cloneJsonSafe(extras.leadData)),
            formulario_final: remapWhatsappToPhone(cloneJsonSafe(extras.stepData)),
            item_principal_ou_atual: cloneJsonSafe(extras.currentItem),
            lista_itens: cloneJsonSafe(Array.isArray(extras.items) ? extras.items : []),
            historico_indices_passos: Array.isArray(extras.history) ? [...extras.history] : undefined,
          };
          if (typeof document !== 'undefined' && document.location) {
            out.pagina_envio = {
              href: document.location.href || '',
              pathname: document.location.pathname || '',
            };
          }
          Object.keys(out).forEach((k) => {
            if (out[k] === undefined) delete out[k];
          });
          return out;
        })()
      : null;

  /** Campos planos legados (consumo rápido no Python / relatórios). */
  const legacy = {
    form_id: metadata.form_id ?? '',
    quiz_version: metadata.quiz_version ?? '',
    source: metadata.source ?? '',
    submitted_at: metadata.submitted_at ?? '',
    nome: contact.nome ?? '',
    phone: contact.whatsapp ?? contact.phone ?? '',
    email: contact.email ?? '',
    cidade: contact.cidade ?? '',
    bairro: contact.bairro ?? '',
    ambientes: contact.ambientes ?? '',
    utm_source: utm.utm_source ?? '',
    utm_medium: utm.utm_medium ?? '',
    utm_campaign: utm.utm_campaign ?? '',
    referrer: utm.referrer ?? '',
    passo_1_intencao: p.passo_1_intencao ?? '',
    descricao_livre: p.descricao_livre ?? '',
    ambiente:
      p.ambiente != null && String(p.ambiente) !== '' ? p.ambiente : (contact.ambientes ?? ''),
    tipo: p.tipo ?? '',
    modelo: p.modelo ?? '',
    tecido: p.tecido ?? '',
    acabamento: p.acabamento ?? '',
    acionamento: p.acionamento ?? '',
    largura: med.largura ?? '',
    altura: med.altura ?? '',
    unidade: med.unidade ?? 'cm',
    observacoes: p.observacoes ?? '',
    itens_adicionais: full.itens_adicionais ?? '',
    itens_adicionais_count: full.itens_adicionais_count ?? 0,
  };
  if (utm.ab_variant != null && String(utm.ab_variant) !== '') {
    legacy.ab_variant = utm.ab_variant;
  }

  return {
    codi_id: CODI_ID,
    schema: SITE_LEAD_SCHEMA_VERSION,
    ...legacy,
    metadata,
    timestamps: cloneJsonSafe(full.timestamps) || {},
    utm,
    contato,
    produto: cloneJsonSafe(p) || {},
    percurso: cloneJsonSafe(full.journey) || {},
    itens_extras_resumo: full.itens_adicionais ?? '',
    itens_extras_count: full.itens_adicionais_count ?? 0,
    selecoes,
  };
}
