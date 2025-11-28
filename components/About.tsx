import React, { useEffect, useState, useRef } from 'react';
import { Globe, Code, Cpu, Gauge, Layout, Server } from 'lucide-react';
import MagicStarAnimation from './MagicStarAnimation';
import SpotlightCard from './SpotlightCard';
import BlurFade from './BlurFade';
import FloatingIcon from './FloatingIcon';
import TiltedCard from './TiltedCard';
import AuroraBackground from './AuroraBackground';

const RollingNumber: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 1500, suffix = "" }) => {
   const [count, setCount] = useState(0);
   const elementRef = useRef<HTMLSpanElement>(null);
   const hasAnimated = useRef(false);

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         const entry = entries[0];
         if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime: number | null = null;

            const animate = (currentTime: number) => {
               if (!startTime) startTime = currentTime;
               const progress = Math.min((currentTime - startTime) / duration, 1);

               // Ease out quart for smooth "landing"
               const ease = 1 - Math.pow(1 - progress, 4);

               setCount(Math.floor(ease * end));

               if (progress < 1) {
                  requestAnimationFrame(animate);
               } else {
                  setCount(end);
               }
            };

            requestAnimationFrame(animate);
         }
      }, { threshold: 0.5 });

      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
   }, [end, duration]);

   // Pad single digits with a leading zero (e.g., 04)
   const formattedCount = count < 10 ? `0${count}` : count;

   return (
      <span ref={elementRef} className="tabular-nums">
         {formattedCount}{suffix}
      </span>
   );
};

const About: React.FC = () => {
   return (
      <section id="about" className="py-40 bg-[var(--brand-950)] relative border-t border-white/5">
         <div className="container mx-auto px-6 max-w-[1400px]">

            <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
               <div>
                  <h2 className="text-sm font-mono text-[var(--brand-400)] mb-6 uppercase tracking-wider flex items-center">
                     01 <span className="ml-2">/ The Profile</span>
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-medium text-[var(--foreground)] tracking-tight max-w-4xl">
                     Engineering systems that <br /> feel like <span className="text-[var(--brand-400)] italic font-serif relative inline-flex overflow-visible">
                        magic.
                        <span className="absolute top-0 -right-8 w-10 h-10 text-[var(--brand-400)] pointer-events-none">
                           <MagicStarAnimation />
                        </span>
                     </span>
                  </h3>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

               {/* Bento Box 1: Main Text */}
               <SpotlightCard className="md:col-span-2 lg:col-span-2 row-span-2 p-8 md:p-12 flex flex-col justify-between">
                  <div className="relative z-10">
                     <Globe className="text-[var(--foreground)] mb-8" size={32} strokeWidth={1} />
                     <p className="text-xl md:text-2xl text-[var(--brand-200)] font-light leading-relaxed">
                        I operate at the intersection of <span className="font-serif italic text-[var(--brand-400)]">design</span> and <span className="font-serif italic text-[var(--brand-400)]">engineering</span>. My philosophy is simple: code is a tool to <span className="font-semibold text-[var(--foreground)]">solve human problems</span>. I don't just build features; I architect <span className="font-serif italic text-[var(--brand-400)]">reliable, scalable ecosystems</span> that stand the test of time.
                     </p>
                  </div>
                  <div className="relative z-10 mt-12 flex gap-12 border-t border-white/5 pt-8">
                     <div>
                        <div className="text-4xl font-semibold text-[var(--foreground)]">
                           <RollingNumber end={4} suffix="+" />
                        </div>
                        <div className="text-xs text-[var(--brand-500)] mt-2 uppercase tracking-widest">Years Experience</div>
                     </div>
                     <div>
                        <div className="text-4xl font-semibold text-[var(--foreground)]">
                           <RollingNumber end={20} suffix="+" />
                        </div>
                        <div className="text-xs text-[var(--brand-500)] mt-2 uppercase tracking-widest">Projects Shipped</div>
                     </div>
                  </div>
               </SpotlightCard>

               {/* Bento Box 2: Tech Stack Visualization */}
               <BlurFade delay={100} className="md:col-span-1">
                  <TiltedCard className="h-full">
                     <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center group text-center">
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                           <Code size={140} strokeWidth={0.5} className="group-hover:rotate-6 transition-transform duration-700" />
                        </div>
                        <FloatingIcon duration={3} delay={0} className="mb-6 relative z-10">
                           <Code className="text-[var(--foreground)] group-hover:text-[var(--brand-400)] transition-colors duration-300" size={48} strokeWidth={1.5} />
                        </FloatingIcon>
                        <h4 className="text-[var(--foreground)] text-lg font-medium font-serif italic mb-2 relative z-10">Frontend</h4>
                        <p className="text-[var(--brand-400)] text-sm relative z-10">React, Next.js, Three.js</p>
                     </SpotlightCard>
                  </TiltedCard>
               </BlurFade>

               {/* Bento Box 3: Backend */}
               <BlurFade delay={200} className="md:col-span-1">
                  <TiltedCard className="h-full">
                     <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center group text-center">
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                           <Cpu size={140} strokeWidth={0.5} className="group-hover:-rotate-6 transition-transform duration-700" />
                        </div>
                        <FloatingIcon duration={3} delay={0.5} className="mb-6 relative z-10">
                           <Cpu className="text-[var(--foreground)] group-hover:text-[var(--brand-400)] transition-colors duration-300" size={48} strokeWidth={1.5} />
                        </FloatingIcon>
                        <h4 className="text-[var(--foreground)] text-lg font-medium font-serif italic mb-2 relative z-10">Backend</h4>
                        <p className="text-[var(--brand-400)] text-sm relative z-10">Node, Python, AWS</p>
                     </SpotlightCard>
                  </TiltedCard>
               </BlurFade>

               {/* Bento Box 4: DevOps */}
               <BlurFade delay={300} className="md:col-span-1">
                  <TiltedCard className="h-full">
                     <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center text-center group">
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                           <Server size={140} strokeWidth={0.5} className="group-hover:rotate-6 transition-transform duration-700" />
                        </div>
                        <FloatingIcon duration={3} delay={0.8} className="mb-6 relative z-10">
                           <Server className="text-[var(--foreground)] group-hover:text-[var(--brand-400)] transition-colors duration-300" size={48} strokeWidth={1.5} />
                        </FloatingIcon>
                        <h4 className="text-[var(--foreground)] text-lg font-medium font-serif italic mb-2 relative z-10">DevOps</h4>
                        <p className="text-[var(--brand-400)] text-sm relative z-10">Docker, Kubernetes, CI/CD</p>
                     </SpotlightCard>
                  </TiltedCard>
               </BlurFade>

               {/* Bento Box 5: Performance */}
               <BlurFade delay={400} className="md:col-span-1">
                  <TiltedCard className="h-full">
                     <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center text-center group">
                        <div className="relative z-10 flex flex-col items-center">
                           <FloatingIcon duration={2.5} delay={1} className="mb-6">
                              <Gauge className="text-[var(--foreground)] group-hover:text-[var(--brand-400)] transition-colors duration-300" size={48} strokeWidth={1.5} />
                           </FloatingIcon>
                           <h4 className="text-[var(--foreground)] text-lg font-medium font-serif italic">Performance</h4>
                           <div className="text-[var(--brand-500)] text-xs mt-2 uppercase tracking-wider">Non-negotiable</div>
                        </div>
                     </SpotlightCard>
                  </TiltedCard>
               </BlurFade>

               {/* Bento Box 6: Detail */}
               <BlurFade delay={500} className="md:col-span-1">
                  <TiltedCard className="h-full">
                     <AuroraBackground className="h-full rounded-3xl">
                        <SpotlightCard className="h-full p-8 flex flex-col justify-center items-center text-center group bg-transparent border-none">
                           <div className="relative z-10 flex flex-col items-center">
                              <FloatingIcon duration={2.8} delay={1.5} className="mb-6">
                                 <Layout className="text-[var(--foreground)] group-hover:text-white transition-colors duration-300" size={48} strokeWidth={1.5} />
                              </FloatingIcon>
                              <h4 className="text-[var(--foreground)] text-lg font-medium font-serif italic">Pixel Perfect</h4>
                              <div className="text-white/70 text-xs mt-2 uppercase tracking-wider">Every Detail Matters</div>
                           </div>
                        </SpotlightCard>
                     </AuroraBackground>
                  </TiltedCard>
               </BlurFade>

            </div>
         </div>
      </section>
   );
};

export default About;
