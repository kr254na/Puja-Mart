import { Package, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react";

export default function Hero() {
  
    return(
        <section className="relative min-h-screen flex
        items-center justify-center overflow-hidden
        bg-radial-gradient from-gold/10 via-saffron/5 to-transparent pt-20 mb-10">
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full bg-saffron/6 filter blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full bg-gold/6 filter blur-[130px] pointer-events-none mix-blend-screen" />

      {/* Rotating SVG Sudarshana Chakra */}
<svg 
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[500px] md:w-[750px]
  h-[250px] sm:h-[500px] md:h-[750px] opacity-[0.06] animate-spin-chakra z-0 pointer-events-none animate-[spin-chakra_25s_linear_infinite]" 
  viewBox="0 0 500 500" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Outer Protective Boundary Ring */}
  <circle cx="250" cy="250" r="245" stroke="#D4A017" strokeWidth="0.5" strokeDasharray="4 4" />
  <circle cx="250" cy="250" r="235" stroke="#D4A017" strokeWidth="0.75" />
  <circle cx="250" cy="250" r="215" stroke="#D4A017" strokeWidth="0.5" />

  {/* The 10 Primary Sacred Blades (Serrated Outer Edge) */}
  <g fill="#D4A017" opacity="0.25">
    <polygon points="250,5 265,35 250,25 235,35" />
    <polygon points="394,52 386,85 376,72 364,81" />
    <polygon points="483,171 457,192 454,178 439,183" />
    <polygon points="452,333 422,339 423,325 410,316" />
    <polygon points="328,459 304,441 309,428 294,422" />
    <polygon points="172,459 196,441 191,428 206,422" />
    <polygon points="48,333 78,339 77,325 90,316" />
    <polygon points="17,171 43,192 46,178 61,183" />
    <polygon points="106,52 114,85 124,72 136,81" />
  </g>

  {/* Dynamic Intersecting Star Polygons representing weapons array */}
  <g stroke="#D4A017" strokeWidth="0.5" opacity="0.8">
    {/* Concentric Central Rings */}
    <circle cx="250" cy="250" r="170" strokeWidth="0.5" />
    <circle cx="250" cy="250" r="130" strokeWidth="0.5" />
    <circle cx="250" cy="250" r="90" strokeWidth="0.75" />
    <circle cx="250" cy="250" r="45" strokeWidth="0.5" />
    <circle cx="250" cy="250" r="15" strokeWidth="1" fill="#D4A017" fillOpacity="0.1" />

    {/* Primary Sharp Rays (Star Spikes Layer 1) */}
    <path d="M250,35 L435,220 L250,405 L65,220 Z" />
    {/* Transformed Ray Overlay (Star Spikes Layer 2) */}
    <path d="M342,72 L342,368 L158,368 L158,72 Z" transform="rotate(45 250 250)" />

    {/* Internal Structural Spokes Layout (Radiating Energy Lines) */}
    <line x1="250" y1="90" x2="250" y2="410" />
    <line x1="90" y1="250" x2="410" y2="250" />
    <line x1="137" y1="137" x2="363" y2="363" />
    <line x1="363" y1="137" x2="137" y2="363" />

    {/* Sub-Spokes Array */}
    <line x1="250" y1="130" x2="250" y2="370" strokeWidth="0.25" />
    <line x1="130" y1="250" x2="370" y2="250" strokeWidth="0.25" />
  </g>

  {/* Decorative Core Accents */}
  <g fill="#D4A017" opacity="0.4">
    <circle cx="250" cy="205" r="3" />
    <circle cx="250" cy="295" r="3" />
    <circle cx="205" cy="250" r="3" />
    <circle cx="295" cy="250" r="3" />
  </g>
</svg>
    
    {/* Hero Content */}
     <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        
        {/* Banner Badge */}
        <div className="inline-flex items-center gap-1.5 px-5 py-2 border border-gold/40
        rounded-full text-xs md:text-sm tracking-[3px] text-gold uppercase bg-gold/5 mt-12 mb-8
        animate-fade-in font-cinzel">
          <span>🪔</span> Authentically Indian, Divinely Crafted
        </div>

        {/* Hero Title */}
        <h1 className="font-cinzel text-3xl sm:text-5xl md:text-7xl font-black text-center tracking-wide leading-tight mb-6 bg-gradient-to-r from-gold-bright via-saffron to-cream bg-clip-text text-transparent shimmer-text">
           Bring the Sacred <br className="hidden md:block"/> Into Your Home
        </h1>

        {/* Sanskrit Subheading */}
        <div className="font-sanskrit text-lg md:text-2xl text-gold-bright/60 my-4 tracking-wider
        px-6 py-1">
          जय श्री बालाजी महाराज 
        </div>

        {/* Subtitle Description */}
        <p className="font-cormorant text-base md:text-xl text-cream/70 font-light
        leading-relaxed max-w-2xl mb-4">
          From rituals of joy to rites of passage — handpicked puja essentials,
          deity attire, sacred idols & ceremonial kits, delivered to your door.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10">
          <button className="px-8 py-3 bg-gradient-to-r from-gold-bright to-saffron 
          text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] 
          transition hover:scale-105 flex items-center justify-center gap-2 group 
          font-cinzel text-sm sm:text-base animate-fade-in-up">
             <span className="text-xl"><ShoppingCart size={24}/></span> Start Shopping
          </button>

          <button className="px-8 py-3 bg-transparent border border-gold/40 
          text-gold font-bold rounded-full hover:bg-gold/10 transition hover:scale-105
          flex items-center justify-center gap-2 group font-cinzel text-sm sm:text-base">
            <span className="text-xl"><Package size={24}/></span> View Kits
          </button>
        </div>

        {/* Trust Signals (Bottom Badges) */}
        <div className="flex items-center gap-6 mt-12 text-xs text-gold/70">
          <div className="flex items-center gap-2">
            <span className="text-lg"><Truck size={24}/></span>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg"><ShieldCheck size={24}/></span>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg"><RotateCcw size={24}/></span>
            <span>Easy Returns</span>
          </div>
        </div>

     </div>

        </section>
    );
}