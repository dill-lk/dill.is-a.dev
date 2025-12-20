
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Post {
  id: string;
  title: string;
  date: string;
  readTime: string;
  url: string; // Not used directly, but part of post object
  content: string;
}

interface PostPageProps {
  posts: Post[];
  currentTheme: { primary: string; badge: string; glow: string; };
}

const PostPage: React.FC<PostPageProps> = ({ posts, currentTheme }) => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    // Find the post from the provided posts array
    const foundPost = posts.find(p => p.id === postId);
    setPost(foundPost);
  }, [postId, posts]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/70">The requested blog post could not be found.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-colors">
            <LucideIcons.ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-5 sm:px-6 relative selection:bg-white/30 overflow-x-hidden font-sans text-[#F5F5F7] transition-colors duration-700">
      <main className="w-full max-w-[700px] relative z-10 flex flex-col gap-6 pb-20 mt-12 sm:mt-20">
        <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors self-start mb-6">
          <LucideIcons.ArrowLeft size={18} /> Back to Portfolio
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight drop-shadow-sm text-white mb-4">{post.title}</h1>

        <div className="flex items-center gap-2 text-[11px] text-[#86868B] font-medium mb-8">
          <span>{post.date}</span>
          <span className="w-0.5 h-0.5 bg-[#86868B] rounded-full" />
          <span>{post.readTime}</span>
        </div>

        <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-4
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-400
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:mb-6 prose-p:leading-8
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-pink-400 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#1C1C1E] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
          prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-white/80
          prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-white/80
          prose-li:mb-2 prose-li:pl-1
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/60
          prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:my-8
          prose-hr:border-white/10 prose-hr:my-12
        "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} {post.title}
        </div>
      </main>
    </div>
  );
};

export default PostPage;
