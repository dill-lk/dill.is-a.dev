import React from 'react';
import { SKILLS_DATA } from '../constants';

const ICONIFY_BASE = "https://api.iconify.design";

// Apple Aesthetic: Strict Monochrome.
// We use 'simple-icons' because they are solid shapes that look great when inverted (white).
const SKILL_ICON_MAP: Record<string, string> = {
  "React": "simple-icons:react",
  "TypeScript": "simple-icons:typescript",
  "Next.js": "simple-icons:nextdotjs", 
  "Tailwind CSS": "simple-icons:tailwindcss",
  "Redux": "simple-icons:redux",
  "Framer Motion": "simple-icons:framer",
  "Three.js": "simple-icons:threedotjs",
  "Node.js": "simple-icons:nodedotjs",
  "Express": "simple-icons:express",
  "Python": "simple-icons:python",
  "Django": "simple-icons:django",
  "PostgreSQL": "simple-icons:postgresql",
  "MongoDB": "simple-icons:mongodb",
  "Redis": "simple-icons:redis",
  "AWS": "simple-icons:amazonaws",
  "Docker": "simple-icons:docker",
  "Kubernetes": "simple-icons:kubernetes",
  "CI/CD": "simple-icons:githubactions",
  "Terraform": "simple-icons:terraform",
  "Nginx": "simple-icons:nginx",
  "Google Gemini API": "simple-icons:google", // Using Google 'G' for maximum reliability in B&W
  "OpenAI API": "simple-icons:openai",
  "LangChain": "simple-icons:langchain",
  "Git": "simple-icons:git",
  "Jira": "simple-icons:jira",
  "Figma": "simple-icons:figma"
};

const Skills: React.FC = () => {
  const allSkills = SKILLS_DATA.flatMap(cat => cat.skills);
  const mid = Math.ceil(allSkills.length / 2);
  const firstRow = allSkills.slice(0, mid);
  const secondRow = allSkills.slice(mid);

  // Quadruple duplication for seamless infinite loop
  const row1 = [...firstRow, ...firstRow, ...firstRow, ...firstRow];
  const row2 = [...secondRow, ...secondRow, ...secondRow, ...secondRow];

  const getIconUrl = (skill: string) => {
    const iconKey = SKILL_ICON_MAP[skill];
    if (iconKey) {
        return `${ICONIFY_BASE}/${iconKey}.svg`;
    }
    return `${ICONIFY_BASE}/lucide:code-2.svg`;
  };

  return (
    <section id="skills" className="py-40 bg-[var(--background)] relative border-t border-white/5 overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-[1400px] mb-24 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end gap-6 reveal-on-scroll">
            <div>
              <h2 className="text-xs font-mono text-[var(--brand-400)] mb-6 uppercase tracking-wider">03 / Capability</h2>
              <h3 className="text-5xl md:text-7xl font-medium text-[var(--foreground)] tracking-tighter">The <span className="font-serif italic text-[var(--foreground)]">Tech Stack</span></h3>
            </div>
            <p className="text-[var(--brand-300)] text-lg font-light leading-relaxed max-w-sm text-right">
              A curated stack of technologies deployed for scale, performance, and aesthetic perfection.
            </p>
         </div>
      </div>

      <div className="relative w-full overflow-hidden py-12 flex flex-col gap-10">
          
          {/* Vignette Gradients for cinematic fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent z-20 pointer-events-none"></div>

          {/* Row 1 */}
          <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] items-center">
             {row1.map((skill, idx) => (
                <div key={`${skill}-${idx}-1`} className="mx-4 group relative flex items-center justify-center">
                    <div 
                      className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-[24px] bg-[#151516] border border-white/[0.08] flex flex-col items-center justify-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[#222] group-hover:scale-110 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative overflow-hidden shrink-0 backdrop-blur-md"
                    >
                        {/* Apple-style glossy sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <img 
                            src={getIconUrl(skill)} 
                            alt={skill}
                            // 'invert' forces the icon to be white (since simple-icons are usually colored or black)
                            // 'grayscale' removes any residual color
                            className="w-10 h-10 md:w-12 md:h-12 object-contain filter invert grayscale opacity-70 group-hover:opacity-100 transition-all duration-500 z-10"
                            loading="lazy"
                        />

                        {/* Label */}
                        <span className="absolute bottom-3 text-[10px] font-medium text-[var(--brand-400)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          {skill}
                        </span>
                    </div>
                </div>
             ))}
          </div>

          {/* Row 2 - Reversed */}
          <div className="flex whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused] items-center">
             {row2.map((skill, idx) => (
                <div key={`${skill}-${idx}-2`} className="mx-4 group relative flex items-center justify-center">
                     <div 
                      className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-[24px] bg-[#151516] border border-white/[0.08] flex flex-col items-center justify-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[#222] group-hover:scale-110 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)] relative overflow-hidden shrink-0 backdrop-blur-md"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <img 
                            src={getIconUrl(skill)} 
                            alt={skill}
                            className="w-10 h-10 md:w-12 md:h-12 object-contain filter invert grayscale opacity-70 group-hover:opacity-100 transition-all duration-500 z-10"
                            loading="lazy"
                        />

                        <span className="absolute bottom-3 text-[10px] font-medium text-[var(--brand-400)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          {skill}
                        </span>
                    </div>
                </div>
             ))}
          </div>

      </div>

    </section>
  );
};

export default Skills;