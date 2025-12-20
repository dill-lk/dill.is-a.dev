import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

const ContentEditor = ({ data, onChange, type }: { data: any[], onChange: (d: any[]) => void, type: 'project' | 'post' | 'experience' | 'skill' }) => {

    const addItem = () => {
        const newItem = type === 'project' ? { id: Date.now().toString(), title: 'New Project', tags: [] }
            : type === 'post' ? { id: Date.now().toString(), title: 'New Post', date: 'Oct 26' }
                : type === 'experience' ? { id: Date.now().toString(), role: 'Role', company: 'Company' }
                    : { id: Date.now().toString(), name: 'New Skill', level: 50 };

        onChange([newItem, ...data]);
    };

    const deleteItem = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    const updateItem = (id: string, field: string, value: any) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold capitalize">{type}s Manager</h3>
                <button onClick={addItem} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2">
                    <LucideIcons.Plus size={14} />
                    Add {type}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.map((item, index) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-4 group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                                {type === 'project' && (
                                    <>
                                        <input value={item.title} onChange={(e) => updateItem(item.id, 'title', e.target.value)} className="w-full bg-transparent text-white font-bold text-lg outline-none placeholder-white/30" placeholder="Project Title" />
                                        <input value={item.subtitle} onChange={(e) => updateItem(item.id, 'subtitle', e.target.value)} className="w-full bg-transparent text-white/60 text-sm outline-none placeholder-white/20" placeholder="Subtitle" />
                                        <input value={item.tags?.join(', ')} onChange={(e) => updateItem(item.id, 'tags', e.target.value.split(', '))} className="w-full bg-black/20 rounded-lg p-2 text-xs text-blue-300 outline-none placeholder-white/20" placeholder="Tags (comma separated)" />
                                    </>
                                )}
                                {type === 'post' && (
                                    <>
                                        <input value={item.title} onChange={(e) => updateItem(item.id, 'title', e.target.value)} className="w-full bg-transparent text-white font-bold text-lg outline-none placeholder-white/30" placeholder="Post Title" />
                                        <div className="flex gap-2">
                                            <input value={item.date} onChange={(e) => updateItem(item.id, 'date', e.target.value)} className="w-24 bg-transparent text-white/50 text-xs outline-none placeholder-white/20" placeholder="Date" />
                                            <input value={item.readTime} onChange={(e) => updateItem(item.id, 'readTime', e.target.value)} className="w-24 bg-transparent text-white/50 text-xs outline-none placeholder-white/20" placeholder="Read Time" />
                                        </div>
                                    </>
                                )}
                                {type === 'experience' && (
                                    <>
                                        <input value={item.role} onChange={(e) => updateItem(item.id, 'role', e.target.value)} className="w-full bg-transparent text-white font-bold text-lg outline-none placeholder-white/30" placeholder="Role" />
                                        <input value={item.company} onChange={(e) => updateItem(item.id, 'company', e.target.value)} className="w-full bg-transparent text-white/60 text-sm outline-none placeholder-white/20" placeholder="Company" />
                                        <textarea value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className="w-full h-20 bg-black/20 rounded-lg p-2 text-xs text-white/70 outline-none resize-none" placeholder="Description" />
                                    </>
                                )}
                                {type === 'skill' && (
                                    <div className="flex items-center gap-4 w-full">
                                        <input value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} className="flex-1 bg-transparent text-white font-bold outline-none" placeholder="Skill Name" />
                                        <input type="number" value={item.level} onChange={(e) => updateItem(item.id, 'level', parseInt(e.target.value))} className="w-16 bg-black/20 rounded p-2 text-xs text-white text-center outline-none" />
                                        <div className="text-xs text-white/40">%</div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => deleteItem(item.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                <LucideIcons.Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentEditor;
