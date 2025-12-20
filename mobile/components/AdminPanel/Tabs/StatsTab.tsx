import React from 'react';
import * as LucideIcons from 'lucide-react';

interface StatsTabProps {
    data: any[];
    onChange: (newData: any[]) => void;
}

const StatsTab: React.FC<StatsTabProps> = ({ data, onChange }) => {
    const addStat = () => {
        const newItem = {
            id: Date.now().toString(),
            label: 'Projects',
            value: '50+'
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
                    <h3 className="text-white font-bold text-lg">Stats & Metrics</h3>
                    <p className="text-white/40 text-xs">Showcase your achievements</p>
                </div>
                <button
                    onClick={addStat}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                    <LucideIcons.Plus size={14} />
                    Add Stat
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((item) => (
                    <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3 group relative">
                        <button
                            onClick={() => deleteItem(item.id)}
                            className="absolute top-3 right-3 p-1.5 bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white rounded-lg"
                        >
                            <LucideIcons.X size={12} />
                        </button>

                        <input
                            value={item.value}
                            onChange={(e) => updateItem(item.id, 'value', e.target.value)}
                            className="w-full bg-transparent text-3xl font-bold text-white outline-none text-center"
                            placeholder="100+"
                        />
                        <input
                            value={item.label}
                            onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                            className="w-full bg-white/5 rounded-lg p-2 text-xs text-white/70 text-center outline-none"
                            placeholder="Label"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsTab;
