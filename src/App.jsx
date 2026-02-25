import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizV1 from './v1/QuizV1';
import QuizV2 from './v2/QuizV2';
import QuizV3 from './v3/QuizV3';
import QuizV4 from './v4/QuizV4';
import QuizV5 from './v5/QuizV5';
import QuizV6 from './v6/QuizV6';
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
        <Route path="/quiz/v3" element={<QuizV3 />} />
        <Route path="/quiz/v4" element={<QuizV4 />} />
        <Route path="/quiz/v5" element={<QuizV5 />} />
        <Route path="/quiz/v6" element={<QuizV6 />} />
        <Route path="/quiz/obrigado" element={<ThankYouPage />} />
        <Route path="/quiz/admin" element={<Dashboard />} />
        
        {/* Fallback para qualquer outra rota */}
        <Route path="*" element={<Navigate to="/quiz/v1" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
