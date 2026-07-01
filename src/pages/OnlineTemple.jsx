import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, Heart, Disc, BookOpen, Calendar, Quote, Image as ImageIcon } from 'lucide-react';

export default function OnlineTemple() {
  const navigate = useNavigate();

  const mandirFeatures = [
    { icon: <Flame className="w-5 h-5 text-orange-400" />, label: 'Light Diya', desc: 'Ignite eternal flame' },
    { icon: <Sparkles className="w-5 h-5 text-pink-400" />, label: 'Offer Flowers', desc: 'Fresh ritual blossoms' },
    { icon: <Heart className="w-5 h-5 text-red-400" />, label: 'Digital Mala', desc: 'Keep track of daily Japa' },
    { icon: <Disc className="w-5 h-5 text-gold" />, label: 'Music Player', desc: 'Stream sacred Aartis' },
    { icon: <BookOpen className="w-5 h-5 text-amber-400" />, label: 'Aarti & Mantras', desc: 'Complete Vedic lyrics' },
    { icon: <Calendar className="w-5 h-5 text-emerald-400" />, label: 'Full Panchang', desc: 'Daily auspicious tithi' },
    { icon: <ImageIcon className="w-5 h-5 text-blue-400" />, label: 'Darshan Photos', desc: 'High-res deity vigrahas' },
    { icon: <Quote className="w-5 h-5 text-purple-400" />, label: 'Daily Quotes', desc: 'Spiritual consciousness' },
  ];

  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center relative z-10  py-20 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      
      {/* 🌌 Atmospheric Ultra Glow Backdrops positioned directly behind the text and feature grid columns */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(255,107,26,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen z-0" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.08)_0%,transparent_70%)] pointer-events-none mix-blend-screen z-0" />

      {/* BACKGROUND VECTOR DECORATION: Subtle Floating Majestic Mor Pankh */}
      <div className="absolute right-[-5%] top-[-10%] w-[45%] h-[120%] opacity-15 pointer-events-none select-none hidden lg:block filter drop-shadow-[0_0_30px_rgba(212,175,55,0.1)]">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 85 C 40 70, 48 50, 62 24" stroke="#D4AF37" strokeWidth="0.5" strokeLinecap="round" />
          <path d="M62 22 C50 10, 64 -2, 78 4 C90 12, 74 32, 62 22 Z" fill="#D4AF37" opacity="0.3" />
          <path d="M63 20 C53 13, 62 3, 72 9 C82 15, 68 27, 63 20 Z" fill="#007A87" opacity="0.4" />
          <path d="M65 17 C60 14, 64 7, 70 12 C74 16, 69 21, 65 17 Z" fill="#D43F00" opacity="0.5" />
        </svg>
      </div>

      {/* MAIN CONTAINER: Fully Responsive Full-Width Asymmetric Grid */}
      <div className="w-full max-w-[1920px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Cinematic Typographic Hero Panel (5 Columns) */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="badge">
            <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
            Nitya Upasana Portal
          </div>
          
          <h2 className="section-header-title">
            Step Into Our <br />
              Online Mandir
          </h2>
          
          <p className="section-header-description">
            A sanctuary designed for digital age devotion. Perform daily rituals, complete full panchang reviews, offer pristine flowers, and align your consciousness anywhere in the world.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/temple')}
              className="group/btn btn-filled"
            >
              Enter Sacred Space 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive High-End Glassmorphic Feature Grid (7 Columns) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mandirFeatures.map((item, i) => (
            <div 
              key={i}
              onClick={() => navigate('/temple')}
              className="group/item flex items-center gap-4 p-5 rounded-sm border border-white/[0.04] bg-gradient-to-r from-white/[0.03] to-white/[0.01] backdrop-blur-xl hover:border-gold/30 hover:from-gold/[0.04] hover:to-transparent hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_0_15px_rgba(212,175,55,0.05)] transition-all duration-500 cursor-pointer"
            >
              {/* Dynamic Icon Frame wrapper */}
              <div className="w-12 h-12 rounded-xs bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:border-gold/40 group-hover/item:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-500 shadow-inner">
                {item.icon}
              </div>

              {/* Text Meta Descriptions */}
              <div className="min-w-0">
                <h4 className="font-cinzel text-xs font-bold tracking-wider text-cream group-hover/item:text-gold-bright transition-colors duration-300">
                  {item.label}
                </h4>
                <p className="font-cormorant text-xs text-cream/40 italic group-hover/item:text-cream/60 transition-colors mt-0.5 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}