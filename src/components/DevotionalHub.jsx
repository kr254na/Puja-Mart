import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Heart, Search, Volume2, ListMusic, Shuffle,SkipBack,SkipForward, Repeat, ChevronUp, ChevronDown } from 'lucide-react';

export default function DevotionalHub() {
  // --- Core State Variables ---
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  
  // --- Feature State Variables ---
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('devotional_favs')) || []);
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => JSON.parse(localStorage.getItem('devotional_recent')) || []);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isBarExpanded, setIsBarExpanded] = useState(false);

  const audioRef = useRef(null);

  // --- Dynamic Mock Data (Matching requested premium schema exactly) ---
  useEffect(() => {
    // Simulating Spring Boot GET /songs?keyword= dynamic query handling via fallback filter
    const baselineTracks = [
      { id: 't1', title: 'Shri Ganesh Ji Ki Aarti', deity: 'Traditional', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=150&auto=format&fit=crop&q=60', lyrics: "जय गणेश जय गणेश, जय गणेश देवा। माता जाकी पारवती, पिता महादेवा॥\nएकदन्त दयावन्त, चार भुजाधारी। माथे पर तिलक सोहे, मूसे की सवारी॥\nपान चढ़े फूल चढ़े, और चढ़े मेवा। लडुआन का भोग लगे, सन्त करें सेवा॥" },
      { id: 't2', title: 'Hanuman Chalisa (Vedic)', deity: 'Traditional', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=150&auto=format&fit=crop&q=60', lyrics: "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि। बरनऊँ रघुबर बिमल जसु, जो दायकु फल चारि॥\nबुद्धिहीन तनु जानिके, सुमिरौ पवन-कुमार। बल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥" },
      { id: 't3', title: 'Shiv Tandav Stotram', deity: 'Traditional', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=150&auto=format&fit=crop&q=60', lyrics: "जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम्॥\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम्॥" },
      { id: 't4', title: 'Madhurashtakam', deity: 'Traditional', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', cover: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?w=150&auto=format&fit=crop&q=60', lyrics: "अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम्।\nहृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम्॥" }
    ];

    const filtered = baselineTracks.filter(track => 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      track.deity.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSongs(filtered.length > 0 ? filtered : baselineTracks);
  }, [searchQuery]);

  // --- Real HTML5 Progress Audio Event Listeners ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIdx, songs, isShuffle, isRepeat]);

  // --- HTML5 Playback Lifecycle Triggers ---
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIdx]);

  const currentTrack = songs[currentTrackIdx];

  // --- Audio Utility Operations ---
  const handleTrackSelect = (idx) => {
    setCurrentTrackIdx(idx);
    setIsPlaying(true);
    
    // Manage Recently Played State (localStorage)
    const selected = songs[idx];
    if (selected) {
      const updatedRecent = [selected.title, ...recentlyPlayed.filter(t => t !== selected.title)].slice(0, 5);
      setRecentlyPlayed(updatedRecent);
      localStorage.setItem('devotional_recent', JSON.stringify(updatedRecent));
    }
  };

  const handleNextTrack = () => {
    if (isRepeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * songs.length);
      handleTrackSelect(randomIdx);
      return;
    }
    if (currentTrackIdx < songs.length - 1) {
      handleTrackSelect(currentTrackIdx + 1);
    } else {
      handleTrackSelect(0); // Queue loop back
    }
  };

  const handlePrevTrack = () => {
    if (currentTrackIdx > 0) {
      handleTrackSelect(currentTrackIdx - 1);
    } else {
      handleTrackSelect(songs.length - 1);
    }
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const toggleFavorite = (id) => {
    const updatedFavs = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
    setFavorites(updatedFavs);
    localStorage.setItem('devotional_favs', JSON.stringify(updatedFavs));
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-full min-h-screen text-cream pt-24 pb-32 px-4 md:px-12
     relative overflow-hidden">
      
      {/* Underlying Audio HTML5 Engine Node */}
      {currentTrack && (
        <audio 
          ref={audioRef}
          src={currentTrack.audioUrl}
        />
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN PANEL: Search, Interactive Lists, Queue, Recents (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Real-time Search Box Block (Spring Boot HTTP Proxy Layer Interface) */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
            <input 
              type="text"
              placeholder="🔍 Search devotional songs (e.g. Ganesh, Hanuman)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-gold/15 rounded-sm pl-12 pr-4 py-3 font-cinzel text-xs tracking-wider text-cream placeholder-cream/30 focus:outline-none focus:border-gold/40 transition-all"
            />
          </div>

          {/* Core Devotional List Queue */}
          <div className="border border-gold/15 bg-white/[0.01] rounded-sm p-4 backdrop-blur-md">
            <h3 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase mb-4 flex items-center gap-2">
              <ListMusic className="w-4 h-4" /> Devotional Track Queue
            </h3>
            
            <div className="space-y-2">
              {songs.map((song, idx) => (
                <div 
                  key={song.id}
                  className={`flex items-center justify-between p-3 border rounded-sm transition-all duration-300 ${
                    idx === currentTrackIdx 
                      ? 'bg-gold/10 border-gold/40' 
                      : 'bg-black/20 border-white/5 hover:border-gold/20'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0" onClick={() => handleTrackSelect(idx)}>
                    <img src={song.cover} alt={song.title} className="w-10 h-10 object-cover rounded-xs border border-gold/10 shrink-0" />
                    <div className="min-w-0">
                      <p className={`font-cinzel text-xs font-bold truncate tracking-wide ${idx === currentTrackIdx ? 'text-gold-bright' : 'text-cream'}`}>
                        {song.title}
                      </p>
                      <p className="font-sanskrit text-[9px] text-cream/40 uppercase tracking-widest mt-0.5">{song.deity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-mono text-[11px] text-cream/30">4:58</span>
                    <button 
                      onClick={() => toggleFavorite(song.id)}
                      className="text-gold/60 hover:text-gold transition cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(song.id) ? 'fill-gold text-gold' : 'text-gold/40'}`} />
                    </button>
                    <button 
                      onClick={() => handleTrackSelect(idx)}
                      className="w-7 h-7 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold hover:bg-gold hover:text-dark-bg transition-all cursor-pointer"
                    >
                      {idx === currentTrackIdx && isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current translate-x-0.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-Access Infrastructure: Recently Played Panels */}
          {recentlyPlayed.length > 0 && (
            <div className="border border-gold/10 bg-black/40 rounded-sm p-4">
              <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-cream/40 uppercase mb-3">Recently Played</h4>
              <div className="flex flex-wrap gap-2">
                {recentlyPlayed.map((title, i) => (
                  <span key={i} className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full font-cinzel text-[10px] text-cream/60">
                    📿 {title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN PANEL: Fixed Artwork Shell & Disconnected Lyric Streams (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Visual Display Shield */}
          <div className="border border-gold/15 bg-gradient-to-b from-white/[0.03] to-transparent rounded-sm p-6 flex flex-col items-center text-center backdrop-blur-xl">
            <div className="w-48 h-48 rounded-sm border border-gold/20 shadow-2xl overflow-hidden relative group mb-4">
              <img 
                src={currentTrack?.cover} 
                alt={currentTrack?.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            </div>

            <h3 className="font-cinzel text-sm font-bold text-gold-bright tracking-wide truncate max-w-full">{currentTrack?.title}</h3>
            <p className="font-sanskrit text-[10px] text-cream/40 tracking-widest uppercase mt-1">{currentTrack?.deity}</p>
            
            {/* Embedded Mini Context Controls for Fast Resets */}
            <div className="flex items-center gap-4 mt-4">
              <button onClick={handleRestart} className="p-2 border border-white/5 rounded-sm hover:bg-white/5 text-cream/60 hover:text-gold transition cursor-pointer" title="Restart Session">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[10px] text-gold/40 border border-gold/10 px-2 py-0.5 rounded-full bg-black/40">Real-Time Engine</span>
            </div>
          </div>

          {/* Dynamic Devotional Lyric Panel */}
          <div className="border border-gold/15 bg-black/40 rounded-sm p-6">
            <h4 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase pb-2 border-b border-white/5 mb-4">
              Sacred Lyrics / पाठावली
            </h4>
            <div className="font-sanskrit text-sm md:text-base text-cream/80 leading-relaxed text-center whitespace-pre-line max-h-48 overflow-y-auto pr-2 custom-scrollbar italic bg-black/30 p-4 rounded-sm border-l border-gold/30">
              {currentTrack?.lyrics}
            </div>
          </div>

        </div>
      </div>

      {/* --- TASK 14: PERSISTENT SPOTIFY-STYLE BOTTOM MUSIC BAR CONTAINER --- */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-[#090502]/95 border-t border-gold/20 backdrop-blur-xl transition-all duration-500 text-cream px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] ${isBarExpanded ? 'py-6 h-auto' : 'py-3 h-20 flex items-center'}`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 relative">
          
          {/* Expand/Collapse Toggle on Micro Devices */}
          <button 
            onClick={() => setIsBarExpanded(!isBarExpanded)}
            className="md:hidden absolute -top-8 right-4 bg-[#090502] border border-gold/20 border-b-0 p-1.5 rounded-t-md text-gold"
          >
            {isBarExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          {/* LEFT: Cover Frame & Metadata Cluster */}
          <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0 shrink-0">
            <img src={currentTrack?.cover} alt="" className="w-11 h-11 object-cover rounded-xs border border-gold/10 shrink-0 shadow-lg" />
            <div className="min-w-0">
              <h5 className="font-cinzel text-xs font-bold text-gold-bright truncate tracking-wide leading-none">{currentTrack?.title}</h5>
              <span className="font-sanskrit text-[9px] text-cream/40 tracking-widest uppercase mt-1 block leading-none">{currentTrack?.deity}</span>
            </div>
            <button 
              onClick={() => toggleFavorite(currentTrack?.id)}
              className="ml-2 text-gold/60 hover:text-gold transition cursor-pointer shrink-0"
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.includes(currentTrack?.id) ? 'fill-gold text-gold' : 'text-gold/30'}`} />
            </button>
          </div>

          {/* CENTER: Main Track Timeline & Play/Pause Loops */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4">
            {/* Playback Actions Loop Row */}
            <div className="flex items-center gap-5">
              <button 
                onClick={() => setIsShuffle(!isShuffle)} 
                className={`transition cursor-pointer ${isShuffle ? 'text-gold-bright drop-shadow-[0_0_8px_#D4AF37]' : 'text-cream/30 hover:text-cream'}`}
                title="Shuffle Queue"
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              <button onClick={handlePrevTrack} className="text-cream/50 hover:text-gold transition cursor-pointer">
                <SkipBack className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full bg-gold text-dark-bg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.25)] shrink-0"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-dark-bg" /> : <Play className="w-3.5 h-3.5 fill-dark-bg translate-x-0.5" />}
              </button>

              <button onClick={handleNextTrack} className="text-cream/50 hover:text-gold transition cursor-pointer">
                <SkipForward className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsRepeat(!isRepeat)} 
                className={`transition cursor-pointer ${isRepeat ? 'text-gold-bright drop-shadow-[0_0_8px_#D4AF37]' : 'text-cream/30 hover:text-cream'}`}
                title="Repeat Current Loop"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Real-Time Linear Scrubber Bar (No fake animation sets) */}
            <div className="flex items-center gap-3 w-full font-mono text-[10px] text-cream/30">
              <span className="w-8 text-right">{formatTime(currentTime)}</span>
              <div className="relative flex-1 group py-1 flex items-center">
                <input 
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const target = parseFloat(e.target.value);
                    audioRef.current.currentTime = target;
                    setCurrentTime(target);
                  }}
                  className="w-full h-1 accent-gold bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none" 
                />
                {/* Visual Tracker Bar Fill Underlay */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-gold via-gold-bright to-gold pointer-events-none rounded-l-lg opacity-80"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>
              <span className="w-8 text-left">{formatTime(duration)}</span>
            </div>
          </div>

          {/* RIGHT: Volume Range Input Node Adjusters */}
          <div className="hidden md:flex items-center justify-end gap-3 w-full md:w-1/4 shrink-0">
            <Volume2 className="w-4 h-4 text-gold/60 shrink-0" />
            <div className="relative group w-24 flex items-center">
              <input 
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  const targetVol = parseFloat(e.target.value);
                  setVolume(targetVol);
                  if (audioRef.current) audioRef.current.volume = targetVol;
                }}
                className="w-full h-1 accent-gold bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}