import { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import PersonalPlanner from './screens/PersonalPlanner';
import './index.css';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem('career_user_data');
      return saved ? JSON.parse(saved) : { skills: '', targetRole: '' };
    } catch {
      return { skills: '', targetRole: '' };
    }
  });

  const [analysisData, setAnalysisData] = useState(() => {
    try {
      const saved = localStorage.getItem('career_analysis_data');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('career_user_data', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (analysisData) {
      localStorage.setItem('career_analysis_data', JSON.stringify(analysisData));
    } else {
      localStorage.removeItem('career_analysis_data');
    }
  }, [analysisData]);

  return (
    <AppContext.Provider value={{ userData, setUserData, analysisData, setAnalysisData }}>
      <BrowserRouter>
        <div className="orb orb-purple" />
        <div className="orb orb-blue" />
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={analysisData ? <Navigate to="/dashboard" replace /> : <HomeScreen />} />
            <Route path="/dashboard" element={analysisData ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/planner" element={analysisData ? <PersonalPlanner /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
