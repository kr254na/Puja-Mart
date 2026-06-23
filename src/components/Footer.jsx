import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Truck, RotateCcw, BadgeCheck, 
  MapPin, Phone, Mail, Clock, Send, 
  MessageCircle, LayoutGrid,Contact,
  HelpingHand
} from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterEmail('');
    alert("Feature coming soon");
  };

  return (
    <footer className="relative bg-[#0F0500] border-t border-gold/30 text-cream overflow-hidden">
      
      {/* Sub-Footer: Trust Badges Bar */}
      <div className="border-b border-gold/20 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
            <ShieldCheck className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="text-xs md:text-sm font-semibold tracking-wider font-cinzel text-gold-bright">Secure Payments</p>
              <p className="text-[10px] text-cream/50 font-sanskrit">100% सुरक्षित भुगतान</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
            <Truck className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="text-xs md:text-sm font-semibold tracking-wider font-cinzel text-gold-bright">Fast Delivery</p>
              <p className="text-[10px] text-cream/50 font-sanskrit">त्वरित होम डिलीवरी</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
            <BadgeCheck className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="text-xs md:text-sm font-semibold tracking-wider font-cinzel text-gold-bright">Quality Assured</p>
              <p className="text-[10px] text-cream/50 font-sanskrit">उच्चतम प्रामाणिकता</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 group">
            <RotateCcw className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <p className="text-xs md:text-sm font-semibold tracking-wider font-cinzel text-gold-bright">Easy Returns</p>
              <p className="text-[10px] text-cream/50 font-sanskrit">आसान वापसी विकल्प</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 ">
          
          {/* Column 1: Brand Info */}
          <div className="xs:col-span-2 sm:col-span-1 lg:col-span-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-cinzel font-bold text-xl text-center md:text-2xl tracking-wider bg-gradient-to-r from-gold-bright via-saffron to-gold bg-clip-text text-transparent">
                Agarwal Pujan Bhandar
              </h2>
              <p className="text-xs text-gold/80 font-sanskrit text-center tracking-widest">
                All your religious needs at one reliable center.
              </p>
            </div>
            <p className="font-cormorant text-center text-sm text-cream/70 leading-relaxed ">
              Authentic puja samagri, deity garments, religious books and puja samagri available.
            </p>
            
                      {/* Payment Methods Layout Grid Row */}
          <div className="flex mx-auto max-w-sm items-center gap-3 bg-black/20 px-4 py-1.5 border border-gold/10 rounded-md tracking-wider font-cinzel text-[10px] text-gold-bright/60 select-none">
             <span>PhonePe</span> • <span>Google Pay</span> • <span>Paytm</span> • <span>Card</span>
          </div>

                    {/* Spiritual Quote Display Center Ring Accent */}
          <div className="font-sanskrit text-sm md:text-base text-center text-gold-bright/70 tracking-widest">
            ॥ ओम नमो भगवते वासुदेवाय ॥
          </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-xs text-center font-semibold text-gold-bright mb-2">
                Get latest updates on festivals and new products
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-sm mx-auto border
               border-gold/30 bg-black/20 rounded-full p-1 pl-3">
                <input 
                  type="email" 
                  required
                  placeholder="Enter Email" 
                  value={newsletterEmail}
                  onChange={(e)=>setNewsletterEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full focus:ring-0 text-cream placeholder-cream/35"
                />
                <button type="submit" className="p-2 bg-gradient-to-r from-gold-bright to-saffron text-black rounded-full hover:opacity-90 transition active:scale-95">
                  <Send className="w-3 h-3" />
                </button>
              </form>
            </div>


          </div>

          {/* Column 2: Shop Categories */}
<div className="xs:col-span-1 lg:col-span-2 flex flex-col gap-3">

<h3 className="font-cinzel text-sm font-bold text-gold flex tracking-wider
border-b border-gold/10 pb-2 flex items-center md:justify-start gap-2">
  <LayoutGrid className="h-4 w-4 text-gold-bright" />
  Categories
</h3>
  <ul className="flex flex-col gap-2 text-cream/70 font-cormorant text-sm">
    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=puja-essentials">Puja Essentials</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=deity-clothing">Deity Clothing</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=sringar-accessories">Shringar & Accessories</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=tulsi-kanthi-malas">Tulsi Kanthi & Malas</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=brass-copperware">Brass & Copperware</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=spiritual-books">Spiritual Books</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=hawan-yagna-supplies">Hawan & Yagna Supplies</Link>
    </li>

    <li className="hover:text-gold-bright transition">
      <Link to="/product?cat=wedding-puja-kits">Wedding Puja Kits</Link>
    </li>
  </ul>
</div>

          {/* Column 3: Customer Services & Info (2/12 width) */}
          <div className="xs:col-span-1 lg:col-span-2 flex flex-col gap-3">
            <h3 className="font-cinzel text-sm font-bold text-gold flex tracking-wider
border-b border-gold/10 pb-2 flex items-center gap-2">
  <HelpingHand className="h-4 w-4 text-gold-bright" />
  Services
</h3><ul className="flex flex-col gap-2 text-sm text-cream/70 font-cormorant">
              <li className="hover:text-gold-bright transition"><Link to="/track-order">Track Order</Link></li>
              <li className="hover:text-gold-bright transition"><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li className="hover:text-gold-bright transition"><Link to="/return-policy">Return Policy</Link></li>
              <li className="hover:text-gold-bright transition"><Link to="/refund-policy">Refund Policy</Link></li>
              <li className="hover:text-gold-bright transition"><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Live Map Embed (4/12 width) */}
          <div className="xs:col-span-2 sm:col-span-1 lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-cinzel text-sm font-bold text-gold flex tracking-wider
border-b border-gold/10 pb-2 flex items-center gap-2">
  <Contact className="h-4 w-4 text-gold-bright" />
  Contact
</h3><div className="flex flex-col gap-2 text-xs text-cream/70">
  <div className="flex items-start gap-2">
    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
    <a
      href="https://maps.app.goo.gl/cwSR45AsHH2yZ2R17"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-gold-bright transition"
    >
      Agarwal Pujan Bhandar, Shop No. 7, Gola Market, Sadar Bazar, Lucknow, Uttar Pradesh 226002
    </a>
  </div>

  <div className="flex items-center gap-2">
    <Phone className="w-4 h-4 text-gold shrink-0" />
    <a
      href="tel:+919838542971"
      className="hover:text-gold-bright transition"
    >
      +91 98385 42971
    </a>
  </div>

  <div className="flex items-center gap-2">
  <MessageCircle className="w-4 h-4 text-gold shrink-0" />
  <a
    href="https://wa.me/919554054732"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-gold-bright transition"
  >
    9554054732
  </a>
</div>

  <div className="flex items-center gap-2">
    <Mail className="w-4 h-4 text-gold shrink-0" />
    <a
      href="mailto:krishnaagarwal0193@gmail.com"
      className="hover:text-gold-bright transition"
    >
      krishnaagarwal0193@gmail.com
    </a>
  </div>

  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4 text-gold shrink-0" />
    <span>Mon - Sun : 9 AM - 8 PM</span>
  </div>
</div>

            {/* Embedded Responsive Google Map for Shop Address Location */}
            <div className="w-full h-32 rounded-lg overflow-hidden border border-gold/20 shadow-inner bg-black/40">
              <iframe
               title="Agarwal Pujan Bhandar"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.331016911975!2d80.944158!3d26.829421999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfcf8b796f107%3A0x933cdb8ce45d5d39!2sAggarwal%20Pooja%20Bhandar!5e0!3m2!1sen!2sin!4v1782166007948!5m2!1sen!2sin" 
              allowFullScreen="" 
              className="w-full h-full border-0 filter invert-[90%] hue-rotate-[180deg] contrast-[100%]"
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

        </div>


        {/* Legal Links & Detailed Copyright Block */}
        <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t
        border-gold/10 pt-6 text-[11px] text-cream/40">
          <p className="text-center font-sans tracking-wide">
            &copy; 2026 Agarwal Pujan Bhandar. All Rights Reserved.
          </p>
          <p className="font-sans text-center tracking-wide">
            Developed by Krishna Agarwal
          </p>
        </div>

      </div>
    </footer>
  );
}