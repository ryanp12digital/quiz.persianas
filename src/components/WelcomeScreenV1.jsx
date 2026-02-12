import React from 'react';
import TrustBadges from './TrustBadges';
import { Button } from './ui/button';

export default function WelcomeScreenV1({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-4 sm:py-6 animate-fadeIn">
      <TrustBadges />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ textWrap: 'balance' }}>
        Bem-vindo à Persianas Paulista
      </h1>

      <div className="space-y-3 sm:space-y-4 text-gray-600 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg">
        <p className="text-gray-700 font-medium">
          Escolha o que combina com seu ambiente e receba uma estimativa alinhada às suas escolhas.
        </p>
        <p className="text-sm sm:text-base">
          Fabricamos cortinas e persianas sob medida para residências e empresas. O pré-orçamento é uma estimativa rápida. O valor final é confirmado após visita técnica para validar as medidas.
        </p>
      </div>

      <Button onClick={onStart} size="xl" className="shadow-xl hover:-translate-y-0.5 active:scale-[0.98]">
        Quero começar
      </Button>
    </div>
  );
}
