// src/Components/Pages/ClaimBookPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import {
  BookOpen,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  Shield,
  MessageCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const ClaimBookPage = () => {

  const navigate = useNavigate();

  // ===============================
  // STATES
  // ===============================

  const [mounted, setMounted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userMessage, setUserMessage] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    message: "",
    agreeTerms: false,
  });

  const [bookDetails, setBookDetails] = useState(null);


  // ===============================
  // LOAD PAGE
  // ===============================

  useEffect(() => {

    setMounted(true);

    // Get the exact book selected from Marketplace
    const savedBook = localStorage.getItem("selectedClaimBook");

    if (savedBook) {

      try {

        const book = JSON.parse(savedBook);

        setBookDetails({
          ...book,

          // Make sure these values exist
          condition:
            book.condition === "like new"
              ? "Like New"
              : book.condition === "good"
              ? "Good"
              : "Used",

          sellerRating: book.rating || 0,

          image: book.isbn
            ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
            : "",
        });

      } catch (error) {

        console.log("Error loading selected book:", error);

        setBookDetails(null);
      }

    } else {

      setBookDetails(null);
    }

  }, []);


  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Remove error message while typing
    setUserMessage("");
  };


  // ===============================
  // SUBMIT CLAIM
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setUserMessage("");

    setIsSubmitting(true);

    try {

      // ===============================
      // CHECK USER IN DATABASE
      // ===============================

      const response = await axios.post(
        "http://localhost:5000/user/checkuser",
        {
          userEmail: formData.email,
        }
      );


      // ===============================
      // USER EXISTS
      // ===============================

      if (response.status === 200) {

        console.log("USER FOUND:", response.data);

        // Small delay just for UI
        setTimeout(() => {

          setIsSubmitting(false);

          setOrderPlaced(true);

        }, 800);
      }

    } catch (error) {

      console.log("CHECK USER ERROR:", error);

      setIsSubmitting(false);

      // ===============================
      // USER DOES NOT EXIST
      // ===============================

      if (error.response?.status === 404) {

        setUserMessage(
          "No account was found with this email. Please create an account on RetroRead first."
        );

        return;
      }


      // ===============================
      // SERVER ERROR
      // ===============================

      setUserMessage(
        "Something went wrong while checking your account. Please try again."
      );
    }
  };


  // ===============================
  // LOADING BOOK
  // ===============================

  if (!bookDetails) {

    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl animate-pulse">
            📖
          </div>

          <p className="text-gray-500 mt-3">
            Loading book details...
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            className="mt-4 text-sm text-[#6B4C82] hover:underline"
          >
            Back to Marketplace
          </button>

        </div>

      </div>
    );
  }


  // ===============================
  // ORDER SUCCESS SCREEN
  // ===============================

  if (orderPlaced) {

    return (
      <div className="min-h-screen w-full bg-[#F6EFE3] flex items-center justify-center px-4">

        <div className="bg-[#FFFBF3] border border-[#E2D5BC] rounded-3xl shadow-xl max-w-lg w-full p-8 text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-[#3E6B52]/10 flex items-center justify-center mb-5">

            <CheckCircle
              size={42}
              className="text-[#3E6B52]"
            />

          </div>

          <h1 className="font-display text-3xl font-bold text-[#1E2A42]">
            Order Placed Successfully!
          </h1>

          <p className="text-[#8A7F6B] mt-3">
            Your order for{" "}
            <span className="font-semibold text-[#1E2A42]">
              {bookDetails.title}
            </span>{" "}
            has been placed.
          </p>

          <div className="mt-6 bg-[#F6EFE3] rounded-2xl p-5 text-left">

            <div className="flex gap-4">

              {bookDetails.image && (
                <img
                  src={bookDetails.image}
                  alt={bookDetails.title}
                  className="w-20 h-28 object-cover rounded-lg shadow"
                />
              )}

              <div>

                <h3 className="font-semibold text-[#1E2A42]">
                  {bookDetails.title}
                </h3>

                <p className="text-sm text-[#5B6478] mt-1">
                  {bookDetails.author}
                </p>

                <p className="text-lg font-bold text-[#6B4C82] mt-2">
                  ₹{bookDetails.price}
                </p>

                <p className="text-xs text-[#8A7F6B] mt-2">
                  Seller: {bookDetails.seller}
                </p>

              </div>

            </div>

          </div>


          {/* PAYMENT MESSAGE */}

          <div className="mt-5 p-4 bg-[#C9A567]/10 border border-[#C9A567]/30 rounded-xl">

            <p className="text-sm font-semibold text-[#1E2A42]">
              💰 Payment Information
            </p>

            <p className="text-xs text-[#5B6478] mt-1">
              You can pay the seller after the book has been delivered.
            </p>

          </div>


          <p className="text-xs text-[#8A7F6B] mt-5 flex items-center justify-center gap-1">

            <Clock size={13} />

            The seller will contact you within 24 hours.

          </p>


          <button
            onClick={() => {

              localStorage.removeItem("selectedClaimBook");

              navigate("/marketplace");

            }}
            className="mt-6 w-full py-3 bg-[#C9A567] text-[#1E2A42] rounded-full font-semibold hover:bg-[#B8934F] transition"
          >
            Back to Marketplace
          </button>

        </div>

      </div>
    );
  }


  // ===============================
  // MAIN CLAIM PAGE
  // ===============================

  return (

    <div className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 overflow-hidden">

      {/* BACKGROUND */}

      <img
        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
        alt="Library"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#F6EFE3]/60 via-[#F6EFE3]/40 to-[#3A2A18]/50" />


      {/* CARD */}

      <div
        className={`relative z-10 bg-[#FFFBF3]/90 backdrop-blur-xl border border-white/50 shadow-[0_40px_80px_-30px_rgba(30,42,66,0.4)] rounded-[32px] max-w-[520px] w-full max-h-[95vh] overflow-y-auto p-6 md:p-8 transition-all duration-700 ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >


        {/* BACK */}

        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-[#8A7F6B] hover:text-[#C9A567] transition text-sm mb-4"
        >
          <ArrowLeft size={16} />

          Back to Market
        </Link>


        {/* HEADER */}

        <div className="flex flex-col items-center text-center mb-5">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-[#C9A567]/20 blur-xl animate-pulse" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#C9A567]/10 border border-[#C9A567]/30">

              <Shield
                size={20}
                className="text-[#C9A567]"
              />

            </div>

          </div>

          <span className="font-display font-semibold text-lg text-[#1E2A42] tracking-wide mt-2">
            Claim This Book
          </span>

          <span className="text-[10px] text-[#8A7F6B] mt-0.5">
            Complete the form to claim your book
          </span>

        </div>


        {/* ===============================
            SELECTED BOOK
        =============================== */}

        <div className="flex gap-4 p-4 bg-white/30 rounded-2xl border border-white/30 mb-5">

          {bookDetails.image && (

            <img
              src={bookDetails.image}
              alt={bookDetails.title}
              className="w-20 h-28 object-cover rounded-lg shadow"
            />

          )}

          <div className="flex-1 min-w-0">

            <h3 className="font-semibold text-[#1E2A42] text-sm">
              {bookDetails.title}
            </h3>

            <p className="text-xs text-[#5B6478]">
              {bookDetails.author}
            </p>

            <div className="flex items-center gap-3 mt-1 text-xs">

              <span className="text-[#C9A567] font-semibold">
                ₹{bookDetails.price}
              </span>

              <span className="text-[#8A7F6B]">
                •
              </span>

              <span className="text-[#3E6B52]">
                {bookDetails.condition}
              </span>

            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-[#8A7F6B]">

              <User size={12} />

              {bookDetails.seller}

              <span className="text-[#C9A567]">
                ★ {bookDetails.sellerRating}
              </span>

            </div>

            <div className="flex items-center gap-1 text-xs text-[#8A7F6B]">

              <MapPin size={12} />

              {bookDetails.city}

            </div>

          </div>

        </div>


        {/* ===============================
            ERROR MESSAGE
        =============================== */}

        {userMessage && (

          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">

            <AlertCircle
              size={17}
              className="flex-shrink-0 mt-0.5"
            />

            <p>
              {userMessage}
            </p>

          </div>

        )}


        {/* ===============================
            FORM
        =============================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >


          {/* NAME + EMAIL */}

          <div className="grid grid-cols-2 gap-3">

            <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

              <User
                size={15}
                className="text-[#8A7F6B] ml-3"
              />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
              />

            </div>


            <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

              <Mail
                size={15}
                className="text-[#8A7F6B] ml-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
              />

            </div>

          </div>


          {/* PHONE */}

          <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

            <Phone
              size={15}
              className="text-[#8A7F6B] ml-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
            />

          </div>


          {/* ADDRESS */}

          <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

            <MapPin
              size={15}
              className="text-[#8A7F6B] ml-3"
            />

            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
            />

          </div>


          {/* CITY + PINCODE */}

          <div className="grid grid-cols-2 gap-3">

            <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
              />

            </div>


            <div className="flex items-center bg-white/50 border border-white/40 rounded-xl h-[46px]">

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="bg-transparent w-full px-3 h-full text-sm text-[#1E2A42] outline-none"
              />

            </div>

          </div>


          {/* MESSAGE */}

          <div className="flex items-start bg-white/50 border border-white/40 rounded-xl">

            <MessageCircle
              size={15}
              className="text-[#8A7F6B] ml-3 mt-3"
            />

            <textarea
              name="message"
              placeholder="Any message for the seller?"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent w-full px-3 py-3 h-20 text-sm text-[#1E2A42] outline-none resize-none"
            />

          </div>


          {/* TERMS */}

          <div className="flex items-start gap-2 text-xs text-[#5B6478] pt-1">

            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="h-3.5 w-3.5 mt-0.5 accent-[#C9A567]"
            />

            <span>
              I agree to the{" "}
              <span className="text-[#C9A567] font-medium">
                Claim Terms
              </span>
            </span>

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-1 bg-[#C9A567] text-[#1E2A42] rounded-full text-sm font-semibold shadow-[0_12px_28px_-10px_rgba(201,165,103,0.5)] hover:bg-[#B8934F] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >

            {isSubmitting ? (

              <>
                ⏳ Checking account...
              </>

            ) : (

              <>
                <span>
                  Submit Claim
                </span>

                <CheckCircle
                  size={15}
                />

              </>

            )}

          </button>

        </form>


        {/* FOOTER */}

        <p className="text-center text-[10px] text-[#8A7F6B] mt-4">

          <Clock
            size={12}
            className="inline mr-1"
          />

          The seller will contact you within 24 hours.

        </p>

      </div>

    </div>
  );
};

export default ClaimBookPage;