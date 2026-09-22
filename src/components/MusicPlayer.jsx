import { useState } from 'react';
import './MusicPlayer.css';

const DEFAULT_EMBED_URL =
    'https://www.youtube.com/embed/videoseries?list=PL18d2lPAowrdMgN_pRJ8bfq8eX9PAIL9C';

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const PLAYLIST_ID_PATTERN = /^(PL|UU|LL|RD|OL|FL|PP|UU)[a-zA-Z0-9_-]+$/i;

function getYouTubeEmbedUrl(rawInput) {
    const input = rawInput.trim();
    if (!input) {
        return { error: 'Paste a YouTube video or playlist link.' };
    }

    const buildEmbed = (videoId, listId) => {
        if (videoId && listId) {
            return `https://www.youtube.com/embed/${videoId}?list=${listId}`;
        }
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (listId) {
            return `https://www.youtube.com/embed/videoseries?list=${listId}`;
        }
        return null;
    };

    // Plain IDs pasted without a full URL
    if (VIDEO_ID_PATTERN.test(input)) {
        return { embedUrl: buildEmbed(input, null), videoId: input, listId: null };
    }
    if (PLAYLIST_ID_PATTERN.test(input) || /^[a-zA-Z0-9_-]{13,}$/.test(input)) {
        return { embedUrl: buildEmbed(null, input), videoId: null, listId: input };
    }

    // Try parsing as a URL (add protocol if missing, e.g. "youtube.com/watch?v=...")
    let url;
    try {
        url = new URL(input.includes('://') ? input : `https://${input}`);
    } catch {
        return { error: 'That does not look like a valid YouTube link.' };
    }

    const host = url.hostname.toLowerCase().replace(/^m\./, '').replace(/^music\./, '');
    const isYouTubeHost =
        host === 'youtube.com' ||
        host === 'www.youtube.com' ||
        host === 'youtu.be' ||
        host === 'youtube-nocookie.com' ||
        host === 'www.youtube-nocookie.com';

    if (!isYouTubeHost) {
        return { error: 'Only YouTube links are supported.' };
    }

    let videoId = url.searchParams.get('v');
    let listId = url.searchParams.get('list');
    const path = url.pathname;

    if (host === 'youtu.be') {
        // https://youtu.be/VIDEO_ID?t=30&list=PLAYLIST_ID
        const idFromPath = path.split('/').filter(Boolean)[0];
        if (idFromPath && VIDEO_ID_PATTERN.test(idFromPath)) {
            videoId = idFromPath;
        }
    } else {
        const segments = path.split('/').filter(Boolean);
        // /shorts/ID, /live/ID, /embed/ID, /v/ID
        if (segments.length >= 2 && ['shorts', 'live', 'embed', 'v'].includes(segments[0])) {
            const idFromPath = segments[1];
            if (VIDEO_ID_PATTERN.test(idFromPath)) {
                videoId = idFromPath;
            }
        }
    }

    // Clean up params YouTube sometimes adds (e.g. "v=ID&pp=..." or "si=...")
    if (videoId && !VIDEO_ID_PATTERN.test(videoId)) {
        return { error: 'Could not find a video ID in that link.' };
    }

    const embedUrl = buildEmbed(videoId, listId);
    if (!embedUrl) {
        return { error: 'Could not find a video or playlist ID in that link.' };
    }
    return { embedUrl, videoId, listId };
}

export default function MusicPlayer(){
    const [urlInput, setUrlInput] = useState('');
    const [embedUrl, setEmbedUrl] = useState(DEFAULT_EMBED_URL);
    const [error, setError] = useState('');

    function handleLoad(e) {
        e?.preventDefault();
        const result = getYouTubeEmbedUrl(urlInput);
        if (result.error) {
            setError(result.error);
            return;
        }
        setError('');
        setEmbedUrl(result.embedUrl);
    }

    return (
        <div className="music-player">
            <h2>Music Player</h2>
            <form className="music-input-row" onSubmit={handleLoad}>
                <input
                    type="text"
                    className="music-input"
                    placeholder="Paste a YouTube video or playlist link..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    spellCheck={false}
                />
                <button type="submit" className="music-load-btn">
                    Play
                </button>
            </form>
            {error && <p className="music-error">{error}</p>}
            <iframe
                key={embedUrl}
                width="100%"
                height="300"
                src={embedUrl}
                title="Background music"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
}