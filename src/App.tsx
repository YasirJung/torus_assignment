import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.tsx';
import UserManagement from './components/UserManagement.tsx';
import AnalyticsDashboard from './components/AnalyticsDashboard.tsx';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<UserManagement />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

