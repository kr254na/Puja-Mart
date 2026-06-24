import { useState, useEffect } from 'react';
import { MessageSquare, Upload, FileText, X, Send, Check } from 'lucide-react';

export default function WhatsappCommerce({triggerToast}) {
  const [isOpen, setIsOpen] = useState(false); //WhatsApp Modal
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [textQuery, setTextQuery] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // File Upload handling
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      registerFile(file);
    }
  };

  const registerFile = (file) => {
    setUploadedFile(file);
    // Create local object URL for image previews
    if (file.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFilePreview(null);
    }
    triggerToast("List uploaded successfully! Generating your WhatsApp chat..." );
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      registerFile(e.dataTransfer.files[0]);
    }
  };

 const handleSubmitList = () => {
  if (!uploadedFile) return;
  const text = `Radhe Radhe\nI have uploaded my handwritten Puja List (${uploadedFile.name}) to your website. Please check it and send me a price quote.`;
  setUploadedFile(null);
  setFilePreview(null);
  setIsOpen(false);
  window.open(
    `https://wa.me/919554054732?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};

  // Send textual general query via WhatsApp
  const handleSendTextQuery = () => {
    if (textQuery.trim() === '') return;
    const text = `Radhe Radhe,\nI have a general enquiry: ${textQuery}`;
    setTextQuery('');
    setIsOpen(false);
    window.open(`https://wa.me/919554054732?text=${encodeURIComponent(text)}`, '_blank');
  };

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);
  
  return (
    <>
      {/* FLOATING ACTION TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white
        p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] flex items-center
        justify-center cursor-pointer transition transform hover:scale-110"
        title="WhatsApp Puja Assistant"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
      </button>

      {/* CHAT POPUP WIDGET */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-full max-w-[270px]
        sm:max-w-md border border-gold/30 rounded-lg shadow-2xl p-5 md:p-6 flex flex-col
        justify-between bg-dark-bg text-cream">
          
          {/* Header Panel */}
          <div className="flex items-center justify-between border-b border-gold/20 pb-3 mb-4 text-cream">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/15 
              flex items-center justify-center text-[#25D366]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-gold-bright">
                  WhatsApp Commerce
                </h3>
                <span className="font-cormorant text-[10px] text-cream/50 block leading-none
                italic mt-0.5">
                    Direct assistance and handwritten lists
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full border border-gold/20 hover:bg-gold/10 text-gold
              transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form items */}
          <div className="space-y-4">
            
            {/* Custom List Uploader Box */}
            <div className="border border-dashed border-gold/40 rounded-sm p-4 bg-gold/5
            flex flex-col items-center">
              <span className="font-cinzel text-[10px] text-gold uppercase text-center block mb-1">
                Have a handwritten list from your local Pandit Ji?
              </span>
              <p className="font-cormorant text-[11px] text-center text-cream/60 leading-normal mb-3">
                Upload drawing, image, or PDF. We will scan, package, and send a quotation on WhatsApp.
              </p>

              {/* Upload field drag layer */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`w-full border rounded-sm p-4 flex flex-col items-center justify-center transition duration-300 relative ${
                  dragActive ? 'bg-saffron/10 border-saffron' : 'border-gold/15 bg-black/10'
                }`}
              >
                
                {uploadedFile ? (
                  <div className="flex flex-col items-center text-center">
                    {filePreview ? (
                      <img src={filePreview} alt="Handwritten list preview" className="h-16 w-16 object-cover rounded border border-gold/30 mb-2 shadow" />
                    ) : (
                      <FileText className="w-8 h-8 text-gold mb-2" />
                    )}
                    <span className="text-xs font-semibold max-w-[200px] truncate">
                      {uploadedFile.name}
                    </span>
                    <span className="text-[10px] text-cream/40 mt-0.5">
                      ({(uploadedFile.size / 1024).toFixed(1)} KB)
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                        setFilePreview(null);
                      }}
                      className="text-[10px] text-red-400 mt-2 underline hover:text-red-300"
                    >
                      Remove File
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer text-center">
                    <Upload className="w-7 h-7 text-gold mb-2" />
                    <span className="font-cormorant text-xs text-gold-bright hover:underline">
                      Drag & drop file here or click to browse
                    </span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                  </label>
                )}

              </div>

              {/* Submit list action */}
              {uploadedFile && (
                <button
                  onClick={handleSubmitList}
                  className="w-full mt-3 py-2 bg-gradient-to-r from-[#25D366] to-[#20ba5a]
                  text-white font-cormorant font-semibold text-xs md:text-sm rounded
                  flex items-center justify-center gap-2 cursor-pointer shadow transition
                  hover:opacity-90"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit List & Chat</span>
                </button>
              )}
            </div>

            {/* Direct Message query section */}
            <div className="border-t border-gold/15 pt-4">
              <div className="flex items-center border border-gold/30 bg-black/30 rounded px-2.5 py-1.5">
                <textarea
                  placeholder="Enter custom order details or ask for Pandit Ji..."
                  rows={2}
                  value={textQuery}
                  onChange={(e) => setTextQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs md:text-sm
                  w-full font-cormorant focus:ring-0 resize-none text-cream placeholder-cream/30"
                />
                <button
                  onClick={handleSendTextQuery}
                  className="p-2 ml-1 bg-gradient-to-r from-saffron to-saffron-deep rounded
                  hover:opacity-90 text-white cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
