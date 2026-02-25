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
  getCombinacoesModeloTecido,
  ACABAMENTO_CORTINA_OPTIONS,
  ACIONAMENTO_OPTIONS,
  MODELOS_SEM_MOTORIZADA,
} from '../data/ambienteQuizData';

const WEBHOOK_QUIZ_V6_URL = import.meta.env.VITE_WEBHOOK_QUIZ_V6_URL || '';

const formatWhatsAppForGHL = (whatsapp) => {
  if (!whatsapp) return whatsapp;
  const numbersOnly = whatsapp.replace(/[^\d]/g, '');
  if (!numbersOnly) return whatsapp;
  let phoneNumber = numbersOnly;
  if (phoneNumber.startsWith('55') && phoneNumber.length >= 12) phoneNumber = phoneNumber.substring(2);
  return `+55${phoneNumber}`;
};

function getProdutoFromItemV6(item) {
  if (!item) return { tipo: '', modelo: '', tecido: '', acabamento: '', acionamento: '', medidas: { largura: '', altura: '', unidade: 'cm' }, ambiente: '', observacoes: '' };
  const modelo = item.passo_2_modelo || '';
  const tecido = item.passo_2_tecido || '';
  const acabamento = item.passo_3_acabamento || '';
  const acionamento = item.passo_4_acionamento || '';
  let largura = '';
  let altura = '';
  if (typeof item.passo_5_medidas === 'object') {
    largura = item.passo_5_medidas?.largura || '';
    altura = item.passo_5_medidas?.altura || '';
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
    observacoes: item.passo_6_observacoes || '',
  };
}

function buildPayloadV6(formId, leadData, stepData, currentItem, options = {}) {
  const { sessionStartedAt = null, stepsHistory = [] } = options;
  const submittedAt = new Date();
  const produto = getProdutoFromItemV6(currentItem);
  const nome = stepData?.nome || '';
  const whatsapp = stepData?.whatsapp ? formatWhatsAppForGHL(stepData.whatsapp) : '';
  const email = stepData?.email || '';
  const cidade = stepData?.cidade || '';
  const bairro = stepData?.bairro || '';
  const ambientes = Array.isArray(stepData?.ambientes) ? stepData.ambientes : [];
  const sessionStartedAtISO = sessionStartedAt ? new Date(sessionStartedAt).toISOString() : null;
  const submittedAtISO = submittedAt.toISOString();
  const durationSeconds = sessionStartedAt ? Math.round((submittedAt - new Date(sessionStartedAt)) / 1000) : null;

  return {
    metadata: {
      form_id: formId || 'FORMR20',
      quiz_version: 'v6',
      source: 'quiz_web',
      submitted_at: submittedAtISO,
      submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    },
    timestamps: { submitted_at: submittedAtISO, session_started_at: sessionStartedAtISO, duration_seconds: durationSeconds },
    utm: { utm_source: leadData?.utm_source || '', utm_medium: leadData?.utm_medium || '', utm_campaign: leadData?.utm_campaign || '' },
    contact: { nome, whatsapp, email, cidade, bairro, ambientes },
    produto: {
      ambiente: produto.ambiente,
      tipo: produto.tipo,
      modelo: produto.modelo,
      tecido: produto.tecido,
      acabamento: produto.acabamento,
      acionamento: produto.acionamento,
      medidas: produto.medidas,
      observacoes: produto.observacoes,
    },
    journey: { steps_completed: stepsHistory, steps_count: stepsHistory?.length ?? 0 },
  };
}

export default function QuizV6() {
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
    if (model && model !== 'cortina') return STEPS_BASE.filter((s) => s.id !== 'passo_3_acabamento');
    return STEPS_BASE;
  }, [currentItem.passo_2_modelo]);

  const activeStep = STEPS[currentStepIndex];

  const optionsPasso1 = useMemo(() => AMBIENTES.map((a) => ({ ...a, nextStep: 'passo_2_modelo_tecido' })), []);

  const optionsPasso2 = useMemo(() => {
    const ambiente = currentItem.passo_1_ambiente;
    if (!ambiente) return [];
    const combos = getCombinacoesModeloTecido(ambiente);
    return combos.map((c) => ({ value: c.value, label: c.label, nextStep: c.modelKey === 'cortina' ? 'passo_3_acabamento' : 'passo_4_acionamento', modelKey: c.modelKey, tecidoValue: c.tecidoValue }));
  }, [currentItem.passo_1_ambiente]);

  const optionsPasso3 = useMemo(
    () => ACABAMENTO_CORTINA_OPTIONS.map((o) => ({ ...o, nextStep: 'passo_4_acionamento' })),
    []
  );

  const optionsPasso4 = useMemo(() => {
    const modelo = currentItem.passo_2_modelo;
    const semMotorizada = MODELOS_SEM_MOTORIZADA.includes(modelo);
    if (semMotorizada) return ACIONAMENTO_OPTIONS.filter((o) => o.value !== 'motorizada').map((o) => ({ ...o, nextStep: 'passo_5_medidas' }));
    return ACIONAMENTO_OPTIONS.map((o) => ({ ...o, nextStep: 'passo_5_medidas' }));
  }, [currentItem.passo_2_modelo]);

  const modifiedStep = useMemo(() => {
    if (!activeStep) return null;
    const step = { ...activeStep };
    if (activeStep.id === 'passo_1_ambiente') step.options = optionsPasso1;
    else if (activeStep.id === 'passo_2_modelo_tecido') step.options = optionsPasso2;
    else if (activeStep.id === 'passo_3_acabamento') step.options = optionsPasso3;
    else if (activeStep.id === 'passo_4_acionamento') step.options = optionsPasso4;
    if (activeStep.id === 'passo_6_observacoes') step.inputs = [{ id: 'observacoes', label: '', placeholder: 'Ex: outro ambiente, preferências...', type: 'textarea' }];
    return step;
  }, [activeStep, optionsPasso1, optionsPasso2, optionsPasso3, optionsPasso4]);

  const handleNext = (stepData) => {
    let updatedCurrentItem = { ...currentItem, ...stepData };

    if (activeStep.id === 'passo_2_modelo_tecido' && stepData.passo_2_modelo_tecido) {
      const v = stepData.passo_2_modelo_tecido;
      const [modelKey, tecidoValue] = v.includes('|') ? v.split('|') : [v, ''];
      updatedCurrentItem = { ...updatedCurrentItem, passo_2_modelo: modelKey, passo_2_tecido: tecidoValue };
    }

    setCurrentItem(updatedCurrentItem);

    if (window.dataLayer) window.dataLayer.push({ event: 'quiz_step_complete', quiz_version: 'v6', step_id: activeStep.id, step_question: activeStep.question });

    if (activeStep.isFinal) {
      const stepsHistory = history.map((i) => STEPS[i]?.id).filter(Boolean);
      const payload = buildPayloadV6(formId, leadData, stepData, updatedCurrentItem, { sessionStartedAt, stepsHistory });
      const webhookPayload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
      const promises = [];
      if (WEBHOOK_QUIZ_V6_URL) promises.push(fetch(WEBHOOK_QUIZ_V6_URL, webhookPayload));
      Promise.all(promises)
        .then(() => {
          if (window.dataLayer) window.dataLayer.push({ event: 'form_submission', form_id: formId, version: 'v6' });
          navigate('/quiz/obrigado');
        })
        .catch(() => navigate('/quiz/obrigado'));
      return;
    }

    let nextStepId = activeStep.nextStep;
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedValue = Object.values(stepData)[0];
      const opts = modifiedStep?.options || [];
      const selectedOption = opts.find((opt) => opt.value === selectedValue);
      if (selectedOption?.nextStep) nextStepId = selectedOption.nextStep;
    }
    if (activeStep.id === 'passo_5_medidas' && stepData?.passo_5_medidas) nextStepId = 'passo_6_observacoes';
    if (activeStep.id === 'passo_6_observacoes') nextStepId = 'passo_7_captura';

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
  const selectedValue = activeStep.id === 'passo_2_modelo_tecido'
    ? (currentItem.passo_2_modelo && currentItem.passo_2_tecido ? `${currentItem.passo_2_modelo}|${currentItem.passo_2_tecido}` : currentItem.passo_2_modelo_tecido)
    : currentItem[activeStep.id];
  const initialValues = activeStep.id === 'passo_5_medidas' ? (currentItem.passo_5_medidas || {}) : activeStep.id === 'passo_6_observacoes' ? { observacoes: currentItem.passo_6_observacoes || '' } : currentItem;

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
          onOptionSelect={(opt) => {
            if (activeStep.id === 'passo_2_modelo_tecido') {
              handleNext({ passo_2_modelo_tecido: opt.value });
            } else {
              handleNext({ [activeStep.id]: opt.value });
            }
          }}
          onNext={(data) => {
            if (activeStep.id === 'passo_5_medidas') {
              handleNext({ passo_5_medidas: { largura: data.largura ?? '', altura: data.altura ?? '' } });
              return;
            }
            if (activeStep.id === 'passo_6_observacoes') {
              handleNext({ passo_6_observacoes: data.observacoes ?? '' });
              return;
            }
            if (activeStep.id === 'passo_7_captura') handleNext(data);
          }}
          onBack={handleBack}
          canGoBack={canGoBackStep}
          formId={formId}
          initialValues={initialValues}
          selectedValue={selectedValue}
          stepId={activeStep.id}
        />
      </div>
    </LayoutV1>
  );
}
