import React, { useRef } from 'react';
import * as LucideIcons from 'lucide-react';

const InputGroup = ({ label, value, onChange, multiline = false, placeholder }: any) => (
    <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider pl-1">{label}</label>
        {multiline ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors h-32 resize-none"
                placeholder={placeholder}
            />
        ) : (
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500/50 transition-colors"
                placeholder={placeholder}
            />
        )}
    </div>
);

const IdentityTab = ({ data, onChange }: { data: any, onChange: (d: any) => void }) => {

    const updateField = (field: string, value: any) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <LucideIcons.User size={18} className="text-blue-400" />
                        Core Profile
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Name" value={data.name} onChange={(v: string) => updateField('name', v)} />
                        <InputGroup label="Handle" value={data.handle} onChange={(v: string) => updateField('handle', v)} />
                    </div>
                    <InputGroup label="Title" value={data.title} onChange={(v: string) => updateField('title', v)} />
                    <InputGroup label="Bio" value={data.bio} onChange={(v: string) => updateField('bio', v)} multiline />
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <LucideIcons.Activity size={18} className="text-green-400" />
                        Status & Availability
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Status Message" value={data.status} onChange={(v: string) => updateField('status', v)} />
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-white/40 tracking-wider pl-1">Availability</label>
                            <select
                                value={data.availability}
                                onChange={(e) => updateField('availability', e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm text-white outline-none focus:border-blue-500/50 transition-colors"
                            >
                                <option value="available" className="bg-gray-900">Available</option>
                                <option value="busy" className="bg-gray-900">Busy</option>
                                <option value="offline" className="bg-gray-900">Offline</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mb-6 relative group">
                        <img src={data.avatar} alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <LucideIcons.Camera size={24} className="text-white" />
                        </div>
                    </div>
                    <InputGroup label="Avatar URL" value={data.avatar} onChange={(v: string) => updateField('avatar', v)} />
                </div>

                <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
                    <div className="h-24 rounded-xl bg-white/5 mb-6 overflow-hidden relative group">
                        {data.banner && <img src={data.banner} className="w-full h-full object-cover" alt="Banner" />}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                            <LucideIcons.Image size={24} className="text-white" />
                        </div>
                    </div>
                    <InputGroup label="Banner URL" value={data.banner} onChange={(v: string) => updateField('banner', v)} />
                </div>
            </div>
        </div>
    );
};

export default IdentityTab;
