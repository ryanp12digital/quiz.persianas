/**
 * Dados do quiz por ambiente (V4, V5, V6).
 * Fonte: documento "Quiz Persianas - Por Ambiente".
 * Para "outros", modelos e tecidos vêm do V1 (todos disponíveis).
 */

import { STEPS as V1_STEPS } from '../v1/steps.js';

// --- AMBIENTES (imagens em public/ambientes/ — nomes dos ficheiros como estão na pasta) ---
export const AMBIENTES = [
  { value: 'varanda_sacada', label: 'Varanda e Sacada', image: '/ambientes/Varanda e Sacada.png' },
  { value: 'sala_estar', label: 'Sala de Estar / Home Theater', image: '/ambientes/Sala de Estar.Home Theater.png' },
  { value: 'quarto', label: 'Quarto', image: '/ambientes/Quarto.png' },
  { value: 'cozinha_lavanderia', label: 'Cozinha e Lavanderia', image: '/ambientes/Cozinha e Lavanderia.png' },
  { value: 'banheiro_lavabo', label: 'Banheiro e Lavabo', image: '/ambientes/Banheiro e Lavabo.png' },
  { value: 'escritorio_homeoffice', label: 'Escritório e Home Office', image: '/ambientes/Escritório e Home Office.png' },
  { value: 'teto_vidro_claraboia', label: 'Teto de Vidro e Claraboia', image: '/ambientes/Teto de Vidro e Claraboia.png' },
  { value: 'outros', label: 'Outros' },
];

/** Opção "Não sei" para uso nas perguntas de modelo e tecido (V4, V5, V6). */
export const NAO_SEI_OPTION = {
  value: 'nao_sei',
  label: 'Não sei — Quero recomendação',
  description: 'Para quem prefere receber uma recomendação personalizada.',
};

// --- IMAGENS MODELOS (paths V1) ---
const IMG = {
  rolo: '/modelos/persiana-rolo.webp',
  romana: '/modelos/persiana-romana.webp',
  double_vision: '/modelos/persiana-double-vision-vertical.webp',
  vertical: '/modelos/persiana-vertical.webp',
  madeira: '/modelos/horizontal-madeira.webp',
  aluminio: '/modelos/horizontal-aluminio.webp',
  painel: '/modelos/persiana-painel.webp',
  cortina: '/modelos/Cortina.webp',
  romana_teto: '/modelos/teto-romana.png',
  celular_teto: '/modelos/teto-celular.png',
  plissada_teto: '/modelos/teto-plissada.png',
};

// --- AMBIENTE -> MODELOS RECOMENDADOS (só os listados no doc) ---
export const AMBIENTE_MODELOS = {
  varanda_sacada: [
    { value: 'rolo', label: 'Persiana Rolo', description: 'A solução mais utilizada em sacadas por sua alta performance na proteção contra o calor e raios UV.', image: IMG.rolo },
    { value: 'painel', label: 'Persiana Painel', description: 'Elegante e funcional, é a melhor escolha para vãos de passagem e grandes fechamentos de vidro.', image: IMG.painel },
    { value: 'vertical', label: 'Persiana Vertical', description: 'Versátil para grandes vãos, permite o controle da luz e da ventilação de forma prática e econômica.', image: IMG.vertical },
    { value: 'cortina', label: 'Cortina de Tecido', description: 'Utilizada para trazer volume e um toque de sala de estar para a varanda gourmet integrada.', image: IMG.cortina },
    { value: 'romana', label: 'Persiana Romana', description: 'Elegante e aconchegante, cria um clima de sala na varanda quando o espaço é fechado e protegido.', image: IMG.romana },
    { value: 'double_vision', label: 'Persiana Double Vision', description: 'Moderna e prática, alterna faixas para controlar o sol da sacada e manter a privacidade com estilo.', image: IMG.double_vision },
  ],
  sala_estar: [
    { value: 'double_vision', label: 'Persiana Double Vision', description: 'Moderna e versátil, alterna faixas para controlar a luz da TV ou abrir a vista da sala.', image: IMG.double_vision },
    { value: 'romana', label: 'Persiana Romana', description: 'Clássica e charmosa, suas camadas horizontais trazem um toque decorativo de alto padrão.', image: IMG.romana },
    { value: 'rolo', label: 'Persiana Rolo', description: 'Prática e minimalista, desaparece no topo para valorizar a arquitetura e a vista da sala.', image: IMG.rolo },
    { value: 'madeira', label: 'Persiana Horizontal de Madeira', description: 'Nobre e térmica, as lâminas giratórias permitem controle milimétrico de luz e ventilação.', image: IMG.madeira },
    { value: 'painel', label: 'Persiana de Painel', description: 'A solução ideal para grandes vãos e portas de correr que dão acesso à varanda da sala.', image: IMG.painel },
    { value: 'cortina', label: 'Cortina de Tecido', description: 'Traz volume e aconchego, sendo o acabamento final perfeito para uma sala acolhedora.', image: IMG.cortina },
  ],
  quarto: [
    { value: 'rolo', label: 'Persiana Rolo', description: 'A favorita para quartos pela vedação eficaz e facilidade de limpeza no dia a dia.', image: IMG.rolo },
    { value: 'cortina', label: 'Cortina de Tecido', description: 'Traz o máximo de aconchego e isolamento acústico, essencial para o relaxamento.', image: IMG.cortina },
    { value: 'romana', label: 'Persiana Romana', description: 'Elegante e clássica, suas dobras em camadas trazem um ar de "quarto de hotel" luxuoso.', image: IMG.romana },
    { value: 'double_vision', label: 'Persiana Double Vision', description: 'Moderna e lúdica, permite brincar com a luz e a visão externa de forma prática.', image: IMG.double_vision },
    { value: 'madeira', label: 'Persiana Horizontal de Madeira', description: 'Excelente isolante térmico natural, mantendo a temperatura do quarto sempre agradável.', image: IMG.madeira },
  ],
  cozinha_lavanderia: [
    { value: 'aluminio', label: 'Persiana Horizontal de Alumínio', description: 'Funcional e resistente à umidade, é o modelo mais prático para o controle de gordura e vapor.', image: IMG.aluminio },
    { value: 'rolo', label: 'Persiana Rolo', description: 'Design minimalista com tecidos tecnológicos que facilitam a manutenção e limpeza.', image: IMG.rolo },
    { value: 'madeira', label: 'Persiana Horizontal de Madeira', description: 'Visual nobre com alta resistência; o material sintético é ideal para áreas que molham.', image: IMG.madeira },
    { value: 'vertical', label: 'Persiana Vertical', description: 'Solução prática e durável para grandes janelas de lavanderia ou divisões de área.', image: IMG.vertical },
  ],
  banheiro_lavabo: [
    { value: 'aluminio', label: 'Persiana Horizontal de Alumínio', description: 'Funcional e resistente à umidade, é a escolha mais segura para janelas dentro do box ou áreas úmidas.', image: IMG.aluminio },
    { value: 'rolo', label: 'Persiana Rolo', description: 'Minimalista e moderna, utiliza tecidos que garantem privacidade total com um visual limpo.', image: IMG.rolo },
    { value: 'madeira', label: 'Persiana Horizontal de Madeira', description: 'Traz o calor e o luxo da madeira para o banheiro com material resistente à água.', image: IMG.madeira },
    { value: 'romana', label: 'Persiana Romana', description: 'Apenas para Lavabo: a opção mais elegante para Lavabos sociais, onde o foco é impressionar as visitas.', image: IMG.romana },
  ],
  escritorio_homeoffice: [
    { value: 'rolo', label: 'Persiana Rolo', description: 'A solução técnica mais eficiente para controlar a luz sobre telas e garantir produtividade.', image: IMG.rolo },
    { value: 'madeira', label: 'Persiana Horizontal de Madeira', description: 'Transmite autoridade e sofisticação, sendo o fundo perfeito para chamadas de vídeo.', image: IMG.madeira },
    { value: 'double_vision', label: 'Persiana Double Vision', description: 'Design moderno que permite alternar entre foco total e uma pausa para apreciar a vista.', image: IMG.double_vision },
    { value: 'aluminio', label: 'Persiana Horizontal de Alumínio', description: 'Prática e precisa, permite ajustar a entrada de ar e luz com um simples giro das lâminas.', image: IMG.aluminio },
    { value: 'romana', label: 'Persiana Romana', description: 'Traz conforto residencial ao home office, com dobras clássicas que ajudam no isolamento acústico.', image: IMG.romana },
    { value: 'vertical', label: 'Persiana Vertical', description: 'Solução técnica para janelas largas e grandes vãos, com lâminas que direcionam a luz ao longo do dia.', image: IMG.vertical },
    { value: 'painel', label: 'Persiana Painel', description: 'Desenvolvida para grandes extensões de vidro, seus painéis deslizam horizontalmente criando um fechamento limpo e moderno.', image: IMG.painel },
  ],
  teto_vidro_claraboia: [
    { value: 'romana_teto', label: 'Persiana Romana de Teto', description: 'Sistema com dobras horizontais elegantes que une charme decorativo e controle eficiente de luz.', image: IMG.romana_teto },
    { value: 'celular_teto', label: 'Persiana Celular de Teto', description: 'Tecido com estrutura em colmeia que cria um colchão de ar, sendo a melhor isolante térmica.', image: IMG.celular_teto },
    { value: 'plissada_teto', label: 'Persiana Plissada de Teto', description: 'Modelo leve com pregas finas que se recolhem ocupando o mínimo de espaço quando aberta.', image: IMG.plissada_teto },
  ],
  outros: null, // preenchido por getModelosOutros() a partir do V1
};

// Modelo -> passo_4_tecido_XXX no V1 (para "outros")
const MODELO_TO_TECIDO_STEP_ID = {
  rolo: 'passo_4_tecido_rolo',
  romana: 'passo_4_tecido_romana',
  double_vision: 'passo_4_tecido_double',
  vertical: 'passo_4_tecido_vertical',
  madeira: 'passo_4_tecido_madeira',
  aluminio: 'passo_4_tecido_aluminio',
  painel: 'passo_4_tecido_painel',
  cortina: 'passo_4_tecido_cortina',
  romana_teto: 'passo_4_tecido_teto_romana',
  celular_teto: 'passo_4_tecido_teto_celular',
  plissada_teto: 'passo_4_tecido_teto_plissada',
};

/** Para ambiente "outros": lista completa de modelos (como no V1). Inclui "teto" que leva a sub-escolha. */
export function getModelosOutros() {
  const passoModelo = V1_STEPS.find((s) => s.id === 'passo_4_modelo');
  const passoModeloTeto = V1_STEPS.find((s) => s.id === 'passo_4_modelo_teto');
  const opts = (passoModelo?.options || []).filter((o) => o.value !== 'nao_sei');
  const tetoOpts = (passoModeloTeto?.options || []).filter((o) => o.value !== 'nao_sei');
  return [
    ...opts.filter((o) => o.value !== 'teto').map((o) => ({ value: o.value, label: o.label, description: o.description, image: o.image })),
    ...tetoOpts.map((o) => ({ value: o.value, label: o.label, description: o.description, image: o.image })),
  ];
}

/** Para ambiente "outros": tecidos do modelo escolhido (do V1). */
export function getTecidosParaOutros(modelo) {
  const stepId = MODELO_TO_TECIDO_STEP_ID[modelo];
  if (!stepId) return [];
  const step = V1_STEPS.find((s) => s.id === stepId);
  const options = step?.options || [];
  return options.filter((o) => o.value !== 'nao_sei').map((o) => ({ value: o.value, label: o.label, description: o.description, image: o.image }));
}

const CORTINA_TECIDOS = ['blackout', 'semi_blackout_70', 'voil', 'linho', 'dupla'];

// Ordem de exibição: Blackout → Semi Blackout → Translúcido → Tela Solar 1/3/5% → Não sei → Resto
const TECIDO_DISPLAY_ORDER = {
  blackout: 0, fr_blackout: 0,
  semi_blackout_70: 1,
  translucida: 2, voil: 2, linho: 2, fr_translucido: 2,
  tela_1: 3, tela_3: 3, tela_5: 3, metalizado_1: 3, metalizado_3: 3, metalizado_5: 3,
  nao_sei: 4,
};
function tecidoSortPriority(value) {
  if (TECIDO_DISPLAY_ORDER[value] !== undefined) return TECIDO_DISPLAY_ORDER[value];
  return 5;
}

/** Lista unificada de tecidos para exibir quando o modelo é "não sei" (V4/V5). Inclui nextStep por tecido. Ordem: Blackout, Semi Blackout, Translúcido, Tela Solar, Não sei, resto. */
export function getTodosTecidosParaNaoSei() {
  const seen = new Set();
  const list = [];
  for (const modelKey of Object.keys(MODELO_TO_TECIDO_STEP_ID)) {
    const tecidos = getTecidosParaOutros(modelKey);
    for (const t of tecidos) {
      if (seen.has(t.value)) continue;
      seen.add(t.value);
      const nextStep = CORTINA_TECIDOS.includes(t.value) ? 'passo_4_acabamento' : 'passo_5_acionamento';
      const image = t.image || getImageForModeloTecido(modelKey, t.value);
      list.push({ ...t, image, nextStep });
    }
  }
  list.sort((a, b) => tecidoSortPriority(a.value) - tecidoSortPriority(b.value));
  list.push({ ...NAO_SEI_OPTION, nextStep: 'passo_5_acionamento' });
  return list;
}

// Mapa modelo|tecido -> image path (do V1) para V6 exibir imagens nas combinações
const MODELO_TECIDO_IMAGE = {};
Object.keys(MODELO_TO_TECIDO_STEP_ID).forEach((modelKey) => {
  const stepId = MODELO_TO_TECIDO_STEP_ID[modelKey];
  const step = V1_STEPS.find((s) => s.id === stepId);
  (step?.options || []).forEach((opt) => {
    if (opt.value && opt.value !== 'nao_sei' && opt.image) MODELO_TECIDO_IMAGE[`${modelKey}|${opt.value}`] = opt.image;
  });
});

export function getImageForModeloTecido(modelKey, tecidoValue) {
  return MODELO_TECIDO_IMAGE[`${modelKey}|${tecidoValue}`] || undefined;
}

/** V5: todos os modelos, com recommended: true nos recomendados para o ambiente. */
export function getModelosParaV5(ambiente) {
  const todos = getModelosOutros();
  const recomendados = getModelosPorAmbiente(ambiente);
  const setRec = new Set((recomendados || []).map((r) => r.value));
  return todos.map((m) => ({ ...m, recommended: setRec.has(m.value) }));
}

/** V5: todos os tecidos do modelo, com recommended: true nos recomendados para (ambiente, modelo). */
export function getTecidosParaV5(ambiente, modelo) {
  const todos = getTecidosParaOutros(modelo);
  const recomendados = getTecidosPorAmbienteModelo(ambiente, modelo);
  const setRec = new Set((recomendados || []).map((r) => r.value));
  return todos.map((t) => ({ ...t, recommended: setRec.has(t.value) }));
}

// --- TECIDOS POR AMBIENTE + MODELO (chave: ambiente|modelo) ---
// Cada entrada: array de { value, label, description?, image? }
// Imagens reutilizam paths do V1 quando existir correspondência.

const T = (value, label, description, image = undefined) => ({ value, label, description, image });

const AMBIENTE_MODELO_TECIDOS_MAP = {
  // --- VARANDA E SACADA ---
  'varanda_sacada|rolo': [
    T('tela_5', 'Tela Solar 5%', 'Protege o mobiliário e reduz o calor, mantendo a melhor visibilidade da paisagem externa.'),
    T('tela_3', 'Tela Solar 3%', 'Equilíbrio ideal entre conforto térmico e visão, perfeita para varandas muito ensolaradas.'),
    T('metalizado_5', 'Screen Metalizado 5%', 'Reflete o calor de forma superior, garantindo frescor mesmo em sacadas envidraçadas.'),
  ],
  'varanda_sacada|painel': [
    T('tela_3', 'Tela Solar 3%', 'Painéis largos que deslizam suavemente, oferecendo proteção solar com visual limpo.'),
    T('tela_5', 'Tela Solar 5%', 'Permite a entrada de luz natural e mantém a conexão visual com o ambiente externo.'),
    T('decorativa', 'Decorativa / Texturizada', 'Valoriza a varanda gourmet com tramas que trazem sofisticação e design ao espaço.'),
  ],
  'varanda_sacada|vertical': [
    T('pvc_blackout', 'PVC Blackout', 'Altamente resistente ao sol e fácil de limpar, ideal para áreas abertas ou com churrasqueira.'),
    T('decorativo', 'Tecido Decorativo', 'Traz leveza e movimento para a varanda, criando um ambiente de lazer mais acolhedor.'),
  ],
  'varanda_sacada|cortina': [
    T('linho', 'Translúcido de Linho', 'Sofisticação natural que resiste bem à luz, criando um refúgio relaxante na sacada.'),
    T('voil', 'Translúcido Voil', 'Leveza máxima para quem busca apenas suavizar a luz e garantir um caimento elegante.'),
  ],
  'varanda_sacada|romana': [
    T('tela_3', 'Tela solar 3%', 'Equilíbrio ideal entre conforto térmico e visibilidade externa na sacada.'),
    T('tela_5', 'Tela solar 5%', 'Deixa entrar mais luz, mantendo proteção solar e sensação de amplitude.'),
    T('translucida', 'Translúcida', 'Luz suave e privacidade com o ambiente sempre claro e agradável.'),
  ],
  'varanda_sacada|double_vision': [
    T('semi_blackout_translucido', 'Semi-Blackout com translúcido', 'Diminui o brilho e o calor, mantendo luminosidade confortável.'),
    T('blackout_translucido', 'Blackout com translúcido', 'Para quem quer privacidade máxima e opção de escurecer quando necessário.'),
  ],

  // --- SALA DE ESTAR ---
  'sala_estar|double_vision': [
    T('blackout_translucido', 'Blackout com Translúcido', 'Escurece o ambiente para filmes ou libera a visão externa com um ajuste.'),
    T('semi_blackout_translucido', 'Semi-Blackout com Translúcido', 'Reduz o reflexo na TV mantendo uma iluminação suave e muito elegante.'),
  ],
  'sala_estar|romana': [
    T('blackout', 'Blackout', 'Bloqueio total da luz externa, criando o clima perfeito de cinema em casa.'),
    T('translucida', 'Translúcida', 'Filtra a claridade com suavidade, garantindo uma sala iluminada e privativa.'),
    T('tela_3', 'Tela Solar 3%', 'Protege móveis e tapetes do sol sem esconder a paisagem da sua janela.'),
  ],
  'sala_estar|rolo': [
    T('blackout', 'Blackout', 'Vedação eficiente da luz para máxima imersão em jogos e sessões de cinema.'),
    T('tela_5', 'Tela Solar 5%', 'Conforto térmico e visual com maior transparência para ambientes integrados.'),
    T('translucida', 'Translúcida', 'Transforma a luz forte em um brilho suave, ideal para receber visitas com conforto.'),
  ],
  'sala_estar|madeira': [
    T('natural_fita', 'Madeira Natural com Fita', 'Acabamento de luxo que esconde furos e traz aconchego rústico à sala.'),
    T('bambu_fita', 'Bambu com Fita', 'Leveza natural e sustentável com textura que valoriza decorações tropicais.'),
  ],
  'sala_estar|painel': [
    T('tela_3', 'Tela Solar 3%', 'Proteção solar de alta performance para grandes vidraças com visão externa.'),
    T('decorativa', 'Decorativa / Texturizada', 'Painéis largos com tramas que funcionam como um elemento de design na parede.'),
  ],
  'sala_estar|cortina': [
    T('dupla', 'Cortina Dupla (Voil + Blackout)', 'Versatilidade total: leveza do voil de dia e escuridão do blackout para filmes.'),
    T('linho', 'Translúcido de Linho', 'Sofisticação natural com caimento impecável para salas de estar modernas.'),
    T('semi_blackout_70', 'Semi-Blackout 70%', 'Equilibra privacidade e entrada de luz sem escurecer totalmente o ambiente.'),
  ],

  // --- QUARTO ---
  'quarto|rolo': [
    T('blackout', 'Blackout', 'Bloqueio total da luz externa para um sono profundo e reparador a qualquer hora.'),
    T('hospitalar', 'Hospitalar Antimicrobiano', 'Perfeito para quartos infantis, facilitando a higiene e protegendo contra alergias.'),
  ],
  'quarto|cortina': [
    T('dupla', 'Cortina Dupla (Voil + Blackout)', 'A escolha completa: privacidade e luz suave de dia, blackout total para dormir.'),
    T('blackout', 'Blackout', 'Tecido encorpado que bloqueia a luz e ajuda a abafar ruídos externos da rua.'),
    T('linho', 'Translúcido de Linho', 'Visual nobre e toque macio, ideal para quartos de casal que buscam sofisticação.'),
  ],
  'quarto|romana': [
    T('blackout', 'Blackout', 'Une a estética refinada das dobras com a funcionalidade do bloqueio de luz.'),
    T('decorativo', 'Tecido Decorativo', 'Traz texturas e cores que complementam o enxoval e a decoração do dormitório.'),
    T('translucida', 'Translúcida', 'Cria uma iluminação difusa e romântica, mantendo a privacidade dos moradores.'),
  ],
  'quarto|double_vision': [
    T('blackout_translucido', 'Blackout com Translúcido', 'Oferece o melhor dos dois mundos: design moderno com controle de luz para o sono.'),
    T('semi_blackout_translucido', 'Semi-Blackout com Translúcido', 'Ideal para quartos que não recebem sol direto, mantendo o ambiente aconchegante.'),
  ],
  'quarto|madeira': [
    T('natural_fita', 'Madeira Natural com Fita', 'As fitas bloqueiam a luz que passaria pelos furos, garantindo mais escuridão.'),
    T('eco_fita', 'Eco Wood com Fita', 'Resistente e sustentável, uma ótima opção para quartos com decoração moderna.'),
  ],

  // --- COZINHA E LAVANDERIA ---
  'cozinha_lavanderia|aluminio': [
    T('lamina_25', 'Lâmina 25mm (Padrão)', 'Prática e funcional, permite controlar o vento e a luz sem abrir mão da privacidade.'),
    T('perfurada', 'Perfurada (Micro furos)', 'Suaviza a entrada de sol e permite a ventilação mesmo quando a persiana está fechada.'),
    T('lamina_16', 'Lâmina 16 mm (Micro)', 'Delicada e discreta, ideal para janelas menores ou instaladas sobre a bancada.'),
  ],
  'cozinha_lavanderia|rolo': [
    T('tela_5', 'Tela Solar 5%', 'Maior entrada de luz e visão externa com proteção solar; material fácil de limpar.'),
    T('tela_3', 'Tela Solar 3%', 'Equilíbrio ideal entre visibilidade e bloqueio de calor para áreas de serviço.'),
    T('translucida', 'Translúcida', 'Difunde a luz natural, mantendo a cozinha clara e garantindo total privacidade.'),
  ],
  'cozinha_lavanderia|madeira': [
    T('eco_cadarco', 'Eco Wood com Cadarço', 'Sustentável e resistente à umidade, traz a beleza da madeira para a área gourmet.'),
    T('eco_fita', 'Eco Wood com Fita', 'Acabamento sofisticado com fitas que aumentam a privacidade e o apelo estético.'),
  ],
  'cozinha_lavanderia|vertical': [
    T('pvc_blackout', 'PVC Blackout', 'Lâminas fáceis de limpar e imbatíveis contra a umidade; ótimo custo-benefício.'),
    T('translucida', 'Translúcida', 'Mantém a lavanderia bem iluminada com luz difusa e visual organizado.'),
  ],

  // --- BANHEIRO E LAVABO ---
  'banheiro_lavabo|aluminio': [
    T('lamina_25', 'Lâmina 25mm (Padrão)', 'Resistente ao vapor, permite controlar a ventilação sem expor o interior do banheiro.'),
    T('lamina_16', 'Lâmina 16 mm (Micro)', 'Visual delicado e discreto, ideal para as janelas pequenas típicas de banheiros.'),
    T('fosco', 'Acabamento Fosco ou Acetinado', 'Visual sofisticado que reduz reflexos, garantindo discrição e elegância ao ambiente.'),
  ],
  'banheiro_lavabo|rolo': [
    T('tela_1', 'Tela Solar 1%', 'Bloqueio quase total da visão externa, mantendo a proteção solar e facilidade de limpeza.'),
    T('translucida', 'Translúcida', 'Garante privacidade total (sem silhuetas) enquanto mantém o banheiro claro e iluminado.'),
    T('blackout', 'Blackout', 'Bloqueio total da luz e visão, ideal para banheiros com janelas muito expostas.'),
  ],
  'banheiro_lavabo|madeira': [
    T('eco_fita', 'Eco Wood com Fita', 'Sofisticação máxima para lavabos, com fitas que garantem total privacidade nos furos.'),
    T('eco_cadarco', 'Eco Wood com Cadarço', 'Visual rústico e nobre em material sintético que não deforma com o vapor do banho.'),
  ],
  'banheiro_lavabo|romana': [
    T('decorativo', 'Tecido Decorativo', 'Foco estético com texturas que transformam o lavabo em um ambiente planejado.'),
    T('translucida', 'Translúcida', 'Cria uma atmosfera relaxante com luz suave, ideal para banheiros de suítes master.'),
  ],

  // --- ESCRITÓRIO E HOME OFFICE ---
  'escritorio_homeoffice|rolo': [
    T('tela_3', 'Tela Solar 3%', 'O equilíbrio perfeito: elimina o reflexo no monitor sem deixar o escritório escuro.'),
    T('metalizado_3', 'Screen Metalizado 3%', 'Máximo controle de calor e ofuscamento, ideal para escritórios que recebem muito sol.'),
    T('translucida', 'Translúcida', 'Garante privacidade total e luz difusa, criando um ambiente de trabalho calmo e claro.'),
  ],
  'escritorio_homeoffice|madeira': [
    T('natural_fita', 'Madeira Natural com Fita', 'Visual nobre e executivo que oferece excelente isolamento térmico e acústico.'),
    T('bambu_fita', 'Bambu com Fita', 'Opção sustentável e moderna, trazendo uma textura leve e criativa para o home office.'),
  ],
  'escritorio_homeoffice|double_vision': [
    T('semi_blackout_translucido', 'Semi-Blackout com Translúcido', 'Reduz a luminosidade excessiva com um visual contemporâneo e tecnológico.'),
    T('blackout_translucido', 'Blackout com Translúcido', 'Controle total da luz para apresentações ou momentos que exigem concentração máxima.'),
  ],
  'escritorio_homeoffice|aluminio': [
    T('perfurada', 'Perfurada (Micro furos)', 'Evita o reflexo na tela mas mantém a visão do exterior, reduzindo a sensação de confinamento.'),
    T('lamina_25', 'Lâmina 25 mm (Padrão)', 'Controle funcional e direto da claridade, com visual limpo e excelente custo-benefício.'),
  ],
  'escritorio_homeoffice|romana': [
    T('blackout', 'Blackout', 'Bloqueio total da luz para apresentações ou ambientes com projetor.'),
    T('translucida', 'Translúcida', 'Luz difusa e suave, criando um ambiente de trabalho calmo e bem iluminado.'),
    T('tela_3', 'Tela Solar 3%', 'Elimina o reflexo no monitor sem escurecer o ambiente de trabalho.'),
  ],
  'escritorio_homeoffice|vertical': [
    T('translucida', 'Translúcida', 'Iluminação uniforme em todo o escritório, mantendo a privacidade durante reuniões.'),
    T('decorativo', 'Tecido Decorativo', 'Quebra a frieza do ambiente corporativo trazendo textura e elegância ao espaço.'),
    T('pvc_blackout', 'PVC Blackout', 'Durável e prático, ideal para quem precisa de bloqueio total com fácil manutenção.'),
  ],
  'escritorio_homeoffice|painel': [
    T('tela_3', 'Tela Solar 3%', 'Proteção solar eficiente que elimina reflexos em telas sem comprometer a vista externa.'),
    T('translucida', 'Translúcida', 'Delimita o espaço de trabalho com privacidade mantendo o ambiente claro e organizado.'),
    T('blackout', 'Blackout', 'Fechamento total para salas de reunião ou apresentações com projeção de imagens.'),
  ],

  // --- TETO DE VIDRO / CLARABOIAS ---
  'teto_vidro_claraboia|romana_teto': [
    T('blackout', 'Blackout', 'Bloqueio total da luz superior, ideal para transformar áreas envidraçadas em salas de TV.'),
    T('tela_1', 'Tela Solar 1%', 'Visibilidade externa mínima e forte bloqueio de luminosidade.'),
    T('tela_3', 'Tela Solar 3%', 'Filtra o calor e o brilho intenso do sol mantendo a claridade e o conforto térmico.'),
    T('tela_5', 'Tela Solar 5%', 'Maior entrada de luz, mantendo visão externa com proteção solar.'),
    T('translucida', 'Translúcida', 'Difunde a luz solar de forma suave, eliminando sombras fortes e garantindo privacidade.'),
  ],
  'teto_vidro_claraboia|celular_teto': [
    T('blackout', 'Blackout', 'Máxima vedação de luz e proteção térmica superior contra o aquecimento do vidro.'),
    T('translucida', 'Translúcida', 'Iluminação natural perfeita com redução drástica da entrada de calor no ambiente.'),
  ],
  'teto_vidro_claraboia|plissada_teto': [
    T('blackout', 'Blackout', 'Oferece escuridão total com um visual delicado e recolhimento muito compacto.'),
    T('translucida', 'Translúcida', 'Suaviza a luz solar direta, proporcionando conforto visual e leveza estética ao teto.'),
  ],
};

/** Retorna tecidos recomendados para (ambiente, modelo). Para ambiente "outros" usar getTecidosParaOutros(modelo). */
export function getTecidosPorAmbienteModelo(ambiente, modelo) {
  if (ambiente === 'outros') return getTecidosParaOutros(modelo);
  const key = `${ambiente}|${modelo}`;
  return AMBIENTE_MODELO_TECIDOS_MAP[key] || [];
}

/** Retorna modelos recomendados para o ambiente. Para "outros" retorna lista completa (V1). */
export function getModelosPorAmbiente(ambiente) {
  if (ambiente === 'outros') return getModelosOutros();
  return AMBIENTE_MODELOS[ambiente] || [];
}

// --- ACABAMENTO CORTINA (fixo para todas as cortinas) ---
export const ACABAMENTO_CORTINA_OPTIONS = [
  { value: 'ilhos', label: 'Ilhós' },
  { value: 'wave', label: 'Wave' },
  { value: 'americana', label: 'Prega Americana' },
  { value: 'macho', label: 'Prega Macho' },
  { value: 'femea', label: 'Prega Fêmea' },
  { value: 'franzida', label: 'Prega Franzida' },
];

/** Opções de acabamento de cortina com imagem, por tecido (para V4, V5, V6). nextStep é definido no componente. */
export const ACABAMENTO_CORTINA_OPTIONS_BY_TECIDO = {
  blackout: [
    { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', image: '/tecidos/cortina-blackout-01-ilhos.png' },
    { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', image: '/tecidos/cortina-blackout-02-wave-ripplefold.png' },
    { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', image: '/tecidos/cortina-blackout-03-prega-americana.png' },
    { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', image: '/tecidos/cortina-blackout-04-prega-macho.png' },
    { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', image: '/tecidos/cortina-blackout-05-prega-femea.png' },
    { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', image: '/tecidos/cortina-blackout-06-prega-franzida.png' },
  ],
  semi_blackout_70: [
    { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', image: '/tecidos/cortina-semi-blackout-70pct-01-ilhos.png' },
    { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', image: '/tecidos/cortina-semi-blackout-70pct-02-wave-ripplefold.png' },
    { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', image: '/tecidos/cortina-semi-blackout-70pct-03-prega-americana.png' },
    { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', image: '/tecidos/cortina-semi-blackout-70pct-04-prega-macho.png' },
    { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', image: '/tecidos/cortina-semi-blackout-70pct-05-prega-femea.png' },
    { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', image: '/tecidos/cortina-semi-blackout-70pct-06-prega-franzida.png' },
  ],
  voil: [
    { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', image: '/tecidos/cortina-translucida-voil-01-ilhos.png' },
    { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', image: '/tecidos/cortina-translucida-voil-02-wave-ripplefold.png' },
    { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', image: '/tecidos/cortina-translucida-voil-03-prega-americana.png' },
    { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', image: '/tecidos/cortina-translucida-voil-04-prega-macho.png' },
    { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', image: '/tecidos/cortina-translucida-voil-05-prega-femea.png' },
    { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', image: '/tecidos/cortina-translucida-voil-06-prega-franzida.png' },
  ],
  linho: [
    { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', image: '/tecidos/cortina-translucida-linho-01-ilhos.png' },
    { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', image: '/tecidos/cortina-translucida-linho-02-wave-ripplefold.png' },
    { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', image: '/tecidos/cortina-translucida-linho-03-prega-americana.png' },
    { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', image: '/tecidos/cortina-translucida-linho-04-prega-macho.png' },
    { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', image: '/tecidos/cortina-translucida-linho-05-prega-femea.png' },
    { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', image: '/tecidos/cortina-translucida-linho-06-prega-franzida.png' },
  ],
  dupla: [
    { label: 'Ilhós', description: 'Acabamento moderno e prático, com deslizamento fácil e visual contemporâneo.', value: 'ilhos', image: '/tecidos/cortina-dupla-voil-blackout-01-ilhos.png' },
    { label: 'Wave (Ripplefold)', description: 'Ondulação uniforme e elegante, proporcionando caimento sofisticado e contínuo.', value: 'wave', image: '/tecidos/cortina-dupla-voil-blackout-02-wave-ripplefold.png' },
    { label: 'Prega Americana (argola ou trilho)', description: 'Visual clássico e alinhado, com pregas marcadas que garantem elegância e movimento.', value: 'americana', image: '/tecidos/cortina-dupla-voil-blackout-03-prega-americana.png' },
    { label: 'Prega Macho (argola ou trilho)', description: 'Prega reta e estruturada, ideal para ambientes modernos e bem definidos.', value: 'macho', image: '/tecidos/cortina-dupla-voil-blackout-04-prega-macho.png' },
    { label: 'Prega Fêmea (argola ou trilho)', description: 'Acabamento delicado com pregas internas, oferecendo um visual suave e refinado.', value: 'femea', image: '/tecidos/cortina-dupla-voil-blackout-05-prega-femea.png' },
    { label: 'Prega Franzida (argola ou trilho)', description: 'Caimento volumoso e tradicional, com pregas mais cheias e efeito aconchegante.', value: 'franzida', image: '/tecidos/cortina-dupla-voil-blackout-06-prega-franzida.png' },
  ],
};

// --- ACIONAMENTO: Manual / Motorizada (Painel e Vertical não mostram Motorizada) ---
export const ACIONAMENTO_OPTIONS = [
  { value: 'manual', label: 'Manual (com corrente, haste ou bastão)', image: '/acionamento/manual-corrente-haste-bastao.png' },
  { value: 'motorizada', label: 'Motorizada', image: '/acionamento/Motorizada.png' },
];

export const MODELOS_SEM_MOTORIZADA = ['painel', 'vertical'];

// --- V6: combinações modelo + tecido (uma opção por par recomendado) ---
/** Para V6: retorna lista de opções combinadas (modelo + tecido) para o ambiente. Cada item: { value, label, description?, modelKey, tecidoValue, image? }. */
export function getCombinacoesModeloTecido(ambiente) {
  if (ambiente === 'outros') return getCombinacoesModeloTecidoOutros();
  const list = [];
  const modelos = getModelosPorAmbiente(ambiente);
  for (const m of modelos) {
    const tecidos = getTecidosPorAmbienteModelo(ambiente, m.value);
    for (const t of tecidos) {
      const label = formatComboLabel(m.label, t.label);
      const image = t.image || getImageForModeloTecido(m.value, t.value);
      list.push({ value: `${m.value}|${t.value}`, label, description: t.description, modelKey: m.value, tecidoValue: t.value, image });
    }
  }
  return list;
}

function formatComboLabel(modeloLabel, tecidoLabel) {
  if (modeloLabel.startsWith('Persiana ')) return `${modeloLabel} ${tecidoLabel}`;
  if (modeloLabel.startsWith('Cortina')) return `${modeloLabel} ${tecidoLabel}`;
  if (modeloLabel.startsWith('Horizontal')) return `Persiana ${modeloLabel} ${tecidoLabel}`;
  return `${modeloLabel} ${tecidoLabel}`;
}

function getCombinacoesModeloTecidoOutros() {
  const list = [];
  const modelos = getModelosOutros();
  for (const m of modelos) {
    const tecidos = getTecidosParaOutros(m.value);
    for (const t of tecidos) {
      const label = formatComboLabel(m.label, t.label);
      const image = t.image || getImageForModeloTecido(m.value, t.value);
      list.push({ value: `${m.value}|${t.value}`, label, description: t.description, modelKey: m.value, tecidoValue: t.value, image });
    }
  }
  return list;
}
