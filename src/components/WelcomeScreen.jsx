import React from 'react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="w-full mb-8 overflow-hidden rounded-3xl shadow-2xl">
        <img 
          src="/destaque-inicio.png" 
          alt="Persianas Paulista" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6" style={{ textWrap: 'balance' }}>
        Seja bem-vindo à Persianas Paulista
      </h1>
      
      <div className="space-y-4 text-gray-600 leading-relaxed mb-10 text-lg">
        <p>
          Para que possamos compreender plenamente as suas necessidades e oferecer uma solução personalizada, elaboramos este breve questionário de consulta.
        </p>
        <p>
          As informações fornecidas permitirão que nossa equipe técnica realize uma análise preliminar precisa, agilizando o seu atendimento e garantindo a máxima eficiência na elaboração do seu orçamento.
        </p>
        <p className="font-medium text-gray-800">
          Sua jornada para o ambiente ideal começa agora.
        </p>
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
