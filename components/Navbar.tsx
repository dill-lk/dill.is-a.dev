import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const getHref = (href: string) => {
    if (href.startsWith('#')) {
      return location.pathname === '/' ? href : `/${href}`;
    }
    return href;
  };

  return (
    <>
      <nav
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[60] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isScrolled
            ? 'w-[740px] bg-[#0a0a0a]/50 backdrop-blur-2xl rounded-full py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'w-full max-w-[1400px] py-8 px-6 bg-transparent'
          } group overflow-hidden hidden md:flex items-center justify-between`}
      >

        <Link to="/" className={`font-semibold tracking-tight text-white z-20 whitespace-nowrap transition-all duration-500 pl-6 md:pl-8 ${isScrolled ? 'opacity-100 text-base' : 'text-2xl'}`}>
          JINUK<span className="text-brand-400">.</span>
        </Link>

        {/* Desktop Nav - Smart Hiding */}
        <div className={`flex items-center gap-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pr-2
            ${isScrolled ? 'absolute left-1/2 -translate-x-1/2 pr-0' : ''}
          `}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={getHref(link.href)}
              className={`font-medium text-brand-300 hover:text-white transition-all duration-300 rounded-full hover:bg-white/[0.08] whitespace-nowrap
                  ${isScrolled ? 'text-[12px] px-4 py-1.5' : 'text-sm px-6 py-2'}
                `}
            >
              {link.label}
            </a>
          ))}
          
          <a
            href="/cv.html"
            target="_blank"
            className={`
              ml-2 font-medium flex items-center gap-2 transition-all duration-300 rounded-full whitespace-nowrap
              text-brand-950 bg-brand-300 hover:bg-white
              ${isScrolled ? 'text-[12px] px-4 py-1.5' : 'text-sm px-5 py-2'}
            `}
          >
            <span>CV</span>
            <Download size={isScrolled ? 14 : 16} />
          </a>

          <button onClick={toggleTheme} className="ml-4 p-2 rounded-full hover:bg-white/[0.08] text-brand-300 hover:text-white transition-colors">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        <div className={`transition-all duration-500 ${isScrolled ? 'w-16 opacity-0' : 'w-0'}`}>
          {/* Spacer for balance when scrolled */}
        </div>

        {isScrolled && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
        )}
      </nav>

      {/* Mobile Nav Button */}
      <div className="fixed top-6 right-6 z-[60] md:hidden">
        <button
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center shadow-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-700 md:hidden flex flex-col justify-center items-center gap-8 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {NAV_LINKS.map((link, idx) => (
          <a
            key={link.label}
            href={getHref(link.href)}
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-light text-white hover:text-brand-300 transition-all transform translate-y-0 tracking-tight"
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            {link.label}
          </a>
        ))}
        
        <a
          href="/cv.html"
          target="_blank"
          className="mt-4 flex items-center gap-3 text-2xl font-light text-brand-300 border border-brand-300/30 px-8 py-3 rounded-full hover:bg-brand-300 hover:text-black transition-all"
        >
          <span>View CV</span>
          <Download size={24} />
        </a>

        <button onClick={toggleTheme} className="mt-4 p-4 rounded-full bg-white/[0.08] text-white">
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </div>
    </>
  );
};

export default Navbar;