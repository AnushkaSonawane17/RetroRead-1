import React, { useState } from "react";

const ScratchCard = ({
    onScratch = null,
    isRevealed = false,
    reward = null,
    cardNumber = 1
}) => {

    const [revealed, setRevealed] = useState(isRevealed);


    const handleScratch = () => {

        if (revealed) {
            return;
        }

        setRevealed(true);

        if (onScratch) {
            onScratch();
        }
    };


    return (

        <div
            className="
                bg-[#FFFBF3]
                rounded-2xl
                p-6
                border
                border-[#E2D5BC]
                shadow-xl
            "
        >

            <div className="flex justify-between items-center mb-4">

                <h3
                    className="
                        font-bold
                        text-lg
                        text-[#1E2A42]
                    "
                >
                    Scratch Card #{cardNumber}
                </h3>


                <span
                    className="
                        text-sm
                        text-[#8A7F6B]
                    "
                >
                    {revealed
                        ? "Reward revealed"
                        : "Click to reveal"
                    }
                </span>

            </div>


            <div
                onClick={handleScratch}
                className="
                    relative
                    w-full
                    h-48
                    rounded-xl
                    overflow-hidden
                    cursor-pointer
                    bg-[#EDE2CE]
                    border-2
                    border-dashed
                    border-[#D9C7A3]
                "
            >

                {!revealed ? (

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            flex-col
                        "
                    >

                        <div className="text-5xl mb-3">
                            🎁
                        </div>

                        <p
                            className="
                                text-[#8A7F6B]
                                text-sm
                            "
                        >
                            Scratch to reveal your prize!
                        </p>

                    </div>

                ) : (

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            flex-col
                            bg-[#3E7C74]/10
                        "
                    >

                        <div className="text-5xl mb-3">
                            🎉
                        </div>

                        <p
                            className="
                                text-2xl
                                font-bold
                                text-[#3E7C74]
                            "
                        >
                            {reward} KOINS!
                        </p>

                        <p
                            className="
                                text-[#8A7F6B]
                                text-sm
                                mt-1
                            "
                        >
                            Congratulations!
                        </p>

                    </div>

                )}

            </div>


            <button
                onClick={handleScratch}
                disabled={revealed}
                className={`
                    w-full
                    mt-4
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold

                    ${
                        revealed
                            ? `
                                bg-[#F6EFE3]
                                text-[#8A7F6B]
                                cursor-not-allowed
                              `
                            : `
                                bg-[#D8472F]
                                text-white
                                hover:bg-[#B23522]
                              `
                    }
                `}
            >

                {revealed
                    ? "✅ Claimed"
                    : "🔄 Scratch Now"
                }

            </button>

        </div>
    );
};

export default ScratchCard;