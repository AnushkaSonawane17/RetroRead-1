import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Gamepad2,
  Award,
  Coins,
  Brain,
  Target,
  Sparkles
} from 'lucide-react';
import axios from 'axios';

const features = [
  {
    name: 'Badges',
    desc: 'Collect all badges',
    path: '/gamification/badges',
    icon: Award,
    color: '#A9812F'
  },
  {
    name: 'KOINS',
    desc: 'Earn and redeem',
    path: '/gamification/koins',
    icon: Coins,
    color: '#6B8F55'
  },
  {
    name: 'Trivia',
    desc: 'Test your knowledge',
    path: '/gamification/trivia',
    icon: Brain,
    color: '#5C7A93'
  },
  {
    name: 'Guess',
    desc: 'Guess the book',
    path: '/gamification/guess',
    icon: Target,
    color: '#8B4C6D'
  },
  {
    name: 'Scratch',
    desc: 'Win prizes',
    path: '/gamification/scratch',
    icon: Sparkles,
    color: '#3E7C74'
  }
];

const GamificationPage = () => {
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);

  // ================================
  // KOINS
  // ================================

  const [koins, setKoins] = useState(0);
  const [loadingKoins, setLoadingKoins] = useState(true);

  // ================================
  // GET USER KOINS
  // ================================

  const getUserKoins = async () => {
    try {
      const userId = localStorage.getItem('userId');

      console.log("🎮 Gamification userId:", userId);

      if (!userId) {
        console.log("❌ No userId found");
        setKoins(0);
        setLoadingKoins(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/coin/balance/${userId}`
      );

      console.log(
        "🎮 GAMIFICATION KOINS RESPONSE:",
        response.data
      );

      setKoins(response.data.balance || 0);

    } catch (error) {
      console.log(
        "❌ Error getting Gamification KOINS:",
        error.response?.data || error.message
      );

      setKoins(0);

    } finally {
      setLoadingKoins(false);
    }
  };

  // ================================
  // EFFECT
  // ================================

  useEffect(() => {

    setMounted(true);

    // Get initial KOINS
    getUserKoins();

    // Listen for KOINS changes
    window.addEventListener(
      "koinsUpdated",
      getUserKoins
    );

    return () => {

      window.removeEventListener(
        "koinsUpdated",
        getUserKoins
      );

    };

  }, []);

  // ================================
  // STATS
  // ================================

  const stats = [
    {
      value: loadingKoins ? "..." : koins,
      label: 'KOINS'
    },
    {
      value: 0,
      label: 'Badges'
    },
    {
      value: 0,
      label: 'Books Read'
    }
  ];

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

        @keyframes card-rise {

          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

        }

        .card-rise {
          animation:
            card-rise
            0.5s
            cubic-bezier(0.22,1,0.36,1)
            forwards;

          opacity: 0;
        }

        @keyframes spin-slow {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }

        .spin-slow {
          animation:
            spin-slow
            7s
            linear
            infinite;
        }

      `}</style>


      {/* PAPER GRAIN */}

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />


      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


        {/* ================================
            HEADER
        ================================= */}

        <div
          className={`bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)] transition-all duration-700 ${
            mounted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
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

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">

                <Gamepad2
                  size={18}
                  className="text-[#D8472F] spin-slow"
                />

              </div>


              <div>

                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">
                  Gamification Hub
                </h1>

                <p className="text-[#8A7F6B] text-sm mt-1">
                  Earn KOINS, unlock badges, and compete with friends
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ================================
            STATS
        ================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {stats.map((s, i) => (

            <div
              key={s.label}
              className="card-rise bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)]"
              style={{
                animationDelay: `${i * 90}ms`
              }}
            >

              <div className="flex items-center justify-center gap-1.5">

                <div className="text-2xl font-display font-bold text-[#1E2A42] tabular-nums">
                  {s.value}
                </div>

              </div>


              <div className="text-xs text-[#8A7F6B] mt-0.5">
                {s.label}
              </div>

            </div>

          ))}

        </div>


        {/* ================================
            FEATURES
        ================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {features.map((f, i) => {

            const Icon = f.icon;

            return (

              <div
                key={f.name}
                onClick={() => navigate(f.path)}
                className="card-rise group bg-[#FFFBF3] p-6 rounded-2xl cursor-pointer border border-[#E2D5BC] hover:border-[#D9C7A3] shadow-[0_8px_18px_-14px_rgba(30,42,66,0.3)] hover:shadow-[0_18px_30px_-16px_rgba(30,42,66,0.35)] hover:-translate-y-1 transition-all duration-300"
                style={{
                  animationDelay: `${300 + i * 80}ms`
                }}
              >

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: f.color + '1A',
                    border: `1px solid ${f.color}55`
                  }}
                >

                  <Icon
                    size={20}
                    style={{
                      color: f.color
                    }}
                  />

                </div>


                <h3 className="font-display font-bold text-[#1E2A42] text-lg">
                  {f.name}
                </h3>


                <p className="text-[#8A7F6B] text-sm">
                  {f.desc}
                </p>


                <div
                  className="mt-3 flex items-center gap-1 text-xs font-medium group-hover:translate-x-1 transition-transform duration-300"
                  style={{
                    color: f.color
                  }}
                >

                  Explore →

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

};

export default GamificationPage;