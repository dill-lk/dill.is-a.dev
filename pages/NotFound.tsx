import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-black flex flex-col font-sans text-brand-100 relative">
        
        {/* Background Elements - Subtle & Architectural */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-900/20 rounded-full blur-[150px] pointer-events-none transform translate-x-1/3 translate-y-1/3"></div>

        <main className="flex-grow container mx-auto px-6 max-w-[1000px] flex flex-col justify-center items-center text-center relative z-10 pt-32 pb-20">
          
          {/* The "Claude/Anthropic" Vibe: Clean, serif headings, muted colors, intellectual feel */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-serif font-medium text-white tracking-tight mb-4">
              Page not <span className="italic text-brand-400">found.</span>
            </h1>
            <span className="inline-block py-1 px-3 rounded-lg bg-white/5 border border-white/10 text-brand-300 text-xs font-mono uppercase tracking-wider mt-4 mb-6">
              Error 404
            </span>
            <p className="text-brand-200 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              The requested resource could not be located on this server. <br className="hidden md:block" />
              It may have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Helpful Actions */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mt-8 animate-slide-up delay-100">
            <Link 
              to="/" 
              className="group flex items-center gap-3 bg-brand-500 text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-brand-400 transition-all duration-300"
            >
              <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
              <span>Return Home</span>
            </Link>
            
            <Link 
              to="/journal" 
              className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-lg font-medium text-base hover:bg-white/10 transition-all duration-300"
            >
              <Search size={18} className="text-brand-300 group-hover:text-white transition-colors" />
              <span>Browse Journal</span>
            </Link>
          </div>

          {/* Decorative Divider */}
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mt-16 mb-16"></div>

          {/* Suggested Links - Minimalist List */}
          <div className="text-left w-full max-w-md animate-slide-up delay-200">
            <p className="text-brand-400 text-xs font-mono uppercase tracking-widest mb-6 text-center">Recommended Destinations</p>
            <ul className="space-y-4">
                <li>
                    <Link to="/#projects" className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all group">
                        <span className="text-brand-200 group-hover:text-white font-light">Selected Projects</span>
                        <ArrowLeft size={16} className="rotate-180 text-brand-500 group-hover:text-white transition-colors" />
                    </Link>
                </li>
                <li>
                    <Link to="/#contact" className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all group">
                        <span className="text-brand-200 group-hover:text-white font-light">Contact Information</span>
                        <ArrowLeft size={16} className="rotate-180 text-brand-500 group-hover:text-white transition-colors" />
                    </Link>
                </li>
            </ul>
          </div>

        </main>
      </div>
    </>
  );
};

export default NotFound;