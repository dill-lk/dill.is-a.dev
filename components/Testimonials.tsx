import React from 'react';
import BlurFade from './BlurFade';

const testimonials = [
  {
    quote: "Jinuk transformed our legacy system into a high-performance engine. The attention to detail in the UI is unmatched.",
    author: "Sarah Jenkins",
    role: "CTO at a US-based Startup",
    company: "TechFlow"
  },
  {
    quote: "Rarely do you find an engineer who cares as much about the typography as they do about the database schema. A true hybrid.",
    author: "Naveen Perera",
    role: "Product Lead at a Colombo-based Company",
    company: "Orbital"
  },
  {
    quote: "The reliability of the architecture Jinuk built allowed us to scale to 100k users without a single hiccup.",
    author: "Anusha Silva",
    role: "Founder of a FinTech Startup",
    company: "Nexus AI"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-40 bg-brand-950 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="mb-24">
           <h2 className="text-xs font-mono text-brand-400 mb-6 uppercase tracking-wider">05 / Perspectives</h2>
           <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight">From the network</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
           {testimonials.map((t, idx) => (
             <BlurFade key={idx} delay={idx * 0.15}>
               <div className="flex flex-col justify-between h-full border-l border-white/10 pl-8 py-2 group hover:border-brand-400 transition-all duration-300 ease-in-out">
                  <p className="text-xl md:text-2xl text-brand-200 font-serif italic leading-relaxed mb-8 opacity-80 group-hover:opacity-100 transform transition-all duration-300 group-hover:-translate-y-1">
                    "{t.quote}"
                  </p>
                  <div>
                     <div className="text-white font-medium">{t.author}</div>
                     <div className="text-brand-500 text-sm font-mono uppercase tracking-widest mt-1">{t.role}</div>
                  </div>
               </div>
             </BlurFade>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;