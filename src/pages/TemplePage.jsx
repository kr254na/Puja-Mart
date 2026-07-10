import { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { 
  Flame, Sparkles, Disc, BookOpen, Calendar, 
  Send,
  Play, Pause, SkipForward, SkipBack,
  User, Trash2, ChevronDown
} from 'lucide-react';
import ToastContext from '../context/ToastContext';
import { DEITIES } from '../data/deityData';
import { DAILY_QUOTES } from '../data/quotesData';
import shankhSound from '../assets/audio/shankh.mp3';
import vedicDroneSound from '../assets/audio/vedic-drone.mp3';
import ganeshJiAarti from '../assets/audio/ganeshji-aarti.mp3';

export default function TemplePage() {
  const [activeDeityIdx, setActiveDeityIdx] = useState(0);
  const activeDeity = DEITIES[activeDeityIdx];
  
  // Destructure triggerToast from Context safely
  const contextValue = useContext(ToastContext);
  const triggerToast = contextValue?.triggerToast || (() => {});

  // --- Active Ritual Simulated States ---
  const [isDiyaLit, setIsDiyaLit] = useState(false);
  const [isDhoopLit, setIsDhoopLit] = useState(false);
  const [activeBhog, setActiveBhog] = useState(null); // 'laddu', 'peda', 'fruits', 'makhan'
  const [flowersList, setFlowersList] = useState([]);
  const [flowersAccumulated, setFlowersAccumulated] = useState([]);
  
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [bellLeftSwinging, setBellLeftSwinging] = useState(false);
  const [bellRightSwinging, setBellRightSwinging] = useState(false);
  const [isShankhBlowing, setIsShankhBlowing] = useState(false);
  const [isAbhishekActive, setIsAbhishekActive] = useState(false);
  const [waterDrops, setWaterDrops] = useState([]);

  // --- Japa Mala Counter States ---
  const [malaCount, setMalaCount] = useState(0);
  const [malaLaps, setMalaLaps] = useState(0);
  const [activeMantra, setActiveMantra] = useState(activeDeity.mantra);

  // --- Ambiance States ---
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const [isAartiMode, setIsAartiMode] = useState(false);

  // --- Music Player Core States ---
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  
  // --- Booking Pandit form State ---
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', pujaType: 'Satyanarayan Vrat', date: '', address: '' });

  const [isAnushthanOpen, setIsAnushthanOpen] = useState(false);
  const anusthanOptions = useMemo(() => [
    { value: 'Satyanarayan Vrat', label: 'Satyanarayan Vrat Katha' },
    { value: 'Griha Pravesh', label: 'Griha Pravesh' },
    { value: 'Vivah Sanskar', label: 'Vivah Sanskar' },
    { value: 'Maha Mrityunjaya', label: 'Maha Mrityunjaya Jaap' },
    { value: 'Ganesh Puja', label: 'Ganesh Puja' }
  ], []);

  const audioRef = useRef(null);
  const droneNodesRef = useRef([]);
  const droneCtxRef = useRef(null);

  const droneAudioRef = useRef(null);
  const shankhAudioRef = useRef(null);
  const activeAudioContextsRef = useRef([]);
  const lyricsContainerRef = useRef(null);
  const anushthanDropdownRef = useRef(null);

  // Synthesize Bell Sound (Ghanti Chime) using browser Web Audio API (Zero reliance on missing files)
  const synthesizeBellSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      activeAudioContextsRef.current.push(audioCtx);
      
      // Multiple oscillators for high metallic overtones
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1500, audioCtx.currentTime); // High chime pitch
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(2200, audioCtx.currentTime); // Metallic frequency

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5); // Smooth long decay

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 1.6);
      osc2.stop(audioCtx.currentTime + 1.6);

      audioCtx.onstatechange = () => {
        if (audioCtx.state === 'closed') {
          activeAudioContextsRef.current = activeAudioContextsRef.current.filter(ctx => ctx !== audioCtx);
        }
      };
    } catch (e) {
      console.warn("Web Audio API blocked by permission constraints.", e);
    }
  };

  // Synthesize Conch sound (Shankh Blast) 
  const synthesizeShankhSound = () => {
    if (shankhAudioRef.current) {
      try {
        shankhAudioRef.current.pause();
      } catch (e) {}
    }
    shankhAudioRef.current = new Audio(shankhSound);
    shankhAudioRef.current.play().catch(e => console.warn(e));
  };

  // Synthesize Abhishek liquid pouring and splash droplets using browser Audio Nodes
  const synthesizePouringSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      activeAudioContextsRef.current.push(audioCtx);
      const now = audioCtx.currentTime;
      
      // Generate multiple tiny splash bubbles over 2.5 seconds
      for (let i = 0; i < 28; i++) {
        const timeOffset = i * 0.09;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550 + Math.random() * 750, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(1100 + Math.random() * 400, now + timeOffset + 0.07);
        
        gainNode.gain.setValueAtTime(0, now + timeOffset);
        gainNode.gain.linearRampToValueAtTime(0.1, now + timeOffset + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.08);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.09);
      }

      audioCtx.onstatechange = () => {
        if (audioCtx.state === 'closed') {
          activeAudioContextsRef.current = activeAudioContextsRef.current.filter(ctx => ctx !== audioCtx);
        }
      };
    } catch (e) {
      console.warn(e);
    }
  };

  // Synthesize continuous, deep Vedic meditation drone (Tanpura sound)
  const startVedicDrone = () => {
    if (!droneAudioRef.current) {
      droneAudioRef.current = new Audio(vedicDroneSound);
      droneAudioRef.current.loop = true;
    }
    droneAudioRef.current.play()
      .then(() => {
        setIsDronePlaying(true);
        triggerToast("Meditation drone activated.");
      })
      .catch((e) => {
        console.error("Vedic drone play error:", e);
      });
  };

  const stopVedicDrone = () => {
    if (droneAudioRef.current) {
      try {
        droneAudioRef.current.pause();
        droneAudioRef.current.currentTime = 0;
      } catch (e) {}
    }
    if (droneNodesRef.current.length > 0) {
      droneNodesRef.current.forEach(({ osc, lfo }) => {
        try { osc.stop(); } catch(e){}
        try { lfo.stop(); } catch(e){}
      });
      droneNodesRef.current = [];
    }
    if (droneCtxRef.current) {
      try { droneCtxRef.current.close(); } catch(e){}
      droneCtxRef.current = null;
    }
    setIsDronePlaying(false);
    triggerToast("Meditation drone turned off.");
  };

  const playlist = [
    { id: 'track_1', title: 'Shri Banke Bihari Aarti', deity: 'Shri Krishna', audioUrl: ganeshJiAarti, lyrics: "श्री बांके बिहारी तेरी आरती गाऊं। हे गिरिधर तेरी आरती गाऊं॥\nआरती गाऊं प्यारे तुमको रिझाऊं। बांके बिहारी तेरी आरती गाऊं॥\nचरणों से निकसी गंगा प्यारी। जिसने सारी दुनिया तारी॥\nउन चरणों के दर्शन पाऊं। श्री बांके बिहारी तेरी आरती गाऊं॥" },
    { id: 'track_2', title: 'Shri Hanuman Chalisa', deity: 'Hanuman Ji', audioUrl: ganeshJiAarti, lyrics: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुं लोक उजागर॥\nरामदूत अतुलित बल धामा। अंजनि-पुत्र पवनसुत नामा॥\nमहाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥\nकंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥" },
    { id: 'track_3', title: 'Ganesh Chalisa Stotra', deity: 'Shri Ganesha', audioUrl: ganeshJiAarti, lyrics: `जय गणेश जय गणेश, जय गणेश देवा,
माता जाकी पार्वती, पिता महादेवा।
एक दंत दयावंत, चार भुजा धारी,
माथे सिंदूर सोहे, मूसे की सवारी।

जय गणेश जय गणेश, जय गणेश देवा।
माता जाकी पार्वती, पिता महादेवा।

पान चढ़े फल चढ़े, और चढ़े मेवा,
लड्डुअन का भोग लगे, संत करें सेवा।

जय गणेश जय गणेश, जय गणेश देवा,
माता जाकी पार्वती, पिता महादेवा।

अंधन को आंख देत, कोढ़िन को काया,
बांझन को पुत्र देत, निर्धन को माया।

जय गणेश जय गणेश, जय गणेश देवा,
माता जाकी पार्वती, पिता महादेवा।

'सूर' श्याम शरण आए, सफल कीजे सेवा,
माता जाकी पार्वती, पिता महादेवा।

जय गणेश जय गणेश, जय गणेश देवा,
माता जाकी पार्वती, पिता महादेवा।

दीनन की लाज रखो, शंभु सुतकारी,
कामना को पूर्ण करो, जाऊं बलिहारी।

जय गणेश जय गणेश, जय गणेश देवा,
माता जाकी पार्वती, पिता महादेवा।` }
  ];

  const currentTrack = playlist[currentTrackIdx];

  // Clean up all audio/sounds and setup click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anushthanDropdownRef.current && !anushthanDropdownRef.current.contains(event.target)) {
        setIsAnushthanOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      // Stop track player
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch (e) {}
      }

      // Stop drone audio
      if (droneAudioRef.current) {
        try {
          droneAudioRef.current.pause();
        } catch (e) {}
      }

      // Stop shankh audio
      if (shankhAudioRef.current) {
        try {
          shankhAudioRef.current.pause();
        } catch (e) {}
      }

      // Close all Web Audio Contexts
      if (activeAudioContextsRef.current) {
        activeAudioContextsRef.current.forEach(ctx => {
          try {
            if (ctx && ctx.state !== 'closed') {
              ctx.close();
            }
          } catch (e) {}
        });
        activeAudioContextsRef.current = [];
      }

      // Legacy drone clean up
      if (droneNodesRef.current.length > 0) {
        droneNodesRef.current.forEach(({ osc, lfo }) => {
          try { osc.stop(); } catch(e){}
          try { lfo.stop(); } catch(e){}
        });
      }
      if (droneCtxRef.current) {
        try { droneCtxRef.current.close(); } catch(e){}
      }
    };
  }, []);

  // Synchronise music track and Japa Mala with active deity selection
  useEffect(() => {
    let expectedTrackIdx = 0;
    if (activeDeity.id === 'krishna') expectedTrackIdx = 0;
    else if (activeDeity.id === 'balaji') expectedTrackIdx = 1;
    else if (activeDeity.id === 'ganesha') expectedTrackIdx = 2;

    if (currentTrackIdx !== expectedTrackIdx) {
      setCurrentTrackIdx(expectedTrackIdx);
    }
    setActiveMantra(activeDeity.mantra);
    setMalaCount(0);
  }, [activeDeityIdx]);

  // Synchronise lyrics scrolling with track playback time (performant direct scrolling)
  useEffect(() => {
    const container = lyricsContainerRef.current;
    if (container && duration > 0) {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScrollTop = scrollHeight - clientHeight;
      if (maxScrollTop > 0) {
        container.scrollTop = (currentTime / duration) * maxScrollTop;
      }
    }
  }, [currentTime, duration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIdx, isRepeat, isShuffle]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIdx]);

  // --- Active Ritual Dispatch Handlers ---
  const triggerBell = () => {
    setIsBellRinging(true);
    synthesizeBellSound();
    triggerToast("🔔 Main temple bell resounded!");
    setTimeout(() => setIsBellRinging(false), 800);
  };

  const triggerLeftBell = () => {
    setBellLeftSwinging(true);
    synthesizeBellSound();
    triggerToast("🔔 Left temple bell chimed!");
    setTimeout(() => setBellLeftSwinging(false), 800);
  };

  const triggerRightBell = () => {
    setBellRightSwinging(true);
    synthesizeBellSound();
    triggerToast("🔔 Right temple bell chimed!");
    setTimeout(() => setBellRightSwinging(false), 800);
  };

  const triggerShankh = () => {
    setIsShankhBlowing(true);
    synthesizeShankhSound();
    triggerToast("🐚 Shankh energy blast activated!");
    setTimeout(() => setIsShankhBlowing(false), 3000);
  };

  const triggerAbhishek = () => {
    if (isAbhishekActive) return;
    setIsAbhishekActive(true);
    synthesizePouringSound();
    triggerToast("🥛 Starting sacred Abhishek water pouring...");

    // Generate falling water drops centered above the deity
    const drops = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      left: 42 + Math.random() * 16,
      delay: i * 0.08,
      scale: 0.6 + Math.random() * 0.7
    }));
    setWaterDrops(drops);

    setTimeout(() => {
      setIsAbhishekActive(false);
      setWaterDrops([]);
      triggerToast("🕉️ Abhishek completed!");
    }, 3000);
  };

  const offerFlowerShower = () => {
    // 1. Generate visual cascading petals
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 1.5,
      type: Math.random() > 0.5 ? '🌸' : '🌹',
      scale: 0.8 + Math.random() * 0.8
    }));

    setFlowersList(prev => [...prev, ...newPetals]);
    triggerToast("🌸 Offered fresh pushpanjali!");

    // 2. Accumulate flower petals at the base of the deity
    const baseFlowers = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + 100 + i,
      left: 18 + Math.random() * 64,
      bottom: 8 + Math.random() * 6, // settle near bottom feet bounds
      type: Math.random() > 0.65 ? '🌼' : Math.random() > 0.3 ? '🌹' : '🌸',
      scale: 0.6 + Math.random() * 0.5,
      rotation: Math.floor(Math.random() * 360)
    }));

    setFlowersAccumulated(prev => {
      // Keep up to 35 flowers to prevent cluttering or rendering lag
      const combined = [...prev, ...baseFlowers];
      if (combined.length > 35) {
        return combined.slice(combined.length - 35);
      }
      return combined;
    });

    // Purge petal nodes from memory to prevent bloat
    setTimeout(() => {
      setFlowersList(prev => prev.filter(f => !newPetals.find(p => p.id === f.id)));
    }, 4500);
  };

  const clearAccumulatedFlowers = () => {
    setFlowersAccumulated([]);
    triggerToast("🧹 Altar cleansed (Nirmalya Visarjan).");
  };

  const toggleAartiMode = () => {
    if (!isAartiMode) {
      setIsAartiMode(true);
      setIsDiyaLit(true);
      setIsPlaying(true);
      // Auto play matching Aarti track if available
      const aartiIdx = playlist.findIndex(t => t.title.toLowerCase().includes('aarti') || t.title.toLowerCase().includes('chalisa'));
      if (aartiIdx !== -1) {
        let deityIdx = 0;
        if (aartiIdx === 0) deityIdx = 1; // Krishna
        else if (aartiIdx === 1) deityIdx = 0; // Balaji (Hanuman)
        else if (aartiIdx === 2) deityIdx = 2; // Ganesha
        setActiveDeityIdx(deityIdx);
        setCurrentTrackIdx(aartiIdx);
      }
      triggerToast("🕯️ Aarti Mode Enabled. Circular orbit and music active!");
    } else {
      setIsAartiMode(false);
      triggerToast("Aarti Mode Disabled.");
    }
  };

  const triggerMalaChant = () => {
    if (malaCount < 107) {
      setMalaCount(prev => prev + 1);
    } else {
      setMalaCount(0);
      setMalaLaps(prev => prev + 1);
      triggerToast("📿 Auspicious Japa Mala cycle completed (108 chants)!");
    }
    // Subtle physical tick audio representation
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      activeAudioContextsRef.current.push(audioCtx);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = 900;
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);

      audioCtx.onstatechange = () => {
        if (audioCtx.state === 'closed') {
          activeAudioContextsRef.current = activeAudioContextsRef.current.filter(ctx => ctx !== audioCtx);
        }
      };
    } catch(e){}
  };

  const handleNextTrack = () => {
    let nextTrackIdx = 0;
    if (isShuffle) {
      nextTrackIdx = Math.floor(Math.random() * playlist.length);
    } else if (currentTrackIdx < playlist.length - 1) {
      nextTrackIdx = currentTrackIdx + 1;
    } else {
      nextTrackIdx = 0;
    }
    
    let deityIdx = 0;
    if (nextTrackIdx === 0) deityIdx = 1; // Krishna
    else if (nextTrackIdx === 1) deityIdx = 0; // Balaji (Hanuman)
    else if (nextTrackIdx === 2) deityIdx = 2; // Ganesha

    setCurrentTrackIdx(nextTrackIdx);
    setActiveDeityIdx(deityIdx);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    let prevTrackIdx = 0;
    if (currentTrackIdx > 0) {
      prevTrackIdx = currentTrackIdx - 1;
    } else {
      prevTrackIdx = playlist.length - 1;
    }
    
    let deityIdx = 0;
    if (prevTrackIdx === 0) deityIdx = 1; // Krishna
    else if (prevTrackIdx === 1) deityIdx = 0; // Balaji (Hanuman)
    else if (prevTrackIdx === 2) deityIdx = 2; // Ganesha

    setCurrentTrackIdx(prevTrackIdx);
    setActiveDeityIdx(deityIdx);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePanditSubmit = (e) => {
    e.preventDefault();
    triggerToast(`🕉️ Puja booking details accepted. A certified Shastri will reach out shortly!`);
    setBookingForm({ name: '', phone: '', pujaType: 'Satyanarayan Vrat', date: '', address: '' });
  };

  const panchangDetails = {
    tithi: 'Shukla Paksha Ekadashi',
    nakshatra: 'Pushya (Highly Auspicious)',
    rahuKaal: '03:12 PM – 04:45 PM',
    muhurat: 'Abhijit Muhurat: 11:42 AM – 12:35 PM'
  };

  return (
    <div className="page-container">
      

      {/* Hidden Web Audio element for standard music formats */}
      {currentTrack && <audio ref={audioRef} src={currentTrack.audioUrl} />}

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* ================= LEFT SIDE: THE VIRTUAL GARBHAGRIHA (ALTAR STAGE) (5 Columns) ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Temple Altar Frame Block */}
          <div className="relative border-2 border-gold/30 bg-gradient-to-b from-[#1E0D03] to-[#040100] rounded-t-sm p-4 pt-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center">
            
            {/* Elegant Altar Temple Arch Frame decoration */}
            <div className="absolute top-0 inset-x-0 h-10 border-b border-gold/20 bg-black/50 flex items-center justify-center">
              <span className="font-cinzel text-[9px] sm:text-[10px] tracking-[5px] text-gold uppercase">।। श्री मन्दिरम् - नित्य उपासना ।।</span>
            </div>

            {/* Marigold Toran Garland */}
            <div className="absolute top-10 inset-x-0 h-6 flex justify-around items-start z-20 pointer-events-none overflow-hidden select-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-base leading-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {i % 2 === 0 ? '🌼' : '🌸'}
                  </span>
                  {i % 3 === 0 && <span className="text-[10px] -mt-1 opacity-90 leading-none">🍃</span>}
                </div>
              ))}
            </div>

            {/* Hanging Bells (Interactive & Swinging) */}
            <button 
              onClick={triggerLeftBell}
              className={`absolute top-12 left-6 z-30 transition-all origin-top cursor-pointer ${bellLeftSwinging ? 'animate-bell' : ''}`}
              title="Ring Left Bell"
            >
              <svg viewBox="0 0 100 100" className="w-9 h-9 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.7)]">
                <path d="M50 15 V25 M40 25 C40 25, 40 45, 30 55 H70 C60 45, 60 25, 60 25 Z" fill="#D4AF37" stroke="#FFF" strokeWidth="0.5" />
                <circle cx="50" cy="58" r="4" fill="#A37C24" />
              </svg>
            </button>

            <button 
              onClick={triggerBell}
              className={`absolute top-12 left-1/2 -translate-x-1/2 z-30 transition-all origin-top cursor-pointer ${isBellRinging ? 'animate-bell' : ''}`}
              title="Ring Main Bell"
            >
              <svg viewBox="0 0 100 100" className="w-11 h-11 filter drop-shadow-[0_3px_6px_rgba(212,175,55,0.7)]">
                <path d="M50 15 V25 M40 25 C40 25, 40 45, 30 55 H70 C60 45, 60 25, 60 25 Z" fill="#D4AF37" stroke="#FFF" strokeWidth="0.5" />
                <circle cx="50" cy="58" r="4" fill="#A37C24" />
              </svg>
            </button>

            <button 
              onClick={triggerRightBell}
              className={`absolute top-12 right-6 z-30 transition-all origin-top cursor-pointer ${bellRightSwinging ? 'animate-bell' : ''}`}
              title="Ring Right Bell"
            >
              <svg viewBox="0 0 100 100" className="w-9 h-9 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.7)]">
                <path d="M50 15 V25 M40 25 C40 25, 40 45, 30 55 H70 C60 45, 60 25, 60 25 Z" fill="#D4AF37" stroke="#FFF" strokeWidth="0.5" />
                <circle cx="50" cy="58" r="4" fill="#A37C24" />
              </svg>
            </button>

            {/* Abhishek Kalash Pot */}
            <button
              onClick={triggerAbhishek}
              className={`absolute top-11 left-20 z-30 transition-all duration-700 cursor-pointer ${isAbhishekActive ? 'rotate-[-45deg] -translate-y-2' : ''}`}
              title="Perform Abhishek"
            >
              <svg viewBox="0 0 100 100" className="w-9 h-9 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
                <path d="M30 40 C30 40, 20 60, 20 75 C20 85, 80 85, 80 75 C80 60, 70 40, 70 40 Z" fill="#B87333" stroke="#FFF" strokeWidth="0.5" />
                <ellipse cx="50" cy="40" rx="20" ry="6" fill="#A05A2C" />
                <path d="M48 34 C48 34, 45 15, 50 15 C55 15, 52 34, 52 34 Z" fill="#2E8B57" />
                <circle cx="50" cy="28" r="7" fill="#8B4513" />
              </svg>
            </button>

            {/* Micro Floating Floral Showers Overlay canvas */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
              {flowersList.map(petal => (
                <span
                  key={petal.id}
                  className="absolute text-xl animate-petal inline-block select-none"
                  style={{
                    left: `${petal.left}%`,
                    animationDelay: `${petal.delay}s`,
                    transform: `scale(${petal.scale})`
                  }}
                >
                  {petal.type}
                </span>
              ))}
            </div>

            {/* Abhishek Water Drop Streams */}
            {isAbhishekActive && (
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                {waterDrops.map(drop => (
                  <span
                    key={drop.id}
                    className="absolute text-blue-300 animate-water-drop inline-block select-none text-xs"
                    style={{
                      left: `${drop.left}%`,
                      top: '40px',
                      animationDelay: `${drop.delay}s`,
                      transform: `scale(${drop.scale})`,
                    }}
                  >
                    💧
                  </span>
                ))}
              </div>
            )}

            {/* Active Core Deity Image Frame */}
            <div className="w-full max-w-sm aspect-[4/5] rounded-xs overflow-hidden border border-gold/15 bg-black/40 relative shadow-2xl">
              
              {/* Left Column Pillar inside Frame */}
              <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-[#3A1E05] via-[#A8792A] to-[#1E0F02] border-r border-gold/30 shadow-[2px_0_8px_rgba(0,0,0,0.8)] z-20 flex flex-col justify-between py-8">
                <div className="w-full h-1 bg-gold/50 border-y border-gold-bright/30" />
                <div className="w-full h-2 bg-gold/10 border-y border-gold/30" />
                <div className="w-full h-1 bg-gold/50 border-y border-gold-bright/30" />
              </div>

              {/* Right Column Pillar inside Frame */}
              <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-[#3A1E05] via-[#A8792A] to-[#1E0F02] border-l border-gold/30 shadow-[-2px_0_8px_rgba(0,0,0,0.8)] z-20 flex flex-col justify-between py-8">
                <div className="w-full h-1 bg-gold/50 border-y border-gold-bright/30" />
                <div className="w-full h-2 bg-gold/10 border-y border-gold/30" />
                <div className="w-full h-1 bg-gold/50 border-y border-gold-bright/30" />
              </div>

              {activeDeity.id === 'balaji' ? (
                <img 
                  src={activeDeity.avatar} 
                  alt={activeDeity.nameEn} 
                  className="w-full h-full object-cover object-center filter contrast-[105%]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = activeDeity.fallbackBg;
                  }}
                />
              ) : (
                <img 
                  src={activeDeity.avatar} 
                  alt={activeDeity.nameEn} 
                  className="w-full h-full object-cover object-center filter contrast-[105%]"
                />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

              {/* Aarti Mode spotlight/glow overlay */}
              {isAartiMode && (
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xs mix-blend-color-dodge">
                  <div className="aarti-glow animate-glow-orbit" />
                </div>
              )}

              {/* Accumulated Flowers at Altar Feet */}
              <div className="absolute bottom-12 inset-x-0 h-10 pointer-events-none z-20">
                {flowersAccumulated.map(flower => (
                  <span
                    key={flower.id}
                    className="absolute select-none transition-all duration-500 ease-out text-sm"
                    style={{
                      left: `${flower.left}%`,
                      bottom: `${flower.bottom}%`,
                      transform: `scale(${flower.scale}) rotate(${flower.rotation}deg)`,
                    }}
                  >
                    {flower.type}
                  </span>
                ))}
              </div>

              {/* Dynamic Overlay 1: Diya Lighting flame graphics */}
              {isDiyaLit && (
                <div className={`absolute bottom-10 left-1/2 z-30 flex flex-col items-center select-none ${isAartiMode ? 'animate-plate-orbit' : '-translate-x-1/2'}`}>
                  {/* Flicker fire particle */}
                  <div className="w-4 h-8 rounded-full bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 animate-flicker origin-bottom filter drop-shadow-[0_0_6px_#FFD700]" />
                  {/* Brass clay base outline */}
                  <div className="w-10 h-3 rounded-b-full bg-gradient-to-r from-[#8A640F] to-[#5B430D] border-t border-[#D4AF37]/50 shadow-md" />
                </div>
              )}

              {/* Dynamic Overlay 2: Dhoop Smoke flowing wave particles */}
              {isDhoopLit && (
                <div className="absolute bottom-10 right-12 z-30 select-none flex flex-col items-center">
                  <div className="w-0.5 h-12 bg-[#5C4033] relative origin-bottom rotate-[-10deg]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-1 bg-[#8C7853] rounded-t-xs" />
                    {/* Animated vertical trailing waves */}
                    <div className="absolute top-[-35px] left-[-6px] text-xs font-mono tracking-widest text-white/100 uppercase select-none animate-smoke w-4 rotate-90 leading-none">~<br/>~<br/>~</div>
                  </div>
                </div>
              )}

              {/* Dynamic Overlay 3: Offered Bhog Plate */}
              {activeBhog && (
                <div className="absolute bottom-8 right-10 z-30 select-none flex flex-col items-center border border-gold/30 p-1 bg-black/85 backdrop-blur-md rounded-full shadow-2xl animate-fade-in">
                  <span className="text-lg">
                    {activeBhog === 'laddu' ? '🟡' : activeBhog === 'peda' ? '🫓' : activeBhog === 'fruits' ? '🍎' : '🥛'}
                  </span>
                </div>
              )}

              {/* Deity Title label footer overlay */}
              <div className="absolute bottom-3 inset-x-5 text-center z-10">
                <h2 className="font-cinzel text-xs sm:text-sm font-bold text-gold-bright tracking-wide drop-shadow">{activeDeity.nameEn}</h2>
                <span className="font-sanskrit text-[9px] text-cream/60 tracking-wider block mt-0.5 leading-none">{activeDeity.nameHi}</span>
              </div>
            </div>

            {/* 3D Brass Altar Base Shelf */}
            <div className="w-full max-w-sm h-4 bg-gradient-to-b from-[#B8860B] via-[#D4AF37] to-[#8B6508] border-x border-b border-gold-bright/30 rounded-b-xs shadow-[0_8px_16px_rgba(0,0,0,0.6)] relative z-20 flex items-center justify-around px-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-bright/35 border border-gold-bright/50" />
              <div className="w-20 h-0.5 bg-black/35" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold-bright/35 border border-gold-bright/50" />
            </div>

            {/* Quick Interactive offerings trigger Rack */}
            <div className="w-full max-w-sm mt-6 grid grid-cols-5 gap-2">
              <button 
                onClick={() => setIsDiyaLit(!isDiyaLit)}
                className={`flex flex-col items-center justify-center p-2 rounded border cursor-pointer transition ${isDiyaLit ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-white/[0.01] border-white/5 text-cream/50 hover:border-gold/30'}`}
                title="Light Altar Diya"
              >
                <Flame className={`w-4.5 h-4.5 ${isDiyaLit ? 'animate-bounce' : ''}`} />
                <span className="font-cinzel text-[8px] font-bold mt-1 uppercase tracking-wider">Diya</span>
              </button>

              <button 
                onClick={() => setIsDhoopLit(!isDhoopLit)}
                className={`flex flex-col items-center justify-center p-2 rounded border cursor-pointer transition ${isDhoopLit ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-white/[0.01] border-white/5 text-cream/50 hover:border-gold/30'}`}
                title="Light Incense/Dhoop"
              >
                <span className="text-sm">🪵</span>
                <span className="font-cinzel text-[8px] font-bold mt-1 uppercase tracking-wider">Dhoop</span>
              </button>

              <button 
                onClick={offerFlowerShower}
                className="flex flex-col items-center justify-center p-2 rounded border border-white/5 bg-white/[0.01] text-cream/50 hover:border-gold/30 cursor-pointer transition"
                title="Offer Pushpanjali"
              >
                <Sparkles className="w-4.5 h-4.5 text-pink-400" />
                <span className="font-cinzel text-[8px] font-bold mt-1 uppercase tracking-wider">Flowers</span>
              </button>

              <button 
                onClick={triggerBell}
                className={`flex flex-col items-center justify-center p-2 rounded border border-white/5 bg-white/[0.01] text-cream/50 hover:border-gold/30 cursor-pointer transition ${isBellRinging ? 'scale-90 border-gold' : ''}`}
                title="Ring Ghanti"
              >
                <span className="text-sm">🔔</span>
                <span className="font-cinzel text-[8px] font-bold mt-1 uppercase tracking-wider">Bell</span>
              </button>

              <button 
                onClick={triggerShankh}
                className={`flex flex-col items-center justify-center p-2 rounded border border-white/5 bg-white/[0.01] text-cream/50 hover:border-gold/30 cursor-pointer transition ${isShankhBlowing ? 'scale-90 border-gold' : ''}`}
                title="Blow Sacred Shankh"
              >
                <span className="text-sm">🐚</span>
                <span className="font-cinzel text-[8px] font-bold mt-1 uppercase tracking-wider">Shankh</span>
              </button>
            </div>

            {/* Bhog Selection Drawer Shelf */}
            <div className="w-full max-w-sm border-t border-gold/10 mt-5 pt-4">
              <span className="font-cinzel text-[9px] uppercase tracking-[2px] text-gold/60 block text-center mb-2">✦ Offer Bhog / नैवेद्य ✦</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'laddu', emoji: '🟡', label: 'Laddu' },
                  { id: 'peda', emoji: '🫓', label: 'Peda' },
                  { id: 'fruits', emoji: '🍎', label: 'Fruits' },
                  { id: 'makhan', emoji: '🥛', label: 'Makhan' }
                ].map(food => (
                  <button
                    key={food.id}
                    onClick={() => {
                      setActiveBhog(food.id);
                      triggerToast(`Prasad Offered: Accepted ${food.label}!`);
                    }}
                    className={`p-1.5 rounded-sm border text-center transition cursor-pointer select-none flex flex-col items-center justify-center ${activeBhog === food.id ? 'border-gold bg-gold/10 text-gold-bright' : 'border-white/5 bg-white/[0.01] text-cream/60 hover:border-gold/20'}`}
                  >
                    <span className="text-base">{food.emoji}</span>
                    <span className="font-cormorant text-[9px] italic mt-0.5 whitespace-nowrap">{food.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Deity Selector Slider Cards panel */}
          <div className="border border-gold/15 bg-black/40 p-4 rounded-sm">
            <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-gold/60 uppercase mb-3 text-center">Select Deity for Altar Worship</h4>
            <div className="grid grid-cols-3 gap-2">
              {DEITIES.map((deity, idx) => (
                <button
                  key={deity.id}
                  onClick={() => {
                    setActiveDeityIdx(idx);
                    setActiveBhog(null);
                    setIsDiyaLit(false);
                    setIsDhoopLit(false);
                    setIsAartiMode(false);
                    triggerToast(`Now tuning worship altar to: ${deity.nameEn}`);
                  }}
                  className={`p-2 border rounded-sm transition cursor-pointer text-center flex flex-col items-center justify-between ${idx === activeDeityIdx ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/[0.01] opacity-60 hover:opacity-100'}`}
                >
                  <span className="text-xl mb-1">🕉️</span>
                  <span className="font-cinzel text-[8px] font-bold tracking-wider leading-tight text-cream line-clamp-2">{deity.nameEn.replace('Shri ', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sacred Ambiance Controls */}
          <div className="border border-gold/15 bg-gradient-to-r from-[#1E0F02] to-black p-4 rounded-sm">
            <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-gold/60 uppercase mb-3 text-center">
              🕉️ Sacred Altar Ambiance
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-cream font-medium block">Vedic Meditation Drone</span>
                  <span className="text-[10px] text-cream/40 font-cormorant italic">Synthesized Tanpura & OM vibration</span>
                </div>
                <button
                  onClick={isDronePlaying ? stopVedicDrone : startVedicDrone}
                  className={`px-3 py-1.5 rounded-sm border font-cinzel text-[9px] uppercase tracking-wider transition cursor-pointer ${isDronePlaying ? 'bg-gold text-dark-bg border-gold font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'border-white/10 bg-white/[0.02] text-cream/70 hover:border-gold/30'}`}
                >
                  {isDronePlaying ? 'Stop Drone' : 'Turn On'}
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <div>
                  <span className="text-xs text-cream font-medium block">Aarti Mode</span>
                  <span className="text-[10px] text-cream/40 font-cormorant italic">Circular plate orbit + lighting glow</span>
                </div>
                <button
                  onClick={toggleAartiMode}
                  className={`px-3 py-1.5 rounded-sm border font-cinzel text-[9px] uppercase tracking-wider transition cursor-pointer ${isAartiMode ? 'bg-orange-500 text-cream border-orange-500 font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'border-white/10 bg-white/[0.02] text-cream/70 hover:border-gold/30'}`}
                >
                  {isAartiMode ? 'Active' : 'Start'}
                </button>
              </div>

              {flowersAccumulated.length > 0 && (
                <div className="flex items-center justify-between border-t border-white/5 pt-3 animate-fade-in">
                  <div>
                    <span className="text-xs text-cream font-medium block">Nirmalya Cleansing</span>
                    <span className="text-[10px] text-cream/40 font-cormorant italic">Clear offered flowers from feet</span>
                  </div>
                  <button
                    onClick={clearAccumulatedFlowers}
                    className="px-3 py-1.5 rounded-sm border border-white/10 bg-white/[0.02] text-cream/75 font-cinzel text-[9px] uppercase tracking-wider hover:border-gold/30 hover:bg-gold/5 transition cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3 text-red-400" /> Clean Altar
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE: JAPA MALA, PANCHANG, AUDIO, & SERVICE REGISTRY (7 Columns) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Row Segment 1: Japa Mala Engine & Auspicious Panchang Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* 📿 Dynamic Japa Mala Chanting Counter Dashboard */}
            <div className="border border-gold/15 bg-gradient-to-br from-white/[0.03] to-transparent p-5 rounded-sm flex flex-col justify-between h-full min-h-[300px]">
              <div>
                <h3 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase border-b border-gold/10 pb-2 mb-4">
                  📿 Japa Mala Counter
                </h3>
                
                {/* Active Mantra Reading Block */}
                <div className="bg-black/30 p-3 rounded-xs border border-white/5 text-center mb-4 min-h-[70px] flex items-center justify-center">
                  <p className="font-sanskrit text-sm md:text-base text-cream/90 leading-relaxed italic">
                    {activeMantra}
                  </p>
                </div>

                {/* Dial tracker information */}
                <div className="flex justify-around items-center text-center my-4 font-cinzel">
                  <div>
                    <span className="text-[10px] text-cream/40 uppercase tracking-widest block">Chants</span>
                    <span className="text-xl font-bold font-mono text-gold-bright">{malaCount} <span className="text-[10px] text-cream/20">/ 108</span></span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <span className="text-[10px] text-cream/40 uppercase tracking-widest block">Laps Done</span>
                    <span className="text-xl font-bold font-mono text-gold-bright">{malaLaps}</span>
                  </div>
                </div>
              </div>

              {/* Core Tap Trigger Button */}
              <button
                onClick={triggerMalaChant}
                className="w-full py-3.5 bg-gradient-to-r from-gold via-gold-bright to-gold border border-gold text-dark-bg font-cinzel text-xs font-black tracking-widest uppercase rounded-xs hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:scale-[1.01] transition-all duration-300 cursor-pointer text-center"
              >
                Chant (Tap Bead)
              </button>
            </div>

            {/* 🗓 Real-Time Vedic Panchang & Festival Calendar Details */}
            <div className="border border-gold/15 bg-gradient-to-br from-white/[0.03] to-transparent p-5 rounded-sm min-h-[300px] flex flex-col justify-between">
              <div>
                <h3 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase border-b border-gold/10 pb-2 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Vedic Panchang Today
                </h3>

                <div className="space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-cinzel text-[10px] text-cream/40 uppercase tracking-wider">Auspicious Tithi</span>
                    <span className="text-cream font-medium">{panchangDetails.tithi}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-cinzel text-[10px] text-cream/40 uppercase tracking-wider">Nakshatra Node</span>
                    <span className="text-cream font-medium">{panchangDetails.nakshatra}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-cinzel text-[10px] text-cream/40 uppercase tracking-wider">Rahu Kaal Period</span>
                    <span className="text-red-400 font-medium">{panchangDetails.rahuKaal}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-cinzel text-[10px] text-cream/40 uppercase tracking-wider">Shubh Muhurat</span>
                    <span className="text-emerald-400 font-medium">{panchangDetails.muhurat}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Quote panel footer anchor */}
              <div className="pt-4 border-t border-white/5 italic font-cormorant text-xs text-cream/40 text-center">
                Vedic calculations anchored to active region coordinates.
              </div>
            </div>

          </div>

          {/* Row Segment 2: Persistent Bottom Audio Player Display & Lyrics Sheet */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Lyrics Scrollable Column Panel (5 Columns) */}
            <div className="md:col-span-5 border border-gold/15 bg-black/40 rounded-sm p-5 flex flex-col justify-between min-h-[280px]">
              <h4 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase pb-2 border-b border-white/5 mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Sacred Lyrics
              </h4>
              <div 
                ref={lyricsContainerRef}
                className="font-sanskrit text-xs md:text-sm text-cream/80 leading-relaxed text-center whitespace-pre-line max-h-44 overflow-y-auto pr-2 custom-scrollbar italic bg-black/20 p-3 rounded-xs border-l border-gold/20 flex-1"
              >
                {currentTrack?.lyrics}
              </div>
            </div>

            {/* Dedicated Player Artwork Console (7 Columns) */}
            <div className="md:col-span-7 border border-gold/15 bg-gradient-to-b from-white/[0.02] to-transparent p-5 rounded-sm flex flex-col justify-between min-h-[280px]">
              <div>
                <h4 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase pb-2 border-b border-white/5 mb-4 flex items-center gap-2">
                  <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} /> Live Devotional Deck
                </h4>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xs border border-gold/20 bg-gold/5 flex items-center justify-center text-gold shadow-lg shrink-0">
                    <span className="text-2xl animate-pulse">🕉️</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="font-cinzel text-sm font-bold text-cream truncate tracking-wide">{currentTrack?.title}</h5>
                    <span className="font-sanskrit text-[9px] text-cream/40 tracking-widest uppercase mt-1 block leading-none">{currentTrack?.deity}</span>
                  </div>
                </div>

                {/* Core Playback Control Row */}
                <div className="flex items-center justify-center gap-6 my-2">
                  <button onClick={handlePrevTrack} className="text-cream/50 hover:text-gold transition cursor-pointer">
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-gold text-dark-bg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.2)]"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-dark-bg" /> : <Play className="w-4 h-4 fill-dark-bg translate-x-0.5" />}
                  </button>

                  <button onClick={handleNextTrack} className="text-cream/50 hover:text-gold transition cursor-pointer">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="flex items-center gap-3 w-full font-mono text-[9px] text-cream/40 pt-4 border-t border-white/5">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold outline-none"
                />
                <span>{formatTime(duration)}</span>
              </div>
            </div>

          </div>

          {/* Row Segment 3: Complete Book a Pandit Ritual Service Form (Full Width) */}
          <div className="border border-gold/15 bg-gradient-to-r from-[#110601] to-[#040100] p-6 rounded-sm shadow-2xl relative overflow-hidden">
            
            <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-saffron/5 rounded-full filter blur-xl pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gold/10 pb-4 mb-6">
              <div>
                <h3 className="font-cinzel text-sm font-bold tracking-wider text-gold-bright uppercase flex items-center gap-2">
                  <User className="w-4 h-4 text-saffron" /> Book Verified Pandit Ji Service
                </h3>
                <p className="font-cormorant text-xs text-cream/50 italic mt-0.5">Bring absolute scriptural sanctity into your housewarming, wedding, or fast rituals.</p>
              </div>
              <span className="font-mono text-[9px] px-2.5 py-0.5 bg-saffron/10 border border-saffron/20 text-saffron rounded-full uppercase tracking-wider">Shastri Network</span>
            </div>

            {/* Pandit Reservation Input forms */}
            <form onSubmit={handlePanditSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-3 space-y-1">
                <label className="font-cinzel text-[9px] tracking-wider text-cream/40 block uppercase">Devotee Name</label>
                <input 
                  type="text" 
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  placeholder="Enter full name" 
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-xs p-2.5 text-xs text-cream focus:outline-none transition" 
                />
              </div>

              <div className="lg:col-span-3 space-y-1">
                <label className="font-cinzel text-[9px] tracking-wider text-cream/40 block uppercase">Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  placeholder="10-digit number" 
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-xs p-2.5 text-xs text-cream focus:outline-none transition" 
                />
              </div>

              <div ref={anushthanDropdownRef} className="lg:col-span-3 space-y-1 relative">
                <label className="font-cinzel text-[9px] tracking-wider text-cream/40 block uppercase">Select Anusthan</label>
                <button
                  type="button"
                  onClick={() => setIsAnushthanOpen(!isAnushthanOpen)}
                  className="w-full flex items-center justify-between gap-3 border border-gold/15 bg-white/[0.01] hover:border-gold/30 px-3 py-2.5 rounded-sm text-cream font-cinzel text-[11px] tracking-wider transition cursor-pointer select-none"
                >
                  <span>
                    {anusthanOptions.find(opt => opt.value === bookingForm.pujaType)?.label || bookingForm.pujaType}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gold/60 transition-transform duration-300 ${isAnushthanOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAnushthanOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-1 bg-[#090604]/98 border border-gold/20 rounded-sm shadow-2xl p-1 flex flex-col gap-0.5 animate-fadeIn backdrop-blur-md max-h-60 overflow-y-auto">
                    {anusthanOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setBookingForm({ ...bookingForm, pujaType: option.value });
                          setIsAnushthanOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-sm font-cinzel text-[10px] tracking-wider text-left transition ${
                          bookingForm.pujaType === option.value
                            ? 'bg-gold/10 text-gold-bright font-bold'
                            : 'text-cream/60 hover:bg-white/[0.02] hover:text-cream cursor-pointer'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-3 space-y-1 flex flex-col justify-end">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-gold to-[#B8860B] border border-gold text-dark-bg font-cinzel text-[10px] font-black tracking-widest uppercase rounded-xs hover:shadow-[0_4px_15px_rgba(212,175,55,0.2)] transition duration-300 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3 h-3" /> Book Pandit
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>

      {/* ================= BACKGROUND RITUAL QUOTE BANNER GRID ================= */}
      <div className="max-w-[1920px] mx-auto mt-16 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {DAILY_QUOTES.map((quote, i) => (
          <div key={i} className="border border-gold/10 bg-white/[0.01] p-5 rounded-sm text-center flex flex-col justify-between min-h-[140px]">
            <span className="font-sanskrit text-sm text-gold-bright/60 block leading-relaxed italic">{quote.sanskrit}</span>
            <div className="mt-3">
              <p className="font-cormorant text-xs text-cream/50 leading-relaxed">"{quote.translation}"</p>
              <span className="font-cinzel text-[8px] text-cream/30 tracking-widest block uppercase mt-2">{quote.source}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}