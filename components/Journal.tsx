import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const articles = [
    {
        year: "2024",
        title: "The Death of the Loading Spinner: Optimistic UI Patterns",
        category: "Engineering",
        link: "#"
    },
    {
        year: "2024",
        title: "Architecting for Scale: Lessons from a 100k User Migration",
        category: "System Design",
        link: "#"
    },
    {
        year: "2023",
        title: "Why Tailwind CSS Won the War",
        category: "Opinion",
        link: "#"
    },
    {
        year: "2023",
        title: "Bridging the Gap: Design Systems in React",
        category: "Frontend",
        link: "#"
    }
];

const Journal: React.FC = () => {
    return (
        <section className="py-40 bg-black border-t border-white/5">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal-on-scroll">
                    <div>
                        <h2 className="text-xs font-mono text-brand-400 mb-6 uppercase tracking-wider">04.5 / Journal</h2>
                        <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
                            Insights & <span className="font-serif italic text-brand-500">Writing</span>
                        </h3>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-brand-400 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest pb-2 border-b border-transparent hover:border-white">
                        Read all articles <ArrowUpRight size={14} />
                    </a>
                </div>

                <div className="flex flex-col">
                    {articles.map((article, idx) => (
                        <a 
                            key={idx} 
                            href={article.link} 
                            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-10 border-t border-white/10 hover:bg-white/[0.02] transition-colors px-4 reveal-on-scroll"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                                <span className="font-mono text-brand-500 text-xs">{article.year}</span>
                                <h4 className="text-xl md:text-3xl font-light text-white group-hover:text-brand-200 transition-colors group-hover:pl-4 duration-500">
                                    {article.title}
                                </h4>
                            </div>
                            
                            <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-8">
                                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] text-brand-400 uppercase tracking-wider bg-white/[0.02]">
                                    {article.category}
                                </span>
                                <ArrowUpRight size={20} className="text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 -translate-x-2 group-hover:translate-x-0 transition-all duration-500" />
                            </div>
                        </a>
                    ))}
                    <div className="h-[1px] w-full bg-white/10"></div>
                </div>
            </div>
        </section>
    );
};

export default Journal;
