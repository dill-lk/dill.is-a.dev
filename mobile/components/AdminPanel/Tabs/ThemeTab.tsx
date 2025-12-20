import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface ThemeTabProps {
    theme: { accentColor: string; backgroundStyle: string };
    design: { radius: string; blur: string; border: string; cardStyle: string };
    onUpdateTheme: (t: any) => void;
    onUpdateDesign: (d: any) => void;
}

const ThemeTab: React.FC<ThemeTabProps> = ({ theme, design, onUpdateTheme, onUpdateDesign }) => {
    const [exportSuccess, setExportSuccess] = useState(false);

    const handleExport = () => {
        const data = { theme, design };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-theme-${Date.now()}.json`;
        a.click();
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 2000);
    };

    const colorPresets = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Purple', value: '#A855F7' },
        { name: 'Green', value: '#10B981' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Cyan', value: '#06B6D4' },
    ];

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h3 className="text-white font-bold text-2xl mb-2">Theme & Design</h3>
                <p className="text-white/40 text-sm">Customize your portfolio's visual identity</p>
            </div>

            {/* Accent Color */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <LucideIcons.Palette size={20} className="text-purple-400" />
                    <h4 className="text-white font-bold text-lg">Accent Color</h4>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => onUpdateTheme({ ...theme, accentColor: e.target.value })}
                        className="w-16 h-16 rounded-xl cursor-pointer border-2 border-white/20"
                    />
                    <input
                        type="text"
                        value={theme.accentColor}
                        onChange={(e) => onUpdateTheme({ ...theme, accentColor: e.target.value })}
                        className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white font-mono outline-none"
                        placeholder="#3B82F6"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {colorPresets.map((preset) => (
                        <button
                            key={preset.name}
                            onClick={() => onUpdateTheme({ ...theme, accentColor: preset.value })}
                            className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:scale-105"
                            style={{ backgroundColor: preset.value }}
                        >
                            {preset.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Design Tokens */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                    <LucideIcons.Layers size={20} className="text-blue-400" />
                    <h4 className="text-white font-bold text-lg">Design Tokens</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-wider">Border Radius</label>
                        <select
                            value={design.radius}
                            onChange={(e) => onUpdateDesign({ ...design, radius: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
                        >
                            <option value="sm" className="bg-gray-900">Small (8px)</option>
                            <option value="md" className="bg-gray-900">Medium (12px)</option>
                            <option value="lg" className="bg-gray-900">Large (16px)</option>
                            <option value="xl" className="bg-gray-900">Extra Large (24px)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-wider">Blur Intensity</label>
                        <select
                            value={design.blur}
                            onChange={(e) => onUpdateDesign({ ...design, blur: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
                        >
                            <option value="none" className="bg-gray-900">None</option>
                            <option value="sm" className="bg-gray-900">Small</option>
                            <option value="md" className="bg-gray-900">Medium</option>
                            <option value="lg" className="bg-gray-900">Large</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-wider">Card Style</label>
                        <select
                            value={design.cardStyle}
                            onChange={(e) => onUpdateDesign({ ...design, cardStyle: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
                        >
                            <option value="flat" className="bg-gray-900">Flat</option>
                            <option value="elevated" className="bg-gray-900">Elevated</option>
                            <option value="glass" className="bg-gray-900">Glassmorphism</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/60 uppercase tracking-wider">Background</label>
                        <select
                            value={theme.backgroundStyle}
                            onChange={(e) => onUpdateTheme({ ...theme, backgroundStyle: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white outline-none"
                        >
                            <option value="solid" className="bg-gray-900">Solid</option>
                            <option value="gradient" className="bg-gray-900">Gradient</option>
                            <option value="mesh" className="bg-gray-900">Mesh</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Export Theme */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-white font-bold mb-1">Export Theme</h4>
                        <p className="text-white/60 text-xs">Save your theme configuration</p>
                    </div>
                    <button
                        onClick={handleExport}
                        className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
                    >
                        {exportSuccess ? <LucideIcons.Check size={16} /> : <LucideIcons.Download size={16} />}
                        {exportSuccess ? 'Exported!' : 'Export'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeTab;
