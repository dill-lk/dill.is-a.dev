import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface ButtonCustomizerProps {
    data: any[];
    onChange: (newData: any[]) => void;
    apiKey?: string;
}

const ButtonCustomizer: React.FC<ButtonCustomizerProps> = ({ data, onChange, apiKey }) => {
    const [showAIModal, setShowAIModal] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const [editingButton, setEditingButton] = useState<string | null>(null);

    const createButton = (buttonData?: any) => {
        const newButton = buttonData || {
            id: Date.now().toString(),
            label: 'Click Me',
            url: '#',
            icon: 'MousePointer',
            bgColor: '#3B82F6',
            textColor: '#FFFFFF',
            size: 'medium',
            rounded: 'xl',
            shadow: true,
            animation: 'none'
        };
        onChange([newButton, ...data]);
    };

    const updateButton = (id: string, field: string, value: any) => {
        onChange(data.map(btn => btn.id === id ? { ...btn, [field]: value } : btn));
    };

    const deleteButton = (id: string) => {
        onChange(data.filter(btn => btn.id !== id));
    };

    const handleAIGenerate = async () => {
        if (!prompt.trim() || !apiKey) {
            alert('Please set API key and enter a description');
            return;
        }

        setIsGenerating(true);
        try {
            // Simple AI-generated button based on description
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Create a button config for: "${prompt}". Return JSON: {"label":"text","icon":"LucideIconName","bgColor":"#hex","textColor":"#hex","size":"small|medium|large"}`
                        }]
                    }]
                })
            });

            const result = await response.json();
            let text = result.candidates[0].content.parts[0].text.trim();
            text = text.replace(/```json\n?/g, '').replace(/```\n?$/g, '').trim();

            const parsed = JSON.parse(text);
            createButton({
                id: Date.now().toString(),
                label: parsed.label || 'AI Button',
                url: '#',
                icon: parsed.icon || 'Sparkles',
                bgColor: parsed.bgColor || '#8B5CF6',
                textColor: parsed.textColor || '#FFFFFF',
                size: parsed.size || 'medium',
                rounded: 'xl',
                shadow: true,
                animation: 'hover-lift'
            });
            setShowAIModal(false);
            setPrompt('');
        } catch (error) {
            console.error('AI generation failed:', error);
            alert('Failed to generate button. Creating default instead.');
            createButton();
        } finally {
            setIsGenerating(false);
        }
    };

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'small': return 'px-3 py-1.5 text-xs';
            case 'large': return 'px-8 py-4 text-lg';
            default: return 'px-6 py-3 text-sm';
        }
    };

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-white font-bold text-lg">Button Customizer</h3>
                    <p className="text-white/40 text-xs">Create and customize buttons with AI or manually</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAIModal(true)}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <LucideIcons.Sparkles size={14} />
                        AI Generate
                    </button>
                    <button
                        onClick={() => createButton()}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                    >
                        <LucideIcons.Plus size={14} />
                        Manual Create
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((button) => {
                    const Icon = (LucideIcons as any)[button.icon] || LucideIcons.MousePointer;
                    const isEditing = editingButton === button.id;

                    return (
                        <div key={button.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                            {/* Preview */}
                            <div className="flex items-center justify-center p-6 bg-black/20 rounded-xl">
                                <button
                                    className={`${getSizeClasses(button.size)} font-bold rounded-${button.rounded} transition-all flex items-center gap-2 ${button.shadow ? 'shadow-lg' : ''} ${button.animation === 'hover-lift' ? 'hover:-translate-y-1' : ''}`}
                                    style={{
                                        backgroundColor: button.bgColor,
                                        color: button.textColor
                                    }}
                                >
                                    <Icon size={button.size === 'large' ? 20 : button.size === 'small' ? 14 : 16} />
                                    {button.label}
                                </button>
                            </div>

                            {/* Editor */}
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        value={button.label}
                                        onChange={(e) => updateButton(button.id, 'label', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-sm text-white outline-none"
                                        placeholder="Button Text"
                                    />
                                    <input
                                        value={button.icon}
                                        onChange={(e) => updateButton(button.id, 'icon', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-sm text-white outline-none"
                                        placeholder="Icon Name"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={button.bgColor}
                                            onChange={(e) => updateButton(button.id, 'bgColor', e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer"
                                        />
                                        <span className="text-xs text-white/60">Background</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={button.textColor}
                                            onChange={(e) => updateButton(button.id, 'textColor', e.target.value)}
                                            className="w-10 h-10 rounded cursor-pointer"
                                        />
                                        <span className="text-xs text-white/60">Text</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <select
                                        value={button.size}
                                        onChange={(e) => updateButton(button.id, 'size', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none"
                                    >
                                        <option value="small" className="bg-gray-900">Small</option>
                                        <option value="medium" className="bg-gray-900">Medium</option>
                                        <option value="large" className="bg-gray-900">Large</option>
                                    </select>
                                    <select
                                        value={button.rounded}
                                        onChange={(e) => updateButton(button.id, 'rounded', e.target.value)}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white outline-none"
                                    >
                                        <option value="none" className="bg-gray-900">Square</option>
                                        <option value="lg" className="bg-gray-900">Rounded</option>
                                        <option value="xl" className="bg-gray-900">More Round</option>
                                        <option value="full" className="bg-gray-900">Pill</option>
                                    </select>
                                    <button
                                        onClick={() => updateButton(button.id, 'shadow', !button.shadow)}
                                        className={`text-xs font-bold rounded-lg transition-colors ${button.shadow ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-white/40'}`}
                                    >
                                        Shadow
                                    </button>
                                </div>

                                <input
                                    value={button.url}
                                    onChange={(e) => updateButton(button.id, 'url', e.target.value)}
                                    className="w-full bg-white/5 rounded-lg p-2 text-xs text-white/70 outline-none"
                                    placeholder="Link URL"
                                />

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const code = `<button style="background:${button.bgColor};color:${button.textColor}" class="px-6 py-3 rounded-xl">${button.label}</button>`;
                                            navigator.clipboard.writeText(code);
                                            alert('HTML copied!');
                                        }}
                                        className="flex-1 bg-green-500/20 text-green-300 text-xs font-bold py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                                    >
                                        Copy HTML
                                    </button>
                                    <button
                                        onClick={() => deleteButton(button.id)}
                                        className="flex-1 bg-red-500/20 text-red-300 text-xs font-bold py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* AI Generate Modal */}
            {showAIModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80" onClick={() => setShowAIModal(false)} />
                    <div className="relative bg-[#0F0F10] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold flex items-center gap-2">
                                <LucideIcons.Sparkles size={18} className="text-purple-400" />
                                AI Button Generator
                            </h3>
                            <button onClick={() => setShowAIModal(false)} className="text-white/40 hover:text-white">
                                <LucideIcons.X size={18} />
                            </button>
                        </div>
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-purple-500/50"
                            placeholder="Describe the button (e.g., 'Download now button in green')"
                            onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleAIGenerate()}
                            disabled={isGenerating}
                        />
                        <button
                            onClick={handleAIGenerate}
                            disabled={isGenerating || !prompt.trim()}
                            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <LucideIcons.Loader2 size={16} className="animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <LucideIcons.Sparkles size={16} />
                                    Generate Button
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonCustomizer;
