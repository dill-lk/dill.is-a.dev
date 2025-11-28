import React from 'react';
import { Search, PenTool, Braces, Rocket } from 'lucide-react';
import ProcessArrowAnimation from './ProcessArrowAnimation';
import BlurFade from './BlurFade';

const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "Understanding the core problem, user needs, and business objectives to define the perfect scope.",
    icon: Search
  },
  {
    id: "02",
    title: "Architecture",
    desc: "Designing scalable, fault-tolerant systems and selecting the right tech stack for long-term success.",
    icon: PenTool
  },
  {
    id: "03",
    title: "Development",
    desc: "Writing clean, maintainable code with rigorous testing and continuous integration pipelines.",
    icon: Braces
  },
  {
    id: "04",
    title: "Deployment",
    desc: "Launching with zero-downtime strategies and setting up comprehensive monitoring and analytics.",
    icon: Rocket
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-40 bg-[var(--background)] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="mb-24 md:mb-32 relative">
          <div className="flex items-end">
            <div>
              <h2 className="text-sm font-mono text-[var(--brand-400)] mb-6 uppercase tracking-wider">02 / Methodology</h2>
              <h3 className="text-5xl md:text-7xl font-medium text-[var(--foreground)] tracking-tighter">The <span className="font-serif italic text-[var(--foreground)]">Process</span></h3>
            </div>
            <div className="absolute left-[355px] top-[-55px] md:top-[-25px]">
              <ProcessArrowAnimation />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {steps.map((step, idx) => (
            <BlurFade key={step.id} delay={idx * 0.15}>
              <div className="relative z-10 group p-8 rounded-3xl bg-[var(--brand-950)] border border-white/10 hover:bg-white/[0.03] transition-colors duration-300 h-full">
                <div className="w-20 h-20 rounded-full bg-[var(--brand-950)] border-2 border-[var(--brand-400)]/50 flex items-center justify-center mb-8 transition-colors duration-500 group-hover:bg-[var(--brand-400)]/10 group-hover:border-[var(--brand-400)]">
                   <step.icon size={28} className="text-[var(--brand-300)] group-hover:text-[var(--foreground)] transition-colors" strokeWidth={1.5} />
                </div>
                <div className="pr-4">
                  <span className="text-sm font-mono text-[var(--brand-500)] mb-4 block">{step.id}</span>
                  <h4 className="text-2xl font-medium text-[var(--foreground)] mb-4">{step.title}</h4>
                  <p className="text-[var(--brand-300)] text-base leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;