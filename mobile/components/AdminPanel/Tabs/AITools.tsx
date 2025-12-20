import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { refineBio, suggestSkills } from '../../../services/geminiService';

const AITools = ({ apiKey }: { apiKey: string }) => {
    const [bioInput, setBioInput] = useState("");
    const [refinedBio, setRefinedBio] = useState("");
    const [bioTone, setBioTone] = useState<'professional' | 'casual' | 'creative'>('professional');
    const [isRefining, setIsRefining] = useState(false);

    const [skillInput, setSkillInput] = useState(""); // Comma sep
    const [suggestedSkills, setSuggestedSkills] = useState<any[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleRefineBio = async () => {
        setIsRefining(true);
        const result = await refineBio(bioInput, bioTone, apiKey);
        setRefinedBio(result);
        setIsRefining(false);
    };

    const handleSuggestSkills = async () => {
        setIsSuggesting(true);
        // Split by comma and trim each skill
        const skillsArray = skillInput.split(',').map(s => s.trim()).filter(s => s !== "");
        const result = await suggestSkills(skillsArray, apiKey);
        // Map string array to object structure for rendering
        setSuggestedSkills(result.map(s => ({ name: s, category: 'Recommended' })));
        setIsSuggesting(false);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BIO REFINER */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <LucideIcons.Sparkles size={18} className="text-blue-400" />
                    Bio Refiner
                </h3>
                <div className="flex gap-2">
                    {['professional', 'casual', 'creative'].map(tone => (
                        <button
                            key={tone}
                            onClick={() => setBioTone(tone as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${bioTone === tone ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:text-white'}`}
                        >
                            {tone}
                        </button>
                    ))}
                </div>
                <textarea
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                    className="w-full h-32 bg-black/20 rounded-xl p-4 text-xs text-white placeholder-white/20 outline-none resize-none"
                    placeholder="Paste your current bio here..."
                />
                <button
                    onClick={handleRefineBio}
                    disabled={isRefining || !bioInput}
                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                    {isRefining ? 'Refining...' : 'Refine with AI'}
                </button>
                {refinedBio && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 relative group">
                        <p className="text-sm text-blue-200">{refinedBio}</p>
                        <button
                            onClick={() => navigator.clipboard.writeText(refinedBio)}
                            className="absolute top-2 right-2 p-1.5 bg-blue-500/20 rounded-lg text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500/40"
                        >
                            <LucideIcons.Copy size={12} />
                        </button>
                    </div>
                )}
            </div>

            {/* SKILL SUGGESTER */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <LucideIcons.BrainCircuit size={18} className="text-purple-400" />
                    Skill Gap Analysis
                </h3>
                <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="w-full bg-black/20 rounded-xl p-4 text-xs text-white placeholder-white/20 outline-none"
                    placeholder="Enter current skills (React, Node, etc)..."
                />
                <button
                    onClick={handleSuggestSkills}
                    disabled={isSuggesting || !skillInput}
                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50"
                >
                    {isSuggesting ? 'Analyzing...' : 'Suggest Next Steps'}
                </button>

                <div className="space-y-3">
                    {suggestedSkills.map((skill, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <div className="text-sm font-bold text-white">{skill.name}</div>
                                <div className="text-[10px] text-white/40">{skill.category}</div>
                            </div>
                            <div className="text-xs font-bold text-purple-400">Recommended</div>
                        </div>
                    ))}
                    {suggestedSkills.length === 0 && !isSuggesting && (
                        <div className="text-center text-white/20 text-xs py-8">No suggestions yet</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AITools;
