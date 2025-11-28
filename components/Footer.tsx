import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-6 max-w-[1400px] flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-semibold text-white tracking-tight">
            JINUK<span className="text-brand-400">.</span>
          </span>
          <p className="text-brand-300/60 text-sm">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-brand-300/60 hover:text-brand-400 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-brand-300/60 hover:text-brand-400 transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="#" className="text-brand-300/60 hover:text-brand-400 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="mailto:hello@example.com" className="text-brand-300/60 hover:text-brand-400 transition-colors">
            <Mail size={20} />
          </a>
        </div>

        <div className="flex items-center gap-8 text-sm text-brand-300/60">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
