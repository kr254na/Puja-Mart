import { useState, useMemo, useEffect } from "react";
import {premiumKits} from "../data/kitsData";
import KitCard from "../components/KitCard";
import { Search, HelpCircle} from "lucide-react";
import Pagination from "../components/Pagination";

export default function Kits(){
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
        const processedKits = useMemo(() => {
            let result = [...premiumKits];
    
            if (searchQuery.trim() !== '') {
                const q = searchQuery.toLowerCase();
                result = result.filter(k => k.nameEn?.toLowerCase().includes(q));
            }
            return result;
        }, [premiumKits, searchQuery]);

        useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, [currentPage]);

        return (
        <div className="page-container-listing">
            <div className="max-w-[1920px] mx-auto space-y-8">

                {/* COMPACT MAIN UTILITY CONTROL STRIP ROW */}
                <div className="sticky-control-strip">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[1920px] mx-auto">
                        {/* Quick Real-Time Action Text Search Bar Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" />
                            <input
                                type="text"
                                placeholder="Search Kits"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-sacred-search"
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}