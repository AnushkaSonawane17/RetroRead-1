// src/Components/Pages/ClaimBookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  BookOpen, User, MapPin, Phone, Mail, 
  CheckCircle, ArrowLeft, Sparkles, Shield,
  MessageCircle, Clock
} from 'lucide-react';

const ClaimBookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    message: '',
    agreeTerms: false
  });
  const [bookDetails, setBookDetails] = useState(null);

  React.useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const bookId = params.get('bookId');
    if (bookId) {
      const sampleBook = {
        id: parseInt(bookId),
        title: "Atomic Habits",
        author: "James Clear",
        price: 349,
        condition: "Like New",
        seller: "Ananya Rao",
        sellerRating: 4.9,
        city: "Mumbai",
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"
      };
      setBookDetails(sampleBook);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/marketplace?claimed=true');
    }, 1500);
  };

  if (!bookDetails) {
    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-pulse">📖</div>
          <p className="text-gray-500 mt-3">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        .glass-card {
          background: rgba(255,251,243,0.82);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.4);
          border-radius: 32px;
          max-width: 520px;
          width: 100%;
          max-height: 95vh;
          overflow-y: auto;
        }
        .glass-card::-webkit-scrollbar { width: 4px; }
        .glass-card::-webkit-scrollbar-thumb { background: #C9A567; border-radius: 4px; }

        .input-field {
          display: flex;
          align-items: center;
          background: rgba(255,251,243,0.5);
          backdrop-filter: blur(6px);
          border: 1.5px solid rgba(255,255,255,0.4);
          border-radius: 12px;
          transition: all 0.4s ease;
          height: 46px;
        }
        .input-field:focus-within {
          background: rgba(255,251,243,0.9);
          border-color: #C9A567;
          box-shadow: 0 0 0 4px rgba(201,165,103,0.08);
          transform: translateY(-2px);
        }
        .input-field .icon {
          color: #8A7F6B;
          padding-left: 12px;
          flex-shrink: 0;
        }
        .input-field:focus-within .icon { color: #C9A567; }
        .input-field input, .input-field textarea {
          background: transparent;
          width: 100%;
          padding: 0 12px;
          height: 100%;
          font-size: 14px;
          color: #1E2A42;
          outline: none;
          border: none;
          font-family: 'Work Sans', sans-serif;
        }
        .input-field textarea {
          height: 80px;
          padding: 12px;
          resize: none;
        }
        .input-field input::placeholder, .input-field textarea::placeholder { color: #A89B8A; }

        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        .book-preview {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.3);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .book-preview img {
          width: 80px;
          height: 110px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>

      <img
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
        alt="Library"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />

      <div className={`glass-card p-6 md:p-8 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-[#8A7F6B] hover:text-[#C9A567] transition text-sm mb-4">
          <ArrowLeft size={16} /> Back to Market
        </Link>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#C9A567]/20 blur-xl animate-pulse" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A567]/10 border border-[#C9A567]/30">
              <Shield size={20} className="text-[#C9A567]" />
            </div>
          </div>
          <span className="font-display font-semibold text-lg text-[#1E2A42] tracking-wide mt-2">Claim This Book</span>
          <span className="text-[10px] text-[#8A7F6B] mt-0.5">Complete the form to claim your book</span>
        </div>

        <div className="book-preview mb-5">
          <img src={bookDetails.image} alt={bookDetails.title} />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#1E2A42] text-sm">{bookDetails.title}</h3>
            <p className="text-xs text-[#5B6478]">{bookDetails.author}</p>
            <div className="flex items-center gap-3 mt-1 text-xs">
              <span className="text-[#C9A567] font-semibold">₹{bookDetails.price}</span>
              <span className="text-[#8A7F6B]">•</span>
              <span className="text-[#3E6B52]">{bookDetails.condition}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#8A7F6B]">
              <User size={12} /> {bookDetails.seller}
              <span className="text-[#C9A567]">★ {bookDetails.sellerRating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#8A7F6B]">
              <MapPin size={12} /> {bookDetails.city}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="input-field">
              <User size={15} className="icon" />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required 
              />
            </div>
            <div className="input-field">
              <Mail size={15} className="icon" />
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-field">
            <Phone size={15} className="icon" />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required 
            />
          </div>

          <div className="input-field">
            <MapPin size={15} className="icon" />
            <input 
              type="text" 
              placeholder="Delivery Address" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="input-field">
              <input 
                type="text" 
                placeholder="City" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required 
              />
            </div>
            <div className="input-field">
              <input 
                type="text" 
                placeholder="Pincode" 
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                required 
              />
            </div>
          </div>

          <div className="input-field">
            <MessageCircle size={15} className="icon" />
            <textarea 
              placeholder="Any message for the seller?"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="flex items-start gap-2 text-xs text-[#5B6478] cursor-pointer select-none group pt-1">
            <input 
              type="checkbox" 
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
              required 
              className="h-3.5 w-3.5 mt-0.5 rounded border-[#D9C7A3] accent-[#C9A567] cursor-pointer" 
            />
            <span className="group-hover:text-[#1E2A42] transition">
              I agree to the <span className="text-[#C9A567] font-medium hover:underline">Claim Terms</span>
            </span>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="seal-btn w-full py-3 mt-1 bg-[#C9A567] text-[#1E2A42] rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(201,165,103,0.5)] hover:bg-[#B8934F] transition flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isSubmitting ? (
              <>⏳ Processing...</>
            ) : (
              <>
                <span>Submit Claim</span>
                <CheckCircle size={15} className="group-hover:scale-110 transition" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] text-[#8A7F6B] mt-4">
          <Clock size={12} className="inline mr-1" />
          The seller will contact you within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ClaimBookPage;