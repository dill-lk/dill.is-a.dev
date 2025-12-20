import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { AppState } from '../../types';

import DashboardTab from './Tabs/DashboardTab';
import IdentityTab from './Tabs/IdentityTab';
import ExperienceTab from './Tabs/ExperienceTab';
import SkillsTab from './Tabs/SkillsTab';
import ProjectsTab from './Tabs/ProjectsTab';
import PostsTab from './Tabs/PostsTab';
import LinksTab from './Tabs/LinksTab';
import MediaTab from './Tabs/MediaTab';
import TestimonialsTab from './Tabs/TestimonialsTab';
import StatsTab from './Tabs/StatsTab';
import ActionsTab from './Tabs/ActionsTab';
import StackTab from './Tabs/StackTab';
import ButtonCustomizer from './Tabs/ButtonCustomizer';
import ThemeTab from './Tabs/ThemeTab';
import SettingsTab from './Tabs/SettingsTab';
import SVGStudioTab from './Tabs/SVGStudio';
import AIToolsTab from './Tabs/AITools';

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    state: AppState;
    setState: (newState: Partial<AppState>) => void;
    apiKey: string;
    setApiKey: (key: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, state, setState, apiKey, setApiKey }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSyncing, setIsSyncing] = useState(false);

    if (!isOpen) return null;

    const renderTab = () => {
        switch (activeTab) {
            case 'dashboard': return <DashboardTab data={state} />;
            case 'identity': return <IdentityTab data={state.profile} onChange={(p: any) => setState({ profile: p })} />;
            case 'experience': return <ExperienceTab data={state.experience} onChange={(e: any) => setState({ experience: e })} />;
            case 'skills': return <SkillsTab data={state.skills} onChange={(s: any) => setState({ skills: s })} />;
            case 'projects': return <ProjectsTab data={state.projects} onChange={(p: any) => setState({ projects: p })} apiKey={apiKey} />;
            case 'posts': return <PostsTab data={state.posts} onChange={(p: any) => setState({ posts: p })} apiKey={apiKey} />;
            case 'links': return <LinksTab data={state.links} onChange={(l: any) => setState({ links: l })} apiKey={apiKey} />;
            case 'media': return <MediaTab videos={state.videos} music={state.music} onUpdateVideos={(v: any) => setState({ videos: v })} onUpdateMusic={(m: any) => setState({ music: m })} />;
            case 'testimonials': return <TestimonialsTab data={state.testimonials} onChange={(t: any) => setState({ testimonials: t })} />;
            case 'stats': return <StatsTab data={state.stats} onChange={(s: any) => setState({ stats: s })} />;
            case 'actions': return <ActionsTab data={state.actions} onChange={(a: any) => setState({ actions: a })} />;
            case 'stack': return <StackTab data={state.stack} onChange={(s: any) => setState({ stack: s })} />;
            case 'buttons': return <ButtonCustomizer data={state.actions} onChange={(a: any) => setState({ actions: a })} apiKey={apiKey} />;
            case 'theme': return <ThemeTab theme={state.theme} design={state.design} onUpdateTheme={(t: any) => setState({ theme: t })} onUpdateDesign={(d: any) => setState({ design: d })} />;
            case 'settings': return <SettingsTab apiKey={apiKey} setApiKey={setApiKey} />;
            case 'svg_studio': return <SVGStudioTab />;
            case 'ai_tools': return <AIToolsTab apiKey={apiKey} />;
            default: return <div>Select a tab</div>;
        }
    };

    const tabs = [
        { id: 'dashboard', icon: 'LayoutDashboard', label: 'Dashboard', category: 'overview' },
        { id: 'identity', icon: 'User', label: 'Identity', category: 'profile' },
        { id: 'projects', icon: 'LayoutGrid', label: 'Projects', category: 'content' },
        { id: 'posts', icon: 'PenTool', label: 'Blog Posts', category: 'content' },
        { id: 'links', icon: 'Link', label: 'Links', category: 'content' },
        { id: 'media', icon: 'Film', label: 'Media', category: 'content' },
        { id: 'testimonials', icon: 'Quote', label: 'Testimonials', category: 'profile' },
        { id: 'stats', icon: 'BarChart3', label: 'Stats', category: 'profile' },
        { id: 'experience', icon: 'Briefcase', label: 'Experience', category: 'profile' },
        { id: 'skills', icon: 'Sparkles', label: 'Skills', category: 'profile' },
        { id: 'actions', icon: 'Zap', label: 'CTAs', category: 'design' },
        { id: 'stack', icon: 'Boxes', label: 'Tech Stack', category: 'design' },
        { id: 'buttons', icon: 'MousePointer', label: 'Buttons', category: 'design' },
        { id: 'theme', icon: 'Palette', label: 'Theme', category: 'design' },
        { id: 'ai_tools', icon: 'Bot', label: 'AI Hub', category: 'tools' },
        { id: 'svg_studio', icon: 'Shapes', label: 'SVG Studio', category: 'tools' },
        { id: 'settings', icon: 'Settings', label: 'Settings', category: 'system' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" onClick={onClose} />
            <div className="relative w-full max-w-[95vw] h-[90vh] bg-[#0F0F10]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-black/50 ring-1 ring-white/5">

                {/* Sidebar */}
                <div className="w-full md:w-72 border-r border-white/5 bg-black/20 flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
                                <LucideIcons.Command size={20} className="text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-white tracking-tight block text-sm">Titanium OS</span>
                                <span className="text-[10px] text-white/40 font-mono block">v7.0 AI Core</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto px-3 py-4">
                        <div className="space-y-1">
                            {tabs.map((tab) => {
                                const Icon = (LucideIcons as any)[tab.icon] || LucideIcons.HelpCircle;
                                const isActive = activeTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium group ${isActive
                                                ? 'bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-500/30'
                                                : 'text-white/50 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <Icon size={18} className={isActive ? 'text-blue-400' : 'text-current'} />
                                        <span className="flex-1 text-left">{tab.label}</span>
                                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Status */}
                    <div className="p-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-[11px] text-white/40 mb-3">
                            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                            <span>{isSyncing ? 'Syncing...' : 'All systems ready'}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-all border border-red-500/20 hover:border-red-500/40"
                        >
                            <LucideIcons.X size={16} />
                            Close Panel
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden bg-[#0A0A0A] relative flex flex-col">
                    {/* Header */}
                    <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.01]">
                        <div>
                            <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('_', ' ')}</h2>
                            <p className="text-[11px] text-white/30">Manage your {activeTab.replace('_', ' ')} content</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
                        >
                            <LucideIcons.X size={20} />
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {renderTab()}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminPanel;
