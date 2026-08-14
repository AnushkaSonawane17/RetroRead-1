import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookTrivia = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [koinsEarned, setKoinsEarned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ================================
  // GET TRIVIA QUESTIONS
  // ================================

  useEffect(() => {
    const getTrivia = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/trivia'
        );

        console.log('TRIVIA RESPONSE:', response.data);

        setQuestions(response.data.questions || []);

      } catch (error) {

        console.log('Error getting trivia:', error);

        setError('Unable to load trivia questions.');

      } finally {

        setLoading(false);

      }
    };

    getTrivia();

  }, []);


  // ================================
  // HANDLE ANSWER
  // ================================

  const handleAnswer = async (index) => {

    if (selectedAnswer !== null) {
      return;
    }

    const question = questions[currentQuestion];

    setSelectedAnswer(index);

    try {

      const userId = localStorage.getItem('userId');

      if (!userId) {

        console.log('User ID not found');

        return;

      }


      // Send answer to backend

      const response = await axios.post(
        'http://localhost:5000/trivia/answer',
        {
          userId: userId,
          questionId: question._id,
          answer: index
        }
      );


      console.log(
        'TRIVIA ANSWER RESPONSE:',
        response.data
      );


      // ================================
      // CORRECT ANSWER
      // ================================

      if (response.data.correct === true) {

        setCorrectAnswer(index);

        setScore((prev) => prev + 1);


        // Backend gives us the actual reward

        const coins = response.data.coins || 0;

        setKoinsEarned(
          (prev) => prev + coins
        );


        console.log(
          `${coins} KOINS added!`
        );


        // IMPORTANT
        // Tell Navbar to fetch the new balance

        window.dispatchEvent(
          new Event('koinsUpdated')
        );


        // ================================
        // WRONG ANSWER
        // ================================

      } else {

        setCorrectAnswer(
          response.data.correctAnswer ?? null
        );

      }

    } catch (error) {

      console.log(
        'Error submitting trivia answer:',
        error
      );

    }


    // ================================
    // NEXT QUESTION
    // ================================

    setTimeout(() => {

      if (
        currentQuestion <
        questions.length - 1
      ) {

        setCurrentQuestion(
          (prev) => prev + 1
        );

        setSelectedAnswer(null);

        setCorrectAnswer(null);

      } else {

        setShowResult(true);

      }

    }, 1200);

  };


  // ================================
  // RESET GAME
  // ================================

  const resetGame = () => {

    setCurrentQuestion(0);

    setScore(0);

    setShowResult(false);

    setSelectedAnswer(null);

    setCorrectAnswer(null);

    setKoinsEarned(0);

  };


  // ================================
  // LOADING
  // ================================

  if (loading) {

    return (

      <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#D4A017]/10 shadow-xl text-center">

        <div className="text-4xl mb-3">
          🧠
        </div>

        <p className="text-[#D4A017]">
          Loading trivia...
        </p>

      </div>

    );

  }


  // ================================
  // ERROR
  // ================================

  if (error) {

    return (

      <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 shadow-xl text-center">

        <div className="text-4xl mb-3">
          ⚠️
        </div>

        <p className="text-red-400">
          {error}
        </p>

        <p className="text-[#D4A017]/50 text-sm mt-2">
          Make sure your backend server is running.
        </p>

      </div>

    );

  }


  // ================================
  // NO QUESTIONS
  // ================================

  if (questions.length === 0) {

    return (

      <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#D4A017]/10 shadow-xl text-center">

        <div className="text-4xl mb-3">
          📚
        </div>

        <p className="text-[#D4A017]">
          No trivia questions available.
        </p>

      </div>

    );

  }


  // ================================
  // RESULT SCREEN
  // ================================

  if (showResult) {

    return (

      <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-8 border border-[#D4A017]/10 shadow-xl">

        <div className="text-center py-8">

          <div className="text-6xl mb-4">

            {score >= 4
              ? '🏆'
              : score >= 3
                ? '📚'
                : '📖'}

          </div>


          <h2 className="text-3xl font-bold text-[#f5ede4]">
            Quiz Complete!
          </h2>


          <p className="text-[#D4A017] text-xl mt-3">
            You scored {score}/{questions.length}
          </p>


          <p className="text-emerald-400 text-lg mt-2">
            ⭐ Earned {koinsEarned} KOINS!
          </p>


          <button
            onClick={resetGame}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#D4A017]/20 transition"
          >

            Play Again

          </button>

        </div>

      </div>

    );

  }


  const current =
    questions[currentQuestion];


  return (

    <div className="bg-[#2d1a0e]/60 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A017]/10 shadow-xl">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">

        <h3 className="font-bold text-lg text-[#f5ede4]">
          🧠 Book Trivia
        </h3>


        <div className="flex items-center gap-4 text-sm">

          <span className="text-[#D4A017]">
            ⭐ {koinsEarned} KOINS
          </span>


          <span className="text-[#D4A017]/50">
            Score: {score}/{questions.length}
          </span>

        </div>

      </div>


      {/* PROGRESS */}

      <div className="mb-6">

        <div className="flex justify-between text-xs text-[#D4A017]/50 mb-2">

          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

        </div>


        <div className="w-full h-1.5 bg-[#1a0f0a]/80 rounded-full overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-full transition-all duration-500"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`
            }}
          />

        </div>

      </div>


      {/* QUESTION */}

      <div className="mb-6">

        <p className="text-lg font-semibold text-[#f5ede4]">
          {current.question}
        </p>


        {current.hint && (

          <p className="text-sm text-[#D4A017]/50 mt-2">
            💡 {current.hint}
          </p>

        )}

      </div>


      {/* OPTIONS */}

      <div className="space-y-3">

        {current.options.map(
          (option, index) => {

            let buttonClass =
              'bg-[#1a0f0a]/80 text-[#f5ede4] border-[#D4A017]/10 hover:bg-[#D4A017]/20 hover:border-[#D4A017]/30';


            if (
              selectedAnswer !== null
            ) {

              if (
                index === selectedAnswer &&
                correctAnswer === index
              ) {

                buttonClass =
                  'bg-emerald-600/40 text-emerald-400 border-emerald-400';

              }

              else if (
                index === selectedAnswer &&
                correctAnswer !== index
              ) {

                buttonClass =
                  'bg-red-600/40 text-red-400 border-red-400';

              }

              else if (
                index === correctAnswer
              ) {

                buttonClass =
                  'bg-emerald-600/40 text-emerald-400 border-emerald-400';

              }

              else {

                buttonClass =
                  'bg-[#1a0f0a]/40 text-[#D4A017]/30 border-[#D4A017]/10';

              }

            }


            return (

              <button
                key={index}
                onClick={() =>
                  handleAnswer(index)
                }
                disabled={
                  selectedAnswer !== null
                }
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${buttonClass}`}
              >

                <span className="text-sm">
                  {option}
                </span>


                {selectedAnswer === index && (

                  <span className="float-right">

                    {correctAnswer === index
                      ? '✅'
                      : '❌'}

                  </span>

                )}

              </button>

            );

          }
        )}

      </div>

    </div>

  );

};

export default BookTrivia;