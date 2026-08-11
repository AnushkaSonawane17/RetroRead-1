import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles, Star, User, BookOpen, Heart, ArrowUpDown, Tag } from 'lucide-react';

const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

const conditionLabel = { "like new": "Pristine", good: "Well-Loved", used: "Weathered" };
const conditionRibbon = {
  "like new": "from-[#3E6B52] to-[#2C4E3B]",
  good: "from-[#C9A567] to-[#A9843F]",
  used: "from-[#8B6F47] to-[#6B5636]",
};

const books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 349, condition: "like new", isbn: "9780735211292", category: "Self-Help", seller: "Ananya Rao", city: "Mumbai", rating: 4.9 },
  { id: 2, title: "Ikigai", author: "Héctor García", price: 249, condition: "good", isbn: "9780143130727", category: "Self-Help", seller: "Rohan Mehta", city: "Delhi", rating: 4.7 },
  { id: 3, title: "Deep Work", author: "Cal Newport", price: 299, condition: "used", isbn: "9781455586691", category: "Self-Help", seller: "Priya Nair", city: "Bengaluru", rating: 4.6 },
  { id: 4, title: "The Psychology of Money", author: "Morgan Housel", price: 329, condition: "like new", isbn: "9780857197689", category: "Finance", seller: "Karan Verma", city: "Pune", rating: 4.9 },
  { id: 5, title: "Sapiens", author: "Yuval N. Harari", price: 399, condition: "good", isbn: "9780062316097", category: "History", seller: "Meera Iyer", city: "Hyderabad", rating: 4.7 },
  { id: 6, title: "The Alchemist", author: "Paulo Coelho", price: 249, condition: "like new", isbn: "9780062315007", category: "Fiction", seller: "Aditya Kulkarni", city: "Chennai", rating: 4.8 },
  { id: 7, title: "Meditations", author: "Marcus Aurelius", price: 199, condition: "used", isbn: "9780140449334", category: "Philosophy", seller: "Sneha Joshi", city: "Kolkata", rating: 4.5 },
  { id: 8, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 379, condition: "like new", isbn: "9780374533557", category: "Psychology", seller: "Vikram Singh", city: "Ahmedabad", rating: 4.8 },
  { id: 9, title: "The Night Circus", author: "Erin Morgenstern", price: 289, condition: "good", isbn: "9780307744432", category: "Fiction", seller: "Ishaan Kapoor", city: "Jaipur", rating: 4.7 },
  { id: 10, title: "Project Hail Mary", author: "Andy Weir", price: 349, condition: "like new", isbn: "9780593135204", category: "Fiction", seller: "Diya Menon", city: "Kochi", rating: 4.9 },
  { id: 11, title: "The Silent Patient", author: "Alex Michaelides", price: 259, condition: "used", isbn: "9781250301697", category: "Fiction", seller: "Arjun Reddy", city: "Mumbai", rating: 4.6 },
  { id: 12, title: "Dune", author: "Frank Herbert", price: 319, condition: "good", isbn: "9780441013593", category: "Fiction", seller: "Naina Kulkarni", city: "Delhi", rating: 4.8 },
  { id: 13, title: "Klara and the Sun", author: "Kazuo Ishiguro", price: 279, condition: "like new", isbn: "9780571364879", category: "Fiction", seller: "Yash Malhotra", city: "Bengaluru", rating: 4.6 },
  { id: 14, title: "Educated", author: "Tara Westover", price: 299, condition: "good", isbn: "9780399590504", category: "History", seller: "Riya Bhatt", city: "Pune", rating: 4.8 },
  { id: 15, title: "Lessons in Chemistry", author: "Bonnie Garmus", price: 329, condition: "like new", isbn: "9780385547345", category: "Fiction", seller: "Kabir Shah", city: "Chennai", rating: 4.7 },
  { id: 16, title: "Fourth Wing", author: "Rebecca Yarros", price: 349, condition: "used", isbn: "9781649374042", category: "Fantasy", seller: "Tanvi Desai", city: "Hyderabad", rating: 4.7 },
];

const categories = ['All', ...Array.from(new Set(books.map((b) => b.category)))];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const MarketplacePage = () => {
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState(new Set());

  const [sparkles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i, left: Math.random() * 100, top: Math.random() * 100,
      size: 2 + Math.random() * 3, duration: 7 + Math.random() * 9, delay: Math.random() * 8,
    }))
  );

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredBooks = useMemo(() => {
    const q = searchTerm.toLowerCase();
    let result = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.seller.toLowerCase().includes(q);
      const matchesCondition = filter === 'all' || book.condition === filter;
      const matchesCategory = category === 'All' || book.category === category;
      return matchesSearch && matchesCondition && matchesCategory;
    });

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [searchTerm, filter, category, sortBy]);

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-story { font-family: 'IM Fell English', serif; }
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }

        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }

        @keyframes twinkle { 0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); } 50% { opacity: 1; transform: translateY(-14px) scale(1); } }
        .sparkle { position: absolute; border-radius: 9999px; background: radial-gradient(circle, #C9A567 0%, rgba(201,165,103,0) 70%); animation: twinkle ease-in-out infinite; pointer-events: none; }

        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 9s linear infinite; }

        .seal-btn { position: relative; overflow: hidden; cursor: pointer; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent); transform: translateX(-120%) skewX(-15deg); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

        @keyframes heart-pop { 0% { transform: scale(1); } 40% { transform: scale(1.4); } 100% { transform: scale(1); } }
        .heart-pop { animation: heart-pop 0.35s ease; }

        .corner { position: absolute; width: 16px; height: 16px; border-color: #C9A567; opacity: 0; transition: opacity 0.25s ease; }
        .book-card:hover .corner { opacity: 1; }
        .corner-tl { top: 6px; left: 6px; border-top: 2px solid; border-left: 2px solid; }
        .corner-tr { top: 6px; right: 6px; border-top: 2px solid; border-right: 2px solid; }
        .corner-bl { bottom: 6px; left: 6px; border-bottom: 2px solid; border-left: 2px solid; }
        .corner-br { bottom: 6px; right: 6px; border-bottom: 2px solid; border-right: 2px solid; }

        @keyframes card-rise { 0% { opacity: 0; transform: translateY(14px); } 100% { opacity: 1; transform: translateY(0); } }
        .card-rise { animation: card-rise 0.45s ease forwards; opacity: 0; }

        .book-card {
          background: #FFFBF3;
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid #E2D5BC;
          box-shadow: 0 10px 22px -14px rgba(30,42,66,0.35);
          transition: all 0.3s ease;
        }
        .book-card:hover {
          border-color: #C9A567;
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -16px rgba(30,42,66,0.45);
        }
        .book-card img {
          transition: transform 0.5s ease;
        }
        .book-card:hover img {
          transform: scale(1.05);
        }
        .book-card .corner {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .book-card:hover .corner {
          opacity: 1;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />
      <div className="pointer-events-none fixed inset-0 z-0">
        {sparkles.map((s) => (
          <span key={s.id} className="sparkle" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDuration: `${s.duration}s`, animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ===== Header ===== */}
        <div className="relative bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] overflow-hidden">
          <div className="absolute -top-6 -right-6 text-[#C9A567]/15"><Sparkles size={110} /></div>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Sparkles size={22} className="text-[#C9A567] spin-slow" />
              <div>
                <h1 className="font-story text-4xl text-[#1E2A42]">The Traveling Booksellers' Market</h1>
                <p className="text-[#8A7F6B] text-sm mt-1 italic">Where one reader's finished tale becomes another's beginning</p>
              </div>
            </div>
            <button className="seal-btn flex items-center gap-2 px-6 py-2.5 bg-[#6B4C82] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(107,76,130,0.55)] hover:bg-[#573C6B] transition">
              <BookOpen size={15} /> Offer a Book
            </button>
          </div>
        </div>

        {/* ===== Search & Filters ===== */}
        <div className="bg-[#FFFBF3] rounded-2xl p-4 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6B]" />
              <input
                type="text"
                placeholder="Search for a tale, teller, or trader…"
                className="w-full pl-10 pr-10 py-2.5 bg-[#F6EFE3] rounded-xl border border-[#E2D5BC] focus:outline-none focus:ring-2 focus:ring-[#C9A567]/50 text-[#1E2A42] placeholder:text-[#8A7F6B]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6B] hover:text-[#1E2A42] transition"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6B] pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-[#F6EFE3] rounded-xl border border-[#E2D5BC] text-sm text-[#1E2A42] focus:outline-none focus:ring-2 focus:ring-[#C9A567]/50 appearance-none cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['all', 'like new', 'good', 'used'].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    filter === option ? 'bg-[#C9A567] text-[#1E2A42] shadow-[0_6px_14px_-6px_rgba(201,165,103,0.7)]' : 'bg-[#F6EFE3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
                  }`}
                  onClick={() => setFilter(option)}
                >
                  {option === 'all' ? 'All Tales' : conditionLabel[option]}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-dashed border-[#E2D5BC]">
            <span className="flex items-center gap-1 text-xs text-[#8A7F6B] mr-1"><Tag size={12} /> Genre:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  category === cat ? 'bg-[#6B4C82] text-[#FFFBF3]' : 'bg-[#F6EFE3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-[#8A7F6B] px-1">{filteredBooks.length} tale{filteredBooks.length !== 1 ? 's' : ''} found</p>

        {/* ===== Books Grid — 3 per row ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book, i) => {
            const isWishlisted = wishlist.has(book.id);
            return (
              <div
                key={book.id}
                className="book-card card-rise"
                style={{ animationDelay: `${(i % 9) * 60}ms` }}
              >
                <span className="corner corner-tl" /><span className="corner corner-tr" />
                <span className="corner corner-bl" /><span className="corner corner-br" />

                <div className="flex">
                  <div className="w-32 sm:w-36 flex-shrink-0 aspect-[2/3] overflow-hidden relative bg-[#EDE2CE]">
                    <img
                      src={coverUrl(book.isbn)}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="150" viewBox="0 0 100 150"%3E%3Crect width="100" height="150" fill="%23EDE2CE"/%3E%3Ctext x="50" y="75" font-size="40" text-anchor="middle" fill="%238A7F6B"%3E📚%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-[#FFFBF3] bg-gradient-to-r ${conditionRibbon[book.condition]}`}>
                      {conditionLabel[book.condition]}
                    </span>
                    <button
                      onClick={() => toggleWishlist(book.id)}
                      className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#FFFBF3]/90 transition hover:bg-[#FFFBF3] ${isWishlisted ? 'heart-pop' : ''}`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart size={13} className={isWishlisted ? 'fill-[#D8472F] text-[#D8472F]' : 'text-[#8A7F6B]'} />
                    </button>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E2A42]/75 text-[#C9A567] text-[10px] font-medium">
                      <Star size={10} className="fill-[#C9A567] text-[#C9A567]" /> {book.rating}
                    </div>
                  </div>

                  <div className="p-4 flex-1 min-w-0 flex flex-col">
                    <span className="text-[10px] uppercase tracking-wide text-[#8A7F6B]">{book.category}</span>
                    <h3 className="font-semibold text-sm text-[#1E2A42] hover:text-[#6B4C82] transition line-clamp-2 mt-0.5">{book.title}</h3>
                    <p className="text-xs text-[#5B6478] line-clamp-1 mt-0.5">{book.author}</p>
                    <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B] mt-2">
                      <User size={11} /> {book.seller} · {book.city}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-3">
                      <span className="font-display font-semibold text-lg text-[#6B4C82]">₹{book.price}</span>
                      <button className="seal-btn px-3.5 py-1.5 bg-[#C9A567] text-[#1E2A42] rounded-full text-xs font-semibold hover:bg-[#B8934F] transition">
                        Claim
                      </button>
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
            <Sparkles size={28} className="mx-auto text-[#C9A567] mb-3" />
            <h3 className="font-story text-2xl text-[#1E2A42]">No tales match your quest</h3>
            <p className="text-[#8A7F6B] text-sm mt-2">Try a different search, genre, or condition.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;


// import React, { useState } from 'react';
// import { Search, LayoutGrid, Rows3, Sparkles, Star, User, BookOpen } from 'lucide-react';

// /**
//  * MarketplacePage — "The Traveling Booksellers' Market"
//  * Same parchment/ink base as the rest of the app, dressed for a fairy tale:
//  * gold-leaf card frames, drifting firefly sparkles, gently levitating book
//  * cards, and a wax-seal "Claim" button. Covers via Open Library's cover API
//  * (covers.openlibrary.org/b/isbn/{isbn}-L.jpg — stable, no-auth, public).
//  */

// const books = [
//   { id: 1, title: "Atomic Habits", author: "James Clear", price: 349, condition: "like new", isbn: "9780735211292", category: "Self-Help", seller: "Ananya Rao", city: "Mumbai", rating: 4.9 },
//   { id: 2, title: "Ikigai", author: "Héctor García", price: 249, condition: "good", isbn: "9780143130727", category: "Self-Help", seller: "Rohan Mehta", city: "Delhi", rating: 4.7 },
//   { id: 3, title: "Deep Work", author: "Cal Newport", price: 299, condition: "used", isbn: "9781455586691", category: "Self-Help", seller: "Priya Nair", city: "Bengaluru", rating: 4.6 },
//   { id: 4, title: "The Psychology of Money", author: "Morgan Housel", price: 329, condition: "like new", isbn: "9780857197689", category: "Finance", seller: "Karan Verma", city: "Pune", rating: 4.9 },
//   { id: 5, title: "Sapiens", author: "Yuval N. Harari", price: 399, condition: "good", isbn: "9780062316097", category: "History", seller: "Meera Iyer", city: "Hyderabad", rating: 4.7 },
//   { id: 6, title: "The Alchemist", author: "Paulo Coelho", price: 249, condition: "like new", isbn: "9780062315007", category: "Fiction", seller: "Aditya Kulkarni", city: "Chennai", rating: 4.8 },
//   { id: 7, title: "Meditations", author: "Marcus Aurelius", price: 199, condition: "used", isbn: "9780140449334", category: "Philosophy", seller: "Sneha Joshi", city: "Kolkata", rating: 4.5 },
//   { id: 8, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 379, condition: "like new", isbn: "9780374533557", category: "Psychology", seller: "Vikram Singh", city: "Ahmedabad", rating: 4.8 },
// ];

// const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

// // Fairy-tale flavor for condition — filter values stay plain, only the label shown changes.
// const conditionLabel = { "like new": "Pristine", good: "Well-Loved", used: "Weathered" };
// const conditionRibbon = {
//   "like new": "from-[#3E6B52] to-[#2C4E3B]",
//   good: "from-[#C9A567] to-[#A9843F]",
//   used: "from-[#8B6F47] to-[#6B5636]",
// };

// const MarketplacePage = () => {
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('grid');

//   // Ambient fireflies — generated once, not on every render.
//   const [sparkles] = useState(() =>
//     Array.from({ length: 22 }, (_, i) => ({
//       id: i,
//       left: Math.random() * 100,
//       top: Math.random() * 100,
//       size: 2 + Math.random() * 3,
//       duration: 7 + Math.random() * 9,
//       delay: Math.random() * 8,
//     }))
//   );

//   const filteredBooks = books.filter((book) => {
//     const q = searchTerm.toLowerCase();
//     const matchesSearch =
//       book.title.toLowerCase().includes(q) ||
//       book.author.toLowerCase().includes(q) ||
//       book.seller.toLowerCase().includes(q);
//     const matchesFilter = filter === 'all' || book.condition === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10 relative overflow-hidden">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-story { font-family: 'IM Fell English', serif; }
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }

//         .paper-grain {
//           background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
//           background-size: 4px 4px;
//         }

//         @keyframes twinkle {
//           0%, 100% { opacity: 0; transform: translateY(0) scale(0.6); }
//           50% { opacity: 1; transform: translateY(-14px) scale(1); }
//         }
//         .sparkle {
//           position: absolute;
//           border-radius: 9999px;
//           background: radial-gradient(circle, #C9A567 0%, rgba(201,165,103,0) 70%);
//           animation: twinkle ease-in-out infinite;
//           pointer-events: none;
//         }

//         @keyframes float-y {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-6px); }
//         }
//         .float-card { animation: float-y 5.5s ease-in-out infinite; }

//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .spin-slow { animation: spin-slow 9s linear infinite; }

//         @keyframes shimmer-sweep {
//           0% { transform: translateX(-120%) skewX(-15deg); }
//           100% { transform: translateX(220%) skewX(-15deg); }
//         }
//         .seal-btn { position: relative; overflow: hidden; }
//         .seal-btn::after {
//           content: "";
//           position: absolute;
//           top: 0; left: 0;
//           width: 40%; height: 100%;
//           background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
//           transform: translateX(-120%) skewX(-15deg);
//         }
//         .seal-btn:hover::after { animation: shimmer-sweep 0.9s ease forwards; }

//         @keyframes glow-pulse {
//           0%, 100% { box-shadow: 0 0 0 rgba(107,76,130,0); }
//           50% { box-shadow: 0 0 22px rgba(107,76,130,0.35); }
//         }
//         .card-glow:hover { animation: glow-pulse 1.8s ease-in-out infinite; }

//         .corner { position: absolute; width: 16px; height: 16px; border-color: #C9A567; opacity: 0; transition: opacity 0.25s ease; }
//         .group:hover .corner { opacity: 1; }
//         .corner-tl { top: 6px; left: 6px; border-top: 2px solid; border-left: 2px solid; }
//         .corner-tr { top: 6px; right: 6px; border-top: 2px solid; border-right: 2px solid; }
//         .corner-bl { bottom: 6px; left: 6px; border-bottom: 2px solid; border-left: 2px solid; }
//         .corner-br { bottom: 6px; right: 6px; border-bottom: 2px solid; border-right: 2px solid; }
//       `}</style>

//       {/* ambient paper grain + drifting fireflies */}
//       <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />
//       <div className="pointer-events-none fixed inset-0 z-0">
//         {sparkles.map((s) => (
//           <span
//             key={s.id}
//             className="sparkle"
//             style={{
//               left: `${s.left}%`,
//               top: `${s.top}%`,
//               width: s.size,
//               height: s.size,
//               animationDuration: `${s.duration}s`,
//               animationDelay: `${s.delay}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

//         {/* ===== Header ===== */}
//         <div className="relative bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] overflow-hidden">
//           <div className="absolute -top-6 -right-6 text-[#C9A567]/15">
//             <Sparkles size={110} />
//           </div>
//           <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex items-center gap-3">
//               <Sparkles size={22} className="text-[#C9A567] spin-slow" />
//               <div>
//                 <h1 className="font-story text-4xl text-[#1E2A42]">The Traveling Booksellers' Market</h1>
//                 <p className="text-[#8A7F6B] text-sm mt-1 italic">Where one reader's finished tale becomes another's beginning</p>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#F6EFE3] rounded-full text-sm text-[#1E2A42] border border-[#E2D5BC] hover:border-[#C9A567]/60 transition"
//               >
//                 {viewMode === 'grid' ? <Rows3 size={15} /> : <LayoutGrid size={15} />}
//                 {viewMode === 'grid' ? 'List' : 'Grid'}
//               </button>
//               <button className="seal-btn flex items-center gap-2 px-6 py-2.5 bg-[#6B4C82] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(107,76,130,0.55)] hover:bg-[#573C6B] transition">
//                 <BookOpen size={15} /> Offer a Book
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ===== Search & Filter ===== */}
//         <div className="bg-[#FFFBF3] rounded-2xl p-4 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7F6B]" />
//               <input
//                 type="text"
//                 placeholder="Search for a tale, teller, or trader…"
//                 className="w-full pl-10 pr-4 py-2.5 bg-[#F6EFE3] rounded-xl border border-[#E2D5BC] focus:outline-none focus:ring-2 focus:ring-[#C9A567]/50 text-[#1E2A42] placeholder:text-[#8A7F6B]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {['all', 'like new', 'good', 'used'].map((option) => (
//                 <button
//                   key={option}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                     filter === option
//                       ? 'bg-[#C9A567] text-[#1E2A42] shadow-[0_6px_14px_-6px_rgba(201,165,103,0.7)]'
//                       : 'bg-[#F6EFE3] text-[#8A7F6B] hover:text-[#1E2A42] border border-[#E2D5BC]'
//                   }`}
//                   onClick={() => setFilter(option)}
//                 >
//                   {option === 'all' ? 'All Tales' : conditionLabel[option]}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ===== Books Grid ===== */}
//         <div
//           className={
//             viewMode === 'grid'
//               ? 'grid gap-x-6 gap-y-12 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]'
//               : 'grid grid-cols-1 gap-4'
//           }
//         >
//           {filteredBooks.map((book, i) => (
//             <div
//               key={book.id}
//               className={`group card-glow relative bg-[#FFFBF3] rounded-2xl overflow-hidden border border-[#E2D5BC] hover:border-[#C9A567]/60 shadow-[0_10px_22px_-14px_rgba(30,42,66,0.35)] transition ${
//                 viewMode === 'list' ? 'flex' : 'w-full max-w-[196px] mx-auto float-card'
//               }`}
//               style={viewMode === 'grid' ? { animationDelay: `${(i % 6) * 0.4}s` } : undefined}
//             >
//               <span className="corner corner-tl" />
//               <span className="corner corner-tr" />
//               <span className="corner corner-bl" />
//               <span className="corner corner-br" />

//               <div className={`${viewMode === 'list' ? 'w-24 flex-shrink-0' : ''} aspect-[2/3] overflow-hidden relative bg-[#EDE2CE]`}>
//                 <img
//                   src={coverUrl(book.isbn)}
//                   alt={book.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                   loading="lazy"
//                 />
//                 <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-[#FFFBF3] bg-gradient-to-r ${conditionRibbon[book.condition]}`}>
//                   {conditionLabel[book.condition]}
//                 </span>
//                 <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1E2A42]/75 text-[#C9A567] text-[10px] font-medium">
//                   <Star size={10} className="fill-[#C9A567] text-[#C9A567]" /> {book.rating}
//                 </div>
//               </div>

//               <div className={`${viewMode === 'list' ? 'p-4 flex-1' : 'p-3.5'} flex flex-col`}>
//                 <h3 className="font-semibold text-sm text-[#1E2A42] group-hover:text-[#6B4C82] transition line-clamp-1">{book.title}</h3>
//                 <p className="text-xs text-[#5B6478] line-clamp-1">{book.author}</p>
//                 <p className="flex items-center gap-1 text-[11px] text-[#8A7F6B] mt-1.5">
//                   <User size={11} /> {book.seller} · {book.city}
//                 </p>
//                 <div className="flex justify-between items-center mt-auto pt-3">
//                   <span className="font-display font-semibold text-base text-[#6B4C82]">₹{book.price}</span>
//                   <button className="seal-btn px-3.5 py-1.5 bg-[#C9A567] text-[#1E2A42] rounded-full text-xs font-semibold hover:bg-[#B8934F] transition">
//                     Claim
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ===== Empty State ===== */}
//         {filteredBooks.length === 0 && (
//           <div className="bg-[#FFFBF3] rounded-2xl p-12 text-center border border-[#E2D5BC]">
//             <Sparkles size={28} className="mx-auto text-[#C9A567] mb-3" />
//             <h3 className="font-story text-2xl text-[#1E2A42]">No tales match your quest</h3>
//             <p className="text-[#8A7F6B] text-sm mt-2">Try a different search, or widen your search through the stalls.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarketplacePage;


// import React, { useState } from 'react';
// import { Search, LayoutGrid, Rows3, Plus, Star, User } from 'lucide-react';

// /**
//  * MarketplacePage — same forest / brass token system as the RetroRead home page.
//  * Covers are served from Open Library's cover API keyed by ISBN-13, which is a
//  * stable, no-auth, publicly documented endpoint (covers.openlibrary.org/b/isbn/{isbn}-L.jpg).
//  */

// const books = [
//   { id: 1, title: "Atomic Habits", author: "James Clear", price: 349, condition: "Like New", isbn: "9780735211292", category: "Self-Help", seller: "Ananya Rao", city: "Mumbai", rating: 4.9 },
//   { id: 2, title: "Ikigai", author: "Héctor García", price: 249, condition: "Good", isbn: "9780143130727", category: "Self-Help", seller: "Rohan Mehta", city: "Delhi", rating: 4.7 },
//   { id: 3, title: "Deep Work", author: "Cal Newport", price: 299, condition: "Used", isbn: "9781455586691", category: "Self-Help", seller: "Priya Nair", city: "Bengaluru", rating: 4.6 },
//   { id: 4, title: "The Psychology of Money", author: "Morgan Housel", price: 329, condition: "Like New", isbn: "9780857197689", category: "Finance", seller: "Karan Verma", city: "Pune", rating: 4.9 },
//   { id: 5, title: "Sapiens", author: "Yuval N. Harari", price: 399, condition: "Good", isbn: "9780062316097", category: "History", seller: "Meera Iyer", city: "Hyderabad", rating: 4.7 },
//   { id: 6, title: "The Alchemist", author: "Paulo Coelho", price: 249, condition: "Like New", isbn: "9780062315007", category: "Fiction", seller: "Aditya Kulkarni", city: "Chennai", rating: 4.8 },
//   { id: 7, title: "Meditations", author: "Marcus Aurelius", price: 199, condition: "Used", isbn: "9780140449334", category: "Philosophy", seller: "Sneha Joshi", city: "Kolkata", rating: 4.5 },
//   { id: 8, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 379, condition: "Like New", isbn: "9780374533557", category: "Psychology", seller: "Vikram Singh", city: "Ahmedabad", rating: 4.8 },
// ];

// const coverUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

// const conditionStyle = {
//   "Like New": "from-[#7E9B76] to-[#5C7A54]",
//   "Good": "from-[#C9A567] to-[#A98849]",
//   "Used": "from-[#8B6F47] to-[#6B5636]",
// };

// const MarketplacePage = () => {
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [viewMode, setViewMode] = useState('grid');

//   const filteredBooks = books.filter((book) => {
//     const q = searchTerm.toLowerCase();
//     const matchesSearch =
//       book.title.toLowerCase().includes(q) ||
//       book.author.toLowerCase().includes(q) ||
//       book.seller.toLowerCase().includes(q);
//     const matchesFilter = filter === 'all' || book.condition.toLowerCase() === filter.toLowerCase();
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="min-h-screen w-full bg-[#141C16] text-[#EFE7D8] py-10">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Inter', sans-serif; }
//       `}</style>

//       <div className="font-body max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

//         {/* ===== Header ===== */}
//         <div className="bg-[#1A2320]/70 backdrop-blur-sm rounded-2xl p-6 border border-[#2E3A30] shadow-xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//               <h1 className="font-display font-bold text-3xl text-[#EFE7D8]">Book Marketplace</h1>
//               <p className="text-[#7E8F80] text-sm mt-1">Buy and sell books from fellow readers, city to city</p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="flex items-center gap-2 px-4 py-2 bg-[#141C16]/60 rounded-full text-sm text-[#EFE7D8] border border-[#2E3A30] hover:border-[#C9A567]/50 transition"
//               >
//                 {viewMode === 'grid' ? <Rows3 size={15} /> : <LayoutGrid size={15} />}
//                 {viewMode === 'grid' ? 'List' : 'Grid'}
//               </button>
//               <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C9A567] to-[#A98849] text-[#141C16] rounded-full text-sm font-semibold shadow-lg shadow-black/30 hover:scale-[1.03] transition">
//                 <Plus size={15} /> Sell a Book
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ===== Search & Filter ===== */}
//         <div className="bg-[#1A2320]/70 backdrop-blur-sm rounded-2xl p-4 border border-[#2E3A30] shadow-xl">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7E8F80]" />
//               <input
//                 type="text"
//                 placeholder="Search books, authors, sellers..."
//                 className="w-full pl-10 pr-4 py-2.5 bg-[#141C16]/80 rounded-xl border border-[#2E3A30] focus:outline-none focus:ring-2 focus:ring-[#C9A567]/60 text-[#EFE7D8] placeholder:text-[#7E8F80]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               {['all', 'like new', 'good', 'used'].map((option) => (
//                 <button
//                   key={option}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                     filter === option
//                       ? 'bg-gradient-to-r from-[#C9A567] to-[#A98849] text-[#141C16] shadow-lg shadow-black/20'
//                       : 'bg-[#141C16]/60 text-[#7E8F80] hover:text-[#EFE7D8] border border-[#2E3A30]'
//                   }`}
//                   onClick={() => setFilter(option)}
//                 >
//                   {option.charAt(0).toUpperCase() + option.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ===== Books Grid ===== */}
//         <div
//           className={
//             viewMode === 'grid'
//               ? 'grid gap-x-6 gap-y-10 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]'
//               : 'grid grid-cols-1 gap-4'
//           }
//         >
//           {filteredBooks.map((book) => (
//             <div
//               key={book.id}
//               className={`bg-[#1A2320]/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#2E3A30] hover:border-[#C9A567]/40 shadow-lg hover:shadow-black/40 transition group ${
//                 viewMode === 'list' ? 'flex' : 'w-full max-w-[190px] mx-auto'
//               }`}
//             >
//               <div className={`${viewMode === 'list' ? 'w-24 flex-shrink-0' : ''} aspect-[2/3] overflow-hidden relative bg-[#0F1512]`}>
//                 <img
//                   src={coverUrl(book.isbn)}
//                   alt={book.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                   loading="lazy"
//                 />
//                 <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium text-[#141C16] bg-gradient-to-r ${conditionStyle[book.condition]}`}>
//                   {book.condition}
//                 </span>
//                 <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#141C16]/75 text-[#C9A567] text-[10px] font-medium">
//                   <Star size={10} className="fill-[#C9A567] text-[#C9A567]" /> {book.rating}
//                 </div>
//               </div>
//               <div className={`${viewMode === 'list' ? 'p-4 flex-1' : 'p-3.5'} flex flex-col`}>
//                 <h3 className="font-semibold text-sm text-[#EFE7D8] group-hover:text-[#C9A567] transition line-clamp-1">{book.title}</h3>
//                 <p className="text-xs text-[#B9C9AE] line-clamp-1">{book.author}</p>
//                 <p className="flex items-center gap-1 text-[11px] text-[#7E8F80] mt-1.5">
//                   <User size={11} /> {book.seller} · {book.city}
//                 </p>
//                 <div className="flex justify-between items-center mt-auto pt-3">
//                   <span className="font-display font-semibold text-base text-[#C9A567]">₹{book.price}</span>
//                   <button className="px-3.5 py-1.5 bg-gradient-to-r from-[#C9A567] to-[#A98849] text-[#141C16] rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-black/20 transition">
//                     Buy
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ===== Empty State ===== */}
//         {filteredBooks.length === 0 && (
//           <div className="bg-[#1A2320]/70 backdrop-blur-sm rounded-2xl p-12 text-center border border-[#2E3A30]">
//             <h3 className="font-display text-xl font-semibold text-[#EFE7D8]">No books found</h3>
//             <p className="text-[#7E8F80] text-sm mt-2">Try adjusting your search or filter</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarketplacePage;