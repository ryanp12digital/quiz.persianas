import React, { useState } from 'react';
import Layout from './components/Layout';
import StepQuestion from './components/StepQuestion';
import { Progress } from './components/ui/progress';
import { STEPS } from './steps';

function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(() => {
    // Capture UTM parameters from URL on initialization
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      page_url: window.location.href
    };
  }); // Stores general data and UTMs
  const [items, setItems] = useState([]); // Stores completed items (persianas)
  const [currentItem, setCurrentItem] = useState({}); // Stores current item being configured

  const activeStep = STEPS[currentStepIndex];

  // Calculate Progress
  // Base logic: (currentStepIndex / totalSteps) * 100
  // But since we loop, it's tricky. Let's just map it to "Phases" for now.
  // There are ~8 phases.
  const phase = activeStep.phase || 1;
  const totalPhases = 8;
  const progressValue = Math.max(5, (phase / totalPhases) * 100);

  const handleNext = (inputValueOrOption) => {
    // 1. Data Collection
    let nextStepId = null;
    let newData = {};

    if (inputValueOrOption.value) {
      // Logic for Radio/Option click
      newData = { ...inputValueOrOption };
      nextStepId = inputValueOrOption.nextStep;

      // Special Actions
      if (inputValueOrOption.action === 'loop') {
        // LOOP LOGIC:
        // 1. Save current item to items array
        setItems(prev => [...prev, currentItem]);
        // 2. Reset currentItem
        setCurrentItem({});
        // 3. Go back to Step 2 (Environment)
        const step2Index = STEPS.findIndex(s => s.id === 'step_2_environment');
        setCurrentStepIndex(step2Index);
        return; // Exit early
      }
    } else {
      // Logic for Input/Mixed form submission (Next Button)
      newData = inputValueOrOption; // This is the inputValues object { width: '...', height: '...' }
      nextStepId = activeStep.nextStep;
    }

    // Update State
    // Store data in currentItem if it's item-specific (Phase 2-7) 
    // or formData if global (Phase 1, 8).
    // For simplicity, we dump everything into currentItem until the loop logic splits it, 
    // but Phase 1/8 should be global.

    if (activeStep.phase === 1 || activeStep.phase === 8) {
      setFormData(prev => ({ ...prev, ...newData }));
    } else {
      setCurrentItem(prev => ({ ...prev, ...newData }));
    }

    // 2. Navigation
    if (nextStepId) {
      const nextIndex = STEPS.findIndex(s => s.id === nextStepId);
      if (nextIndex !== -1) {
        setCurrentStepIndex(nextIndex);
      }
    } else if (activeStep.isFinal) {
      // FINISH LOGIC
      const finalData = {
        contact: { ...formData, ...newData },
        items: [...items, currentItem], // Add the last item being worked on
        meta: { 
          type: activeStep.id,
          submitted_at: new Date().toISOString()
        }
      };
      
      console.log("FORM SUBMITTED:", finalData);

      // Webhook submission
      const WEBHOOK_URL = 'https://n8n.ryanp12.com.br/webhook/quiz-persianas'; // Placeholder URL, can be adjusted
      
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
      .then(response => {
        if (response.ok) {
          alert("Obrigado! Suas informações foram enviadas com sucesso.");
        } else {
          console.error("Webhook error:", response.statusText);
          alert("Obrigado! Suas informações foram registradas.");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error);
        alert("Obrigado! Suas informações foram registradas.");
      });
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: '605px', margin: '0 auto 40px auto' }}>
        <Progress value={progressValue} aria-label="Progresso do Quiz" />
      </div>

      <div style={{ marginTop: '40px' }}>
        <StepQuestion
          key={activeStep.id} // Re-render input state on step change
          question={activeStep.question}
          subtext={activeStep.subtext}
          type={activeStep.type}
          options={activeStep.options}
          inputs={activeStep.inputs}
          onOptionSelect={handleNext} // For radio
          onNext={handleNext} // For inputs
        />
      </div>
    </Layout>
  );
}

export default App;
