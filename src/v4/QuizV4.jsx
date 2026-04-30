import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutV1 from '../components/LayoutV1';
import StepQuestionV1 from '../components/StepQuestionV1';
import WelcomeScreenV1 from '../components/WelcomeScreenV1';
import QuizStepper from '../components/QuizStepper';
import TrustBadges from '../components/TrustBadges';
import { STEPS as STEPS_BASE } from './steps';
import {
  AMBIENTES,
  getModelosPorAmbiente,
  getTecidosPorAmbienteModelo,
  getImageForModeloTecido,
  getTodosTecidosParaNaoSei,
  NAO_SEI_OPTION,
  ACABAMENTO_CORTINA_OPTIONS_BY_TECIDO,
  ACIONAMENTO_OPTIONS,
  MODELOS_SEM_MOTORIZADA,
} from '../data/ambienteQuizData';
import { enrichProdutoForWebhook } from '../utils/quizPayloadLabels.js';
import { buildMetaNewLeadFromFullPayload, WEBHOOK_SITE_NEW_LEAD_URL, fetchSiteNewLead, logWebhookSettledResults } from '../utils/siteNewLeadPayload.js';

// Webhook URLs configuráveis (variável de ambiente ou constante)
const WEBHOOK_QUIZ_V4_URL = import.meta.env.VITE_WEBHOOK_QUIZ_V4_URL || 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv4';
const WEBHOOK_GHL_URL = 'https://services.leadconnectorhq.com/hooks/kjSMdwtGb8lg6g7i0jVi/webhook-trigger/065ae1f3-3bab-43ab-b9bf-57c8f44f6074';

const formatWhatsAppForGHL = (whatsapp) => {
  if (!whatsapp) return whatsapp;
  const numbersOnly = whatsapp.replace(/[^\d]/g, '');
  if (!numbersOnly) return whatsapp;
  let phoneNumber = numbersOnly;
  if (phoneNumber.startsWith('55') && phoneNumber.length >= 12) phoneNumber = phoneNumber.substring(2);
  return `+55${phoneNumber}`;
};

function getProdutoFromItemV4(item) {
  if (!item) return { tipo: '', modelo: '', tecido: '', acabamento: '', acionamento: '', medidas: { largura: '', altura: '', unidade: 'cm' }, ambiente: '', observacoes: '' };
  const modelo = item.passo_2_modelo || '';
  const tecido = item.passo_3_tecido || '';
  const acabamento = item.passo_4_acabamento || '';
  const acionamento = item.passo_5_acionamento || '';
  let largura = '';
  let altura = '';
  if (typeof item.passo_6_medidas === 'object') {
    largura = item.passo_6_medidas?.largura || '';
    altura = item.passo_6_medidas?.altura || '';
  }
  const tipo = modelo === 'cortina' ? 'cortina' : modelo?.includes('_teto') ? 'persiana_teto' : 'persiana';
  const modeloPayload = modelo === 'cortina' && tecido ? `cortina ${tecido}` : modelo;
  const tecidoPayload = modelo === 'cortina' ? acabamento : tecido;
  return {
    tipo,
    modelo: modeloPayload,
    tecido: tecidoPayload,
    acabamento: modelo === 'cortina' ? acabamento : '',
    acionamento,
    medidas: { largura, altura, unidade: 'cm' },
    ambiente: item.passo_1_ambiente || '',
    observacoes: item.passo_7_observacoes || '',
  };
}

function buildPayloadV4(formId, leadData, stepData, currentItem, options = {}) {
  const { sessionStartedAt = null, stepsHistory = [] } = options;
  const submittedAt = new Date();
  const produto = enrichProdutoForWebhook(getProdutoFromItemV4(currentItem));
  const nome = stepData?.nome || '';
  const whatsapp = stepData?.whatsapp ? formatWhatsAppForGHL(stepData.whatsapp) : '';
  const email = stepData?.email || '';
  const cidade = stepData?.cidade || '';
  const bairro = stepData?.bairro || '';
  const ambientes = Array.isArray(stepData?.ambientes) ? stepData.ambientes.join(', ') : (currentItem?.passo_1_ambiente || stepData?.passo_1_ambiente || '');
  const sessionStartedAtISO = sessionStartedAt ? new Date(sessionStartedAt).toISOString() : null;
  const submittedAtISO = submittedAt.toISOString();
  const durationSeconds = sessionStartedAt ? Math.round((submittedAt - new Date(sessionStartedAt)) / 1000) : null;

  return {
    metadata: {
      form_id: formId || 'FORMR20',
      quiz_version: 'v4',
      source: 'quiz_web',
      submitted_at: submittedAtISO,
      submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    },
    timestamps: {
      submitted_at: submittedAtISO,
      submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      session_started_at: sessionStartedAtISO,
      duration_seconds: durationSeconds,
      duration_readable: durationSeconds != null ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : null,
    },
    utm: {
      utm_source: leadData?.utm_source || '',
      utm_medium: leadData?.utm_medium || '',
      utm_campaign: leadData?.utm_campaign || '',
      referrer: typeof document !== 'undefined' ? (document.referrer || '') : '',
    },
    contact: { nome, whatsapp, email, cidade, bairro, ambientes },
    produto: {
      passo_1_intencao: '',
      descricao_livre: '',
      ambiente: produto.ambiente,
      tipo: produto.tipo,
      modelo: produto.modelo,
      modelo_codigo: produto.modelo_codigo,
      tecido: produto.tecido,
      tecido_codigo: produto.tecido_codigo,
      acabamento: produto.acabamento,
      acabamento_codigo: produto.acabamento_codigo,
      acionamento: produto.acionamento,
      medidas: produto.medidas,
      observacoes: produto.observacoes,
    },
    itens_adicionais: '',
    itens_adicionais_count: 0,
    journey: { steps_completed: stepsHistory, steps_count: stepsHistory?.length ?? 0 },
    _flat: {
      nome,
      whatsapp,
      email,
      cidade,
      bairro,
      ambientes,
      passo_1_intencao: '',
      descricao_livre: '',
      ambiente: produto.ambiente,
      tipo: produto.tipo,
      modelo: produto.modelo,
      modelo_codigo: produto.modelo_codigo,
      tecido: produto.tecido,
      tecido_codigo: produto.tecido_codigo,
      acabamento: produto.acabamento,
      acabamento_codigo: produto.acabamento_codigo,
      acionamento: produto.acionamento,
      largura: produto.medidas.largura,
      altura: produto.medidas.altura,
      observacoes: produto.observacoes,
      itens_adicionais: '',
    },
  };
}

export default function QuizV4() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentItem, setCurrentItem] = useState({});
  const [formId] = useState('FORMR20');
  const [leadData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return { utm_source: params.get('utm_source') || '', utm_medium: params.get('utm_medium') || '', utm_campaign: params.get('utm_campaign') || '' };
  });
  const [sessionStartedAt, setSessionStartedAt] = useState(null);

  const STEPS = useMemo(() => {
    const model = currentItem.passo_2_modelo;
    let steps = STEPS_BASE;
    if (model && model !== 'cortina') steps = steps.filter((s) => s.id !== 'passo_4_acabamento');
    if (model && (model === 'vertical' || model === 'painel')) steps = steps.filter((s) => s.id !== 'passo_5_acionamento');
    return steps;
  }, [currentItem.passo_2_modelo]);

  const activeStep = STEPS[currentStepIndex];

  const optionsPasso1 = useMemo(() => AMBIENTES.map((a) => ({ ...a, value: a.value, label: a.label, nextStep: 'passo_2_modelo' })), []);

  const optionsPasso2 = useMemo(() => {
    const ambiente = currentItem.passo_1_ambiente;
    if (!ambiente) return [];
    const modelos = getModelosPorAmbiente(ambiente);
    const opts = modelos.map((m) => ({ ...m, nextStep: 'passo_3_tecido' }));
    return [...opts, { ...NAO_SEI_OPTION, nextStep: 'passo_3_tecido' }];
  }, [currentItem.passo_1_ambiente]);

  const optionsPasso3 = useMemo(() => {
    const ambiente = currentItem.passo_1_ambiente;
    const modelo = currentItem.passo_2_modelo;
    if (!ambiente || !modelo) return [];
    // Com "Não sei" no modelo, passo_4_acabamento é removido de STEPS; todos os tecidos vão para passo_5_acionamento
    if (modelo === 'nao_sei') {
      const opts = getTodosTecidosParaNaoSei();
      return opts.map((o) => ({ ...o, nextStep: 'passo_5_acionamento' }));
    }
    const nextStep = modelo === 'cortina' ? 'passo_4_acabamento' : (modelo === 'vertical' || modelo === 'painel') ? 'passo_6_medidas' : 'passo_5_acionamento';
    const tecidos = getTecidosPorAmbienteModelo(ambiente, modelo);
    const opts = tecidos.map((t) => ({ ...t, image: t.image || getImageForModeloTecido(modelo, t.value), nextStep }));
    return [...opts, { ...NAO_SEI_OPTION, nextStep }];
  }, [currentItem.passo_1_ambiente, currentItem.passo_2_modelo]);

  const optionsPasso4 = useMemo(() => {
    const tecido = currentItem.passo_3_tecido;
    const opts = (ACABAMENTO_CORTINA_OPTIONS_BY_TECIDO[tecido] || ACABAMENTO_CORTINA_OPTIONS_BY_TECIDO.blackout) || [];
    return opts.map((o) => ({ ...o, nextStep: 'passo_5_acionamento' }));
  }, [currentItem.passo_3_tecido]);

  const optionsPasso5 = useMemo(() => {
    const modelo = currentItem.passo_2_modelo;
    // Motorizada só é ocultada para Painel e Vertical; demais modelos (Rolo, Cortina, etc.) mostram Manual + Motorizada
    const semMotorizada = modelo && MODELOS_SEM_MOTORIZADA.includes(modelo);
    if (semMotorizada) return ACIONAMENTO_OPTIONS.filter((o) => o.value !== 'motorizada').map((o) => ({ ...o, nextStep: 'passo_6_medidas' }));
    return ACIONAMENTO_OPTIONS.map((o) => ({ ...o, nextStep: 'passo_6_medidas' }));
  }, [currentItem.passo_2_modelo]);

  const modifiedStep = useMemo(() => {
    if (!activeStep) return null;
    const step = { ...activeStep };
    if (activeStep.id === 'passo_1_ambiente') step.options = optionsPasso1;
    else if (activeStep.id === 'passo_2_modelo') step.options = optionsPasso2;
    else if (activeStep.id === 'passo_3_tecido') step.options = optionsPasso3;
    else if (activeStep.id === 'passo_4_acabamento') step.options = optionsPasso4;
    else if (activeStep.id === 'passo_5_acionamento') step.options = optionsPasso5;
    if (activeStep.id === 'passo_7_observacoes') {
      step.inputs = [{ id: 'observacoes', label: '', placeholder: 'Ex: outro ambiente, preferências...', type: 'textarea' }];
    }
    return step;
  }, [activeStep, optionsPasso1, optionsPasso2, optionsPasso3, optionsPasso4, optionsPasso5]);

  const handleNext = (stepData) => {
    const updatedCurrentItem = { ...currentItem, ...stepData };
    setCurrentItem(updatedCurrentItem);

    // dataLayer/GTM comentado - usar apenas Meta
    // if (window.dataLayer) {
    //   window.dataLayer.push({ event: 'quiz_step_complete', quiz_version: 'v4', step_id: activeStep.id, step_question: activeStep.question });
    // }

    if (activeStep.isFinal) {
      const stepsHistory = history.map((i) => STEPS[i]?.id).filter(Boolean);
      const payload = buildPayloadV4(formId, leadData, stepData, updatedCurrentItem, { sessionStartedAt, stepsHistory });
      const webhookPayload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
      const siteNewLeadBody = buildMetaNewLeadFromFullPayload(payload, {
        currentItem: updatedCurrentItem,
        items: [],
        stepData,
        leadData,
        history,
      });
      const promises = [];
      const webhookLabels = [];
      if (WEBHOOK_QUIZ_V4_URL) {
        promises.push(fetch(WEBHOOK_QUIZ_V4_URL, webhookPayload));
        webhookLabels.push('n8n');
      }
      promises.push(fetch(WEBHOOK_GHL_URL, webhookPayload));
      webhookLabels.push('leadconnector');
      promises.push(fetchSiteNewLead(WEBHOOK_SITE_NEW_LEAD_URL, siteNewLeadBody));
      webhookLabels.push('site-new-lead');
      Promise.allSettled(promises)
        .then((results) => {
          logWebhookSettledResults('v4', webhookLabels, results);
          // if (window.dataLayer) window.dataLayer.push({ event: 'form_submission', form_id: formId, version: 'v4' });
          navigate('/quiz/obrigado');
        });
      return;
    }

    let nextStepId = activeStep.nextStep;
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOptionValue = Object.values(stepData)[0];
      const opts = modifiedStep?.options || [];
      const selectedOption = opts.find((opt) => opt.value === selectedOptionValue);
      if (selectedOption?.nextStep) nextStepId = selectedOption.nextStep;
    }

    if (activeStep.id === 'passo_6_medidas' && stepData?.passo_6_medidas) {
      nextStepId = 'passo_7_observacoes';
    }
    if (activeStep.id === 'passo_7_observacoes') {
      nextStepId = 'passo_8_captura';
    }

    const nextIndex = STEPS.findIndex((s) => s.id === nextStepId);
    if (nextIndex !== -1) {
      setHistory([...history, nextIndex]);
      setCurrentStepIndex(nextIndex);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentStepIndex(newHistory[newHistory.length - 1]);
    }
  };

  if (showWelcome) {
    return (
      <LayoutV1>
        <WelcomeScreenV1 onStart={() => { setSessionStartedAt(Date.now()); setShowWelcome(false); }} />
      </LayoutV1>
    );
  }

  if (!modifiedStep) return null;

  const canGoBackStep = history.length > 1;
  const selectedValue = currentItem[activeStep.id];
  const initialValues = activeStep.id === 'passo_6_medidas' ? (currentItem.passo_6_medidas || {}) : activeStep.id === 'passo_7_observacoes' ? { observacoes: currentItem.passo_7_observacoes || '' } : currentItem;

  return (
    <LayoutV1>
      <div className="w-full min-w-0 max-w-4xl mx-auto px-2 sm:px-4 pt-4 pb-8 sm:pt-8 sm:pb-16 box-border">
        <TrustBadges />
        <QuizStepper currentStepId={activeStep.id} steps={STEPS} />
        <StepQuestionV1
          question={modifiedStep.question}
          subtext={modifiedStep.subtext}
          type={modifiedStep.type}
          options={modifiedStep.options}
          inputs={modifiedStep.inputs || []}
          onOptionSelect={(opt) => handleNext({ [activeStep.id]: opt.value })}
          onNext={(data) => {
            if (activeStep.id === 'passo_6_medidas') {
              handleNext({ passo_6_medidas: { largura: data.largura ?? '', altura: data.altura ?? '' } });
              return;
            }
            if (activeStep.id === 'passo_7_observacoes') {
              handleNext({ passo_7_observacoes: data.observacoes ?? '' });
              return;
            }
            if (activeStep.id === 'passo_8_captura') handleNext(data);
          }}
          onBack={handleBack}
          canGoBack={canGoBackStep}
          formId={formId}
          initialValues={initialValues}
          selectedValue={selectedValue}
          stepId={activeStep.id}
          tecidoExpandableLimit={activeStep.id === 'passo_3_tecido' && currentItem.passo_2_modelo === 'nao_sei' ? 6 : undefined}
        />
      </div>
    </LayoutV1>
  );
}
