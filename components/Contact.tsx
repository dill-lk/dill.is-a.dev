import React from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import ArrowAnimation from './ArrowAnimation';
import Footer from './Footer';

const Contact: React.FC = () => {
  return (
    <>
      <section id="contact" className="py-48 bg-[var(--background)] relative border-t border-white/5 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between gap-20 items-start">
              <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-8">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                     <span className="text-[var(--brand-400)] font-mono text-xs uppercase tracking-widest">Available for new opportunities</span>
                  </div>
                  <h2 className="text-7xl md:text-[9vw] font-bold text-[var(--foreground)] leading-[0.85] tracking-tighter mb-12">
                    Let's <br/> <span className="text-[var(--brand-500)]">Create.</span>
                  </h2>
                  <div className="flex flex-col gap-4">
                       <p className="text-[var(--brand-300)] text-xl font-light max-w-md leading-relaxed">
                          Got a vision that needs engineering? A product that needs scaling? Or just want to talk about the future of tech?
                       </p>
                  </div>
              </div>

              <div className="md:w-1/2 w-full flex flex-col justify-end items-start md:items-end">
                  {/* Arrow Wrapper */}
                  <div className="relative w-full flex justify-end">
                     {/* Position adjusted based on user feedback: moved 100px right from previous position */}
                     <div className="hidden md:block absolute -top-7 right-[calc(80%+200px)] pointer-events-none z-20">
                        <ArrowAnimation />
                     </div>
                     
                     <a href="mailto:dill.ruzz.official@gmail.com" className="group w-full md:w-auto flex items-center justify-between md:justify-end gap-8 text-2xl md:text-4xl font-light text-[var(--foreground)] mb-16 pb-4 border-b border-white/10 hover:border-white transition-all duration-500 relative z-30">
                        <span>dill.ruzz.official@gmail.com</span>
                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                           <ArrowRight size={24} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                     </a>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-x-20 gap-y-10 text-left md:text-right w-full md:w-auto">
                      <div>
                          <h4 className="text-[var(--brand-500)] text-xs font-mono uppercase tracking-widest mb-4">Social</h4>
                          <div className="flex flex-col gap-2">
                            <a href="#" className="text-lg text-[var(--foreground)] hover:text-[var(--brand-300)] transition-colors">LinkedIn</a>
                            <a href="#" className="text-lg text-[var(--foreground)] hover:text-[var(--brand-300)] transition-colors">Twitter / X</a>
                            <a href="#" className="text-lg text-[var(--foreground)] hover:text-[var(--brand-300)] transition-colors">GitHub</a>
                          </div>
                      </div>
                      <div>
                          <h4 className="text-[var(--brand-500)] text-xs font-mono uppercase tracking-widest mb-4">Location</h4>
                          <div className="flex flex-col gap-2 md:items-end">
                            <p className="text-lg text-[var(--foreground)]">Sri Lanka</p>
                            <p className="text-[var(--brand-400)]">Matara, Sri Lanka</p>
                
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;