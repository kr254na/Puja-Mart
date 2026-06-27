import { categories } from '../data/categoriesData'; 
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function Categories() {
  const displayedCategories = categories.slice(0, 6);

  return (
    <section id="categories-section" className="py-12 px-4 md:px-12 bg-dark-bg text-cream">
      
      {/* Header */}
      <div className="section-header-wrap">
        <span className="section-header-tag">Our Divine Collections</span>
        <h2 className="section-header-title">Explore the Sacred Spectrum</h2>
        <p className="section-header-description">
          From the holiest puja kits to attire for the deities, every element is crafted with divine precision to enhance your spiritual practice.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {displayedCategories.map((cat, idx) => (
          <CategoryCard 
            key={cat.id || idx}
            cat={cat}
            isWide={idx === 0 || idx === 5}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
          <Link to="/collections" className="btn-gold-outline group">
            View all Collections
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
      </div>

    </section>
  );
}