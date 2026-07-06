import { ShieldAlert, RefreshCw, Clipboard, FileCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';

export default function ReturnPolicy() {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto space-y-12 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] rounded-full bg-saffron/5 blur-[100px]" />
        </div>

        {/* Header Section */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ SACRED REVERSAL TERMS ✦</span>
          <h1 className="section-header-title">Return Policy</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
          <p className="section-header-description">
            Understanding the ritual standards, terms, and guidelines for initiating returns on eligible puja items.
          </p>
        </div>

        {/* Highlight Banner: Scriptural Purity Exception */}
        <div className="relative z-10 p-5 border border-saffron/40 bg-saffron/5 rounded-sm flex flex-col sm:flex-row gap-4 items-start">
          <ShieldAlert className="w-6 h-6 text-saffron shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="font-cinzel text-xs font-bold text-saffron-deep uppercase tracking-wider">The Ritual Purity Standard (Exceptions)</h3>
            <p className="font-cormorant text-sm leading-relaxed text-cream/90">
              To preserve scriptural sanctity, any **ritual consumables** (such as Hawan Samagri, Pure Ghee, Gangajal, Sindoor, Roli, and customized Puja kits) are **strictly non-returnable**. Once these items exit our sacred warehouse, we cannot verify their handling or environment, making them ineligible for re-stocking.
            </p>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Card 1: Eligible Items */}
          <PolicyCard icon={RefreshCw} title="Returnable Items (7-Day Window)">
            Standard items like un-blessed brassware (diyas, thalis, frames), un-customized deity clothing (poshaks), and accessories are fully returnable within **7 days** of delivery.
          </PolicyCard>

          {/* Card 2: Return Conditions */}
          <PolicyCard icon={Clipboard} title="Product Integrity Required">
            Items must be returned in their original packaging, showing zero signs of usage or soot (charcoal/vermilion). They must not have been placed on active altars or used in ritual devotion.
          </PolicyCard>

        </div>

        {/* Step-by-Step Return Process */}
        <div className="relative z-10 card-glass-premium p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-gold-bright" />
            <h3 className="font-cinzel text-xs font-bold text-gold-bright uppercase tracking-wider">How to Request a Return</h3>
          </div>
          
          <div className="space-y-4 font-sans text-sm text-cream/70">
            <div className="flex gap-3">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p className="font-cormorant text-sm">
                <strong>Step 1:</strong> Take a photo of the item, explaining the reason for the return. For damaged items, ensure you have an unboxing video ready.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p className="font-cormorant text-sm">
                <strong>Step 2:</strong> Send details to our Devotional Correspondence desk via <Link to="/about" className="text-gold hover:underline">Support Page</Link> or email us at <code>krishnaagarwal0193@gmail.com</code>.
              </p>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p className="font-cormorant text-sm">
                <strong>Step 3:</strong> Once approved, we will arrange a return pick-up (where service is available) or guide you to ship it back to our Lucknow central warehouse.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
