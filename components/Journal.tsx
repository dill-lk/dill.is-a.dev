import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../constants';

const Journal: React.FC = () => {
    return (
        <section className="py-40 bg-black border-t border-white/5" id="journal">
            <div className="container mx-auto px-6 max-w-[1400px]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal-on-scroll">
                    <div>
                        <h2 className="text-xs font-mono text-brand-400 mb-6 uppercase tracking-wider">04.5 / Journal</h2>
                        <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
                            Insights & <span className="font-serif italic text-brand-500">Writing</span>
                        </h3>
                    </div>
                    <Link to="/journal" className="hidden md:flex items-center gap-2 text-brand-400 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest pb-2 border-b border-transparent hover:border-white">
                        Read all articles <ArrowUpRight size={14} />
                    </Link>
                </div>

                <div className="flex flex-col">
                    {ARTICLES_DATA.map((article, idx) => (
                        <Link 
                            key={article.id} 
                            to={article.link} 
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
                        </Link>
                    ))}
                    <div className="h-[1px] w-full bg-white/10"></div>
                </div>
            </div>
        </section>
    );
};

export default Journal;
