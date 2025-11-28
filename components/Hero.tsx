
import React, { useEffect, useState } from 'react';
import HandAnimation from './HandAnimation';
import { useOnScreen } from './useOnScreen';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState("FULL STACK");
  const fullText = "FULL STACK";

  const [ref1, isVisible1] = useOnScreen({ threshold: 0.1 });
  const [ref2, isVisible2] = useOnScreen({ threshold: 0.1 });
  const [ref3, isVisible3] = useOnScreen({ threshold: 0.1 });
  const [ref4, isVisible4] = useOnScreen({ threshold: 0.1 });
  const [ref5, isVisible5] = useOnScreen({ threshold: 0.1 }); // For the last div

  // Scramble effect on load
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        fullText.split("")
          .map((letter, index) => {
            if (index < iterations) {
              return fullText[index];
            }
            return String.fromCharCode(65 + Math.floor(Math.random() * 26));
          })
          .join("")
      );
      if (iterations >= fullText.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-end pb-8 md:pb-12 relative overflow-hidden bg-[var(--brand-950)] px-6">
      <style jsx>{`
        .fade-in-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-animation.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-up-animation {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .slide-up-animation.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      {/* Aurora Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-blue-500/10 rounded-full blur-[128px] animate-blob"></div>
        <div className="absolute top-[-10%] right-[-20%] w-[70vw] h-[70vw] bg-purple-500/10 rounded-full blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-white/5 rounded-full blur-[128px] animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto max-w-[1400px] relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-8">
            <div ref={ref1} className={`fade-in-animation order-2 md:order-1 ${isVisible1 ? 'is-visible' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  <p className="font-mono text-[var(--brand-300)] text-xs tracking-widest uppercase">Based in Sri Lanka</p>
                  <HandAnimation />
                </div>
            </div>
            
            <div ref={ref2} className={`fade-in-animation max-w-lg order-1 md:order-2 ${isVisible2 ? 'is-visible' : ''}`}>
                <p className="text-[var(--brand-200)] text-xl md:text-2xl leading-relaxed font-light tracking-tight">
                    Transforming complex requirements into <span className="font-serif italic text-[var(--foreground)]">seamless</span>, scalable architectures with a focus on <span className="font-serif italic text-[var(--foreground)]">aesthetic precision.</span>
                </p>
            </div>
        </div>

        <div className="relative border-t border-white/10 pt-4 md:pt-6">
            <h1 ref={ref3} className={`slide-up-animation text-[13.5vw] leading-[0.8] font-bold tracking-tighter text-[var(--foreground)] mix-blend-difference ${isVisible3 ? 'is-visible' : ''}`}>
              {displayText}
            </h1>
            <h1 ref={ref4} className={`slide-up-animation text-[13.5vw] leading-[0.8] font-bold tracking-tighter text-[var(--brand-500)] flex items-center gap-4 ${isVisible4 ? 'is-visible' : ''}`}>
              {/* Removed italics, enforced sans-serif */}
              <span className="pr-4 font-sans not-italic">ENGINEER</span> 
              <span className="hidden md:block h-[1vw] w-[1vw] bg-white rounded-full mt-4 animate-pulse"></span>
            </h1>
        </div>
        
        <div ref={ref5} className={`fade-in-animation mt-6 flex justify-between items-end ${isVisible5 ? 'is-visible' : ''}`}>
             <div className="hidden md:block"></div> {/* Spacer */}
             <a href="#projects" className="hidden md:flex items-center gap-4 text-[var(--brand-400)] hover:text-[var(--foreground)] transition-colors group pb-2">
                <span className="text-xs tracking-widest uppercase font-mono">Explore Case Studies</span>
                <HandAnimation className="transform scale-x-[-1]" />
                <span className="block h-[1px] w-12 bg-white/20 group-hover:w-24 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>
            </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
