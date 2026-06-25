import { defaultCategories } from '../data/categoryData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Collections() {
  return (
    <section id="collections-section" className="py-12 px-4 md:px-12 bg-dark-bg text-cream relative overflow-hidden">
      
      {/* Header */}
      <div className="section-header-wrap">
        <span className="section-header-tag">
          ✦ SACRED DEPARTMENTS ✦
        </span>
        <h2 className="section-header-title">
          Shop By Collection
        </h2>
      </div>

      {/* Categories Round Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto relative z-10">
        {defaultCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?cat=${cat.slug}`}
            className="group flex flex-col items-center text-center focus:outline-none"
          >
       
            <div className="relative w-40 h-40 rounded-full border border-gold/15 bg-white/5 p-1.5 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-black/40">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 object-center filter contrast-[102%]"
                />
                
                {/* Subtle vignette shield layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
              </div>
            </div>

            {/* Typography Content Meta Stack */}
            <div className="mt-4 flex flex-col items-center">
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-cream group-hover:text-gold-bright transition-colors duration-300 tracking-wide">
                {cat.name}
              </h3>
              <span className="font-sanskrit text-[10px] sm:text-xs text-gold/50 mt-0.5 tracking-wider font-medium">
                {cat.hindiName}
              </span>
            </div>

          </Link>
        ))}
      </div>

      {/* View All Pill Link Button - Utilizes global button layout styles */}
      <div className="text-center mt-12">
        <Link 
          to="/products" 
          className="btn-gold-outline group"
        >
          Explore All Categories
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </section>
  );
}