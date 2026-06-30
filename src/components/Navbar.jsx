import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart, X, Menu, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { dummyProducts } from "../data/productData";
import Logo from "./Logo";

export default function Navbar(){
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Auto-close suggestions if user clicks elsewhere
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        desktopSearchRef.current && !desktopSearchRef.current.contains(event.target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : dummyProducts.filter(p => {
        const name = p.nameEn?.toLowerCase() || '';
        const desc = p.description?.toLowerCase() || '';
        const cat = p.category?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        return name.includes(query) || desc.includes(query) || cat.includes(query);
      }).slice(0, 5);
    
  const handleProductClick = (product) => {
    alert(`Redirecting to product page for:\n${product.name} (Price: ₹${product.price})`);
  };

  const handleSuggestionClick = (product) => {
    handleProductClick(product);
    setSearchQuery('');
    setShowSuggestions(false);
    setMobileMenuOpen(false); // Close mobile drawer on selection
  };

  // Reusable Search Bar
  const renderSearchBar = ( innerRef ) => (
    <div ref={innerRef} className="relative w-full">
      <div className="flex items-center border border-gold/30 bg-black/10 rounded-full px-3 py-1.5 md:py-1">
        <Search className="w-4 h-4 text-gold" />
        <input 
          type="text" 
          placeholder="Search" 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="bg-transparent border-none outline-none pl-2 text-xs md:text-sm w-full font-cormorant focus:ring-0 text-cream placeholder-cream/35" 
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-gold/20 rounded-full">
            <X className="w-3 h-3 text-gold" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown - Renders relatively underneath whichever input is active */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-12 left-0 right-0 border rounded-lg shadow-2xl p-2 z-50 max-h-60 overflow-y-auto bg-mid-bg border-gold/40 text-cream">
          {filteredSuggestions.map(p => (
            <div 
              key={p.id}
              onClick={() => handleSuggestionClick(p)}
              className="flex items-center gap-2 p-2 hover:bg-saffron/10 rounded cursor-pointer transition"
            >
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs md:text-sm font-semibold truncate">
                  {p.name}
                </div>
                <div className="text-[10px] text-gold-bright font-cinzel">
                  ₹{p.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] sm:h-[88px] flex items-center
      justify-between px-3 sm:px-6 md:px-12 border-b border-gold/30 bg-dark-bg/90 backdrop-blur-md text-cream">
        
        {/* Brand */}
        <Link 
          to="/" 
          className="flex items-center gap-2 mr-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo className="h-10 md:h-14" />
          <div className="flex flex-col justify-center items-start">
            <div className="font-cinzel font-bold text-base sm:text-xl tracking-wider bg-gradient-to-r from-gold-bright via-saffron to-gold bg-clip-text text-transparent leading-none text-left">
              Agarwal Pujan Bhandar
            </div>
            <span className="font-sanskrit text-xs text-gold/80 block tracking-widest mt-0.5 sm:mt-1 text-left">
              Ashish Agarwal
            </span>
          </div>
        </Link>
        
        {/* Nav Options (Desktop) */}
        <ul className="hidden lg:flex mx-3 items-center gap-10 font-cormorant text-base md:text-lg">
          <li className="hover:text-gold-bright cursor-pointer hover:underline underline-offset-4 decoration-saffron transition"><Link to="/">Home</Link></li>
          <li className="hover:text-gold-bright cursor-pointer hover:underline underline-offset-4 decoration-saffron transition"><Link to="/products">Products</Link></li>
          <li className="hover:text-gold-bright cursor-pointer hover:underline underline-offset-4 decoration-saffron transition"><Link to="/kits">Kits</Link></li>
          <li className="hover:text-gold-bright cursor-pointer hover:underline underline-offset-4 decoration-saffron transition"><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6 ml-4">
          {/* Desktop Search Wrapper */}
          <div className="hidden md:block w-48 md:w-64">
            {renderSearchBar(desktopSearchRef)}
          </div>

          {/* Wishlist - Hidden on Mobile, shown in Drawer */}
          <button className="hidden xs:block relative p-2 border border-gold/30 rounded-full hover:bg-gold/10 text-gold transition cursor-pointer" title="Wishlist">
            <Heart className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-maroon text-[9px] font-sans text-white rounded-full flex items-center justify-center border border-gold/40 animate-pulse">
              2
            </span>
          </button>

          {/* Cart - Essential, kept on mobile */}
          <button className="relative p-1.5 sm:p-2 border border-gold/30 rounded-full bg-gold/10 hover:bg-gold/20 text-gold-bright transition cursor-pointer" title="Shopping Basket">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-saffron text-[8px] sm:text-[9px] font-sans text-white rounded-full flex items-center justify-center border border-gold/40 animate-pulse">
              5
            </span>
          </button>

          {/* Profile / Account Trigger - Hidden on Mobile, shown in Drawer */}
          <button 
            className="hidden xs:block p-2 border border-gold/30 rounded-full hover:bg-gold/10 text-gold transition cursor-pointer"
            title="Profile"
            onClick={() => alert("Profile feature coming soon!")}
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Icon Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-1.5 sm:p-2 text-gold hover:text-gold-bright transition"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5 sm:w-6 h-6" /> : <Menu className="w-5.5 h-5.5 sm:w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Links Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[72px] sm:top-[88px] left-0 right-0 z-40 lg:hidden flex flex-col items-center bg-dark-bg/95 border-b border-gold/20 backdrop-blur-lg p-6 animate-fadeIn">
          
          {/* Mobile Search Input Wrapper (Visible only on mobile devices smaller than md breakpoint) */}
          <div className="w-full max-w-sm mb-6 md:hidden">
            {renderSearchBar(mobileSearchRef)}
          </div>
          
          <ul className="w-full text-center flex flex-col gap-5 font-cormorant text-xl text-cream">
            <li onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-bright py-1"><Link to="/">Home</Link></li>
            <li onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-bright py-1"><Link to="/about">About</Link></li>
            <li onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-bright py-1"><Link to="/products">Products</Link></li>
            <li onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-bright py-1"><Link to="/contact">Contact</Link></li>
          </ul>

          {/* Mobile Quick Actions (Wishlist & Profile for <= sm screen sizes) */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gold/20 w-full max-w-sm justify-center xs:hidden">
            <button 
              className="flex items-center gap-2 px-3 py-1.5 border border-gold/30 rounded-full hover:bg-gold/10 text-gold transition cursor-pointer"
              onClick={() => { setMobileMenuOpen(false); alert("Wishlist feature coming soon!"); }}
            >
              <Heart className="w-3.5 h-3.5" />
              <span className="text-xs font-sans text-cream">Wishlist (2)</span>
            </button>
            <button 
              className="flex items-center gap-2 px-3 py-1.5 border border-gold/30 rounded-full hover:bg-gold/10 text-gold transition cursor-pointer"
              onClick={() => { setMobileMenuOpen(false); alert("Profile feature coming soon!"); }}
            >
              <User className="w-3.5 h-3.5" />
              <span className="text-xs font-sans text-cream">Profile</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}