import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants';
import { ArrowLeft, Github, ExternalLink, Calendar, Code, Layers } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS_DATA.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link to="/#" className="text-brand-400 hover:text-white flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
           <Link to="/#projects" className="inline-flex items-center gap-2 text-brand-400 hover:text-white mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Portfolio</span>
           </Link>
           
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
             {project.title}
           </h1>
           
           <div className="flex flex-wrap gap-4 mb-10">
             {project.tags.map(tag => (
               <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-brand-200 font-mono">
                 {tag}
               </span>
             ))}
           </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="px-4 md:px-6 mb-20">
        <div className="container mx-auto max-w-6xl">
           <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
             <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
           </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl grid md:grid-cols-[2fr_1fr] gap-16">
           
           <div className="space-y-8">
             <div>
               <h3 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                 <Layers size={20} className="text-brand-400" />
                 Overview
               </h3>
               <p className="text-brand-300 text-lg leading-relaxed">
                 {project.description}
               </p>
             </div>

             <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-semibold mb-4 text-white">Key Features (Coming Soon)</h3>
                <ul className="space-y-3 text-brand-400">
                   <li className="flex items-start gap-2">
                     <span className="text-brand-500 mt-1">•</span>
                     <span>Advanced architecture implementation details to be added.</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-brand-500 mt-1">•</span>
                     <span>Performance optimization highlights.</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-brand-500 mt-1">•</span>
                     <span>User experience design choices.</span>
                   </li>
                </ul>
             </div>
           </div>

           <div className="space-y-10">
              
              {/* Links Card */}
              <div className="bg-[#1c1c1e] p-6 rounded-2xl border border-white/10">
                <h3 className="text-sm font-mono uppercase text-brand-400 tracking-widest mb-6">Project Links</h3>
                <div className="space-y-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                      <span className="flex items-center gap-3 font-medium">
                        <Github size={18} /> GitHub Repository
                      </span>
                      <ArrowUpRight size={16} className="text-brand-500 group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {/* We use project.link as internal link usually, but if it were an external link... 
                      For this case study, if there was a real external live demo URL, we'd use it. 
                      Currently project.link points to this page itself in constants.ts, so we won't show a "Live Demo" linking to itself. 
                      We will assume if there's another field for liveUrl we would use it. 
                      For now, GitHub is the main one. 
                  */}
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-6">
                 <div>
                    <h4 className="text-sm text-brand-500 mb-2 font-mono uppercase">Role</h4>
                    <p className="text-white font-medium">Lead Developer</p>
                 </div>
                 <div>
                    <h4 className="text-sm text-brand-500 mb-2 font-mono uppercase">Timeline</h4>
                    <div className="flex items-center gap-2 text-white font-medium">
                       <Calendar size={16} className="text-brand-400" />
                       <span>2024</span>
                    </div>
                 </div>
                 <div>
                    <h4 className="text-sm text-brand-500 mb-2 font-mono uppercase">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.map(tag => (
                         <span key={tag} className="text-sm text-brand-300 bg-brand-900/50 px-2 py-1 rounded border border-brand-800">
                           {tag}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </section>
      
      {/* Arrow Up Right Component was missing import */}
    </div>
  );
};

// Quick fix for the missing ArrowUpRight import in the code above
const ArrowUpRight = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export default ProjectDetail;