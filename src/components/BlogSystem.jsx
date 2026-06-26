import { useState } from 'react';
import { defaultBlogs } from '../data/blogData';
import { ArrowRight, Calendar, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogSystem({ isHomePage = false }) {
  const [readingBlog, setReadingBlog] = useState(null);

  const displayedBlogs = isHomePage ? defaultBlogs.slice(0, 6) : defaultBlogs;

  return (
    <section id="blogs-section" className="py-12 px-4 md:px-12 bg-dark-bg text-cream">
      
      {/* Header */}
      <div className="section-header-wrap">
        <span className="section-header-tag">
          ✦ VEDIC KNOWLEDGE PORTAL ✦
        </span>
        <h2 className="section-header-title shimmer-text">
          {isHomePage ? "Spiritual Guides" : "The Complete Vedic Library"}
        </h2>
        <p className='section-header-description'>
          Deepen your practice with insights on rituals, deities, and Vedic philosophy, shared by our expert pandits.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {displayedBlogs.map(blog => (
          <div
            key={blog.id}
            onClick={() => setReadingBlog(blog)}
            className="card-glass-premium">
            <div>
              {/* Blog meta details */}
              <div className="flex gap-4 items-center text-[10px] text-gold uppercase font-mono mb-4 border-b border-gold/10 pb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 18 Jun 2026</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Pandit Ji</span>
              </div>

              <h3 className="font-cinzel text-sm md:text-base font-bold text-cream group-hover:text-gold-bright
              transition duration-300 mb-3">
                {blog.titleEn}
              </h3>
              
              <p className="font-cormorant text-xs md:text-sm italic text-cream/60 leading-relaxed mb-6">
                {blog.excerptEn}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-gold-bright font-cinzel font-semibold group-hover:underline">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition duration-300" />
            </div>

          </div>
        ))}
      </div>

      {/* View All Button Link - Only shows when component is placed on the Home screen */}
      {isHomePage && (
        <div className="text-center mt-12">
          <Link 
            to="/blogs" 
            className="btn-gold-outline"
          >
            Explore All Vedic Guides
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      {/* READING VIEW MODAL */}
      {readingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          
          <div 
            onClick={() => setReadingBlog(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs"
          />

          <div className="relative max-w-2xl w-full border border-gold/40 rounded shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto bg-dark-bg text-cream">
            
            <button
              onClick={() => setReadingBlog(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-gold/20 hover:bg-gold/10 text-gold transition cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Content panel */}
            <div className="space-y-4">
              <span className="text-[10px] text-gold uppercase font-mono block tracking-widest">
                VEDIC GUIDE · BY PANDIT JI
              </span>
              
              <h3 className="font-cinzel text-lg md:text-2xl font-bold text-gold-bright leading-snug border-b border-gold/20 pb-4">
                {readingBlog.titleEn}
              </h3>

              <div className="font-cormorant text-sm md:text-base leading-loose whitespace-pre-line text-cream/90 italic pt-2">
                {readingBlog.contentEn}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}