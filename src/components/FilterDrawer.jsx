import { useState } from 'react';
import { SlidersHorizontal, X, Check } from 'lucide-react';

export default function FilterDrawer({
    onClose,
    categories,
    activeCategory,
    selectedPriceRange,
    onApply
}) {
    const [localCategory, setLocalCategory] = useState(activeCategory);
    const [localPriceRange, setLocalPriceRange] = useState(selectedPriceRange);

    return (
        <div className="fixed inset-0 z-[100] flex justify-end select-none">
            <style dangerouslySetInnerHTML={{__html: `
                .drawer-btn {
                    transition: none !important;
                    touch-action: manipulation;
                }
            `}} />
            {/* Glass Blocker Backdrop Panel Cover */}
            <div
                className="absolute inset-0 bg-black/60 transition-opacity animate-fadeIn pointer-events-auto"
                onClick={() => onClose()}
            />

            {/* Core Drawer Box Shell */}
            <div className="w-full max-w-sm h-full bg-[#090604] border-l border-gold/20 p-6 flex flex-col justify-between relative z-10 shadow-2xl animate-slideLeft overflow-y-auto">
                <div className="space-y-6">
                    {/* Drawer Top Header Control Line */}
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex items-center gap-2 text-gold-bright">
                            <SlidersHorizontal className="w-4 h-4" />
                            <h3 className="font-cinzel text-xs font-bold tracking-widest uppercase">Filter Products</h3>
                        </div>
                        <button
                            onClick={() => onClose()}
                            className="p-1 border border-white/5 hover:border-gold/30 rounded-xs text-cream/40 hover:text-cream transition cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* FILTER CATEGORY SECTION 1: Dynamic Lists */}
                    <div className="space-y-2.5">
                        <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-gold/60 uppercase">Sacred Categories</h4>
                        <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                            {categories.map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() => setLocalCategory(cat)}
                                    className={`drawer-btn flex items-center justify-between p-2.5 rounded-sm font-cinzel text-[11px] tracking-wide text-left ${
                                        localCategory === cat
                                            ? 'bg-gold/20 border border-gold/40 text-gold-bright font-bold shadow-[0_0_10px_rgba(212,160,23,0.15)]'
                                            : 'bg-black/20 border border-transparent text-cream/60 hover:bg-white/[0.02] hover:text-cream'
                                    }`}
                                >
                                    <span>{cat}</span>
                                    {localCategory === cat && <Check className="w-3 h-3 text-gold-bright" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FILTER CATEGORY SECTION 2: Dynamic Price Bracket Thresholds */}
                    <div className="space-y-2.5 pt-2">
                        <h4 className="font-cinzel text-[10px] font-bold tracking-widest text-gold/60 uppercase">Price Dakshina</h4>
                        <div className="grid grid-cols-1 gap-1.5 font-cinzel text-[11px]">
                            {[
                                { val: 'all', label: 'All Pricing Levels' },
                                { val: 'under-500', label: 'Under ₹500' },
                                { val: '500-1500', label: '₹500 – ₹1,500' },
                                { val: 'above-1500', label: 'Above ₹1,500' }
                            ].map((bracket) => (
                                <button
                                    key={bracket.val}
                                    onClick={() => setLocalPriceRange(bracket.val)}
                                    className={`drawer-btn p-2.5 border rounded-sm text-left ${
                                        localPriceRange === bracket.val
                                            ? 'bg-gold/20 border-gold/40 text-gold-bright font-bold shadow-[0_0_10px_rgba(212,160,23,0.15)]'
                                            : 'bg-black/20 border-white/5 text-cream/60 hover:text-cream hover:border-white/10'
                                    }`}
                                >
                                    {bracket.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Panel Actions Container Drawer Strip */}
                <div className="pt-4 border-t border-white/5 flex gap-2">
                    <button
                        onClick={() => {
                            setLocalCategory('All');
                            setLocalPriceRange('all');
                        }}
                        className="flex-1 py-2.5 border border-white/10 rounded-sm font-cinzel text-[10px] font-bold tracking-widest uppercase text-cream/40 hover:text-cream hover:border-white/20 transition cursor-pointer"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={() => onApply(localCategory, localPriceRange)}
                        className="flex-1 py-2.5 bg-gold rounded-sm font-cinzel text-[10px] font-black tracking-widest uppercase text-dark-bg hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition cursor-pointer text-center"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}