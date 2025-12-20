import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { generateSVG } from '../../../services/geminiService';

const SVGStudio = () => {
    const [previewPath, setPreviewPath] = useState("M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5");
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState("");
    const [activeMode, setActiveMode] = useState<'blue' | 'gold' | 'gray'>('blue');

    const handleGenerate = async () => {
        setIsGenerating(true);
        const path = await generateSVG(prompt);
        if (path) {
            setPreviewPath(path);
            setGeneratedCode(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="${path}" /></svg>`);
        }
        setIsGenerating(false);
    };

    const MODES = {
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-500', name: 'Verified Blue' },
        gold: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-500', name: 'Gold Tier' },
        gray: { bg: 'bg-gray-500/10', border: 'border-gray-500/20', icon: 'text-gray-500', name: 'Ghost Mode' },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <LucideIcons.Wand2 size={18} className="text-purple-400" />
                        AI Icon Generator
                    </h3>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 bg-black/20 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none resize-none"
                        placeholder="Describe the icon you want (e.g., 'A minimalist rocket ship taking off')"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {isGenerating ? <LucideIcons.Loader2 size={16} className="animate-spin" /> : 'Generate Icon'}
                    </button>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                        <LucideIcons.ShieldCheck size={18} className={MODES[activeMode].icon} />
                        Verification Mode
                    </h3>
                    <div className="flex gap-2">
                        {(Object.keys(MODES) as Array<keyof typeof MODES>).map(mode => (
                            <button
                                key={mode}
                                onClick={() => setActiveMode(mode)}
                                className={`flex-1 py-3 rounded-xl text-xs font-bold capitalize transition-all border ${activeMode === mode ? `${MODES[mode].bg} ${MODES[mode].border} ${MODES[mode].icon}` : 'bg-transparent border-white/10 text-white/40'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center relative pattern-grid-lg">
                <div className="absolute top-4 right-4 text-xs font-mono text-white/20">PREVIEW_WINDOW</div>

                <div className={`w-64 h-64 rounded-3xl ${MODES[activeMode].bg} border ${MODES[activeMode].border} flex items-center justify-center relative group`}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-32 h-32 transition-colors duration-500 ${MODES[activeMode].icon}`}
                    >
                        <path d={previewPath} />
                    </svg>

                    {/* Verification Badge Overlay */}
                    <div className="absolute top-4 right-4">
                        <LucideIcons.BadgeCheck className={`w-8 h-8 ${MODES[activeMode].icon}`} fill="currentColor" fillOpacity={0.2} />
                    </div>
                </div>

                <div className="mt-8 w-full">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2">Generated SVG Code</div>
                    <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-green-400 break-all border border-white/5 relative group">
                        {generatedCode || '<svg ... />'}
                        <button
                            onClick={() => navigator.clipboard.writeText(generatedCode)}
                            className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                        >
                            <LucideIcons.Copy size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SVGStudio;
