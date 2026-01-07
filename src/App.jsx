import React, { useState } from 'react';
import Layout from './components/Layout';
import StepQuestion from './components/StepQuestion';
import { Progress } from './components/ui/progress';
import { STEPS } from './steps';

function App() {
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
      // Radio option selected
      stepResponse = {
        pergunta_id: activeStep.id,
        pergunta_texto: activeStep.question,
        resposta_valor: inputValueOrOption.value,
        resposta_label: inputValueOrOption.label
      };
      nextStepId = inputValueOrOption.nextStep;

      if (inputValueOrOption.action === 'loop') {
        if (loopCount < 1) { // Limit to 1 loop to avoid infinite
          setItems(prev => [...prev, { ...currentItem, item_index: items.length + 1 }]);
          setCurrentItem({});
          setLoopCount(prev => prev + 1);
          const step2Index = STEPS.findIndex(s => s.id === 'passo_2_ambiente');
          setCurrentStepIndex(step2Index);
          return;
        } else {
          // If already looped once, force next step instead of looping again
          nextStepId = 'passo_8_captura';
        }
      }
    } else {
      // Input form submitted
      stepResponse = {
        pergunta_id: activeStep.id,
        pergunta_texto: activeStep.question,
        respostas: inputValueOrOption // Object with field IDs and values
      };
      nextStepId = activeStep.nextStep;
    }

    // Store data
    if (activeStep.phase === 1 || activeStep.phase === 8) {
      setFormData(prev => ({ ...prev, [activeStep.id]: stepResponse }));
    } else {
      setCurrentItem(prev => ({ ...prev, [activeStep.id]: stepResponse }));
    }

    // Navigation
    if (nextStepId) {
      let finalNextStepId = nextStepId;
      
      // Auto-skip logic for the second time at passo_7_mais_itens
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
          total_itens: items.length + 1
        }
      };
      
      console.log("FORM SUBMITTED:", finalData);

      const WEBHOOK_URL = 'https://fluxo-n8n.axmxa0.easypanel.host/webhook/Quiz';
      
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })
      .then(response => {
        setIsSubmitted(true);
      })
      .catch(error => {
        console.error("Fetch error:", error);
        setIsSubmitted(true);
      });
    }
  };

  // Modify activeStep options if loop limit reached
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
            <button 
              onClick={() => window.location.reload()}
              className="bg-[#4CAF50] text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            >
              Voltar ao Início
            </button>
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
          question={activeStep.question}
          subtext={activeStep.subtext}
          type={activeStep.type}
          options={activeStep.options}
          inputs={activeStep.inputs}
          onOptionSelect={handleNext}
          onNext={handleNext}
        />
      </div>
    </Layout>
  );
}

export default App;
