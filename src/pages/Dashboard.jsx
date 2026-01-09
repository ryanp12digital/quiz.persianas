import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

// Dados simulados para demonstração do funil
// Em um cenário real, esses dados viriam de uma API conectada ao seu banco de dados/n8n
const MOCK_DATA = {
  v1: {
    views: 1250,
    starts: 980,
    steps: [
      { id: 'passo_1', label: 'Intenção', count: 980 },
      { id: 'passo_3', label: 'Acionamento', count: 850 },
      { id: 'passo_4', label: 'Modelo', count: 720 },
      { id: 'passo_4_t', label: 'Tecido', count: 610 },
      { id: 'passo_5', label: 'Estágio', count: 540 },
      { id: 'passo_6', label: 'Medidas', count: 420 },
      { id: 'passo_8', label: 'Conversão (Lead)', count: 310 },
    ]
  },
  v2: {
    views: 850,
    starts: 720,
    steps: [
      { id: 'passo_1', label: 'Intenção', count: 720 },
      { id: 'passo_3', label: 'Acionamento', count: 680 },
      { id: 'passo_4', label: 'Modelo', count: 610 },
      { id: 'passo_4_t', label: 'Tecido', count: 590 },
      { id: 'passo_5', label: 'Estágio', count: 520 },
      { id: 'passo_6', label: 'Medidas', count: 480 },
      { id: 'passo_8', label: 'Conversão (Lead)', count: 395 },
    ]
  }
};

export default function Dashboard() {
  const [selectedVersion, setSelectedVersion] = useState('v2');
  const data = MOCK_DATA[selectedVersion];
  
  const completionRate = ((data.steps[data.steps.length - 1].count / data.starts) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard de Performance</h1>
            <p className="text-gray-400 mt-1">Análise de progressão e funil de conversão</p>
          </div>
          
          <div className="flex bg-[#1a1d23] p-1 rounded-xl border border-gray-800">
            <button 
              onClick={() => setSelectedVersion('v1')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedVersion === 'v1' ? 'bg-[#4CAF50] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Quiz V1
            </button>
            <button 
              onClick={() => setSelectedVersion('v2')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${selectedVersion === 'v2' ? 'bg-[#4CAF50] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Quiz V2
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Visualizações" value={data.views} />
          <StatCard title="Inícios" value={data.starts} />
          <StatCard title="Taxa de Conclusão" value={`${completionRate}%`} highlight />
        </div>

        {/* Funnel Section */}
        <div className="bg-[#1a1d23] rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl">
          <h2 className="text-xl font-semibold mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-[#4CAF50] rounded-full"></span>
            Fluxo de Etapas
          </h2>
          
          <div className="space-y-6">
            {data.steps.map((step, index) => {
              const percentageOfTotal = ((step.count / data.starts) * 100).toFixed(1);
              const dropOff = index > 0 ? (((data.steps[index-1].count - step.count) / data.steps[index-1].count) * 100).toFixed(1) : 0;
              
              return (
                <div key={step.id} className="relative">
                  <div className="flex items-center gap-4 group">
                    {/* Label and Bar Container */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2 px-1">
                        <span className="text-sm font-medium text-gray-300">{step.label}</span>
                        <div className="flex gap-4">
                          <span className="text-sm font-bold">{step.count} <span className="text-gray-500 font-normal">users</span></span>
                          <span className="text-sm text-[#4CAF50] font-bold">{percentageOfTotal}%</span>
                        </div>
                      </div>
                      
                      <div className="h-12 bg-[#0f1115] rounded-xl overflow-hidden border border-gray-800/50 flex items-center px-1">
                        <div 
                          className="h-10 bg-gradient-to-r from-[#4CAF50] to-[#81C784] rounded-lg transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(76,175,80,0.2)]"
                          style={{ width: `${percentageOfTotal}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Drop-off indicator */}
                    {index > 0 && (
                      <div className="hidden md:flex flex-col items-center justify-center w-24 bg-red-500/10 border border-red-500/20 rounded-xl p-2 animate-pulse">
                        <span className="text-[10px] uppercase text-red-400 font-bold">Queda</span>
                        <span className="text-sm text-red-400 font-bold">-{dropOff}%</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Connector Line */}
                  {index < data.steps.length - 1 && (
                    <div className="absolute left-6 -bottom-6 w-0.5 h-6 bg-gray-800"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Os dados acima são atualizados em tempo real via DataLayer e Webhooks.</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, highlight = false }) {
  return (
    <div className={`bg-[#1a1d23] p-8 rounded-3xl border border-gray-800 shadow-xl transition-transform hover:scale-[1.02] ${highlight ? 'ring-2 ring-[#4CAF50]/30' : ''}`}>
      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</p>
      <p className={`text-4xl font-bold ${highlight ? 'text-[#4CAF50]' : 'text-white'}`}>{value}</p>
    </div>
  );
}
