import { useState } from 'react';

export default function ProductGallery({ images, nameEn }) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <div className="lg:col-span-5 space-y-4 w-full flex flex-col items-center lg:items-stretch">
      {/* Main Stage Image Frame */}
      <div className="showcase-frame group mx-auto lg:mx-0">
        <div className="showcase-frame-inner">
          <img
            src={images[activeImageIdx]}
            alt={nameEn}
            className="w-full h-full object-cover transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>
      </div>

      {/* Thumbnail Row Selector */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIdx(idx)}
              className={`w-20 aspect-square rounded-xs overflow-hidden border p-1 bg-black/40 shrink-0 transition duration-300 cursor-pointer ${
                activeImageIdx === idx
                  ? 'border-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                  : 'border-white/5 hover:border-gold/30'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover rounded-xs" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
