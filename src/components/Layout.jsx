import React from 'react';
import logo from '../assets/logo.png';

export default function Layout({ children }) {
  return (
    <div className="layout-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '40px',
        paddingTop: '20px'
      }}>
        <img src={logo} alt="Persianas Paulista" style={{ height: '80px', objectFit: 'contain' }} />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
