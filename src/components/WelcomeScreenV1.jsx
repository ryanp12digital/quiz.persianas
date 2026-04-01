import React from 'react';
import TrustBadges from './TrustBadges';
import { Button } from './ui/button';

export default function WelcomeScreenV1({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-4 sm:py-6 animate-fadeIn space-y-4 sm:space-y-6">
      <TrustBadges />

      <h1 className="text-[26px] sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4" style={{ textWrap: 'balance' }}>
        Orçamento de Persiana e Cortina Sob Medida
      </h1>

      <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg">
        Escolha o que combina com seu ambiente e receba uma estimativa alinhada às suas escolhas.
      </p>

      <div className="w-full max-w-sm sm:max-w-none sm:w-auto pt-1 flex justify-center">
        <Button
          onClick={onStart}
          size="lg"
          className="w-full sm:w-auto h-auto min-h-0 py-4 px-8 sm:px-10 rounded-full text-base font-semibold whitespace-nowrap
            bg-linear-to-b from-[#58c558] to-[#43a047] text-white border border-white/25 shadow-[0_4px_16px_rgba(67,160,71,0.42)]
            hover:from-[#4CAF50] hover:to-[#3d8b40] hover:shadow-[0_6px_22px_rgba(67,160,71,0.5)] hover:-translate-y-px
            active:translate-y-0 active:scale-[0.99] active:shadow-[0_2px_10px_rgba(67,160,71,0.35)]
            transition-[transform,box-shadow,background] duration-200"
        >
          Calcular Orçamento
        </Button>
      </div>

      <p className="text-sm text-[#666666] mt-4" style={{ fontSize: '14px' }}>
        ✓ Mais de 10.000 ambientes transformados com perfeição
      </p>
    </div>
  );
}
