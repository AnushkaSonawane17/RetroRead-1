import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  Award,
  BookOpen,
  Flame,
  Library,
  PenLine,
  RefreshCw,
  Brain,
  Target,
  CheckCircle2,
  Lock,
  Trophy,
} from "lucide-react";


// Change this if your backend uses a different port
const BASE_URL = "http://localhost:4000";


const badgeIcons = {
  books: BookOpen,
  streak: Flame,
  reviews: PenLine,
  exchanges: RefreshCw,
  trivia: Brain,
  guessBook: Target,
};


const BadgesPage = () => {

  const navigate = useNavigate();

  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);


  const userId = localStorage.getItem("userId");


  useEffect(() => {
    getBadges();
  }, []);


  const getBadges = async () => {

    try {

      setLoading(true);

      if (userId) {

        const response = await axios.get(
          `${BASE_URL}/badge/user/${userId}`
        );

        setBadges(response.data.badges || []);

      } else {

        const response = await axios.get(
          `${BASE_URL}/badge/badges`
        );

        const allBadges = response.data.badges || [];

        setBadges(
          allBadges.map((badge) => ({
            badgeId: badge,
            progress: 0,
            unlocked: false,
          }))
        );
      }

    } catch (error) {

      console.log("Error getting badges:", error);

    } finally {

      setLoading(false);

    }
  };


  const unlockedCount = badges.filter(
    (badge) => badge.unlocked
  ).length;


  const totalCount = badges.length;


  const completion =
    totalCount === 0
      ? 0
      : Math.round(
          (unlockedCount / totalCount) * 100
        );


  if (loading) {

    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">

        <p className="text-[#1E2A42] text-xl">
          Loading badges...
        </p>

      </div>
    );

  }


  return (

    <div className="min-h-screen w-full bg-[#F6EFE3] py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">


        {/* HEADER */}

        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#F6EFE3] text-[#1E2A42] rounded-full text-sm border border-[#E2D5BC] hover:border-[#D8472F]/50 transition"
            >

              <ArrowLeft size={14} />

              Back

            </button>


            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#A9812F]/10 border border-[#A9812F]/30">

                <Award
                  size={18}
                  className="text-[#A9812F]"
                />

              </div>


              <div>

                <h1 className="font-bold text-3xl text-[#1E2A42]">
                  My Badges
                </h1>

                <p className="text-[#8A7F6B] text-sm mt-1">
                  Collect badges by completing achievements
                </p>

              </div>

            </div>

          </div>

        </div>



        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">


          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC]">

            <div className="text-3xl font-bold text-[#6B8F55]">
              {unlockedCount}
            </div>

            <div className="text-xs text-[#8A7F6B]">
              Unlocked
            </div>

          </div>


          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC]">

            <div className="text-3xl font-bold text-[#8A7F6B]">
              {totalCount - unlockedCount}
            </div>

            <div className="text-xs text-[#8A7F6B]">
              Locked
            </div>

          </div>


          <div className="bg-[#FFFBF3] rounded-xl p-4 text-center border border-[#E2D5BC]">

            <div className="text-3xl font-bold text-[#A9812F]">
              {completion}%
            </div>

            <div className="text-xs text-[#8A7F6B]">
              Completion
            </div>

          </div>


          <div className="bg-[#A9812F]/[0.08] rounded-xl p-4 text-center border border-[#A9812F]/25 flex flex-col items-center justify-center">

            <Trophy
              size={26}
              className="text-[#A9812F]"
            />

            <div className="text-xs text-[#8A7F6B] mt-1">
              Keep Going!
            </div>

          </div>

        </div>



        {/* BADGES */}

        {badges.length === 0 ? (

          <div className="bg-[#FFFBF3] rounded-2xl p-10 text-center border border-[#E2D5BC]">

            <Award
              size={45}
              className="mx-auto text-[#A9812F] mb-3"
            />

            <h2 className="text-xl font-bold text-[#1E2A42]">
              No badges found
            </h2>

            <p className="text-[#8A7F6B] mt-2">
              Start completing achievements to earn badges.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {badges.map((userBadge) => {

              const badge = userBadge.badgeId;

              if (!badge) return null;


              const Icon =
                badgeIcons[badge.requirementType] || Award;


              const progress =
                userBadge.progress || 0;


              const target =
                badge.target || 1;


              const progressPercentage = Math.min(
                (progress / target) * 100,
                100
              );


              return (

                <div
                  key={userBadge._id}
                  className={`rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
                    userBadge.unlocked
                      ? "bg-[#A9812F]/[0.07] border-2 border-[#A9812F]/30"
                      : "bg-[#FFFBF3] border-2 border-[#E2D5BC] opacity-70"
                  }`}
                >


                  {/* ICON */}

                  <div
                    className={`flex h-14 w-14 mx-auto items-center justify-center rounded-full mb-3 ${
                      userBadge.unlocked
                        ? "bg-[#A9812F]/15 text-[#A9812F]"
                        : "bg-[#EDE2CE] text-[#8A7F6B]"
                    }`}
                  >

                    <Icon size={22} />

                  </div>


                  {/* NAME */}

                  <h3 className="font-bold text-[#1E2A42] text-base">
                    {badge.name}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="text-sm text-[#8A7F6B] mt-1">
                    {badge.description}
                  </p>


                  {/* UNLOCKED */}

                  {userBadge.unlocked ? (

                    <div className="mt-3">

                      <span className="inline-flex items-center gap-1 text-xs text-[#6B8F55] bg-[#6B8F55]/10 px-3 py-1 rounded-full border border-[#6B8F55]/25">

                        <CheckCircle2 size={12} />

                        Unlocked

                      </span>

                    </div>

                  ) : (

                    /* LOCKED */

                    <div className="mt-3">

                      <div className="w-full h-2 bg-[#EDE2CE] rounded-full mb-2 overflow-hidden">

                        <div
                          className="h-full bg-[#A9812F] rounded-full transition-all duration-700"
                          style={{
                            width: `${progressPercentage}%`,
                          }}
                        />

                      </div>


                      <span className="inline-flex items-center gap-1 text-xs text-[#8A7F6B]">

                        <Lock size={11} />

                        {progress}/{target}

                      </span>

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

};


export default BadgesPage;