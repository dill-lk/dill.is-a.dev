import React from 'react';
import Foruflower from './foruflower';
import BlurFade from './BlurFade';

const services = [
  {
    title: "Frontend Development",
    items: ["React & Next.js Ecosystems", "WebGL & Three.js Experiences", "Performance Optimization", "Accessibility (a11y)"]
  },
  {
    title: "Backend Engineering",
    items: ["Microservices Architecture", "API Design (REST & GraphQL)", "Database Management", "Cloud Infrastructure (AWS)"]
  },
  {
    title: "Product Strategy",
    items: ["Technical Feasibility", "MVP Definition", "Scalability Planning", "Code Audits"]
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-32 bg-black border-t border-white/5">
       <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
             <div className="relative">
                <BlurFade delay={200}>
                  <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight mb-8">
                     Precision engineering for <br/> <span className="text-brand-400 font-serif italic">digital dominance.</span>
                  </h3>
                </BlurFade>
                <BlurFade delay={400}>
                  <p className="text-brand-300 text-lg font-light leading-relaxed max-w-md">
                     I help companies and startups build <span className="font-semibold text-white">robust digital products</span> that <span className="font-serif italic text-brand-400">look beautiful</span> and <span className="font-serif italic text-brand-400">perform flawlessly</span> under load.
                  </p>
                </BlurFade>
                <Foruflower />
                <style>{`
                  @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                  }
                  @keyframes blink {
                    50% { border-color: transparent }
                  }
                `}</style>
                <BlurFade delay={600} className="absolute top-[450px] left-[280px] z-10">
                  <div 
                    className="text-white text-sm font-serif italic"
                    style={{ 
                      width: 'fit-content',
                      maxWidth: '100%' 
                    }}
                  >
                    Need A flower..<br/>this is for u grab it
                  </div>
                </BlurFade>
             </div>

             <div className="space-y-12">
                {services.map((s, idx) => (
                   <BlurFade key={idx} delay={200 + idx * 100}>
                     <div className="group">
                        <h4 className="text-xl text-white font-medium mb-6 group-hover:text-brand-200 transition-colors">{s.title}</h4>
                        <ul className="grid grid-cols-2 gap-4">
                           {s.items.map((item, i) => (
                              <li key={i} className="text-sm text-brand-400 font-mono flex items-center gap-3">
                                 <div className="w-1 h-1 bg-brand-600 rounded-full group-hover:bg-brand-200 transition-colors"></div>
                                 {item}
                              </li>
                           ))}
                        </ul>
                        <div className="h-[1px] w-full bg-white/10 mt-8 group-hover:bg-white/20 transition-colors"></div>
                     </div>
                   </BlurFade>
                ))}
             </div>
          </div>
       </div>
    </section>
  );
};

export default Services;