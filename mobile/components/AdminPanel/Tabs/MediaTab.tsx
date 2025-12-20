import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { autoPopulateYouTubeVideo } from '../../../utils/youtube';

interface MediaTabProps {
    videos: any[];
    music: any;
    onUpdateVideos: (v: any[]) => void;
    onUpdateMusic: (m: any) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({ videos, music, onUpdateVideos, onUpdateMusic }) => {
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);

    const handleAddFromYouTube = async () => {
        if (!youtubeUrl.trim()) return;

        setIsLoadingVideo(true);
        try {
            const videoData = await autoPopulateYouTubeVideo(youtubeUrl);
            onUpdateVideos([videoData, ...videos]);
            setYoutubeUrl('');
        } catch (error) {
            alert('Invalid YouTube URL or failed to fetch video info');
        } finally {
            setIsLoadingVideo(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Videos Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg">Videos</h3>
                </div>

                {/* YouTube Quick Add */}
                <div className="bg-gradient-to-br from-red-600/10 to-pink-600/10 border border-red-500/20 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-2">
                        <LucideIcons.Youtube size={20} className="text-red-400" />
                        <h4 className="text-white font-bold">Quick Add from YouTube</h4>
                    </div>
                    <div className="flex gap-2">
                        <input
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddFromYouTube()}
                            className="flex-1 bg-black/20 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/20 outline-none focus:border-red-500/50"
                            placeholder="Paste YouTube URL (auto-extracts title & thumbnail)"
                        />
                        <button
                            onClick={handleAddFromYouTube}
                            disabled={isLoadingVideo || !youtubeUrl.trim()}
                            className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                        >
                            {isLoadingVideo ? (
                                <LucideIcons.Loader2 size={14} className="animate-spin" />
                            ) : (
                                <LucideIcons.Plus size={14} />
                            )}
                            Add
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {videos.map((video, idx) => (
                        <div key={video.id} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden group">
                            {/* Thumbnail Preview */}
                            <div className="relative h-40 bg-black/40 overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                    <LucideIcons.Play size={12} className="inline mr-1" />
                                    {video.views}
                                </div>
                            </div>

                            {/* Video Info */}
                            <div className="p-4 space-y-3">
                                <input
                                    value={video.title}
                                    onChange={(e) => {
                                        const updated = videos.map(v => v.id === video.id ? { ...v, title: e.target.value } : v);
                                        onUpdateVideos(updated);
                                    }}
                                    className="w-full bg-transparent text-white font-bold outline-none"
                                    placeholder="Video Title"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        value={video.views}
                                        onChange={(e) => {
                                            const updated = videos.map(v => v.id === video.id ? { ...v, views: e.target.value } : v);
                                            onUpdateVideos(updated);
                                        }}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white/70 outline-none"
                                        placeholder="Views"
                                    />
                                    <input
                                        value={video.url}
                                        onChange={(e) => {
                                            const updated = videos.map(v => v.id === video.id ? { ...v, url: e.target.value } : v);
                                            onUpdateVideos(updated);
                                        }}
                                        className="bg-white/5 rounded-lg p-2 text-xs text-white/70 outline-none"
                                        placeholder="Embed URL"
                                    />
                                </div>
                                <button
                                    onClick={() => onUpdateVideos(videos.filter(v => v.id !== video.id))}
                                    className="w-full p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-xs font-bold flex items-center justify-center gap-2"
                                >
                                    <LucideIcons.Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Music Section */}
            <div className="space-y-4">
                <h3 className="text-white font-bold text-lg">Now Playing</h3>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                    <input
                        value={music.title}
                        onChange={(e) => onUpdateMusic({ ...music, title: e.target.value })}
                        className="w-full bg-white/5 rounded-xl p-3 text-sm text-white outline-none"
                        placeholder="Track Title"
                    />
                    <input
                        value={music.artist}
                        onChange={(e) => onUpdateMusic({ ...music, artist: e.target.value })}
                        className="w-full bg-white/5 rounded-xl p-3 text-sm text-white outline-none"
                        placeholder="Artist"
                    />
                    <input
                        value={music.url}
                        onChange={(e) => onUpdateMusic({ ...music, url: e.target.value })}
                        className="w-full bg-white/5 rounded-xl p-3 text-sm text-white outline-none"
                        placeholder="Spotify/Music URL"
                    />
                </div>
            </div>
        </div>
    );
};

export default MediaTab;
