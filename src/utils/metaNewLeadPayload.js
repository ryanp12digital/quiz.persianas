/**
 * Webhook adicional: payload resumido (inclui codi_id). n8n/LeadConnector
 * continuam usando o payload completo sem passar por esta função.
 *
 * CORS: o browser envia preflight OPTIONS em POST cross-origin com Content-Type: application/json.
 * O servidor em WEBHOOK_META_NEW_LEAD_URL deve responder OPTIONS/POST com, no mínimo:
 *   Access-Control-Allow-Origin: <origem do quiz> (ou *)
 *   Access-Control-Allow-Methods: POST, OPTIONS
 *   Access-Control-Allow-Headers: Content-Type
 * Sem isso, o fetch pode falhar no cliente mesmo com o endpoint ativo (curl funciona).
 *
 * URL: use VITE_WEBHOOK_META_NEW_LEAD_URL no build para apontar a outro ambiente.
 */
export const CODI_ID = '32321675219277591366962199773271';

const DEFAULT_META_NEW_LEAD =
  'https://python-auto-relatorio-trafego.axmxa0.easypanel.host/meta-new-lead';

export const WEBHOOK_META_NEW_LEAD_URL =
  import.meta.env.VITE_WEBHOOK_META_NEW_LEAD_URL || DEFAULT_META_NEW_LEAD;

/**
 * Em DEV, registra falhas de fetch ou HTTP não-2xx após Promise.allSettled nos webhooks.
 * @param {string} quizLabel - ex.: 'v2'
 * @param {string[]} labels - rótulos na mesma ordem das promises
 * @param {PromiseSettledResult<Response>[]} results
 */
export function logWebhookSettledResults(quizLabel, labels, results) {
  if (!import.meta.env.DEV) return;
  const prefix = `[quiz ${quizLabel}]`;
  results.forEach((r, i) => {
    const name = labels[i] ?? `request_${i}`;
    if (r.status === 'rejected') {
      console.warn(`${prefix} webhook ${name} failed:`, r.reason);
    } else {
      const res = r.value;
      if (res && typeof res.ok === 'boolean' && !res.ok) {
        console.warn(`${prefix} webhook ${name}: HTTP ${res.status}`);
      }
    }
  });
}

/**
 * A partir do objeto completo (metadata, contact, utm, produto, itens, journey…),
 * monta o corpo resumido para o endpoint meta-new-lead.
 */
export function buildMetaNewLeadFromFullPayload(full) {
  if (!full || typeof full !== 'object') {
    return { codi_id: CODI_ID, form_id: '', quiz_version: '' };
  }
  const metadata = full.metadata || {};
  const contact = full.contact || {};
  const utm = full.utm || {};
  const p = full.produto || {};
  const med = p.medidas && typeof p.medidas === 'object' ? p.medidas : { largura: '', altura: '', unidade: 'cm' };

  const abVariant = utm.ab_variant;
  const out = {
    codi_id: CODI_ID,
    form_id: metadata.form_id ?? '',
    quiz_version: metadata.quiz_version ?? '',
    source: metadata.source ?? '',
    submitted_at: metadata.submitted_at ?? '',
    nome: contact.nome ?? '',
    whatsapp: contact.whatsapp ?? '',
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
    ambiente: p.ambiente != null && String(p.ambiente) !== '' ? p.ambiente : (contact.ambientes ?? ''),
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
  if (abVariant) {
    out.ab_variant = abVariant;
  }
  return out;
}
