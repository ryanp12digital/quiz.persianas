import React, { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const PRECO_INFO_TEXT =
  'O valor gerado é um pré-orçamento estimado. Confirmamos as medidas exatas na visita técnica. Se as escolhas forem mantidas, o valor não sofre alteração.';

export default function PrecoInfo({ variant = 'accordion' }) {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'tooltip') {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[#4CAF50] hover:text-green-600 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 rounded"
              aria-label="Informações sobre pré-orçamento"
            >
              <Info className="w-4 h-4" strokeWidth={2} />
              Como funciona o pré-orçamento?
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {PRECO_INFO_TEXT}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 mb-4 sm:mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 sm:p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 rounded-lg"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-medium text-gray-800 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#4CAF50]" strokeWidth={2} />
          Como funciona o pré-orçamento?
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {isOpen && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-sm text-gray-700 leading-relaxed">
          {PRECO_INFO_TEXT}
        </div>
      )}
    </div>
  );
}
