import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Lightbulb, Trophy, RotateCcw, Home, Sparkle } from 'lucide-react';

const books = [
  { title: "Atomic Habits", author: "James Clear", clue: "Small changes, big results" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", clue: "The green light at the end of the dock" },
  { title: "1984", author: "George Orwell", clue: "Big Brother is watching" },
  { title: "The Alchemist", author: "Paulo Coelho", clue: "A shepherd's journey to find treasure" },
  { title: "Pride and Prejudice", author: "Jane Austen", clue: "It is a truth universally acknowledged" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", clue: "An unexpected journey" },
];

const GuessPage = () => {
  const navigate = useNavigate();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [koinsEarned, setKoinsEarned] = useState(0);
  const [shuffledBooks, setShuffledBooks] = useState([]);

  useEffect(() => {
    setShuffledBooks([...books].sort(() => Math.random() - 0.5));
  }, []);

  const handleGuess = (title) => {
    if (title === shuffledBooks[currentRound].title) {
      setScore((s) => s + 1);
      setKoinsEarned((k) => k + 15);
    }
    setRevealed(true);
    setTimeout(() => {
      if (currentRound < shuffledBooks.length - 1) {
        setCurrentRound((r) => r + 1);
        setRevealed(false);
      } else {
        setShowResult(true);
      }
    }, 1400);
  };

  const resetGame = () => {
    setShuffledBooks([...books].sort(() => Math.random() - 0.5));
    setCurrentRound(0);
    setScore(0);
    setShowResult(false);
    setRevealed(false);
    setKoinsEarned(0);
  };

  if (shuffledBooks.length === 0) {
    return <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center text-[#1E2A42] font-display text-2xl">Loading…</div>;
  }

  const current = shuffledBooks[currentRound];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain { background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px); background-size: 4px 4px; }
        @keyframes round-in { 0% { opacity: 0; transform: translateX(14px); } 100% { opacity: 1; transform: translateX(0); } }
        .round-in { animation: round-in 0.4s ease forwards; }
        @keyframes float-y { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(-3deg); } }
        .float-y { animation: float-y 2.8s ease-in-out infinite; }
        @keyframes pulse-soft { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
        .pulse-soft { animation: pulse-soft 1.8s ease-in-out infinite; }
        @keyframes result-in { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        .result-in { animation: result-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .seal-btn { position: relative; overflow: hidden; }
        @keyframes shimmer-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .seal-btn::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent); transform: translateX(-120%) skewX(-15deg); }
        .seal-btn:hover::after { animation: shimmer-sweep 0.8s ease forwards; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header */}
        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
              <ArrowLeft size={14} /> Back
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B4C6D]/10 border border-[#8B4C6D]/30">
                <Target size={18} className="text-[#8B4C6D]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Guess The Book</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Can you guess the book from the clue?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game */}
        <div className="bg-[#FFFBF3] rounded-2xl p-8 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          {!showResult ? (
            <div key={currentRound} className="round-in">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#8A7F6B]">Round {currentRound + 1} of {shuffledBooks.length}</span>
                  <span className="text-sm text-[#A9812F] font-semibold">{koinsEarned} KOINS</span>
                </div>
                <span className="text-sm text-[#1E2A42] font-medium">Score: {score}</span>
              </div>

              <div className="w-full h-2 bg-[#EDE2CE] rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-[#8B4C6D] rounded-full transition-all duration-700" style={{ width: `${((currentRound + 1) / shuffledBooks.length) * 100}%` }} />
              </div>

              <div className="text-center mb-8">
                <Sparkle size={52} className="mx-auto text-[#8B4C6D] float-y" />
                <p className="flex items-center justify-center gap-1.5 text-base text-[#5B6478] mt-4 pulse-soft">
                  <Lightbulb size={15} className="text-[#A9812F]" /> {current.clue}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {shuffledBooks.map((book) => {
                  const isTarget = book.title === current.title;
                  let cls = 'bg-[#F6EFE3] text-[#1E2A42] hover:bg-[#EDE2CE] border-[#E2D5BC]';
                  if (revealed) cls = isTarget ? 'bg-[#6B8F55]/15 text-[#4C6A3D] border-[#6B8F55]' : 'bg-[#F6EFE3] text-[#8A7F6B] border-[#E2D5BC] opacity-50';
                  return (
                    <button
                      key={book.title}
                      onClick={() => handleGuess(book.title)}
                      disabled={revealed}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${cls}`}
                    >
                      {book.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="result-in text-center py-12">
              <Trophy size={56} className="mx-auto text-[#A9812F] float-y" />
              <h2 className="font-display text-3xl font-bold text-[#1E2A42] mt-4">Game Complete!</h2>
              <p className="text-[#8B4C6D] text-xl mt-2 font-semibold">You guessed {score}/{shuffledBooks.length} correctly</p>
              <p className="text-[#6B8F55] text-lg mt-1">Earned {koinsEarned} KOINS!</p>
              <div className="flex gap-4 justify-center mt-6">
                <button onClick={resetGame} className="seal-btn flex items-center gap-2 px-8 py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition">
                  <RotateCcw size={15} /> Play Again
                </button>
                <button onClick={() => navigate('/gamification')} className="flex items-center gap-2 px-8 py-3 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
                  <Home size={15} /> Back to Hub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuessPage;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const GuessPage = () => {
//   const navigate = useNavigate();
//   const [currentRound, setCurrentRound] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [revealed, setRevealed] = useState(false);
//   const [koinsEarned, setKoinsEarned] = useState(0);
//   const [shuffledBooks, setShuffledBooks] = useState([]);

//   const books = [
//     { title: "Atomic Habits", author: "James Clear", emoji: "⚛️", clue: "Small changes, big results" },
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", emoji: "🟢", clue: "The green light at the end of the dock" },
//     { title: "1984", author: "George Orwell", emoji: "👁️", clue: "Big Brother is watching" },
//     { title: "The Alchemist", author: "Paulo Coelho", emoji: "🏜️", clue: "A shepherd's journey to find treasure" },
//     { title: "Pride and Prejudice", author: "Jane Austen", emoji: "💐", clue: "It is a truth universally acknowledged" },
//     { title: "The Hobbit", author: "J.R.R. Tolkien", emoji: "🧙", clue: "An unexpected journey" },
//   ];

//   useEffect(() => {
//     const shuffled = [...books].sort(() => Math.random() - 0.5);
//     setShuffledBooks(shuffled);
//   }, []);

//   const handleGuess = (title) => {
//     if (title === shuffledBooks[currentRound].title) {
//       setScore(score + 1);
//       setKoinsEarned(koinsEarned + 15);
//       setRevealed(true);
//     } else {
//       setRevealed(true);
//     }

//     setTimeout(() => {
//       if (currentRound < shuffledBooks.length - 1) {
//         setCurrentRound(currentRound + 1);
//         setRevealed(false);
//       } else {
//         setShowResult(true);
//       }
//     }, 1500);
//   };

//   const resetGame = () => {
//     const shuffled = [...books].sort(() => Math.random() - 0.5);
//     setShuffledBooks(shuffled);
//     setCurrentRound(0);
//     setScore(0);
//     setShowResult(false);
//     setRevealed(false);
//     setKoinsEarned(0);
//   };

//   if (shuffledBooks.length === 0) {
//     return <div className="min-h-screen bg-[#1a0f0a] flex items-center justify-center text-[#D4A017] text-2xl">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/20 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button onClick={() => navigate(-1)} className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">← Back</button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🎯 Guess The Book</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Can you guess the book from the emoji and clue?</p>
//             </div>
//           </div>
//         </div>

//         {/* Game */}
//         <div className="bg-gradient-to-br from-[#2d1a0e]/80 to-[#1a0f0a]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#D4A017]/20 shadow-2xl">
//           {!showResult ? (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-[#D4A017]/50">Round {currentRound + 1} of {shuffledBooks.length}</span>
//                   <span className="text-sm text-[#D4A017] animate-pulse">⭐ {koinsEarned} KOINS</span>
//                 </div>
//                 <span className="text-sm text-[#f5ede4]">Score: {score}</span>
//               </div>

//               <div className="w-full h-2 bg-[#1a0f0a]/80 rounded-full mb-6 overflow-hidden">
//                 <div className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-700" style={{ width: `${((currentRound + 1) / shuffledBooks.length) * 100}%` }} />
//               </div>

//               <div className="text-center mb-8">
//                 <div className="text-7xl mb-4 animate-float">{shuffledBooks[currentRound].emoji}</div>
//                 <p className="text-lg text-[#D4A017]/50 animate-pulse">💡 {shuffledBooks[currentRound].clue}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {shuffledBooks.map((book) => (
//                   <button
//                     key={book.title}
//                     className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] ${
//                       revealed ? (book.title === shuffledBooks[currentRound].title ? 'bg-emerald-600/40 text-emerald-400 border-emerald-400' : 'bg-[#1a0f0a]/40 text-[#D4A017]/30') :
//                       'bg-[#1a0f0a]/80 text-[#f5ede4] hover:bg-[#D4A017]/20 hover:border-[#D4A017]/30'
//                     } border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition`}
//                     onClick={() => handleGuess(book.title)}
//                     disabled={revealed}
//                   >
//                     {book.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4 animate-bounce-slow">{score >= 5 ? '🏆' : score >= 3 ? '📚' : '📖'}</div>
//               <h2 className="text-3xl font-bold text-[#f5ede4]">Game Complete!</h2>
//               <p className="text-[#D4A017] text-xl mt-2">You guessed {score}/{shuffledBooks.length} correctly</p>
//               <p className="text-emerald-400 text-lg mt-1">Earned {koinsEarned} KOINS! ⭐</p>
//               <div className="flex gap-4 justify-center mt-6">
//                 <button onClick={resetGame} className="px-8 py-3 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-2xl hover:shadow-[#D4A017]/30 transition-all duration-300 transform hover:scale-105">Play Again</button>
//                 <button onClick={() => navigate('/gamification')} className="px-8 py-3 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 hover:bg-[#D4A017]/10 transition-all duration-300">🏠 Back to Hub</button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuessPage;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const GuessPage = () => {
//   const navigate = useNavigate();
//   const [currentRound, setCurrentRound] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [revealed, setRevealed] = useState(false);
//   const [koinsEarned, setKoinsEarned] = useState(0);

//   const books = [
//     { title: "Atomic Habits", author: "James Clear", emoji: "⚛️", clue: "Small changes, big results" },
//     { title: "The Great Gatsby", author: "F. Scott Fitzgerald", emoji: "🟢", clue: "The green light at the end of the dock" },
//     { title: "1984", author: "George Orwell", emoji: "👁️", clue: "Big Brother is watching" },
//     { title: "The Alchemist", author: "Paulo Coelho", emoji: "🏜️", clue: "A shepherd's journey to find treasure" },
//     { title: "Pride and Prejudice", author: "Jane Austen", emoji: "💐", clue: "It is a truth universally acknowledged" },
//     { title: "The Hobbit", author: "J.R.R. Tolkien", emoji: "🧙", clue: "An unexpected journey" },
//   ];

//   const handleGuess = (title) => {
//     if (title === books[currentRound].title) {
//       setScore(score + 1);
//       setKoinsEarned(koinsEarned + 15);
//       setRevealed(true);
//     } else {
//       setRevealed(true);
//     }

//     setTimeout(() => {
//       if (currentRound < books.length - 1) {
//         setCurrentRound(currentRound + 1);
//         setRevealed(false);
//       } else {
//         setShowResult(true);
//       }
//     }, 1500);
//   };

//   const resetGame = () => {
//     setCurrentRound(0);
//     setScore(0);
//     setShowResult(false);
//     setRevealed(false);
//     setKoinsEarned(0);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#1a0f0a] via-[#2d1a0e] to-[#1a0f0a] py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-2xl mb-6">
//           <div className="flex items-center gap-4">
//             <button 
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition"
//             >
//               ← Back
//             </button>
//             <div>
//               <h1 className="text-3xl font-bold text-[#D4A017]">🎯 Guess The Book</h1>
//               <p className="text-[#D4A017]/50 text-sm mt-1">Can you guess the book from the emoji and clue?</p>
//             </div>
//           </div>
//         </div>

//         {/* Game */}
//         <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#D4A017]/10 shadow-2xl">
//           {!showResult ? (
//             <div>
//               <div className="flex justify-between items-center mb-6">
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-[#D4A017]/50">Round {currentRound + 1} of {books.length}</span>
//                   <span className="text-sm text-[#D4A017]">⭐ {koinsEarned} KOINS</span>
//                 </div>
//                 <span className="text-sm text-[#f5ede4]">Score: {score}</span>
//               </div>

//               <div className="w-full h-1.5 bg-[#1a0f0a]/80 rounded-full mb-6">
//                 <div 
//                   className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-500"
//                   style={{ width: `${((currentRound + 1) / books.length) * 100}%` }}
//                 />
//               </div>

//               <div className="text-center mb-8">
//                 <div className="text-7xl mb-4">{books[currentRound].emoji}</div>
//                 <p className="text-lg text-[#D4A017]/50">💡 {books[currentRound].clue}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 {books.map((book) => (
//                   <button
//                     key={book.title}
//                     className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
//                       revealed
//                         ? book.title === books[currentRound].title
//                           ? 'bg-emerald-600/40 text-emerald-400 border-emerald-400'
//                           : 'bg-[#1a0f0a]/40 text-[#D4A017]/30'
//                         : 'bg-[#1a0f0a]/80 text-[#f5ede4] hover:bg-[#D4A017]/20 hover:border-[#D4A017]/30'
//                     } border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition`}
//                     onClick={() => handleGuess(book.title)}
//                     disabled={revealed}
//                   >
//                     {book.title}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">{score >= 5 ? '🏆' : score >= 3 ? '📚' : '📖'}</div>
//               <h2 className="text-3xl font-bold text-[#f5ede4]">Game Complete!</h2>
//               <p className="text-[#D4A017] text-xl mt-2">You guessed {score}/{books.length} correctly</p>
//               <p className="text-emerald-400 text-lg mt-1">Earned {koinsEarned} KOINS! ⭐</p>
//               <div className="flex gap-4 justify-center mt-6">
//                 <button
//                   onClick={resetGame}
//                   className="px-8 py-3 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition"
//                 >
//                   Play Again
//                 </button>
//                 <button
//                   onClick={() => navigate('/gamification')}
//                   className="px-8 py-3 bg-[#1a0f0a]/80 text-[#D4A017] rounded-full text-sm border border-[#D4A017]/20 hover:border-[#D4A017]/50 transition"
//                 >
//                   🏠 Back to Hub
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuessPage;