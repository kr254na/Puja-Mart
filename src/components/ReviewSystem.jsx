import { useState } from 'react';
import { defaultReviews } from '../data/reviewData';
import { ArrowRight, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReviewSystem({ isHomePage = false }) {
  const [selectedReview, setSelectedReview] = useState(null);

  const displayedReviews = isHomePage ? defaultReviews.slice(0, 3) : defaultReviews;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="reviews-section" className="py-12 px-4 md:px-12 text-cream">
      
      {/* Header */}
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
  <div className='relative z-10'>
        <span className="section-header-tag">
          ✦ DEVOTEE TESTIMONIALS ✦
        </span>
        <h2 className="section-header-title">
          {isHomePage ? "Words of Trust" : "The Devotee Ledger"}
        </h2>
        <p className='section-header-description'>
          Read inspiring stories from devotees whose lives have been touched by our sacred offerings.
        </p>
        </div>
      </div>

      {/* Reviews Layout Grid with optimized lower heights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {displayedReviews.map(review => (
          <div
            key={review.id}
            onClick={() => setSelectedReview(review)}
            className="card-glass-premium min-h-[190px] relative p-5 transition-all duration-300"
          >
            {/* Top Layout Block with large decorative quotes */}
            <div className="relative pr-4">
              <span className="absolute -top-3 -right-1 text-4xl font-serif text-gold/15 select-none leading-none">
                ”
              </span>
              <p className="font-cormorant text-sm md:text-base italic text-cream/80 leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none">
                {review.comment}
              </p>
            </div>

            {/* Devotee Profile Cluster matching image_8f0ae3.png layout */}
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gold/5">
              
              {/* Compact Circular Initials Badge Container */}
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-dark-bg font-cinzel font-bold text-xs tracking-wider shrink-0 shadow-inner">
                {getInitials(review.name)}
              </div>

              {/* Text Profile Metadata Details */}
              <div className="flex flex-col justify-center">
                <h4 className="font-cinzel text-[11px] sm:text-xs font-bold text-cream tracking-wide leading-none">
                  {review.name}
                </h4>
                
                {/* Inline Stars & Location Row */}
                <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-cream/40 whitespace-nowrap">
                  <div className="flex gap-0.5 text-gold-bright">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-gold-bright text-gold-bright' : 'text-cream/20'}`} 
                      />
                    ))}
                  </div>
                  <span>·</span>
                  <span className="font-cormorant italic tracking-wide">{review.location}</span>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* View All Button */}
      {isHomePage && (
        <div className="text-center mt-12">
          <Link to="/reviews" className="btn-gold-outline group">
            Read All Devotee Logs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      {/* REVIEW EXPANSION MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setSelectedReview(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xs" />
          <div className="relative max-w-xl w-full border border-gold/40 rounded shadow-2xl p-6 md:p-8 bg-dark-bg text-cream">
            <button onClick={() => setSelectedReview(null)} className="absolute top-4 right-4 p-2 rounded-full border border-gold/20 hover:bg-gold/10 text-gold transition cursor-pointer" >
              <X className="w-4.5 h-4.5" />
            </button>
            <div className="space-y-4 pt-2">

              <div className="font-cormorant text-base md:text-lg leading-relaxed text-cream/90 italic border-b border-gold/20 pb-5">
                "{selectedReview.comment}"
              </div>
                {/* Inline Stars & Location Row */}
                <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-dark-bg font-cinzel font-bold text-xs tracking-wider shrink-0 shadow-inner">
                {getInitials(selectedReview.name)}
              </div>

              {/* Text Profile Metadata Details */}
              <div className="flex flex-col justify-center">
                <h4 className="font-cinzel text-[11px] sm:text-xs font-bold text-cream tracking-wide leading-none">
                  {selectedReview.name}
                </h4>
                
                {/* Inline Stars & Location Row */}
                <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-cream/40 whitespace-nowrap">
                  <div className="flex gap-0.5 text-gold-bright">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-2.5 h-2.5 ${i < selectedReview.rating ? 'fill-gold-bright text-gold-bright' : 'text-cream/20'}`} 
                      />
                    ))}
                  </div>
                  <span>·</span>
                  <span className="font-cormorant italic tracking-wide">{selectedReview.location}</span>
                </div>
              </div>
                </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}