import React from 'react';
import { extractYouTubeId } from '../utils/youtube';

interface VideoPlayerProps {
    url: string;
    title?: string;
    className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, className = '' }) => {
    const videoId = extractYouTubeId(url);

    if (!videoId) {
        return (
            <div className={`bg-black/20 rounded-2xl flex items-center justify-center p-8 ${className}`}>
                <p className="text-white/40 text-sm">Invalid video URL</p>
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

    return (
        <div className={`relative rounded-2xl overflow-hidden ${className}`}>
            <div className="relative pb-[56.25%]"> {/* 16:9 aspect ratio */}
                <iframe
                    src={embedUrl}
                    title={title || 'YouTube video player'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
