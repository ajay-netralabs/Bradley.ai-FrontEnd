import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ClientApp from './Client/ClientApp';
import AnalystApp from './Analyst/AnalystApp';
import { useAppContext } from './Context API/AppContext';

const App: React.FC = () => {
  const { user } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client" element={user && user.role === 'client' ? <ClientApp /> : <Navigate to="/login" />} />
        <Route path="/analyst" element={user && user.role === 'analyst' ? <AnalystApp /> : <Navigate to="/login" />} />
        <Route
          path="/"
          element={user ? (user.role === 'analyst' ? <Navigate to="/analyst" /> : <Navigate to="/client" />) : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
