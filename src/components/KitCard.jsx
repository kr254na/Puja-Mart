import { ShoppingBag, Eye } from 'lucide-react';

export default function KitCard({ kit }) {
  
  // Fires WhatsApp API query with pre-filled structural order text
  const handleWhatsAppOrder = (e) => {
    e.stopPropagation(); // Prevents triggering card click event
    const message = `Hare Krishna! I am interested in ordering the sacred bundle: ${kit.nameEn}. Please verify availability and delivery timelines.`;
    window.open(`https://wa.me/919554054732?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className="group relative rounded-sm border border-gold/15 bg-gradient-to-br 
      from-white/[0.03] to-white/[0.01] overflow-hidden flex flex-col justify-between 
      h-full transition-all duration-500 hover:border-gold/40 backdrop-blur-md 
      hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      
      {/* Top Graphic Header Cover with Badge Tag */}
      <div className="relative h-48 w-full overflow-hidden bg-black/40">
        <img 
          src={kit.bgImage} 
          alt={kit.nameEn}
          className="w-full h-full object-cover object-center group-hover:scale-105
          transition-transform duration-700 filter brightness-[85%] contrast-[105%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
        
        {/* Ribbon Tag Banner */}
        <span className="absolute top-3 left-3 px-2.5 py-0.5 font-cinzel text-[9px] tracking-widest
        uppercase bg-gold text-dark-bg font-bold rounded-xs shadow-md">
          {kit.tag}
        </span>
      </div>

      {/* Main Content Layout Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-5 relative z-10">
        <div>
          {/* Title & Starting Price Row */}
          <div className="flex justify-between items-start gap-3">
            <div>
              <h3 className="font-cinzel text-base md:text-lg font-bold text-cream 
              group-hover:text-gold-bright transition duration-300">
                {kit.nameEn}
              </h3>
              <span className="font-sanskrit text-xs text-gold/40 block mt-0.5 tracking-wider">
                {kit.nameHi}
              </span>
            </div>
            
            {/* UPDATED: Starting Price label presentation */}
            <div className="flex flex-col items-end shrink-0">
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/40
              leading-none mb-0.5">Starting From</span>
              <span className="font-mono text-gold-bright font-bold text-sm bg-gold/10
              px-2 py-0.5 rounded-sm">
                ₹{kit.price}
              </span>
            </div>
          </div>
          
          <p className="font-cormorant text-xs md:text-sm italic text-cream/60 mt-3 line-clamp-3">
            {kit.description}
          </p>
        </div>

        {/* Dual-Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          
          {/* View Details Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="btn-store-secondary"
          >
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>

          {/* WhatsApp Order Action Button */}
          <button
            onClick={handleWhatsAppOrder}
            className="btn-store-primary group"
          >
            <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110" />
            Order Kit
          </button>

        </div>
      </div>

    </div>
  );
}