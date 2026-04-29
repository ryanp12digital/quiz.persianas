import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LayoutV1 from '../components/LayoutV1';
import StepQuestionV1 from '../components/StepQuestionV1';
import WelcomeScreenV1 from '../components/WelcomeScreenV1';
import QuizStepper from '../components/QuizStepper';
import TrustBadges from '../components/TrustBadges';
import { STEPS } from './steps';
import { enrichProdutoForWebhook } from '../utils/quizPayloadLabels.js';
import { buildMetaNewLeadFromFullPayload, WEBHOOK_META_NEW_LEAD_URL } from '../utils/metaNewLeadPayload.js';

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

// Função para achatamento de items e remoção de duplicatas
const flattenItems = (items, stepData) => {
  if (!items || items.length === 0) return {};
  
  const flattened = {};
  const stepDataKeys = new Set(Object.keys(stepData || {}));
  
  // Itera sobre todos os items
  items.forEach(item => {
    Object.keys(item).forEach(key => {
      // Ignora campos que já existem no stepData (stepData tem prioridade)
      if (stepDataKeys.has(key)) {
        return;
      }
      
      const value = item[key];
      
      // Se o valor já existe no flattened e é um array, concatena valores únicos
      if (Array.isArray(value)) {
        if (Array.isArray(flattened[key])) {
          // Concatena arrays e remove duplicatas
          flattened[key] = [...new Set([...flattened[key], ...value])];
        } else {
          flattened[key] = [...new Set(value)];
        }
      } else if (value !== null && value !== undefined && value !== '') {
        // Para valores não-array, sobrescreve (último item tem prioridade)
        flattened[key] = value;
      }
    });
  });
  
  // Concatena arrays do stepData também (ex: ambientes)
  Object.keys(stepData || {}).forEach(key => {
    if (Array.isArray(stepData[key]) && Array.isArray(flattened[key])) {
      flattened[key] = [...new Set([...flattened[key], ...stepData[key]])];
    }
  });
  
  return flattened;
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
  const produtoFromItem = getProdutoFromItem(principalItem);
  // Catálogo (passo_8_captura_catalogo) coleta acionamento no próprio formulário
  const produto = enrichProdutoForWebhook({
    ...produtoFromItem,
    acionamento: stepData?.acionamento !== undefined && stepData.acionamento !== '' ? stepData.acionamento : produtoFromItem.acionamento
  });

  const nome = stepData?.nome || '';
  const whatsapp = stepData?.whatsapp ? formatWhatsAppForGHL(stepData.whatsapp) : '';
  const email = stepData?.email || '';
  const cidade = stepData?.cidade || '';
  const bairro = stepData?.bairro || '';
  const ambientesArr = Array.isArray(stepData?.ambientes) ? stepData.ambientes : [];
  const ambientes = ambientesArr.join(', ');
  const passo_1_intencao = principalItem?.passo_1_intencao ?? currentItem?.passo_1_intencao ?? '';

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
      passo_1_intencao,
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
      passo_1_intencao,
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

export default function QuizV1() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [formId, setFormId] = useState('quizv1'); // FormId padrão
  const [hasAddedExtraItem, setHasAddedExtraItem] = useState(false); // Controla se já adicionou item extra (FORMR30)
  const [hasSeenMaisItens, setHasSeenMaisItens] = useState(false); // Controla se já viu a etapa passo_7_mais_itens
  const [disableBackAfterAddItem, setDisableBackAfterAddItem] = useState(false); // Desabilita voltar após escolher adicionar item
  const [leadData, setLeadData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || ''
    };
  });
  const [sessionStartedAt, setSessionStartedAt] = useState(null);

  // PageView específico do Quiz V1
  useEffect(() => {
    try {
      if (window.fbq && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView', { page_type: 'quiz_v1' });
      }
    } catch (error) {
      console.warn('Facebook Pixel PageView error (quiz_v1):', error);
    }
  }, []);

  const activeStep = STEPS[currentStepIndex];

  const handleNext = (stepData) => {
    const updatedCurrentItem = { ...currentItem, ...stepData };
    setCurrentItem(updatedCurrentItem);

    // Rastreamento de etapa para o Dashboard/GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'quiz_step_complete',
        quiz_version: 'v1',
        step_id: activeStep.id,
        step_question: activeStep.question
      });
    }

    // Lógica para determinar o formId baseado nas escolhas do usuário
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOptionValue = Object.values(stepData)[0];
      
      // Regra: "não sei" só redireciona para catálogo quando for no passo de MODELO (não no de tecido)
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
      
      // FORMR10: "Já sabe o que quer e quer falar direto com atendente"
      // Quando escolhe "direto_atendente" na etapa inicial (passo_1_intencao)
      if (activeStep.id === 'passo_1_intencao' && selectedOptionValue === 'direto_atendente') {
        setFormId('FORMR10');
      }
      
      // FORMR5: "Escolheu o que quer sem medidas" — catálogo
      if (activeStep.id === 'passo_5_estagio' && selectedOptionValue === 'catalogo') {
        setFormId('FORMR5');
      }
      
      // FORMR20: "Escolheu uma Persiana Com Medidas"
      if (activeStep.id === 'passo_5_estagio' && selectedOptionValue === 'orcamento') {
        setFormId('FORMR20');
      }
      
      // FORMR30: "Escolhe mais de 1 Persiana com Medidas"
      // Quando escolhe "adicionar_outro" na etapa passo_7_mais_itens (e ainda não adicionou item extra)
      if (activeStep.id === 'passo_7_mais_itens' && selectedOptionValue === 'adicionar_outro' && !hasAddedExtraItem) {
        setFormId('FORMR30');
        setHasAddedExtraItem(true);
        setDisableBackAfterAddItem(true); // Desabilita voltar após escolher adicionar item
      }
    }

    // Marca que já viu a etapa passo_7_mais_itens quando chega nela pela primeira vez
    if (activeStep.id === 'passo_7_mais_itens' && !hasSeenMaisItens) {
      setHasSeenMaisItens(true);
    }

    // Lógica especial para salvar item descrito em texto livre
    if (activeStep.id === 'passo_7_adicionar_item') {
      const descricaoItem = stepData.descricao_item || '';
      if (descricaoItem.trim()) {
        const newItems = [...items];
        // Se ainda não salvou o item principal (que foi configurado nos passos anteriores), salva agora
        const hasModelo = updatedCurrentItem.passo_4_modelo || updatedCurrentItem.passo_4_modelo_teto || currentItem.passo_4_modelo || currentItem.passo_4_modelo_teto;
        if (newItems.length === 0 && hasModelo) {
          newItems.push(updatedCurrentItem);
        }
        
        setItems([...newItems, { descricao_livre: descricaoItem.trim() }]);
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
      } else if (hasAddedExtraItem || items.length > 0) {
        // Se já está no fluxo de itens extras e o usuário clicou em "Pular" sem descrição,
        // ir direto para o formulário final de captura em vez de voltar para "mais itens"
        const finalIndex = STEPS.findIndex(s => s.id === 'passo_8_captura');
        if (finalIndex !== -1) {
          const newHistory = history.filter((stepIdx) => STEPS[stepIdx]?.id !== 'passo_7_adicionar_item');
          setHistory([...newHistory, finalIndex]);
          setCurrentStepIndex(finalIndex);
          return;
        }
      }
    }

    if (activeStep.isFinal) {
      // Histórico de etapas percorridas (IDs) para o payload
      const stepsHistory = history.map((stepIdx) => STEPS[stepIdx]?.id).filter(Boolean);
      const finalData = buildStandardizedPayload(
        formId,
        'v1',
        leadData,
        stepData,
        updatedCurrentItem,
        items,
        { sessionStartedAt, stepsHistory }
      );

      const WEBHOOK_URL = 'https://n8n-webhook.axmxa0.easypanel.host/webhook/quizv1';
      const WEBHOOK_LEADCONNECTOR_URL = 'https://services.leadconnectorhq.com/hooks/kjSMdwtGb8lg6g7i0jVi/webhook-trigger/065ae1f3-3bab-43ab-b9bf-57c8f44f6074';
      const webhookPayload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) };
      const metaNewLeadPayload = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(buildMetaNewLeadFromFullPayload(finalData)) };
      Promise.all([
        fetch(WEBHOOK_URL, webhookPayload),
        fetch(WEBHOOK_LEADCONNECTOR_URL, webhookPayload),
        fetch(WEBHOOK_META_NEW_LEAD_URL, metaNewLeadPayload),
      ])
      .then(() => {
        try {
          if (window.fbq && typeof window.fbq === 'function') {
            const leadValuesByForm = {
              FORMR5: 5,
              FORMR10: 10,
              FORMR20: 20,
              FORMR30: 30,
            };
            const leadValue = leadValuesByForm[formId] ?? 0;

            window.fbq('track', 'Lead', {
              content_name: 'Quiz Persianas V1',
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
              version: 'v1'
            });
          }
        } catch (error) {
          console.warn('Google Tag Manager tracking error:', error);
        }

        navigate('/quiz/obrigado');
      })
      .catch(() => navigate('/quiz/obrigado'));
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
      // Verifica quando está em um passo de tecido e o modelo escolhido anteriormente foi vertical ou painel
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        // Buscar o modelo escolhido no currentItem (pode estar em passo_4_modelo)
        const modeloEscolhido = updatedCurrentItem.passo_4_modelo || currentItem.passo_4_modelo;
        if (modeloEscolhido === 'vertical' || modeloEscolhido === 'painel') {
          // Pular passo_3_acionamento e ir direto para passo_5_estagio
          nextStepId = 'passo_5_estagio';
        }
      }

      // Lógica especial: se escolheu "Não sei" em modelo E em tecido, redirecionar para catálogo
      // Verifica se o passo atual é um passo de tecido (começa com 'passo_4_tecido')
      if (activeStep.id.startsWith('passo_4_tecido') && selectedOptionValue === 'nao_sei' && updatedCurrentItem.passo_4_modelo === 'nao_sei') {
        setFormId('FORMR5');
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }

      // Regras ao sair de tecido/acabamento: pular "Em que fase você está agora?"
      if (activeStep.id.startsWith('passo_4_tecido') || activeStep.id === 'passo_4_acabamento_cortina') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const tecidoNaoSei = selectedOptionValue === 'nao_sei';
        
        if (modeloNaoSei && tecidoNaoSei) {
          // Não sei modelo + não sei tecido → direto para "Não tenho medidas" (catálogo)
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
          setFormId('FORMR20');
          nextStepId = 'passo_6_medidas';
        }
      }

      // Regra 2 (continuação): Ao sair do acionamento, se modelo+tecido específicos, pular passo_5_estagio → passo_6_medidas
      if (activeStep.id === 'passo_3_acionamento' && nextStepId === 'passo_5_estagio') {
        const modeloNaoSei = updatedCurrentItem.passo_4_modelo === 'nao_sei';
        const temTecidoEspecifico = Object.entries(updatedCurrentItem).some(
          ([k, v]) => (k.startsWith('passo_4_tecido_') || k === 'passo_4_acabamento_cortina') && v && v !== 'nao_sei'
        );
        if (!modeloNaoSei && temTecidoEspecifico) {
          setFormId('FORMR20');
          nextStepId = 'passo_6_medidas';
        }
      }

      // Lógica especial para "Adicionar mais um item" (igual à V2)
      if (selectedOptionValue === 'adicionar_outro') {
        if (!hasAddedExtraItem) {
          setHasAddedExtraItem(true);
        }
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
            // Salvar dados de inputs no currentItem
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
