import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Coins,
  Gift,
  Wallet,
  BookOpen,
  Flame,
  Brain,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";

const earnMethods = [
  { icon: BookOpen, label: "Read Book", koins: "+50" },
  { icon: Flame, label: "Streak", koins: "+15" },
  { icon: Brain, label: "Trivia", koins: "+20" },
  { icon: Sparkles, label: "Scratch Card", koins: "+100" },
];

function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(target);
  const prevTarget = React.useRef(target);

  useEffect(() => {
    const from = prevTarget.current;
    prevTarget.current = target;

    let start = null;

    const step = (ts) => {
      if (!start) start = ts;

      const p = Math.min((ts - start) / duration, 1);

      setValue(Math.floor(from + (target - from) * p));

      if (p < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
}

const KoinsPage = () => {
  const navigate = useNavigate();

  const [koins, setKoins] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showBonus, setShowBonus] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const displayKoins = useCountUp(koins);

  // Get logged-in user's ID
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setMounted(true);
  }, []);

  // -----------------------------------------
  // GET BALANCE + TRANSACTIONS
  // -----------------------------------------
  useEffect(() => {
    const fetchKoinsData = async () => {
      try {
        if (!userId) {
          console.log("User ID not found in localStorage");
          return;
        }

        // Get KOINS balance
        const balanceResponse = await axios.get(
          `http://localhost:5000/coin/balance/${userId}`
        );

        // Get transaction history
        const transactionResponse = await axios.get(
          `http://localhost:5000/coin/transactions/${userId}`
        );

        setKoins(balanceResponse.data.balance);

        setTransactions(
          transactionResponse.data.transactions || []
        );

      } catch (error) {
        console.log("Error fetching KOINS data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKoinsData();
  }, [userId]);

  // -----------------------------------------
  // DAILY BONUS
  // -----------------------------------------
  const handleDailyBonus = async () => {
    try {
      if (!userId) {
        alert("User ID not found. Please login again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/coin/dailybonus",
        {
          userId: userId,
        }
      );

      // Update balance from backend
      setKoins(response.data.balance);

      // Show +25 animation
      setShowBonus(true);

      setTimeout(() => {
        setShowBonus(false);
      }, 2400);

      // Refresh transactions
      const transactionResponse = await axios.get(
        `http://localhost:5000/coin/transactions/${userId}`
      );

      setTransactions(
        transactionResponse.data.transactions || []
      );

    } catch (error) {
      console.log("Daily bonus error:", error);

      alert(
        error.response?.data?.Message ||
        "Unable to claim daily bonus"
      );
    }
  };

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

        @keyframes float-y {
          0%,100% {
            transform: translateY(0) rotate(-3deg);
          }

          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }

        .float-y {
          animation: float-y 3.4s ease-in-out infinite;
        }

        @keyframes pop-badge {
          0% {
            transform: scale(0) translateY(6px);
            opacity: 0;
          }

          60% {
            transform: scale(1.15) translateY(-2px);
            opacity: 1;
          }

          100% {
            transform: scale(1) translateY(0);
          }
        }

        .pop-badge {
          animation: pop-badge 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }

        .seal-btn {
          position: relative;
          overflow: hidden;
        }

        @keyframes shimmer-sweep {
          0% {
            transform: translateX(-120%) skewX(-15deg);
          }

          100% {
            transform: translateX(220%) skewX(-15deg);
          }
        }

        .seal-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.5),
            transparent
          );
          transform: translateX(-120%) skewX(-15deg);
        }

        .seal-btn:hover::after {
          animation: shimmer-sweep 0.8s ease forwards;
        }

        @keyframes card-rise {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-rise {
          animation: card-rise 0.4s ease forwards;
          opacity: 0;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ================= HEADER ================= */}

        <div
          className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition"
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6B8F55]/10 border border-[#6B8F55]/30">
                <Coins
                  size={18}
                  className="text-[#6B8F55]"
                />
              </div>

              <div>

                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">
                  My KOINS
                </h1>

                <p className="text-[#8A7F6B] text-sm mt-1">
                  Earn KOINS by reading, playing games, and more
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================= BALANCE CARD ================= */}

        <div className="relative bg-[#FFFBF3] rounded-2xl p-8 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] text-center overflow-hidden">

          <div className="absolute -top-10 -right-10 text-[#6B8F55]/10">
            <Coins size={140} />
          </div>

          <div className="relative z-10">

            <Coins
              size={44}
              className="mx-auto text-[#6B8F55] float-y"
            />

            <div className="text-5xl font-display font-bold text-[#1E2A42] mt-2 tabular-nums">

              {loading
                ? "..."
                : displayKoins.toLocaleString()
              }

            </div>

            <div className="text-[#8A7F6B] mt-1">
              Total KOINS
            </div>


            <div className="flex gap-4 justify-center mt-5">

              {/* DAILY BONUS BUTTON */}

              <button
                onClick={handleDailyBonus}
                className="seal-btn relative flex items-center gap-2 px-6 py-2.5 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_10px_20px_-10px_rgba(216,71,47,0.55)] hover:bg-[#B23522] transition"
              >

                <Gift size={15} />

                Daily Bonus

                {showBonus && (
                  <span className="pop-badge absolute -top-3 -right-3 bg-[#6B8F55] text-[#FFFBF3] text-xs px-2.5 py-1 rounded-full shadow-md">
                    +25!
                  </span>
                )}

              </button>


              {/* REDEEM */}

              <button
                className="flex items-center gap-2 px-6 py-2.5 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition"
              >

                <Wallet size={15} />

                Redeem

              </button>

            </div>

          </div>

        </div>


        {/* ================= HOW TO EARN ================= */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {earnMethods.map((item, i) => (

            <div
              key={item.label}
              className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:-translate-y-1 hover:shadow-[0_14px_24px_-16px_rgba(30,42,66,0.35)] transition-all duration-300"
              style={{
                animationDelay: `${i * 90}ms`,
              }}
            >

              <item.icon
                size={22}
                className="mx-auto text-[#A9812F] mb-1"
              />

              <div className="text-xs font-semibold text-[#1E2A42]">
                {item.label}
              </div>

              <div className="text-[10px] text-[#8A7F6B]">
                {item.koins} KOINS
              </div>

            </div>

          ))}

        </div>


        {/* ================= TRANSACTIONS ================= */}

        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">

          <h3 className="font-display font-semibold text-lg text-[#1E2A42] mb-4">
            Recent Transactions
          </h3>


          <div className="space-y-3 max-h-80 overflow-y-auto">

            {loading ? (

              <div className="text-center text-[#8A7F6B] py-6">
                Loading transactions...
              </div>

            ) : transactions.length === 0 ? (

              <div className="text-center text-[#8A7F6B] py-6">
                No transactions yet.
              </div>

            ) : (

              transactions.map((tx) => (

                <div
                  key={tx._id}
                  className="bg-[#F6EFE3] rounded-xl p-3 flex items-center justify-between border border-[#E2D5BC] hover:border-[#D9C7A3] transition"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#A9812F]/10 text-[#A9812F]">

                      <Coins size={16} />

                    </div>


                    <div>

                      <div className="font-medium text-[#1E2A42] text-sm">
                        {tx.type}
                      </div>

                      <div className="text-xs text-[#8A7F6B]">
                        {tx.createdAt
                          ? new Date(tx.createdAt).toLocaleDateString()
                          : "Recently"
                        }
                      </div>

                    </div>

                  </div>


                  <div className="flex items-center gap-1 font-display font-bold text-[#6B8F55]">

                    <ArrowUpRight size={14} />

                    +{tx.coins}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default KoinsPage;