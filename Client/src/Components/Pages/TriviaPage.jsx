import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ArrowLeft,
    Brain,
    Lightbulb,
    CheckCircle2,
    XCircle,
    Trophy,
    RotateCcw,
    Home
} from "lucide-react";


const questions = [

    {
        question: "Who wrote '1984'?",
        options: [
            "George Orwell",
            "Aldous Huxley",
            "Ray Bradbury",
            "H.G. Wells"
        ],
        correct: 0,
        hint: "Big Brother is watching you"
    },

    {
        question: "What is the first book in the Harry Potter series?",
        options: [
            "Chamber of Secrets",
            "Prisoner of Azkaban",
            "Sorcerer's Stone",
            "Goblet of Fire"
        ],
        correct: 2,
        hint: "The boy who lived"
    },

    {
        question: "Which author wrote 'The Great Gatsby'?",
        options: [
            "Ernest Hemingway",
            "F. Scott Fitzgerald",
            "John Steinbeck",
            "William Faulkner"
        ],
        correct: 1,
        hint: "The green light at the end of the dock"
    },

    {
        question: "In 'To Kill a Mockingbird', who is the narrator?",
        options: [
            "Atticus Finch",
            "Scout Finch",
            "Jem Finch",
            "Boo Radley"
        ],
        correct: 1,
        hint: "She's the daughter of a lawyer in Maycomb"
    },

    {
        question: "Who wrote 'The Alchemist'?",
        options: [
            "Paulo Coelho",
            "Gabriel García Márquez",
            "Jorge Luis Borges",
            "Isabel Allende"
        ],
        correct: 0,
        hint: "A shepherd boy's journey to find treasure"
    }

];


const TriviaPage = () => {

    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [score, setScore] = useState(0);

    const [showResult, setShowResult] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const [koinsEarned, setKoinsEarned] = useState(0);

    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const [badgeMessage, setBadgeMessage] = useState("");


    // ==========================================
    // GET USER ID
    // ==========================================

    const getUserId = () => {

        return (
            localStorage.getItem("userId") ||
            localStorage.getItem("userID") ||
            localStorage.getItem("userid")
        );

    };


    // ==========================================
    // SHUFFLE QUESTIONS
    // ==========================================

    useEffect(() => {

        const shuffled = [...questions].sort(
            () => Math.random() - 0.5
        );

        setShuffledQuestions(shuffled);

    }, []);


    // ==========================================
    // UPDATE TRIVIA BADGE
    // ==========================================

    const updateTriviaBadge = async () => {

        try {

            const userId = getUserId();

            if (!userId) {

                console.log(
                    "No userId found. Trivia badge cannot be updated."
                );

                return;

            }


            const response = await fetch(
                `http://localhost:5000/badge/progress/${userId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        requirementType: "trivia",
                        amount: 1
                    })
                }
            );


            const data = await response.json();

            console.log("Badge response:", data);


            if (response.ok && data.badge) {

                if (data.badge.unlocked) {

                    setBadgeMessage(
                        "🏆 Trivia Champion badge unlocked!"
                    );

                } else {

                    const progress = data.badge.progress;
                    const target = data.badge.badgeId?.target || 5;

                    setBadgeMessage(
                        `🧠 Trivia progress: ${progress}/${target}`
                    );

                }

            }

        } catch (error) {

            console.log(
                "Badge update error:",
                error
            );

        }

    };


    // ==========================================
    // HANDLE ANSWER
    // ==========================================

    const handleAnswer = async (index) => {

    if (selectedAnswer !== null) {
        return;
    }

    setSelectedAnswer(index);

    const current = shuffledQuestions[currentQuestion];

    try {

        const userId = getUserId();

        if (!userId) {
            console.log("No userId found");
            return;
        }

        /*
        IMPORTANT:
        Your current shuffledQuestions are static objects,
        so they DON'T have MongoDB _id values.

        Therefore this old TriviaPage cannot use
        /trivia/answer yet.
        */

        if (index === current.correct) {

            setScore((s) => s + 1);
            setKoinsEarned((k) => k + 20);

            // Add 20 KOINS to backend
            const response = await axios.post(
                "http://localhost:5000/coin/addcoins",
                {
                    userId: userId,
                    coins: 20,
                    type: "Trivia",
                    description: "Correct trivia answer"
                }
            );

            console.log("COINS ADDED:", response.data);

            // Tell Navbar to refresh
            window.dispatchEvent(
                new Event("koinsUpdated")
            );
        }

    } catch (error) {

        console.log(
            "Error adding trivia coins:",
            error.response?.data || error.message
        );

    }

    setTimeout(() => {

        if (
            currentQuestion <
            shuffledQuestions.length - 1
        ) {

            setCurrentQuestion((q) => q + 1);
            setSelectedAnswer(null);

        } else {

            setShowResult(true);

        }

    }, 1000);
};


    // ==========================================
    // RESET GAME
    // ==========================================

    const resetGame = () => {

        setShuffledQuestions(
            [...questions].sort(
                () => Math.random() - 0.5
            )
        );

        setCurrentQuestion(0);

        setScore(0);

        setShowResult(false);

        setSelectedAnswer(null);

        setKoinsEarned(0);

        setBadgeMessage("");

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (shuffledQuestions.length === 0) {

        return (
            <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center text-[#1E2A42] text-2xl">
                Loading...
            </div>
        );

    }


    const q = shuffledQuestions[currentQuestion];


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
                    background-image:
                    radial-gradient(
                        rgba(30,42,66,0.035) 1px,
                        transparent 1px
                    );

                    background-size: 4px 4px;
                }

                @keyframes q-in {

                    0% {
                        opacity: 0;
                        transform: translateX(14px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }

                }

                .q-in {
                    animation: q-in 0.4s ease forwards;
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
                    animation:
                    result-in 0.5s
                    cubic-bezier(0.34,1.56,0.64,1)
                    forwards;
                }

                @keyframes float-y {

                    0%,100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-6px);
                    }

                }

                .float-y {
                    animation:
                    float-y 2.6s ease-in-out infinite;
                }

            `}</style>


            <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />


            <div className="font-body relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


                {/* HEADER */}

                <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC]"
                        >

                            <ArrowLeft size={14} />

                            Back

                        </button>


                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5C7A93]/10 border border-[#5C7A93]/30">

                                <Brain
                                    size={18}
                                    className="text-[#5C7A93]"
                                />

                            </div>


                            <div>

                                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">
                                    Book Trivia
                                </h1>

                                <p className="text-[#8A7F6B] text-sm mt-1">
                                    Test your book knowledge and earn KOINS!
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* GAME */}

                <div className="bg-[#FFFBF3] rounded-2xl p-8 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">

                    {!showResult ? (

                        <div
                            key={currentQuestion}
                            className="q-in"
                        >

                            <div className="flex justify-between items-center mb-6">

                                <div className="flex items-center gap-4">

                                    <span className="text-sm text-[#8A7F6B]">
                                        Question {currentQuestion + 1} of {shuffledQuestions.length}
                                    </span>

                                    <span className="text-sm text-[#A9812F] font-semibold">
                                        {koinsEarned} KOINS
                                    </span>

                                </div>


                                <span className="text-sm text-[#1E2A42] font-medium">
                                    Score: {score}
                                </span>

                            </div>


                            <div className="w-full h-2 bg-[#EDE2CE] rounded-full mb-6 overflow-hidden">

                                <div
                                    className="h-full bg-[#5C7A93] rounded-full transition-all duration-700"
                                    style={{
                                        width:
                                            `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%`
                                    }}
                                />

                            </div>


                            <div className="bg-[#F6EFE3] rounded-xl p-4 mb-6 border border-[#E2D5BC]">

                                <p className="text-lg font-semibold text-[#1E2A42]">
                                    {q.question}
                                </p>

                                <p className="flex items-center gap-1.5 text-sm text-[#8A7F6B] mt-2 pulse-soft">

                                    <Lightbulb
                                        size={14}
                                        className="text-[#A9812F]"
                                    />

                                    Hint: {q.hint}

                                </p>

                            </div>


                            <div className="space-y-3">

                                {q.options.map(
                                    (option, index) => {

                                        const isSelected =
                                            selectedAnswer === index;

                                        const isCorrect =
                                            index === q.correct;


                                        let cls =
                                            "bg-[#F6EFE3] text-[#1E2A42] hover:bg-[#EDE2CE] border-[#E2D5BC]";


                                        if (
                                            selectedAnswer !== null
                                        ) {

                                            if (
                                                isSelected &&
                                                isCorrect
                                            ) {

                                                cls =
                                                    "bg-[#6B8F55]/15 text-[#4C6A3D] border-[#6B8F55]";

                                            } else if (
                                                isSelected &&
                                                !isCorrect
                                            ) {

                                                cls =
                                                    "bg-[#D8472F]/10 text-[#B23522] border-[#D8472F]";

                                            } else if (
                                                isCorrect
                                            ) {

                                                cls =
                                                    "bg-[#6B8F55]/15 text-[#4C6A3D] border-[#6B8F55]";

                                            } else {

                                                cls =
                                                    "bg-[#F6EFE3] text-[#8A7F6B] border-[#E2D5BC] opacity-60";

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
                                                className={`w-full flex items-center justify-between text-left px-6 py-4 rounded-xl border transition-all duration-300 ${cls}`}
                                            >

                                                <span>
                                                    {option}
                                                </span>


                                                {isSelected &&
                                                    (
                                                        isCorrect
                                                            ?
                                                            <CheckCircle2
                                                                size={18}
                                                                className="text-[#6B8F55]"
                                                            />
                                                            :
                                                            <XCircle
                                                                size={18}
                                                                className="text-[#D8472F]"
                                                            />
                                                    )}

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    ) : (

                        <div className="result-in text-center py-12">

                            <Trophy
                                size={56}
                                className="mx-auto text-[#A9812F] float-y"
                            />


                            <h2 className="font-display text-3xl font-bold text-[#1E2A42] mt-4">
                                Quiz Complete!
                            </h2>


                            <p className="text-[#5C7A93] text-xl mt-2 font-semibold">
                                You scored {score}/{shuffledQuestions.length}
                            </p>


                            <p className="text-[#6B8F55] text-lg mt-1">
                                Earned {koinsEarned} KOINS!
                            </p>


                            {badgeMessage && (

                                <div className="mt-5 inline-block px-5 py-3 rounded-xl bg-[#A9812F]/10 border border-[#A9812F]/30 text-[#8A6A1F]">

                                    {badgeMessage}

                                </div>

                            )}


                            <div className="flex gap-4 justify-center mt-6">

                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-2 px-8 py-3 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold"
                                >

                                    <RotateCcw size={15} />

                                    Play Again

                                </button>


                                <button
                                    onClick={() =>
                                        navigate("/gamification")
                                    }
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


export default TriviaPage;