import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutV1 from '../components/LayoutV1';
import StepQuestionV1 from '../components/StepQuestionV1';
import WelcomeScreenV1 from '../components/WelcomeScreenV1';
import QuizStepper from '../components/QuizStepper';
import TrustBadges from '../components/TrustBadges';
import { STEPS } from './steps';
import { enrichProdutoForWebhook } from '../utils/quizPayloadLabels.js';
import { logWebhookSettledResults } from '../utils/webhookLog.js';
import { AB_CONFIG, getVariant } from './ab_test';

// Função para converter WhatsApp do formato com máscara para formato internacional (GHL)
const formatWhatsAppForGHL = (whatsapp) => {
  if (!whatsapp) return whatsapp;
  
  // Remove todos os caracteres não numéricos
  const numbersOnly = whatsapp.replace(/[^\d]/g, '');
  
  // Se não tiver números, retorna como está
  if (!numbersOnly) return whatsapp;
  
  // Se já começar com 55 e tiver 12 ou mais dígitos (código do país já incluído), remove para adicionar o + depois
  let phoneNumber = numbersOnly;
  if (phoneNumber.startsWith('55') && phoneNumber.length >= 12) {
    phoneNumber = phoneNumber.substring(2);
  }
  
  // Adiciona o código do país +55
  return `+55${phoneNumber}`;
};



// Deriva produto (tipo, modelo, tecido, acabamento) de um item para o payload padrão da automação.
// Teto: modelo = segundo modelo (romana_teto/celular_teto/plissada_teto), tecido = valor do passo de tecido.
// Cortina: modelo = cortina, acabamento = valor; tecido omitido no bloco principal.
const getProdutoFromItem = (item) => {
  if (!item) return { tipo: '', modelo: '', tecido: '', acabamento: '', acionamento: '', medidas: { largura: '', altura: '', unidade: 'cm' } };
  let tipo = '';
  let modelo = '';
  let tecido = '';
  let acabamento = item?.passo_4_acabamento_cortina || '';
  const acionamento = item?.passo_3_acionamento || '';
  let largura = '';
  let altura = '';
  if (typeof item?.passo_6_medidas === 'object') {
    largura = item.passo_6_medidas?.largura || '';
    altura = item.passo_6_medidas?.altura || '';
  } else {
    largura = item?.largura || '';
    altura = item?.altura || '';
  }
  const medidas = { largura, altura, unidade: 'cm' };

  if (item.passo_4_modelo === 'teto') {
    tipo = 'persiana_teto';
    modelo = item.passo_4_modelo_teto || '';
    Object.keys(item).forEach((key) => {
      if (key.startsWith('passo_4_tecido_teto_')) tecido = item[key] || tecido;
    });
    return { tipo, modelo, tecido, acabamento: '', acionamento, medidas };
  }
  if (item.passo_4_modelo === 'cortina') {
    tipo = 'cortina';
    const tecidoCortina = item?.passo_4_tecido_cortina || '';
    modelo = tecidoCortina ? `cortina ${tecidoCortina}` : 'cortina';  // prefixo para identificar cortina
    tecido = item?.passo_4_acabamento_cortina || '';  // no lugar do tecido: acabamento
    return { tipo, modelo, tecido, acabamento, acionamento, medidas };
  }
  tipo = item.passo_4_modelo || item.passo_4_modelo_teto || '';
  modelo = item.passo_4_modelo || item.passo_4_modelo_teto || '';
  Object.keys(item).forEach((key) => {
    if (key.startsWith('passo_4_tecido_')) tecido = item[key] || tecido;
  });
  return { tipo, modelo, tecido, acabamento, acionamento, medidas };
};

// Função para construir payload padronizado do webhook (detalhado e organizado, sem repetição)
const buildStandardizedPayload = (formId, quizVersion, leadData, stepData, currentItem, items, options = {}) => {
  const { sessionStartedAt = null, stepsHistory = [] } = options;
  const submittedAt = new Date();

  const principalItem = Array.isArray(items) && items.length > 0 ? items[0] : currentItem;
  const produto = enrichProdutoForWebhook(getProdutoFromItem(principalItem));

  const nome = stepData?.nome || '';
  const whatsapp = stepData?.whatsapp ? formatWhatsAppForGHL(stepData.whatsapp) : '';
  const email = stepData?.email || '';
  const cidade = stepData?.cidade || '';
  const bairro = stepData?.bairro || '';
  const ambientesArr = Array.isArray(stepData?.ambientes) ? stepData.ambientes : [];
  const ambientes = ambientesArr.join(', ');

  // Apenas itens extras: o primeiro já está em produto/quiz_answers, evita duplicação
  const itens_adicionais = Array.isArray(items) && items.length > 1
    ? items.slice(1).map((item, idx) => {
        const p = enrichProdutoForWebhook(getProdutoFromItem(item));
        return {
          ordem: idx + 1,
          descricao_livre: item?.descricao_livre || '',
          tipo: p.tipo,
          modelo: p.modelo,
          tecido: p.tecido,
          acabamento: p.acabamento,
          acionamento: p.acionamento,
          largura: p.medidas.largura,
          altura: p.medidas.altura
        };
      })
    : [];

  // Constrói representação em string dos itens adicionais, ignorando itens totalmente vazios
  const itensAdicionaisValidos = itens_adicionais.filter((item) => {
    const temDescricao = item.descricao_livre && item.descricao_livre.trim();
    const temOutrosCampos = item.tipo || item.modelo || item.tecido || item.acabamento || item.acionamento || item.largura || item.altura;
    return temDescricao || temOutrosCampos;
  });

  const itensAdicionaisDescricao = itensAdicionaisValidos
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
    .join('; ');

  const sessionStartedAtISO = sessionStartedAt ? new Date(sessionStartedAt).toISOString() : null;
  const submittedAtISO = submittedAt.toISOString();
  const durationSeconds = sessionStartedAt
    ? Math.round((submittedAt - new Date(sessionStartedAt)) / 1000)
    : null;

  return {
    metadata: {
      form_id: formId || '',
      quiz_version: quizVersion || '',
      source: 'quiz_web',
      submitted_at: submittedAtISO,
      submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    },
    timestamps: {
      submitted_at: submittedAtISO,
      submitted_at_local: submittedAt.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      session_started_at: sessionStartedAtISO,
      duration_seconds: durationSeconds,
      duration_readable: durationSeconds != null ? `${Math.floor(durationSeconds / 60)}m ${durationSeconds % 60}s` : null
    },
    utm: {
      utm_source: leadData?.utm_source || '',
      utm_medium: leadData?.utm_medium || '',
      utm_campaign: leadData?.utm_campaign || '',
      ab_variant: leadData?.ab_variant || '',
      referrer: typeof document !== 'undefined' ? (document.referrer || '') : ''
    },
    contact: {
      nome,
      whatsapp,
      email,
      cidade,
      bairro,
      ambientes,
    },
    produto: {
      passo_1_intencao: '', // V2 não tem passo_1_intencao no fluxo
      descricao_livre: principalItem?.descricao_livre || '',
      tipo: produto.tipo,
      modelo: produto.modelo,
      modelo_codigo: produto.modelo_codigo,
      tecido: produto.tecido,
      tecido_codigo: produto.tecido_codigo,
      acabamento: produto.acabamento,
      acabamento_codigo: produto.acabamento_codigo,
      acionamento: produto.acionamento,
      medidas: produto.medidas
    },
    itens_adicionais: itensAdicionaisDescricao,
    itens_adicionais_count: itensAdicionaisValidos.length,
    journey: {
      steps_completed: stepsHistory,
      steps_count: stepsHistory?.length ?? 0
    },
    _flat: {
      nome,
      whatsapp,
      email,
      cidade,
      bairro,
      ambientes,
      passo_1_intencao: '',
      descricao_livre: principalItem?.descricao_livre || '',
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
      itens_adicionais: itensAdicionaisDescricao
    }
  };
};

export default function QuizV2() {
  const navigate = useNavigate();
  const variant = getVariant();
  
  const [showWelcome, setShowWelcome] = useState(true);
  // Começar direto no passo_4_modelo (remover passo_1_intencao do fluxo)
  const initialStepIndex = STEPS.findIndex(s => s.id === 'passo_4_modelo');
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex >= 0 ? initialStepIndex : 0);
  const [history, setHistory] = useState([initialStepIndex >= 0 ? initialStepIndex : 0]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [formId, setFormId] = useState('FORMR20'); // FormId padrão agora é FORMR20
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const [leadData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      ab_variant: variant
    };
  });
  const [sessionStartedAt, setSessionStartedAt] = useState(null);

  // PageView específico do Quiz V2
  useEffect(() => {
    try {
      if (window.fbq && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView', { page_type: 'quiz_v2' });
      }
    } catch (error) {
      console.warn('Facebook Pixel PageView error (quiz_v2):', error);
    }
  }, []);

  const activeStep = STEPS[currentStepIndex];

  const handleNext = (stepData) => {
    if (submitLockRef.current || isSubmitting) return;
    const updatedCurrentItem = { ...currentItem, ...stepData };
    setCurrentItem(updatedCurrentItem);

    // Rastreamento de etapa para o Dashboard/GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'quiz_step_complete',
        quiz_version: 'v2',
        step_id: activeStep.id,
        step_question: activeStep.question
      });
    }

    // Lógica para determinar o formId baseado nas escolhas do usuário
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOptionValue = Object.values(stepData)[0];
      
      // FORMR5: "Não sei - Quero recomendação" — catálogo
      const isModeloStep = activeStep.id === 'passo_4_modelo' || activeStep.id === 'passo_4_modelo_teto';
      if (selectedOptionValue === 'nao_sei' && isModeloStep) {
        setFormId('FORMR5');
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
    }

    // Lógica especial para salvar item descrito em texto livre
    if (activeStep.id === 'passo_7_adicionar_item') {
      const descricaoItem = stepData.descricao_item || stepData.observacoes || '';
      if (descricaoItem.trim()) {
        const newItems = [...items];
        // Se ainda não salvou o item principal (que foi configurado nos passos anteriores), salva agora
        const hasModelo = updatedCurrentItem.passo_4_modelo || updatedCurrentItem.passo_4_modelo_teto || currentItem.passo_4_modelo || currentItem.passo_4_modelo_teto;
        if (newItems.length === 0 && hasModelo) {
          newItems.push(updatedCurrentItem);
        }
        
        setItems([...newItems, { descricao_livre: descricaoItem.trim() }]);
        setCurrentItem({});
        // Define o Form ID como FORMR30, pois o usuário adicionou um item extra
        setFormId('FORMR30');
      }
      // O fluxo normal prosseguirá para passo_8_captura gerado pelo nextStep Id
    }

    if (activeStep.isFinal) {
      submitLockRef.current = true;
      setIsSubmitting(true);
      const stepsHistory = history.map((stepIdx) => STEPS[stepIdx]?.id).filter(Boolean);
      const finalData = buildStandardizedPayload(
        formId,
        'v2',
        leadData,
        stepData,
        updatedCurrentItem,
        items,
        { sessionStartedAt, stepsHistory }
      );

      const WEBHOOK_URL = 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv2';
      const WEBHOOK_LEADCONNECTOR_URL = 'https://services.leadconnectorhq.com/hooks/kjSMdwtGb8lg6g7i0jVi/webhook-trigger/065ae1f3-3bab-43ab-b9bf-57c8f44f6074';
      const webhookPayload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) };
      Promise.allSettled([
        fetch(WEBHOOK_URL, webhookPayload),
        fetch(WEBHOOK_LEADCONNECTOR_URL, webhookPayload),
      ])
      .then((results) => {
        logWebhookSettledResults('v2', ['n8n', 'leadconnector'], results);
        try {
          if (window.fbq && typeof window.fbq === 'function') {
            const leadValuesByForm = {
              FORMR5: 5,
              FORMR20: 20,
              FORMR30: 30,
            };
            const leadValue = leadValuesByForm[formId] ?? 0;

            window.fbq('track', 'Lead', {
              content_name: 'Quiz Persianas V2',
              content_category: 'Lead Generation',
              form_id: formId,
              value: leadValue,
              currency: 'BRL',
            });
          }
        } catch (error) {
          console.warn('Facebook Pixel tracking error:', error);
        }

        // Tracking do Google Tag Manager para envio de formulário
        try {
          if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({
              event: 'form_submission',
              form_id: formId,
              version: 'v2'
            });
          }
        } catch (error) {
          console.warn('Google Tag Manager tracking error:', error);
        }

        navigate('/quiz/obrigado');
      });
      return;
    }

    let nextStepId = activeStep.nextStep;
    
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOptionValue = Object.values(stepData)[0];
      const selectedOption = activeStep.options?.find(opt => opt.value === selectedOptionValue);
      if (selectedOption?.nextStep) {
        nextStepId = selectedOption.nextStep;
      }

      // Lógica especial: pular passo_3_acionamento se modelo = vertical ou painel
      // Verifica se o passo atual é um passo de tecido (começa com 'passo_4_tecido')
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        // Buscar o modelo escolhido no currentItem (pode estar em passo_4_modelo)
        const modeloEscolhido = updatedCurrentItem.passo_4_modelo || currentItem.passo_4_modelo;
        if (modeloEscolhido === 'vertical' || modeloEscolhido === 'painel') {
          // Pular passo_3_acionamento e ir direto para passo_5_estagio
          nextStepId = 'passo_5_estagio';
        }
      }

      // Regras ao sair de tecido/acabamento: pular "Em que fase você está agora?"
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const tecidoNaoSei = selectedOptionValue === 'nao_sei';
        
        if (modeloNaoSei && tecidoNaoSei) {
          // Não sei modelo + não sei tecido → direto para catálogo (FORMR5)
          setFormId('FORMR5');
          const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
          if (nextIndex !== -1) {
            setHistory([...history, nextIndex]);
            setCurrentStepIndex(nextIndex);
            return;
          }
        }
        if (!modeloNaoSei && !tecidoNaoSei && nextStepId === 'passo_5_estagio') {
          // Qualquer modelo + qualquer tecido → direto para "Já tenho medidas"
          nextStepId = 'passo_6_medidas';
        }
      }

      if (activeStep.id === 'passo_3_acionamento' && nextStepId === 'passo_5_estagio') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const temTecidoEspecifico = Object.entries(updatedCurrentItem).some(
          ([k, v]) => (k.startsWith('passo_4_tecido_') || k === 'passo_4_acabamento_cortina') && v && v !== 'nao_sei'
        );
        if (!modeloNaoSei && temTecidoEspecifico) {
          nextStepId = 'passo_6_medidas';
        }
      }
      
      // Lógica especial para "Adicionar mais um item"
      if (selectedOptionValue === 'adicionar_outro') {
        setItems([...items, updatedCurrentItem]);
        setCurrentItem({});
        // Define formulário para FORMR30 já que está adicionando itens extras
        setFormId('FORMR30');
        nextStepId = 'passo_7_adicionar_item';
      }
    }

    // FORMR5 quando qualquer caminho leva ao formulário de catálogo (ex.: passo_5_estagio → catalogo)
    if (nextStepId === 'passo_8_captura_catalogo') {
      setFormId('FORMR5');
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
      const prevIndex = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentStepIndex(prevIndex);
    }
  };

  if (showWelcome) {
    return (
      <LayoutV1>
        <WelcomeScreenV1 onStart={() => {
          setSessionStartedAt(Date.now());
          setShowWelcome(false);
        }} />
      </LayoutV1>
    );
  }

  const modifiedStep = { ...activeStep };
  if (activeStep.id === 'passo_4_acabamento_cortina' && activeStep.optionsByTecido) {
    const tecidoCortina = currentItem.passo_4_tecido_cortina;
    modifiedStep.options = (tecidoCortina && activeStep.optionsByTecido[tecidoCortina])
      ? activeStep.optionsByTecido[tecidoCortina]
      : activeStep.options;
  }
  if (variant === 'B' && AB_CONFIG.variants.B.modifications[activeStep.id]) {
    Object.assign(modifiedStep, AB_CONFIG.variants.B.modifications[activeStep.id]);
  }

  // Determina se pode voltar: pode voltar sempre que há histórico
  const canGoBackStep = history.length > 1;

  return (
    <LayoutV1>
      {isSubmitting && (
        <div className="fixed inset-0 bg-white/85 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 pointer-events-all">
          <div className="w-12 h-12 border-4 border-[#4CAF50] border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-gray-800">Enviando seus dados...</p>
          <p className="text-sm text-gray-500">Por favor, aguarde</p>
        </div>
      )}
      <div className="w-full min-w-0 max-w-4xl mx-auto px-2 sm:px-4 pt-4 pb-8 sm:pt-8 sm:pb-16 box-border">
        <TrustBadges />
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
          isSubmitting={isSubmitting}
        />
      </div>
    </LayoutV1>
  );
}
