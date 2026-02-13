import React from 'react';
import logo from '../assets/logo.png';
import Footer from './Footer';

export default function LayoutV1({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/95 to-white min-w-0 max-w-full overflow-x-hidden">
      <div
        className="layout-container min-h-screen flex flex-col px-3 sm:px-5 w-full min-w-0 max-w-full"
        style={{ maxWidth: '800px', margin: '0 auto', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <header className="w-full flex justify-center mb-6 sm:mb-8 pt-4 sm:pt-5 min-w-0">
          <img src={logo} alt="Persianas Paulista" className="object-contain h-[60px] sm:h-20" />
        </header>
        <main className="flex-1 w-full min-w-0">
          <div className="bg-white rounded-xl p-4 sm:p-8 mb-6 min-w-0 max-w-full">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
