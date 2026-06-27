import { premiumKits } from '../data/kitsData';
import KitCard from './KitCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function Kits() {
  return (
    <section id="kits-section" className="py-12 px-4 md:px-12 bg-dark-bg text-cream">
      
      {/* Header Framework Section Blocks */}
      <div className="section-header-wrap">
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