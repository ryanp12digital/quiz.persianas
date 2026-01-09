import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizV1 from './v1/QuizV1';
import QuizV2 from './v2/QuizV2';
import ThankYouPage from './pages/ThankYouPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirecionar a raiz para v1 ou v2 conforme preferência, aqui v1 por padrão */}
        <Route path="/" element={<Navigate to="/quiz/v1" replace />} />
        
        {/* Rotas para as versões do quiz */}
        <Route path="/quiz/v1" element={<QuizV1 />} />
        <Route path="/quiz/v2" element={<QuizV2 />} />
        <Route path="/quiz/obrigado" element={<ThankYouPage />} />
        <Route path="/quiz/admin" element={<Dashboard />} />
        
        {/* Fallback para qualquer outra rota */}
        <Route path="*" element={<Navigate to="/quiz/v1" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
