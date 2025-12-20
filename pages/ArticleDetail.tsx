import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../constants';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article = ARTICLES_DATA.find((a) => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link to="/#" className="text-brand-400 hover:text-white flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Reading Progress Bar could go here */}
      
      <article className="max-w-3xl mx-auto px-6 pb-24">
        {/* Header */}
        <div className="mb-12">
           <Link to="/#journal" className="inline-flex items-center gap-2 text-brand-400 hover:text-white mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Journal</span>
           </Link>

           <div className="flex items-center gap-4 mb-6 text-sm font-mono text-brand-400 uppercase tracking-wider">
             <span>{article.category}</span>
             <span className="w-1 h-1 bg-brand-500 rounded-full"></span>
             <span className="flex items-center gap-2">
                <Calendar size={14} />
                {article.date}
             </span>
           </div>
           
           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 leading-[1.1]">
             {article.title}
           </h1>

           <div className="h-[1px] w-full bg-white/10"></div>
        </div>

        {/* Content */}
        <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-brand-300 prose-strong:text-white prose-code:text-brand-200 prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10"
            dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Footer of Article */}
        <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
           <p className="text-brand-400 text-sm">Thanks for reading.</p>
           <Link to="/#" className="text-brand-400 hover:text-white text-sm font-medium transition-colors">
             Return Home
           </Link>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;