import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StepQuestion from '../components/StepQuestion';
import WelcomeScreen from '../components/WelcomeScreen';
import { Progress } from '../components/ui/progress';
import { STEPS } from './steps';
import { AB_CONFIG, getVariant } from './ab_test';

export default function QuizV2() {
  const navigate = useNavigate();
  const variant = getVariant();
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [formId, setFormId] = useState('quizv2'); // FormId padrão
  const [hasAddedExtraItem, setHasAddedExtraItem] = useState(false); // Controla se já adicionou item extra (FORMR30)
  const [hasSeenMaisItens, setHasSeenMaisItens] = useState(false); // Controla se já viu a etapa passo_7_mais_itens
  const [disableBackAfterAddItem, setDisableBackAfterAddItem] = useState(false); // Desabilita voltar após escolher adicionar item
  const [leadData, setLeadData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      ab_variant: variant
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
        quiz_version: 'v2',
        step_id: activeStep.id,
        step_question: activeStep.question
      });
    }

    // Lógica para determinar o formId baseado nas escolhas do usuário
    if (stepData && typeof stepData === 'object' && !Array.isArray(stepData)) {
      const selectedOptionValue = Object.values(stepData)[0];
      
      // FORMR10: "Já sabe o que quer e quer falar direto com atendente"
      // Quando escolhe "direto_atendente" na etapa inicial (passo_1_intencao)
      if (activeStep.id === 'passo_1_intencao' && selectedOptionValue === 'direto_atendente') {
        setFormId('FORMR10');
      }
      
      // FORMR5: "Escolheu o que quer sem medidas"
      // Quando escolhe "catalogo" na etapa "Em que fase você está agora?" (passo_5_estagio)
      if (activeStep.id === 'passo_5_estagio' && selectedOptionValue === 'catalogo') {
        setFormId('FORMR5');
      }
      
      // FORMR20: "Escolheu uma Persiana Com Medidas"
      // Quando escolhe "orcamento" na etapa "Em que fase você está agora?" (passo_5_estagio)
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
        
        // Se já adicionou item extra (FORMR30), vai direto para o formulário final
        // Não volta para passo_7_mais_itens
        if (hasAddedExtraItem) {
          const finalIndex = STEPS.findIndex(s => s.id === 'passo_8_captura');
          if (finalIndex !== -1) {
            // Remove passo_7_adicionar_item do histórico e vai direto para o formulário final
            const newHistory = history.filter((_, idx) => {
              const stepIdx = history[idx];
              return STEPS[stepIdx]?.id !== 'passo_7_adicionar_item';
            });
            setHistory([...newHistory, finalIndex]);
            setCurrentStepIndex(finalIndex);
            return;
          }
        } else {
          // Se ainda não adicionou item extra, vai para passo_7_mais_itens normalmente
          const nextIndex = STEPS.findIndex(s => s.id === 'passo_7_mais_itens');
          if (nextIndex !== -1) {
            const newHistory = history.filter((_, idx) => {
              const stepIdx = history[idx];
              return STEPS[stepIdx]?.id !== 'passo_7_adicionar_item';
            });
            setHistory([...newHistory, nextIndex]);
            setCurrentStepIndex(nextIndex);
            return;
          }
        }
      }
    }

    if (activeStep.isFinal) {
      const finalData = {
        ...leadData,
        ...stepData,
        items: items.length > 0 ? items : [updatedCurrentItem]
      };
      
      const WEBHOOK_URL = 'https://fluxo-n8n.axmxa0.easypanel.host/webhook/quizv2';
      
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      .then(() => {
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Quiz Persianas V2',
            content_category: 'Lead Generation'
          });
        }
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'form_submission',
            form_id: formId,
            version: 'v2'
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
      
      // Lógica especial para "Adicionar mais um item"
      if (selectedOptionValue === 'adicionar_outro') {
        // Só permite adicionar item extra uma vez (para FORMR30)
        // A verificação de hasAddedExtraItem já foi feita acima na linha 71
        setItems([...items, updatedCurrentItem]);
        setCurrentItem({});
        nextStepId = 'passo_7_adicionar_item';
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
  if (variant === 'B' && AB_CONFIG.variants.B.modifications[activeStep.id]) {
    Object.assign(modifiedStep, AB_CONFIG.variants.B.modifications[activeStep.id]);
  }

  // Remove a opção "adicionar_outro" se o usuário já adicionou um item extra (FORMR30)
  // ou se já viu essa etapa antes (para que apareça apenas uma vez)
  if (activeStep.id === 'passo_7_mais_itens' && (hasAddedExtraItem || hasSeenMaisItens) && modifiedStep.options) {
    modifiedStep.options = modifiedStep.options.filter(opt => opt.value !== 'adicionar_outro');
  }

  // Determina se pode voltar: não pode voltar se escolheu adicionar item ou está em passo_7_adicionar_item
  const canGoBackStep = history.length > 1 && !disableBackAfterAddItem && activeStep.id !== 'passo_7_adicionar_item';

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        <div className="mb-12">
          <Progress value={progress} className="h-2 bg-gray-100" />
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
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
          onNext={handleNext}
          onBack={handleBack}
          canGoBack={canGoBackStep}
          formId={formId}
        />
      </div>
    </Layout>
  );
}
