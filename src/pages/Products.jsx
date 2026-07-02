import { useState, useMemo, useContext, useRef, useEffect } from 'react';
import { dummyProducts } from '../data/productData';
import ProductCard from '../components/ProductCard';
import FilterDrawer from '../components/FilterDrawer';
import { Search, SlidersHorizontal, ArrowUpDown, HelpCircle, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';

export default function Products() {
    // --- Core UI/UX State Engines ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSort, setActiveSort] = useState('relevance');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortDropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Unified fallback list mapping your premium inventory layers
    const catalogueProducts = useMemo(() => {
        if (dummyProducts && dummyProducts.length > 0) return dummyProducts;
        return [
            { id: 'p1', nameEn: 'Premium Banke Bihari Shringar Kit', category: 'Premium Kits', price: 2499, rating: 4.9, image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=400', desc: 'Complete daily offering set directly sourced for Vrindavan Upasana.' },
            { id: 'p2', nameEn: 'Vedic Hanuman Puja Box', category: 'Daily Puja Kits', price: 1299, rating: 4.8, image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=400', desc: 'An absolute altar essential containing pure brass accessories.' },
            { id: 'p3', nameEn: 'Pure Brass Diya (Akhand)', category: 'Brassware', price: 799, rating: 5.0, image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400', desc: 'Heavy-gauge cast brass akhand deepak.' },
            { id: 'p4', nameEn: 'Organic Pure Chandan Paste', category: 'Samagri', price: 349, rating: 4.7, image: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?w=400', desc: 'Organic extracts ground specifically for sacred tilak.' }
        ];
    }, []);

    // Extract separate structural categories dynamically to feed the list
    const availableCategories = useMemo(() => {
        const list = new Set(catalogueProducts.map(p => p.category));
        return ['All', ...list];
    }, [catalogueProducts]);

    // --- Filter and Sorcery Processing Calculations ---
    const processedProducts = useMemo(() => {
        let result = [...catalogueProducts];

        // 1. Text Field Filtering
        if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.nameEn?.toLowerCase().includes(q));
        }

        // 2. Category Modal Target Selection Filtering
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }

        // 3. Multi-tier Price Bracket Filtering
        if (selectedPriceRange !== 'all') {
            if (selectedPriceRange === 'under-500') result = result.filter(p => p.price < 500);
            else if (selectedPriceRange === '500-1500') result = result.filter(p => p.price >= 500 && p.price <= 1500);
            else if (selectedPriceRange === 'above-1500') result = result.filter(p => p.price > 1500);
        }

        // 4. Mathematical Sort Map Ordering Matrix
        result.sort((a, b) => {
            if (activeSort === 'price-low') return a.price - b.price;
            if (activeSort === 'price-high') return b.price - a.price;
            if (activeSort === 'rating') return b.rating - a.rating;
            return 0;
        });

        return result;
    }, [catalogueProducts, searchQuery, activeCategory, selectedPriceRange, activeSort]);

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
                                placeholder="Search catalog by item name or item type..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="truncate w-full bg-white/[0.02] border border-gold/15 rounded-sm pl-12 pr-4 py-3 font-cinzel text-xs tracking-wider focus:outline-none focus:border-gold/30 text-cream"
                            />
                        </div>

                        {/* Action Trigger Row Grouping */}
                        <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto shrink-0">
                            {/* Dynamic Open Filter Trigger Control Button */}
                            <button
                                onClick={() => setIsFilterModalOpen(true)}
                                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 border rounded-sm font-cinzel text-xs tracking-widest uppercase transition duration-300 cursor-pointer ${activeCategory !== 'All' || selectedPriceRange !== 'all'
                                        ? 'border-gold text-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                        : 'border-gold/20 text-cream/70 hover:border-gold/40 hover:bg-white/[0.01]'
                                    }`}
                            >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                Filter Catalog {(activeCategory !== 'All' || selectedPriceRange !== 'all') && '•'}
                            </button>

                            {/* Custom Relevance/Sort Selector Dropdown */}
                            <div ref={sortDropdownRef} className="relative flex-1 sm:flex-initial shrink-0">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="w-full flex items-center justify-between gap-3 border border-gold/15 bg-white/[0.01] hover:border-gold/30 px-3 py-3 rounded-sm text-cream font-cinzel text-[11px] tracking-wider transition cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                                        <span>Sort: {
                                            activeSort === 'relevance' ? 'Relevance' :
                                            activeSort === 'price-low' ? 'Price: Low-High' :
                                            activeSort === 'price-high' ? 'Price: High-Low' :
                                            activeSort === 'rating' ? 'Top Rated' : 'Sort'
                                        }</span>
                                    </div>
                                    <ChevronDown className={`w-3.5 h-3.5 text-gold/60 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu List overlay */}
                                {isSortOpen && (
                                    <div className="absolute right-0 mt-2 w-52 bg-[#090604]/98 border border-gold/20 rounded-sm shadow-2xl z-50 p-1 flex flex-col gap-0.5 animate-fadeIn backdrop-blur-md">
                                        {[
                                            { val: 'relevance', label: 'Relevance' },
                                            { val: 'price-low', label: 'Price: Low to High' },
                                            { val: 'price-high', label: 'Price: High to Low' },
                                            { val: 'rating', label: 'Top Rated' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.val}
                                                onClick={() => {
                                                    setActiveSort(opt.val);
                                                    setIsSortOpen(false);
                                                }}
                                                className={`flex items-center justify-between px-3 py-2 rounded-sm font-cinzel text-[10px] tracking-wider text-left transition ${
                                                    activeSort === opt.val
                                                        ? 'bg-gold/10 text-gold-bright font-bold'
                                                        : 'text-cream/60 hover:bg-white/[0.02] hover:text-cream cursor-pointer'
                                                }`}
                                            >
                                                <span>{opt.label}</span>
                                                {activeSort === opt.val && <Check className="w-3 h-3 text-gold-bright" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION IDENTIFICATION TITLE */}
                <div className="section-header-wrap">
                    <span className="section-header-tag">Pujan Sangrah</span>
                    <h1 className="section-header-title">The Complete Collection</h1>
                    <p className="section-header-description">
                        From the holiest puja kits to attire for the deities, every element is crafted with divine precision to enhance your spiritual practice.
                    </p>
                </div>

                {/* CORE GRID CATALOG PRODUCTS BLOCK */}
                {processedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 vsm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {processedProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>
                ) : (
                    <div className="w-full py-24 text-center border border-dashed border-gold/10 rounded-sm bg-white/[0.01]">
                        <HelpCircle className="w-8 h-8 text-gold/30 mx-auto mb-3" />
                        <p className="font-cinzel text-sm text-cream/70 tracking-wide">No Sacred Artifacts Match Your Parameters</p>
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

            {/* HIGH-END SLIDE-OUT FILTER SIDEBAR DRAWER OVERLAY MODAL */}
            {isFilterModalOpen && (
                <FilterDrawer
                    isOpen={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    categories={availableCategories}
                    activeCategory={activeCategory}
                    selectedPriceRange={selectedPriceRange}
                    onApply={(category, priceRange) => {
                        setActiveCategory(category);
                        setSelectedPriceRange(priceRange);
                        setIsFilterModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}