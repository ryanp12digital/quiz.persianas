import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StepQuestion from '../components/StepQuestion';
import { Progress } from '../components/ui/progress';
import { STEPS } from './steps';

export default function QuizV1() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      page_url: window.location.href
    };
  });
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [loopCount, setLoopCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeStep = STEPS[currentStepIndex];
  const phase = activeStep.phase || 1;
  const totalPhases = 8;
  const progressValue = Math.max(5, (phase / totalPhases) * 100);

  const handleNext = (inputValueOrOption) => {
    let nextStepId = null;
    let stepResponse = {};

    if (inputValueOrOption.value) {
      stepResponse = {
        pergunta_id: activeStep.id,
        pergunta_texto: activeStep.question,
        resposta_valor: inputValueOrOption.value,
        resposta_label: inputValueOrOption.label
      };
      nextStepId = inputValueOrOption.nextStep;

      if (inputValueOrOption.action === 'loop') {
        if (loopCount < 1) {
          setItems(prev => [...prev, { ...currentItem, item_index: items.length + 1 }]);
          setCurrentItem({});
          setLoopCount(prev => prev + 1);
          const step2Index = STEPS.findIndex(s => s.id === 'passo_2_ambiente');
          setCurrentStepIndex(step2Index);
          return;
        } else {
          nextStepId = 'passo_8_captura';
        }
      }
    } else {
      stepResponse = {
        pergunta_id: activeStep.id,
        pergunta_texto: activeStep.question,
        respostas: inputValueOrOption
      };
      nextStepId = activeStep.nextStep;
    }

    if (activeStep.phase === 1 || activeStep.phase === 8) {
      setFormData(prev => ({ ...prev, [activeStep.id]: stepResponse }));
    } else {
      setCurrentItem(prev => ({ ...prev, [activeStep.id]: stepResponse }));
    }

    if (nextStepId) {
      let finalNextStepId = nextStepId;
      if (nextStepId === 'passo_7_mais_itens' && loopCount >= 1) {
        finalNextStepId = 'passo_8_captura';
      }
      const nextIndex = STEPS.findIndex(s => s.id === finalNextStepId);
      if (nextIndex !== -1) {
        setCurrentStepIndex(nextIndex);
      }
    } else if (activeStep.isFinal) {
      const finalData = {
        contato: { ...formData, [activeStep.id]: stepResponse },
        itens: [...items, { ...currentItem, item_index: items.length + 1 }],
        meta: { 
          tipo_quiz: activeStep.id,
          data_envio: new Date().toISOString(),
          total_itens: items.length + 1,
          version: 'v1'
        }
      };
      
      const WEBHOOK_URL = 'https://fluxo-n8n.axmxa0.easypanel.host/webhook/Quiz';
      
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      .then(() => {
        // Disparar evento do Meta Pixel se disponível
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Quiz Persianas V1',
            content_category: 'Lead Generation'
          });
        }
        navigate('/quiz/obrigado');
      })
      .catch(() => navigate('/quiz/obrigado'));
    }
  };

  const modifiedStep = { ...activeStep };
  if (activeStep.id === 'passo_7_mais_itens' && loopCount >= 1) {
    modifiedStep.options = activeStep.options.filter(opt => opt.action !== 'loop');
  }

  if (isSubmitted) {
    return (
      <Layout>
        <div className="step-container animate-fadeIn" style={{ marginTop: '60px' }}>
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Obrigado!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Suas informações foram enviadas com sucesso. Nossa equipe entrará em contato em breve para dar continuidade ao seu orçamento.
            </p>
            {/* Botão removido conforme solicitação */}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: '605px', margin: '0 auto 40px auto' }}>
        <Progress value={progressValue} aria-label="Progresso do Quiz" />
      </div>
      <div style={{ marginTop: '40px' }}>
        <StepQuestion
          key={`${activeStep.id}_${loopCount}`}
          question={modifiedStep.question}
          subtext={modifiedStep.subtext}
          type={modifiedStep.type}
          options={modifiedStep.options}
          inputs={modifiedStep.inputs}
          onOptionSelect={handleNext}
          onNext={handleNext}
          formId="quizv1"
        />
      </div>
    </Layout>
  );
}
