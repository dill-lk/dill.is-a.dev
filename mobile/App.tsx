
import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { getGeminiResponse, generateTailwindClasses, generateProjectSummary, generateBlogPost } from './services/geminiService';
import { isEditorAuthenticated, clearAuth } from './services/authService';
import {
   INITIAL_PROFILE, INITIAL_LINKS, INITIAL_PROJECTS, INITIAL_VIDEOS, INITIAL_POSTS, INITIAL_THEME, INITIAL_MUSIC, INITIAL_STACK, INITIAL_ACTIONS, INITIAL_DESIGN, INITIAL_EXPERIENCE, INITIAL_STATS, INITIAL_SKILLS, INITIAL_TESTIMONIALS, INITIAL_SYSTEM_HEALTH, APP_VERSION
} from './constants';
import CommandPalette from './components/CommandPalette';
import PostPage from './components/PostPage';
import { Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- DYNAMIC ICON COMPONENT ---
const DynamicIcon = ({ name, size = 20, className = "", strokeWidth }: { name: string, size?: number, className?: string, strokeWidth?: number }) => {
   const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
   return <IconComponent size={size} className={className} strokeWidth={strokeWidth} />;
};

// --- THEME CONFIGURATION ---
const THEMES: Record<string, { primary: string, badge: string, glow: string }> = {
   blue: { primary: 'bg-blue-600', badge: 'text-blue-400', glow: 'shadow-blue-500/50' },
   purple: { primary: 'bg-purple-600', badge: 'text-purple-400', glow: 'shadow-purple-500/50' },
   green: { primary: 'bg-emerald-600', badge: 'text-emerald-400', glow: 'shadow-emerald-500/50' },
   orange: { primary: 'bg-orange-600', badge: 'text-orange-400', glow: 'shadow-orange-500/50' },
   red: { primary: 'bg-red-600', badge: 'text-red-400', glow: 'shadow-red-500/50' },
   pink: { primary: 'bg-pink-600', badge: 'text-pink-400', glow: 'shadow-pink-500/50' },
};

// --- SMART ICON DETECTION ---
const getSmartIcon = (title: string): string | null => {
   const t = title.toLowerCase();
   if (t.includes('youtube')) return 'Youtube';
   if (t.includes('twitter') || t === 'x') return 'Twitter';
   if (t.includes('github') || t.includes('git')) return 'Github';
   if (t.includes('linkedin')) return 'Linkedin';
   if (t.includes('instagram') || t.includes('ig')) return 'Instagram';
   if (t.includes('facebook') || t.includes('fb')) return 'Facebook';
   if (t.includes('twitch')) return 'Twitch';
   if (t.includes('discord')) return 'Gamepad2';
   if (t.includes('mail') || t.includes('email') || t.includes('contact')) return 'Mail';
   if (t.includes('whatsapp')) return 'MessageCircle';
   if (t.includes('phone') || t.includes('call')) return 'Phone';
   if (t.includes('spotify') || t.includes('music')) return 'Music';
   if (t.includes('web') || t.includes('site') || t.includes('portfolio')) return 'Globe';
   if (t.includes('tik') || t.includes('tok')) return 'Video';
   return null;
};

const App: React.FC = () => {
   // --- PERSISTENT STATE (REMOVED LOCALSTORAGE PRIORITIZATION) ---
   const [profile, setProfile] = useState(INITIAL_PROFILE);
   const [links, setLinks] = useState(INITIAL_LINKS);
   const [projects, setProjects] = useState(INITIAL_PROJECTS);
   const [videos, setVideos] = useState(INITIAL_VIDEOS);
   const [posts, setPosts] = useState(INITIAL_POSTS);
   const [music, setMusic] = useState(INITIAL_MUSIC);
   const [actions, setActions] = useState(INITIAL_ACTIONS);
   const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
   const [stats, setStats] = useState(INITIAL_STATS);
   const [skills, setSkills] = useState(INITIAL_SKILLS);
   const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
   const [systemHealth, setSystemHealth] = useState(INITIAL_SYSTEM_HEALTH);
   const [design, setDesign] = useState(INITIAL_DESIGN);
   const [theme, setTheme] = useState(INITIAL_THEME);
   const [stack, setStack] = useState(INITIAL_STACK);
   const [customCSS, setCustomCSS] = useState('');
   const [apiKey, setApiKey] = useState('');

   // UI State
   const [copied, setCopied] = useState(false);
   const [isAdminOpen, setIsAdminOpen] = useState(false);
   const [showAuthModal, setShowAuthModal] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(isEditorAuthenticated());
   const [isPaletteOpen, setIsPaletteOpen] = useState(false);
   const [showQR, setShowQR] = useState(false);
   const [isGenerating, setIsGenerating] = useState<string | null>(null); // ID of item being generated (for button styles)
   const [isSummarizing, setIsSummarizing] = useState<string | null>(null); // ID of project being summarized
   const [promptInput, setPromptInput] = useState("");
   const [activePromptId, setActivePromptId] = useState<string | null>(null);
   const [isGeneratingPost, setIsGeneratingPost] = useState(false);
   const [postTopicInput, setPostTopicInput] = useState('');

   const [adminTab, setAdminTab] = useState<'dashboard' | 'identity' | 'experience' | 'skills' | 'testimonials' | 'system_health' | 'links' | 'grid' | 'media' | 'thoughts' | 'stack' | 'appearance' | 'system' | 'api' | 'actions'>('dashboard');
   const [keystrokes, setKeystrokes] = useState<string[]>([]);
   const [configCode, setConfigCode] = useState('');
   const [isSyncing, setIsSyncing] = useState(false);
   // Removed currentTime state as status bar is gone

   const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   // --- AUTO-SYNC ENGINE REMOVED ---


   // --- SECRET KEY LISTENER ---
   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         setKeystrokes(prev => {
            const newKeys = [...prev, e.key].slice(-7);
            if (newKeys.join('') === '2011812') {
               // Check if authenticated
               if (isEditorAuthenticated()) {
                  setIsAdminOpen(true);
                  setIsAuthenticated(true);
               } else {
                  setShowAuthModal(true);
               }
               return [];
            }
            return newKeys;
         });
         if (e.key === 'Escape') {
            setIsAdminOpen(false);
            setShowAuthModal(false);
         }

         // Command Palette Trigger (Cmd+K or Ctrl+K)
         if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsPaletteOpen(prev => !prev);
         }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      }
   }, []);

   // --- UTILS ---
   const currentTheme = THEMES[theme.accentColor] || THEMES.blue;

   const handleShare = async () => {
      const url = window.location.href;
      if (navigator.share) {
         try { await navigator.share({ title: profile.name, url }); }
         catch (err) { console.error('Error sharing:', err); }
      } else {
         navigator.clipboard.writeText(url);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   const handleHardReset = () => {
      if (confirm("Are you sure? This will wipe all local changes and revert to the original code.")) {
         localStorage.clear();
         window.location.reload();
      }
   };




   return (
      <div className={`min-h-screen flex flex-col items-center py-12 px-5 sm:px-6 relative selection:bg-white/30 overflow-x-hidden font-sans text-[#F5F5F7] transition-colors duration-700`}>
         <style>{`
        ${customCSS}
        @keyframes equalizer {
          0% { height: 10%; }
          50% { height: 100%; }
          100% { height: 10%; }
        .eq-bar:nth-child(4) { animation-delay: 0.15s; }

        /* Missing Animations */
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

         {/* --- BACKGROUND ENGINE --- */}
         <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000">
            {theme.backgroundStyle === 'solid' && <div className="absolute inset-0 bg-[#050505]" />}
            {theme.backgroundStyle === 'mesh' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a2e,transparent)] opacity-50" />}
            {theme.backgroundStyle === 'aurora' && (
               <>
                  {/* Extracted className to appease linter, functional change is minimal */}
                  {(() => {
                     const auroraClasses = `absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-mesh transition-colors duration-1000 ${currentTheme.primary}`;
                     return <div className={auroraClasses} />;
                  })()}
                  <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
               </>
            )}
            {theme.backgroundStyle === 'deep' && <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#050505]" />}
         </div>

         <div className="fixed top-0 left-0 w-full h-full noise-overlay opacity-[0.03] pointer-events-none z-[1]" />

         {/* --- CINEMATIC BANNER (CLOUDS MODE) --- */}
         {profile.banner && (
            <div className="fixed top-0 left-0 w-full h-[50vh] sm:h-[65vh] z-0 pointer-events-none select-none">
               {/* Image Layer - No masking, simple transparency */}
               <img
                  src={profile.banner}
                  className="w-full h-full object-cover object-top opacity-100"
                  alt=""
               />
               {/* Simple bottom fade to merge with app background */}
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#050505] to-transparent" />
            </div>
         )}

         <Routes>
            <Route path="/" element={
               <main className="w-full max-w-[440px] relative z-10 flex flex-col gap-6 pb-20 mt-20 sm:mt-28">

                  {/* --- PUBLIC THEME TOGGLER --- */}
                  <div className="absolute top-4 right-4 z-20">
                     <button
                        onClick={() => {
                           const colors = Object.keys(THEMES);
                           const currentIndex = colors.indexOf(theme.accentColor);
                           const nextIndex = (currentIndex + 1) % colors.length;
                           setTheme({ ...theme, accentColor: colors[nextIndex] });
                        }}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        title="Change Accent Color"
                     >
                        <LucideIcons.Moon size={20} className={`text-white/70 hover:text-white transition-colors`} />
                     </button>
                  </div>

                  {/* --- IDENTITY --- */}
                  <div className="flex flex-col items-center text-center pt-8 pb-4 opacity-0 animate-slide-up relative">
                     <div className="relative mb-6 group cursor-pointer" onClick={handleShare}>
                        <div className={`absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 ${currentTheme.primary}`} />
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-[38px] overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5 transition-transform duration-500 ease-out group-hover:scale-[1.02] bg-[#1C1C1E] z-10">
                           <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-in-out" />
                        </div>

                        {/* STATUS BADGE */}
                        {profile.availability && (
                           <div className="absolute -bottom-2 -right-2 bg-[#1C1C1E]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-lg z-20 flex items-center gap-1.5">
                              <div className={`w-2 h-2 rounded-full ${profile.availability === 'available' ? 'bg-green-500 animate-pulse' : profile.availability === 'busy' ? 'bg-orange-500' : 'bg-gray-500'}`} />
                              <span className="text-[10px] font-bold text-white/90 uppercase tracking-wide">
                                 {profile.availability === 'available' ? 'Open' : profile.availability === 'busy' ? 'Busy' : 'Off'}
                              </span>
                           </div>
                        )}
                     </div>

                     <div className="flex flex-col items-center gap-1 mb-6 z-10">
                        <h1 className="text-5xl sm:text-6xl font-black tracking-tighter leading-none text-white uppercase">Full Stack</h1>
                        <h1 className={`text-5xl sm:text-6xl font-black tracking-tighter leading-none uppercase ${currentTheme.badge} opacity-80`}>Engineer</h1>
                     </div>

                     <div className="flex items-center gap-2 mb-4 bg-white/5 px-3 py-1 rounded-full border border-white/5 backdrop-blur-md z-10">
                        <LucideIcons.Sparkles size={12} className="text-yellow-400" />
                        <span className="text-[11px] font-semibold text-[#EBEBF5]/80 uppercase tracking-widest">{profile.name}</span>
                     </div>

                     {/* HORIZON STATUS PILL */}
                     {profile.status && (
                        <div className="mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-sm z-10 animate-fade-in delay-200">
                           <span className="text-xs text-white/70 font-medium">"{profile.status}"</span>
                        </div>
                     )}

                     <p className="text-[#86868B] text-sm leading-relaxed max-w-[90%] font-medium z-10">{profile.bio}</p>

                     {/* --- CUSTOM ACTIONS --- */}
                     {actions.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-3 mt-4 z-10 w-full">
                           {actions.map((action: any) => (
                              <a
                                 key={action.id}
                                 href={action.url}
                                 className={
                                    action.style === 'custom' && action.customClasses
                                       ? `${action.customClasses} flex items-center gap-2 transition-all active:scale-95`
                                       : `
                                  px-5 py-2.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95
                                  ${design.radius === 'full' ? 'rounded-full' : design.radius === '3xl' ? 'rounded-[32px]' : design.radius === '2xl' ? 'rounded-2xl' : design.radius === 'xl' ? 'rounded-xl' : 'rounded-lg'}
                                  ${action.style === 'solid' ? 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/5' : ''}
                                  ${action.style === 'outline' ? 'border border-white/20 text-white hover:bg-white/5' : ''}
                                  ${action.style === 'ghost' ? 'text-white/60 hover:text-white hover:bg-white/5' : ''}
                                `
                                 }
                              >
                                 {action.icon && <DynamicIcon name={action.icon} size={14} />}
                                 {action.label}
                              </a>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* --- ACTIVITY HEATMAP --- */}
                  <div className="w-full mb-4 opacity-0 animate-slide-up delay-100 px-2">
                     <div className="flex gap-1 justify-center opacity-40 hover:opacity-100 transition-opacity">
                        {Array.from({ length: 28 }).map((_, i) => (
                           <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${Math.random() > 0.6 ? currentTheme.primary.replace('bg-', 'bg-') : 'bg-white/10'}`} style={{ opacity: Math.random() > 0.5 ? 0.8 : 0.2 }} />
                        ))}
                     </div>
                  </div>

                  {/* --- STATS GRID --- */}
                  {stats.length > 0 && (
                     <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 opacity-0 animate-slide-up delay-100">
                        {stats.map((stat: any) => (
                           <div key={stat.id} className="bg-white/5 border border-white/5 p-3 rounded-2xl flex flex-col items-center text-center backdrop-blur-md">
                              <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">{stat.label}</div>
                           </div>
                        ))}
                     </div>
                  )}

                  {/* --- SYSTEM HEALTH MONITOR --- */}
                  {isAdminOpen && (
                     <div className="w-full mt-4 p-5 rounded-[28px] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-xl animate-slide-up delay-500">
                        <div className="flex items-center gap-3 mb-3">
                           <div className={`w-3 h-3 rounded-full ${systemHealth.status === 'Operational' ? 'bg-green-500' : systemHealth.status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
                           <h3 className="text-sm font-bold text-white">System Status: {systemHealth.status}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-[#86868B]">
                           <div className="flex justify-between"><span>Uptime:</span> <span className="text-white/80">{systemHealth.uptime}</span></div>
                           <div className="flex justify-between"><span>Gemini API:</span> <span className={`${systemHealth.geminiApiStatus === 'Online' ? 'text-green-400' : 'text-yellow-400'}`}>{systemHealth.geminiApiStatus}</span></div>
                           <div className="flex justify-between col-span-2"><span>Last Update:</span> <span className="text-white/80">{systemHealth.lastUpdate}</span></div>
                        </div>
                     </div>
                  )}

                  {/* --- EXPERIENCE TIMELINE --- */}
                  {experience.length > 0 && (
                     <div className="w-full pt-4 opacity-0 animate-slide-up delay-200">
                        <h2 className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest pl-4 mb-3 opacity-60">Journey</h2>
                        <div className="pl-4 border-l border-white/10 ml-4 space-y-8 py-2">
                           {experience.map((exp: any) => (
                              <div key={exp.id} className="relative pl-6 group">
                                 <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#1C1C1E] border border-white/30 group-hover:border-white/80 group-hover:bg-white transition-all duration-500" />
                                 <div className="flex flex-col gap-1">
                                    <h3 className="text-white font-bold text-sm leading-tight group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                                    <div className="flex items-center gap-2 text-[11px] text-[#86868B] font-medium">
                                       <span className="text-white/60">{exp.company}</span>
                                       <span>•</span>
                                       <span>{exp.date}</span>
                                    </div>
                                    <p className="text-[12px] text-[#86868B] leading-relaxed mt-1 max-w-[95%]">{exp.description}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* --- TECH STACK MARQUEE --- */}
                  <div className="w-full mb-4 opacity-0 animate-slide-up delay-100 overflow-hidden relative group">
                     <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10" />
                     <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-10" />
                     <div className="flex gap-6 animate-[scroll_20s_linear_infinite] whitespace-nowrap hover:pause">
                        {[...stack, ...stack, ...stack].map((tech: any, i) => (
                           <div key={i} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                              <DynamicIcon name={tech.iconKey} size={16} />
                              <span className="text-xs font-bold uppercase tracking-wider">{tech.name}</span>
                           </div>
                        ))}
                     </div>
                  </div>
                  <style>{`
                    @keyframes scroll {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-33%); }
                    }
                    .hover\\:pause:hover { animation-play-state: paused; }
                  `}</style>

                  {/* --- MUSIC WIDGET (WITH VISUALIZER) --- */}
                  {music.isPlaying && (
                     <a href={music.url} target="_blank" rel="noopener noreferrer" className="opacity-0 animate-slide-up delay-100 w-full bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 p-3 rounded-[20px] flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="relative">
                           <img src={music.cover} alt={`${music.title} cover`} className="w-10 h-10 rounded-lg shadow-lg group-hover:scale-105 transition-transform" />
                           <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                              <LucideIcons.Play size={16} className="text-white fill-current" aria-hidden="true" />
                           </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <div className="flex items-center gap-2 mb-0.5">
                              <div className="flex items-end gap-0.5 h-3">
                                 <div className="w-0.5 bg-green-500 rounded-full eq-bar" />
                                 <div className="w-0.5 bg-green-500 rounded-full eq-bar" />
                                 <div className="w-0.5 bg-green-500 rounded-full eq-bar" />
                                 <div className="w-0.5 bg-green-500 rounded-full eq-bar" />
                              </div>
                              <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Now Listening</span>
                           </div>
                           <div className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{music.title} <span className="text-white/40 font-normal">• {music.artist}</span></div>
                        </div>
                        <LucideIcons.ExternalLink size={16} className="text-white/20 group-hover:text-white" />
                     </a>
                  )}

                  {/* --- LINKS --- */}
                  <div className="flex flex-col gap-3 w-full opacity-0 animate-slide-up delay-200">
                                                {links.map((link: any) => {
                                                   const hasCustomColors = link.bgColor && link.bgColor !== 'transparent';
                     
                                                   const customStyle: React.CSSProperties = hasCustomColors ? {
                                                      backgroundColor: link.bgColor,
                                                      color: link.textColor || '#ffffff',
                                                      borderColor: link.borderColor || 'rgba(255,255,255,0.1)',
                                                      boxShadow: link.shadow ? `0 10px 30px -5px ${link.bgColor}60` : 'none',
                                                   } : {};
                     
                                                   // Variant-based classes when no custom colors
                                                   const variantClasses = !hasCustomColors ? `
                                                      ${link.variant === 'solid' ? 'bg-white text-black hover:bg-[#E5E5EA] shadow-xl shadow-white/5' : ''}
                                                      ${link.variant === 'glass' ? 'bg-[#1C1C1E]/40 hover:bg-[#2C2C2E]/60 backdrop-blur-2xl border border-white/[0.06] text-white hover:border-white/10' : ''}
                                                      ${link.variant === 'outline' ? 'bg-transparent border-2 border-white/10 hover:border-white/30 text-white' : ''}
                                                   ` : '';
                     
                                                   const dynamicPaddingClasses = hasCustomColors
                                                      ? link.size === 'sm'
                                                         ? 'py-1 px-4'
                                                         : link.size === 'lg'
                                                            ? 'py-2 px-8'
                                                            : 'py-1 px-6'
                                                      : 'p-1 pr-4'; // Default padding for non-custom links
                     
                                                   const dynamicBorderRadiusClasses = hasCustomColors
                                                      ? link.roundness === 'square'
                                                         ? 'rounded-[24px]'
                                                         : link.roundness === 'pill'
                                                            ? 'rounded-full'
                                                            : 'rounded-[24px]' // Default for custom links
                                                      : 'rounded-[24px]'; // Default border radius for non-custom links
                     
                                                   return (
                                                      <a
                                                         key={link.id}
                                                         href={link.url}
                                                         target="_blank"
                                                         rel="noopener noreferrer"
                                                         style={hasCustomColors ? customStyle : undefined}
                                                         className={`group relative flex items-center justify-between transition-all duration-300 active:scale-[0.98] hover:border-white/20 ${variantClasses} ${hasCustomColors ? 'hover:opacity-90 hover:-translate-y-0.5' : ''} ${dynamicPaddingClasses} ${dynamicBorderRadiusClasses}`}
                                                      >
                              <div className="flex items-center gap-4">
                                 <div className={`p-3.5 rounded-[20px] transition-colors duration-300 ${hasCustomColors ? 'bg-white/10' : link.variant === 'solid' ? 'bg-black/5 text-black' : 'bg-white/[0.07] text-white'}`}>
                                    <DynamicIcon name={link.iconKey} size={22} strokeWidth={2.5} />
                                 </div>
                                 <div className="text-left flex flex-col justify-center">
                                    <div className="flex items-center gap-1.5">
                                       <span className="block text-[15px] font-bold tracking-tight">{link.title}</span>
                                       {link.verified && <LucideIcons.BadgeCheck size={14} className={hasCustomColors ? 'opacity-80' : currentTheme.badge} fill="currentColor" fillOpacity={0.2} />}
                                    </div>
                                    {link.subtitle && <span className={`block text-[12px] font-medium ${hasCustomColors ? 'opacity-70' : link.variant === 'solid' ? 'text-black/60' : 'text-[#86868B]'}`}>{link.subtitle}</span>}
                                 </div>
                              </div>
                              <div className={`opacity-40 group-hover:translate-x-1 transition-all duration-300 ${!hasCustomColors && link.variant === 'solid' ? 'text-black' : 'text-white'}`}>
                                 <LucideIcons.ArrowUpRight size={20} />
                              </div>
                           </a>
                        );
                     })}
                  </div>

                  {/* --- PROJECTS --- */}
                  {projects.length > 0 && (
                     <div className="w-full pt-4 opacity-0 animate-slide-up delay-300">
                        <h2 className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest pl-4 mb-3 opacity-60">Featured Grid</h2>
                        <div className="grid grid-cols-2 gap-3">
                           {projects.map((project: any, index: number) => (
                              <a
                                 key={project.id}
                                 href={project.url}
                                 title={project.title}
                                 className={`group relative flex flex-col justify-between p-5 bg-[#1C1C1E]/40 hover:bg-[#2C2C2E]/60 backdrop-blur-2xl border border-white/[0.06] rounded-[28px] transition-all duration-300 active:scale-[0.97] hover:shadow-2xl overflow-hidden hover:border-white/20 ${index === 0 ? 'col-span-2 aspect-[2.2/1]' : 'aspect-square'}`}
                              >
                                 <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br from-white/20 to-transparent`} />
                                 <div className="relative z-10 flex justify-between items-start">
                                    <div className={`p-2.5 w-fit rounded-[16px] bg-white/10 text-white backdrop-blur-md border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                                       <DynamicIcon name={project.iconKey} size={index === 0 ? 24 : 20} />
                                    </div>
                                    <div className="flex gap-2">
                                       <a 
                                          href="https://github.com/dill-lk" 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          onClick={(e) => e.stopPropagation()}
                                          className="p-2 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                          aria-label="View source on GitHub"
                                          title="View source on GitHub"
                                       >
                                          <LucideIcons.Github size={16} aria-hidden="true" />
                                       </a>
                                       <LucideIcons.ArrowUpRight size={16} className="text-white/50 group-hover:text-white transition-colors" />
                                    </div>
                                 </div>
                                 <div className="relative z-10 mt-auto">
                                    <h3 className={`font-bold text-white tracking-tight leading-tight mb-1 ${index === 0 ? 'text-lg' : 'text-[15px]'}`}>{project.title}</h3>
                                    <p className="text-[11px] text-[#86868B] font-medium leading-tight group-hover:text-white/80 transition-colors mb-2">{project.subtitle}</p>

                                    {/* TAGS PILLS */}
                                    {project.tags && (
                                       <div className="flex flex-wrap gap-1.5">
                                          {project.tags.map((tag: string, tIndex: number) => (
                                             <span key={tIndex} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/60 font-medium uppercase tracking-wide">
                                                {tag}
                                             </span>
                                          ))}
                                       </div>
                                    )}
                                 </div>
                              </a>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* --- MEDIA --- */}
                  {videos.length > 0 && (
                     <div className="w-full pt-4 opacity-0 animate-slide-up delay-400">
                        <h2 className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest pl-4 mb-3 opacity-60">Latest Media</h2>
                        <div className="flex flex-col gap-4">
                           {videos.map((video: any) => (
                              <a key={video.id} href={video.url} className="group relative aspect-video w-full rounded-[24px] overflow-hidden border border-white/10 shadow-2xl hover:border-white/20 transition-colors">
                                 <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                       <LucideIcons.Play size={20} className="fill-white text-white ml-1" />
                                    </div>
                                 </div>
                                 <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-1 drop-shadow-md">{video.title}</h3>
                                    <p className="text-white/70 text-xs font-medium">{video.views}</p>
                                 </div>
                              </a>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* --- THOUGHTS --- */}
                  {posts.length > 0 && (
                     <div className="w-full pt-4 opacity-0 animate-slide-up delay-500">
                        <h2 className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest pl-4 mb-3 opacity-60">Thoughts</h2>
                        <div className="bg-[#1C1C1E]/40 backdrop-blur-2xl border border-white/[0.06] rounded-[28px] overflow-hidden hover:border-white/20 transition-colors">
                           {posts.map((post: any, i: number) => (
                              <Link key={post.id} to={`/posts/${post.id}`} className={`flex items-center justify-between p-4 sm:p-5 hover:bg-white/5 transition-colors ${i !== posts.length - 1 ? 'border-b border-white/5' : ''} group`}>
                                 <div className="pr-4">
                                    <h3 className="text-[14px] font-semibold text-white mb-1 group-hover:text-white/80 transition-colors">{post.title}</h3>
                                    <div className="flex items-center gap-2 text-[11px] text-[#86868B]">
                                       <span>{post.date}</span>
                                       <span className="w-0.5 h-0.5 bg-[#86868B] rounded-full" />
                                       <span>{post.readTime}</span>
                                    </div>
                                 </div>
                                 <LucideIcons.ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                              </Link>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* --- CONTACT: LET'S CREATE --- */}
                  <div className="w-full mt-4 p-8 rounded-[32px] bg-white text-black animate-slide-up delay-500 relative overflow-hidden group">
                     <div className="relative z-10">
                        <h2 className="text-5xl font-black tracking-tighter leading-none mb-2">Let's</h2>
                        <h2 className="text-5xl font-black tracking-tighter leading-none mb-6 italic">Create.</h2>
                        <p className="text-sm font-medium leading-relaxed mb-8 opacity-70">
                           Got a vision that needs engineering? A product that needs scaling? Or just want to talk about the future of tech?
                        </p>
                        <div className="flex flex-col gap-4">
                           <a 
                              href="mailto:dill.ruzz.official@gmail.com" 
                              className="inline-flex items-center justify-center bg-black text-white px-6 py-3 rounded-full text-sm font-bold transition-transform active:scale-95"
                           >
                              <LucideIcons.Mail size={16} className="mr-2" />
                              dill.ruzz.official@gmail.com
                           </a>

                           <a 
                              href="https://wa.me/94771396311" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center bg-[#25D366] text-white px-6 py-3 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-green-500/20"
                           >
                              <LucideIcons.MessageCircle size={18} className="mr-2" />
                              Contact on WhatsApp
                           </a>
                           
                           <div className="flex gap-3 mt-2 justify-center">
                              <a href="https://linkedin.com/in/jinuk-chathusa" target="_blank" rel="noopener noreferrer" className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors" aria-label="LinkedIn" title="LinkedIn">
                                 <LucideIcons.Linkedin size={20} aria-hidden="true" />
                              </a>
                              <a href="https://x.com/Dill_Ruzz" target="_blank" rel="noopener noreferrer" className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors" aria-label="X (Twitter)" title="X (Twitter)">
                                 <LucideIcons.Twitter size={20} aria-hidden="true" />
                              </a>
                              <a href="https://github.com/dill-lk" target="_blank" rel="noopener noreferrer" className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors" aria-label="GitHub" title="GitHub">
                                 <LucideIcons.Github size={20} aria-hidden="true" />
                              </a>
                           </div>
                        </div>
                     </div>
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <LucideIcons.Send size={120} strokeWidth={1} />
                     </div>
                  </div>

                  {/* --- TESTIMONIALS --- */}
                  {testimonials.length > 0 && (
                     <div className="w-full pt-4 opacity-0 animate-slide-up delay-500">
                        <h2 className="text-[11px] font-bold text-[#86868B] uppercase tracking-widest pl-4 mb-3 opacity-60">What People Say</h2>
                        <div className="space-y-4">
                           {testimonials.map((testimonial: any) => (
                              <div key={testimonial.id} className="bg-[#1C1C1E]/40 backdrop-blur-2xl border border-white/[0.06] rounded-[28px] p-6 text-center relative overflow-hidden">
                                 <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent" />
                                 <LucideIcons.Quote size={32} className="text-white/20 mx-auto mb-4 relative z-10" />
                                 <p className="text-sm text-white/80 italic leading-relaxed mb-4 relative z-10">"{testimonial.quote}"</p>
                                 <div className="flex items-center justify-center gap-3 relative z-10">
                                    <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full border border-white/10" />
                                    <div>
                                       <p className="font-bold text-white text-sm">{testimonial.author}</p>
                                       <p className="text-xs text-white/50">{testimonial.title}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* --- FOOTER --- */}
                  <div className="mt-8 mb-6 opacity-0 animate-slide-up delay-500 flex flex-col items-center gap-4">
                     <div className="flex gap-2">
                        <button
                           onClick={handleShare}
                           className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#1C1C1E]/80 hover:bg-[#2C2C2E] backdrop-blur-md text-[#EBEBF5] border border-white/[0.08] transition-all active:scale-95 hover:border-white/20 shadow-lg group"
                        >
                           {copied ? <LucideIcons.Check size={14} className="text-green-500" /> : <LucideIcons.Share2 size={14} className="text-[#86868B] group-hover:text-white transition-colors" />}
                           <span className="text-[13px] font-medium">{copied ? 'Copied' : 'Share'}</span>
                        </button>
                        <button
                           onClick={() => setShowQR(!showQR)}
                           className="flex items-center gap-2.5 px-3 py-2.5 rounded-full bg-[#1C1C1E]/80 hover:bg-[#2C2C2E] backdrop-blur-md text-[#EBEBF5] border border-white/[0.08] transition-all active:scale-95 hover:border-white/20 shadow-lg"
                           aria-label={showQR ? 'Hide QR code' : 'Show QR code'}
                           title={showQR ? 'Hide QR code' : 'Show QR code'}
                        >
                           <LucideIcons.QrCode size={14} className="text-[#86868B]" aria-hidden="true" />
                        </button>
                     </div>

                        {showQR && (
                        <div className="bg-white p-4 rounded-xl animate-slide-up">
                           <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}`} alt="QR code for this page" className="rounded-lg" />
                        </div>
                     )}

                     <div className="flex items-center gap-1.5 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-help" title="Type 2011812 to Access Admin">
                        <LucideIcons.Command size={12} />
                        <span className="text-[10px] font-mono tracking-widest uppercase">Titanium OS v6.0 Horizon</span>
                     </div>
                  </div>

               </main>
            } />
            <Route path="/posts/:postId" element={<PostPage posts={posts} currentTheme={currentTheme} />} />
         </Routes>

         {/* --- PASSWORD AUTH MODAL --- */}
         {showAuthModal && (
            <AuthModal
               onSuccess={() => {
                  setShowAuthModal(false);
                  setIsAdminOpen(true);
                  setIsAuthenticated(true);
               }}
               onCancel={() => setShowAuthModal(false)}
            />
         )}

         {/* --- ADMIN PANEL 7.0 AI CORE --- */}
         {isAdminOpen && (
            <AdminPanel
               isOpen={isAdminOpen}
               onClose={() => setIsAdminOpen(false)}
               apiKey={apiKey}
               setApiKey={setApiKey}
               state={{
                  profile,
                  experience,
                  skills,
                  projects,
                  posts,
                  links,
                  videos,
                  music,
                  actions,
                  stack,
                  testimonials,
                  systemHealth,
                  stats,
                  theme,
                  design
               }}
               setState={(newState) => {
                  if (newState.profile) setProfile(prev => ({ ...prev, ...newState.profile }));
                  if (newState.experience) setExperience(newState.experience);
                  // Ensure incoming skills include required `category` field
                  if (newState.skills) setSkills(newState.skills.map((s: any) => ({ category: s.category ?? 'general', ...s })));
                  if (newState.projects) setProjects(newState.projects);
                  if (newState.posts) setPosts(newState.posts);
                  // Ensure links always have a subtitle (some admin payloads omit it)
                  if (newState.links) setLinks(newState.links.map((l: any) => ({ subtitle: l.subtitle ?? '', ...l })));
                  if (newState.videos) setVideos(newState.videos);
                  if (newState.music) setMusic(prev => ({ ...prev, ...newState.music }));
                  // Normalize actions so presentation fields are present to match the app expectations
                  if (newState.actions) setActions(newState.actions.map((a: any) => ({ customClasses: a.customClasses ?? '', rounded: a.rounded ?? 'full', size: a.size ?? 'medium', ...a })));
                  if (newState.stack) setStack(newState.stack);
                  if (newState.testimonials) setTestimonials(newState.testimonials);
                  if (newState.systemHealth) setSystemHealth(prev => ({ ...prev, ...newState.systemHealth }));
                  if (newState.stats) setStats(newState.stats);
                  if (newState.theme) setTheme(prev => ({ ...prev, ...newState.theme }));
                  if (newState.design) setDesign(prev => ({ ...prev, ...newState.design }));
               }}
            />
         )}

         <CommandPalette
            isOpen={isPaletteOpen}
            onClose={() => setIsPaletteOpen(false)}
            commands={[
               { id: 'open_admin', label: 'Open Admin Panel', icon: 'Settings', action: () => { setIsAdminOpen(true); setIsPaletteOpen(false); } },
               {
                  id: 'toggle_accent_color', label: 'Toggle Accent Color', icon: 'Palette', action: () => {
                     const colors = Object.keys(THEMES);
                     const currentIndex = colors.indexOf(theme.accentColor);
                     const nextIndex = (currentIndex + 1) % colors.length;
                     setTheme({ ...theme, accentColor: colors[nextIndex] });
                     setIsPaletteOpen(false);
                  },
                  keywords: ['theme', 'color', 'accent', 'change']
               },
               {
                  id: 'toggle_theme_mode', label: 'Toggle Background Style', icon: 'PanelTopOpen', action: () => {
                     const styles = ['aurora', 'mesh', 'deep', 'solid'];
                     const currentIndex = styles.indexOf(theme.backgroundStyle);
                     const nextIndex = (currentIndex + 1) % styles.length;
                     setTheme({ ...theme, backgroundStyle: styles[nextIndex] });
                     setIsPaletteOpen(false);
                  }
               },

               // Admin Tab Navigation
               { id: 'admin_dashboard', label: 'Admin: Dashboard', icon: 'LayoutDashboard', action: () => { setIsAdminOpen(true); alert("Use the sidebar in Admin Panel to navigate."); setIsPaletteOpen(false); } },
               { id: 'admin_identity', label: 'Admin: Identity', icon: 'User', action: () => { setIsAdminOpen(true); alert("Use the sidebar in Admin Panel to navigate."); setIsPaletteOpen(false); } },
               { id: 'admin_tools', label: 'Admin: AI Hub', icon: 'Bot', action: () => { setIsAdminOpen(true); setIsPaletteOpen(false); } },

               // Quick actions
               { id: 'share_profile', label: 'Share Profile', icon: 'Share2', action: handleShare },
               { id: 'copy_url', label: 'Copy URL', icon: 'Copy', action: () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } },
               { id: 'hard_reset', label: 'Factory Reset', icon: 'Trash2', action: handleHardReset, keywords: ['clear', 'data', 'wipe'] },
            ]}
         />
      </div>
   );
};

export default App;
