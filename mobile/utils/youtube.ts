// YouTube utilities for video management

export interface YouTubeVideoInfo {
    videoId: string;
    title: string;
    thumbnail: string;
    embedUrl: string;
}

/**
 * Extract YouTube video ID from various URL formats
 */
export const extractYouTubeId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
};

/**
 * Get YouTube video info from URL
 */
export const getYouTubeInfo = (url: string): YouTubeVideoInfo | null => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;

    return {
        videoId,
        title: '', // Will be filled by API or user
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`
    };
};

/**
 * Fetch video title from YouTube oEmbed API (no API key required)
 */
export const fetchYouTubeTitle = async (videoId: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (!response.ok) throw new Error('Failed to fetch video info');

        const data = await response.json();
        return data.title || 'YouTube Video';
    } catch (error) {
        console.error('Error fetching YouTube title:', error);
        return 'YouTube Video';
    }
};

/**
 * Auto-populate video info from YouTube URL
 */
export const autoPopulateYouTubeVideo = async (url: string) => {
    const info = getYouTubeInfo(url);
    if (!info) {
        throw new Error('Invalid YouTube URL');
    }

    // Fetch title
    const title = await fetchYouTubeTitle(info.videoId);

    return {
        id: Date.now().toString(),
        title,
        views: '0',
        thumbnail: info.thumbnail,
        url: info.embedUrl
    };
};
