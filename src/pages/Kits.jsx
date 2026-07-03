import { useState, useMemo } from "react";
import {premiumKits} from "../data/kitsData";
import KitCard from "../components/KitCard";
import { Search, ChevronLeft, ChevronRight, HelpCircle} from "lucide-react";

export default function Kits(){
    const [searchQuery, setSearchQuery] = useState('');
        const processedKits = useMemo(() => {
            let result = [...premiumKits];
    
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                result = result.filter(k => k.nameEn?.toLowerCase().includes(q));
            }
            return result;
        }, [premiumKits, searchQuery]);

        return (
        <div className="w-full min-h-screen bg-gradient-primary text-cream pt-[72px] sm:pt-[88px] pb-20 px-4 sm:px-8 md:px-16 lg:px-24 ">
            <div className="max-w-[1920px] mx-auto space-y-8">

                {/* COMPACT MAIN UTILITY CONTROL STRIP ROW */}
                <div className="sticky top-[72px] sm:top-[88px] z-30 bg-[#1A0800]/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-16 md:px-16 lg:-mx-24 lg:px-24 border-b border-gold/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[1920px] mx-auto">
                        {/* Quick Real-Time Action Text Search Bar Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
                            <input
                                type="text"
                                placeholder="Search Kits"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="truncate w-full bg-white/[0.02] border border-gold/15 rounded-sm pl-12 pr-4 py-3 font-cinzel text-xs tracking-wider focus:outline-none focus:border-gold/30 text-cream"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION IDENTIFICATION TITLE */}
                <div className="section-header-wrap">
                    <span className="section-header-tag">Pujan Sangrah</span>
                    <h1 className="section-header-title">Divine Kits</h1>
                    <p className="section-header-description">
                        Discover meticulously curated puja kits designed to bring divine harmony and sacred energy to your home.
                    </p>
                </div>

                {/* CORE GRID CATALOG PRODUCTS BLOCK */}
                {processedKits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processedKits.map((kit) => (
                            <KitCard kit={kit} key={kit.id} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full py-24 text-center border border-dashed border-gold/10 rounded-sm bg-white/[0.01]">
                        <HelpCircle className="w-8 h-8 text-gold/30 mx-auto mb-3" />
                        <p className="font-cinzel text-sm text-cream/70 tracking-wide">No Kits Available</p>
                    </div>
                )}

                {/* PAGINATION NAVIGATION ACTIONS BLOCK */}
                <div className="flex items-center justify-center gap-2 pt-16">
                    <button className="flex items-center justify-center w-10 h-10 border border-gold/20 hover:border-gold/60 rounded-xs text-cream/40 hover:text-gold-bright transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <button className="w-10 h-10 border border-gold bg-gold/10 text-gold-bright font-cinzel text-xs font-bold rounded-xs shadow-[0_0_15px_rgba(212,175,55,0.15)] transition cursor-pointer">
                        1
                    </button>
                    <button className="w-10 h-10 border border-gold/15 bg-white/[0.01] hover:border-gold/40 text-cream/70 hover:text-cream font-cinzel text-xs rounded-xs transition cursor-pointer">
                        2
                    </button>
                    <button className="w-10 h-10 border border-gold/15 bg-white/[0.01] hover:border-gold/40 text-cream/70 hover:text-cream font-cinzel text-xs rounded-xs transition cursor-pointer">
                        3
                    </button>
                    
                    <span className="text-cream/30 font-cinzel px-2 select-none">...</span>
                    
                    <button className="w-10 h-10 border border-gold/15 bg-white/[0.01] hover:border-gold/40 text-cream/70 hover:text-cream font-cinzel text-xs rounded-xs transition cursor-pointer">
                        10
                    </button>

                    <button className="flex items-center justify-center w-10 h-10 border border-gold/20 hover:border-gold/60 rounded-xs text-cream/40 hover:text-gold-bright transition cursor-pointer">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}