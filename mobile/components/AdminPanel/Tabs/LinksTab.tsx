import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { LinkItem } from '../../../types';
import { suggestIcon, generateTailwindClasses } from '../../../services/geminiService';

interface LinksTabProps {
    data: LinkItem[];
    onChange: (newData: LinkItem[]) => void;
    apiKey?: string;
}

const inputStyle = "w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors";
const labelStyle = "text-[10px] uppercase font-bold text-white/40 tracking-wider pl-1";

const LinksTab: React.FC<LinksTabProps> = ({ data, onChange, apiKey }) => {
    const [suggestingFor, setSuggestingFor] = useState<string | null>(null);
    const [generatingStyleFor, setGeneratingStyleFor] = useState<string | null>(null);

    const addLink = () => {
        const newLink: LinkItem = {
            id: Date.now().toString(),
            title: 'New Link',
            url: 'https://',
            iconKey: 'Link',
            verified: false,
            variant: 'glass',
            bgColor: '#1C1C1E',
            textColor: '#ffffff',
            size: 'md',
            roundness: 'rounded',
            shadow: false
        };
        onChange([newLink, ...data]);
    };

    const updateLink = (id: string, updates: Partial<LinkItem>) => {
        onChange(data.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    const deleteLink = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    const handleTitleChange = (id: string, title: string) => {
        updateLink(id, { title });

        // Auto-suggest icon after 1 second of no typing
        if (title.length > 2 && title !== 'New Link' && apiKey) {
            const timeoutId = setTimeout(async () => {
                try {
                    setSuggestingFor(id);
                    const suggestedIcon = await suggestIcon(title, apiKey);
                    if (suggestedIcon && suggestedIcon !== 'Link') {
                        updateLink(id, { iconKey: suggestedIcon });
                    }
                } catch (error) {
                    console.error('Icon suggestion failed:', error);
                } finally {
                    setSuggestingFor(null);
                }
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    };

    const generateAIStyle = async (id: string, title: string) => {
        if (!apiKey) {
            alert('Please set API key in Settings tab');
            return;
        }

        try {
            setGeneratingStyleFor(id);

            // Smart color mapping for popular platforms
            const colorMap: Record<string, { bg: string; text: string }> = {
                'youtube': { bg: '#FF0000', text: '#ffffff' },
                'twitter': { bg: '#1DA1F2', text: '#ffffff' },
                'x': { bg: '#000000', text: '#ffffff' },
                'tiktok': { bg: '#000000', text: '#ffffff' },
                'instagram': { bg: '#E4405F', text: '#ffffff' },
                'discord': { bg: '#5865F2', text: '#ffffff' },
                'github': { bg: '#181717', text: '#ffffff' },
                'linkedin': { bg: '#0A66C2', text: '#ffffff' },
                'facebook': { bg: '#1877F2', text: '#ffffff' },
                'spotify': { bg: '#1DB954', text: '#ffffff' },
                'twitch': { bg: '#9146FF', text: '#ffffff' },
            };

            const key = title.toLowerCase().replace(/\s+/g, '');
            const colors = colorMap[key] || { bg: '#3b82f6', text: '#ffffff' };

            updateLink(id, {
                bgColor: colors.bg,
                textColor: colors.text,
                shadow: true,
                roundness: 'rounded',
                size: 'md'
            });

        } catch (error) {
            console.error('AI style generation failed:', error);
        } finally {
            setGeneratingStyleFor(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-xl">Social & Footer Links</h3>
                    <p className="text-white/40 text-sm mt-1">Fully customizable buttons with live preview</p>
                </div>
                <button
                    onClick={addLink}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                >
                    <LucideIcons.Plus size={16} />
                    Add Link
                </button>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 gap-6">
                {data.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                        <LucideIcons.Link className="mx-auto text-white/20 mb-3" size={48} />
                        <p className="text-white/40">No links yet. Click "Add Link" to get started!</p>
                    </div>
                )}

                {data.map((link) => {
                    const Icon = (LucideIcons as any)[link.iconKey] || LucideIcons.Link;

                    // Generate button preview style
                    const buttonStyle: React.CSSProperties = {
                        backgroundColor: link.bgColor || '#1C1C1E',
                        color: link.textColor || '#ffffff',
                        borderColor: link.borderColor || (link.bgColor || '#1C1C1E'),
                        padding: link.size === 'sm' ? '10px 20px' : link.size === 'lg' ? '18px 36px' : '14px 28px',
                        borderRadius: link.roundness === 'square' ? '8px' : link.roundness === 'pill' ? '9999px' : '16px',
                        boxShadow: link.shadow ? `0 10px 30px -5px ${link.bgColor}60` : 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                    };

                    return (
                        <div key={link.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6 hover:border-white/10 transition-all">
                            {/* Title Section */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white shrink-0 border border-white/5">
                                        {suggestingFor === link.id ? (
                                            <LucideIcons.Loader2 size={28} className="animate-spin text-blue-400" />
                                        ) : (
                                            <Icon size={28} />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input
                                            value={link.title}
                                            onChange={(e) => handleTitleChange(link.id, e.target.value)}
                                            className="bg-transparent text-white font-bold text-xl outline-none w-full placeholder-white/20"
                                            placeholder="Link Title"
                                        />
                                        <input
                                            value={link.subtitle || ''}
                                            onChange={(e) => updateLink(link.id, { subtitle: e.target.value })}
                                            className="bg-transparent text-white/60 text-sm outline-none w-full placeholder-white/20"
                                            placeholder="Optional subtitle"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteLink(link.id)}
                                    className="p-2.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shrink-0"
                                >
                                    <LucideIcons.Trash2 size={18} />
                                </button>
                            </div>

                            {/* URL and Icon */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelStyle}>URL</label>
                                    <input
                                        value={link.url}
                                        onChange={(e) => updateLink(link.id, { url: e.target.value })}
                                        className={inputStyle}
                                        placeholder="https://example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelStyle}>Icon Name</label>
                                    <input
                                        value={link.iconKey}
                                        onChange={(e) => updateLink(link.id, { iconKey: e.target.value })}
                                        className={inputStyle}
                                        placeholder="e.g. Github, Youtube"
                                    />
                                </div>
                            </div>

                            {/* Button Customization */}
                            <div className="border-t border-white/5 pt-5">
                                <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-bold text-white/80">Button Styling</label>
                                    <button
                                        onClick={() => generateAIStyle(link.id, link.title)}
                                        disabled={generatingStyleFor === link.id}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium transition-all disabled:opacity-50 border border-purple-500/20"
                                    >
                                        {generatingStyleFor === link.id ? (
                                            <><LucideIcons.Loader2 size={16} className="animate-spin" /> Generating...</>
                                        ) : (
                                            <><LucideIcons.Wand2 size={16} /> AI Style</>
                                        )}
                                    </button>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    {/* Background Color */}
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Background</label>
                                        <input
                                            type="color"
                                            value={link.bgColor || '#1C1C1E'}
                                            onChange={(e) => updateLink(link.id, { bgColor: e.target.value })}
                                            className="w-full h-11 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                                        />
                                    </div>

                                    {/* Text Color */}
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Text</label>
                                        <input
                                            type="color"
                                            value={link.textColor || '#ffffff'}
                                            onChange={(e) => updateLink(link.id, { textColor: e.target.value })}
                                            className="w-full h-11 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                                        />
                                    </div>

                                    {/* Size */}
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Size</label>
                                        <select
                                            value={link.size || 'md'}
                                            onChange={(e) => updateLink(link.id, { size: e.target.value as any })}
                                            className={inputStyle}
                                        >
                                            <option value="sm" className="bg-gray-900">Small</option>
                                            <option value="md" className="bg-gray-900">Medium</option>
                                            <option value="lg" className="bg-gray-900">Large</option>
                                        </select>
                                    </div>

                                    {/* Roundness */}
                                    <div className="space-y-2">
                                        <label className={labelStyle}>Roundness</label>
                                        <select
                                            value={link.roundness || 'rounded'}
                                            onChange={(e) => updateLink(link.id, { roundness: e.target.value as any })}
                                            className={inputStyle}
                                        >
                                            <option value="square" className="bg-gray-900">Square</option>
                                            <option value="rounded" className="bg-gray-900">Rounded</option>
                                            <option value="pill" className="bg-gray-900">Pill</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    {/* Shadow Toggle */}
                                    <button
                                        onClick={() => updateLink(link.id, { shadow: !link.shadow })}
                                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${link.shadow
                                                ? 'bg-blue-500/30 text-blue-300 border-2 border-blue-500/50'
                                                : 'bg-white/5 text-white/40 border-2 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <LucideIcons.Sparkles size={16} />
                                        Shadow {link.shadow ? 'ON' : 'OFF'}
                                    </button>

                                    {/* Verified Toggle */}
                                    <button
                                        onClick={() => updateLink(link.id, { verified: !link.verified })}
                                        className={`px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${link.verified
                                                ? 'bg-blue-500/30 text-blue-300 border-2 border-blue-500/50'
                                                : 'bg-white/5 text-white/40 border-2 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <LucideIcons.BadgeCheck size={16} />
                                        Verified {link.verified ? 'YES' : 'NO'}
                                    </button>
                                </div>
                            </div>

                            {/* Live Preview */}
                            <div className="border-t border-white/5 pt-5">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 block">Live Preview</label>
                                <div className="flex items-center justify-center p-8 bg-gradient-to-br from-black/40 to-black/20 rounded-2xl">
                                    <button
                                        style={buttonStyle}
                                        className="font-bold flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Icon size={20} />
                                        {link.title}
                                        {link.verified && <LucideIcons.BadgeCheck size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LinksTab;
