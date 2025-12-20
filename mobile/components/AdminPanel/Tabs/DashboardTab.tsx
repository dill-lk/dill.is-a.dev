import React from 'react';
import * as LucideIcons from 'lucide-react';

const StatCard = ({ label, value, icon, trend }: { label: string, value: string, icon: any, trend?: string }) => {
    const Icon = (LucideIcons as any)[icon] || LucideIcons.Activity;
    return (
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 hover:bg-white/[0.07] transition-colors group">
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <Icon size={20} />
                </div>
                {trend && <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{trend}</span>}
            </div>
            <div>
                <div className="text-2xl font-bold text-white mb-1">{value}</div>
                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">{label}</div>
            </div>
        </div>
    );
}

const DashboardTab = ({ data }: { data: any }) => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Projects" value={data.projects.length} icon="LayoutGrid" trend="+2 new" />
                <StatCard label="Blog Posts" value={data.posts.length} icon="PenTool" />
                <StatCard label="Total Views" value="2.4M" icon="Eye" trend="+12%" />
                <StatCard label="System Status" value={data.systemHealth.status} icon="Server" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <LucideIcons.Activity size={18} className="text-blue-400" />
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div className="flex-1">
                                    <div className="text-sm text-white">Updated project "Vortex Engine"</div>
                                    <div className="text-[10px] text-white/40">2 hours ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-white font-bold mb-2">Titanium AI Core</h3>
                        <p className="text-sm text-white/60 mb-6">System operating at normal capacity. All neural services active.</p>
                        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                            Run Diagnostics
                        </button>
                    </div>
                    <LucideIcons.Cpu size={120} className="absolute -bottom-6 -right-6 text-indigo-500/20" />
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;
