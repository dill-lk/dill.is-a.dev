import React from 'react';
import { MapPin, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import Foruflower from './foruflower';

// Simple cross icon SVG to match the site's vibe
const CrossIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
    <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const CV: React.FC = () => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-black text-white relative overflow-hidden mx-auto my-0 p-0 shadow-2xl">
      
      {/* --- Background Elements --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 pointer-events-none mix-blend-screen">
         <div className="transform scale-75 rotate-12 translate-x-20 -translate-y-20">
            <Foruflower />
         </div>
      </div>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40mm_40mm] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      {/* --- Content Container --- */}
      <div className="relative z-10 p-12 flex flex-col gap-10 h-full">

        {/* 1. Header Section */}
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-6xl font-bold tracking-tighter mb-2">
                JINUK<span className="text-brand-400">.</span>
              </h1>
              <h2 className="text-2xl text-brand-200 font-light">
                Full Stack <span className="font-serif italic text-white">Engineer</span>
              </h2>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col items-end gap-2 text-sm text-brand-300 font-mono">
              <a href="mailto:dill.ruzz.official@gmail.com" className="hover:text-white flex items-center gap-2">
                dill.ruzz.official@gmail.com <Mail size={12} />
              </a>
              <div className="flex items-center gap-2">
                Based in Sri Lanka <MapPin size={12} />
              </div>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-white flex items-center gap-1">LinkedIn <ArrowIcon /></a>
                <a href="#" className="hover:text-white flex items-center gap-1">GitHub <ArrowIcon /></a>
                <a href="#" className="hover:text-white flex items-center gap-1">Portfolio <ArrowIcon /></a>
              </div>
            </div>
          </div>

          <p className="text-brand-100/80 max-w-2xl leading-relaxed">
            Transforming complex requirements into <span className="font-serif italic text-white">seamless</span>, scalable architectures. 
            Specializing in building robust digital products that look <span className="font-serif italic text-white">beautiful</span> and perform flawlessly under load.
          </p>
        </header>

        <div className="grid grid-cols-[1fr_300px] gap-12">
          
          {/* Left Column: Experience & Projects */}
          <div className="flex flex-col gap-10">
            
            {/* Experience */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CrossIcon />
                <h3 className="text-xl font-medium tracking-widest uppercase text-brand-400">Experience</h3>
              </div>

              <div className="flex flex-col gap-8">
                {/* Job 1 */}
                <div className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-brand-200 transition-colors">Senior Frontend Engineer</h4>
                    <span className="font-mono text-xs text-brand-400">2023 — Present</span>
                  </div>
                  <div className="text-sm text-brand-300 mb-3 font-serif italic">TechCorp Solutions</div>
                  <ul className="list-none space-y-2 text-sm text-gray-400">
                    <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-brand-500 before:rounded-full">
                      Spearheaded the migration of legacy monorepo to Next.js 14, improving build times by 40%.
                    </li>
                    <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-brand-500 before:rounded-full">
                      Designed and implemented a reusable design system used across 5 different products.
                    </li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="group">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-lg font-semibold text-white group-hover:text-brand-200 transition-colors">Full Stack Developer</h4>
                    <span className="font-mono text-xs text-brand-400">2021 — 2023</span>
                  </div>
                  <div className="text-sm text-brand-300 mb-3 font-serif italic">Creative Agency X</div>
                  <ul className="list-none space-y-2 text-sm text-gray-400">
                    <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-brand-500 before:rounded-full">
                      Developed high-performance 3D landing pages using Three.js and React Fiber.
                    </li>
                    <li className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-brand-500 before:rounded-full">
                      Integrated Stripe and custom cart logic for e-commerce clients, handling $50k+ monthly volume.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Selected Projects */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <CrossIcon />
                <h3 className="text-xl font-medium tracking-widest uppercase text-brand-400">Selected Projects</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-white/10 p-4 rounded-lg bg-white/[0.02]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">E-Commerce Dashboard</h4>
                    <ExternalLink size={14} className="text-brand-400"/>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">A real-time analytics dashboard processing 10k+ events/sec.</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-brand-200">Next.js</span>
                    <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-brand-200">Supabase</span>
                  </div>
                </div>

                <div className="border border-white/10 p-4 rounded-lg bg-white/[0.02]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">AI Chat Interface</h4>
                    <ExternalLink size={14} className="text-brand-400"/>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">Streaming Markdown response parser with custom UI components.</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-brand-200">React</span>
                    <span className="text-[10px] border border-white/20 px-2 py-0.5 rounded-full text-brand-200">OpenAI</span>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Skills & Education */}
          <div className="flex flex-col gap-10 border-l border-white/10 pl-8 relative">
            {/* Decorative line element */}
            <div className="absolute top-0 -left-[1px] h-20 w-[1px] bg-brand-500"></div>

            <section>
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-500 mb-6">Tech Stack</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2 text-sm">Core</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js'].map(skill => (
                      <span key={skill} className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded hover:border-brand-400 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 text-sm">Creative & UI</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Three.js', 'GSAP', 'Tailwind', 'Framer Motion'].map(skill => (
                      <span key={skill} className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded hover:border-brand-400 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2 text-sm">Backend & Devops</h4>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'Docker', 'AWS', 'GraphQL'].map(skill => (
                      <span key={skill} className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded hover:border-brand-400 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-500 mb-6">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium text-sm">BSc. Computer Science</h4>
                  <p className="text-xs text-gray-500">University of Westminster</p>
                  <p className="text-xs text-brand-400 mt-1">2018 — 2022</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-mono uppercase tracking-widest text-brand-500 mb-6">Interests</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-serif italic">
                Generative Art, Mechanical Keyboards, Coffee Brewing, UI Design
              </p>
            </section>

          </div>
        </div>

        {/* Footer Area on CV */}
        <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase">
          <span>References available upon request</span>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 bg-green-500 rounded-full"></span>
             Open to work
          </div>
        </div>

      </div>
    </div>
  );
};

export default CV;
