import React from 'react';
import logo from '/favicon.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 mt-auto py-4 sm:py-8 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-6">
        {/* Logo e Copyright - Esquerda */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <img 
            src={logo} 
            alt="Persianas Paulista" 
            className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
          />
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-700">
              © {currentYear} Persianas Paulista. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Endereço - Direita */}
        <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-right w-full sm:w-auto justify-center" style={{ verticalAlign: 'middle' }}>
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 mt-0.5 shrink-0" 
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
          <div className="flex flex-col gap-1 sm:gap-2">
            <p className="text-xs text-gray-900 dark:text-gray-700 font-medium">
              Rua Tabor 250 - Ipiranga São Paulo - SP
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
