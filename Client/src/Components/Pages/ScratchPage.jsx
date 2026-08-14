import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import axios from "axios";

import {
    ArrowLeft,
    Sparkles,
    Gift,
    CheckCircle2,
    PartyPopper,
    Trophy,
    Star
} from "lucide-react";


const ScratchPage = () => {

    const navigate = useNavigate();


    // ==========================================
    // STATE
    // ==========================================

    const [cards, setCards] = useState([]);

    const [selectedCard, setSelectedCard] =
        useState(null);

    const [reward, setReward] =
        useState(null);

    const [balance, setBalance] =
        useState(null);

    const [scratched, setScratched] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ==========================================
    // USER ID
    // ==========================================

    const getUserId = () => {

        return (
            localStorage.getItem("userId") ||
            localStorage.getItem("userID") ||
            localStorage.getItem("userid")
        );

    };


    // ==========================================
    // CARD DESIGN
    // ==========================================

    const cardDesigns = [

        {
            icon: Star,
            color: "#A9812F"
        },

        {
            icon: Sparkles,
            color: "#5C7A93"
        },

        {
            icon: PartyPopper,
            color: "#D8472F"
        },

        {
            icon: Trophy,
            color: "#8B4C6D"
        },

        {
            icon: Gift,
            color: "#3E7C74"
        }

    ];


    // ==========================================
    // GET SCRATCH CARDS
    // ==========================================

    const getScratchCards = async () => {

        try {

            setLoading(true);

            setError("");


            const userId =
                getUserId();


            if (!userId) {

                setError(
                    "User ID not found. Please login again."
                );

                return;

            }


            const response =
                await axios.get(
                    `http://localhost:5000/scratchcard/${userId}`
                );


            console.log(
                "SCRATCH CARDS:",
                response.data
            );


            const backendCards =
                response.data.cards || [];


            const formattedCards =
                backendCards.map(
                    (card, index) => ({

                        ...card,

                        ...cardDesigns[index],

                        revealed: false

                    })
                );


            setCards(
                formattedCards
            );


            // ==========================================
            // ALREADY SCRATCHED TODAY
            // ==========================================

            if (
                response.data.scratched
            ) {

                setScratched(true);

                setReward(
                    response.data.reward
                );

            }


        } catch (error) {

            console.log(
                "SCRATCH CARD LOAD ERROR:",
                error.response?.data ||
                error.message
            );


            setError(
                error.response?.data?.Message ||
                "Unable to load scratch cards."
            );


        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // LOAD CARDS
    // ==========================================

    useEffect(() => {

        getScratchCards();

    }, []);


    // ==========================================
    // SCRATCH CARD
    // ==========================================

    const handleScratch = async (
        cardId
    ) => {

        // Already scratched
        if (scratched) {
            return;
        }


        // Prevent double click
        if (selectedCard !== null) {
            return;
        }


        try {

            const userId =
                getUserId();


            if (!userId) {

                setError(
                    "User ID not found."
                );

                return;

            }


            // ==========================================
            // SELECT CARD VISUALLY
            // ==========================================

            setSelectedCard(
                cardId
            );


            // ==========================================
            // SEND TO BACKEND
            // ==========================================

            const response =
                await axios.post(
                    "http://localhost:5000/scratchcard/scratch",
                    {
                        userId: userId,
                        cardId: cardId
                    }
                );


            console.log(
                "SCRATCH RESPONSE:",
                response.data
            );


            // ==========================================
            // GET REWARD
            // ==========================================

            const earnedReward =
                response.data.reward;


            setReward(
                earnedReward
            );


            setBalance(
                response.data.balance
            );


            setScratched(
                true
            );


            // ==========================================
            // REVEAL ONLY SELECTED CARD
            // ==========================================

            setCards(
                previousCards =>
                    previousCards.map(
                        card => {

                            if (
                                card.id ===
                                cardId
                            ) {

                                return {
                                    ...card,
                                    revealed: true,
                                    reward:
                                        earnedReward
                                };

                            }


                            return card;

                        }
                    )
            );


            // ==========================================
            // UPDATE NAVBAR KOINS
            // ==========================================

            window.dispatchEvent(
                new Event(
                    "koinsUpdated"
                )
            );


        } catch (error) {

            console.log(
                "SCRATCH ERROR:",
                error.response?.data ||
                error.message
            );


            setSelectedCard(
                null
            );


            setError(
                error.response?.data?.Message ||
                "Unable to scratch card."
            );

        }

    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="
                min-h-screen
                bg-[#F6EFE3]
                flex
                items-center
                justify-center
                text-[#1E2A42]
                font-display
                text-2xl
            ">

                Loading scratch cards...

            </div>

        );

    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error && cards.length === 0) {

        return (

            <div className="
                min-h-screen
                bg-[#F6EFE3]
                flex
                items-center
                justify-center
                p-6
            ">

                <div className="
                    bg-[#FFFBF3]
                    rounded-2xl
                    p-8
                    border
                    border-[#E2D5BC]
                    text-center
                    max-w-md
                ">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>


                    <h2 className="
                        font-display
                        text-2xl
                        font-bold
                        text-[#1E2A42]
                    ">

                        Unable to load scratch cards

                    </h2>


                    <p className="
                        text-[#8A7F6B]
                        text-sm
                        mt-3
                    ">

                        {error}

                    </p>


                    <button
                        onClick={getScratchCards}
                        className="
                            mt-6
                            px-6
                            py-3
                            bg-[#D8472F]
                            text-[#FFFBF3]
                            rounded-full
                            font-semibold
                        "
                    >

                        Try Again

                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // MAIN PAGE
    // ==========================================

    return (

        <div className="
            min-h-screen
            w-full
            bg-[#F6EFE3]
            py-10
        ">

            <div className="
                max-w-6xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
            ">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="
                    bg-[#FFFBF3]
                    rounded-2xl
                    p-6
                    border
                    border-[#E2D5BC]
                    shadow-sm
                    mb-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <button
                            onClick={() =>
                                navigate(-1)
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                bg-[#F6EFE3]
                                text-[#1E2A42]
                                rounded-full
                                text-sm
                                border
                                border-[#E2D5BC]
                            "
                        >

                            <ArrowLeft
                                size={14}
                            />

                            Back

                        </button>


                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-[#3E7C74]/10
                                border
                                border-[#3E7C74]/30
                            ">

                                <Sparkles
                                    size={18}
                                    className="
                                        text-[#3E7C74]
                                    "
                                />

                            </div>


                            <div>

                                <h1 className="
                                    font-display
                                    font-bold
                                    text-3xl
                                    text-[#1E2A42]
                                ">

                                    Scratch Cards

                                </h1>


                                <p className="
                                    text-[#8A7F6B]
                                    text-sm
                                    mt-1
                                ">

                                    Pick ONE card and test your luck!

                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================================= */}
                {/* DAILY MESSAGE */}
                {/* ================================= */}

                <div className="
                    bg-[#3E7C74]/10
                    border
                    border-[#3E7C74]/30
                    rounded-xl
                    p-4
                    mb-6
                    text-center
                ">

                    {!scratched ? (

                        <p className="
                            text-[#3E7C74]
                            font-semibold
                        ">

                            🎁 Five cards. One chance.
                            Choose wisely!

                        </p>

                    ) : (

                        <p className="
                            text-[#3E7C74]
                            font-semibold
                        ">

                            🎉 You already played today's
                            scratch card!

                        </p>

                    )}

                </div>


                {/* ================================= */}
                {/* CARDS */}
                {/* ================================= */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-5
                ">

                    {cards.map(
                        (card, index) => {

                            const Icon =
                                card.icon;


                            const isSelected =
                                selectedCard ===
                                card.id;


                            return (

                                <div
                                    key={card.id}
                                    className={`
                                        bg-[#FFFBF3]
                                        rounded-2xl
                                        p-5
                                        border
                                        transition-all
                                        duration-300
                                        ${
                                            isSelected
                                                ? "border-[#3E7C74] shadow-lg scale-[1.02]"
                                                : "border-[#E2D5BC]"
                                        }
                                    `}
                                >


                                    {/* CARD NUMBER */}

                                    <div className="
                                        flex
                                        justify-between
                                        items-center
                                        mb-4
                                    ">

                                        <span className="
                                            text-sm
                                            font-semibold
                                            text-[#1E2A42]
                                        ">

                                            Card #{index + 1}

                                        </span>


                                        <span className="
                                            text-xs
                                            text-[#8A7F6B]
                                        ">

                                            Lucky Pick

                                        </span>

                                    </div>


                                    {/* SCRATCH AREA */}

                                    <div
                                        onClick={() =>
                                            handleScratch(
                                                card.id
                                            )
                                        }
                                        className="
                                            relative
                                            h-52
                                            rounded-xl
                                            overflow-hidden
                                            cursor-pointer
                                            border-2
                                            border-dashed
                                            transition-all
                                            duration-300
                                        "
                                        style={{
                                            background:
                                                card.revealed
                                                    ? `${card.color}15`
                                                    : "#EDE2CE",

                                            borderColor:
                                                card.revealed
                                                    ? card.color
                                                    : "#D9C7A3"
                                        }}
                                    >

                                        {!card.revealed ? (

                                            <div className="
                                                absolute
                                                inset-0
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                            ">

                                                <Gift
                                                    size={55}
                                                    className="
                                                        text-[#8A7F6B]
                                                        mb-3
                                                    "
                                                />


                                                <p className="
                                                    text-[#8A7F6B]
                                                    text-sm
                                                ">

                                                    Click to scratch

                                                </p>


                                                <p className="
                                                    text-[#A9812F]
                                                    text-xs
                                                    mt-2
                                                ">

                                                    🎲 Test your luck

                                                </p>

                                            </div>

                                        ) : (

                                            <div className="
                                                absolute
                                                inset-0
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                            ">

                                                <Icon
                                                    size={52}
                                                    style={{
                                                        color:
                                                            card.color
                                                    }}
                                                    className="mb-3"
                                                />


                                                <p
                                                    className="
                                                        text-3xl
                                                        font-display
                                                        font-bold
                                                    "
                                                    style={{
                                                        color:
                                                            card.color
                                                    }}
                                                >

                                                    {reward}
                                                    {" "}
                                                    KOINS

                                                </p>


                                                <p className="
                                                    text-[#8A7F6B]
                                                    text-sm
                                                    mt-2
                                                ">

                                                    🎉 Congratulations!

                                                </p>

                                            </div>

                                        )}

                                    </div>


                                    {/* BUTTON */}

                                    <button
                                        onClick={() =>
                                            handleScratch(
                                                card.id
                                            )
                                        }
                                        disabled={
                                            scratched
                                        }
                                        className={`
                                            w-full
                                            mt-4
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            px-4
                                            py-3
                                            rounded-full
                                            text-sm
                                            font-semibold
                                            transition
                                            ${
                                                scratched
                                                    ? "bg-[#F6EFE3] text-[#8A7F6B] cursor-not-allowed border border-[#E2D5BC]"
                                                    : "bg-[#D8472F] text-[#FFFBF3] hover:bg-[#B23522]"
                                            }
                                        `}
                                    >

                                        {card.revealed ? (

                                            <>
                                                <CheckCircle2
                                                    size={15}
                                                />

                                                Claimed

                                            </>

                                        ) : (

                                            <>
                                                <Sparkles
                                                    size={15}
                                                />

                                                Scratch This Card

                                            </>

                                        )}

                                    </button>

                                </div>

                            );

                        }
                    )}

                </div>


                {/* ================================= */}
                {/* RESULT */}
                {/* ================================= */}

                {scratched &&
                    reward !== null && (

                        <div className="
                            mt-8
                            bg-[#FFFBF3]
                            rounded-2xl
                            p-8
                            border
                            border-[#3E7C74]/30
                            text-center
                            shadow-sm
                        ">

                            <div className="
                                text-5xl
                                mb-3
                            ">

                                🎉

                            </div>


                            <h2 className="
                                font-display
                                text-3xl
                                font-bold
                                text-[#1E2A42]
                            ">

                                You Won {reward} KOINS!

                            </h2>


                            {balance !== null && (

                                <p className="
                                    text-[#3E7C74]
                                    mt-3
                                    font-semibold
                                ">

                                    Your new balance:
                                    {" "}
                                    {balance} KOINS

                                </p>

                            )}


                            <p className="
                                text-[#8A7F6B]
                                text-sm
                                mt-2
                            ">

                                Come back tomorrow for
                                another chance!

                            </p>

                        </div>

                    )}


            </div>

        </div>

    );

};


export default ScratchPage;