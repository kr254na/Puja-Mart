import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="border border-gold/15 bg-white/[0.01] rounded-sm transition duration-300 hover:border-gold/35">
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        type="button"
        className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
      >
        <span className="font-cinzel text-xs font-bold text-cream tracking-wide uppercase hover:text-gold-bright transition">
          {title}
        </span>
        <span className="text-gold shrink-0">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {/* Accordion Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[500px] border-t border-gold/10' : 'max-h-0'}`}
      >
        <div className="p-5 font-cormorant text-sm text-cream/70 leading-relaxed bg-white/[0.005]">
          {children}
        </div>
      </div>
    </div>
  );
}
