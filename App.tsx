import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import Skills from './components/Skills';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Journal from './components/Journal';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';
import BlurFade from './components/BlurFade';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  return (
    <>
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
      <div className="min-h-screen bg-background text-brand-100 font-sans selection:bg-white selection:text-black overflow-x-hidden overflow-y-auto cursor-none">
        <CustomCursor />
        <Navbar theme={theme} setTheme={setTheme} />
        <main>
          <Hero />
          <About />
          <BlurFade delay={0.2}><Philosophy /></BlurFade>
          <BlurFade delay={0.2}><Process /></BlurFade>
          <BlurFade delay={0.2}><Skills /></BlurFade>
          <BlurFade delay={0.2}><Services /></BlurFade>
          <BlurFade delay={0.2}><Experience /></BlurFade>
          <BlurFade delay={0.2}><Projects /></BlurFade>
          <Journal />
          <Testimonials />
          <BlurFade delay={0.2}><Contact /></BlurFade>
        </main>
        <ChatWidget />
      </div>
    </>
  );
};

export default App;