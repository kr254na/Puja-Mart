import { Wallet, HelpCircle, Film, Sparkles, ReceiptIndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';
import PolicyCard from '../components/PolicyCard';

export default function RefundPolicy() {
  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto space-y-12 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] rounded-full bg-gold/5 blur-[100px]" />
        </div>

        {/* Header Section */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ SACRED LEDGER REVERSALS ✦</span>
          <h1 className="section-header-title">Refund Policy</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
          <p className="section-header-description">
            Understanding the timelines, damage claims coverage, and payout processing rules for cancelled or returned orders.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Card 1: Damage Claims & Unboxing Video */}
          <PolicyCard icon={Film} title="Transit Damage & Video Proof">
            For fragile clay deepaks or delicate brassware damaged during delivery, we offer immediate replacement/refund. We request that you record a **continuous unboxing video** when opening the shipment to facilitate insurance claims.
          </PolicyCard>

          {/* Card 2: Refund Processing Timelines */}
          <PolicyCard icon={Wallet} title="Gateway Processing Timeline">
            Approved refunds are sent to our gateway partners within 48 hours. Payouts back to the original source (UPI, Credit/Debit card, Netbanking) typically reflect in your ledger within **3 to 7 business days**.
          </PolicyCard>

          {/* Card 3: Cancellation Policy */}
          <PolicyCard icon={Sparkles} title="Order Cancellation Payouts">
            Orders can be cancelled before they enter the **Altar Preparation** stage (usually within 6 hours of purchase). Once dispatched, cancellation is not possible, and eligible items must go through the standard return cycle.
          </PolicyCard>

          {/* Card 4: Shipping Charge Reimbursement */}
          <PolicyCard icon={ReceiptIndianRupee} title="Self-Ship Reimbursement">
            If you self-ship an approved return item, we will reimburse shipping fees up to **₹150** upon presentation of a digital invoice/receipt. Contact our devotional support to submit your receipt.
          </PolicyCard>

        </div>

        {/* Support Section */}
        <div className="relative z-10 card-glass-premium p-6 md:p-8 text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-gold-bright mx-auto" />
          <h3 className="font-cinzel text-sm font-bold text-cream uppercase tracking-wide">Still Have Inquiries?</h3>
          <p className="font-cormorant text-base text-cream/70 max-w-xl mx-auto italic">
            "Your satisfaction on this devotional path is our highest priority. If you encounter any anomalies in your payout, write to us directly."
          </p>
          <div className="pt-2">
            <Link to="/about" className="btn-gold-outline">
              Contact Devotional Desk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
