import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { generateProjectSummary } from '../../../services/geminiService';
import ContentEditor from './ContentEditor';

const ProjectsTab = ({ data, onChange, apiKey }: any) => {
    const [generatingFor, setGeneratingFor] = useState<string | null>(null);

    const handleMagicSummary = async (project: any) => {
        if (!apiKey) {
            alert('Please set your API key in Settings first!');
            return;
        }

        setGeneratingFor(project.id);
        const summary = await generateProjectSummary({
            title: project.title,
            tags: project.tags || [],
            currentSubtitle: project.subtitle
        }, apiKey);

        const updated = data.map((p: any) =>
            p.id === project.id ? { ...p, subtitle: summary } : p
        );
        onChange(updated);
        setGeneratingFor(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Projects</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.map((item: any, index: number) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-4 group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                <input
                                    value={item.title}
                                    onChange={(e) => {
                                        const updated = data.map((p: any) =>
                                            p.id === item.id ? { ...p, title: e.target.value } : p
                                        );
                                        onChange(updated);
                                    }}
                                    className="w-full bg-transparent text-white font-bold text-lg outline-none placeholder-white/30"
                                    placeholder="Project Title"
                                />

                                <div className="flex items-center gap-2">
                                    <input
                                        value={item.subtitle}
                                        onChange={(e) => {
                                            const updated = data.map((p: any) =>
                                                p.id === item.id ? { ...p, subtitle: e.target.value } : p
                                            );
                                            onChange(updated);
                                        }}
                                        className="flex-1 bg-transparent text-white/60 text-sm outline-none placeholder-white/20"
                                        placeholder="Subtitle"
                                    />
                                    <button
                                        onClick={() => handleMagicSummary(item)}
                                        disabled={generatingFor === item.id}
                                        className="px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                                    >
                                        {generatingFor === item.id ? (
                                            <LucideIcons.Loader2 size={12} className="animate-spin" />
                                        ) : (
                                            <LucideIcons.Wand2 size={12} />
                                        )}
                                        Magic
                                    </button>
                                </div>

                                <input
                                    value={item.tags?.join(', ')}
                                    onChange={(e) => {
                                        const updated = data.map((p: any) =>
                                            p.id === item.id ? { ...p, tags: e.target.value.split(', ') } : p
                                        );
                                        onChange(updated);
                                    }}
                                    className="w-full bg-black/20 rounded-lg p-2 text-xs text-blue-300 outline-none placeholder-white/20"
                                    placeholder="Tags (comma separated)"
                                />
                            </div>
                            <button
                                onClick={() => onChange(data.filter((p: any) => p.id !== item.id))}
                                className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            >
                                <LucideIcons.Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    const newProject = {
                        id: Date.now().toString(),
                        title: 'New Project',
                        subtitle: '',
                        url: '#',
                        iconKey: 'Folder',
                        tags: []
                    };
                    onChange([newProject, ...data]);
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
            >
                <LucideIcons.Plus size={14} />
                Add Project
            </button>
        </div>
    );
};

export default ProjectsTab;
