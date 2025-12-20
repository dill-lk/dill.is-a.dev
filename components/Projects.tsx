import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Folder } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-40 bg-black relative border-t border-white/5 overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Header - Apple Style */}
        <div className="mb-24 flex flex-col items-center text-center reveal-on-scroll">
             <div className="flex items-center gap-2 mb-6">
                <Folder size={16} className="text-brand-400" />
                <span className="text-xs font-mono text-brand-400 uppercase tracking-widest">Selected Works</span>
             </div>
             <h3 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6">
               Pro-Grade <span className="font-serif italic text-brand-500">Execution.</span>
             </h3>
             <p className="text-brand-300 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                A gallery of technical challenges solved with architectural precision and <span className="text-white">aesthetic obsessiveness</span>.
             </p>
        </div>

        {/* Apple Store Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {PROJECTS_DATA.map((project, idx) => (
            <Link 
              to={`/project/${project.id}`}
              key={project.id} 
              className={`group relative block bg-[#1c1c1e] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] reveal-on-scroll delay-${(idx % 2) * 200}`}
            >
              {/* Card Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none z-10 mix-blend-overlay"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent z-20 pointer-events-none"></div>

              {/* Image 'Screen' */}
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                
                {/* Overlay Tags - Top Left */}
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-[10px] font-semibold bg-black/60 backdrop-blur-xl text-white rounded-full uppercase tracking-wider border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>

              {/* Content 'Chin' */}
              <div className="p-8 md:p-10 relative z-20">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight group-hover:text-brand-200 transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                              title="View Source on GitHub"
                            >
                                <Github size={18} />
                            </a>
                        )}
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-brand-200 transition-colors">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>
                 </div>
                 
                 <p className="text-brand-400 font-medium text-base leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {project.description}
                 </p>

                 <div className="flex items-center text-blue-400 font-medium text-sm group/link">
                    <span className="group-hover/link:underline decoration-2 underline-offset-4">View Case Study</span>
                    <ArrowUpRight size={14} className="ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                 </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-32 flex flex-col items-center reveal-on-scroll">
            <p className="text-brand-500 font-mono text-xs uppercase tracking-widest mb-6">Explore the full archive</p>
            <a href="https://github.com/dill-lk" className="px-10 py-4 rounded-full bg-[#1c1c1e] border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all duration-500 shadow-lg hover:shadow-white/10">
                View GitHub Profile
            </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;