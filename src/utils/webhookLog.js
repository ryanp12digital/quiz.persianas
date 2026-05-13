/**
 * Registra falhas de fetch ou HTTP não-2xx após Promise.allSettled nos webhooks.
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
