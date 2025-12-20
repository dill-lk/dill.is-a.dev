import React from 'react';
import * as LucideIcons from 'lucide-react';

interface ActionsTabProps {
    data: any[];
    onChange: (newData: any[]) => void;
}

const ActionsTab: React.FC<ActionsTabProps> = ({ data, onChange }) => {
    const addAction = () => {
        const newAction = {
            id: Date.now().toString(),
            label: 'Get in Touch',
            url: '#contact',
            style: 'primary',
            icon: 'Mail',
            color: 'blue',
            customClasses: ''
        };
        onChange([...data, newAction]);
    };

    const updateAction = (id: string, field: string, value: any) => {
        onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const deleteAction = (id: string) => {
        onChange(data.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg">Call-to-Action Buttons</h3>
                    <p className="text-white/40 text-xs">Hero buttons and primary CTAs</p>
                </div>
                <button
                    onClick={addAction}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                >
                    <LucideIcons.Plus size={14} aria-hidden="true" />
                    Add Action
                </button>
            </div>

            <div className="space-y-4">
                {data.map((action) => {
                    const Icon = (LucideIcons as any)[action.icon] || LucideIcons.ArrowRight;

                    return (
                        <div key={action.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            value={action.label}
                                            onChange={(e) => updateAction(action.id, 'label', e.target.value)}
                                            className="bg-white/5 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-blue-500/50 border border-white/5"
                                            placeholder="Button Label"
                                        />
                                        <input
                                            value={action.url}
                                            onChange={(e) => updateAction(action.id, 'url', e.target.value)}
                                            className="bg-white/5 rounded-xl p-3 text-sm text-white/70 outline-none focus:border-blue-500/50 border border-white/5"
                                            placeholder="URL/Link"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-3">
                                        <select
                                            aria-label="Button style"
                                            value={action.style}
                                            onChange={(e) => updateAction(action.id, 'style', e.target.value)}
                                            className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none border border-white/5"
                                        >
                                            <option value="primary" className="bg-gray-900">Primary</option>
                                            <option value="secondary" className="bg-gray-900">Secondary</option>
                                            <option value="ghost" className="bg-gray-900">Ghost</option>
                                            <option value="outline" className="bg-gray-900">Outline</option>
                                        </select>

                                        <input
                                            value={action.icon}
                                            onChange={(e) => updateAction(action.id, 'icon', e.target.value)}
                                            className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none border border-white/5"
                                            placeholder="Icon (e.g., Mail)"
                                        />

                                        <select
                                            aria-label="Button color"
                                            value={action.color}
                                            onChange={(e) => updateAction(action.id, 'color', e.target.value)}
                                            className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none border border-white/5"
                                        >
                                            <option value="blue" className="bg-gray-900">Blue</option>
                                            <option value="purple" className="bg-gray-900">Purple</option>
                                            <option value="green" className="bg-gray-900">Green</option>
                                            <option value="red" className="bg-gray-900">Red</option>
                                            <option value="orange" className="bg-gray-900">Orange</option>
                                        </select>
                                    </div>

                                    {/* Preview */}
                                    <div className="flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
                                        <span className="text-xs text-white/40">Preview:</span>
                                        <button className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors ${action.style === 'primary' ? `bg-${action.color}-600 text-white` :
                                                action.style === 'secondary' ? `bg-white/10 text-white` :
                                                    action.style === 'ghost' ? `text-white hover:bg-white/5` :
                                                        `border border-white/20 text-white`
                                            }`}>
                                            <Icon size={16} />
                                            {action.label}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deleteAction(action.id)}
                                    className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                    aria-label="Delete action"
                                    title="Delete action"
                                >
                                    <LucideIcons.Trash2 size={16} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ActionsTab;
