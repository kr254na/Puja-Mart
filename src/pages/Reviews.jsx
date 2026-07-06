import { useState, useContext } from 'react';
import { MessageSquare, Send, Star } from 'lucide-react';
import ReviewSystem from "../components/ReviewSystem";
import ToastContext from '../context/ToastContext';

export default function Reviews(){
    const { triggerToast } = useContext(ToastContext);
    
    // Form states
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      rating: 5,
      comment: ''
    });
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleReviewSubmit = (e) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.location.trim() || !formData.comment.trim()) {
        triggerToast("Please fill out all fields.");
        return;
      }

      // Backend integration placeholder
      triggerToast("Your review has been submitted! May you be blessed.");
      
      // Reset form fields
      setFormData({
        name: '',
        location: '',
        rating: 5,
        comment: ''
      });
    };

    return(
      <div className="page-container-listing">
        <ReviewSystem 
          isHomePage={false}
          renderForm={() => (
            <form onSubmit={handleReviewSubmit} className="form-field-card">
              <h3 className="content-header-title text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Share Your Experience
              </h3>
              <p className="content-header-description">
                Describe your spiritual experience and product quality.
              </p>

              <div className="space-y-1">
                <label className="form-field-title">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-field-input" 
                  placeholder="e.g. Krishna Agarwal"
                />
              </div>

              <div className="space-y-1">
                <label className="form-field-title">Your Location</label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="form-field-input" 
                  placeholder="e.g. Lucknow"
                />
              </div>

              <div className="space-y-2">
                <label className="form-field-title">Devotional Rating</label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = hoveredRating ? starValue <= hoveredRating : starValue <= formData.rating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setFormData({...formData, rating: starValue})}
                        onMouseEnter={() => setHoveredRating(starValue)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          className={`w-6 h-6 ${isFilled ? 'fill-gold-bright text-gold-bright' : 'text-cream/20'}`} 
                        />
                      </button>
                    );
                  })}
                  <span className="font-cormorant text-xs italic text-cream/60 ml-2">
                    ({formData.rating} of 5)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="form-field-title">Your Testimonial</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                  className="form-field-input resize-none" 
                  placeholder="How has our sacred offering touched your life?"
                />
              </div>

              <button 
                type="submit"
                className="btn-filled w-full"
              >
                Submit Review <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        />
      </div>
    );
}