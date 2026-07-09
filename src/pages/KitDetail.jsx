import { useState, useMemo, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ChevronLeft, Heart, ShieldCheck,
    Sparkles, ShoppingCart
} from 'lucide-react';
import { premiumKits } from '../data/kitsData';
import { dummyProducts } from '../data/productData';
import ToastContext from '../context/ToastContext';
import ProductGallery from '../components/ProductGallery';

// Static Registry mapping detailed properties for default/original kit components
const ITEM_REGISTRY = {
    // Fallback Kit Items details
    'Pure Raw Silk Yellow Pitambar Dhoti & Dupatta': {
        id: 'prod-pitambar-dhoti',
        nameEn: 'Pure Raw Silk Yellow Pitambar Dhoti & Dupatta',
        nameHi: 'शुद्ध रेशमी पीताम्बर धोती और दुपट्टा',
        price: 650,
        image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=100&h=100&fit=crop',
        unit: 'Set'
    },
    'Handcrafted Zari Crown / Mukut with Mor Pankh detailing': {
        id: 'prod-zari-crown',
        nameEn: 'Handcrafted Zari Crown / Mukut with Mor Pankh detailing',
        nameHi: 'हस्तशिल्प जरी मुकुट (मोर पंख सहित)',
        price: 350,
        image: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?w=100&h=100&fit=crop',
        unit: 'Unit'
    },
    'Certified Organic Vrindavan Sandalwood Tilak Paste': {
        id: 'prod-mysore-chandan',
        nameEn: 'Certified Organic Vrindavan Sandalwood Tilak Paste',
        nameHi: 'वृंदावन चंदन तिलक पेस्ट (ऑर्गेनिक)',
        price: 240,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '50g'
    },
    'Handmade Natural Rose Ittar / Perfume Extract': {
        id: 'prod-rose-ittar',
        nameEn: 'Handmade Natural Rose Ittar / Perfume Extract',
        nameHi: 'गुलाब का इत्र (प्राकृतिक)',
        price: 180,
        image: 'https://images.unsplash.com/photo-1590075865003-e48277afd558?w=100&h=100&fit=crop',
        unit: '10ml'
    },
    'Traditional Pearl & Coral Malas (Necklaces)': {
        id: 'prod-coral-malas',
        nameEn: 'Traditional Pearl & Coral Malas (Necklaces)',
        nameHi: 'पारंपरिक मोती और मूंगा माला',
        price: 220,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: 'Units'
    },
    'Pure Brass Puja Spoon and Charna-Patra': {
        id: 'prod-brass-diya',
        nameEn: 'Pure Brass Puja Spoon and Charna-Patra',
        nameHi: 'पीतल आचमन चम्मच और चरण-पात्र',
        price: 190,
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=100&h=100&fit=crop',
        unit: 'Set'
    },

    // Kit specific database items details
    'Pure Mysore Chandan': {
        id: 'prod-mysore-chandan',
        nameEn: 'Pure Mysore Chandan',
        nameHi: 'शुद्ध मैसूर चंदन तिलक',
        price: 240,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '50g Jar'
    },
    'Bhimseni Camphor': {
        id: 'prod-bhimseni-kapoor',
        nameEn: 'Bhimseni Camphor',
        nameHi: 'भीमसेनी कपूर फ्लेक्स',
        price: 150,
        image: 'https://images.unsplash.com/photo-1631552598858-52f20cb45761?w=100&h=100&fit=crop',
        unit: '100g Pack'
    },
    'Moli & Akshat': {
        id: 'prod-kesar-moli',
        nameEn: 'Moli & Akshat',
        nameHi: 'पवित्र कलावा और अक्षत (चावल)',
        price: 40,
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=100&h=100&fit=crop',
        unit: 'Set'
    },
    'Sacred Havan Samagri': {
        id: 'prod-havan-samagri',
        nameEn: 'Sacred Havan Samagri',
        nameHi: 'वैदिक हवन सामग्री',
        price: 120,
        image: 'https://images.unsplash.com/photo-1631552598858-52f20cb45761?w=100&h=100&fit=crop',
        unit: '250g Pack'
    },
    'Brass Kalash': {
        id: 'prod-brass-kalash',
        nameEn: 'Brass Kalash',
        nameHi: 'तांबे/पीतल का कलश',
        price: 350,
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=100&h=100&fit=crop',
        unit: '1 Piece'
    },
    'Ganga Jal': {
        id: 'prod-ganga-jal',
        nameEn: 'Ganga Jal',
        nameHi: 'पवित्र गंगाजल (ऋषिकेश)',
        price: 50,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '100ml'
    },
    'Vastu Dosh Nivaran Ghee': {
        id: 'prod-vastu-ghee',
        nameEn: 'Vastu Dosh Nivaran Ghee',
        nameHi: 'वास्तु दोष निवारण गौ-घृत',
        price: 280,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '200ml Jar'
    },
    'Panchadhatu Coins': {
        id: 'prod-panchadhatu-coins',
        nameEn: 'Panchadhatu Coins',
        nameHi: 'पंचधातु सिद्ध सिक्के',
        price: 199,
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=100&h=100&fit=crop',
        unit: 'Set of 5'
    },
    'Terracotta Diyas': {
        id: 'prod-terracotta-diyas',
        nameEn: 'Terracotta Diyas',
        nameHi: 'पारंपरिक मिट्टी के दीये',
        price: 80,
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=100&h=100&fit=crop',
        unit: 'Set of 11'
    },
    'Kamal Gatta Garland': {
        id: 'prod-kamalgatta-garland',
        nameEn: 'Kamal Gatta Garland',
        nameHi: 'सिद्ध कमलगट्टा माला (१०८ दाने)',
        price: 150,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '1 Unit'
    },
    'Pure Kesar Tint': {
        id: 'prod-kesar-tint',
        nameEn: 'Pure Kesar Tint',
        nameHi: 'शुद्ध कश्मीरी केसर सिंदूर पेस्ट',
        price: 180,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: '5g'
    },
    'Maha Laxmi Yantra': {
        id: 'prod-laxmi-yantra',
        nameEn: 'Maha Laxmi Yantra',
        nameHi: 'सिद्ध महालक्ष्मी यन्त्र (तांबा)',
        price: 250,
        image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=100&h=100&fit=crop',
        unit: '1 Piece'
    }
};

// Helper function to resolve default kit items properties
const getItemDetails = (itemName) => {
    const cleanName = itemName.replace(/\s*\([^)]+\)$/, '').trim();
    const details = ITEM_REGISTRY[cleanName] || ITEM_REGISTRY[itemName];
    if (details) return details;

    const match = itemName.match(/^(.*?)\s*\(([^)]+)\)$/);
    return {
        id: 'fallback-item',
        nameEn: match ? match[1].trim() : itemName,
        nameHi: '',
        price: null,
        image: 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop',
        unit: match ? match[2].trim() : 'Unit'
    };
};

export default function KitDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { triggerToast } = useContext(ToastContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const item = useMemo(() => {
        const matchedKit = premiumKits?.find(k => k.id === id);
        if (matchedKit) return { ...matchedKit, type: 'kit' };

        return {
            id: 'fallback-item',
            nameEn: 'Premium Banke Bihari Shringar Kit',
            nameSa: 'श्री बाँके बिहारी श्रृंगार सेवा किट',
            category: 'Premium Kits',
            price: 2499,
            originalPrice: 3200,
            rating: 4.9,
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

    const galleryImages = useMemo(() => {
        if (item.images && Array.isArray(item.images)) return item.images;
        if (item.image) return [item.image];
        return ['https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=800'];
    }, [item]);

    const itemsList = useMemo(() => {
        return item.includedItems || item.contents || [];
    }, [item]);

    // Selection/additions states
    const [selections, setSelections] = useState({});
    const [customAdditions, setCustomAdditions] = useState({});
    const [productSearch, setProductSearch] = useState('');
    const [kitSearch, setKitSearch] = useState('');

    // Pagination (Load More) state
    const [visibleCount, setVisibleCount] = useState(2);

    // Form inputs state
    const initialFormState = {
  customerName: '',
  phone: '',
  deliveryOption: 'delivery',
  address: '',
  wantsPandit: false,
  customMessage: ''
};

const [formData, setFormData] = useState(initialFormState);

const handleFormChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};
    // Filter store products based on search input
    const filteredProducts = useMemo(() => {
        if (!productSearch.trim()) return dummyProducts;
        const query = productSearch.toLowerCase();
        return dummyProducts.filter(p =>
            p.nameEn?.toLowerCase().includes(query) ||
            p.nameHi?.toLowerCase().includes(query)
        );
    }, [productSearch]);

    // Filter original kit items based on kit search input
    const filteredKitItems = useMemo(() => {
        if (!kitSearch.trim()) return itemsList;
        const query = kitSearch.toLowerCase();
        return itemsList.filter(name => {
            const details = getItemDetails(name);
            return details.nameEn.toLowerCase().includes(query) ||
                details.nameHi.toLowerCase().includes(query);
        });
    }, [itemsList, kitSearch]);

    // Sliced products for load more pagination
    const slicedProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    // Reset visible count on search changes
    useEffect(() => {
        setVisibleCount(2);
    }, [productSearch]);

    // Initialize selections when itemsList changes
    useEffect(() => {
        const initial = {};
        itemsList.forEach(name => {
            initial[name] = { selected: true, quantity: 1 };
        });
        setSelections(initial);
        setCustomAdditions({});
        setProductSearch('');
        setKitSearch('');
        setFormData(initialFormState);
    }, [itemsList]);

    // Check if EVERY selected item has a valid price
    const allPricesAvailable = useMemo(() => {
        const originalItemsPriceOk = Object.entries(selections)
            .filter(([_, val]) => val.selected)
            .every(([name, _]) => {
                const price = getItemDetails(name).price;
                return price !== undefined && price !== null;
            });

        const additionsPriceOk = Object.values(customAdditions)
            .filter(val => val.selected)
            .every(val => val.price !== undefined && val.price !== null);

        return originalItemsPriceOk && additionsPriceOk;
    }, [selections, customAdditions]);

    // Calculate estimated total price dynamically
    const totalPrice = useMemo(() => {
        let total = 0;
        // Sum selections from base kit
        Object.entries(selections).forEach(([name, val]) => {
            if (val.selected) {
                const price = getItemDetails(name).price || 0;
                total += price * val.quantity;
            }
        });
        // Sum additional custom products
        Object.values(customAdditions).forEach(addition => {
            if (addition.selected) {
                const price = addition.price || 0;
                total += price * addition.quantity;
            }
        });
        return total;
    }, [selections, customAdditions]);

    const handleWhatsAppEnquiry = async () => {
        // Build the list of selected items
        const selectedList = Object.entries(selections)
            .filter(([_, value]) => value.selected)
            .map(([name, value]) => ({
                name: getItemDetails(name).nameEn,
                quantity: value.quantity,
                unit: getItemDetails(name).unit
            }));

        if (selectedList.length === 0) {
            triggerToast("Please select at least one item to order.");
            return;
        }

        // Build list of additions
        const additionsList = Object.values(customAdditions)
            .filter(a => a.selected)
            .map(a => ({
                name: a.name,
                quantity: a.quantity,
                unit: a.unit || 'Pc',
                price: a.price ? a.price * a.quantity : null
            }));

        // Build WhatsApp text representation
        const itemsMsg = selectedList.map(i => `• ${i.name} (Qty: ${i.quantity}, Unit: ${i.unit})`);
        const additionsMsg = additionsList.map(a => `• ${a.name} (Qty: ${a.quantity}, Unit: ${a.unit})${a.price ? ` [Price: ₹${a.price}]` : ''}`);

        let text = `Jai Shri Krishna!\n\nI want to place an order for the customized *${item.nameEn}*.\n`;
        text += `\n*Customized Kit Items:*\n${itemsMsg.join('\n')}\n`;

        if (additionsMsg.length > 0) {
            text += `\n*Additional Store Items:*\n${additionsMsg.join('\n')}\n`;
        }

        const priceText = allPricesAvailable ? `₹${totalPrice}` : 'Price on Request';
        text += `\n*Estimated Total Price:* ${priceText}\n`;

        if (formData.customerName.trim()) {
            text += `\n*Customer Name:* ${formData.customerName.trim()}`;
        }

        if (formData.phone.trim()) {
            text += `\n*Phone Number:* ${formData.phone.trim()}`;
        }

        text += `\n*Delivery Option:* ${formData.deliveryOption === 'delivery' ? '📦 Home Delivery' : '🏪 In-Store Pickup'
            }`;

        if (formData.deliveryOption === 'delivery' && formData.address.trim()) {
            text += `\n*Delivery Address:* ${formData.address.trim()}`;
        }

        text += `\n*Pandit Ji Service:* ${formData.wantsPandit ? '🕉️ Requested' : '❌ Not Required'}`;

        if (formData.customMessage.trim()) {
            text += `\n*Custom Instructions/Message:* ${formData.customMessage.trim()}`;
        }

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919554054732?text=${encodedText}`, '_blank');
        triggerToast("Routing secure WhatsApp order checkout...");
    };

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
                            className={`w-5 h-5 transition-all duration-300 ${isWishlisted
                                ? 'fill-gold text-gold scale-110'
                                : 'text-gold hover:scale-105'
                                }`}
                        />
                    </button>
                </div>

                {/* MOBILE VIEW GALLERY STAGE (renders at very top on mobile screens, hidden on desktop) */}
                <div className="block lg:hidden mb-6">
                    <ProductGallery images={galleryImages} nameEn={item.nameEn} />
                </div>

                {/* MAIN PRODUCT BLOCK INTERACTIVE CANVAS (Asymmetric Grid Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* ================= LEFT SIDE: GALLERY, DEVOTEE FORM, & LIVE BILLING SUMMARY  ================= */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 order-2 lg:order-1">

                        {/* DESKTOP VIEW GALLERY (hidden on mobile, visible on desktop) */}
                        <div className="hidden lg:block">
                            <ProductGallery images={galleryImages} nameEn={item.nameEn} />
                        </div>

                        {/* Delivery & Customization Form */}
                        <div className="form-field-card">
                            <h3 className="content-header-title">
                                <ShieldCheck className="w-4 h-4 text-gold-bright" />
                                Delivery & Sacred Order Details
                            </h3>
                            <p className="content-header-description">
                                Enter your details to generate a customized WhatsApp invoice enquiry.
                            </p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Customer Name */}
                                    <div className="space-y-1">
                                        <label className="form-field-title">
                                            Devotee Name / Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            name="customerName"
                               value={formData.customerName}
  onChange={handleFormChange}
                                            placeholder="Enter your name"
                                            className="form-field-input"
                                        />
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-1">
                                        <label className="form-field-title">
                                            Phone Number / Mobile
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                             value={formData.phone}
  onChange={handleFormChange}
                                            placeholder="Enter 10-digit mobile number"
                                            className="form-field-input"
                                        />
                                    </div>
                                </div>

                                {/* Delivery Options */}
                                <div className="space-y-2">
                                    <label className="form-field-title">
                                        Home Delivery or In-Store Pickup
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { id: 'delivery', title: 'Home Delivery', desc: 'At Your Doorstep' },
                                            { id: 'pickup', title: 'In-Store Pickup', desc: 'Collect From Shop' }
                                        ].map((opt) => (
                                            <label
                                                key={opt.id}
                                                className={`flex flex-col justify-between p-3 rounded-sm border cursor-pointer select-none transition-all duration-300 ${formData.deliveryOption === opt.id
                                                    ? 'form-field-radio-enabled'
                                                    : 'form-field-radio-disabled'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    <input
                                                        type="radio"
                                                        name="deliveryOption"
                                                        value={opt.id}
                                                        checked={formData.deliveryOption === opt.id}
                                                        onChange={handleFormChange}
                                                        className="w-3.5 h-3.5 text-gold border-gold/30 bg-transparent focus:ring-gold/50 cursor-pointer accent-gold"
                                                    />
                                                    <span className="font-cinzel text-[10px] font-bold text-cream tracking-wide">
                                                        {opt.title}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-cormorant text-cream/40 italic pl-5">
                                                    {opt.desc}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Address - Asked ONLY in case of Home Delivery */}
                                {formData.deliveryOption === 'delivery' && (
                                    <div className="space-y-1 animate-fade-in">
                                        <label className="form-field-title">
                                            Delivery Address
                                        </label>
                                        <textarea
                                            value={formData.address}
                                            name="address"
                                            onChange={handleFormChange}
                                            rows={2}
                                            placeholder="Enter full address for delivery"
                                            className="form-field-input resize-none"
                                        />
                                    </div>
                                )}

                                {/* Request Pandit Service */}
                                <div className="pt-2">
                                    <label className="flex items-center gap-3 p-3 rounded-sm border border-gold/20 bg-white/[0.01] hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={formData.wantsPandit}
                                            name="wantsPandit"
                                            onChange={handleFormChange}
                                            className="form-field-checkbox"
                                        />
                                        <div className="flex flex-col leading-tight">
                                            <span className="font-cinzel text-[10px] font-bold text-gold tracking-wider uppercase">
                                                Request Pandit Ji Service
                                            </span>
                                            <span className="text-[10px] font-cormorant text-cream/50 italic mt-0.5">
                                                Check this if you would like us to arrange a certified Pandit Ji to perform the rituals (Additional Dakshina applies).
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                {/* Custom Message / Instructions */}
                                <div className="space-y-1">
                                    <label className="form-field-title">
                                        Custom Message / Ritual Instructions
                                    </label>
                                    <textarea
                                        value={formData.customMessage}
                                        name="customMessage"
                                        onChange={handleFormChange}
                                        rows={2}
                                        placeholder="Any special customization requests, auspicious dates, or custom messages for deities..."
                                        className="form-field-input resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Customized Kit Summary Card Section (Final Billing List) */}
                        <div className="form-field-card">
                            <h3 className="content-header-title">
                                <Sparkles className="w-4 h-4 text-gold-bright animate-pulse" />
                                Customized Bundle Billing List
                            </h3>
                            <p className="content-header-description">
                                Review your final items, quantities, photos, and prices.
                            </p>

                            <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                                {/* Render selected original kit items */}
                                {Object.entries(selections)
                                    .filter(([_, val]) => val.selected)
                                    .map(([name, val], index) => {
                                        const details = getItemDetails(name);
                                        return (
                                            <div key={`kit-${index}`} className="flex justify-between items-center py-2.5 border-b border-white/5 gap-2 md:gap-3 text-[11px] sm:text-xs">
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                    <span className="font-mono text-gold/60 shrink-0 text-[10px] hidden xs:inline">
                                                        [{index + 1}]
                                                    </span>

                                                    {/* Photo */}
                                                    <img
                                                        src={details.image}
                                                        alt={details.nameEn}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-xs border border-gold/15 shrink-0"
                                                    />

                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <Link
                                                            to={`/products/${details.id}`}
                                                            className="font-cormorant text-cream hover:underline hover:text-gold-bright transition-colors font-semibold truncate leading-tight"
                                                            title="View product description (Opens in new tab)"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {details.nameEn}
                                                        </Link>
                                                        {details.nameHi && (
                                                            <span className="text-[9px] sm:text-[10px] text-cream/40 font-sanskrit truncate leading-none mt-0.5">
                                                                {details.nameHi}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Qty, Unit, Price details */}
                                                <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-mono text-[10px] sm:text-[11px] text-right pl-1">
                                                    <span className="text-cream/70 whitespace-nowrap">
                                                        x{val.quantity} <span className="text-cream/40 uppercase text-[9px] sm:text-[10px]">{details.unit}</span>
                                                    </span>
                                                    <span className="text-gold-bright w-12 sm:w-16 whitespace-nowrap font-bold">
                                                        {details.price ? `₹${details.price * val.quantity}` : 'Enquiry'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                {/* Render selected extra store items */}
                                {Object.entries(customAdditions)
                                    .filter(([_, val]) => val.selected)
                                    .map(([id, val], index) => {
                                        const startIdx = Object.entries(selections).filter(([_, v]) => v.selected).length;
                                        const prodDetail = dummyProducts.find(p => p.id === id);
                                        const prodImage = prodDetail?.image || 'https://images.unsplash.com/photo-1609137144813-90d56a73f84d?w=100&h=100&fit=crop';
                                        const prodHi = prodDetail?.nameHi || '';
                                        return (
                                            <div key={`add-${id}`} className="flex justify-between items-center py-2.5 border-b border-white/5 gap-2 md:gap-3 text-[11px] sm:text-xs">
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                    <span className="font-mono text-gold/60 shrink-0 text-[10px] hidden xs:inline">
                                                        [{startIdx + index + 1}]
                                                    </span>

                                                    {/* Photo */}
                                                    <img
                                                        src={prodImage}
                                                        alt={val.name}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 object-cover rounded-xs border border-gold/15 shrink-0"
                                                    />

                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <Link
                                                            to={`/products/${id}`}
                                                            className="font-cormorant text-cream font-semibold truncate hover:underline hover:text-gold-bright transition-colors leading-tight"
                                                            title="View product description (Opens in new tab)"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {val.name}
                                                        </Link>
                                                        {prodHi && (
                                                            <span className="text-[9px] sm:text-[10px] text-cream/40 font-sanskrit truncate leading-none mt-0.5">
                                                                {prodHi}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Qty, Unit, Price details */}
                                                <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-mono text-[10px] sm:text-[11px] text-right pl-1">
                                                    <span className="text-cream/70 whitespace-nowrap">
                                                        x{val.quantity} <span className="text-cream/40 uppercase text-[9px] sm:text-[10px]">{val.unit || 'Pc'}</span>
                                                    </span>
                                                    <span className="text-gold-bright w-12 sm:w-16 whitespace-nowrap font-bold">
                                                        {val.price ? `₹${val.price * val.quantity}` : 'Enquiry'}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Total Price Display */}
                            <div className="flex justify-between items-center pt-3 border-t border-gold/15 font-cinzel text-xs font-bold text-gold">
                                <span>Estimated Total Price:</span>
                                <span className="text-gold-bright text-sm tracking-wide font-mono">
                                    {allPricesAvailable ? `₹${totalPrice}` : 'Price on Request'}
                                </span>
                            </div>
                        </div>

                        {/* Order Submissions button */}
                        <div className="flex flex-col gap-4 pt-1">
                            <button
                                onClick={handleWhatsAppEnquiry}
                                className="btn-store-primary w-full group"
                            >
                                <ShoppingCart className="w-3.5 h-3.5 group-hover:scale-110" />
                                Order via WhatsApp
                            </button>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDE: CUSTOMIZER & DETAILS (7 Columns) ================= */}
                    <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">

                        {/* Dynamic Bilingual Typography Cluster */}
                        <div className="space-y-2">
                            <span className="section-header-tag">
                                {item.tag}
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
                                    <p className='italic font-cormorant'> Starting from </p>
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
                            {item.description || item.desc}
                        </p>

                        {/* Customize Kit Items Section */}
                        {itemsList.length > 0 && (
                            <div className="space-y-4 pt-6 border-t border-white/5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <h3 className="content-header-title">
                                            <Sparkles className="w-4 h-4 text-gold-bright animate-pulse" />
                                            Customize Kit Contents
                                        </h3>
                                        <p className="content-header-description">
                                            Configure quantities, toggles and product description links.
                                        </p>
                                    </div>

                                    {/* Search Kit Items Input */}
                                    <div className="relative w-full sm:w-60">
                                        <input
                                            type="text"
                                            value={kitSearch}
                                            onChange={(e) => setKitSearch(e.target.value)}
                                            placeholder="Search kit items..."
                                            className="form-field-input h-7"
                                        />
                                        {kitSearch && (
                                            <button
                                                onClick={() => setKitSearch('')}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gold hover:text-gold-bright font-sans text-xs cursor-pointer"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar pt-1">
                                    {filteredKitItems.length > 0 ? (
                                        filteredKitItems.map((itemName, index) => {
                                            const selection = selections[itemName] || { selected: true, quantity: 1 };
                                            const details = getItemDetails(itemName);
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex flex-col justify-between p-3 rounded-sm border transition-all duration-300 ${selection.selected
                                                        ? 'border-gold/30 bg-gold/5'
                                                        : 'border-white/5 bg-white/[0.01] opacity-40'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selection.selected}
                                                            onChange={() => {
                                                                setSelections(prev => ({
                                                                    ...prev,
                                                                    [itemName]: {
                                                                        ...selection,
                                                                        selected: !selection.selected
                                                                    }
                                                                }));
                                                            }}
                                                            className="form-field-checkbox w-3 h-3"
                                                            id={`kit-chk-${index}`}
                                                        />

                                                        {/* Product Photo */}
                                                        <img
                                                            src={details.image}
                                                            alt={details.nameEn}
                                                            className="w-9 h-9 object-cover rounded-xs border border-gold/15 shrink-0"
                                                        />

                                                        <div className="flex flex-col min-w-0 flex-1 leading-tight">
                                                            <Link
                                                                to={`/products/${details.id}`}
                                                                className="font-cormorant text-xs text-cream hover:underline hover:text-gold-bright transition-colors truncate font-semibold"
                                                                title="View product description (Opens in new tab)"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {details.nameEn}
                                                            </Link>
                                                            {details.nameHi && (
                                                                <span className="text-[9px] text-cream/40 font-sanskrit truncate mt-0.5">
                                                                    {details.nameHi}
                                                                </span>
                                                            )}
                                                            <span className="text-[9px] font-mono text-gold-bright mt-1">
                                                                {details.price ? `₹${details.price}` : 'Enquiry'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {selection.selected && (
                                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 select-none">
                                                            <div className="flex items-center bg-white/5 border border-gold/15 rounded-sm p-0.5">
                                                                <button
                                                                    aria-label='Decrease quantity'
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (selection.quantity > 1) {
                                                                            setSelections(prev => ({
                                                                                ...prev,
                                                                                [itemName]: {
                                                                                    ...selection,
                                                                                    quantity: selection.quantity - 1
                                                                                }
                                                                            }));
                                                                        }
                                                                    }}
                                                                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gold hover:text-gold-bright hover:bg-gold/10 rounded-xs transition-colors cursor-pointer"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="w-5 text-center font-mono text-[10px] font-bold text-cream">
                                                                    {selection.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setSelections(prev => ({
                                                                            ...prev,
                                                                            [itemName]: {
                                                                                ...selection,
                                                                                quantity: selection.quantity + 1
                                                                            }
                                                                        }));
                                                                    }}
                                                                    className="w-5 h-5 flex items-center justify-center text-xs font-bold text-gold hover:text-gold-bright hover:bg-gold/10 rounded-xs transition-colors cursor-pointer"
                                                                    aria-label="Increase quantity"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                            <span className="text-[9px] font-mono tracking-wider text-cream/40 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-sm uppercase font-bold">
                                                                {details.unit}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="col-span-full py-6 text-center font-cormorant text-xs italic text-cream/40">
                                            No kit items found matching "{kitSearch}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Add Extra Products Table Section */}
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="content-header-title">
                                        <ShoppingCart className="w-4 h-4 text-gold-bright" />
                                        Add Additional Store Items
                                    </h3>
                                    <p className="content-header-description">
                                        Search and add optional items directly from our store database.
                                    </p>
                                </div>

                                {/* Search Input Box */}
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        value={productSearch}
                                        onChange={(e) => setProductSearch(e.target.value)}
                                        placeholder="Search store items..."
                                        className="form-field-input h-7"
                                    />
                                    {productSearch && (
                                        <button
                                            onClick={() => setProductSearch('')}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gold hover:text-gold-bright font-sans text-xs cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="border border-gold/15 bg-white/[0.01] rounded-sm overflow-hidden">
                                <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-white/[0.02]">
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-left py-2 px-3 border-b border-gold/15 w-12 hidden xs:table-cell">#</th>
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-left py-2 px-3 border-b border-gold/15">Product</th>
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-left py-2 px-3 border-b border-gold/15 w-16 sm:w-24">Unit</th>
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-left py-2 px-3 border-b border-gold/15 w-16 sm:w-24">Price</th>
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-center py-2 px-3 border-b border-gold/15 w-24 sm:w-32">Quantity</th>
                                                <th className="font-cinzel text-[10px] tracking-wider text-gold uppercase text-center py-2 px-3 border-b border-gold/15 w-16 sm:w-24">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {slicedProducts.length > 0 ? (
                                                slicedProducts.map((prod, index) => {
                                                    const added = customAdditions[prod.id]?.selected || false;
                                                    const qty = customAdditions[prod.id]?.quantity || 1;
                                                    return (
                                                        <tr
                                                            key={prod.id}
                                                            className={`font-cormorant text-sm hover:bg-white/[0.02] transition-colors ${added ? 'bg-gold/[0.02]' : ''
                                                                }`}
                                                        >
                                                            {/* Sequence Number */}
                                                            <td className="font-mono text-xs text-cream/40 py-3 px-3 select-none hidden xs:table-cell">
                                                                {index + 1}
                                                            </td>
                                                            {/* Product Names (English & Sanskrit/Hindi) + Photo */}
                                                            <td className="py-3 px-3">
                                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                                                    <img
                                                                        src={prod.image}
                                                                        alt={prod.nameEn}
                                                                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xs border border-gold/15 shrink-0"
                                                                    />
                                                                    <div className="flex flex-col min-w-0">
                                                                        <Link
                                                                            to={`/products/${prod.id}`}
                                                                            className="font-medium text-cream truncate hover:underline hover:text-gold-bright transition-colors text-xs sm:text-sm"
                                                                            title="View product description (Opens in new tab)"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {prod.nameEn}
                                                                        </Link>
                                                                        {prod.nameHi && (
                                                                            <span className="text-[10px] sm:text-[11px] text-cream/40 font-sanskrit truncate">{prod.nameHi}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* Product Unit */}
                                                            <td className="py-3 px-3 text-[10px] sm:text-xs text-cream/60 font-mono uppercase">
                                                                {prod.unit}
                                                            </td>
                                                            {/* Product Price */}
                                                            <td className="py-3 px-3 font-mono text-[10px] sm:text-xs">
                                                                {prod.price ? (
                                                                    <span className="text-gold-bright">₹{prod.price}</span>
                                                                ) : (
                                                                    <span className="text-cream/30 italic">Enquiry</span>
                                                                )}
                                                            </td>
                                                            {/* Quantity Counter */}
                                                            <td className="py-3 px-3 text-center">
                                                                <div className="inline-flex items-center gap-1 bg-white/5 border border-gold/15 rounded-sm p-0.5 select-none scale-90 sm:scale-100 shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            if (qty > 1) {
                                                                                setCustomAdditions(prev => ({
                                                                                    ...prev,
                                                                                    [prod.id]: {
                                                                                        ...prev[prod.id],
                                                                                        quantity: qty - 1
                                                                                    }
                                                                                }));
                                                                            }
                                                                        }}
                                                                        className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold text-gold hover:text-gold-bright hover:bg-gold/10 rounded-xs transition-colors cursor-pointer"
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="w-4 sm:w-5 text-center font-mono text-[11px] sm:text-xs text-cream">
                                                                        {qty}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setCustomAdditions(prev => ({
                                                                                ...prev,
                                                                                [prod.id]: {
                                                                                    ...prev[prod.id],
                                                                                    selected: prev[prod.id]?.selected || false,
                                                                                    quantity: qty + 1
                                                                                }
                                                                            }));
                                                                        }}
                                                                        className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs font-bold text-gold hover:text-gold-bright hover:bg-gold/10 rounded-xs transition-colors cursor-pointer"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            {/* Action Toggle Button */}
                                                            <td className="py-3 px-3 text-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setCustomAdditions(prev => ({
                                                                            ...prev,
                                                                            [prod.id]: {
                                                                                selected: !added,
                                                                                quantity: qty,
                                                                                name: prod.nameEn,
                                                                                price: prod.price,
                                                                                unit: prod.unit
                                                                            }
                                                                        }));
                                                                    }}
                                                                    className={`px-2 sm:px-3 py-1 rounded-sm text-[9px] sm:text-[10px] font-bold font-cinzel tracking-wider uppercase transition-colors cursor-pointer w-full ${added
                                                                        ? 'bg-gold text-dark-bg border border-gold'
                                                                        : 'bg-transparent text-gold border border-gold/30 hover:bg-gold/10'
                                                                        }`}
                                                                >
                                                                    {added ? 'Added' : 'Add'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="py-8 text-center font-cormorant text-sm italic text-cream/40">
                                                        No products found matching "{productSearch}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {visibleCount < filteredProducts.length && (
                                    <div className="flex justify-center p-3 bg-white/[0.02] border-t border-gold/15">
                                        <button
                                            type="button"
                                            onClick={() => setVisibleCount(prev => prev + 2)}
                                            className="px-4 py-1.5 border border-gold/40 hover:border-gold rounded-sm text-[10px] font-cinzel tracking-wider text-gold hover:bg-gold/10 hover:text-gold-bright transition duration-300 cursor-pointer uppercase font-bold"
                                        >
                                            Load More Products
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}