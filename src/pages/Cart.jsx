import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Trash2, ShieldCheck, Heart, ArrowLeft, ArrowRight, Tag, Gift, Award } from 'lucide-react';
import ToastContext from '../context/ToastContext';

export default function Cart() {
  const { triggerToast } = useContext(ToastContext);

  // Mock Cart Items State
  const [cartItems, setCartItems] = useState([
    {
      id: "prod-bhimseni-kapoor",
      nameEn: "Premium Bhimseni Camphor",
      nameHi: "शुद्ध भीमसेनी कपूर",
      price: 180,
      qty: 2,
      unit: "100g Pack",
      image: "https://m.media-amazon.com/images/I/61DgiZH6vWL.jpg"
    },
    {
      id: "prod-mysore-chandan",
      nameEn: "Pure Sandalwood Paste",
      nameHi: "मैसूर चंदन पेस्ट",
      price: 240,
      qty: 1,
      unit: "50g Jar",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ2Hp_HqgvjEA9BBomXa8dFYBZndR9Q1XvV_ZMja3dCxO8JL-tqA0R2oE6JXsUtkZsqWguLDHBqyooXf1xbwIEm5u0B3hvbi9JCAzbZU3RQ71FoZbS98WkRTw"
    },
    {
      id: "prod-kesar-moli",
      nameEn: "Premium Kesar Kalava",
      nameHi: "शाही केसरिया रक्षासूत्र",
      price: 60,
      qty: 3,
      unit: "Bundle of 3",
      image: "https://m.media-amazon.com/images/I/71AI+eYzCaL.jpg"
    }
  ]);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Math Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 50;
  const discount = appliedCoupon === "DIWALI10" ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = subtotal + shipping - discount;

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const handleRemoveItem = (id, name) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    triggerToast(`"${name}" removed from sacred basket.`);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "DIWALI10") {
      setAppliedCoupon("DIWALI10");
      setCoupon("");
      triggerToast("Sacred Promo Code applied: 10% discount!");
    } else {
      triggerToast("Invalid Coupon Code. Try 'DIWALI10'");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    triggerToast("Promo Code removed.");
  };



  const handleCheckoutSubmit = () => {
    setIsCheckingOut(true);
    // Simulate payment process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setCartItems([]);
      triggerToast("Sacred Checkout Completed Successfully! May the blessings be with you.");
    }, 2500);
  };

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto space-y-10 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] rounded-full bg-saffron/5 blur-[150px]" />
        </div>

        {/* Title */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ SACRED BASKET ✦</span>
          <h1 className="section-header-title">My Devotional Cart</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
        </div>

        {checkoutComplete ? (
          /* THANK YOU VIEW */
          <div className="max-w-xl mx-auto text-center border border-gold/20 bg-mid-bg/40 backdrop-blur-md p-8 sm:p-12 rounded-sm space-y-6 relative z-10 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/40 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full bg-gold/10 flex items-center justify-center">
                <Gift className="w-8 h-8 text-gold-bright" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="font-cinzel text-base sm:text-lg font-bold text-cream uppercase tracking-wide">Rituals & Order Confirmed</h2>
              <span className="font-cinzel text-xs text-gold-bright/90 block">ORDER ID: APB-9099</span>
              <p className="font-cormorant text-sm sm:text-base text-cream/70 italic leading-relaxed pt-2">
                "May Lord Ganesha remove all obstacles from your path. Your pure pujan items are sent for packing and holy sanctification."
              </p>
            </div>

            <div className="border-t border-gold/10 pt-6 mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-filled flex items-center justify-center gap-2">
                Return to Mandir Home <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/profile" className="btn-gold-outline py-2 px-6 flex items-center justify-center">
                Track Sacred Orders
              </Link>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* EMPTY STATE */
          <div className="max-w-md mx-auto text-center space-y-6 relative z-10 py-12 animate-fade-in">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border border-dashed border-gold/30 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full bg-gold/5 flex items-center justify-center">
                <ShoppingBasket className="w-8 h-8 text-gold/45" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-cinzel text-sm font-bold text-cream uppercase tracking-wide">Basket is Empty</h3>
              <p className="font-cormorant text-sm text-cream/60 italic leading-relaxed">
                "No sacred items are gathered in your ledger. Explore our pure coordinates and kits to add them here."
              </p>
            </div>

            <Link to="/products" className="btn-filled flex items-center justify-center gap-2 max-w-xs mx-auto">
              Shop Devotional Items <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* CART GRID WRAPPER */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            
            {/* LEFT COLUMN: Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="border border-gold/15 bg-mid-bg/20 rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-gold/30 transition"
                >
                  <img 
                    src={item.image} 
                    alt={item.nameEn} 
                    className="w-16 h-16 rounded object-cover border border-gold/15 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cinzel text-xs sm:text-sm font-bold text-cream truncate">{item.nameEn}</h3>
                    <span className="font-sanskrit text-xs text-gold/75 block mt-0.5">{item.nameHi}</span>
                    <span className="font-cormorant text-xs text-cream/45 block mt-0.5">{item.unit}</span>
                  </div>

                  {/* Quantity Adjustment Buttons */}
                  <div className="flex items-center border border-gold/20 rounded-sm overflow-hidden flex-shrink-0 bg-black/10">
                    <button 
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2.5 py-1 text-cream hover:bg-gold/15 transition cursor-pointer font-bold font-sans text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 font-cinzel text-xs text-cream font-bold">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2.5 py-1 text-cream hover:bg-gold/15 transition cursor-pointer font-bold font-sans text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Prices */}
                  <div className="w-full sm:w-24 text-left sm:text-right flex-shrink-0">
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-gold-bright block">
                      ₹{item.price * item.qty}
                    </span>
                    <span className="font-cormorant text-[10px] text-cream/45 block">
                      ₹{item.price} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemoveItem(item.id, item.nameEn)}
                    className="text-cream/45 hover:text-saffron p-1.5 hover:bg-white/5 rounded-full transition cursor-pointer flex-shrink-0 self-end sm:self-center"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2">
                <Link to="/products" className="font-cinzel text-[10px] text-gold hover:text-gold-bright flex items-center gap-1 transition">
                  <ArrowLeft className="w-3.5 h-3.5" /> [ Continue Gathering Items ]
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Bill summary and donation option */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Billing Summary Box */}
              <div className="border border-gold/15 bg-mid-bg/40 backdrop-blur-md rounded-sm p-6 space-y-6 shadow-2xl">
                <div className="border-b border-gold/10 pb-4">
                  <h2 className="font-cinzel text-xs font-bold text-cream tracking-widest uppercase">Offering Summary</h2>
                </div>

                {/* Pandit Support Offerings (Thematic Donation) */}


                {/* Coupon Code Entry */}
                <div className="space-y-3 pt-2">
                  <span className="form-field-title">Sacred Promo Code</span>
                  {appliedCoupon ? (
                    <div className="flex justify-between items-center bg-gold/5 border border-gold/25 p-2 rounded-sm text-xs">
                      <span className="font-cinzel font-bold text-gold-bright flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {appliedCoupon} (10% Off)
                      </span>
                      <button 
                        onClick={handleRemoveCoupon}
                        className="text-saffron hover:underline font-cinzel text-[9px] uppercase cursor-pointer"
                      >
                        [ Remove ]
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input 
                        type="text" 
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="e.g. DIWALI10"
                        className="form-field-input py-1 px-3 text-xs"
                      />
                      <button 
                        type="submit" 
                        className="btn-store-primary py-1 px-4 text-[9px] w-auto shrink-0 flex items-center justify-center"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                {/* Payment Breakdown Rows */}
                <div className="border-t border-gold/10 pt-4 space-y-2 text-sm font-cormorant">
                  <div className="flex justify-between text-cream/65">
                    <span>Items Subtotal</span>
                    <span className="font-cinzel text-xs text-cream">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold-bright">
                      <span>Promo Discount</span>
                      <span className="font-cinzel text-xs">-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-cream/65">
                    <span>Holy Packaging & Shipping</span>
                    <span className="font-cinzel text-xs text-cream">
                      {shipping === 0 ? <span className="text-emerald-400 font-bold uppercase text-[10px]">Free</span> : `₹${shipping}`}
                    </span>
                  </div>

                  <div className="border-t border-gold/10 my-3 pt-3 flex justify-between font-cinzel text-sm font-bold text-cream">
                    <span>Total Offering</span>
                    <span className="text-gold-bright text-base">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button 
                  onClick={handleCheckoutSubmit}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="btn-filled w-full flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-dark-bg border-t-transparent rounded-full animate-spin" />
                      Sanctifying Payment...
                    </span>
                  ) : (
                    <>
                      Proceed to Sacred Payment <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="font-cormorant text-[10px] text-cream/45 block italic">
                    "Payments fully secured via UPI, cards and Netbanking options."
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
