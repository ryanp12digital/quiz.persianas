import React from 'react';
import logo from '/favicon.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-auto py-8 px-4" style={{ width: '920px' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Logo e Copyright - Esquerda */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <img 
            src={logo} 
            alt="Persianas Paulista" 
            className="h-6 w-6 object-contain"
          />
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-700">
              © {currentYear} Persianas Paulista. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Endereço - Direita */}
        <div className="flex items-start gap-3 text-right md:text-left" style={{ width: '340px' }}>
          <svg 
            className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <div className="flex flex-col" style={{ gap: '8px' }}>
            <p className="text-sm text-gray-900 dark:text-gray-700 font-medium">
              Rua Tabor 250 - Ipiranga São Paulo - SP
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
