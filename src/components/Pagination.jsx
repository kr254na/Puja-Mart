import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalPages = 10, onPageChange }) {
  const pages = [];
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-16">
      <button
        onClick={() => currentPage > 1 && onPageChange && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 border border-gold/20 hover:border-gold/60 rounded-xs text-cream/40 hover:text-gold-bright transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        title="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) => {
        if (p === '...') {
          return (
            <span key={`ellipsis-${idx}`} className="text-cream/30 font-cinzel px-2 select-none">
              ...
            </span>
          );
        }

        const isActive = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => onPageChange && onPageChange(p)}
            className={`w-10 h-10 border rounded-xs font-cinzel text-xs transition cursor-pointer ${
              isActive
                ? 'border-gold bg-gold/10 text-gold-bright font-bold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                : 'border-gold/15 bg-white/[0.01] hover:border-gold/40 text-cream/70 hover:text-cream'
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => currentPage < totalPages && onPageChange && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 border border-gold/20 hover:border-gold/60 rounded-xs text-cream/40 hover:text-gold-bright transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        title="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
