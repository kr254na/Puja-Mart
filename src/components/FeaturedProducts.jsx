import { dummyProducts } from '../data/productData';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  return (
    <section id="featured-products-section" className="py-12 px-4 md:px-12 bg-dark-bg text-cream">
      

      {/* Header Container */}
      <div className="section-header-wrap">
        <span className="section-header-tag">
          ✦ DAILY ALTAR ESSENTIALS ✦
        </span>
        <h2 className="section-header-title">
          Featured Products
        </h2>
        <p className="section-header-description">
          Handpicked premium pure ingredients and artisanal brassware items pinned directly for your everyday home devotional rituals.
        </p>
      </div>

      {/* 4-Column Responsive Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-7xl
      mx-auto relative z-10">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Explore Full Shop Link Action */}
      <div className="text-center mt-12">
        <Link 
          to="/products" 
          className="btn-gold-outline group"
        >
          Explore Full Catalog Aisle
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

    </section>
  );
}