import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft,
  Target,
  Lightbulb,
  Trophy,
  RotateCcw,
  Home,
  Sparkle
} from 'lucide-react';

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    clue: "Small changes, big results"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    clue: "The green light at the end of the dock"
  },
  {
    title: "1984",
    author: "George Orwell",
    clue: "Big Brother is watching"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    clue: "A shepherd's journey to find treasure"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    clue: "It is a truth universally acknowledged"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    clue: "An unexpected journey"
  }
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

    const shuffled = [...books].sort(() => Math.random() - 0.5);

    setShuffledBooks(shuffled);

  }, []);

  const handleGuess = async (title) => {

    console.log("🔥 GUESS CLICKED");
    console.log("Selected:", title);

    const currentBook = shuffledBooks[currentRound];

    console.log("Correct answer:", currentBook.title);

    const isCorrect = title === currentBook.title;

    setRevealed(true);

    if (isCorrect) {

      setScore((prev) => prev + 1);
      setKoinsEarned((prev) => prev + 15);

      console.log("✅ Correct answer!");

      try {

        const userId = localStorage.getItem("userId");

        console.log("👤 USER ID:", userId);

        if (!userId) {
          console.log("❌ User ID not found");
          return;
        }

        const response = await axios.post(
          "http://localhost:5000/coin/addcoins",
          {
            userId: userId,
            coins: 15,
            type: "Guess The Book",
            description: `Correctly guessed ${currentBook.title}`
          }
        );

        console.log("✅ COINS ADDED:", response.data);

        // Tell Navbar and other components to refresh KOINS
        window.dispatchEvent(new Event("koinsUpdated"));

      } catch (error) {

        console.log(
          "❌ ERROR ADDING KOINS:",
          error.response?.data || error.message
        );

      }

    } else {

      console.log("❌ Wrong answer");

    }

    setTimeout(() => {

      if (currentRound < shuffledBooks.length - 1) {

        setCurrentRound((prev) => prev + 1);
        setRevealed(false);

      } else {

        setShowResult(true);

      }

    }, 1400);

  };

  const resetGame = () => {

    const shuffled = [...books].sort(() => Math.random() - 0.5);

    setShuffledBooks(shuffled);
    setCurrentRound(0);
    setScore(0);
    setShowResult(false);
    setRevealed(false);
    setKoinsEarned(0);

  };

  if (shuffledBooks.length === 0) {

    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center text-[#1E2A42] text-2xl">
        Loading...
      </div>
    );

  }

  const current = shuffledBooks[currentRound];

  return (

    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');

        .font-display {
          font-family: 'Fraunces', serif;
        }

        .font-body {
          font-family: 'Work Sans', sans-serif;
        }

        .paper-grain {
          background-image: radial-gradient(
            rgba(30,42,66,0.035) 1px,
            transparent 1px
          );
          background-size: 4px 4px;
        }

        @keyframes round-in {
          0% {
            opacity: 0;
            transform: translateX(14px);
          }

          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .round-in {
          animation: round-in 0.4s ease forwards;
        }

        @keyframes float-y {

          0%,100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(-3deg);
          }

        }

        .float-y {
          animation: float-y 2.8s ease-in-out infinite;
        }

        @keyframes pulse-soft {

          0%,100% {
            opacity: 1;
          }

          50% {
            opacity: 0.55;
          }

        }

        .pulse-soft {
          animation: pulse-soft 1.8s ease-in-out infinite;
        }

        @keyframes result-in {

          0% {
            opacity: 0;
            transform: scale(0.7);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }

        }

        .result-in {
          animation: result-in 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

      `}</style>


      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />


      <div className="font-body relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


        {/* HEADER */}

        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-lg">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC]"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B4C6D]/10 border border-[#8B4C6D]/30">

                <Target
                  size={18}
                  className="text-[#8B4C6D]"
                />

              </div>

              <div>

                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">
                  Guess The Book
                </h1>

                <p className="text-[#8A7F6B] text-sm mt-1">
                  Can you guess the book from the clue?
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* GAME */}

        <div className="bg-[#FFFBF3] rounded-2xl p-8 border border-[#E2D5BC] shadow-lg">

          {!showResult ? (

            <div key={currentRound} className="round-in">

              {/* TOP */}

              <div className="flex justify-between items-center mb-6">

                <div className="flex items-center gap-4">

                  <span className="text-sm text-[#8A7F6B]">
                    Round {currentRound + 1} of {shuffledBooks.length}
                  </span>

                  <span className="text-sm text-[#A9812F] font-semibold">
                    ⭐ {koinsEarned} KOINS
                  </span>

                </div>

                <span className="text-sm text-[#1E2A42] font-medium">
                  Score: {score}
                </span>

              </div>


              {/* PROGRESS */}

              <div className="w-full h-2 bg-[#EDE2CE] rounded-full mb-6 overflow-hidden">

                <div
                  className="h-full bg-[#8B4C6D] rounded-full transition-all duration-700"
                  style={{
                    width: `${((currentRound + 1) / shuffledBooks.length) * 100}%`
                  }}
                />

              </div>


              {/* CLUE */}

              <div className="text-center mb-8">

                <Sparkle
                  size={52}
                  className="mx-auto text-[#8B4C6D] float-y"
                />

                <p className="flex items-center justify-center gap-1.5 text-base text-[#5B6478] mt-4 pulse-soft">

                  <Lightbulb
                    size={15}
                    className="text-[#A9812F]"
                  />

                  {current.clue}

                </p>

              </div>


              {/* OPTIONS */}

              <div className="grid grid-cols-2 gap-3">

                {shuffledBooks.map((book) => {

                  const isTarget =
                    book.title === current.title;

                  let buttonClass =
                    'bg-[#F6EFE3] text-[#1E2A42] hover:bg-[#EDE2CE] border-[#E2D5BC]';

                  if (revealed) {

                    buttonClass = isTarget
                      ? 'bg-[#6B8F55]/15 text-[#4C6A3D] border-[#6B8F55]'
                      : 'bg-[#F6EFE3] text-[#8A7F6B] border-[#E2D5BC] opacity-50';

                  }

                  return (

                    <button
                      key={book.title}
                      onClick={() => handleGuess(book.title)}
                      disabled={revealed}
                      className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${buttonClass}`}
                    >
                      {book.title}
                    </button>

                  );

                })}

              </div>

            </div>

          ) : (

            /* RESULT */

            <div className="text-center py-12 result-in">

              <Trophy
                size={56}
                className="mx-auto text-[#A9812F]"
              />

              <h2 className="font-display text-3xl font-bold text-[#1E2A42] mt-4">
                Game Complete!
              </h2>

              <p className="text-[#8B4C6D] text-xl mt-2 font-semibold">
                You guessed {score}/{shuffledBooks.length} correctly
              </p>

              <p className="text-[#6B8F55] text-lg mt-1">
                Earned {koinsEarned} KOINS!
              </p>

              <div className="flex gap-4 justify-center mt-6">

                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-8 py-3 bg-[#D8472F] text-white rounded-full text-sm font-semibold"
                >
                  <RotateCcw size={15} />
                  Play Again
                </button>

                <button
                  onClick={() => navigate('/gamification')}
                  className="flex items-center gap-2 px-8 py-3 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC]"
                >
                  <Home size={15} />
                  Back to Hub
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