import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ArticleDetail from './pages/ArticleDetail';
import JournalPage from './pages/JournalPage';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import MobileApp from './mobile/App';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1367);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (isMobile) {
    return (
      <Router>
        <MobileApp />
      </Router>
    );
  }

  return (
    <Router>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        :root {
          --background: #000;
          --foreground: #fff;
          --brand-100: #e5e7eb;
          --brand-200: #d1d5db;
          --brand-300: #9ca3af;
          --brand-400: #6b7280;
          --brand-500: #4b5563;
          --brand-600: #374151;
          --brand-950: #030712;
        }
        html.light {
          --background: #fff;
          --foreground: #000;
          --brand-100: #374151;
          --brand-200: #4b5563;
          --brand-300: #6b7280;
          --brand-400: #9ca3af;
          --brand-500: #d1d5db;
          --brand-600: #e5e7eb;
          --brand-950: #f9fafb;
        }
      `}</style>
      <div className="min-h-screen bg-background text-brand-100 font-sans selection:bg-white selection:text-black overflow-x-hidden overflow-y-auto">
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
};

export default App;