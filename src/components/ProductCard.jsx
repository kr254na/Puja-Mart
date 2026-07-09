import { Eye, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  
  const navigate = useNavigate();
  const hasPrice = product.price !== undefined && product.price !== null;

  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation(); 
    const message = `Hare Krishna! I am viewing your divine collection and would like to enquire about: ${product.nameEn}. Please confirm availability and shipping timelines.`;
    
    window.open(`https://wa.me/919554054732?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      className="group relative rounded-sm border border-gold/15 bg-gradient-to-br from-white/[0.03]
      to-white/[0.01] overflow-hidden flex flex-col justify-between h-full transition-all duration-500
      hover:border-gold/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md cursor-pointer"
    >
      
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/30 border-b border-gold/5">
        <img 
          src={product.image} 
          alt={product.nameEn}
          className="w-full h-full object-cover object-center group-hover:scale-105
          transition-transform duration-700 filter brightness-[90%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent
        to-transparent opacity-60" />
        
        {/* Unit Tag Badge */}
        {product.unit && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 font-mono text-[10px] bg-dark-bg/80
          text-cream/70 border border-gold/10 rounded-xs select-none">
            {product.unit}
          </span>
        )}
      </div>

      {/* Content Text Details Layer */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Title and Price Metric Line */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-cinzel text-sm font-bold text-cream group-hover:text-gold-bright transition duration-300 line-clamp-1">
              {product.nameEn}
            </h3>
            
            {/* Conditional Price Tag display */}
            {hasPrice ? (
              <span className="font-mono text-gold-bright font-bold text-xs bg-gold/10 px-1.5 py-0.5 rounded-sm shrink-0">
                ₹{product.price}
              </span>
            ) : (
              <span className="font-mono text-cream/40 font-medium text-[10px] border border-cream/10 px-1.5 py-0.5 rounded-sm shrink-0 tracking-wide uppercase">
                On Request
              </span>
            )}
          </div>
          
          <span className="font-sanskrit text-[11px] text-gold/40 block mt-0.5 tracking-wide">
            {product.nameHi}
          </span>
          
          <p className="font-cormorant text-xs italic text-cream/50 mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

                            <div className="absolute top-2 left-2">
                      <span className="badge font-cinzel text-[8px] tracking-wider px-2 py-0.5 border border-gold/20 bg-dark-bg/85 text-gold-bright">
                       Daily Use
                      </span>
                    </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          
          {/* Action 1: View Details */}
          <button
            className="btn-store-secondary"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Eye className="w-3.5 h-3.5 text-gold/70" />
            <span>Details</span>
          </button>

          {/* Action 2: Enquiry */}
          <button
            onClick={handleWhatsAppEnquiry}
            className="btn-store-primary group"
          >
            <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110" />
            <span>Enquire</span>
          </button>

        </div>
      </div>

    </div>
  );
}