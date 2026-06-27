import { Eye, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onViewDetails, onAddToCart }) {
  
  const hasPrice = product.price !== undefined && product.price !== null;

  return (
    <div className="group relative rounded-sm border border-gold/15
    bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden flex flex-col
    justify-between h-full transition-all duration-500 hover:border-gold/40
    hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-md">
      
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-black/30 border-b border-gold/5">
        <img 
          src={product.image} 
          alt={product.nameEn}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[90%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        
        {/* Quantity/Unit Tag Badge */}
        {product.unit && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 font-mono text-[10px] bg-dark-bg/80 text-cream/70 border border-gold/10 rounded-xs select-none">
            {product.unit}
          </span>
        )}
      </div>

      {/* Content Body Layout Area */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Title and Price Row */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-cinzel text-sm font-bold text-cream group-hover:text-gold-bright transition duration-300 line-clamp-1">
              {product.nameEn}
            </h3>
            
            {/* Conditional Price Presentation Block */}
            {hasPrice ? (
              <span className="font-mono text-gold-bright font-bold text-xs bg-gold/10 px-1.5 py-0.5 rounded-sm shrink-0">
                ₹{product.price}
              </span>
            ) : (
              <span className="font-mono text-cream/40 font-medium text-[10px] border border-cream/10 px-1.5 py-0.5 rounded-sm shrink-0 tracking-wide uppercase dynamic-tag">
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

        {/* Dual Action Button Grid Layout */}
        <div className="flex gap-2 mt-2">
          
          {/* View Details Secondary Button */}
          <button
            onClick={() => onViewDetails && onViewDetails(product)}
            className="flex-1 py-2 px-2 rounded-xs border border-gold/20 bg-white/[0.02] font-cinzel text-[10px] font-bold tracking-widest text-cream uppercase transition-all duration-300 hover:bg-gold/10 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {/* Add to Cart / Enquire Action Button */}
          <button
            disabled={!hasPrice}
            onClick={() => onAddToCart && onAddToCart(product)}
            className={`flex-1 py-2 px-2 rounded-xs border font-cinzel text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer project-btn
              ${hasPrice 
                ? 'border-gold/30 bg-gold/5 text-gold hover:bg-gold hover:text-dark-bg shadow-xs' 
                : 'border-cream/15 bg-transparent text-cream/35 cursor-not-allowed opacity-50'
              }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{hasPrice ? 'Add' : 'Enquire'}</span>
          </button>

        </div>
      </div>

    </div>
  );
}