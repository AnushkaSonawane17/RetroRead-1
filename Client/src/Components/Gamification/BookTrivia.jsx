import React, { useState } from 'react';

const BookTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [koinsEarned, setKoinsEarned] = useState(0);

  const questions = [
    {
      question: "Who wrote '1984'?",
      options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      correct: 0,
      hint: "Big Brother is watching you"
    },
    {
      question: "What is the first book in the Harry Potter series?",
      options: ["Chamber of Secrets", "Prisoner of Azkaban", "Sorcerer's Stone", "Goblet of Fire"],
      correct: 2,
      hint: "The boy who lived"
    },
    {
      question: "Which author wrote 'The Great Gatsby'?",
      options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
      correct: 1,
      hint: "The green light at the end of the dock"
    },
    {
      question: "In 'To Kill a Mockingbird', who is the narrator?",
      options: ["Atticus Finch", "Scout Finch", "Jem Finch", "Boo Radley"],
      correct: 1,
      hint: "She's the daughter of a lawyer in Maycomb"
    },
    {
      question: "Who wrote the 'The Alchemist'?",
      options: ["Paulo Coelho", "Gabriel García Márquez", "Jorge Luis Borges", "Isabel Allende"],
      correct: 0,
      hint: "A shepherd boy's journey to find treasure"
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      setKoinsEarned(koinsEarned + 20);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setKoinsEarned(0);
  };

  return (
    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-[#f5ede4]">🧠 Book Trivia</h3>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-[#D4A017]">⭐ {koinsEarned} KOINS</span>
          <span className="text-[#D4A017]/50">Score: {score}/{questions.length}</span>
        </div>
      </div>

      {!showResult ? (
        <div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-[#D4A017]/50 mb-1">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>💡 {questions[currentQuestion].hint}</span>
            </div>
            <div className="w-full h-1 bg-[#1a0f0a]/80 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <p className="text-lg font-semibold text-[#f5ede4] mb-4">
            {questions[currentQuestion].question}
          </p>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'bg-[#1a0f0a]/80 text-[#f5ede4] hover:bg-[#D4A017]/20 hover:border-[#D4A017]/30'
                    : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-emerald-600/40 text-emerald-400 border-emerald-400'
                        : 'bg-red-600/40 text-red-400 border-red-400'
                      : index === questions[currentQuestion].correct && selectedAnswer !== null
                        ? 'bg-emerald-600/40 text-emerald-400 border-emerald-400'
                        : 'bg-[#1a0f0a]/40 text-[#D4A017]/30'
                } border border-[#D4A017]/10 hover:border-[#D4A017]/30 transition`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="text-sm">{option}</span>
                {selectedAnswer === index && (
                  <span className="float-right">
                    {index === questions[currentQuestion].correct ? '✅' : '❌'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">{score >= 4 ? '🏆' : score >= 3 ? '📚' : '📖'}</div>
          <h4 className="text-2xl font-bold text-[#f5ede4]">Quiz Complete!</h4>
          <p className="text-[#D4A017] text-lg mt-2">You scored {score}/{questions.length}</p>
          <p className="text-[#D4A017]/50 text-sm mt-1">Earned {koinsEarned} KOINS!</p>
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default BookTrivia;

// import React, { useState } from 'react';
// import Card from '../Common/Card';

// const questions = [
//   {
//     q: "Who wrote '1984'?",
//     options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
//     answer: "George Orwell",
//   },
//   {
//     q: "What is the first book in the Harry Potter series?",
//     options: [
//       "The Chamber of Secrets",
//       "The Philosopher's Stone",
//       "The Prisoner of Azkaban",
//       "The Goblet of Fire",
//     ],
//     answer: "The Philosopher's Stone",
//   },
//   {
//     q: "Which author wrote 'Pride and Prejudice'?",
//     options: ["Charlotte Bronte", "Jane Austen", "Emily Bronte", "Mary Shelley"],
//     answer: "Jane Austen",
//   },
//   {
//     q: "'The Silent Patient' is what genre?",
//     options: ["Romance", "Mystery/Thriller", "Fantasy", "Biography"],
//     answer: "Mystery/Thriller",
//   },
//   {
//     q: "Who wrote 'Atomic Habits'?",
//     options: ["James Clear", "Cal Newport", "Daniel Kahneman", "Yuval Noah Harari"],
//     answer: "James Clear",
//   },
// ];

// const KOINS_PER_CORRECT = 10;

// const BookTrivia = ({ onKoinsEarned }) => {
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);

//   function handleAnswer(option) {
//     if (selected) return; // lock after first click
//     setSelected(option);

//     const correct = option === questions[current].answer;
//     if (correct) setScore((s) => s + 1);

//     setTimeout(() => {
//       if (current + 1 < questions.length) {
//         setCurrent((c) => c + 1);
//         setSelected(null);
//       } else {
//         setFinished(true);
//         const earned = (correct ? score + 1 : score) * KOINS_PER_CORRECT;
//         if (onKoinsEarned) onKoinsEarned(earned);
//       }
//     }, 800);
//   }

//   function restart() {
//     setCurrent(0);
//     setSelected(null);
//     setScore(0);
//     setFinished(false);
//   }

//   if (finished) {
//     return (
//       <Card className="text-center">
//         <div className="text-4xl mb-2">🏆</div>
//         <h3 className="font-semibold text-lg text-[#2D3436]">Quiz Complete!</h3>
//         <p className="text-[#636E72] mt-1">
//           You got {score} / {questions.length} correct
//         </p>
//         <p className="text-[#FDCB6E] font-bold mt-2">
//           +{score * KOINS_PER_CORRECT} KOINS earned
//         </p>
//         <button
//           onClick={restart}
//           className="mt-4 px-4 py-2 rounded-lg bg-[#0984E3] text-white text-sm font-medium hover:bg-[#0870c2] transition-colors"
//         >
//           Play Again
//         </button>
//       </Card>
//     );
//   }

//   const q = questions[current];

//   return (
//     <Card>
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="font-semibold text-lg text-[#2D3436]">Book Trivia</h3>
//         <span className="text-xs text-[#636E72]">
//           {current + 1} / {questions.length}
//         </span>
//       </div>

//       <p className="text-[#2D3436] font-medium mb-4">{q.q}</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//         {q.options.map((opt) => {
//           const isCorrect = selected && opt === q.answer;
//           const isWrong = selected === opt && opt !== q.answer;
//           return (
//             <button
//               key={opt}
//               onClick={() => handleAnswer(opt)}
//               className={`
//                 text-left px-3 py-2 rounded-lg text-sm border-2 transition-colors
//                 ${isCorrect ? 'bg-green-50 border-green-400 text-green-700' : ''}
//                 ${isWrong ? 'bg-red-50 border-red-400 text-red-700' : ''}
//                 ${!selected ? 'border-gray-200 hover:border-[#0984E3]/50 text-[#2D3436]' : ''}
//               `}
//             >
//               {opt}
//             </button>
//           );
//         })}
//       </div>
//     </Card>
//   );
// };

// export default BookTrivia;