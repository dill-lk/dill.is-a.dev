import React from 'react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-40 bg-brand-950 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <div className="mb-24 text-center">
            <h2 className="text-sm font-mono text-brand-400 mb-4 uppercase tracking-wider">03 / Experience</h2>
            <h3 className="text-4xl font-medium text-white">Career Log</h3>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          
            <div className="group relative flex flex-col items-center text-center">
              
              {/* Content Card */}
              <div className="w-full max-w-2xl p-10 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm">
                <div className="flex flex-col mb-6 items-center">
                  <span className="font-mono text-brand-500 text-sm mb-3 tracking-[0.2em] uppercase">2021 - Present</span>
                  <h3 className="text-3xl md:text-4xl font-medium text-white mb-2 font-serif italic">Self-Employed</h3>
                </div>
                
                <p className="text-brand-200 text-lg md:text-xl leading-relaxed font-light max-w-xl mx-auto">
                  Nahh. I am a <span className="font-bold text-white">Full Time Freelancer</span> <span className="font-serif italic text-brand-400 opacity-80 block mt-2 text-base">(Company will be soon)</span>
                </p>
                <p className="text-brand-400/40 text-xs mt-8 font-mono tracking-wider uppercase">
                   Architecting bespoke digital solutions for visionary clients
                </p>
              </div>
              
            </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;