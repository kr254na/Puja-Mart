export default function CategoryCard({ cat, isWide }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-sm border cursor-pointer
        transition-all duration-500 hover:scale-[1.01] hover:border-gold/50
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        bg-gradient-to-br from-white/[0.03] to-white/[0.01] border-gold/15
        flex flex-col justify-between backdrop-blur-md
        ${isWide ? 'md:col-span-2 min-h-[260px]' : 'md:col-span-1 min-h-[230px]'} h-full`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)'
      }}
    >
      {/* Darkened Photo Layer */}
      {cat.bgImage && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <img 
            src={cat.bgImage} 
            alt="" 
            className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700 opacity-20 group-hover:opacity-35 mix-blend-luminosity filter brightness-[40%] contrast-[120%]"
          />
        </div>
      )}

      {/* Ambient Radial Glow */}
      <div 
        className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-40 group-hover:opacity-70 z-10"
        style={{
          background: `radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, transparent 70%)`
        }}     
      />
        
      {/* Backing Giant Icon Watermark */}
      {!cat.bgImage && (
        <div className="absolute -right-4 -bottom-4 text-[10rem] opacity-[0.05] select-none group-hover:scale-110 group-hover:opacity-[0.07] transition-all duration-700 pointer-events-none font-serif leading-none z-10">
          {cat.icon || "🕉️"}
        </div>
      )}

      <div className="relative w-full h-full flex flex-col justify-between p-6 z-20 flex-1 gap-6">
        
        {/* Top Content Block */}
        <div>
          <span className="text-3xl mb-3 filter drop-shadow-md select-none group-hover:scale-110 transition duration-300 w-fit block">
            {cat.icon || "🕉️"}
          </span>
          
          <h3 className="font-cinzel text-lg md:text-xl font-bold text-cream group-hover:text-gold-bright transition duration-300">
            {cat.nameEn}
          </h3>
          
          <p className="font-cormorant text-xs md:text-sm italic text-cream/60 group-hover:text-cream/80 transition duration-300 mt-1.5 max-w-md line-clamp-3">
            {cat.descEn}
          </p>
        </div>
        
        {/* Bottom Sticker Row */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-[2px] uppercase text-gold mt-auto pt-2">
          <span className="h-[1px] w-6 bg-gold" />
          <span>{cat.countEn}</span>
        </div>
      </div>
    </div>
  );
}