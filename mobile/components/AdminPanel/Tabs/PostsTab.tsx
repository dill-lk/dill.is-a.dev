import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { generateBlogPost } from '../../../services/geminiService';
import ContentEditor from './ContentEditor';

const PostsTab = ({ data, onChange, apiKey }: any) => {
    const [showAIModal, setShowAIModal] = useState(false);
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [wordCount, setWordCount] = useState(1500);
    const [tone, setTone] = useState('professional');
    const [style, setStyle] = useState('informative');

    const handleGenerate = async () => {
        if (!topic.trim()) return;

        if (!apiKey) {
            alert('Please set your API key in Settings first!');
            return;
        }

        setIsGenerating(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90));
        }, 300);

        const result = await generateBlogPost(topic, apiKey, {
            wordCount,
            tone,
            style
        });

        clearInterval(progressInterval);
        setProgress(100);

        if (typeof result === 'string') {
            alert(result);
        } else {
            const newPost = {
                id: Date.now().toString(),
                title: result.title,
                date: result.date,
                readTime: result.readTime,
                url: '#',
                content: result.content,
                contentSnippet: result.contentSnippet
            };
            onChange([newPost, ...data]);
            setShowAIModal(false);
            setTopic('');
        }
        setIsGenerating(false);
        setProgress(0);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Blog Posts</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAIModal(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <LucideIcons.Sparkles size={14} />
                        AI Writer
                    </button>
                </div>
            </div>

            <ContentEditor data={data} onChange={onChange} type="post" />

            {showAIModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80" onClick={() => setShowAIModal(false)} />
                    <div className="relative bg-[#0F0F10] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <LucideIcons.Sparkles size={18} className="text-purple-400" />
                                AI Blog Writer
                            </h3>
                            <button onClick={() => setShowAIModal(false)} className="text-white/40 hover:text-white">
                                <LucideIcons.X size={18} />
                            </button>
                        </div>

                        {/* Customization Options */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                                <label className="text-xs text-white/60 uppercase tracking-wider">Words</label>
                                <select
                                    value={wordCount}
                                    onChange={(e) => setWordCount(parseInt(e.target.value))}
                                    className="w-full bg-white/5 border border-white/5 rounded-lg p-2 text-sm text-white outline-none"
                                    disabled={isGenerating}
                                >
                                    <option value="800" className="bg-gray-900">Short (800)</option>
                                    <option value="1500" className="bg-gray-900">Medium (1500)</option>
                                    <option value="2500" className="bg-gray-900">Long (2500)</option>
                                    <option value="4000" className="bg-gray-900">Epic (4000)</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-white/60 uppercase tracking-wider">Tone</label>
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-lg p-2 text-sm text-white outline-none"
                                    disabled={isGenerating}
                                >
                                    <option value="professional" className="bg-gray-900">Professional</option>
                                    <option value="casual" className="bg-gray-900">Casual</option>
                                    <option value="technical" className="bg-gray-900">Technical</option>
                                    <option value="creative" className="bg-gray-900">Creative</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-white/60 uppercase tracking-wider">Style</label>
                                <select
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-lg p-2 text-sm text-white outline-none"
                                    disabled={isGenerating}
                                >
                                    <option value="informative" className="bg-gray-900">Informative</option>
                                    <option value="tutorial" className="bg-gray-900">Tutorial</option>
                                    <option value="opinion" className="bg-gray-900">Opinion</option>
                                    <option value="story" className="bg-gray-900">Story</option>
                                </select>
                            </div>
                        </div>

                        <input
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50"
                            placeholder="Enter a topic (e.g., 'The Future of AI in Web Development')"
                            onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                            disabled={isGenerating}
                        />

                        {isGenerating && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-white/60">
                                    <span>Generating {wordCount} word {style} post...</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !topic.trim()}
                            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <LucideIcons.Loader2 size={16} className="animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <LucideIcons.Sparkles size={16} />
                                    Generate Post
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsTab;
