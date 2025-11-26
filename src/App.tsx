import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ClientApp from './Client/ClientApp';
import AnalystApp from './Analyst/AnalystApp';
import DemoApp from './Demo/DemoApp';
import { useAppContext } from './Context/AppContext';

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/client') {
      document.title = 'Bradley.ai';
    } else if (location.pathname === '/demo') {
      document.title = 'EmissionCheckIQ+';
    } else {
      document.title = 'Bradley.ai';
    }
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const appContext = useAppContext();

  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client" element={appContext.user && appContext.user.role === 'client' ? <ClientApp /> : <Navigate to="/login" />} />
        <Route path="/analyst" element={appContext.user && appContext.user.role === 'analyst' ? <AnalystApp /> : <Navigate to="/login" />} />
        <Route path="/demo" element={appContext.user && appContext.user.role === 'demo' ? <DemoApp /> : <Navigate to="/login" />} />
        <Route
          path="/"
          element={appContext.user ? (appContext.user.role === 'analyst' ? <Navigate to="/analyst" /> : <Navigate to="/client" />) : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
