// src/Components/Pages/SellBookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BookOpen, User, MapPin, Phone, Mail, 
  CheckCircle, ArrowLeft, Store, Tag,
  DollarSign, Award, MessageCircle
} from 'lucide-react';

const SellBookPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    condition: 'like new',
    category: 'Fiction',
    description: '',
    city: '',
    phone: '',
    email: '',
    sellerName: '',
    agreeTerms: false
  });

  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ✅ Save book to localStorage
    const newBook = {
      id: Date.now() + Math.random() * 1000, // Unique ID
      title: formData.title,
      author: formData.author,
      price: parseFloat(formData.price),
      condition: formData.condition,
      isbn: formData.isbn || 'N/A',
      category: formData.category,
      seller: formData.sellerName || 'You',
      city: formData.city,
      rating: 0,
      description: formData.description,
      listedDate: new Date().toISOString(),
      phone: formData.phone,
      email: formData.email
    };

    // Get existing books from localStorage
    const existingBooks = JSON.parse(localStorage.getItem('marketplaceBooks') || '[]');
    existingBooks.push(newBook);
    localStorage.setItem('marketplaceBooks', JSON.stringify(existingBooks));
    
    // Also save to sellerBooks
    const sellerBooks = JSON.parse(localStorage.getItem('sellerBooks') || '[]');
    sellerBooks.push(newBook);
    localStorage.setItem('sellerBooks', JSON.stringify(sellerBooks));

    // ✅ Dispatch storage event to update MarketplacePage
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/marketplace');
      }, 1500);
    }, 1500);
  };

  const conditions = [
    { value: 'like new', label: 'Like New - Pristine condition' },
    { value: 'good', label: 'Good - Well-loved but clean' },
    { value: 'used', label: 'Used - Signs of wear' }
  ];

  const categories = [
    'Fiction', 'Non-Fiction', 'Self-Help', 'Finance', 
    'History', 'Philosophy', 'Science', 'Fantasy', 
    'Biography', 'Business', 'Technology', 'Romance',
    'Thriller', 'Mystery', 'Horror', 'Poetry', 'Psychology'
  ];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10 px-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        .paper-grain {
          background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }

        .glass-card {
          background: rgba(255,251,243,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 40px 80px -30px rgba(30,42,66,0.15), inset 0 1px 0 rgba(255,255,255,0.6);
          border-radius: 32px;
          max-width: 580px;
          width: 100%;
        }

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
          border-color: #6B4C82;
          box-shadow: 0 0 0 4px rgba(107,76,130,0.08);
          transform: translateY(-2px);
        }
        .input-field .icon {
          color: #8A7F6B;
          padding-left: 12px;
          flex-shrink: 0;
        }
        .input-field:focus-within .icon { color: #6B4C82; }
        .input-field input, .input-field select, .input-field textarea {
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
        .input-field select { appearance: none; cursor: pointer; }
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

        .seller-badge {
          background: linear-gradient(135deg, #6B4C82, #573C6B);
          color: white;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        @keyframes slide-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .slide-up { animation: slide-up 0.5s ease forwards; opacity: 0; }

        @keyframes pop-in { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pop-in { animation: pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        .success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .success-card {
          background: white;
          border-radius: 32px;
          padding: 48px;
          text-align: center;
          max-width: 420px;
          box-shadow: 0 40px 80px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/marketplace" className="flex items-center gap-2 text-[#8A7F6B] hover:text-[#6B4C82] transition">
            <ArrowLeft size={20} /> Back
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E2D5BC]">
            <Store size={16} className="text-[#6B4C82]" />
            <span className="text-sm font-medium text-[#1E2A42]">Seller Portal</span>
          </div>
        </div>

        {/* Main Form */}
        <div className={`glass-card p-8 md:p-10 transition-all duration-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#6B4C82]/20 blur-xl animate-pulse" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#6B4C82]/10 border border-[#6B4C82]/30">
                <Store size={24} className="text-[#6B4C82]" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold text-[#1E2A42] mt-3">Offer a Book</h1>
            <p className="text-[#5B6478] text-sm mt-1">List your book for sale on the marketplace</p>
            <span className="seller-badge mt-2">🔑 Seller</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Book Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="input-field">
                <BookOpen size={15} className="icon" />
                <input 
                  type="text" 
                  placeholder="Book Title *" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required 
                />
              </div>
              <div className="input-field">
                <User size={15} className="icon" />
                <input 
                  type="text" 
                  placeholder="Author *" 
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="input-field">
                <Tag size={15} className="icon" />
                <input 
                  type="text" 
                  placeholder="ISBN (Optional)" 
                  value={formData.isbn}
                  onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                />
              </div>
              <div className="input-field">
                <DollarSign size={15} className="icon" />
                <input 
                  type="number" 
                  placeholder="Price (₹) *" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required 
                  min="1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="input-field">
                <select 
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  required
                >
                  {conditions.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-field">
              <MessageCircle size={15} className="icon" />
              <textarea 
                placeholder="Book Description (condition, highlights, why sell?)"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Seller Contact */}
            <div className="grid grid-cols-2 gap-3">
              <div className="input-field">
                <User size={15} className="icon" />
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  value={formData.sellerName}
                  onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                  required 
                />
              </div>
              <div className="input-field">
                <MapPin size={15} className="icon" />
                <input 
                  type="text" 
                  placeholder="City *" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="input-field">
                <Phone size={15} className="icon" />
                <input 
                  type="tel" 
                  placeholder="Phone *" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="input-field">
                <Mail size={15} className="icon" />
                <input 
                  type="email" 
                  placeholder="Email *" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 text-sm text-[#5B6478] cursor-pointer select-none group pt-2">
              <input 
                type="checkbox" 
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                required 
                className="h-4 w-4 mt-0.5 rounded border-[#D9C7A3] accent-[#6B4C82] cursor-pointer" 
              />
              <span className="group-hover:text-[#1E2A42] transition">
                I confirm the book details are accurate and agree to the <span className="text-[#6B4C82] font-medium hover:underline">Seller Terms</span>
              </span>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="seal-btn w-full py-3.5 mt-2 bg-[#6B4C82] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(107,76,130,0.5)] hover:bg-[#573C6B] transition flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <>⏳ Listing...</>
              ) : (
                <>
                  <Store size={18} />
                  <span>List for Sale</span>
                  <CheckCircle size={16} className="group-hover:scale-110 transition" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#8A7F6B] mt-3">
              <Award size={14} className="inline mr-1" />
              You earn <span className="font-semibold text-[#6B4C82]">10 KOINS</span> bonus on every successful sale!
            </p>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card pop-in">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-2xl font-bold text-[#1E2A42]">Book Listed!</h3>
            <p className="text-[#5B6478] text-sm mt-2">Your book has been successfully listed on the marketplace.</p>
            <p className="text-[#8A7F6B] text-xs mt-1">Redirecting to marketplace...</p>
            <div className="mt-4 h-1 w-full bg-[#EDE2CE] rounded-full overflow-hidden">
              <div className="h-full bg-[#6B4C82] rounded-full animate-pulse" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellBookPage;