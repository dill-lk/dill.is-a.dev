import React from 'react';
import * as LucideIcons from 'lucide-react';

interface StackTabProps {
    data: any[];
    onChange: (newData: any[]) => void;
}

const StackTab: React.FC<StackTabProps> = ({ data, onChange }) => {
    const addItem = () => {
        const newItem = {
            id: Date.now().toString(),
            name: 'React',
            iconKey: 'Code'
        };
        onChange([...data, newItem]);
    };

    const updateItem = (id: string, field: string, value: any) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const deleteItem = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg">Tech Stack</h3>
                    <p className="text-white/40 text-xs">Technologies and tools you use</p>
                </div>
                <button
                    onClick={addItem}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                    <LucideIcons.Plus size={14} />
                    Add Technology
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.map((item) => {
                    const Icon = (LucideIcons as any)[item.iconKey] || LucideIcons.Code;

                    return (
                        <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3 group relative">
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="absolute top-2 right-2 p-1 bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white rounded"
                            >
                                <LucideIcons.X size={12} />
                            </button>

                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                    <Icon size={24} className="text-blue-400" />
                                </div>
                            </div>

                            <input
                                value={item.name}
                                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                className="w-full bg-transparent text-white text-sm font-bold text-center outline-none"
                                placeholder="Tech Name"
                            />

                            <input
                                value={item.iconKey}
                                onChange={(e) => updateItem(item.id, 'iconKey', e.target.value)}
                                className="w-full bg-white/5 rounded p-1.5 text-[10px] text-white/70 text-center outline-none"
                                placeholder="Icon"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StackTab;
