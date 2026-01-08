import React from 'react';
import Layout from '../components/Layout';

export default function ThankYouPage() {
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
        </div>
      </div>
    </Layout>
  );
}
