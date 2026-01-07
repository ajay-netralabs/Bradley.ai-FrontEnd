import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import ClientApp from './Client/ClientApp';
// import AnalystApp from './Analyst/AnalystApp';
import DemoApp from './Demo/DemoApp';
import { useAppContext } from './Context/AppContext';

const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/bradley')) {
      document.title = 'Bradley.ai';
    } else if (location.pathname.includes('/emissioncheckiq')) {
      document.title = 'EmissionCheckIQ+';
    } else if (location.pathname.includes('/analyst')) {
      document.title = 'Bradley.ai Analyst';
    } else {
      document.title = 'Bradley.ai';
    }
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  const { user, authReady } = useAppContext();

  if (!authReady) {
    return null;
  }

  const getRedirectPath = () => {
    if (!user) return "/login/bradley";
    
    if (user.product === "emissioncheckiq") {
      return "/emissioncheckiq";
    }
    // if (user.role === 'analyst') {
    //   return "/analyst";
    // }
    if (user.role === 'client') {
      return "/bradley";
    }
    return "/bradley";
  };

  const redirectPath = getRedirectPath();

  const LoginElement = user ? <Navigate to={redirectPath} replace /> : <Login />;

  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route
          path="/login"
          element={LoginElement}
        />
        
        <Route
          path="/login/:productKey"
          element={LoginElement}
        />

        <Route
          path="/signup"
          element={
            user 
              ? <Navigate to={redirectPath} replace /> 
              : <Signup />
          }
        />
        <Route
          path="/emissioncheckiq/*"
          element={
            user?.product === "emissioncheckiq"
              ? <DemoApp />
              : <Navigate to="/login/emissioncheckiq" replace />
          }
        />
        <Route 
          path="/bradley/*" 
          element={
            user?.role === 'client' 
              ? <ClientApp /> 
              : <Navigate to="/login/bradley" replace />
          } 
        />
        {/* <Route 
          path="/analyst/*" 
          element={
            user?.role === 'analyst' 
              ? <AnalystApp /> 
              : <Navigate to="/login" replace />
          } 
        /> */}
        <Route
          path="/"
          element={<Navigate to={redirectPath} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;