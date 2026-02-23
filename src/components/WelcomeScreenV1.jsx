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

      <div className="w-[90%] sm:w-auto pt-2">
        <Button
          onClick={onStart}
          size="xl"
          className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all"
        >
          Calcular meu Orçamento
        </Button>
      </div>

      <p className="text-sm text-[#666666] mt-4" style={{ fontSize: '14px' }}>
        ✓ Mais de 10.000 ambientes transformados com perfeição
      </p>
    </div>
  );
}
