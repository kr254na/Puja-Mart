import { ShieldCheck, Truck, Clock, Sparkles, MapPin } from 'lucide-react';
import PolicyCard from '../components/PolicyCard';

export default function ShippingPolicy() {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto space-y-12 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
        </div>

        {/* Header Section */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ DIVINE OUTBOUND PROTOCOL ✦</span>
          <h1 className="section-header-title">Shipping & Delivery Policy</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
          <p className="section-header-description">
            Understanding how your sacred offerings, authentic puja essentials, and heavy brassware are processed, purified, and securely dispatched to your threshold.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Card 1: Handling & Preparation */}
          <PolicyCard icon={Sparkles} title="Preparation & Purity Check">
            Every order is checked against scriptural specifications. Brassware is hand-polished and Ganga Jal bottles are verified for leakproof seals. Preparation takes <strong>24 to 48 hours</strong> of auspicious working hours.
          </PolicyCard>

          {/* Card 2: Packaging Protection */}
          <PolicyCard icon={ShieldCheck} title="Ritual Cushion Packaging">
            We use multi-layered bubble wrap and custom-sized styrofoam boxes for fragile clay/brass items. Heavy idols are packed in premium wooden crates. Liquid samagri is double-bagged to guarantee no leakage in transit.
          </PolicyCard>

          {/* Card 3: Domestic Transit Times */}
          <PolicyCard icon={Clock} title="Domestic Transit Timelines">
            We partner with premium logistics carriers (Bluedart, Delhivery, DTDC):
            <span className="block mt-2 text-xs font-sans text-cream/50">
              • Lucknow & Uttar Pradesh: 1 - 2 business days<br/>
              • Metros & State Capitals: 2 - 3 business days<br/>
              • Rest of India: 3 - 5 business days
            </span>
          </PolicyCard>

          {/* Card 4: Global Sacred Dispatches */}
          <PolicyCard icon={MapPin} title="International Dispatches">
            We ship worldwide via DHL and FedEx Express. Transit time for international shipments ranges from <strong>7 to 12 business days</strong>. Custom duties, if applicable, are to be borne by the customer.
          </PolicyCard>

        </div>

        {/* Shipping Charges & Rates */}
        <div className="relative z-10 card-glass-premium p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-gold-bright" />
            <h3 className="font-cinzel text-xs font-bold text-gold-bright uppercase tracking-wider">Shipping Fee Structure</h3>
          </div>
          <p className="font-cormorant text-sm leading-relaxed text-cream/80">
            Shipping is calculated automatically at checkout based on package weight and distance. For custom large hawan sets, yagna essentials, or temple brass configurations, additional transport handling charges may apply.
          </p>
        </div>

      </div>
    </div>
  );
}
