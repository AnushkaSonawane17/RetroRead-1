import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { path } from "framer-motion/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGamificationMenu, setShowGamificationMenu] = useState(false);
  const [koins, setKoins] = useState(0);

  const navigate = useNavigate();

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },
  { name: "Library", path: "/library" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Orders", path: "/orders" },
  { name: "Exchange", path: "/exchange" },
];

  const gamificationLinks = [
    { name: "🏅 Badges", path: "/gamification/badges" },
    { name: "⭐ KOINS", path: "/gamification/koins" },
    { name: "🧠 Trivia", path: "/gamification/trivia" },
    { name: "🎯 Guess The Book", path: "/gamification/guess" },
    { name: "🎰 Scratch Cards", path: "/gamification/scratch" },
  ];

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
  // GET CURRENT KOINS
  // ==========================================

  const getUserKoins = useCallback(async () => {
    try {
      const userId = getUserId();

      if (!userId) {
        setKoins(0);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/coin/balance/${userId}`
      );

      console.log("NAVBAR KOINS:", response.data);

      setKoins(Number(response.data.balance) || 0);

    } catch (error) {
      console.log("Navbar KOINS error:", error);
    }
  }, []);

  // ==========================================
  // LOAD + LISTEN FOR KOINS UPDATES
  // ==========================================

  useEffect(() => {
    // Get balance when Navbar loads
    getUserKoins();

    // Listen for custom event from games
    const handleKoinsUpdated = () => {
      console.log("KOINS UPDATED EVENT RECEIVED");

      getUserKoins();
    };

    window.addEventListener(
      "koinsUpdated",
      handleKoinsUpdated
    );

    // Also refresh when browser storage changes
    window.addEventListener(
      "storage",
      handleKoinsUpdated
    );

    // Safety refresh every 2 seconds
    const interval = setInterval(() => {
      getUserKoins();
    }, 2000);

    return () => {
      window.removeEventListener(
        "koinsUpdated",
        handleKoinsUpdated
      );

      window.removeEventListener(
        "storage",
        handleKoinsUpdated
      );

      clearInterval(interval);
    };

  }, [getUserKoins]);


  // ==========================================
  // GAMIFICATION CLICK
  // ==========================================

  const handleGamificationClick = (path) => {
    setShowGamificationMenu(false);
    setIsOpen(false);
    navigate(path);
  };


  return (
    <nav className="bg-[#1a0f0a]/95 backdrop-blur-md border-b border-[#D4A017]/10 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
          >

            <div className="w-9 h-9 bg-gradient-to-r from-[#D4A017] to-[#8B6914] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4A017]/20">

              <span className="text-[#1a0f0a] font-bold text-lg">
                R
              </span>

            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-[#D4A017] to-[#8B6914] bg-clip-text text-transparent">
              RetroRead
            </span>

          </Link>


          {/* DESKTOP NAVIGATION */}

          <div className="hidden md:flex items-center gap-6">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className="text-[#D4A017]/70 hover:text-[#D4A017] font-medium transition-colors text-sm"
              >
                {link.name}
              </Link>

            ))}


            {/* GAMIFICATION */}

            <div className="relative">

              <button
                onClick={() =>
                  setShowGamificationMenu(
                    !showGamificationMenu
                  )
                }
                className="text-[#D4A017]/70 hover:text-[#D4A017] font-medium transition-colors text-sm flex items-center gap-1"
              >

                🎮 Gamification

                <span className="text-[10px]">
                  ▼
                </span>

              </button>


              {showGamificationMenu && (

                <div className="absolute top-full left-0 mt-2 w-52 bg-[#2d1a0e] rounded-xl shadow-2xl border border-[#D4A017]/10 py-2 z-50">

                  {gamificationLinks.map((item) => (

                    <button
                      key={item.path}
                      onClick={() =>
                        handleGamificationClick(item.path)
                      }
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#D4A017]/70 hover:text-[#D4A017] hover:bg-[#D4A017]/10 transition"
                    >
                      {item.name}
                    </button>

                  ))}

                </div>

              )}

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex items-center gap-3">

            {/* KOINS */}

            <div className="hidden md:flex items-center gap-1.5 bg-[#D4A017]/10 px-3 py-1.5 rounded-full border border-[#D4A017]/10">

              <span className="text-[#D4A017] text-sm">
                ⭐
              </span>

              <span className="font-bold text-[#f5ede4] text-sm">
                {koins.toLocaleString()}
              </span>

            </div>


            {/* SIGN IN */}

            <Link to="/login">

              <button className="hidden md:block px-4 py-1.5 text-[#D4A017] text-sm font-medium hover:bg-[#D4A017]/10 rounded-full transition">

                Sign In

              </button>

            </Link>


            {/* GET STARTED */}

            <Link to="/register">

              <button className="px-5 py-1.5 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold shadow-lg shadow-[#D4A017]/20 hover:shadow-[#D4A017]/40 transition">

                Get Started

              </button>

            </Link>


            {/* MOBILE BUTTON */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#D4A017]/10 transition"
            >

              <svg
                className="w-6 h-6 text-[#f5ede4]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >

                {isOpen ? (

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />

                ) : (

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />

                )}

              </svg>

            </button>

          </div>

        </div>


        {/* MOBILE MENU */}

        {isOpen && (

          <div className="md:hidden py-4 border-t border-[#D4A017]/10">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className="block px-4 py-3 text-[#D4A017]/70 hover:text-[#D4A017] hover:bg-[#D4A017]/5 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>

            ))}


            <div className="px-4 py-2">

              <p className="text-[#D4A017]/50 text-xs font-semibold uppercase tracking-wider mb-2">
                🎮 Gamification
              </p>

              {gamificationLinks.map((item) => (

                <button
                  key={item.path}
                  onClick={() =>
                    handleGamificationClick(item.path)
                  }
                  className="block w-full text-left py-2.5 text-sm text-[#D4A017]/60 hover:text-[#D4A017] transition"
                >
                  {item.name}
                </button>

              ))}

            </div>


            {/* MOBILE KOINS */}

            <div className="px-4 pt-4 border-t border-[#D4A017]/10 mt-2">

              <div className="flex items-center gap-2 bg-[#D4A017]/10 px-4 py-2 rounded-full mb-3">

                <span className="text-[#D4A017]">
                  ⭐
                </span>

                <span className="font-bold text-[#f5ede4]">
                  {koins.toLocaleString()} KOINS
                </span>

              </div>


              <div className="flex gap-2">

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >

                  <button className="w-full py-2 text-[#D4A017] text-sm font-medium border border-[#D4A017]/20 rounded-full hover:bg-[#D4A017]/10 transition">
                    Sign In
                  </button>

                </Link>


                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >

                  <button className="w-full py-2 bg-gradient-to-r from-[#D4A017] to-[#8B6914] text-[#1a0f0a] rounded-full text-sm font-semibold">
                    Get Started
                  </button>

                </Link>

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;