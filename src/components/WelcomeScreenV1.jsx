import React, { useEffect } from 'react';
import TrustBadges from './TrustBadges';
import { Button } from './ui/button';

const TRUSTINDEX_SCRIPT_URL = 'https://cdn.trustindex.io/loader.js?1cb013764e5e791d3196ebcc355';

export default function WelcomeScreenV1({ onStart }) {
  useEffect(() => {
    const container = document.getElementById('trustindex-widget');
    if (!container) return;
    const script = document.createElement('script');
    script.src = TRUSTINDEX_SCRIPT_URL;
    script.defer = true;
    script.async = true;
    container.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

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

      <div id="trustindex-reviews-widget" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div id="trustindex-reviews-header" style={{ textAlign: 'center', marginBottom: '0px' }}>
        </div>
        {/* Widget do Trustindex carregado via useEffect */}
        <div id="trustindex-widget" className="min-h-[80px] flex justify-center items-center" aria-label="Avaliações Google" />
      </div>
    </div>
  );
}
