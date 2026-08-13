import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, MapPin, User, Star, Clock, CheckCircle2, 
  Plus, Store, BookOpen, X, Users, Trash2, Check
} from 'lucide-react';

const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

// ============================================
// STYLES
// ============================================

const statusStyle = {
  available: { 
    badge: "bg-[#6B8F55]", 
    text: "text-[#6B8F55]", 
    tint: "bg-[#6B8F55]/10 border-[#6B8F55]/30", 
    label: "Available" 
  },
  pending: { 
    badge: "bg-[#A9812F]", 
    text: "text-[#A9812F]", 
    tint: "bg-[#A9812F]/10 border-[#A9812F]/30", 
    label: "Pending" 
  },
  completed: { 
    badge: "bg-[#3E7C74]", 
    text: "text-[#3E7C74]", 
    tint: "bg-[#3E7C74]/10 border-[#3E7C74]/30", 
    label: "Completed" 
  },
};

const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"];

// ============================================
// MAIN COMPONENT
// ============================================

const ExchangePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [userRole, setUserRole] = useState('buyer');
  const [city, setCity] = useState('Mumbai');
  const [pinBounce, setPinBounce] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showListModal, setShowListModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [listForm, setListForm] = useState({
    title: '', author: '', isbn: '', 
    condition: 'good', city: '', description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ============================================
  // MOCK DATA (Replace with API calls)
  // ============================================

  const mockBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", owner: "Ananya Rao", ownerId: "seller1", city: "Mumbai", distance: "2.3 km", isbn: "9780735211292", status: "available", rating: 4.9, condition: "Like New" },
    { id: 2, title: "Ikigai", author: "Héctor García", owner: "Rohan Mehta", ownerId: "seller2", city: "Delhi", distance: "5.1 km", isbn: "9780143130727", status: "available", rating: 4.7, condition: "Good" },
    { id: 3, title: "Sapiens", author: "Yuval N. Harari", owner: "Karan Verma", ownerId: "seller4", city: "Pune", distance: "1.8 km", isbn: "9780062316097", status: "available", rating: 4.8, condition: "Good" },
    { id: 4, title: "The Alchemist", author: "Paulo Coelho", owner: "Sneha Joshi", ownerId: "seller7", city: "Kolkata", distance: "1.2 km", isbn: "9780062315007", status: "available", rating: 4.8, condition: "Like New" },
    { id: 5, title: "Project Hail Mary", author: "Andy Weir", owner: "Arjun Reddy", ownerId: "seller11", city: "Mumbai", distance: "4.8 km", isbn: "9780593135204", status: "available", rating: 4.9, condition: "Like New" },
    { id: 6, title: "Dune", author: "Frank Herbert", owner: "Yash Malhotra", ownerId: "seller13", city: "Bengaluru", distance: "2.0 km", isbn: "9780441013593", status: "available", rating: 4.9, condition: "Good" },
    { id: 7, title: "Meditations", author: "Marcus Aurelius", owner: "Aditya Kulkarni", ownerId: "seller6", city: "Chennai", distance: "2.9 km", isbn: "9780140449334", status: "pending", rating: 4.5, condition: "Used" },
    { id: 8, title: "The Psychology of Money", author: "Morgan Housel", owner: "Meera Iyer", ownerId: "seller5", city: "Hyderabad", distance: "4.2 km", isbn: "9780857197689", status: "completed", rating: 4.9, condition: "Like New" },
    { id: 9, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", owner: "Ishaan Kapoor", ownerId: "seller9", city: "Jaipur", distance: "2.6 km", isbn: "9780374533557", status: "available", rating: 4.8, condition: "Good" },
    { id: 10, title: "Deep Work", author: "Cal Newport", owner: "Priya Nair", ownerId: "seller3", city: "Bengaluru", distance: "3.7 km", isbn: "9781455586691", status: "pending", rating: 4.6, condition: "Used" },
  ];

  // ============================================
  // FUNCTIONS
  // ============================================

  const fetchBooks = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBooks(mockBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // BUYER: Request a book
  const handleRequestBook = async (bookId, message) => {
    try {
      setSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId && book.status === 'available'
            ? { ...book, status: 'pending' }
            : book
        )
      );
      setSuccessMessage('✅ Request sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      console.error('Error requesting book:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // SELLER: List a book
  const handleListBook = async (bookData) => {
    try {
      setSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const newBook = {
        id: Date.now() + Math.random() * 1000,
        ...bookData,
        owner: localStorage.getItem('userName') || 'You',
        ownerId: 'currentUser',
        status: 'available',
        rating: 0,
        distance: 'Near you'
      };
      setBooks(prev => [...prev, newBook]);
      setSuccessMessage('✅ Book listed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      console.error('Error listing book:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // SELLER: Remove listing
  const handleRemoveListing = async (bookId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      setSuccessMessage('✅ Listing removed');
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      console.error('Error removing listing:', err);
      return false;
    }
  };

  // SELLER: Accept request
  const handleAcceptRequest = async (bookId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, status: 'completed' } : book
        )
      );
      setSuccessMessage('✅ Request accepted!');
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      console.error('Error accepting request:', err);
      return false;
    }
  };

  // SELLER: Reject request
  const handleRejectRequest = async (bookId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, status: 'available' } : book
        )
      );
      setSuccessMessage('❌ Request rejected');
      setTimeout(() => setSuccessMessage(''), 3000);
      return true;
    } catch (err) {
      console.error('Error rejecting request:', err);
      return false;
    }
  };

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem('userType') || localStorage.getItem('userRole') || 'buyer';
    setUserRole(role);
    fetchBooks();
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchBooks();
    }
  }, [city]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setPinBounce((n) => n + 1);
  };

  // BUYER: Request click
  const handleRequestClick = (e, book) => {
    e.stopPropagation();
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    setSelectedBook(book);
    setRequestMessage('');
    setShowRequestModal(true);
  };

  const handleConfirmRequest = async () => {
    if (!selectedBook) return;
    await handleRequestBook(selectedBook.id, requestMessage);
    setShowRequestModal(false);
    setSelectedBook(null);
  };

  // SELLER: List book click
  const handleListBookClick = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    setListForm({ title: '', author: '', isbn: '', condition: 'good', city: '', description: '' });
    setShowListModal(true);
  };

  const handleConfirmListBook = async () => {
    if (!listForm.title || !listForm.author || !listForm.city) {
      alert('Please fill in all required fields');
      return;
    }
    await handleListBook({
      ...listForm,
      city: listForm.city || city
    });
    setShowListModal(false);
  };

  const handleRemoveListingClick = async (e, bookId) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this listing?')) return;
    await handleRemoveListing(bookId);
  };

  const handleAcceptClick = async (e, bookId) => {
    e.stopPropagation();
    await handleAcceptRequest(bookId);
  };

  const handleRejectClick = async (e, bookId) => {
    e.stopPropagation();
    await handleRejectRequest(bookId);
  };

  // ============================================
  // FILTERING
  // ============================================

  const filteredBooks = books.filter((book) => {
    if (activeTab === 'my-listings') {
      return book.ownerId === 'currentUser';
    }
    if (activeTab === 'my-requests') {
      return book.requestedBy === 'You';
    }
    return book.status === activeTab;
  });

  const counts = {
    available: books.filter((b) => b.status === 'available').length,
    pending: books.filter((b) => b.status === 'pending').length,
    completed: books.filter((b) => b.status === 'completed').length,
    'my-listings': books.filter((b) => b.ownerId === 'currentUser').length,
    'my-requests': books.filter((b) => b.requestedBy === 'You').length,
  };

  // ============================================
  // TABS (Different for Buyer vs Seller)
  // ============================================

  const buyerTabs = [
    { key: 'available', label: 'Available', count: counts.available },
    { key: 'pending', label: 'My Requests', count: counts.pending },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  const sellerTabs = [
    { key: 'my-listings', label: 'My Listings', count: counts['my-listings'] },
    { key: 'pending', label: 'Requests', count: counts.pending },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  const tabs = userRole === 'seller' ? sellerTabs : buyerTabs;

  // ============================================
  // RENDER
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={40} className="mx-auto text-[#D8472F] animate-spin" />
          <p className="text-[#5B6478] mt-3">Loading exchanges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 6s linear infinite; }

        @keyframes card-rise { 0% { opacity: 0; transform: translateY(16px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .card-rise { animation: card-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }

        @keyframes pulse-soft { 0%, 100% { box-shadow: 0 0 0 0 rgba(169,129,47,0.35); } 50% { box-shadow: 0 0 0 6px rgba(169,129,47,0); } }
        .pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        @keyframes tick-in { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); } }
        .tick-in { animation: tick-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

        @keyframes pin-hop { 0% { transform: translateY(0); } 30% { transform: translateY(-6px); } 55% { transform: translateY(0); } 75% { transform: translateY(-3px); } 100% { transform: translateY(0); } }
        .pin-hop { animation: pin-hop 0.5s ease-out; }

        .seal-btn { position: relative; overflow: hidden; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.8s ease forwards; }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          padding: 2px 10px;
          border-radius: 12px;
          font-weight: 500;
        }
        .role-badge.seller { background: rgba(107,76,130,0.2); color: #6B4C82; }
        .role-badge.buyer { background: rgba(201,165,103,0.2); color: #A9843F; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fade-in 0.3s ease;
        }
        .modal-box {
          background: white;
          border-radius: 32px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slide-up 0.4s ease;
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .modal-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #E2D5BC;
          border-radius: 12px;
          font-size: 14px;
          background: rgba(255,251,243,0.5);
          transition: all 0.3s ease;
          font-family: 'Work Sans', sans-serif;
        }
        .modal-input:focus {
          outline: none;
          border-color: #6B4C82;
          box-shadow: 0 0 0 4px rgba(107,76,130,0.08);
        }
        .modal-input::placeholder { color: #A89B8A; }

        .success-toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #00B894;
          color: white;
          padding: 16px 24px;
          border-radius: 12px;
          font-weight: 500;
          z-index: 2000;
          animation: slide-up 0.4s ease;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ===== SUCCESS TOAST ===== */}
        {successMessage && (
          <div className="success-toast">{successMessage}</div>
        )}

        {/* ===== HEADER ===== */}
        <div className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                <RefreshCw size={18} className="text-[#D8472F] spin-slow" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Book Exchange</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">
                  {userRole === 'seller' ? '📦 Manage your book listings' : '📚 Discover books to exchange'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Role Badge */}
              {userRole === 'seller' ? (
                <span className="role-badge seller"><Store size={12} /> Seller</span>
              ) : (
                <span className="role-badge buyer"><User size={12} /> Buyer</span>
              )}
              
              {/* City Selector */}
              <span className="flex items-center gap-1.5 text-sm text-[#5B6478]">
                <MapPin key={pinBounce} size={14} className="text-[#D8472F] pin-hop" /> {city}
              </span>
              <select
                value={city}
                onChange={handleCityChange}
                className="px-3 py-2 bg-[#F6EFE3] rounded-full text-sm text-[#1E2A42] border border-[#E2D5BC] focus:outline-none focus:ring-2 focus:ring-[#D8472F]/40"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Seller: List Book Button */}
              {userRole === 'seller' && (
                <button 
                  className="seal-btn flex items-center gap-2 px-6 py-2.5 bg-[#6B4C82] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(107,76,130,0.55)] hover:bg-[#573C6B] transition"
                  onClick={handleListBookClick}
                >
                  <Plus size={15} /> List Book
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D8472F] text-[#FFFBF3] shadow-[0_8px_18px_-8px_rgba(216,71,47,0.5)] scale-[1.03]'
                    : 'bg-[#FFFBF3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs transition-colors ${isActive ? 'bg-[#FFFBF3]/25 text-[#FFFBF3]' : 'bg-[#EDE2CE] text-[#8A7F6B]'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== BOOKS GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.length === 0 ? (
            <div className="col-span-full bg-[#FFFBF3] rounded-2xl p-12 text-center border border-[#E2D5BC]">
              {userRole === 'seller' && activeTab === 'my-listings' ? (
                <>
                  <Store size={40} className="mx-auto text-[#6B4C82] mb-3" />
                  <h3 className="font-display text-xl font-semibold text-[#1E2A42]">No listings yet</h3>
                  <p className="text-[#8A7F6B] text-sm mt-2">Click "List Book" to add your first book</p>
                </>
              ) : (
                <>
                  <BookOpen size={40} className="mx-auto text-[#D8472F] mb-3" />
                  <h3 className="font-display text-xl font-semibold text-[#1E2A42]">No books found</h3>
                  <p className="text-[#8A7F6B] text-sm mt-2">Check back later for new listings</p>
                </>
              )}
            </div>
          ) : (
            filteredBooks.map((book, i) => {
              const s = statusStyle[book.status] || statusStyle.available;
              const isOwner = book.ownerId === 'currentUser';
              
              return (
                <div
                  key={`${activeTab}-${book.id}`}
                  className="card-rise bg-[#FFFBF3] rounded-2xl overflow-hidden border border-[#E2D5BC] hover:border-[#D9C7A3] hover:-translate-y-1 hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.25)] transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <div className="flex p-4 gap-4">
                    {/* Book Cover */}
                    <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-[#EDE2CE]">
                      <img
                        src={coverUrl(book.isbn)}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                        onError={() => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="150" viewBox="0 0 100 150"%3E%3Crect width="100" height="150" fill="%23EDE2CE"/%3E%3Ctext x="50" y="75" font-size="40" text-anchor="middle" fill="%238A7F6B"%3E📚%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>

                    {/* Book Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-[#1E2A42] group-hover:text-[#D8472F] transition truncate">{book.title}</h3>
                      <p className="text-xs text-[#5B6478] truncate">{book.author}</p>
                      
                      {/* Owner Info */}
                      <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B] mt-1.5">
                        <User size={11} /> {book.owner}
                        {isOwner && <span className="text-[#6B8F55] ml-1 text-[10px]">(You)</span>}
                      </p>
                      
                      {/* Location */}
                      <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B]">
                        <MapPin size={11} /> {book.city} · {book.distance || 'Near you'}
                      </p>
                      
                      {/* Rating */}
                      {book.rating > 0 && (
                        <p className="flex items-center gap-1 text-[11px] text-[#A9812F] mt-0.5">
                          <Star size={10} className="fill-[#A9812F] text-[#A9812F]" /> {book.rating}
                        </p>
                      )}

                      {/* Condition */}
                      {book.condition && (
                        <p className="text-[10px] text-[#8A7F6B] mt-0.5">
                          {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
                        </p>
                      )}

                      {/* Status & Actions */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        {/* Status Badge */}
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${s.tint} ${s.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${s.badge} ${book.status === 'pending' ? 'pulse-soft' : ''}`} />
                          {s.label}
                        </span>

                        {/* ===== SELLER ACTIONS ===== */}
                        {userRole === 'seller' && isOwner && book.status === 'available' && (
                          <>
                            <button 
                              className="text-[11px] text-[#E17055] hover:text-[#D63031] transition ml-auto"
                              onClick={(e) => handleRemoveListingClick(e, book.id)}
                              title="Remove listing"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}

                        {userRole === 'seller' && isOwner && book.status === 'pending' && (
                          <>
                            <button 
                              className="text-[11px] text-[#00B894] hover:text-[#00A381] transition font-medium ml-auto"
                              onClick={(e) => handleAcceptClick(e, book.id)}
                              title="Accept request"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              className="text-[11px] text-[#E17055] hover:text-[#D63031] transition font-medium"
                              onClick={(e) => handleRejectClick(e, book.id)}
                              title="Reject request"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                        {/* ===== BUYER ACTIONS ===== */}
                        {userRole === 'buyer' && book.status === 'available' && (
                          <button 
                            className="seal-btn ml-auto px-3 py-1 bg-[#D8472F] text-[#FFFBF3] rounded-full text-xs font-semibold hover:bg-[#B23522] transition"
                            onClick={(e) => handleRequestClick(e, book)}
                          >
                            Request
                          </button>
                        )}

                        {userRole === 'buyer' && book.status === 'pending' && (
                          <span className="ml-auto flex items-center gap-1 text-xs text-[#A9812F]">
                            <Clock size={12} className="pulse-soft rounded-full" /> Awaiting
                          </span>
                        )}

                        {userRole === 'buyer' && book.status === 'completed' && (
                          <span className="ml-auto flex items-center gap-1 text-xs text-[#3E7C74]">
                            <CheckCircle2 size={12} className="tick-in" /> Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ============================================
          BUYER: REQUEST MODAL
          ============================================ */}
      {showRequestModal && selectedBook && (
        <div className="modal-overlay" onClick={() => setShowRequestModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-xl font-bold text-[#1E2A42]">Request Book</h2>
              <button onClick={() => setShowRequestModal(false)} className="text-[#8A7F6B] hover:text-[#1E2A42] transition">
                <X size={20} />
              </button>
            </div>
            
            {/* Book Preview */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-[#F6EFE3] rounded-xl">
              <div className="w-12 h-16 rounded overflow-hidden">
                <img src={coverUrl(selectedBook.isbn)} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#1E2A42]">{selectedBook.title}</p>
                <p className="text-sm text-[#5B6478]">{selectedBook.author}</p>
                <p className="text-sm text-[#6B8F55]">by {selectedBook.owner}</p>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="text-sm font-medium text-[#1E2A42] block mb-1">Message to seller (Optional)</label>
              <textarea
                className="modal-input"
                placeholder="Hi, I'd like to exchange this book..."
                rows="3"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowRequestModal(false)} className="flex-1 px-4 py-2 border border-[#E2D5BC] rounded-full text-sm font-medium text-[#5B6478] hover:bg-[#F6EFE3] transition">
                Cancel
              </button>
              <button 
                onClick={handleConfirmRequest} 
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-[#D8472F] text-white rounded-full text-sm font-medium hover:bg-[#B23522] transition shadow-[0_8px_18px_-8px_rgba(216,71,47,0.4)] disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Request'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          SELLER: LIST BOOK MODAL
          ============================================ */}
      {showListModal && (
        <div className="modal-overlay" onClick={() => setShowListModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-display text-xl font-bold text-[#1E2A42]">List a Book for Exchange</h2>
              <button onClick={() => setShowListModal(false)} className="text-[#8A7F6B] hover:text-[#1E2A42] transition">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-[#1E2A42] block mb-1">Book Title *</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Enter book title"
                  value={listForm.title}
                  onChange={(e) => setListForm({...listForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E2A42] block mb-1">Author *</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="Enter author name"
                  value={listForm.author}
                  onChange={(e) => setListForm({...listForm, author: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#1E2A42] block mb-1">City *</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="Your city"
                    value={listForm.city}
                    onChange={(e) => setListForm({...listForm, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1E2A42] block mb-1">Condition</label>
                  <select
                    className="modal-input"
                    value={listForm.condition}
                    onChange={(e) => setListForm({...listForm, condition: e.target.value})}
                  >
                    <option value="like new">Like New</option>
                    <option value="good">Good</option>
                    <option value="used">Used</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E2A42] block mb-1">ISBN (Optional)</label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder="ISBN number"
                  value={listForm.isbn}
                  onChange={(e) => setListForm({...listForm, isbn: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E2A42] block mb-1">Description</label>
                <textarea
                  className="modal-input"
                  placeholder="Book condition, edition, etc."
                  rows="2"
                  value={listForm.description}
                  onChange={(e) => setListForm({...listForm, description: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowListModal(false)} className="flex-1 px-4 py-2 border border-[#E2D5BC] rounded-full text-sm font-medium text-[#5B6478] hover:bg-[#F6EFE3] transition">
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmListBook} 
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-[#6B4C82] text-white rounded-full text-sm font-medium hover:bg-[#573C6B] transition shadow-[0_8px_18px_-8px_rgba(107,76,130,0.4)] disabled:opacity-50"
                >
                  {submitting ? 'Listing...' : 'List Book'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangePage;