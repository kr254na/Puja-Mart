import { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import fluteMusic from '../assets/audio/flute-music.mp3';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Audio
    const audio = new Audio(fluteMusic);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Retrieve user preference from localStorage
    const savedPreference = localStorage.getItem('puja_mart_flute_music_enabled');
    const shouldPlay = savedPreference === null ? true : savedPreference === 'true';

    // 2. Attempt Autoplay function
    const playAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Autoplay blocked by browser. Awaiting user interaction to play flute music.', err);
        });
    };

    // If preference is enabled, try playing or wait for interaction
    if (shouldPlay) {
      playAudio();

      // Fallback listener for first user click anywhere on page (resolves browser autoplay policy)
      const handleUserInteraction = () => {
        // Only trigger if audio is still paused and preference is still true
        const currentPref = localStorage.getItem('puja_mart_flute_music_enabled');
        if (audio.paused && (currentPref === null || currentPref === 'true')) {
          playAudio();
        }
        // Remove listeners once interacted
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);

      // Store interaction listener reference on audio object to clean up if needed
      audio._interactionCleanup = () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
    }

    // 3. Sync state from HTML5 Audio events
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // 4. Cleanup when unmounting (crucial to stop music when leaving Home page)
    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      if (audio._interactionCleanup) {
        audio._interactionCleanup();
      }
      audioRef.current = null;
    };
  }, []);

  // Update volume and mute state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('puja_mart_flute_music_enabled', 'false');
    } else {
      // Play audio and update preference
      audio.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem('puja_mart_flute_music_enabled', 'true');
        })
        .catch((err) => {
          console.error('Failed to play audio:', err);
        });
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) {
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-end font-sans">
      {/* Player Interface Card */}
      <div 
        className={`flex items-center gap-3 transition-all duration-500 ease-in-out overflow-hidden h-14
          backdrop-blur-md bg-black/75 border border-gold/25 rounded-full px-3 shadow-[0_8px_32px_rgba(212,160,23,0.25)]
          ${isExpanded ? 'w-[280px] sm:w-[320px]' : 'w-14'}`}
      >
        {/* Toggle Button / Floating Disk Icon */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 cursor-pointer
            ${isPlaying 
              ? 'bg-gradient-to-r from-saffron to-gold border-gold text-dark-bg animate-[spin_8s_linear_infinite]' 
              : 'bg-white/5 border-gold/30 text-gold hover:border-gold hover:bg-gold/10'}`}
          title={isExpanded ? "Collapse Player" : "Divine Music Controls"}
        >
          <Music className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          
          {/* Animated Wave Indicator around collapsed button */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-saffron/40 animate-ping opacity-60 pointer-events-none" />
          )}
        </button>

        {/* Expanded Controls Row */}
        {isExpanded && (
          <div className="flex items-center justify-between w-full pr-1 animate-[fadeIn_0.3s_ease-out_forwards]">
            {/* Song Meta Info */}
            <div className="flex flex-col min-w-0 max-w-[100px] sm:max-w-[130px]">
              <span className="font-cinzel text-[10px] font-bold text-gold-bright truncate leading-tight uppercase tracking-wider">
                Divine Flute
              </span>
              <span className="font-cormorant text-[10px] text-cream/60 italic truncate leading-none mt-0.5">
                {isPlaying ? 'Playing Ambient...' : 'Paused'}
              </span>
            </div>

            {/* Play/Pause control */}
            <button
              onClick={handleTogglePlay}
              className="p-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-dark-bg transition cursor-pointer shrink-0"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            </button>

            {/* Volume Toggler & Slider */}
            <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l border-gold/10 ml-1">
              <button
                onClick={handleToggleMute}
                className="text-gold/80 hover:text-gold transition cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 rounded-lg bg-white/10 appearance-none cursor-pointer accent-gold outline-none"
                style={{
                  background: `linear-gradient(to right, #D4A017 0%, #D4A017 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.1) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
