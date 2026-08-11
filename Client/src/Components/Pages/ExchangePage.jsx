// import React, { useState, useEffect } from 'react';
// import { RefreshCw, MapPin, User, Star, Clock, CheckCircle2, Plus } from 'lucide-react';

// /**
//  * ExchangePage — same warm-paper / ink-navy / coral / brass system as the
//  * rest of the app. Covers via Open Library's cover API keyed by ISBN-13
//  * (covers.openlibrary.org/b/isbn/{isbn}-L.jpg) — stable, no auth needed.
//  *
//  * Motion is tied to the concept of exchange: a slowly turning swap icon in
//  * the header, cards that rise in as if being placed on a table, a status
//  * badge that pulses only while genuinely "pending," and a map pin that
//  * hops when you change city.
//  */

// const exchangeBooks = [
//   { id: 1, title: "Atomic Habits", author: "James Clear", owner: "Ananya Rao", city: "Mumbai", distance: "2.3 km", isbn: "9780735211292", status: "available", rating: 4.9 },
//   { id: 2, title: "Ikigai", author: "Héctor García", owner: "Rohan Mehta", city: "Delhi", distance: "5.1 km", isbn: "9780143130727", status: "available", rating: 4.7 },
//   { id: 3, title: "Deep Work", author: "Cal Newport", owner: "Priya Nair", city: "Bengaluru", distance: "3.7 km", isbn: "9781455586691", status: "pending", rating: 4.6 },
//   { id: 4, title: "Sapiens", author: "Yuval N. Harari", owner: "Karan Verma", city: "Pune", distance: "1.8 km", isbn: "9780062316097", status: "available", rating: 4.8 },
//   { id: 5, title: "The Psychology of Money", author: "Morgan Housel", owner: "Meera Iyer", city: "Hyderabad", distance: "4.2 km", isbn: "9780857197689", status: "completed", rating: 4.9 },
//   { id: 6, title: "Meditations", author: "Marcus Aurelius", owner: "Aditya Kulkarni", city: "Chennai", distance: "2.9 km", isbn: "9780140449334", status: "available", rating: 4.5 },
//   { id: 7, title: "The Alchemist", author: "Paulo Coelho", owner: "Sneha Joshi", city: "Kolkata", distance: "1.2 km", isbn: "9780062315007", status: "available", rating: 4.8 },
//   { id: 8, title: "The Power of Now", author: "Eckhart Tolle", owner: "Vikram Singh", city: "Ahmedabad", distance: "3.5 km", isbn: "9781577314806", status: "pending", rating: 4.6 },
// ];

// const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

// const statusStyle = {
//   available: { badge: "bg-[#6B8F55]", text: "text-[#6B8F55]", tint: "bg-[#6B8F55]/10 border-[#6B8F55]/30" },
//   pending: { badge: "bg-[#A9812F]", text: "text-[#A9812F]", tint: "bg-[#A9812F]/10 border-[#A9812F]/30" },
//   completed: { badge: "bg-[#3E7C74]", text: "text-[#3E7C74]", tint: "bg-[#3E7C74]/10 border-[#3E7C74]/30" },
// };

// const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];

// const ExchangePage = () => {
//   const [activeTab, setActiveTab] = useState('available');
//   const [city, setCity] = useState('Mumbai');
//   const [pinBounce, setPinBounce] = useState(0);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   const filteredBooks = exchangeBooks.filter((book) => book.status === activeTab);
//   const counts = {
//     available: exchangeBooks.filter((b) => b.status === 'available').length,
//     pending: exchangeBooks.filter((b) => b.status === 'pending').length,
//     completed: exchangeBooks.filter((b) => b.status === 'completed').length,
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//     setPinBounce((n) => n + 1); // retrigger the bounce animation via key change
//   };

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }

//         .paper-grain {
//           background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
//           background-size: 4px 4px;
//         }

//         @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
//         .spin-slow { animation: spin-slow 6s linear infinite; }

//         @keyframes card-rise {
//           0% { opacity: 0; transform: translateY(16px) scale(0.98); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         .card-rise { animation: card-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }

//         @keyframes pulse-soft {
//           0%, 100% { box-shadow: 0 0 0 0 rgba(169,129,47,0.35); }
//           50% { box-shadow: 0 0 0 6px rgba(169,129,47,0); }
//         }
//         .pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

//         @keyframes tick-in {
//           0% { transform: scale(0.5); opacity: 0; }
//           60% { transform: scale(1.15); opacity: 1; }
//           100% { transform: scale(1); }
//         }
//         .tick-in { animation: tick-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

//         @keyframes pin-hop {
//           0% { transform: translateY(0); }
//           30% { transform: translateY(-6px); }
//           55% { transform: translateY(0); }
//           75% { transform: translateY(-3px); }
//           100% { transform: translateY(0); }
//         }
//         .pin-hop { animation: pin-hop 0.5s ease-out; }

//         .seal-btn { position: relative; overflow: hidden; }
//         @keyframes shimmer-sweep {
//           0% { transform: translateX(-120%) skewX(-15deg); }
//           100% { transform: translateX(220%) skewX(-15deg); }
//         }
//         .seal-btn::after {
//           content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
//           transform: translateX(-120%) skewX(-15deg);
//         }
//         .seal-btn:hover::after { animation: shimmer-sweep 0.8s ease forwards; }
//       `}</style>

//       <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

//       <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

//         {/* ===== Header ===== */}
//         <div
//           className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${
//             mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//           }`}
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
//                 <RefreshCw size={18} className="text-[#D8472F] spin-slow" />
//               </div>
//               <div>
//                 <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Book Exchange</h1>
//                 <p className="text-[#8A7F6B] text-sm mt-1">Swap physical books with readers near you</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className="flex items-center gap-1.5 text-sm text-[#5B6478]">
//                 <MapPin key={pinBounce} size={14} className="text-[#D8472F] pin-hop" /> {city}
//               </span>
//               <select
//                 value={city}
//                 onChange={handleCityChange}
//                 className="px-3 py-2 bg-[#F6EFE3] rounded-full text-sm text-[#1E2A42] border border-[#E2D5BC] focus:outline-none focus:ring-2 focus:ring-[#D8472F]/40"
//               >
//                 {cities.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//               <button className="seal-btn flex items-center gap-2 px-6 py-2.5 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition">
//                 <Plus size={15} /> List Book
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ===== Tabs ===== */}
//         <div className="flex gap-2 overflow-x-auto">
//           {['available', 'pending', 'completed'].map((tab) => {
//             const isActive = activeTab === tab;
//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
//                   isActive
//                     ? 'bg-[#D8472F] text-[#FFFBF3] shadow-[0_8px_18px_-8px_rgba(216,71,47,0.5)] scale-[1.03]'
//                     : 'bg-[#FFFBF3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
//                 }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-xs transition-colors ${
//                     isActive ? 'bg-[#FFFBF3]/25 text-[#FFFBF3]' : 'bg-[#EDE2CE] text-[#8A7F6B]'
//                   }`}
//                 >
//                   {counts[tab]}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//         {/* ===== Exchange Grid ===== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {filteredBooks.map((book, i) => {
//             const s = statusStyle[book.status];
//             return (
//               <div
//                 key={`${activeTab}-${book.id}`}
//                 className="card-rise bg-[#FFFBF3] rounded-2xl overflow-hidden border border-[#E2D5BC] hover:border-[#D9C7A3] hover:-translate-y-1 hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.25)] transition-all duration-300 group"
//                 style={{ animationDelay: `${i * 80}ms` }}
//               >
//                 <div className="flex p-4 gap-4">
//                   <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-[#EDE2CE]">
//                     <img
//                       src={coverUrl(book.isbn)}
//                       alt={book.title}
//                       className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                       loading="lazy"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-sm text-[#1E2A42] group-hover:text-[#D8472F] transition truncate">{book.title}</h3>
//                     <p className="text-xs text-[#5B6478] truncate">{book.author}</p>
//                     <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B] mt-1.5">
//                       <User size={11} /> {book.owner}
//                     </p>
//                     <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B]">
//                       <MapPin size={11} /> {book.city} · {book.distance}
//                     </p>
//                     <p className="flex items-center gap-1 text-[11px] text-[#A9812F] mt-0.5">
//                       <Star size={10} className="fill-[#A9812F] text-[#A9812F]" /> {book.rating}
//                     </p>
//                     <div className="flex items-center gap-2 mt-3">
//                       <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${s.tint} ${s.text}`}>
//                         <span className={`h-1.5 w-1.5 rounded-full ${s.badge} ${book.status === 'pending' ? 'pulse-soft' : ''}`} />
//                         {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
//                       </span>
//                       {book.status === 'available' && (
//                         <button className="seal-btn ml-auto px-3 py-1 bg-[#D8472F] text-[#FFFBF3] rounded-full text-xs font-semibold hover:bg-[#B23522] transition">
//                           Request
//                         </button>
//                       )}
//                       {book.status === 'pending' && (
//                         <span className="ml-auto flex items-center gap-1 text-xs text-[#A9812F]">
//                           <Clock size={12} className="pulse-soft rounded-full" /> Awaiting
//                         </span>
//                       )}
//                       {book.status === 'completed' && (
//                         <span className="ml-auto flex items-center gap-1 text-xs text-[#3E7C74]">
//                           <CheckCircle2 size={12} className="tick-in" /> Done
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* ===== Empty State ===== */}
//         {filteredBooks.length === 0 && (
//           <div className="bg-[#FFFBF3] rounded-2xl p-12 text-center border border-[#E2D5BC]">
//             <RefreshCw size={26} className="mx-auto text-[#D8472F] mb-3 spin-slow" />
//             <h3 className="font-display text-xl font-semibold text-[#1E2A42]">No {activeTab} exchanges</h3>
//             <p className="text-[#8A7F6B] text-sm mt-2">Check back later, or list your own books for exchange</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExchangePage;


import React, { useState, useEffect } from 'react';
import { RefreshCw, MapPin, User, Star, Clock, CheckCircle2, Plus } from 'lucide-react';

const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const exchangeBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", owner: "Ananya Rao", city: "Mumbai", distance: "2.3 km", isbn: "9780735211292", status: "available", rating: 4.9 },
  { id: 2, title: "Ikigai", author: "Héctor García", owner: "Rohan Mehta", city: "Delhi", distance: "5.1 km", isbn: "9780143130727", status: "available", rating: 4.7 },
  { id: 3, title: "Deep Work", author: "Cal Newport", owner: "Priya Nair", city: "Bengaluru", distance: "3.7 km", isbn: "9781455586691", status: "pending", rating: 4.6 },
  { id: 4, title: "Sapiens", author: "Yuval N. Harari", owner: "Karan Verma", city: "Pune", distance: "1.8 km", isbn: "9780062316097", status: "available", rating: 4.8 },
  { id: 5, title: "The Psychology of Money", author: "Morgan Housel", owner: "Meera Iyer", city: "Hyderabad", distance: "4.2 km", isbn: "9780857197689", status: "completed", rating: 4.9 },
  { id: 6, title: "Meditations", author: "Marcus Aurelius", owner: "Aditya Kulkarni", city: "Chennai", distance: "2.9 km", isbn: "9780140449334", status: "available", rating: 4.5 },
  { id: 7, title: "The Alchemist", author: "Paulo Coelho", owner: "Sneha Joshi", city: "Kolkata", distance: "1.2 km", isbn: "9780062315007", status: "available", rating: 4.8 },
  { id: 8, title: "The Power of Now", author: "Eckhart Tolle", owner: "Vikram Singh", city: "Ahmedabad", distance: "3.5 km", isbn: "9781577314806", status: "pending", rating: 4.6 },
  { id: 9, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", owner: "Ishaan Kapoor", city: "Jaipur", distance: "2.6 km", isbn: "9780374533557", status: "available", rating: 4.8 },
  { id: 10, title: "The Night Circus", author: "Erin Morgenstern", owner: "Diya Menon", city: "Kochi", distance: "1.5 km", isbn: "9780307744432", status: "pending", rating: 4.7 },
  { id: 11, title: "Project Hail Mary", author: "Andy Weir", owner: "Arjun Reddy", city: "Mumbai", distance: "4.8 km", isbn: "9780593135204", status: "available", rating: 4.9 },
  { id: 12, title: "The Silent Patient", author: "Alex Michaelides", owner: "Naina Kulkarni", city: "Delhi", distance: "3.1 km", isbn: "9781250301697", status: "completed", rating: 4.6 },
  { id: 13, title: "Dune", author: "Frank Herbert", owner: "Yash Malhotra", city: "Bengaluru", distance: "2.0 km", isbn: "9780441013593", status: "available", rating: 4.9 },
  { id: 14, title: "Klara and the Sun", author: "Kazuo Ishiguro", owner: "Riya Bhatt", city: "Pune", distance: "5.4 km", isbn: "9780571364879", status: "pending", rating: 4.5 },
  { id: 15, title: "Educated", author: "Tara Westover", owner: "Kabir Shah", city: "Chennai", distance: "1.9 km", isbn: "9780399590504", status: "completed", rating: 4.8 },
  { id: 16, title: "Lessons in Chemistry", author: "Bonnie Garmus", owner: "Tanvi Desai", city: "Hyderabad", distance: "3.3 km", isbn: "9780385547345", status: "available", rating: 4.7 },
];

const statusStyle = {
  available: { badge: "bg-[#6B8F55]", text: "text-[#6B8F55]", tint: "bg-[#6B8F55]/10 border-[#6B8F55]/30" },
  pending: { badge: "bg-[#A9812F]", text: "text-[#A9812F]", tint: "bg-[#A9812F]/10 border-[#A9812F]/30" },
  completed: { badge: "bg-[#3E7C74]", text: "text-[#3E7C74]", tint: "bg-[#3E7C74]/10 border-[#3E7C74]/30" },
};

const cities = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];

const ExchangePage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [city, setCity] = useState('Mumbai');
  const [pinBounce, setPinBounce] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [books, setBooks] = useState(exchangeBooks); // Add state for books

  useEffect(() => { setMounted(true); }, []);

  const filteredBooks = books.filter((book) => book.status === activeTab);
  const counts = {
    available: books.filter((b) => b.status === 'available').length,
    pending: books.filter((b) => b.status === 'pending').length,
    completed: books.filter((b) => b.status === 'completed').length,
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setPinBounce((n) => n + 1);
  };

  // ✅ Handle Request button click - prevent event bubbling
  const handleRequest = (e, bookId) => {
    e.stopPropagation(); // Prevent any parent click events
    e.preventDefault();
    console.log(`📚 Requesting book: ${bookId}`);
    // Update book status to pending
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId && book.status === 'available'
          ? { ...book, status: 'pending' }
          : book
      )
    );
  };

  // ✅ Handle card click - navigate to book details or show modal
  const handleCardClick = (book) => {
    console.log(`📖 Book clicked: ${book.title}`);
    // You can add navigation or modal logic here
    // navigate(`/book/${book.id}`);
  };

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
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ===== Header ===== */}
        <div className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                <RefreshCw size={18} className="text-[#D8472F] spin-slow" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Book Exchange</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Swap physical books with readers near you</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
              <button 
                className="seal-btn flex items-center gap-2 px-6 py-2.5 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition"
                onClick={(e) => {
                  e.preventDefault();
                  console.log('📚 List Book clicked');
                }}
              >
                <Plus size={15} /> List Book
              </button>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex gap-2 overflow-x-auto">
          {['available', 'pending', 'completed'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D8472F] text-[#FFFBF3] shadow-[0_8px_18px_-8px_rgba(216,71,47,0.5)] scale-[1.03]'
                    : 'bg-[#FFFBF3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-2 py-0.5 rounded-full text-xs transition-colors ${isActive ? 'bg-[#FFFBF3]/25 text-[#FFFBF3]' : 'bg-[#EDE2CE] text-[#8A7F6B]'}`}>
                  {counts[tab]}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===== Exchange Grid — 3 per row ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBooks.map((book, i) => {
            const s = statusStyle[book.status];
            return (
              <div
                key={`${activeTab}-${book.id}`}
                className="card-rise bg-[#FFFBF3] rounded-2xl overflow-hidden border border-[#E2D5BC] hover:border-[#D9C7A3] hover:-translate-y-1 hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.25)] transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => handleCardClick(book)}
              >
                <div className="flex p-4 gap-4">
                  <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-[#EDE2CE]">
                    <img
                      src={coverUrl(book.isbn)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://covers.openlibrary.org/b/isbn/placeholder-L.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[#1E2A42] group-hover:text-[#D8472F] transition truncate">{book.title}</h3>
                    <p className="text-xs text-[#5B6478] truncate">{book.author}</p>
                    <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B] mt-1.5">
                      <User size={11} /> {book.owner}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B]">
                      <MapPin size={11} /> {book.city} · {book.distance}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-[#A9812F] mt-0.5">
                      <Star size={10} className="fill-[#A9812F] text-[#A9812F]" /> {book.rating}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${s.tint} ${s.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${s.badge} ${book.status === 'pending' ? 'pulse-soft' : ''}`} />
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                      </span>
                      {book.status === 'available' && (
                        <button 
                          className="seal-btn ml-auto px-3 py-1 bg-[#D8472F] text-[#FFFBF3] rounded-full text-xs font-semibold hover:bg-[#B23522] transition"
                          onClick={(e) => handleRequest(e, book.id)}
                        >
                          Request
                        </button>
                      )}
                      {book.status === 'pending' && (
                        <span className="ml-auto flex items-center gap-1 text-xs text-[#A9812F]">
                          <Clock size={12} className="pulse-soft rounded-full" /> Awaiting
                        </span>
                      )}
                      {book.status === 'completed' && (
                        <span className="ml-auto flex items-center gap-1 text-xs text-[#3E7C74]">
                          <CheckCircle2 size={12} className="tick-in" /> Done
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== Empty State ===== */}
        {filteredBooks.length === 0 && (
          <div className="bg-[#FFFBF3] rounded-2xl p-12 text-center border border-[#E2D5BC]">
            <RefreshCw size={26} className="mx-auto text-[#D8472F] mb-3 spin-slow" />
            <h3 className="font-display text-xl font-semibold text-[#1E2A42]">No {activeTab} exchanges</h3>
            <p className="text-[#8A7F6B] text-sm mt-2">Check back later, or list your own books for exchange</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangePage;