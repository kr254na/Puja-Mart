import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useContext } from 'react';
import ToastContext from '../context/ToastContext';

export default function About() {
    const {triggerToast} = useContext(ToastContext);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real production, this routes via axios to your Spring Boot /api/contact endpoint
    triggerToast("Message received! May your day be blessed.", "success");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="max-w-[1920px] mx-auto space-y-16">
        
        {/* SECTION 1: ABOUT THE SHOP / HERITAGE HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetric Typography Story Block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="font-sanskrit text-xs tracking-[4px] text-gold-bright uppercase block">Hamari Parampara</span>
              <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-black tracking-wide leading-tight mb-6 bg-gradient-to-r from-gold-bright via-saffron to-cream bg-clip-text text-transparent shimmer-text">
                Agarwal Pujan Bhandar
              </h1>
              <div className="w-20 h-[1px] bg-gold/40 mt-2" />
            </div>
            
            <p className="font-cormorant text-lg text-cream/80 leading-relaxed italic">
              "Bringing the authentic spiritual essence of sacred altars directly into your household."
            </p>
            
            <div className="space-y-4 font-sans text-sm text-cream/60 leading-relaxed">
              <p>
                Founded with a deep commitment to preserving Vedic traditions, we specialize in curating premium, complete puja kits, sacred brassware, and pristine samagri. Every product is sourced responsibly and handled with the utmost sanctity to ensure your spiritual rituals are pure and seamless.
              </p>
              <p>
                Whether you are setting up a new home altar, preparing for a major festival, or looking for traditional daily essentials, we stand as your trusted partner in devotion.
              </p>
            </div>

            {/* Value Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-sm border border-gold/10 bg-white/[0.01]">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-gold-bright uppercase">100% Pure & Authentic</h4>
                  <p className="font-cormorant text-xs text-cream/40 italic mt-0.5">Sourced strictly adhering to traditional rituals.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-sm border border-gold/10 bg-white/[0.01]">
                <HeartHandshake className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-gold-bright uppercase">Devotional Legacy</h4>
                  <p className="font-cormorant text-xs text-cream/40 italic mt-0.5">Built on absolute honesty and cultural trust.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Majestic Framed Display Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="showcase-frame group mx-auto lg:mx-0">
              <div className="showcase-frame-inner">
                <img 
                  src="/shop.jpeg" 
                  alt="Altar Sacred Space" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* SECTION 2: CONTACT INFORMATION & INPUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Informational Touchpoints (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <h3 className="font-cinzel text-xl font-bold tracking-wide text-gold-bright">Get In Touch</h3>
              <p className="font-cormorant text-xs text-cream/40 italic">Have custom ritual packaging requests? Reach out anytime.</p>
            </div>

            <div className="space-y-2 font-sans text-xs">
              {/* Location Card */}
              <a 
                href="https://maps.app.goo.gl/cwSR45AsHH2yZ2R17" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-sm hover:border-gold/30 hover:bg-white/[0.02] transition cursor-pointer text-left block"
              >
                <div className="w-9 h-9 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0"><MapPin className="w-4 h-4" /></div>
                <div>
                  <p className="font-cinzel font-bold text-cream/40 uppercase tracking-wider text-[9px]">Main Kendra Address</p>
                  <p className="text-cream/80 mt-0.5 font-medium">Agarwal Pujan Bhandar, Shop No. 7, Gola Market, Sadar Bazar, Lucknow, Uttar Pradesh 226002, India</p>
                </div>
              </a>

              {/* Phone Card */}
              <a 
                href="tel:+919838542971" 
                className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-sm hover:border-gold/30 hover:bg-white/[0.02] transition cursor-pointer text-left block"
              >
                <div className="w-9 h-9 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0"><Phone className="w-4 h-4" /></div>
                <div>
                  <p className="font-cinzel font-bold text-cream/40 uppercase tracking-wider text-[9px]">Call</p>
                  <p className="text-cream/80 mt-0.5 font-medium">+91 9838542971</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/919554054732" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-sm hover:border-gold/30 hover:bg-white/[0.02] transition cursor-pointer text-left block"
              >
                <div className="w-9 h-9 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0"><MessageSquare className="w-4 h-4" /></div>
                <div>
                  <p className="font-cinzel font-bold text-cream/40 uppercase tracking-wider text-[9px]">WhatsApp Support</p>
                  <p className="text-cream/80 mt-0.5 font-medium">+91 9554054732</p>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:krishnaagarwal0193@gmail.com" 
                className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-sm hover:border-gold/30 hover:bg-white/[0.02] transition cursor-pointer text-left block"
              >
                <div className="w-9 h-9 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0"><Mail className="w-4 h-4" /></div>
                <div>
                  <p className="font-cinzel font-bold text-cream/40 uppercase tracking-wider text-[9px]">Electronic Correspondence</p>
                  <p className="text-cream/80 mt-0.5 font-medium">krishnaagarwal0193@gmail.com</p>
                </div>
              </a>

              {/* Timing Card */}
              <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01] rounded-sm">
                <div className="w-9 h-9 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center text-gold shrink-0"><Clock className="w-4 h-4" /></div>
                <div>
                  <p className="font-cinzel font-bold text-cream/40 uppercase tracking-wider text-[9px]">Auspicious Operating Hours</p>
                  <p className="text-cream/80 mt-0.5 font-medium">09:00 AM – 08:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Glassmorphic Inquiry Form (7 Columns) */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 border border-gold/15 bg-gradient-to-br from-white/[0.03] to-transparent p-6 md:p-8 rounded-sm backdrop-blur-xl space-y-4">
            <h3 className="font-cinzel text-xs font-bold tracking-widest text-gold-bright uppercase flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4" /> Send Direct Inquiry
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-cinzel text-[10px] tracking-wider text-cream/50 block uppercase">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-sm p-3 font-cinzel text-xs tracking-wide text-cream focus:outline-none transition" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-cinzel text-[10px] tracking-wider text-cream/50 block uppercase">Contact Number</label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-sm p-3 font-cinzel text-xs tracking-wide text-cream focus:outline-none transition" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[10px] tracking-wider text-cream/50 block uppercase">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-sm p-3 font-cinzel text-xs tracking-wide text-cream focus:outline-none transition" 
              />
            </div>

            <div className="space-y-1">
              <label className="font-cinzel text-[10px] tracking-wider text-cream/50 block uppercase">Your Message / Custom Requirement</label>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black/40 border border-white/5 focus:border-gold/30 rounded-sm p-3 font-cinzel text-xs tracking-wide text-cream focus:outline-none transition resize-none" 
              />
            </div>

            <button 
              type="submit"
              className="btn-filled"
            >
              Submit Dispatch <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}