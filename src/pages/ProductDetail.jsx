import { useState, useMemo, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, MessageCircle, Heart, ShieldCheck,
    Sparkles, ShoppingCart
} from 'lucide-react';
import { dummyProducts } from '../data/productData';
import { premiumKits } from '../data/kitsData';
import ToastContext from '../context/ToastContext';
import ProductGallery from '../components/ProductGallery';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { triggerToast } = useContext(ToastContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const item = useMemo(() => {
        // Check both standard individual products and curated festive kits
        const matchedProduct = dummyProducts?.find(p => p.id === id);
        if (matchedProduct) return { ...matchedProduct, type: 'product' };

        const matchedKit = premiumKits?.find(k => k.id === id);
        if (matchedKit) return { ...matchedKit, type: 'kit' };

        // Strict high-quality local fallback for robust sandbox preview
        return {
            id: 'fallback-item',
            nameEn: 'Premium Banke Bihari Shringar Kit',
            nameSa: 'श्री बाँके बिहारी श्रृंगार सेवा किट',
            category: 'Premium Kits',
            price: 2499,
            originalPrice: 3200,
            rating: 4.9,
            // Multiple mock 2D images to feed our interactive gallery
            images: [
                'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=800',
                'https://images.unsplash.com/photo-1590075865003-e48277afd558?w=800',
                'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800'
            ],
            desc: 'Meticulously crafted for the daily service and aesthetic devotion of Thakur Ji. Contains pure silk garments, certified organic chandan paste, fresh-pressed perfume extracts, and handcrafted peacock crown elements directly sourced from the spiritual artisans of Sri Dham Vrindavan.',
            contents: [
                'Pure Raw Silk Yellow Pitambar Dhoti & Dupatta (1 Set)',
                'Handcrafted Zari Crown / Mukut with Mor Pankh detailing (1 Unit)',
                'Certified Organic Vrindavan Sandalwood Tilak Paste (50g)',
                'Handmade Natural Rose Ittar / Perfume Extract (10ml)',
                'Traditional Pearl & Coral Malas (Necklaces) (2 Units)',
                'Pure Brass Puja Spoon and Charna-Patra (1 Set)'
            ],
            significance: 'Daily Shringar (dressing and decorating) is considered the highest form of personal Upasana (worship) in the Pushtimarg and Gaudiya traditions. It deepens the relationship between the devotee and the divine, invoking a space of immense peace, beauty, and positive energy in the home.',
            care: 'Handle the silk shringar clothing gently. Dry clean only to preserve natural gold thread work. Store Samagri and organic perfume oils in dry, dark chambers away from humidity and direct sunlight.'
        };
    }, [id]);

    // Handle case where product might only have a single string image path
    const galleryImages = useMemo(() => {
        if (item.images && Array.isArray(item.images)) return item.images;
        if (item.image) return [item.image];
        return ['https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=800'];
    }, [item]);

    const handleWhatsAppEnquiry = () => {
        const text = `Jai Shri Krishna! I am highly interested in purchasing the ${item.nameEn}. Please share delivery timelines and customization options.`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919554054732?text=${encodedText}`, '_blank');
        triggerToast("Routing secure WhatsApp inquiry link...");
    };

    const handleOrderNow = () => {
        triggerToast("Order Feature Coming Soon");
    }

    const handleWishlistToggle = () => {
        const nextState = !isWishlisted;
        setIsWishlisted(nextState);
        triggerToast(
            nextState ? "Saved to your sacred wishlist" : "Removed from sacred wishlist"
        );
    };

    return (
        <div className="page-container">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Actions Row */}
                <div className="flex justify-between items-center mb-5 gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 font-cinzel text-xs font-bold tracking-widest text-gold hover:text-gold-bright transition cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" /> Go Back
                    </button>

                    {/* Wishlist Toggle Button (Top Right) */}
                    <button
                        onClick={handleWishlistToggle}
                        className="p-2.5 rounded-full bg-white/5 border border-gold/15 hover:border-gold/40 text-gold hover:bg-gold/10 hover:text-gold-bright hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-md z-20"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                        <Heart 
                            className={`w-5 h-5 transition-all duration-300 ${
                                isWishlisted 
                                    ? 'fill-gold text-gold scale-110' 
                                    : 'text-gold hover:scale-105'
                            }`} 
                        />
                    </button>
                </div>

                {/* MAIN PRODUCT BLOCK INTERACTIVE CANVAS (Asymmetric Grid) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* ================= LEFT SIDE: PREMIUM 2D GALLERY (5 Columns) ================= */}
                    <ProductGallery images={galleryImages} nameEn={item.nameEn} />

                    {/* ================= RIGHT SIDE: SACRED SPEC METADATA (7 Columns) ================= */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Dynamic Bilingual Typography Cluster */}
                        <div className="space-y-2">
                            <span className="section-header-tag">
                                {item.category}
                            </span>

                            <h1 className="section-header-title">
                                {item.nameEn}
                            </h1>

                            {item.nameSa && (
                                <p className="section-header-description mx-0">
                                    {item.nameSa}
                                </p>
                            )}
                        </div>

                        {/* Structured Dakshina / Price Section */}
                        <div className="flex items-baseline gap-4 py-3 border-y border-white/5">
                            {item.price !== undefined && item.price !== null ? (
                                <>
                                    <span className="badge-price-tag">
                                        ₹{item.price}
                                    </span>
                                    {item.originalPrice && (
                                        <span className="badge-original-price-tag">
                                            ₹{item.originalPrice}
                                        </span>
                                    )}
                                    {item.originalPrice && (
                                        <span className="badge-offer-tag">
                                            Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                        </span>
                                    )}
                                </>
                            ) : (
                                <span className="font-cinzel text-xs font-bold tracking-widest text-gold bg-gold/5 border border-gold/15 px-3 py-1 rounded-sm uppercase select-none">
                                    Price On Request
                                </span>
                            )}
                        </div>

                        {/* Narrative Brief */}
                        <p className="font-cormorant text-sm md:text-base text-cream/70 italic leading-relaxed">
                            {item.desc}
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">

                            {/* Primary action call: Direct pre-filled WhatsApp enquiry */}
                            <button
                                onClick={handleWhatsAppEnquiry}
                                className="btn-store-secondary"
                            >
                                <MessageCircle className="w-4 h-4 fill-current text-cream" />
                                Enquire via WhatsApp
                            </button>

                            {/* Secondary action call: Order Now (only if price is present) */}
                            {item.price !== undefined && item.price !== null && (
                                <button
                                    onClick={handleOrderNow}
                                    className="btn-store-primary"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                        Order Now
                                </button>
                            )}

                        </div>

                        {/* Quick Authentic Trust Strip */}
                        <div className="flex items-center gap-4 text-[10px] text-cream/40 font-mono tracking-wider pt-2">
                            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold/60" /> Handled with Purity</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-gold/60" /> Shipped From Sacred Sthal</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}