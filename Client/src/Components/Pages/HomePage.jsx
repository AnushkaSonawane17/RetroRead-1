import React, { useEffect, useState } from "react";
import { Sparkles, BookOpen, Users, Feather, Flame, Target, Library, Search, X } from "lucide-react";
import ChatPanel from "../ChatPanel";
import { searchBooks, getTrendingBooks } from '../lib/googleBooks.js';

const bookQuotes = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
  { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
];

const trending = [
  { rank: 1, title: "The Night Circus", author: "Erin Morgenstern", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
  { rank: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
  { rank: 3, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
  { rank: 4, title: "It Ends With Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
  { rank: 5, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
];

const forYou = [
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
  { title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { title: "Atomic Habits", author: "James Clear", cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
];

const recentlyAdded = [
  { rank: null, title: "Lessons in Chemistry", author: "Bonnie Garmus", cover: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg", isNew: true },
  { rank: null, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg", isNew: true },
  { rank: null, title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg", isNew: true },
  { rank: null, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
  { rank: null, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
];

const shelfRowA = [
  { title: "The Psychology of Money", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10" },
  { title: "The Design of Everyday Things", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymGoQp0oPqVTNGiT0oy90Bhizxih9ApTM_SbOaKir4za_7W3Esmici__1&s=10" },
  { title: "Atomic Habits", cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { title: "Educated", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { title: "The Silent Patient", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
  { title: "Fourth Wing", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
];
const shelfRowB = [
  { title: "Deep Work", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYoNbwM6uYYhX5mzJvJNf3zcVh5n1uN8ou0VUFGbFi-A&s" },
  { title: "Thinking, Fast and Slow", cover: "https://m.media-amazon.com/images/I/41iJ8QmVs2L._SY445_SX342_FMwebp_.jpg" },
  { title: "The Hobbit", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
  { title: "Dune", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
  { title: "Klara and the Sun", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
  { title: "The Night Circus", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
];

const stats = [
  { icon: BookOpen, value: "10K+", label: "Books Available" },
  { icon: Sparkles, value: "AI", label: "Powered" },
  { icon: Users, value: "50K+", label: "Happy Readers" },
];

const streakDays = [true, true, false, true, true, true, true];
const streakDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

function SectionEyebrow({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm md:text-base font-display font-semibold tracking-wide text-[#5B6478] mb-2">
      <Icon size={16} className="text-[#D8472F]" />
      {children}
    </div>
  );
}

function RankStamp({ rank }) {
  if (!rank) return null;
  return (
    <div className="absolute -top-2.5 -left-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2A42] font-display text-xs font-bold text-[#F0C572] shadow-[0_3px_10px_rgba(0,0,0,0.35)] ring-2 ring-[#FFFBF3]">
      {rank}
    </div>
  );
}

function NewBadge() {
  return (
    <div className="absolute -top-2 -right-2 z-10 bg-[#4B7A4E] text-[#FFFBF3] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
      NEW
    </div>
  );
}

function BookCard({ b, size = "normal", onClick }) {
  const w = size === "small" ? "max-w-[100px]" : "max-w-[124px]";
  return (
    <div className={`group text-center ${w} mx-auto cursor-pointer`} onClick={onClick}>
      <div className="relative">
        <RankStamp rank={b.rank} />
        {b.isNew && <NewBadge />}
        <div className="aspect-[2/3] rounded-sm bg-[#FFFBF3] border border-[#E2D5BC] overflow-hidden shadow-[0_10px_22px_-10px_rgba(30,42,66,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_28px_-10px_rgba(216,71,47,0.28)]">
          <img src={b.cover} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
      <p className="mt-3 font-body text-xs font-medium text-[#1E2A42] line-clamp-1">{b.title}</p>
      <p className="mt-0.5 font-body text-[11px] text-[#8A7F6B]">{b.author}</p>
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [apiBooks, setApiBooks] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % bookQuotes.length);
        setQuoteVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const testGoogleBooks = async () => {
      setApiLoading(true);
      setApiError(null);
      try {
        const result = await searchBooks('Harry Potter', 5);
        if (result.items && result.items.length > 0) {
          setApiBooks(result.items.slice(0, 4));
        } else {
          setApiError('No books found. Try a different search.');
        }
      } catch (error) {
        setApiError('Failed to fetch books. Check console for details.');
      } finally {
        setApiLoading(false);
      }
    };
    testGoogleBooks();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setShowResults(true);
    try {
      const result = await searchBooks(searchQuery, 6);
      setSearchResults(result.items || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  function closeSearch() {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  async function openBook(title, author = "") {
    try {
      const result = await searchBooks(`${title} ${author}`.trim(), 1);
      const book = result.items?.[0];
      const link = book?.volumeInfo?.previewLink || book?.volumeInfo?.infoLink;
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        alert("Couldn't find this book online. Try another title.");
      }
    } catch {
      alert("Something went wrong opening this book.");
    }
  }

  const activeQuote = bookQuotes[quoteIndex];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
        .font-quote { font-family: 'Newsreader', serif; }
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain {
          background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }
        @keyframes shelf-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.92; } }
        .shelf-flicker { animation: shelf-flicker 4s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <main className="font-body relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-28">
        {/* HERO */}
        <section
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E2D5BC] bg-[#FFFBF3] px-3 py-1 text-[10px] tracking-wide text-[#5B6478] mb-6 whitespace-nowrap">
              <Feather size={11} className="text-[#D8472F]" />
              A new line, every visit
            </div>

            <div className="min-h-[7.5rem] md:min-h-[8.5rem] mb-6 relative">
              <span className="absolute -top-6 -left-1 font-quote text-6xl text-[#D8472F]/15 select-none pointer-events-none" aria-hidden="true">&ldquo;</span>
              <p className={`font-quote italic text-3xl md:text-4xl leading-[1.15] text-[#1E2A42] relative transition-all duration-500 ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                {activeQuote.text}
              </p>
              <p className={`font-body mt-3 text-xs tracking-[0.15em] uppercase text-[#8A7F6B] transition-all duration-500 delay-100 ${quoteVisible ? "opacity-100" : "opacity-0"}`}>
                <span className="inline-block w-5 h-px bg-[#D8472F] align-middle mr-2.5" />
                {activeQuote.author}
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative mb-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FFFBF3] rounded-full border border-[#E2D5BC] focus-within:border-[#D8472F] transition-colors">
                <Search size={15} className="text-[#8A7F6B] shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any book title or author..."
                  className="flex-1 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={closeSearch} className="text-[#8A7F6B] hover:text-[#1E2A42]">
                    <X size={14} />
                  </button>
                )}
                <button type="submit" className="text-xs font-semibold text-[#D8472F] hover:underline shrink-0">
                  Search
                </button>
              </div>
            </form>

            {showResults && (
              <div className="bg-[#FFFBF3] border border-[#E2D5BC] rounded-xl p-3 max-h-56 overflow-y-auto space-y-2">
                {searching && <p className="text-xs text-[#8A7F6B]">Searching...</p>}
                {!searching && searchResults.length === 0 && (
                  <p className="text-xs text-[#8A7F6B]">No results found.</p>
                )}
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const link = item.volumeInfo?.previewLink || item.volumeInfo?.infoLink;
                      if (link) window.open(link, "_blank", "noopener,noreferrer");
                    }}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-[#F6EFE3] rounded-lg p-1 -m-1 transition-colors"
                  >
                    <img
                      src={item.volumeInfo?.imageLinks?.thumbnail || ""}
                      alt=""
                      className="w-6 h-9 object-cover rounded-sm bg-[#E2D5BC] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1E2A42] truncate">{item.volumeInfo?.title}</p>
                      <p className="text-[11px] text-[#8A7F6B] truncate">
                        {item.volumeInfo?.authors?.join(", ") || "Unknown author"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs mt-2">
              {apiLoading && <span className="text-[#8A7F6B]">⏳ Loading books...</span>}
              {apiError && <span className="text-[#D8472F]">⚠️ {apiError}</span>}
              {!apiLoading && !apiError && apiBooks.length > 0 && (
                <span className="text-emerald-600">✅ Google Books API connected!</span>
              )}
            </div>
          </div>

          {/* RIGHT: shelf, now clickable */}
          <div className={`relative transition-all duration-1000 delay-200 ease-out flex justify-end ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div
              className="relative rounded-2xl border border-[#3A2A18] p-6 md:p-7 w-full max-w-[620px] shelf-flicker"
              style={{
                background: "linear-gradient(180deg, #4A3423 0%, #2E2013 60%, #1E150C 100%)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(30,42,66,0.45)",
              }}
            >
              {[shelfRowA, shelfRowB].map((row, ri) => (
                <div key={ri} className={ri > 0 ? "mt-5" : ""}>
                  <div className="flex justify-center gap-2.5">
                    {row.map((book) => (
                      <div
                        key={book.title}
                        onClick={() => openBook(book.title)}
                        className="group relative w-12 md:w-[3.4rem] h-20 md:h-24 rounded-sm overflow-hidden shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                      >
                        <img src={book.cover} alt={book.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-gradient-to-r from-[#5A3E22] via-[#2A1B0E] to-[#5A3E22] shadow-inner" />
                </div>
              ))}
              <div className="mt-4 text-center text-[10px] tracking-[0.15em] uppercase text-[#D4A017]/60 font-body">
                📚 Your Digital Bookshelf
              </div>
            </div>
          </div>
        </section>

        {/* STARTING STRIP */}
        <section className={`transition-all duration-1000 delay-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] w-full px-6 md:px-10 py-6 md:py-7">
            <div className="flex items-center justify-center pb-4 md:pb-0 md:pr-6 border-b md:border-b-0 border-dashed border-[#D9C7A3]">
              <p className="text-center text-base md:text-lg font-quote italic text-[#1E2A42] leading-snug">
                Every shelf tells a story before you've turned a page.
              </p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-5 bottom-5 -translate-x-1/2 border-l border-dashed border-[#D9C7A3]" />
            <div className="flex items-center justify-center pt-4 md:pt-0 md:pl-6">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={17} className="text-[#D8472F]" />
                    <div className="text-left leading-tight">
                      <p className="text-base font-display font-semibold text-[#1E2A42]">{value}</p>
                      <p className="text-[11px] text-[#8A7F6B]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING / RECENTLY ADDED / FOR YOU */}
        <div className="space-y-24">
          <section className={`transition-all duration-1000 delay-300 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={Sparkles}>What everyone's reading</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">Trending Now</h2>
              <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-1">View all</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
              {trending.map((b) => <BookCard key={b.title} b={b} onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-400 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={Library}>Fresh on the shelf</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">Recently Added</h2>
              <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-1">View all</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
              {recentlyAdded.map((b) => <BookCard key={b.title} b={b} onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={BookOpen}>Tuned to your shelf</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">For You</h2>
              <span className="font-body text-[11px] text-[#8A7F6B]">AI picks, tuned to your shelf</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
              {forYou.map((b) => <BookCard key={b.title} b={b} size="small" onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>
        </div>

        {/* READING PROGRESS + DAILY GOAL + DAILY STREAK */}
        <section className={`transition-all duration-1000 delay-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 flex items-center gap-5 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="relative h-16 w-16 shrink-0">
                <svg className="h-16 w-16 -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="url(#grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - 0.68)} className="transition-all duration-1000 ease-out" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#E88A6E" />
                      <stop offset="100%" stopColor="#D8472F" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-display text-xs font-semibold text-[#1E2A42]">68%</span>
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-[#1E2A42]">Atomic Habits</p>
                <p className="font-body text-xs text-[#8A7F6B]">James Clear</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                  <Flame size={17} className="text-[#D8472F]" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#1E2A42] leading-tight">12 Day Streak</p>
                  <p className="font-body text-xs text-[#8A7F6B]">Read today to keep it alive</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-1.5">
                {streakDays.map((active, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-semibold transition-colors ${active ? "bg-[#D8472F] text-[#FFFBF3] shadow-sm" : "bg-[#EDE2CE] text-[#8A7F6B] border border-[#D9C7A3]"}`}>
                      {active && <Flame size={11} />}
                    </div>
                    <span className="text-[9px] text-[#8A7F6B]">{streakDayLabels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
                  <Target size={17} className="text-[#A9812F]" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-[#1E2A42] leading-tight">Daily Goal</p>
                  <p className="font-body text-xs text-[#8A7F6B]">18 of 30 pages today</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#EDE2CE] overflow-hidden">
                <div className="h-full rounded-full bg-[#A9812F] transition-all duration-1000 ease-out" style={{ width: "60%" }} />
              </div>
              <p className="mt-2.5 font-body text-[10px] text-[#8A7F6B]">12 pages to go — you've got this.</p>
            </div>
          </div>
        </section>
      </main>
      <ChatPanel />
    </div>
  );
}








// import React, { useEffect, useState } from "react";
// import { Sparkles, BookOpen, Users, Feather, Flame, Target, Library } from "lucide-react";
// import ChatPanel from "../ChatPanel";
// import { searchBooks, getTrendingBooks } from '../lib/googleBooks.js';

// const bookQuotes = [
//   { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
//   { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
//   { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
//   { text: "Books are a uniquely portable magic.", author: "Stephen King" },
//   { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
//   { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
// ];

// const trending = [
//   { rank: 1, title: "The Night Circus", author: "Erin Morgenstern", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
//   { rank: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
//   { rank: 3, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
//   { rank: 4, title: "It Ends With Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
//   { rank: 5, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
// ];

// const forYou = [
//   { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
//   { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
//   { title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
// ];

// const recentlyAdded = [
//   { rank: null, title: "Lessons in Chemistry", author: "Bonnie Garmus", cover: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg" },
//   { rank: null, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg" },
//   { rank: null, title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
// ];

// // Shelf books — 2 rows of 2, narrow spines instead of a big corkboard.
// const shelfRowA = [
//   { title: "The Psychology of Money", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10" },
//   { title: "The Design of Everyday Things", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymGoQp0oPqVTNGiT0oy90Bhizxih9ApTM_SbOaKir4za_7W3Esmici__1&s=10" },
// ];
// const shelfRowB = [
//   { title: "Deep Work", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYoNbwM6uYYhX5mzJvJNf3zcVh5n1uN8ou0VUFGbFi-A&s" },
//   { title: "Thinking, Fast and Slow", cover: "https://m.media-amazon.com/images/I/41iJ8QmVs2L._SY445_SX342_FMwebp_.jpg" },
// ];

// const stats = [
//   { icon: BookOpen, value: "10K+", label: "Books Available" },
//   { icon: Sparkles, value: "AI", label: "Powered" },
//   { icon: Users, value: "50K+", label: "Happy Readers" },
// ];

// const streakDays = [true, true, false, true, true, true, true];
// const streakDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// function SectionEyebrow({ icon: Icon, children }) {
//   return (
//     <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-[#8A7F6B] mb-1.5">
//       <Icon size={11} className="text-[#D8472F]" />
//       {children}
//     </div>
//   );
// }

// function RankStamp({ rank }) {
//   if (!rank) return null;
//   return (
//     <div
//       className="absolute -top-2.5 -left-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-[#D8472F] bg-[#F6EFE3] font-display text-xs font-bold text-[#D8472F] shadow-[0_2px_6px_rgba(30,42,66,0.15)]"
//       style={{ transform: "rotate(-9deg)", mixBlendMode: "multiply" }}
//     >
//       №{rank}
//     </div>
//   );
// }

// function BookCard({ b, size = "normal" }) {
//   const w = size === "small" ? "max-w-[100px]" : "max-w-[124px]";
//   return (
//     <div className={`group text-center ${w} mx-auto`}>
//       <div className="relative">
//         <RankStamp rank={b.rank} />
//         <div className="aspect-[2/3] rounded-sm bg-[#FFFBF3] border border-[#E2D5BC] overflow-hidden shadow-[0_10px_22px_-10px_rgba(30,42,66,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_28px_-10px_rgba(216,71,47,0.28)]">
//           <img src={b.cover} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
//         </div>
//       </div>
//       <p className="mt-3 font-body text-xs font-medium text-[#1E2A42] line-clamp-1">{b.title}</p>
//       <p className="mt-0.5 font-body text-[11px] text-[#8A7F6B]">{b.author}</p>
//     </div>
//   );
// }

// export default function HomePage() {
//   const [mounted, setMounted] = useState(false);
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [quoteVisible, setQuoteVisible] = useState(true);
//   const [apiBooks, setApiBooks] = useState([]);
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);

//   useEffect(() => {
//     setMounted(true);
//     const id = setInterval(() => {
//       setQuoteVisible(false);
//       setTimeout(() => {
//         setQuoteIndex((i) => (i + 1) % bookQuotes.length);
//         setQuoteVisible(true);
//       }, 400);
//     }, 5000);
//     return () => clearInterval(id);
//   }, []);

//   useEffect(() => {
//     const testGoogleBooks = async () => {
//       setApiLoading(true);
//       setApiError(null);
//       try {
//         const result = await searchBooks('Harry Potter', 5);
//         if (result.items && result.items.length > 0) {
//           setApiBooks(result.items.slice(0, 4));
//         } else {
//           setApiError('No books found. Try a different search.');
//         }
//       } catch (error) {
//         setApiError('Failed to fetch books. Check console for details.');
//       } finally {
//         setApiLoading(false);
//       }
//     };
//     testGoogleBooks();
//   }, []);

//   const activeQuote = bookQuotes[quoteIndex];

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] overflow-x-hidden relative">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-quote { font-family: 'Newsreader', serif; }
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }
//         .paper-grain {
//           background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
//           background-size: 4px 4px;
//         }
//         @keyframes shelf-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.9; } }
//         .shelf-flicker { animation: shelf-flicker 4s ease-in-out infinite; }
//       `}</style>

//       <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

//       <main className="font-body relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-28">
//         {/* HERO */}
//         <section
//           className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div>
//             <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E2D5BC] bg-[#FFFBF3] px-3 py-1 text-[10px] tracking-wide text-[#5B6478] mb-6 whitespace-nowrap">
//               <Feather size={11} className="text-[#D8472F]" />
//               A new line, every visit
//             </div>

//             <div className="min-h-[7.5rem] md:min-h-[8.5rem] mb-6 relative">
//               <span
//                 className="absolute -top-6 -left-1 font-quote text-6xl text-[#D8472F]/15 select-none pointer-events-none"
//                 aria-hidden="true"
//               >
//                 &ldquo;
//               </span>
//               <p
//                 className={`font-quote italic text-3xl md:text-4xl leading-[1.15] text-[#1E2A42] relative transition-all duration-500 ${
//                   quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
//                 }`}
//               >
//                 {activeQuote.text}
//               </p>
//               <p
//                 className={`font-body mt-3 text-xs tracking-[0.15em] uppercase text-[#8A7F6B] transition-all duration-500 delay-100 ${
//                   quoteVisible ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <span className="inline-block w-5 h-px bg-[#D8472F] align-middle mr-2.5" />
//                 {activeQuote.author}
//               </p>
//             </div>

//             <div className="text-xs">
//               {apiLoading && <span className="text-[#8A7F6B]">⏳ Loading books...</span>}
//               {apiError && <span className="text-[#D8472F]">⚠️ {apiError}</span>}
//               {!apiLoading && !apiError && apiBooks.length > 0 && (
//                 <span className="text-emerald-600">✅ Google Books API connected!</span>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: small wooden shelf, narrow spines */}
//           <div
//             className={`relative transition-all duration-1000 delay-200 ease-out ${
//               mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
//             }`}
//           >
//             <div
//               className="relative rounded-2xl border border-[#3A2A18] p-5 md:p-6 max-w-[300px] mx-auto shelf-flicker"
//               style={{
//                 background: "linear-gradient(180deg, #4A3423 0%, #2E2013 60%, #1E150C 100%)",
//                 boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(30,42,66,0.45)",
//               }}
//             >
//               {[shelfRowA, shelfRowB].map((row, ri) => (
//                 <div key={ri} className={ri > 0 ? "mt-4" : ""}>
//                   <div className="flex justify-center gap-3">
//                     {row.map((book) => (
//                       <div
//                         key={book.title}
//                         className="group relative w-14 md:w-16 h-20 md:h-24 rounded-sm overflow-hidden shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5"
//                       >
//                         <img src={book.cover} alt={book.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-2.5 h-2 rounded-full bg-gradient-to-r from-[#5A3E22] via-[#2A1B0E] to-[#5A3E22] shadow-inner" />
//                 </div>
//               ))}
//             </div>
//             <p className="mt-2.5 text-center font-body text-[10px] tracking-[0.15em] uppercase text-[#8A7F6B]">
//               Pinned from your shelf
//             </p>
//           </div>
//         </section>

//         {/* STARTING STRIP */}
//         <section
//           className={`transition-all duration-1000 delay-200 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div className="relative grid grid-cols-1 md:grid-cols-2 items-center rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] w-full px-6 md:px-10 py-6 md:py-7">
//             <div className="flex items-center justify-center pb-4 md:pb-0 md:pr-6 border-b md:border-b-0 border-dashed border-[#D9C7A3]">
//               <p className="text-center text-base md:text-lg font-quote italic text-[#1E2A42] leading-snug">
//                 Every shelf tells a story before you've turned a page.
//               </p>
//             </div>
//             <div className="hidden md:block absolute left-1/2 top-5 bottom-5 -translate-x-1/2 border-l border-dashed border-[#D9C7A3]" />
//             <div className="flex items-center justify-center pt-4 md:pt-0 md:pl-6">
//               <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
//                 {stats.map(({ icon: Icon, value, label }) => (
//                   <div key={label} className="flex items-center gap-2">
//                     <Icon size={17} className="text-[#D8472F]" />
//                     <div className="text-left leading-tight">
//                       <p className="text-base font-display font-semibold text-[#1E2A42]">{value}</p>
//                       <p className="text-[11px] text-[#8A7F6B]">{label}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* TRENDING / RECENTLY ADDED / FOR YOU */}
//         <div className="space-y-24">
//           <section
//             className={`transition-all duration-1000 delay-300 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={Sparkles}>What everyone's reading</SectionEyebrow>
//             <div className="flex items-end justify-between mb-6">
//               <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-[#1E2A42]">Trending Now</h2>
//               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-1">View all</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
//               {trending.map((b) => (
//                 <BookCard key={b.title} b={b} />
//               ))}
//             </div>
//           </section>

//           <section
//             className={`transition-all duration-1000 delay-400 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={Library}>Fresh on the shelf</SectionEyebrow>
//             <div className="flex items-end justify-between mb-6">
//               <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-[#1E2A42]">Recently Added</h2>
//               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-1">View all</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
//               {recentlyAdded.map((b) => (
//                 <BookCard key={b.title} b={b} />
//               ))}
//             </div>
//           </section>

//           <section
//             className={`transition-all duration-1000 delay-500 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={BookOpen}>Tuned to your shelf</SectionEyebrow>
//             <div className="flex items-end justify-between mb-6">
//               <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-[#1E2A42]">For You</h2>
//               <span className="font-body text-[11px] text-[#8A7F6B]">AI picks, tuned to your shelf</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-6 gap-y-10">
//               {forYou.map((b) => (
//                 <BookCard key={b.title} b={b} size="small" />
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* READING PROGRESS + DAILY GOAL + DAILY STREAK */}
//         <section
//           className={`transition-all duration-1000 delay-700 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 flex items-center gap-5 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="relative h-16 w-16 shrink-0">
//                 <svg className="h-16 w-16 -rotate-90" viewBox="0 0 80 80">
//                   <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
//                   <circle
//                     cx="40" cy="40" r="34" fill="none" stroke="url(#grad)" strokeWidth="8" strokeLinecap="round"
//                     strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - 0.68)}
//                     className="transition-all duration-1000 ease-out"
//                   />
//                   <defs>
//                     <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//                       <stop offset="0%" stopColor="#E88A6E" />
//                       <stop offset="100%" stopColor="#D8472F" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <span className="absolute inset-0 flex items-center justify-center font-display text-xs font-semibold text-[#1E2A42]">68%</span>
//               </div>
//               <div className="flex-1">
//                 <p className="font-body text-sm font-semibold text-[#1E2A42]">Atomic Habits</p>
//                 <p className="font-body text-xs text-[#8A7F6B]">James Clear</p>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
//                   <Flame size={17} className="text-[#D8472F]" />
//                 </div>
//                 <div>
//                   <p className="font-body text-sm font-semibold text-[#1E2A42] leading-tight">12 Day Streak</p>
//                   <p className="font-body text-xs text-[#8A7F6B]">Read today to keep it alive</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between gap-1.5">
//                 {streakDays.map((active, i) => (
//                   <div key={i} className="flex flex-col items-center gap-1">
//                     <div
//                       className={`h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-semibold transition-colors ${
//                         active ? "bg-[#D8472F] text-[#FFFBF3] shadow-sm" : "bg-[#EDE2CE] text-[#8A7F6B] border border-[#D9C7A3]"
//                       }`}
//                     >
//                       {active && <Flame size={11} />}
//                     </div>
//                     <span className="text-[9px] text-[#8A7F6B]">{streakDayLabels[i]}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] p-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
//                   <Target size={17} className="text-[#A9812F]" />
//                 </div>
//                 <div>
//                   <p className="font-body text-sm font-semibold text-[#1E2A42] leading-tight">Daily Goal</p>
//                   <p className="font-body text-xs text-[#8A7F6B]">18 of 30 pages today</p>
//                 </div>
//               </div>
//               <div className="h-2 rounded-full bg-[#EDE2CE] overflow-hidden">
//                 <div className="h-full rounded-full bg-[#A9812F] transition-all duration-1000 ease-out" style={{ width: "60%" }} />
//               </div>
//               <p className="mt-2.5 font-body text-[10px] text-[#8A7F6B]">12 pages to go — you've got this.</p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <ChatPanel />
//     </div>
//   );
// }












// import React, { useEffect, useState } from "react";
// import { Sparkles, BookOpen, Users, Feather, Flame, Target, Library } from "lucide-react";
// import ChatPanel from "../ChatPanel";
// import { searchBooks, getTrendingBooks } from '../lib/googleBooks.js';

// // import { searchBooks, getTrendingBooks } from '../../../api/googleBooks.browser.js';
// const bookQuotes = [
//   { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
//   { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
//   { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
//   { text: "Books are a uniquely portable magic.", author: "Stephen King" },
//   { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
//   { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
// ];

// const trending = [
//   { rank: 1, title: "The Night Circus", author: "Erin Morgenstern", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
//   { rank: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
//   { rank: 3, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
//   { rank: 4, title: "It Ends With Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
//   { rank: 5, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
// ];

// const forYou = [
//   { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
//   { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
//   { title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
// ];

// const recentlyAdded = [
//   { rank: null, title: "Lessons in Chemistry", author: "Bonnie Garmus", cover: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg" },
//   { rank: null, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg" },
//   { rank: null, title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
// ];

// const corkboardBooks = [
//   { title: "The Psychology of Money", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10", tilt: -6, tape: "coral" },
//   { title: "The Design of Everyday Things", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymGoQp0oPqVTNGiT0oy90Bhizxih9ApTM_SbOaKir4za_7W3Esmici__1&s=10", tilt: 4, tape: "brass" },
//   { title: "Deep Work", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYoNbwM6uYYhX5mzJvJNf3zcVh5n1uN8ou0VUFGbFi-A&s", tilt: 5, tape: "coral" },
//   { title: "Thinking, Fast and Slow", cover: "https://m.media-amazon.com/images/I/41iJ8QmVs2L._SY445_SX342_FMwebp_.jpg", tilt: -4, tape: "brass" },
// ];

// const stats = [
//   { icon: BookOpen, value: "10K+", label: "Books Available" },
//   { icon: Sparkles, value: "AI", label: "Powered" },
//   { icon: Users, value: "50K+", label: "Happy Readers" },
// ];

// const streakDays = [true, true, false, true, true, true, true];
// const streakDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// function SectionEyebrow({ icon: Icon, children }) {
//   return (
//     <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#8A7F6B] mb-3">
//       <Icon size={13} className="text-[#D8472F]" />
//       {children}
//     </div>
//   );
// }

// function RankStamp({ rank }) {
//   if (!rank) return null;
//   return (
//     <div
//       className="absolute -top-3 -left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-[#D8472F] bg-[#F6EFE3] font-display text-sm font-bold text-[#D8472F] shadow-[0_2px_6px_rgba(30,42,66,0.15)]"
//       style={{ transform: "rotate(-9deg)", mixBlendMode: "multiply" }}
//     >
//       №{rank}
//     </div>
//   );
// }

// function BookCard({ b, size = "normal" }) {
//   const w = size === "small" ? "max-w-[116px]" : "max-w-[144px]";
//   return (
//     <div className={`group text-center ${w} mx-auto`}>
//       <div className="relative">
//         <RankStamp rank={b.rank} />
//         <div className="aspect-[2/3] rounded-sm bg-[#FFFBF3] border border-[#E2D5BC] overflow-hidden shadow-[0_10px_22px_-10px_rgba(30,42,66,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_28px_-10px_rgba(216,71,47,0.28)]">
//           <img src={b.cover} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
//         </div>
//       </div>
//       <p className="mt-6 font-body text-sm font-medium text-[#1E2A42] line-clamp-1">{b.title}</p>
//       <p className="mt-1.5 font-body text-xs text-[#8A7F6B]">{b.author}</p>
//     </div>
//   );
// }

// function WashiTape({ color, className = "" }) {
//   const bg =
//     color === "coral"
//       ? "repeating-linear-gradient(135deg, rgba(216,71,47,0.85) 0 6px, rgba(216,71,47,0.65) 6px 12px)"
//       : "repeating-linear-gradient(135deg, rgba(169,129,47,0.85) 0 6px, rgba(169,129,47,0.65) 6px 12px)";
//   return (
//     <div
//       className={`absolute h-6 w-14 opacity-90 shadow-sm ${className}`}
//       style={{ background: bg }}
//     />
//   );
// }

// export default function HomePage() {
//   const [mounted, setMounted] = useState(false);
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [quoteVisible, setQuoteVisible] = useState(true);
//   const [apiBooks, setApiBooks] = useState([]);
//   const [apiLoading, setApiLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);

//   useEffect(() => {
//     setMounted(true);
//     const id = setInterval(() => {
//       setQuoteVisible(false);
//       setTimeout(() => {
//         setQuoteIndex((i) => (i + 1) % bookQuotes.length);
//         setQuoteVisible(true);
//       }, 450);
//     }, 7200);
//     return () => clearInterval(id);
//   }, []);

//   // 🧪 TEST GOOGLE BOOKS API
//   useEffect(() => {
//     const testGoogleBooks = async () => {
//       setApiLoading(true);
//       setApiError(null);
//       try {
//         console.log('🔍 Testing Google Books API...');
//         const result = await searchBooks('Harry Potter', 5);
//         if (result.items && result.items.length > 0) {
//           console.log('✅ API Working! Found', result.totalItems, 'books');
//           setApiBooks(result.items.slice(0, 4));
//         } else {
//           console.log('❌ API returned no results');
//           setApiError('No books found. Try a different search.');
//         }
//       } catch (error) {
//         console.error('❌ API Error:', error);
//         setApiError('Failed to fetch books. Check console for details.');
//       } finally {
//         setApiLoading(false);
//       }
//     };

//     testGoogleBooks();
//   }, []);

//   const activeQuote = bookQuotes[quoteIndex];

//   return (
//     <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] overflow-x-hidden relative">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
//         .font-quote { font-family: 'Newsreader', serif; }
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-body { font-family: 'Work Sans', sans-serif; }
//         .paper-grain {
//           background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
//           background-size: 4px 4px;
//         }
//       `}</style>

//       <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

//       <main className="font-body relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-40">
//         {/* HERO */}
//         <section
//           className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full border border-[#E2D5BC] bg-[#FFFBF3] px-4 py-1.5 text-xs tracking-wide text-[#5B6478] mb-9">
//               <Feather size={13} className="text-[#D8472F]" />
//               A new line, every visit
//             </div>

//             <div className="min-h-[9.5rem] md:min-h-[11rem] mb-9 relative">
//               <span
//                 className="absolute -top-8 -left-2 font-quote text-8xl text-[#D8472F]/15 select-none pointer-events-none"
//                 aria-hidden="true"
//               >
//                 &ldquo;
//               </span>
//               <p
//                 className={`font-quote italic text-4xl md:text-5xl leading-[1.15] text-[#1E2A42] relative transition-all duration-500 ${
//                   quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
//                 }`}
//               >
//                 {activeQuote.text}
//               </p>
//               <p
//                 className={`font-body mt-4 text-sm tracking-[0.15em] uppercase text-[#8A7F6B] transition-all duration-500 delay-100 ${
//                   quoteVisible ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <span className="inline-block w-6 h-px bg-[#D8472F] align-middle mr-3" />
//                 {activeQuote.author}
//               </p>
//             </div>

//             {/* API Status Indicator */}
//             <div className="mt-4 text-xs">
//               {apiLoading && <span className="text-[#8A7F6B]">⏳ Loading books from Google API...</span>}
//               {apiError && <span className="text-[#D8472F]">⚠️ {apiError}</span>}
//               {!apiLoading && !apiError && apiBooks.length > 0 && (
//                 <span className="text-emerald-600">✅ Google Books API connected!</span>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: corkboard reading nook */}
//           <div
//             className={`relative transition-all duration-1000 delay-200 ease-out ${
//               mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
//             }`}
//           >
//             <div
//               className="relative rounded-[1.5rem] border border-[#D9C7A3] p-10 md:p-12"
//               style={{
//                 background:
//                   "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 60%), #C9AE7E",
//                 boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px -20px rgba(30,42,66,0.35)",
//               }}
//             >
//               <div className="grid grid-cols-2 gap-8 md:gap-10">
//                 {corkboardBooks.map((book) => (
//                   <div
//                     key={book.title}
//                     className="group relative"
//                     style={{ transform: `rotate(${book.tilt}deg)` }}
//                   >
//                     <WashiTape
//                       color={book.tape}
//                       className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg] z-10"
//                     />
//                     <div className="relative h-32 md:h-36 rounded-sm overflow-hidden bg-[#FFFBF3] border-[6px] border-[#FFFBF3] shadow-[0_14px_24px_-10px_rgba(30,42,66,0.45)] transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-1">
//                       <img src={book.cover} alt={book.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
//                     </div>
//                     <p className="mt-2 text-center font-body text-[11px] text-[#1E2A42]/80 leading-tight px-1">{book.title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <p className="mt-4 text-center font-body text-[11px] tracking-[0.15em] uppercase text-[#8A7F6B]">
//               Pinned from your shelf
//             </p>
//           </div>
//         </section>

//         {/* STARTING STRIP */}
//         <section
//           className={`transition-all duration-1000 delay-200 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div className="relative grid grid-cols-1 md:grid-cols-2 items-center rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] w-full px-8 md:px-12 py-8 md:py-10">
//             <div className="flex items-center justify-center pb-6 md:pb-0 md:pr-8 border-b md:border-b-0 border-dashed border-[#D9C7A3]">
//               <p className="text-center text-lg md:text-2xl font-quote italic text-[#1E2A42] leading-snug">
//                 Every shelf tells a story before you've turned a page.
//               </p>
//             </div>
//             <div className="hidden md:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 border-l border-dashed border-[#D9C7A3]" />
//             <div className="flex items-center justify-center pt-6 md:pt-0 md:pl-8">
//               <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
//                 {stats.map(({ icon: Icon, value, label }) => (
//                   <div key={label} className="flex items-center gap-2.5">
//                     <Icon size={20} className="text-[#D8472F]" />
//                     <div className="text-left leading-tight">
//                       <p className="text-xl font-display font-semibold text-[#1E2A42]">{value}</p>
//                       <p className="text-xs text-[#8A7F6B]">{label}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* TRENDING / RECENTLY ADDED / FOR YOU */}
//         <div className="space-y-48">
//           <section
//             className={`transition-all duration-1000 delay-300 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={Sparkles}>What everyone's reading</SectionEyebrow>
//             <div className="flex items-end justify-between mb-12">
//               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">Trending Now</h2>
//               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-2">View all</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-16">
//               {trending.map((b) => (
//                 <BookCard key={b.title} b={b} />
//               ))}
//             </div>
//           </section>

//           <section
//             className={`transition-all duration-1000 delay-400 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={Library}>Fresh on the shelf</SectionEyebrow>
//             <div className="flex items-end justify-between mb-12">
//               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">Recently Added</h2>
//               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-2">View all</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-14">
//               {recentlyAdded.map((b) => (
//                 <BookCard key={b.title} b={b} />
//               ))}
//             </div>
//           </section>

//           <section
//             className={`transition-all duration-1000 delay-500 ease-out ${
//               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//             }`}
//           >
//             <SectionEyebrow icon={BookOpen}>Tuned to your shelf</SectionEyebrow>
//             <div className="flex items-end justify-between mb-12">
//               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">For You</h2>
//               <span className="font-body text-xs text-[#8A7F6B]">AI picks, tuned to your shelf</span>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-14">
//               {forYou.map((b) => (
//                 <BookCard key={b.title} b={b} size="small" />
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* READING PROGRESS + DAILY GOAL + DAILY STREAK */}
//         <section
//           className={`transition-all duration-1000 delay-700 ease-out ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
//           }`}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Continue reading */}
//             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 flex items-center gap-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="relative h-20 w-20 shrink-0">
//                 <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
//                   <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
//                   <circle
//                     cx="40"
//                     cy="40"
//                     r="34"
//                     fill="none"
//                     stroke="url(#grad)"
//                     strokeWidth="8"
//                     strokeLinecap="round"
//                     strokeDasharray={2 * Math.PI * 34}
//                     strokeDashoffset={2 * Math.PI * 34 * (1 - 0.68)}
//                     className="transition-all duration-1000 ease-out"
//                   />
//                   <defs>
//                     <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//                       <stop offset="0%" stopColor="#E88A6E" />
//                       <stop offset="100%" stopColor="#D8472F" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//                 <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-[#1E2A42]">68%</span>
//               </div>
//               <div className="flex-1">
//                 <p className="font-body font-semibold text-[#1E2A42]">Atomic Habits</p>
//                 <p className="font-body text-xs text-[#8A7F6B]">James Clear</p>
//               </div>
//             </div>

//             {/* Daily streak */}
//             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
//                   <Flame size={20} className="text-[#D8472F]" />
//                 </div>
//                 <div>
//                   <p className="font-body font-semibold text-[#1E2A42] leading-tight">12 Day Streak</p>
//                   <p className="font-body text-xs text-[#8A7F6B]">Read today to keep it alive</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between gap-1.5">
//                 {streakDays.map((active, i) => (
//                   <div key={i} className="flex flex-col items-center gap-1.5">
//                     <div
//                       className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
//                         active
//                           ? "bg-[#D8472F] text-[#FFFBF3] shadow-sm"
//                           : "bg-[#EDE2CE] text-[#8A7F6B] border border-[#D9C7A3]"
//                       }`}
//                     >
//                       {active && <Flame size={12} />}
//                     </div>
//                     <span className="text-[10px] text-[#8A7F6B]">{streakDayLabels[i]}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Daily goal */}
//             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
//                   <Target size={20} className="text-[#A9812F]" />
//                 </div>
//                 <div>
//                   <p className="font-body font-semibold text-[#1E2A42] leading-tight">Daily Goal</p>
//                   <p className="font-body text-xs text-[#8A7F6B]">18 of 30 pages today</p>
//                 </div>
//               </div>
//               <div className="h-2.5 rounded-full bg-[#EDE2CE] overflow-hidden">
//                 <div
//                   className="h-full rounded-full bg-[#A9812F] transition-all duration-1000 ease-out"
//                   style={{ width: "60%" }}
//                 />
//               </div>
//               <p className="mt-3 font-body text-[11px] text-[#8A7F6B]">12 pages to go — you've got this.</p>
//             </div>
//           </div>
//         </section>
//       </main>
//       <ChatPanel />
//     </div>
//   );
// }









// // import ChatPanel from "../ChatPanel";
// // import React, { useEffect, useState } from "react";
// // import { Sparkles, BookOpen, Users, Feather, Flame, Target, Library } from "lucide-react";
// // const bookQuotes = [
// //   { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
// //   { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
// //   { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
// //   { text: "Books are a uniquely portable magic.", author: "Stephen King" },
// //   { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
// //   { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
// // ];

// // const trending = [
// //   { rank: 1, title: "The Night Circus", author: "Erin Morgenstern", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
// //   { rank: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
// //   { rank: 3, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
// //   { rank: 4, title: "It Ends With Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
// //   { rank: 5, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
// // ];

// // const forYou = [
// //   { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
// //   { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
// //   { title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
// // ];

// // const recentlyAdded = [
// //   { rank: null, title: "Lessons in Chemistry", author: "Bonnie Garmus", cover: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg" },
// //   { rank: null, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg" },
// //   { rank: null, title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
// // ];

// // // Corkboard books — tilt + washi-tape color alternate per pin.
// // const corkboardBooks = [
// //   { title: "The Psychology of Money", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10", tilt: -6, tape: "coral" },
// //   { title: "The Design of Everyday Things", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymGoQp0oPqVTNGiT0oy90Bhizxih9ApTM_SbOaKir4za_7W3Esmici__1&s=10", tilt: 4, tape: "brass" },
// //   { title: "Deep Work", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYoNbwM6uYYhX5mzJvJNf3zcVh5n1uN8ou0VUFGbFi-A&s", tilt: 5, tape: "coral" },
// //   { title: "Thinking, Fast and Slow", cover: "https://m.media-amazon.com/images/I/41iJ8QmVs2L._SY445_SX342_FMwebp_.jpg", tilt: -4, tape: "brass" },
// // ];

// // const stats = [
// //   { icon: BookOpen, value: "10K+", label: "Books Available" },
// //   { icon: Sparkles, value: "AI", label: "Powered" },
// //   { icon: Users, value: "50K+", label: "Happy Readers" },
// // ];

// // // Last 7 days of reading activity for the streak widget — true means the
// // // user read something that day.
// // const streakDays = [true, true, false, true, true, true, true];
// // const streakDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// // function SectionEyebrow({ icon: Icon, children }) {
// //   return (
// //     <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#8A7F6B] mb-3">
// //       <Icon size={13} className="text-[#D8472F]" />
// //       {children}
// //     </div>
// //   );
// // }

// // function RankStamp({ rank }) {
// //   if (!rank) return null;
// //   return (
// //     <div
// //       className="absolute -top-3 -left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-[#D8472F] bg-[#F6EFE3] font-display text-sm font-bold text-[#D8472F] shadow-[0_2px_6px_rgba(30,42,66,0.15)]"
// //       style={{ transform: "rotate(-9deg)", mixBlendMode: "multiply" }}
// //     >
// //       №{rank}
// //     </div>
// //   );
// // }

// // function BookCard({ b, size = "normal" }) {
// //   const w = size === "small" ? "max-w-[116px]" : "max-w-[144px]";
// //   return (
// //     <div className={`group text-center ${w} mx-auto`}>
// //       <div className="relative">
// //         <RankStamp rank={b.rank} />
// //         <div className="aspect-[2/3] rounded-sm bg-[#FFFBF3] border border-[#E2D5BC] overflow-hidden shadow-[0_10px_22px_-10px_rgba(30,42,66,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_28px_-10px_rgba(216,71,47,0.28)]">
// //           <img src={b.cover} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
// //         </div>
// //       </div>
// //       <p className="mt-6 font-body text-sm font-medium text-[#1E2A42] line-clamp-1">{b.title}</p>
// //       <p className="mt-1.5 font-body text-xs text-[#8A7F6B]">{b.author}</p>
// //     </div>
// //   );
// // }

// // function WashiTape({ color, className = "" }) {
// //   const bg =
// //     color === "coral"
// //       ? "repeating-linear-gradient(135deg, rgba(216,71,47,0.85) 0 6px, rgba(216,71,47,0.65) 6px 12px)"
// //       : "repeating-linear-gradient(135deg, rgba(169,129,47,0.85) 0 6px, rgba(169,129,47,0.65) 6px 12px)";
// //   return (
// //     <div
// //       className={`absolute h-6 w-14 opacity-90 shadow-sm ${className}`}
// //       style={{ background: bg }}
// //     />
// //   );
// // }

// // export default function HomePage() {
// //   const [mounted, setMounted] = useState(false);
// //   const [quoteIndex, setQuoteIndex] = useState(0);
// //   const [quoteVisible, setQuoteVisible] = useState(true);

// //   useEffect(() => {
// //     setMounted(true);
// //     const id = setInterval(() => {
// //       setQuoteVisible(false);
// //       setTimeout(() => {
// //         setQuoteIndex((i) => (i + 1) % bookQuotes.length);
// //         setQuoteVisible(true);
// //       }, 450);
// //     }, 7200);
// //     return () => clearInterval(id);
// //   }, []);

// //   const activeQuote = bookQuotes[quoteIndex];

// //   return (
// //     <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] overflow-x-hidden relative">
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
// //         .font-quote { font-family: 'Newsreader', serif; }
// //         .font-display { font-family: 'Fraunces', serif; }
// //         .font-body { font-family: 'Work Sans', sans-serif; }
// //         .paper-grain {
// //           background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
// //           background-size: 4px 4px;
// //         }
// //       `}</style>

// //       {/* faint paper grain instead of a colored glow */}
// //       <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

// //       <main className="font-body relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-40">
// //         {/* HERO */}
// //         <section
// //           className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${
// //             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //           }`}
// //         >
// //           <div>
// //             <div className="inline-flex items-center gap-2 rounded-full border border-[#E2D5BC] bg-[#FFFBF3] px-4 py-1.5 text-xs tracking-wide text-[#5B6478] mb-9">
// //               <Feather size={13} className="text-[#D8472F]" />
// //               A new line, every visit
// //             </div>

// //             <div className="min-h-[9.5rem] md:min-h-[11rem] mb-9 relative">
// //               <span
// //                 className="absolute -top-8 -left-2 font-quote text-8xl text-[#D8472F]/15 select-none pointer-events-none"
// //                 aria-hidden="true"
// //               >
// //                 &ldquo;
// //               </span>
// //               <p
// //                 className={`font-quote italic text-4xl md:text-5xl leading-[1.15] text-[#1E2A42] relative transition-all duration-500 ${
// //                   quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
// //                 }`}
// //               >
// //                 {activeQuote.text}
// //               </p>
// //               <p
// //                 className={`font-body mt-4 text-sm tracking-[0.15em] uppercase text-[#8A7F6B] transition-all duration-500 delay-100 ${
// //                   quoteVisible ? "opacity-100" : "opacity-0"
// //                 }`}
// //               >
// //                 <span className="inline-block w-6 h-px bg-[#D8472F] align-middle mr-3" />
// //                 {activeQuote.author}
// //               </p>
// //             </div>
// //           </div>

// //           {/* RIGHT: corkboard reading nook — tilted, washi-taped covers */}
// //           <div
// //             className={`relative transition-all duration-1000 delay-200 ease-out ${
// //               mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
// //             }`}
// //           >
// //             <div
// //               className="relative rounded-[1.5rem] border border-[#D9C7A3] p-10 md:p-12"
// //               style={{
// //                 background:
// //                   "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 60%), #C9AE7E",
// //                 boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05), 0 20px 40px -20px rgba(30,42,66,0.35)",
// //               }}
// //             >
// //               <div className="grid grid-cols-2 gap-8 md:gap-10">
// //                 {corkboardBooks.map((book) => (
// //                   <div
// //                     key={book.title}
// //                     className="group relative"
// //                     style={{ transform: `rotate(${book.tilt}deg)` }}
// //                   >
// //                     <WashiTape
// //                       color={book.tape}
// //                       className="-top-3 left-1/2 -translate-x-1/2 rotate-[-3deg] z-10"
// //                     />
// //                     <div className="relative h-32 md:h-36 rounded-sm overflow-hidden bg-[#FFFBF3] border-[6px] border-[#FFFBF3] shadow-[0_14px_24px_-10px_rgba(30,42,66,0.45)] transition-transform duration-300 group-hover:rotate-0 group-hover:-translate-y-1">
// //                       <img src={book.cover} alt={book.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
// //                     </div>
// //                     <p className="mt-2 text-center font-body text-[11px] text-[#1E2A42]/80 leading-tight px-1">{book.title}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //             <p className="mt-4 text-center font-body text-[11px] tracking-[0.15em] uppercase text-[#8A7F6B]">
// //               Pinned from your shelf
// //             </p>
// //           </div>
// //         </section>

// //         {/* STARTING STRIP */}
// //         <section
// //           className={`transition-all duration-1000 delay-200 ease-out ${
// //             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //           }`}
// //         >
// //           <div className="relative grid grid-cols-1 md:grid-cols-2 items-center rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] w-full px-8 md:px-12 py-8 md:py-10">
// //             <div className="flex items-center justify-center pb-6 md:pb-0 md:pr-8 border-b md:border-b-0 border-dashed border-[#D9C7A3]">
// //               <p className="text-center text-lg md:text-2xl font-quote italic text-[#1E2A42] leading-snug">
// //                 Every shelf tells a story before you've turned a page.
// //               </p>
// //             </div>
// //             {/* perforation dots standing in for a receipt tear between the two halves */}
// //             <div className="hidden md:block absolute left-1/2 top-6 bottom-6 -translate-x-1/2 border-l border-dashed border-[#D9C7A3]" />
// //             <div className="flex items-center justify-center pt-6 md:pt-0 md:pl-8">
// //               <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
// //                 {stats.map(({ icon: Icon, value, label }) => (
// //                   <div key={label} className="flex items-center gap-2.5">
// //                     <Icon size={20} className="text-[#D8472F]" />
// //                     <div className="text-left leading-tight">
// //                       <p className="text-xl font-display font-semibold text-[#1E2A42]">{value}</p>
// //                       <p className="text-xs text-[#8A7F6B]">{label}</p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* TRENDING / RECENTLY ADDED / FOR YOU */}
// //         <div className="space-y-48">
// //           <section
// //             className={`transition-all duration-1000 delay-300 ease-out ${
// //               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //             }`}
// //           >
// //             <SectionEyebrow icon={Sparkles}>What everyone's reading</SectionEyebrow>
// //             <div className="flex items-end justify-between mb-12">
// //               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">Trending Now</h2>
// //               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-2">View all</span>
// //             </div>
// //             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-16">
// //               {trending.map((b) => (
// //                 <BookCard key={b.title} b={b} />
// //               ))}
// //             </div>
// //           </section>

// //           <section
// //             className={`transition-all duration-1000 delay-400 ease-out ${
// //               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //             }`}
// //           >
// //             <SectionEyebrow icon={Library}>Fresh on the shelf</SectionEyebrow>
// //             <div className="flex items-end justify-between mb-12">
// //               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">Recently Added</h2>
// //               <span className="font-body text-xs text-[#D8472F] cursor-pointer hover:underline mb-2">View all</span>
// //             </div>
// //             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-14">
// //               {recentlyAdded.map((b) => (
// //                 <BookCard key={b.title} b={b} />
// //               ))}
// //             </div>
// //           </section>

// //           <section
// //             className={`transition-all duration-1000 delay-500 ease-out ${
// //               mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //             }`}
// //           >
// //             <SectionEyebrow icon={BookOpen}>Tuned to your shelf</SectionEyebrow>
// //             <div className="flex items-end justify-between mb-12">
// //               <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#1E2A42]">For You</h2>
// //               <span className="font-body text-xs text-[#8A7F6B]">AI picks, tuned to your shelf</span>
// //             </div>
// //             <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-10 gap-y-14">
// //               {forYou.map((b) => (
// //                 <BookCard key={b.title} b={b} size="small" />
// //               ))}
// //             </div>
// //           </section>
// //         </div>

// //         {/* READING PROGRESS + DAILY GOAL + DAILY STREAK */}
// //         <section
// //           className={`transition-all duration-1000 delay-700 ease-out ${
// //             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
// //           }`}
// //         >
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {/* Continue reading */}
// //             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 flex items-center gap-6 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
// //               <div className="relative h-20 w-20 shrink-0">
// //                 <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
// //                   <circle cx="40" cy="40" r="34" fill="none" stroke="#EDE2CE" strokeWidth="8" />
// //                   <circle
// //                     cx="40"
// //                     cy="40"
// //                     r="34"
// //                     fill="none"
// //                     stroke="url(#grad)"
// //                     strokeWidth="8"
// //                     strokeLinecap="round"
// //                     strokeDasharray={2 * Math.PI * 34}
// //                     strokeDashoffset={2 * Math.PI * 34 * (1 - 0.68)}
// //                     className="transition-all duration-1000 ease-out"
// //                   />
// //                   <defs>
// //                     <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
// //                       <stop offset="0%" stopColor="#E88A6E" />
// //                       <stop offset="100%" stopColor="#D8472F" />
// //                     </linearGradient>
// //                   </defs>
// //                 </svg>
// //                 <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-[#1E2A42]">68%</span>
// //               </div>
// //               <div className="flex-1">
// //                 <p className="font-body font-semibold text-[#1E2A42]">Atomic Habits</p>
// //                 <p className="font-body text-xs text-[#8A7F6B]">James Clear</p>
// //               </div>
// //             </div>

// //             {/* Daily streak */}
// //             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
// //               <div className="flex items-center gap-3 mb-4">
// //                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
// //                   <Flame size={20} className="text-[#D8472F]" />
// //                 </div>
// //                 <div>
// //                   <p className="font-body font-semibold text-[#1E2A42] leading-tight">12 Day Streak</p>
// //                   <p className="font-body text-xs text-[#8A7F6B]">Read today to keep it alive</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center justify-between gap-1.5">
// //                 {streakDays.map((active, i) => (
// //                   <div key={i} className="flex flex-col items-center gap-1.5">
// //                     <div
// //                       className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
// //                         active
// //                           ? "bg-[#D8472F] text-[#FFFBF3] shadow-sm"
// //                           : "bg-[#EDE2CE] text-[#8A7F6B] border border-[#D9C7A3]"
// //                       }`}
// //                     >
// //                       {active && <Flame size={12} />}
// //                     </div>
// //                     <span className="text-[10px] text-[#8A7F6B]">{streakDayLabels[i]}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Daily goal */}
// //             <div className="rounded-[1.5rem] border border-[#E2D5BC] bg-[#FFFBF3] p-7 shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
// //               <div className="flex items-center gap-3 mb-5">
// //                 <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">
// //                   <Target size={20} className="text-[#A9812F]" />
// //                 </div>
// //                 <div>
// //                   <p className="font-body font-semibold text-[#1E2A42] leading-tight">Daily Goal</p>
// //                   <p className="font-body text-xs text-[#8A7F6B]">18 of 30 pages today</p>
// //                 </div>
// //               </div>
// //               <div className="h-2.5 rounded-full bg-[#EDE2CE] overflow-hidden">
// //                 <div
// //                   className="h-full rounded-full bg-[#A9812F] transition-all duration-1000 ease-out"
// //                   style={{ width: "60%" }}
// //                 />
// //               </div>
// //               <p className="mt-3 font-body text-[11px] text-[#8A7F6B]">12 pages to go — you've got this.</p>
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //       <ChatPanel />
// //     </div>
// //   );
// // }