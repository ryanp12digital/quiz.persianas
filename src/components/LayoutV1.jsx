import React from 'react';
import logo from '../assets/logo.png';
import Footer from './Footer';

export default function LayoutV1({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/95 to-white">
      <div
        className="layout-container min-h-screen flex flex-col px-4 sm:px-5"
        style={{ maxWidth: '800px', margin: '0 auto', justifyContent: 'flex-start', alignItems: 'center' }}
      >
        <header className="w-full flex justify-center mb-6 sm:mb-8 pt-4 sm:pt-5">
          <img src={logo} alt="Persianas Paulista" className="object-contain h-[60px] sm:h-20" />
        </header>
        <main className="flex-1 w-full">
          <div className="bg-white rounded-xl p-6 sm:p-8 mb-6">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
