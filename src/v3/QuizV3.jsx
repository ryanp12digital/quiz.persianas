import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutV1 from '../components/LayoutV1';
import StepQuestionV1 from '../components/StepQuestionV1';
import WelcomeScreenV1 from '../components/WelcomeScreenV1';
import QuizStepper from '../components/QuizStepper';
import TrustBadges from '../components/TrustBadges';
import { STEPS } from './steps';
import { TECIDO_TO_MODELS, MODEL_OPTIONS_BY_KEY } from './stepsData';

const formatWhatsAppForGHL = (whatsapp) => {
  if (!whatsapp) return whatsapp;
  const numbersOnly = whatsapp.replace(/[^\d]/g, '');
  if (!numbersOnly) return whatsapp;
  let phoneNumber = numbersOnly;
  if (phoneNumber.startsWith('55') && phoneNumber.length >= 12) {
    phoneNumber = phoneNumber.substring(2);
  }
  return `+55${phoneNumber}`;
};

const buildStandardizedPayload = (formId, quizVersion, leadData, stepData, currentItem, items, options = {}) => {
  const { sessionStartedAt = null, stepsHistory = [] } = options;
  const submittedAt = new Date();
  const principalItem = Array.isArray(items) && items.length > 0 ? items[0] : currentItem;

  const nome = stepData?.nome || '';
  const whatsapp = stepData?.whatsapp ? formatWhatsAppForGHL(stepData.whatsapp) : '';
  const email = stepData?.email || '';
  const cidade = stepData?.cidade || '';
  const bairro = stepData?.bairro || '';
  const ambientes = Array.isArray(stepData?.ambientes) ? stepData.ambientes : [];

  let modelo = '';
  if (principalItem?.passo_4_modelo) modelo = principalItem.passo_4_modelo;
  else if (principalItem?.passo_4_modelo_teto) modelo = principalItem.passo_4_modelo_teto;

  let tecido = '';
  Object.keys(principalItem || {}).forEach(key => {
    if (key.startsWith('passo_4_tecido_')) tecido = principalItem[key] || '';
  });

  const acionamento = principalItem?.passo_3_acionamento || '';
  let largura = '', altura = '';
  if (principalItem?.passo_6_medidas && typeof principalItem.passo_6_medidas === 'object') {
    largura = principalItem.passo_6_medidas.largura || '';
    altura = principalItem.passo_6_medidas.altura || '';
  } else {
    largura = principalItem?.largura || '';
    altura = principalItem?.altura || '';
  }
  const acabamento = principalItem?.passo_4_acabamento_cortina || '';

  const itens_adicionais = Array.isArray(items) && items.length > 0
    ? items.map((item, idx) => ({
        ordem: idx + 1,
        descricao_livre: item?.descricao_livre || '',
        modelo: item?.passo_4_modelo || item?.passo_4_modelo_teto || '',
        tecido: item?.passo_4_tecido_rolo || item?.passo_4_tecido_cortina || item?.passo_4_tecido_vertical || item?.passo_4_tecido_painel || item?.passo_4_tecido_romana || item?.passo_4_tecido_double_vision || item?.passo_4_tecido_horizontal_madeira || item?.passo_4_tecido_horizontal_aluminio || item?.passo_4_tecido_teto || item?.passo_4_acabamento_cortina || '',
        acionamento: item?.passo_3_acionamento || '',
        largura: typeof item?.passo_6_medidas === 'object' ? item.passo_6_medidas?.largura : item?.largura,
        altura: typeof item?.passo_6_medidas === 'object' ? item.passo_6_medidas?.altura : item?.altura
      }))
    : [];

  const sessionStartedAtISO = sessionStartedAt ? new Date(sessionStartedAt).toISOString() : null;
  const submittedAtISO = submittedAt.toISOString();
  const durationSeconds = sessionStartedAt ? Math.round((submittedAt - new Date(sessionStartedAt)) / 1000) : null;

  return {
    metadata: { form_id: formId || '', quiz_version: quizVersion || '', source: 'quiz_web', submitted_at: submittedAtISO, submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) },
    timestamps: { submitted_at: submittedAtISO, submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), session_started_at: sessionStartedAtISO, duration_seconds: durationSeconds, duration_readable: durationSeconds != null ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : null },
    utm: { utm_source: leadData?.utm_source || '', utm_medium: leadData?.utm_medium || '', utm_campaign: leadData?.utm_campaign || '', referrer: typeof document !== 'undefined' ? (document.referrer || '') : '' },
    contact: { nome, whatsapp, email, cidade, bairro, ambientes, ambientes_count: ambientes?.length ?? 0 },
    quiz_answers: { modelo, tecido, acionamento, medidas: { largura, altura, unidade: 'cm' }, acabamento },
    itens_adicionais,
    itens_adicionais_count: itens_adicionais?.length ?? 0,
    journey: { steps_completed: stepsHistory, steps_count: stepsHistory?.length ?? 0 },
    _flat: { form_id: formId || '', quiz_version: quizVersion || '', submitted_at: submittedAtISO, session_started_at: sessionStartedAtISO, duration_seconds: durationSeconds, utm_source: leadData?.utm_source || '', utm_medium: leadData?.utm_medium || '', utm_campaign: leadData?.utm_campaign || '', nome, whatsapp, email, cidade, bairro, ambientes, modelo, tecido, acionamento, largura, altura, acabamento, itens_adicionais }
  };
};

const TETO_MODELS = ['romana_teto', 'celular_teto', 'plissada_teto'];

export default function QuizV3() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [formId, setFormId] = useState('quizv3');
  const [hasAddedExtraItem, setHasAddedExtraItem] = useState(false);
  const [hasSeenMaisItens, setHasSeenMaisItens] = useState(false);
  const [disableBackAfterAddItem, setDisableBackAfterAddItem] = useState(false);
  const [leadData, setLeadData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return { utm_source: params.get('utm_source') || '', utm_medium: params.get('utm_medium') || '', utm_campaign: params.get('utm_campaign') || '' };
  });
  const [sessionStartedAt, setSessionStartedAt] = useState(null);

  const activeStep = STEPS[currentStepIndex];

  const handleNext = (stepData) => {
    const updatedCurrentItem = { ...currentItem, ...stepData };
    setCurrentItem(updatedCurrentItem);

    if (window.dataLayer) {
      window.dataLayer.push({ event: 'quiz_step_complete', quiz_version: 'v3', step_id: activeStep.id, step_question: activeStep.question });
    }

    const selectedOptionValue = stepData && typeof stepData === 'object' && !Array.isArray(stepData) ? Object.values(stepData)[0] : undefined;

    // --- V3: passo_3v3_tecido ---
    if (activeStep.id === 'passo_3v3_tecido') {
      if (selectedOptionValue === 'nao_sei') {
        setFormId('FORMR5');
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
        }
        return;
      }
      const nextIndex = STEPS.findIndex(s => s.id === 'passo_3v3_modelo');
      if (nextIndex !== -1) {
        setHistory([...history, nextIndex]);
        setCurrentStepIndex(nextIndex);
      }
      return;
    }

    // --- V3: passo_3v3_modelo — gravar formato V1 e decidir próximo passo ---
    if (activeStep.id === 'passo_3v3_modelo' && selectedOptionValue) {
      const tecidoValue = currentItem.passo_3v3_tecido;
      const modelValue = selectedOptionValue;
      const pairs = TECIDO_TO_MODELS[tecidoValue] || [];
      const pair = pairs.find(p => p.modelKey === modelValue);
      if (pair) {
        const { modelKey, tecidoStepId } = pair;
        if (TETO_MODELS.includes(modelKey)) {
          updatedCurrentItem.passo_4_modelo_teto = modelKey;
          updatedCurrentItem[tecidoStepId] = tecidoValue;
        } else {
          updatedCurrentItem.passo_4_modelo = modelKey;
          updatedCurrentItem[tecidoStepId] = tecidoValue;
        }
        setCurrentItem(updatedCurrentItem);

        let nextStepId;
        if (modelKey === 'cortina') nextStepId = 'passo_4_acabamento_cortina';
        else if (modelKey === 'vertical' || modelKey === 'painel') nextStepId = 'passo_5_estagio';
        else nextStepId = 'passo_3_acionamento';

        const nextIndex = STEPS.findIndex(s => s.id === nextStepId);
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
        }
      }
      return;
    }

    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      if (selectedOptionValue === 'nao_sei' && activeStep.id !== 'passo_5_estagio') {
        setFormId('FORMR5');
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
      if (activeStep.id === 'passo_1_intencao' && selectedOptionValue === 'direto_atendente') setFormId('FORMR10');
      if (activeStep.id === 'passo_5_estagio' && selectedOptionValue === 'catalogo') setFormId('FORMR5');
      if (activeStep.id === 'passo_5_estagio' && selectedOptionValue === 'orcamento') setFormId('FORMR20');
      if (activeStep.id === 'passo_7_mais_itens' && selectedOptionValue === 'adicionar_outro' && !hasAddedExtraItem) {
        setFormId('FORMR30');
        setHasAddedExtraItem(true);
        setDisableBackAfterAddItem(true);
      }
    }

    if (activeStep.id === 'passo_7_mais_itens' && !hasSeenMaisItens) setHasSeenMaisItens(true);

    if (activeStep.id === 'passo_7_adicionar_item') {
      const descricaoItem = stepData?.descricao_item || '';
      if (descricaoItem.trim()) {
        setItems([...items, { descricao_livre: descricaoItem.trim() }]);
        setCurrentItem({});
        if (hasAddedExtraItem) {
          const finalIndex = STEPS.findIndex(s => s.id === 'passo_8_captura');
          if (finalIndex !== -1) {
            const newHistory = history.filter((stepIdx) => STEPS[stepIdx]?.id !== 'passo_7_adicionar_item');
            setHistory([...newHistory, finalIndex]);
            setCurrentStepIndex(finalIndex);
            return;
          }
        }
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_7_mais_itens');
        if (nextIndex !== -1) {
          const newHistory = history.filter((stepIdx) => STEPS[stepIdx]?.id !== 'passo_7_adicionar_item');
          setHistory([...newHistory, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
    }

    if (activeStep.isFinal) {
      const stepsHistory = history.map((stepIdx) => STEPS[stepIdx]?.id).filter(Boolean);
      const finalData = buildStandardizedPayload(formId, 'v3', leadData, stepData, updatedCurrentItem, items, { sessionStartedAt, stepsHistory });
      const WEBHOOK_URL = 'https://fluxo-n8n.axmxa0.easypanel.host/webhook/quizv3';
      fetch(WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) })
        .then(() => {
          if (window.fbq) window.fbq('track', 'Lead', { content_name: 'Quiz Persianas V3', content_category: 'Lead Generation' });
          if (window.dataLayer) window.dataLayer.push({ event: 'form_submission', form_id: formId, version: 'v3' });
          navigate('/quiz/obrigado');
        })
        .catch(() => navigate('/quiz/obrigado'));
      return;
    }

    let nextStepId = activeStep.nextStep;
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOption = activeStep.options?.find(opt => opt.value === selectedOptionValue);
      if (selectedOption?.nextStep) nextStepId = selectedOption.nextStep;
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        const modeloEscolhido = updatedCurrentItem.passo_4_modelo || currentItem.passo_4_modelo;
        if (modeloEscolhido === 'vertical' || modeloEscolhido === 'painel') nextStepId = 'passo_5_estagio';
      }
      if (activeStep.id.startsWith('passo_4_tecido') && selectedOptionValue === 'nao_sei' && updatedCurrentItem.passo_4_modelo === 'nao_sei') {
        setFormId('FORMR5');
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const tecidoNaoSei = selectedOptionValue === 'nao_sei';
        if (modeloNaoSei && tecidoNaoSei) {
          setFormId('FORMR5');
          const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
          if (nextIndex !== -1) {
            setHistory([...history, nextIndex]);
            setCurrentStepIndex(nextIndex);
            return;
          }
        }
        if (!modeloNaoSei && !tecidoNaoSei && nextStepId === 'passo_5_estagio') {
          setFormId('FORMR20');
          nextStepId = 'passo_6_medidas';
        }
      }
      if (activeStep.id === 'passo_3_acionamento' && nextStepId === 'passo_5_estagio') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const temTecidoEspecifico = Object.entries(updatedCurrentItem).some(([k, v]) => (k.startsWith('passo_4_tecido_') || k === 'passo_4_acabamento_cortina') && v && v !== 'nao_sei');
        if (!modeloNaoSei && temTecidoEspecifico) {
          setFormId('FORMR20');
          nextStepId = 'passo_6_medidas';
        }
      }
      if (selectedOptionValue === 'adicionar_outro') {
        if (!hasAddedExtraItem) setHasAddedExtraItem(true);
        setItems([...items, updatedCurrentItem]);
        setCurrentItem({});
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_7_adicionar_item');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
    }

    if (nextStepId) {
      const nextIndex = STEPS.findIndex(s => s.id === nextStepId);
      if (nextIndex !== -1) {
        setHistory([...history, nextIndex]);
        setCurrentStepIndex(nextIndex);
      }
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

  const modifiedStep = { ...activeStep };
  if (activeStep.id === 'passo_4_acabamento_cortina' && activeStep.optionsByTecido) {
    const tecidoCortina = currentItem.passo_4_tecido_cortina;
    modifiedStep.options = (tecidoCortina && activeStep.optionsByTecido[tecidoCortina]) ? activeStep.optionsByTecido[tecidoCortina] : activeStep.options;
  }
  if (activeStep.id === 'passo_3v3_modelo') {
    const tecidoValue = currentItem.passo_3v3_tecido;
    const pairs = TECIDO_TO_MODELS[tecidoValue] || [];
    modifiedStep.options = pairs.map(({ modelKey }) => {
      const info = MODEL_OPTIONS_BY_KEY[modelKey];
      return info ? { label: info.label, value: modelKey, image: info.image, description: info.description } : { label: modelKey, value: modelKey };
    });
  }

  const canGoBackStep = history.length > 1;

  return (
    <LayoutV1>
      <div className="w-full min-w-0 max-w-4xl mx-auto px-2 sm:px-4 pt-4 pb-8 sm:pt-8 sm:pb-16 box-border">
        {/* TrustBadges - visível em todas as etapas principais */}
        <TrustBadges />
        {/* QuizStepper - mostra progresso das 5 etapas principais */}
        <QuizStepper currentStepId={activeStep.id} steps={STEPS} />
        <StepQuestionV1
          question={modifiedStep.question}
          subtext={modifiedStep.subtext}
          type={modifiedStep.type}
          options={modifiedStep.options}
          inputs={modifiedStep.inputs}
          onOptionSelect={(opt) => handleNext({ [activeStep.id]: opt.value })}
          onNext={(data) => {
            let stepData = { [activeStep.id]: currentItem[activeStep.id] || null, ...data };
            if (activeStep.id === 'passo_6_medidas' && (data.largura != null || data.altura != null)) {
              stepData = { ...stepData, passo_6_medidas: { largura: data.largura ?? '', altura: data.altura ?? '' } };
            }
            handleNext(stepData);
          }}
          onBack={handleBack}
          canGoBack={canGoBackStep}
          formId={formId}
          initialValues={currentItem}
          selectedValue={currentItem[activeStep.id]}
          stepId={activeStep.id}
        />
      </div>
    </LayoutV1>
  );
}
