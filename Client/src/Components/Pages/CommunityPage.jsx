import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Globe2, Plus, BookOpen, Pin, MessageCircle, Heart,
  Trophy, Sprout, UserPlus, Search, Star, Sparkles, Library, Feather,
} from 'lucide-react';

/**
 * CommunityPage — matches the site's warm-paper / ink-navy / coral token
 * system. Signature idea: each club genre gets its own "spine color," like
 * the way a real bookstore or library color-codes sections, instead of
 * repeating one accent everywhere.
 */

const genreStyle = {
  Fiction:     { icon: BookOpen, ring: "#D8472F", tint: "#D8472F1A" },
  "Self-Help": { icon: Sprout,   ring: "#A9812F", tint: "#A9812F1A" },
  Fantasy:     { icon: Sparkles, ring: "#3E7C74", tint: "#3E7C741A" },
  Classics:    { icon: Library,  ring: "#1E2A42", tint: "#1E2A421A" },
  "Non-Fiction": { icon: Globe2, ring: "#6B8F55", tint: "#6B8F551A" },
  Drama:       { icon: Feather,  ring: "#8B4C6D", tint: "#8B4C6D1A" },
};

const clubs = [
  { id: 1, name: "Fiction Lovers", members: 234, books: 45, description: "Discussing the best fiction from around the world", tag: "Fiction", active: true },
  { id: 2, name: "Self-Help Readers", members: 189, books: 32, description: "Improving ourselves one book at a time", tag: "Self-Help", active: true },
  { id: 3, name: "Fantasy Guild", members: 156, books: 28, description: "Exploring magical worlds and epic adventures", tag: "Fantasy", active: true },
  { id: 4, name: "Classics Club", members: 112, books: 20, description: "Reading and discussing timeless literature", tag: "Classics", active: true },
  { id: 5, name: "Non-Fiction Explorers", members: 98, books: 18, description: "Learning from real-world stories and facts", tag: "Non-Fiction", active: false },
  { id: 6, name: "Drama Readers", members: 76, books: 15, description: "Exploring plays and dramatic works", tag: "Drama", active: false },
];

const discussions = [
  { id: 1, title: "What are you reading this week?", author: "Ananya Rao", replies: 24, likes: 45, time: "2 hours ago", pinned: true },
  { id: 2, title: "Best book to start your morning with?", author: "Rohan Mehta", replies: 18, likes: 32, time: "5 hours ago", pinned: false },
  { id: 3, title: "Book recommendations for beginners", author: "Priya Nair", replies: 31, likes: 56, time: "1 day ago", pinned: false },
  { id: 4, title: "How many books do you read per month?", author: "Karan Verma", replies: 42, likes: 78, time: "3 days ago", pinned: false },
];

const members = [
  { id: 1, name: "Archie Bhagchanani", books: 172, rating: 4.9, avatar: "AB" },
  { id: 2, name: "Komal Adhave", books: 134, rating: 4.8, avatar: "KA" },
  { id: 3, name: "Anushka Sonwane", books: 98, rating: 4.8, avatar: "AS" },
  { id: 4, name: "Samruddhi Bansode", books: 61, rating: 4.7, avatar: "SB" },
];

const activeNow = ["Ananya", "Rohan", "Priya", "Karan", "Meera", "Aditya"];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const filteredClubs = clubs
    .filter((c) => (activeTab === 'all' ? true : c.active))
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain {
          background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      <div className="font-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* ===== Header ===== */}
        <div className="bg-[#FFFBF3] rounded-2xl p-6 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">
                <Users size={20} className="text-[#D8472F]" />
              </div>
              <div>
                <h1 className="font-display font-bold text-3xl text-[#1E2A42]">Community</h1>
                <p className="text-[#8A7F6B] text-sm mt-1">Connect with fellow readers and join meaningful discussions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFFBF3] rounded-full text-sm text-[#1E2A42] border border-[#E2D5BC] hover:border-[#D8472F]/50 transition">
                <Globe2 size={15} /> Find Groups
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(216,71,47,0.6)] hover:bg-[#B23522] transition">
                <Plus size={15} /> Create Club
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7F6B]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reading clubs…"
              className="w-full bg-[#F6EFE3] border border-[#E2D5BC] rounded-full pl-11 pr-4 py-2.5 text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] focus:outline-none focus:border-[#D8472F]/60 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ===== LEFT COLUMN ===== */}
          <div className="lg:col-span-2 space-y-8">

            {/* ===== Reading Clubs ===== */}
            <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="flex justify-between items-end mb-1">
                <div>
                  <h2 className="font-display font-semibold text-lg text-[#1E2A42]">Reading Clubs</h2>
                  <p className="text-xs text-[#8A7F6B]">Join clubs that match your interests</p>
                </div>
                <Link to="/clubs" className="text-[#D8472F] text-xs font-medium hover:underline">View all clubs →</Link>
              </div>

              <div className="flex gap-2 mt-4 mb-5">
                <button
                  className={`text-sm font-medium transition px-3 py-1 rounded-full ${
                    activeTab === 'all' ? 'bg-[#D8472F]/10 text-[#D8472F]' : 'text-[#8A7F6B] hover:text-[#1E2A42]'
                  }`}
                  onClick={() => setActiveTab('all')}
                >
                  All
                </button>
                <button
                  className={`text-sm font-medium transition px-3 py-1 rounded-full ${
                    activeTab === 'active' ? 'bg-[#D8472F]/10 text-[#D8472F]' : 'text-[#8A7F6B] hover:text-[#1E2A42]'
                  }`}
                  onClick={() => setActiveTab('active')}
                >
                  Active
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {filteredClubs.map((club) => {
                  const style = genreStyle[club.tag];
                  const Icon = style.icon;
                  return (
                    <div
                      key={club.id}
                      className="bg-[#F6EFE3] rounded-xl p-4 border border-[#E2D5BC] hover:border-[#D9C7A3] hover:shadow-[0_10px_20px_-12px_rgba(30,42,66,0.3)] transition cursor-pointer group flex flex-col"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                          style={{ backgroundColor: style.tint, borderColor: style.ring + "55" }}
                        >
                          <Icon size={18} style={{ color: style.ring }} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#1E2A42] group-hover:text-[#D8472F] transition">{club.name}</h3>
                          <p className="text-sm text-[#5B6478] mt-0.5">{club.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-dashed border-[#D9C7A3]">
                        <div className="flex gap-4 text-xs text-[#8A7F6B]">
                          <span className="flex items-center gap-1"><Users size={12} /> {club.members}</span>
                          <span className="flex items-center gap-1"><BookOpen size={12} /> {club.books}</span>
                          {club.active && (
                            <span className="flex items-center gap-1 text-[#6B8F55]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#6B8F55]" /> Active
                            </span>
                          )}
                        </div>
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: style.tint, color: style.ring }}
                        >
                          {club.tag}
                        </span>
                      </div>

                      <button
                        className="mt-3 w-full py-2 rounded-full text-sm font-semibold transition"
                        style={{ backgroundColor: style.ring, color: "#FFFBF3" }}
                      >
                        Join Club
                      </button>
                    </div>
                  );
                })}
                {filteredClubs.length === 0 && (
                  <p className="text-sm text-[#8A7F6B] col-span-2 text-center py-6">No clubs match "{query}".</p>
                )}
              </div>
            </div>

            {/* ===== Discussions ===== */}
            <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display font-semibold text-lg text-[#1E2A42]">Recent Discussions</h2>
                <Link to="/discussions" className="text-[#D8472F] text-sm font-medium hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {discussions.map((disc) => (
                  <div
                    key={disc.id}
                    className={`bg-[#F6EFE3] rounded-xl p-4 border ${
                      disc.pinned ? 'border-[#D8472F]/40' : 'border-[#E2D5BC]'
                    } hover:border-[#D9C7A3] hover:shadow-[0_10px_20px_-12px_rgba(30,42,66,0.3)] transition cursor-pointer`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {disc.pinned && <Pin size={12} className="text-[#D8472F]" />}
                          <h3 className="font-semibold text-[#1E2A42] hover:text-[#D8472F] transition truncate">{disc.title}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#8A7F6B]">
                          <span>{disc.author}</span>
                          <span className="flex items-center gap-1"><MessageCircle size={12} /> {disc.replies}</span>
                          <span className="flex items-center gap-1"><Heart size={12} /> {disc.likes}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#8A7F6B] shrink-0">{disc.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN ===== */}
          <div className="space-y-6">

            {/* ===== Top Members ===== */}
            <div className="bg-[#FFFBF3] rounded-2xl p-5 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg text-[#1E2A42] flex items-center gap-2">
                  <Trophy size={16} className="text-[#A9812F]" /> Top Members
                </h2>
                <Link to="/leaderboard" className="text-[#D8472F] text-xs font-medium hover:underline">View leaderboard</Link>
              </div>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="bg-[#F6EFE3] rounded-xl p-3 border border-[#E2D5BC] flex items-center gap-3 hover:border-[#D9C7A3] transition">
                    <div className="w-10 h-10 rounded-full bg-[#A9812F]/15 border border-[#A9812F]/40 flex items-center justify-center text-[#A9812F] font-display font-bold text-sm shrink-0">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#1E2A42] text-sm truncate">{member.name}</div>
                      <div className="text-xs text-[#8A7F6B]">{member.books} books</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#A9812F] shrink-0">
                      <Star size={12} fill="#A9812F" /> {member.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Join Community CTA ===== */}
            <div className="rounded-2xl p-5 border border-[#D8472F]/25 text-center bg-[#D8472F]/[0.06]">
              <div className="flex justify-center mb-2">
                <Sprout size={26} className="text-[#6B8F55]" />
              </div>
              <h3 className="font-display font-semibold text-[#1E2A42]">Join the Community</h3>
              <p className="text-sm text-[#8A7F6B] mt-1">Connect with readers who share your passion for books</p>
              <button className="mt-3 px-6 py-2 bg-[#D8472F] text-[#FFFBF3] rounded-full text-sm font-semibold shadow-[0_8px_18px_-8px_rgba(216,71,47,0.6)] hover:bg-[#B23522] transition">
                Get Started
              </button>
            </div>

            {/* ===== Active Now ===== */}
            <div className="bg-[#FFFBF3] rounded-2xl p-4 border border-[#E2D5BC] shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]">
              <h3 className="text-sm font-semibold text-[#1E2A42] mb-2.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6B8F55] inline-block" /> Active Now
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeNow.map((name) => (
                  <span key={name} className="text-xs text-[#5B6478] bg-[#F6EFE3] border border-[#E2D5BC] px-2.5 py-1 rounded-full">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;