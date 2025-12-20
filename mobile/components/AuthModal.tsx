import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { setAuth } from '../services/authService';

interface AuthModalProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onSuccess, onCancel }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        setTimeout(() => {
            if (setAuth(password)) {
                onSuccess();
            } else {
                setError('Incorrect password. Access denied.');
                setPassword('');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-xl">
            <div className="relative w-full max-w-md bg-[#1C1C1E] border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/30">
                    <LucideIcons.Lock size={32} className="text-white" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Editor Access Required
                </h2>
                <p className="text-white/50 text-sm text-center mb-6">
                    Enter password to unlock admin panel with auto-save
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs uppercase font-bold text-white/40 tracking-wider mb-2 block">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-colors"
                            placeholder="Enter admin password"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 text-red-400 text-sm">
                            <LucideIcons.AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LucideIcons.Loader2 size={16} className="animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <LucideIcons.Unlock size={16} />
                                    Unlock
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Hint */}
                <div className="mt-6 pt-6 border-t border-white/5">
                    <p className="text-xs text-white/30 text-center">
                        Password: <code className="text-blue-400">2011812</code>
                        <br />
                        <span className="text-[10px]">Type this code to unlock admin</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
