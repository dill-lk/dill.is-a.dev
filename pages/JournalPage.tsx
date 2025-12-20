import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../constants';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

const JournalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        <div className="mb-20">
            <Link to="/#" className="inline-flex items-center gap-2 text-brand-400 hover:text-white mb-8 transition-colors group">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm uppercase tracking-wider">Back to Home</span>
            </Link>
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-6">
                Journal
            </h1>
            <p className="text-brand-300 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                Thoughts on engineering, design, and building digital products.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-white/10 border border-white/10">
            {ARTICLES_DATA.map((article) => (
                <Link 
                    key={article.id} 
                    to={article.link} 
                    className="group relative bg-black p-10 md:p-16 hover:bg-[#0a0a0a] transition-colors flex flex-col md:flex-row gap-10 justify-between md:items-center"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-sm font-mono uppercase tracking-wider">
                            <span className="text-brand-500">{article.year}</span>
                            <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
                            <span className="text-brand-400">{article.category}</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-light text-white group-hover:text-brand-200 transition-colors leading-tight max-w-3xl">
                            {article.title}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4 text-brand-400 group-hover:text-white transition-colors self-start md:self-center">
                        <span className="text-sm font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0 transform">Read Article</span>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      
      </div>
    </div>
  );
};

export default JournalPage;