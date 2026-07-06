import { useState } from 'react';
import { HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import AccordionItem from '../components/AccordionItem';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What makes Agarwal Pujan Bhandar's items scripturally authentic?",
      answer: "We source our products directly from their traditional places of origin. For example, our deity clothing (poshaks) are tailored by experienced artisans in Vrindavan, our brassware is heavy-gauge metal cast in Moradabad, and our Hawan Samagri consists of pure, unadulterated herbs sourced adhering strictly to Ayurvedic/Vedic guidelines. We maintain clean, smoke-free, and devotional warehouse packaging."
    },
    {
      question: "How does the WhatsApp handwritten list upload service work?",
      answer: "Often, Pandit Jis provide a handwritten list of items required for specific pujas. You can write your list or photograph theirs, and upload it via our WhatsApp support. Our representatives will configure your custom kit, calculate a fair package price, and send you a direct payment link. We handle the collection and bundle it securely for you."
    },
    {
      question: "How do you ensure safe transport for liquid Ganga Jal bottles?",
      answer: "Our Ganga Jal is sourced directly from clean flows in Gangotri and Haridwar. To prevent leakage during shipping, we bottle it in food-grade, heavy-duty leak-proof containers, heat-shrink wrap the caps, and place them inside double-layered shock-absorbing protective sleeves before outer box packaging."
    },
    {
      question: "Can I place custom bulk orders for weddings, yagnas, or housewarmings?",
      answer: "Yes, we specialize in configuring custom bulk packages. We can organize individualized shringar kits, custom-packaged prasad boxes, and yagna samagri bundles for bulk distribution. Please contact us via the Inquiry Form on our About page or call our support desk to discuss your customized ritual requirements."
    },
    {
      question: "Are payment gateways secure on your storefront?",
      answer: "Absolutely. We route all payments through industry-leading, RBI-approved encrypted gateways supporting UPI, Credit/Debit cards, Netbanking, and major digital wallets. Your payment credentials are fully encrypted and never stored on our local servers."
    },
    {
      question: "Can I modify my shipping coordinates or cancel an order?",
      answer: "You can modify your shipping address or request an order cancellation within 6 hours of purchase before it enters the Altar Preparation stage. Once processed and dispatched, shipping coordinates cannot be altered, and the order will follow the regular Return Policy."
    }
  ];

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto space-y-12 relative">
        
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-saffron/5 blur-[120px]" />
        </div>

        {/* Header */}
        <div className="section-header-wrap relative z-10 text-center">
          <span className="section-header-tag">✦ DEVOTIONAL KNOWLEDGE BASE ✦</span>
          <h1 className="section-header-title">Frequently Asked Questions</h1>
          <div className="w-24 h-[1px] bg-gold/30 mx-auto mt-4" />
          <p className="section-header-description">
            Have questions regarding materials purity, list configurations, tracking, or bulk orders? Browse through our compiled devotional guide.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="space-y-4 relative z-10 max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              title={faq.question}
              isOpen={activeIndex === index}
              onToggle={() => toggleFAQ(index)}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </div>

        {/* Footer Support Callout */}
        <div className="relative z-10 card-glass-premium p-6 md:p-8 text-center space-y-4 max-w-3xl mx-auto mt-8">
          <HelpCircle className="w-8 h-8 text-gold-bright mx-auto" />
          <h3 className="font-cinzel text-sm font-bold text-cream uppercase tracking-wide">Still Unanswered?</h3>
          <p className="font-cormorant text-sm text-cream/70 max-w-md mx-auto italic">
            "Ask and it shall be resolved. If your specific query is not in the ledger, our devotional representatives are available."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Link to="/about" className="btn-filled flex items-center justify-center gap-2">
              Send Direct Inquiry <MessageSquare className="w-4 h-4" />
            </Link>
            <a 
              href="https://wa.me/919554054732" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-gold-outline"
            >
              WhatsApp Assistance
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
