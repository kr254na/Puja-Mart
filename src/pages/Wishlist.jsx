import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import ToastContext from '../context/ToastContext';

export default function Wishlist() {
  const { triggerToast } = useContext(ToastContext);

  // Mock Wishlist Items State
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "prod-bhimseni-kapoor",
      nameEn: "Premium Bhimseni Camphor",
      nameHi: "शुद्ध भीमसेनी कपूर",
      price: 180,
      unit: "100g Pack",
      image: "https://m.media-amazon.com/images/I/61DgiZH6vWL.jpg",
      category: "Daily Essentials",
      rating: 4.9
    },
    {
      id: "prod-brass-diya",
      nameEn: "Artisanal Mayur Brass Diya",
      nameHi: "अखंड मयूर पीतल दीया",
      price: 450,
      unit: "1 Piece",
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSHSO9oHWUA0iQWvaGxf9uNIuH3QuH19sgpRPv2mzODOxHI-vm3APE-zzGMDti2ioYke_XJbXdKbZoEnxuhW6BU95i-M-du5OLwiRL8xHY6IYv6BuMphwz2",
      category: "Brassware Essentials",
      rating: 4.8
    },
    {
      id: "kit-shivratri",
      nameEn: "Maha Shivratri Shringar & Puja Kit",
      nameHi: "महाशिवरात्रि पूजा किट",
      price: 1850,
      unit: "Complete Set",
      image: "https://m.media-amazon.com/images/I/91LKh4AhvGL.jpg",
      category: "Festive Puja Kits",
      rating: 5.0
    }
  ]);

  const handleRemove = (id, name) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    triggerToast(`"${name}" removed from sacred wishlist.`);
  };

  const handleMoveToCart = (item) => {
    // Mock moving to cart
    setWishlistItems(wishlistItems.filter(i => i.id !== item.id));
    triggerToast(`"${item.nameEn}" moved to your sacred basket!`);
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto space-y-10 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-saffron/5 blur-[120px]" />
        </div>

        {/* Header */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ DEVOTIONAL WISHLIST ✦</span>
          <h1 className="section-header-title">My Sacred Wishlist</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {wishlistItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="max-w-md mx-auto text-center space-y-6 relative z-10 py-12 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full bg-gold/5 flex items-center justify-center">
                <Heart className="w-8 h-8 text-gold/45" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-cinzel text-sm font-bold text-cream uppercase tracking-wide">Wishlist is Empty</h3>
              <p className="font-cormorant text-sm text-cream/60 italic leading-relaxed">
                "No sacred offerings are registered in your ledger. Explore our pure coordinates and kits to add them here."
              </p>
            </div>

            {/* Devotional Shloka Box */}
            <div className="border border-gold/10 bg-white/[0.01] p-4 rounded-sm italic font-sanskrit text-xs text-gold/60 text-center">
              ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।<br />
              पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
            </div>

            <Link to="/products" className="btn-filled flex items-center justify-center gap-2 max-w-xs mx-auto">
              Explore Divine Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* WISHLIST GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {wishlistItems.map((item) => (
              <div 
                key={item.id} 
                className="border border-gold/15 bg-mid-bg/25 rounded-sm p-4 hover:border-gold/45 transition duration-300 relative group flex flex-col justify-between"
              >
                
                {/* Trash delete button absolute top right */}
                <button 
                  onClick={() => handleRemove(item.id, item.nameEn)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 border border-gold/10 text-cream/50 hover:text-saffron hover:border-saffron/40 transition duration-300 z-20 cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Content */}
                <div className="space-y-4">
                  {/* Image wrapper */}
                  <div className="aspect-square w-full rounded overflow-hidden relative border border-gold/10">
                    <img 
                      src={item.image} 
                      alt={item.nameEn} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="badge font-cinzel text-[8px] tracking-wider px-2 py-0.5 border border-gold/20 bg-dark-bg/85 text-gold-bright">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-cinzel text-xs sm:text-sm font-bold text-cream tracking-wide group-hover:text-gold-bright transition">
                        {item.nameEn}
                      </h3>
                    </div>
                    <span className="font-sanskrit text-xs text-gold/75 block">
                      {item.nameHi}
                    </span>
                    <p className="font-cormorant text-xs text-cream/45">{item.unit}</p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-gold/10 mt-4 pt-4 flex items-center justify-between gap-4">
                  <div className="font-cinzel text-sm font-bold text-gold-bright">
                    ₹{item.price}
                  </div>
                  
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="btn-store-primary text-[9px] py-1.5 px-3 w-auto flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Move to Basket
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
