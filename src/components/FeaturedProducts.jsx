import { dummyProducts } from '../data/productData';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  return (
    <section id="featured-products-section" className="py-12 px-4 md:px-12 text-cream relative">
                  {/* Header Container */}
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
      ✦ DAILY ALTAR ESSENTIALS ✦
    </span>

    <h2 className="section-header-title">
      Featured Products
    </h2>

    <p className="section-header-description">
      Handpicked premium pure ingredients and artisanal brassware items pinned directly for your everyday home devotional rituals.
    </p>
  </div>

</div>

      {/* 4-Column Responsive Catalog Grid */}
      <div className="grid grid-cols-1 vsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-7xl
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