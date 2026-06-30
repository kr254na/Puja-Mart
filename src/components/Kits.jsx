import { premiumKits } from '../data/kitsData';
import KitCard from './KitCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function Kits() {
  return (
    <section id="kits-section" className="py-12 px-4 md:px-12 text-cream relative">

      {/* Header Framework Section Blocks */}
      <div className="section-header-wrap relative">
          {/* Glow */}
  <div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
  >
    <div
      className="w-[700px] h-[300px]
      rounded-full
       bg-saffron/9
      blur-[120px]"
    />
  </div>
    {/* Content */}
  <div className="relative z-10">
    <span className="section-header-tag">
      ✦ VEDIC RITUAL BOXES ✦
         </span>

    <h2 className="section-header-title">
      Sacred Puja Kits
      </h2>

    <p className="section-header-description">
      Eliminate the stress of sourcing ingredients. Our custom-curated all-in-one ritual boxes include verified pure, scripturally matched items prepared by hand.
       </p>
  </div>
      </div>

      {/* Dynamic Grid Rendering Stream */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative">
        {premiumKits.map((kit) => (
          <KitCard key={kit.id} kit={kit} />
        ))}
      </div>
      
      {/* View All Button */}
      <div className="text-center mt-12">
          <Link to="/kits" className="btn-gold-outline group">
            View all Kits
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
      </div>
      

    </section>
  );
}