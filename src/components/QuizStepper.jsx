import React from 'react';
import { LayoutGrid, Palette, Settings, Ruler, PlusCircle, Check } from 'lucide-react';

const STEPS_CONFIG = [
  { id: 'modelo', label: 'Modelo', Icon: LayoutGrid },
  { id: 'tecido', label: 'Tecido', Icon: Palette },
  { id: 'acionamento', label: 'Acionamento', Icon: Settings },
  { id: 'medidas', label: 'Medidas', Icon: Ruler },
  { id: 'outras', label: 'Final', Icon: PlusCircle },
];

// Função para identificar a fase atual baseado no stepId
const getCurrentPhase = (stepId, steps) => {
  if (!stepId) return null;

  if (stepId === 'passo_1_intencao') {
    return null;
  }

  if (stepId === 'passo_3v3_tecido') {
    return 'tecido';
  }
  if (stepId === 'passo_3v3_modelo') {
    return 'modelo';
  }

  if (stepId === 'passo_4_modelo' || stepId === 'passo_4_modelo_teto') {
    return 'modelo';
  }

  if (stepId.startsWith('passo_4_tecido_') || stepId === 'passo_4_acabamento_cortina') {
    return 'tecido';
  }

  if (stepId === 'passo_3_acionamento') {
    return 'acionamento';
  }

  if (stepId === 'passo_6_medidas') {
    return 'medidas';
  }

  if (stepId === 'passo_7_mais_itens' || stepId === 'passo_7_adicionar_item') {
    return 'outras';
  }

  if (stepId === 'passo_8_captura' || stepId === 'passo_8_captura_catalogo') {
    return null;
  }

  return null;
};

const getCompletedPhases = (currentPhase, history, steps) => {
  const completed = [];
  const phaseOrder = ['modelo', 'tecido', 'acionamento', 'medidas', 'outras'];

  if (!currentPhase) return completed;

  const currentIndex = phaseOrder.indexOf(currentPhase);
  if (currentIndex === -1) return completed;

  return phaseOrder.slice(0, currentIndex);
};

export default function QuizStepper({ currentStepId, steps = [] }) {
  const currentPhase = getCurrentPhase(currentStepId, steps);

  if (!currentPhase) {
    return null;
  }

  const completedPhases = getCompletedPhases(currentPhase, [], steps);
  const currentPhaseIndex = STEPS_CONFIG.findIndex(s => s.id === currentPhase);

  return (
    <div className="w-full mb-6 sm:mb-8 min-w-0 overflow-x-auto overflow-y-hidden -mx-1 px-1">
      <div className="flex items-center gap-1 sm:gap-4 min-w-0 sm:min-w-full">
        {STEPS_CONFIG.map((step, index) => {
          const isCompleted = completedPhases.includes(step.id);
          const isCurrent = step.id === currentPhase;
          const Icon = step.Icon;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1 min-w-0 shrink-0 sm:shrink basis-0">
                <div
                  className={`
                    w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0
                    transition-all
                    ${isCompleted
                      ? 'bg-green-500 text-white shadow-md'
                      : isCurrent
                      ? 'bg-[#4CAF50] text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  ) : (
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6" strokeWidth={2} />
                  )}
                </div>
                <span
                  className={`
                    mt-1.5 sm:mt-2 text-[10px] sm:text-sm font-medium text-center truncate max-w-full
                    ${isCurrent ? 'text-[#4CAF50] font-semibold' : isCompleted ? 'text-gray-600' : 'text-gray-400'}
                  `}
                  title={step.label}
                >
                  {step.label}
                </span>
              </div>

              {index < STEPS_CONFIG.length - 1 && (
                <div
                  className={`
                    flex-1 min-w-[6px] sm:min-w-0 h-0.5 sm:h-1 mx-0.5 sm:mx-1 shrink-0
                    ${isCompleted || index < currentPhaseIndex
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
