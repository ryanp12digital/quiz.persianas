import React from 'react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ textWrap: 'balance' }}>
        Bem-vindo à Persianas Paulista
      </h1>
      
      <div className="space-y-4 text-gray-600 leading-relaxed mb-10 text-lg">
        <p>
        Fabricamos cortinas e persianas sob medida para residências e empresas. Responda ao questionário abaixo para receber um pré-orçamento rápido e adiantar o seu atendimento.        </p>
        <p>
        Informamos que o orçamento oficial é apresentado após a visita técnica, onde validamos as medidas e apresentamos todas as possibilidades do nosso catálogo físico.        </p>
        
      </div>
      
      <button
        onClick={onStart}
        className="bg-[#4CAF50] text-white font-bold py-5 px-12 rounded-2xl shadow-xl hover:bg-green-600 transition-all transform hover:-translate-y-1 active:scale-95 text-xl"
      >
        Quero começar
      </button>
    </div>
  );
}
