/**
 * Dispara 3 webhooks de teste para cada versão (V1, V2, V3).
 * Cenários: Persiana de Teto (romana, plissada) e Cortina, para validar payload.
 */

const WEBHOOKS = {
  v1: 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv1',
  v2: 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv2',
  v3: 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv3',
};

function nowISO() {
  return new Date().toISOString();
}
function localBR() {
  return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

function buildPayload(version, scenario) {
  const submittedAt = nowISO();
  const sessionStarted = new Date(Date.now() - 45000).toISOString();
  const produto = { ...scenario.produto };
  const produtoFlat = { ...scenario.produtoFlat };
  if (version === 'v2') {
    produto.passo_1_intencao = '';
    produtoFlat.passo_1_intencao = '';
  }
  const base = {
    metadata: {
      form_id: scenario.formId || 'FORMR20',
      quiz_version: version,
      source: 'quiz_web',
      submitted_at: submittedAt,
      submitted_at_local: localBR(),
    },
    timestamps: {
      submitted_at: submittedAt,
      submitted_at_local: localBR(),
      session_started_at: sessionStarted,
      duration_seconds: 45,
      duration_readable: '0m 45s',
    },
    utm: { utm_source: '', utm_medium: '', utm_campaign: '', referrer: '' },
    contact: {
      nome: 'Teste Webhook',
      whatsapp: '+5511999999999',
      email: 'teste@webhook.local',
      cidade: 'São Paulo',
      bairro: 'Teste',
      ambientes: ['Sala'],
      ambientes_count: 1,
    },
    produto,
    itens_adicionais: Array.isArray(scenario.itens_adicionais)
      ? scenario.itens_adicionais
          .map((item) => {
            if (item.descricao_livre && item.descricao_livre.trim()) {
              return item.descricao_livre.trim();
            }
            const partes = [];
            if (item.tipo) partes.push(item.tipo);
            if (item.modelo) partes.push(item.modelo);
            if (item.tecido) partes.push(item.tecido);
            if (item.acabamento) partes.push(item.acabamento);
            let medidas = '';
            if (item.largura || item.altura) {
              const largura = item.largura || '';
              const altura = item.altura || '';
              if (largura && altura) {
                medidas = `${largura} x ${altura}`;
              } else {
                medidas = largura || altura;
              }
            }
            if (medidas) partes.push(medidas);
            return partes.join(' ').trim();
          })
          .filter(Boolean)
          .join('; ')
      : '',
    itens_adicionais_count: Array.isArray(scenario.itens_adicionais) ? scenario.itens_adicionais.length : 0,
    journey: {
      steps_completed: scenario.steps_completed || [],
      steps_count: (scenario.steps_completed || []).length,
    },
    _flat: {
      ...scenario.contactFlat,
      ...produtoFlat,
      itens_adicionais: Array.isArray(scenario.itens_adicionais)
        ? scenario.itens_adicionais
            .map((item) => {
              if (item.descricao_livre && item.descricao_livre.trim()) {
                return item.descricao_livre.trim();
              }
              const partes = [];
              if (item.tipo) partes.push(item.tipo);
              if (item.modelo) partes.push(item.modelo);
              if (item.tecido) partes.push(item.tecido);
              if (item.acabamento) partes.push(item.acabamento);
              let medidas = '';
              if (item.largura || item.altura) {
                const largura = item.largura || '';
                const altura = item.altura || '';
                if (largura && altura) {
                  medidas = `${largura} x ${altura}`;
                } else {
                  medidas = largura || altura;
                }
              }
              if (medidas) partes.push(medidas);
              return partes.join(' ').trim();
            })
            .filter(Boolean)
            .join('; ')
        : '',
    },
  };
  if (version === 'v2') {
    base.utm.ab_variant = 'B';
  }
  return base;
}

const scenarios = [
  {
    name: 'V1 Teste 1 - Persiana de Teto (Romana, Blackout, Manual)',
    formId: 'FORMR20',
    produto: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'persiana_teto',
      modelo: 'romana_teto',
      tecido: 'blackout',
      acabamento: '',
      acionamento: 'manual',
      medidas: { largura: '150', altura: '150', unidade: 'cm' },
    },
    contactFlat: {
      nome: 'Teste Webhook',
      whatsapp: '+5511999999999',
      email: 'teste@webhook.local',
      cidade: 'São Paulo',
      bairro: 'Teste',
      ambientes: ['Sala'],
      ambientes_count: 1,
    },
    produtoFlat: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'persiana_teto',
      modelo: 'romana_teto',
      tecido: 'blackout',
      acabamento: '',
      acionamento: 'manual',
      largura: '150',
      altura: '150',
    },
    steps_completed: ['passo_1_intencao', 'passo_4_modelo', 'passo_4_modelo_teto', 'passo_4_tecido_teto_romana', 'passo_3_acionamento', 'passo_6_medidas', 'passo_8_captura'],
  },
  {
    name: 'V1 Teste 2 - Cortina (Blackout, Wave, Motorizada)',
    formId: 'FORMR20',
    produto: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'cortina',
      modelo: 'cortina blackout',
      tecido: 'wave',
      acabamento: 'wave',
      acionamento: 'motorizada',
      medidas: { largura: '200', altura: '250', unidade: 'cm' },
    },
    contactFlat: {
      nome: 'Teste Webhook',
      whatsapp: '+5511999999999',
      email: 'teste@webhook.local',
      cidade: 'São Paulo',
      bairro: 'Teste',
      ambientes: ['Sala'],
      ambientes_count: 1,
    },
    produtoFlat: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'cortina',
      modelo: 'cortina blackout',
      tecido: 'wave',
      acabamento: 'wave',
      acionamento: 'motorizada',
      largura: '200',
      altura: '250',
    },
    steps_completed: ['passo_1_intencao', 'passo_4_modelo', 'passo_4_tecido_cortina', 'passo_4_acabamento_cortina', 'passo_3_acionamento', 'passo_6_medidas', 'passo_8_captura'],
  },
  {
    name: 'V1 Teste 3 - Persiana de Teto (Plissada, Translúcida, Motorizada)',
    formId: 'FORMR20',
    produto: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'persiana_teto',
      modelo: 'plissada_teto',
      tecido: 'translucida',
      acabamento: '',
      acionamento: 'motorizada',
      medidas: { largura: '120', altura: '180', unidade: 'cm' },
    },
    contactFlat: {
      nome: 'Teste Webhook',
      whatsapp: '+5511999999999',
      email: 'teste@webhook.local',
      cidade: 'São Paulo',
      bairro: 'Teste',
      ambientes: ['Sala'],
      ambientes_count: 1,
    },
    produtoFlat: {
      passo_1_intencao: 'ver_opcoes',
      descricao_livre: '',
      tipo: 'persiana_teto',
      modelo: 'plissada_teto',
      tecido: 'translucida',
      acabamento: '',
      acionamento: 'motorizada',
      largura: '120',
      altura: '180',
    },
    steps_completed: ['passo_1_intencao', 'passo_4_modelo', 'passo_4_modelo_teto', 'passo_4_tecido_teto_plissada', 'passo_3_acionamento', 'passo_6_medidas', 'passo_8_captura'],
  },
];

async function send(version, scenario) {
  const payload = buildPayload(version, scenario);
  const url = WEBHOOKS[version];
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return { status: res.status, ok: res.ok, version, name: scenario.name };
}

async function run() {
  console.log('Disparando 9 webhooks de teste (3 por versão)...\n');
  const results = [];
  for (const v of ['v1', 'v2', 'v3']) {
    for (let i = 0; i < 3; i++) {
      const scenario = scenarios[i];
      const name = scenario.name.replace('V1 ', `${v.toUpperCase()} `);
      try {
        const result = await send(v, { ...scenario, name });
        results.push({ ...result, name });
        console.log(`${result.ok ? 'OK' : 'ERRO'} ${result.status} - ${name}`);
      } catch (err) {
        results.push({ ok: false, status: 'ERR', version: v, name, error: err.message });
        console.log(`ERRO - ${name}: ${err.message}`);
      }
    }
  }
  const ok = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`\nResumo: ${ok} sucesso, ${fail} falha(s).`);
  return results;
}

run().catch(console.error);
