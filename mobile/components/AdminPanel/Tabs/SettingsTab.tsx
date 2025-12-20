import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

interface SettingsTabProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ apiKey, setApiKey }) => {
    const [showKey, setShowKey] = useState(false);
    const [tempKey, setTempKey] = useState(apiKey);

    const handleSave = () => {
        setApiKey(tempKey);
        localStorage.setItem('gemini_api_key', tempKey);
        alert('API Key saved successfully!');
    };

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h3 className="text-white font-bold text-2xl mb-2">Settings</h3>
                <p className="text-white/40 text-sm">Configure your portfolio and AI features</p>
            </div>

            {/* API Key Section */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <LucideIcons.Key size={20} className="text-blue-400" />
                    <h4 className="text-white font-bold text-lg">Gemini API Key</h4>
                </div>

                <p className="text-white/60 text-sm">
                    Required for AI features like Blog Generator, Project Summaries, Icon Suggestions, and SVG Studio.
                </p>

                <div className="space-y-3">
                    <div className="relative">
                        <input
                            type={showKey ? 'text' : 'password'}
                            value={tempKey}
                            onChange={(e) => setTempKey(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 pr-12 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors font-mono"
                            placeholder="AIzaSyC..."
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                        >
                            {showKey ? <LucideIcons.EyeOff size={16} /> : <LucideIcons.Eye size={16} />}
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <LucideIcons.Save size={16} />
                            Save API Key
                        </button>
                        <a
                            href="https://aistudio.google.com/app/apikey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/10"
                        >
                            <LucideIcons.ExternalLink size={16} />
                            Get API Key
                        </a>
                    </div>
                </div>

                {apiKey && (
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <LucideIcons.CheckCircle2 size={16} className="text-green-400" />
                        <span className="text-sm text-green-300 font-medium">API Key is configured</span>
                    </div>
                )}
            </div>

            {/* System Info */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <LucideIcons.Info size={20} className="text-purple-400" />
                    <h4 className="text-white font-bold text-lg">System Information</h4>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 rounded-xl p-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Version</div>
                        <div className="text-white font-bold">Titanium OS v7.0</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Environment</div>
                        <div className="text-white font-bold">{import.meta.env.DEV ? 'Development' : 'Production'}</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Auto-Save</div>
                        <div className="text-white font-bold">{import.meta.env.DEV ? 'Enabled' : 'Disabled'}</div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">AI Status</div>
                        <div className={`font-bold ${apiKey ? 'text-green-400' : 'text-red-400'}`}>
                            {apiKey ? 'Active' : 'Not Configured'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <LucideIcons.AlertTriangle size={20} className="text-red-400" />
                    <h4 className="text-white font-bold text-lg">Danger Zone</h4>
                </div>

                <button
                    onClick={() => {
                        if (confirm('This will reset all your changes and reload the page. Continue?')) {
                            localStorage.clear();
                            window.location.reload();
                        }
                    }}
                    className="w-full bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white text-sm font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-500/30"
                >
                    <LucideIcons.Trash2 size={16} />
                    Factory Reset
                </button>
            </div>
        </div>
    );
};

export default SettingsTab;
