import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StepQuestion from '../components/StepQuestion';
import WelcomeScreen from '../components/WelcomeScreen';
import { Progress } from '../components/ui/progress';
import { STEPS } from './steps';

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
      
      // Regra: qualquer "nao_sei" antes do passo_5_estagio pula a etapa de fase
      // e vai direto para "Não tenho medidas e quero um pré orçamento" (catálogo)
      if (selectedOptionValue === 'nao_sei' && activeStep.id !== 'passo_5_estagio') {
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
      // Prepara os dados finais, convertendo WhatsApp para formato internacional
      const processedStepData = { ...stepData };
      if (processedStepData.whatsapp) {
        processedStepData.whatsapp = formatWhatsAppForGHL(processedStepData.whatsapp);
      }
      
      // Achatamento de items e remoção de duplicatas
      const itemsToFlatten = items.length > 0 ? items : [updatedCurrentItem];
      const flattenedItems = flattenItems(itemsToFlatten, processedStepData);
      
      const finalData = {
        form_id: formId,
        quiz_version: 'v1',
        ...leadData,
        ...processedStepData,
        ...flattenedItems
      };
      delete finalData.urgencia;

      const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/kjSMdwtGb8lg6g7i0jVi/webhook-trigger/065ae1f3-3bab-43ab-b9bf-57c8f44f6074';
      
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      .then(() => {
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Quiz Persianas V1',
            content_category: 'Lead Generation'
          });
        }
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submission',
            form_id: formId,
            version: 'v1'
          });
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
      <Layout>
        <WelcomeScreen onStart={() => setShowWelcome(false)} />
      </Layout>
    );
  }

  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const modifiedStep = { ...activeStep };
  if (activeStep.id === 'passo_4_acabamento_cortina' && activeStep.optionsByTecido) {
    const tecidoCortina = currentItem.passo_4_tecido_cortina;
    modifiedStep.options = (tecidoCortina && activeStep.optionsByTecido[tecidoCortina])
      ? activeStep.optionsByTecido[tecidoCortina]
      : activeStep.options;
  }

  const canGoBackStep = history.length > 1;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-2 sm:px-4 pt-4 pb-8 sm:pt-8 sm:pb-16">
        <div className="mb-6 sm:mb-12">
          <Progress value={progress} className="h-2 bg-gray-100" />
          <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
            <span>Início</span>
            <span>Progresso: {Math.round(progress)}%</span>
            <span>Final</span>
          </div>
        </div>

        <StepQuestion
          question={modifiedStep.question}
          subtext={modifiedStep.subtext}
          type={modifiedStep.type}
          options={modifiedStep.options}
          inputs={modifiedStep.inputs}
          onOptionSelect={(opt) => handleNext({ [activeStep.id]: opt.value })}
          onNext={(data) => {
            // Salvar dados de inputs no currentItem
            const stepData = { [activeStep.id]: currentItem[activeStep.id] || null, ...data };
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
    </Layout>
  );
}
