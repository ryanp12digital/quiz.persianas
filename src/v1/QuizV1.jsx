import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StepQuestion from '../components/StepQuestion';
import WelcomeScreen from '../components/WelcomeScreen';
import { Progress } from '../components/ui/progress';
import { STEPS } from './steps';

export default function QuizV1() {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([0]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
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

    // Lógica especial para salvar item descrito em texto livre
    if (activeStep.id === 'passo_7_adicionar_item') {
      const descricaoItem = stepData.descricao_item || '';
      if (descricaoItem.trim()) {
        setItems([...items, { descricao_livre: descricaoItem.trim() }]);
        setCurrentItem({});
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_7_mais_itens');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }
    }

    if (activeStep.isFinal) {
      const finalData = {
        ...leadData,
        ...stepData,
        items: items.length > 0 ? items : [updatedCurrentItem]
      };
      
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
            form_id: 'quizv1',
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
      // Verifica quando está no passo_4_tecido e o modelo escolhido anteriormente foi vertical ou painel
      if (activeStep.id === 'passo_4_tecido') {
        // Buscar o modelo escolhido no currentItem (pode estar em passo_4_modelo)
        const modeloEscolhido = updatedCurrentItem.passo_4_modelo || currentItem.passo_4_modelo;
        if (modeloEscolhido === 'vertical' || modeloEscolhido === 'painel') {
          // Pular passo_3_acionamento e ir direto para passo_5_estagio
          nextStepId = 'passo_5_estagio';
        }
      }

      // Lógica especial: se escolheu "Não sei" em modelo E em tecido, redirecionar para catálogo
      if (activeStep.id === 'passo_4_tecido' && selectedOptionValue === 'nao_sei' && updatedCurrentItem.passo_4_modelo === 'nao_sei') {
        const nextIndex = STEPS.findIndex(s => s.id === 'passo_8_captura_catalogo');
        if (nextIndex !== -1) {
          setHistory([...history, nextIndex]);
          setCurrentStepIndex(nextIndex);
          return;
        }
      }

      // Lógica especial para "Adicionar mais um item"
      if (selectedOptionValue === 'adicionar_outro') {
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
          question={activeStep.question}
          subtext={activeStep.subtext}
          type={activeStep.type}
          options={activeStep.options}
          inputs={activeStep.inputs}
          onOptionSelect={(opt) => handleNext({ [activeStep.id]: opt.value })}
          onNext={(data) => {
            // Salvar dados de inputs no currentItem
            const stepData = { [activeStep.id]: currentItem[activeStep.id] || null, ...data };
            handleNext(stepData);
          }}
          onBack={handleBack}
          canGoBack={history.length > 1}
          formId="quizv1"
          initialValues={currentItem}
          selectedValue={currentItem[activeStep.id]}
        />
      </div>
    </Layout>
  );
}
