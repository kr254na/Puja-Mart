import React from 'react';

export default function PolicyCard({ icon: Icon, title, children }) {
  return (
    <div className="card-glass-premium p-6 hover:-translate-y-1 transition duration-300">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="space-y-2 flex-1">
          {title && (
            <h3 className="font-cinzel text-xs font-bold text-gold uppercase tracking-wider">
              {title}
            </h3>
          )}
          <div className="font-cormorant text-sm leading-relaxed text-cream/70">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
