import React from 'react';
import logo from '../assets/logo.png';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="layout-container min-h-screen flex flex-col" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', justifyContent: 'flex-start', alignItems: 'center' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '40px',
        paddingTop: '20px'
      }}>
        <img src={logo} alt="Persianas Paulista" style={{ height: '80px', objectFit: 'contain' }} />
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
