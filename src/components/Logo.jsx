export default function Logo({ className = "h-14" }) {
  return (
    <div className={className}>
      {/* High-End Structural SVG Frame */}
       <svg 
        viewBox="0 0 100 100" 
        className="h-full aspect-square"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hyper-Polished Metallic Gold Gradient */}
          <linearGradient id="ultraGold" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A3104" />   {/* Deepest Core Shadow */}
            <stop offset="20%" stopColor="#A37C24" />  {/* Antique Brass Tone */}
            <stop offset="45%" stopColor="#D4AF37" />  {/* True Master Gold */}
            <stop offset="55%" stopColor="#FFFDF4" />  {/* Intense Specular Highlight */}
            <stop offset="65%" stopColor="#EAD07B" />  {/* Polished Middle Shimmer */}
            <stop offset="100%" stopColor="#8A640F" /> {/* Rich Gold Edge */}
          </linearGradient>

          {/* Saffron / Sindoor Accent Gradient for Tassels */}
          <linearGradient id="saffronCore" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B1A" />
            <stop offset="50%" stopColor="#E63900" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>

          {/* Specular Drop Glow Filter for Elite Glassmorphism */}
          <filter id="ultraGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#D4AF37" floodOpacity="0.3" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#FF5500" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* 1. Perfect Geometric Luxury Border Halo */}
        <g filter="url(#ultraGlow)">
          <circle cx="50" cy="50" r="43" stroke="url(#ultraGold)" strokeWidth="1.25" opacity="0.85" />
          <circle cx="50" cy="50" r="39" stroke="url(#ultraGold)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
        </g>

        {/* 2. MAIN CORE: The Diagonal Bansuri of Banke Bihari Ji */}
        <g filter="url(#ultraGlow)">
          
          {/* The Flute Shaft - Angled at a perfect 30-degree dynamic incline */}
          <path 
            d="M24 71 L76 29" 
            stroke="url(#ultraGold)" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />

          {/* Micro Shadow Inset Line inside Flute to give it cylindrical 3D depth */}
          <path 
            d="M25 70.2 L75 29.8" 
            stroke="#2D1E02" 
            strokeWidth="0.5" 
            opacity="0.4" 
          />

          {/* Sharp Metallic Grip Rings (Thread wraps around the flute) */}
          {/* Left / Base Node Ring */}
          <path d="M29.5 68.5 L31.5 71" stroke="#3A2501" strokeWidth="1" />
          <path d="M31.5 67 L33.5 69.5" stroke="#3A2501" strokeWidth="1" />
          
          {/* Right / Tip Node Ring */}
          <path d="M68.5 37 L70.5 39.5" stroke="#3A2501" strokeWidth="1" />

          {/* Masterfully Aligned Sound Holes (Precisely follows the diagonal vector math) */}
          {[
            { x: 42, y: 56.5 },
            { x: 46.5, y: 53 },
            { x: 51, y: 49.5 },
            { x: 55.5, y: 46 },
            { x: 60, y: 42.5 }
          ].map((hole, idx) => (
            <circle 
              key={idx} 
              cx={hole.x} 
              cy={hole.y} 
              r="0.8" 
              fill="#1F1301" 
              stroke="url(#ultraGold)" 
              strokeWidth="0.25" 
            />
          ))}

          {/* 3. Dynamic Hanging Sacred Ornaments (Dripping Pearl Tassels) */}
          {/* Pearl String 1 */}
          <path 
            d="M71.5 34.5 C 72 44, 68 50, 68 56" 
            stroke="url(#ultraGold)" 
            strokeWidth="0.75" 
            fill="none" 
            strokeLinecap="round"
          />
          <circle cx="68" cy="57.5" r="1.5" fill="url(#saffronCore)" />
          
          {/* Pearl String 2 (Slightly longer, creating beautiful asymmetrical overlap) */}
          <path 
            d="M73 33.2 C 75 45, 73 53, 73 60" 
            stroke="url(#ultraGold)" 
            strokeWidth="0.75" 
            fill="none" 
            strokeLinecap="round"
          />
          <circle cx="73" cy="61.8" r="1.5" fill="url(#ultraGold)" />
          {/* Final Hanging Silk Droplet */}
          <path d="M73 63.3 L73 67" stroke="url(#saffronCore)" strokeWidth="1" strokeLinecap="round" />

        </g>
      </svg>
    </div>
  );
}