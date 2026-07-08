export default function MarqueeStrip(){
    
const marqueeItems = [
  " प्रामाणिक पूजा सामग्री",
  " देवी-देवताओं के वस्त्र एवं हर श्रृंगार",
  " कंठी माला एवं जप माला",
  " विवाह एवं मांगलिक पूजन सामग्री",
  " सजावट एवं मंदिर श्रृंगार का सामान",
  " अंतिम संस्कार सामग्री",
  " पीतल एवं तांबे के बर्तन",
  " ब्राह्मण वस्त्र एवं यज्ञोपवीत",
  " धार्मिक पुस्तकें एवं ग्रंथ",
  " शुद्ध पीतल की मूर्तियाँ",
  " मंदिर एवं हवन सामग्री",
  " रुद्राक्ष, तुलसी माला एवं आध्यात्मिक सामग्री",
  " शुभ-लाभ एवं धार्मिक उपहार सामग्री",
  " नोटों से निर्मित हार",
  " पूजा, यज्ञ एवं उत्सवों की संपूर्ण सामग्री"
];

return (
    <div className="w-full bg-gradient-to-r from-saffron to-saffron-deep border-y
    border-gold/30 py-3 overflow-hidden whitespace-nowrap z-20 relative mb-3">
      <div className="inline-flex animate-marquee">
        {marqueeItems.map((text, idx) => (
          <span 
            key={idx} 
            className="font-sanskrit text-xs md:text-sm tracking-[2px] text-white/95
            flex items-center gap-2"
          >
            {text}
            <span className="text-gold-bright mx-8">ॐ</span>
          </span>
        ))}
      </div>
    </div>
  );
}