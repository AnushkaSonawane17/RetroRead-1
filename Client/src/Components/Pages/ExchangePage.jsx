import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RefreshCw,
  MapPin,
  User,
  Star,
  Clock,
  CheckCircle2,
  Plus,
  Store,
  BookOpen,
  X,
  Trash2,
  Check,
  Mail,
  Phone,
  MessageCircle,
  Shield
} from 'lucide-react';

const coverUrl = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

// ============================================
// STATUS STYLES
// ============================================

const statusStyle = {
  available: {
    badge: "bg-[#6B8F55]",
    text: "text-[#6B8F55]",
    tint: "bg-[#6B8F55]/10 border-[#6B8F55]/30",
    label: "Available"
  },

  pending: {
    badge: "bg-[#A9812F]",
    text: "text-[#A9812F]",
    tint: "bg-[#A9812F]/10 border-[#A9812F]/30",
    label: "Pending"
  },

  completed: {
    badge: "bg-[#3E7C74]",
    text: "text-[#3E7C74]",
    tint: "bg-[#3E7C74]/10 border-[#3E7C74]/30",
    label: "Completed"
  }
};

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Kochi"
];

// ============================================
// MAIN COMPONENT
// ============================================

const ExchangePage = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("available");
  const [userRole, setUserRole] = useState("buyer");
  const [city, setCity] = useState("Mumbai");
  const [pinBounce, setPinBounce] = useState(0);
  const [mounted, setMounted] = useState(false);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================
  // REQUEST FORM
  // ============================================

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [requestForm, setRequestForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    agreeTerms: false
  });

  // ============================================
  // SELLER LIST MODAL
  // ============================================

  const [showListModal, setShowListModal] = useState(false);

  const [listForm, setListForm] = useState({
    title: "",
    author: "",
    isbn: "",
    condition: "good",
    city: "",
    description: ""
  });

  // ============================================
  // SUCCESS MESSAGE
  // ============================================

  const [successMessage, setSuccessMessage] = useState("");

  // ============================================
  // MOCK BOOKS
  // ============================================

  const mockBooks = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      owner: "Ananya Rao",
      ownerId: "seller1",
      city: "Mumbai",
      distance: "2.3 km",
      isbn: "9780735211292",
      status: "available",
      rating: 4.9,
      condition: "Like New"
    },

    {
      id: 2,
      title: "Ikigai",
      author: "Héctor García",
      owner: "Rohan Mehta",
      ownerId: "seller2",
      city: "Delhi",
      distance: "5.1 km",
      isbn: "9780143130727",
      status: "available",
      rating: 4.7,
      condition: "Good"
    },

    {
      id: 3,
      title: "Sapiens",
      author: "Yuval N. Harari",
      owner: "Karan Verma",
      ownerId: "seller4",
      city: "Pune",
      distance: "1.8 km",
      isbn: "9780062316097",
      status: "available",
      rating: 4.8,
      condition: "Good"
    },

    {
      id: 4,
      title: "The Alchemist",
      author: "Paulo Coelho",
      owner: "Sneha Joshi",
      ownerId: "seller7",
      city: "Kolkata",
      distance: "1.2 km",
      isbn: "9780062315007",
      status: "available",
      rating: 4.8,
      condition: "Like New"
    },

    {
      id: 5,
      title: "Project Hail Mary",
      author: "Andy Weir",
      owner: "Arjun Reddy",
      ownerId: "seller11",
      city: "Mumbai",
      distance: "4.8 km",
      isbn: "9780593135204",
      status: "available",
      rating: 4.9,
      condition: "Like New"
    },

    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      owner: "Yash Malhotra",
      ownerId: "seller13",
      city: "Bengaluru",
      distance: "2.0 km",
      isbn: "9780441013593",
      status: "available",
      rating: 4.9,
      condition: "Good"
    },

    {
      id: 7,
      title: "Meditations",
      author: "Marcus Aurelius",
      owner: "Aditya Kulkarni",
      ownerId: "seller6",
      city: "Chennai",
      distance: "2.9 km",
      isbn: "9780140449334",
      status: "pending",
      rating: 4.5,
      condition: "Used"
    },

    {
      id: 8,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      owner: "Meera Iyer",
      ownerId: "seller5",
      city: "Hyderabad",
      distance: "4.2 km",
      isbn: "9780857197689",
      status: "completed",
      rating: 4.9,
      condition: "Like New"
    },

    {
      id: 9,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      owner: "Ishaan Kapoor",
      ownerId: "seller9",
      city: "Jaipur",
      distance: "2.6 km",
      isbn: "9780374533557",
      status: "available",
      rating: 4.8,
      condition: "Good"
    },

    {
      id: 10,
      title: "Deep Work",
      author: "Cal Newport",
      owner: "Priya Nair",
      ownerId: "seller3",
      city: "Bengaluru",
      distance: "3.7 km",
      isbn: "9781455586691",
      status: "pending",
      rating: 4.6,
      condition: "Used"
    }
  ];

  // ============================================
  // FETCH BOOKS
  // ============================================

  const fetchBooks = async () => {

    try {

      setLoading(true);

      await new Promise(resolve =>
        setTimeout(resolve, 500)
      );

      setBooks(mockBooks);

    } catch (err) {

      console.error("Error fetching books:", err);

    } finally {

      setLoading(false);

    }

  };

  // ============================================
  // OPEN REQUEST FORM
  // ============================================

  const handleBookClick = (book) => {

    // Don't allow request on own book
    if (book.ownerId === "currentUser") {
      return;
    }

    // Only available books can be requested
    if (book.status !== "available") {
      return;
    }

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setSelectedBook(book);

    setRequestForm({
      fullName: localStorage.getItem("userName") || "",
      email: localStorage.getItem("userEmail") || "",
      phone: "",
      city: city,
      message: "",
      agreeTerms: false
    });

    setShowRequestForm(true);
  };

  // ============================================
  // SUBMIT EXCHANGE REQUEST
  // ============================================

  const handleSubmitRequest = async (e) => {

    e.preventDefault();

    if (!selectedBook) {
      return;
    }

    try {

      setSubmitting(true);

      await new Promise(resolve =>
        setTimeout(resolve, 800)
      );

      // ----------------------------------------
      // STORE REQUEST INFORMATION
      // ----------------------------------------

      const requestData = {
        requesterName: requestForm.fullName,
        requesterEmail: requestForm.email,
        requesterPhone: requestForm.phone,
        requesterCity: requestForm.city,
        message: requestForm.message,
        requestedAt: new Date().toISOString()
      };

      // ----------------------------------------
      // UPDATE BOOK
      // ----------------------------------------

      setBooks(prevBooks =>

        prevBooks.map(book => {

          if (book.id === selectedBook.id) {

            return {
              ...book,

              status: "pending",

              requestedBy: "You",

              requestDetails: requestData
            };

          }

          return book;

        })

      );

      // ----------------------------------------
      // SUCCESS
      // ----------------------------------------

      setShowRequestForm(false);

      setSelectedBook(null);

      setSuccessMessage(
        "✅ Exchange request sent successfully!"
      );

      setTimeout(() => {

        setSuccessMessage("");

      }, 3000);

      // Automatically show My Requests
      setActiveTab("my-requests");

    } catch (error) {

      console.error(
        "Error submitting exchange request:",
        error
      );

    } finally {

      setSubmitting(false);

    }

  };

  // ============================================
  // SELLER: LIST BOOK
  // ============================================

  const handleListBook = async (bookData) => {

    try {

      setSubmitting(true);

      await new Promise(resolve =>
        setTimeout(resolve, 500)
      );

      const newBook = {

        id: Date.now(),

        ...bookData,

        owner:
          localStorage.getItem("userName") ||
          "You",

        ownerId: "currentUser",

        status: "available",

        rating: 0,

        distance: "Near you"

      };

      setBooks(prev => [
        ...prev,
        newBook
      ]);

      setSuccessMessage(
        "✅ Book listed successfully!"
      );

      setTimeout(() => {

        setSuccessMessage("");

      }, 3000);

      return true;

    } catch (err) {

      console.error(
        "Error listing book:",
        err
      );

      return false;

    } finally {

      setSubmitting(false);

    }

  };

  // ============================================
  // REMOVE LISTING
  // ============================================

  const handleRemoveListing = async (bookId) => {

    setBooks(prevBooks =>
      prevBooks.filter(
        book => book.id !== bookId
      )
    );

    setSuccessMessage(
      "✅ Listing removed"
    );

    setTimeout(() => {

      setSuccessMessage("");

    }, 3000);

  };

  // ============================================
  // ACCEPT REQUEST
  // ============================================

  const handleAcceptRequest = async (bookId) => {

    setBooks(prevBooks =>

      prevBooks.map(book =>

        book.id === bookId
          ? {
              ...book,
              status: "completed"
            }
          : book

      )

    );

    setSuccessMessage(
      "✅ Exchange request accepted!"
    );

    setTimeout(() => {

      setSuccessMessage("");

    }, 3000);

  };

  // ============================================
  // REJECT REQUEST
  // ============================================

  const handleRejectRequest = async (bookId) => {

    setBooks(prevBooks =>

      prevBooks.map(book =>

        book.id === bookId
          ? {
              ...book,
              status: "available",
              requestedBy: undefined,
              requestDetails: undefined
            }
          : book

      )

    );

    setSuccessMessage(
      "❌ Exchange request rejected"
    );

    setTimeout(() => {

      setSuccessMessage("");

    }, 3000);

  };

  // ============================================
  // EFFECTS
  // ============================================

  useEffect(() => {

    setMounted(true);

    const role =
      localStorage.getItem("userType") ||
      localStorage.getItem("userRole") ||
      "buyer";

    setUserRole(role);

    fetchBooks();

  }, []);

  // ============================================
  // CITY
  // ============================================

  const handleCityChange = (e) => {

    setCity(e.target.value);

    setPinBounce(n => n + 1);

  };

  // ============================================
  // LIST BOOK
  // ============================================

  const handleListBookClick = () => {

    if (!localStorage.getItem("token")) {

      navigate("/login");

      return;

    }

    setListForm({

      title: "",
      author: "",
      isbn: "",
      condition: "good",
      city: "",
      description: ""

    });

    setShowListModal(true);

  };

  const handleConfirmListBook = async () => {

    if (
      !listForm.title ||
      !listForm.author ||
      !listForm.city
    ) {

      alert(
        "Please fill in all required fields"
      );

      return;

    }

    await handleListBook({

      ...listForm,

      city:
        listForm.city ||
        city

    });

    setShowListModal(false);

  };

  // ============================================
  // FILTER
  // ============================================

  const filteredBooks = books.filter(book => {

    // My Listings
    if (activeTab === "my-listings") {

      return (
        book.ownerId === "currentUser"
      );

    }

    // My Requests
    if (activeTab === "my-requests") {

      return (
        book.requestedBy === "You"
      );

    }

    // Normal status tabs
    return (
      book.status === activeTab
    );

  });

  // ============================================
  // COUNTS
  // ============================================

  const counts = {

    available:
      books.filter(
        b => b.status === "available"
      ).length,

    pending:
      books.filter(
        b => b.status === "pending"
      ).length,

    completed:
      books.filter(
        b => b.status === "completed"
      ).length,

    "my-listings":
      books.filter(
        b => b.ownerId === "currentUser"
      ).length,

    "my-requests":
      books.filter(
        b => b.requestedBy === "You"
      ).length

  };

  // ============================================
  // TABS
  // ============================================

  const buyerTabs = [

    {
      key: "available",
      label: "Available",
      count: counts.available
    },

    {
      key: "my-requests",
      label: "My Requests",
      count: counts["my-requests"]
    },

    {
      key: "completed",
      label: "Completed",
      count: counts.completed
    }

  ];

  const sellerTabs = [

    {
      key: "my-listings",
      label: "My Listings",
      count: counts["my-listings"]
    },

    {
      key: "pending",
      label: "Requests",
      count: counts.pending
    },

    {
      key: "completed",
      label: "Completed",
      count: counts.completed
    }

  ];

  const tabs =
    userRole === "seller"
      ? sellerTabs
      : buyerTabs;

  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">

        <div className="text-center">

          <RefreshCw
            size={40}
            className="mx-auto text-[#D8472F] animate-spin"
          />

          <p className="text-[#5B6478] mt-3">
            Loading exchanges...
          </p>

        </div>

      </div>

    );

  }

  // ============================================
  // RENDER
  // ============================================

  return (

    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] py-10">

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
            spin-slow 6s linear infinite;
        }

        @keyframes card-rise {

          0% {
            opacity: 0;
            transform:
              translateY(16px)
              scale(0.98);
          }

          100% {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
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

        @keyframes pulse-soft {

          0%,100% {
            box-shadow:
              0 0 0 0
              rgba(169,129,47,0.35);
          }

          50% {
            box-shadow:
              0 0 0 6px
              rgba(169,129,47,0);
          }

        }

        .pulse-soft {
          animation:
            pulse-soft
            2s
            ease-in-out
            infinite;
        }

        @keyframes tick-in {

          0% {
            transform: scale(0.5);
            opacity: 0;
          }

          60% {
            transform: scale(1.15);
            opacity: 1;
          }

          100% {
            transform: scale(1);
          }

        }

        .tick-in {
          animation:
            tick-in
            0.4s
            cubic-bezier(0.34,1.56,0.64,1)
            forwards;
        }

        @keyframes pin-hop {

          0% {
            transform: translateY(0);
          }

          30% {
            transform: translateY(-6px);
          }

          55% {
            transform: translateY(0);
          }

          75% {
            transform: translateY(-3px);
          }

          100% {
            transform: translateY(0);
          }

        }

        .pin-hop {
          animation:
            pin-hop
            0.5s
            ease-out;
        }

        .seal-btn {
          position: relative;
          overflow: hidden;
        }

        .modal-overlay {

          position: fixed;
          inset: 0;
          background:
            rgba(0,0,0,0.45);

          backdrop-filter:
            blur(8px);

          display: flex;

          align-items: center;

          justify-content: center;

          z-index: 1000;

          padding: 20px;

        }

        .modal-box {

          background: #FFFBF3;

          border-radius: 32px;

          padding: 28px;

          max-width: 520px;

          width: 100%;

          max-height: 92vh;

          overflow-y: auto;

          box-shadow:
            0 30px 80px
            rgba(30,42,66,0.3);

        }

        .modal-input {

          width: 100%;

          padding:
            12px
            14px;

          border:
            1.5px solid
            #E2D5BC;

          border-radius: 12px;

          font-size: 14px;

          background:
            rgba(255,251,243,0.7);

          transition:
            all 0.3s ease;

          font-family:
            'Work Sans',
            sans-serif;

        }

        .modal-input:focus {

          outline: none;

          border-color:
            #C9A567;

          box-shadow:
            0 0 0 4px
            rgba(201,165,103,0.08);

        }

        .success-toast {

          position: fixed;

          bottom: 30px;

          right: 30px;

          background:
            #00B894;

          color: white;

          padding:
            16px 24px;

          border-radius:
            12px;

          font-weight:
            500;

          z-index:
            2000;

          box-shadow:
            0 8px 24px
            rgba(0,0,0,0.15);

        }

        .role-badge {

          display:
            inline-flex;

          align-items:
            center;

          gap: 4px;

          font-size:
            10px;

          padding:
            2px 10px;

          border-radius:
            12px;

          font-weight:
            500;

        }

        .role-badge.seller {

          background:
            rgba(107,76,130,0.2);

          color:
            #6B4C82;

        }

        .role-badge.buyer {

          background:
            rgba(201,165,103,0.2);

          color:
            #A9843F;

        }

      `}</style>

      <div
        className="
          pointer-events-none
          fixed inset-0
          z-0
          paper-grain
          opacity-60
        "
      />

      <div
        className="
          font-body
          relative z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          space-y-6
        "
      >

        {/* SUCCESS */}

        {successMessage && (

          <div className="fixed bottom-8 right-8 bg-[#00B894] text-white px-6 py-4 rounded-xl shadow-xl z-[2000]">

            {successMessage}

          </div>

        )}

        {/* HEADER */}

        <div
          className={`
            bg-[#FFFBF3]
            rounded-2xl
            p-6
            border
            border-[#E2D5BC]
            shadow-[0_8px_20px_-14px_rgba(30,42,66,0.3)]
            transition-all
            duration-700
            ${
              mounted
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }
          `}
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-start
              md:items-center
              gap-4
            "
          >

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8472F]/10 border border-[#D8472F]/30">

                <RefreshCw
                  size={18}
                  className="
                    text-[#D8472F]
                    spin-slow
                  "
                />

              </div>

              <div>

                <h1 className="font-display font-bold text-3xl">

                  Book Exchange

                </h1>

                <p className="text-[#8A7F6B] text-sm mt-1">

                  {userRole === "seller"
                    ? "📦 Manage your book listings"
                    : "📚 Discover books to exchange"}

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 flex-wrap">

              {userRole === "seller" ? (

                <span className="role-badge seller">

                  <Store size={12} />

                  Seller

                </span>

              ) : (

                <span className="role-badge buyer">

                  <User size={12} />

                  Buyer

                </span>

              )}

              <span className="flex items-center gap-1.5 text-sm text-[#5B6478]">

                <MapPin
                  key={pinBounce}
                  size={14}
                  className="
                    text-[#D8472F]
                    pin-hop
                  "
                />

                {city}

              </span>

              <select
                value={city}
                onChange={handleCityChange}
                className="
                  px-3 py-2
                  bg-[#F6EFE3]
                  rounded-full
                  text-sm
                  border
                  border-[#E2D5BC]
                  focus:outline-none
                "
              >

                {cities.map(c => (

                  <option
                    key={c}
                    value={c}
                  >
                    {c}
                  </option>

                ))}

              </select>

              {userRole === "seller" && (

                <button
                  onClick={handleListBookClick}
                  className="
                    flex items-center
                    gap-2
                    px-6 py-2.5
                    bg-[#6B4C82]
                    text-white
                    rounded-full
                    text-sm
                    font-semibold
                    hover:bg-[#573C6B]
                    transition
                  "
                >

                  <Plus size={15} />

                  List Book

                </button>

              )}

            </div>

          </div>

        </div>

        {/* TABS */}

        <div className="flex gap-2 overflow-x-auto">

          {tabs.map(tab => {

            const isActive =
              activeTab === tab.key;

            return (

              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`
                  flex items-center
                  gap-2
                  px-6 py-2.5
                  rounded-full
                  text-sm
                  font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-[#D8472F] text-white"
                      : "bg-[#FFFBF3] text-[#8A7F6B] border border-[#E2D5BC]"
                  }
                `}
              >

                {tab.label}

                <span
                  className={`
                    px-2
                    py-0.5
                    rounded-full
                    text-xs
                    ${
                      isActive
                        ? "bg-white/20"
                        : "bg-[#EDE2CE]"
                    }
                  `}
                >

                  {tab.count}

                </span>

              </button>

            );

          })}

        </div>

        {/* BOOK GRID */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >

          {filteredBooks.length === 0 ? (

            <div
              className="
                col-span-full
                bg-[#FFFBF3]
                rounded-2xl
                p-12
                text-center
                border
                border-[#E2D5BC]
              "
            >

              <BookOpen
                size={40}
                className="
                  mx-auto
                  text-[#D8472F]
                  mb-3
                "
              />

              <h3 className="font-display text-xl font-semibold">

                {activeTab === "my-requests"
                  ? "No exchange requests yet"
                  : "No books found"}

              </h3>

              <p className="text-[#8A7F6B] text-sm mt-2">

                {activeTab === "my-requests"
                  ? "Request a book and it will appear here."
                  : "Check back later for new listings."}

              </p>

            </div>

          ) : (

            filteredBooks.map((book, i) => {

              const s =
                statusStyle[book.status] ||
                statusStyle.available;

              const isOwner =
                book.ownerId ===
                "currentUser";

              return (

                <div
                  key={`${activeTab}-${book.id}`}
                  className="
                    card-rise
                    bg-[#FFFBF3]
                    rounded-2xl
                    overflow-hidden
                    border
                    border-[#E2D5BC]
                    hover:border-[#D9C7A3]
                    hover:-translate-y-1
                    hover:shadow-[0_16px_28px_-16px_rgba(30,42,66,0.35)]
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                  style={{
                    animationDelay:
                      `${i * 60}ms`
                  }}
                  onClick={() =>
                    handleBookClick(book)
                  }
                >

                  <div className="flex p-4 gap-4">

                    {/* COVER */}

                    <div
                      className="
                        w-20
                        h-28
                        flex-shrink-0
                        rounded-lg
                        overflow-hidden
                        shadow-md
                        bg-[#EDE2CE]
                      "
                    >

                      <img
                        src={coverUrl(book.isbn)}
                        alt={book.title}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                        loading="lazy"
                        onError={(e) => {

                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='150'%3E%3Crect width='100' height='150' fill='%23EDE2CE'/%3E%3Ctext x='50' y='75' font-size='40' text-anchor='middle' fill='%238A7F6B'%3E📚%3C/text%3E%3C/svg%3E";

                        }}
                      />

                    </div>

                    {/* INFO */}

                    <div className="flex-1 min-w-0">

                      <h3
                        className="
                          font-semibold
                          text-sm
                          truncate
                          text-[#1E2A42]
                        "
                      >

                        {book.title}

                      </h3>

                      <p className="text-xs text-[#5B6478] truncate">

                        {book.author}

                      </p>

                      <p
                        className="
                          flex
                          items-center
                          gap-1
                          text-[11px]
                          text-[#8A7F6B]
                          mt-1.5
                        "
                      >

                        <User size={11} />

                        {book.owner}

                        {isOwner && (

                          <span className="text-[#6B8F55]">

                            (You)

                          </span>

                        )}

                      </p>

                      <p
                        className="
                          flex
                          items-center
                          gap-1
                          text-[11px]
                          text-[#8A7F6B]
                        "
                      >

                        <MapPin size={11} />

                        {book.city}

                        {" · "}

                        {book.distance || "Near you"}

                      </p>

                      {book.rating > 0 && (

                        <p
                          className="
                            flex
                            items-center
                            gap-1
                            text-[11px]
                            text-[#A9812F]
                            mt-0.5
                          "
                        >

                          <Star
                            size={10}
                            className="
                              fill-[#A9812F]
                              text-[#A9812F]
                            "
                          />

                          {book.rating}

                        </p>

                      )}

                      <p
                        className="
                          text-[10px]
                          text-[#8A7F6B]
                          mt-0.5
                        "
                      >

                        {book.condition}

                      </p>

                      {/* STATUS */}

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          mt-3
                        "
                      >

                        <span
                          className={`
                            flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1
                            rounded-full
                            text-[10px]
                            font-medium
                            border
                            ${s.tint}
                            ${s.text}
                          `}
                        >

                          <span
                            className={`
                              h-1.5
                              w-1.5
                              rounded-full
                              ${s.badge}
                            `}
                          />

                          {s.label}

                        </span>

                        {/* BUYER */}

                        {userRole === "buyer" &&
                          book.status === "available" && (

                            <span
                              className="
                                ml-auto
                                px-3
                                py-1
                                bg-[#D8472F]
                                text-white
                                rounded-full
                                text-[10px]
                                font-semibold
                              "
                            >

                              Request

                            </span>

                          )}

                        {userRole === "buyer" &&
                          book.requestedBy === "You" && (

                            <span
                              className="
                                ml-auto
                                flex
                                items-center
                                gap-1
                                text-xs
                                text-[#A9812F]
                              "
                            >

                              <Clock size={12} />

                              Requested

                            </span>

                          )}

                        {/* SELLER */}

                        {userRole === "seller" &&
                          isOwner &&
                          book.status === "available" && (

                            <button
                              onClick={(e) => {

                                e.stopPropagation();

                                if (
                                  window.confirm(
                                    "Remove this listing?"
                                  )
                                ) {

                                  handleRemoveListing(
                                    book.id
                                  );

                                }

                              }}
                              className="
                                ml-auto
                                text-[#E17055]
                              "
                            >

                              <Trash2 size={14} />

                            </button>

                          )}

                        {userRole === "seller" &&
                          isOwner &&
                          book.status === "pending" && (

                            <div className="ml-auto flex gap-2">

                              <button
                                onClick={(e) => {

                                  e.stopPropagation();

                                  handleAcceptRequest(
                                    book.id
                                  );

                                }}
                                className="
                                  text-[#00B894]
                                "
                              >

                                <Check size={16} />

                              </button>

                              <button
                                onClick={(e) => {

                                  e.stopPropagation();

                                  handleRejectRequest(
                                    book.id
                                  );

                                }}
                                className="
                                  text-[#E17055]
                                "
                              >

                                <X size={16} />

                              </button>

                            </div>

                          )}

                      </div>

                    </div>

                  </div>

                </div>

              );

            })

          )}

        </div>

      </div>

      {/* =====================================================
          EXCHANGE REQUEST FORM
          ===================================================== */}

      {showRequestForm &&
        selectedBook && (

          <div
            className="modal-overlay"
            onClick={() =>
              setShowRequestForm(false)
            }
          >

            <div
              className="modal-box"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="flex justify-between items-start mb-5">

                <div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#C9A567]
                      mb-1
                    "
                  >

                    <Shield size={18} />

                    <span className="text-xs font-semibold">

                      EXCHANGE REQUEST

                    </span>

                  </div>

                  <h2
                    className="
                      font-display
                      text-2xl
                      font-bold
                      text-[#1E2A42]
                    "
                  >

                    Request This Book

                  </h2>

                  <p
                    className="
                      text-xs
                      text-[#8A7F6B]
                      mt-1
                    "
                  >

                    Send your details to the book owner.

                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowRequestForm(false)
                  }
                  className="
                    text-[#8A7F6B]
                    hover:text-[#1E2A42]
                  "
                >

                  <X size={20} />

                </button>

              </div>

              {/* BOOK PREVIEW */}

              <div
                className="
                  flex
                  gap-4
                  p-4
                  bg-white/50
                  border
                  border-[#E2D5BC]
                  rounded-2xl
                  mb-5
                "
              >

                <img
                  src={coverUrl(selectedBook.isbn)}
                  alt={selectedBook.title}
                  className="
                    w-20
                    h-28
                    object-cover
                    rounded-lg
                    shadow-md
                  "
                />

                <div className="flex-1">

                  <h3
                    className="
                      font-semibold
                      text-[#1E2A42]
                    "
                  >

                    {selectedBook.title}

                  </h3>

                  <p className="text-sm text-[#5B6478]">

                    {selectedBook.author}

                  </p>

                  <p className="text-xs text-[#8A7F6B] mt-2">

                    Owned by{" "}

                    <span className="font-medium">

                      {selectedBook.owner}

                    </span>

                  </p>

                  <p className="flex items-center gap-1 text-xs text-[#8A7F6B] mt-1">

                    <MapPin size={12} />

                    {selectedBook.city}

                  </p>

                  <span
                    className="
                      inline-block
                      mt-2
                      px-2.5
                      py-1
                      bg-[#6B8F55]/10
                      text-[#6B8F55]
                      rounded-full
                      text-[10px]
                    "
                  >

                    {selectedBook.condition}

                  </span>

                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmitRequest}
                className="space-y-3"
              >

                {/* NAME + EMAIL */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-3
                  "
                >

                  <div>

                    <label className="text-xs font-medium text-[#5B6478]">

                      Full Name

                    </label>

                    <div className="relative mt-1">

                      <User
                        size={15}
                        className="
                          absolute
                          left-3
                          top-3
                          text-[#8A7F6B]
                        "
                      />

                      <input
                        type="text"
                        required
                        value={requestForm.fullName}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            fullName:
                              e.target.value
                          })
                        }
                        placeholder="Your name"
                        className="
                          modal-input
                          pl-9
                        "
                      />

                    </div>

                  </div>

                  <div>

                    <label className="text-xs font-medium text-[#5B6478]">

                      Email

                    </label>

                    <div className="relative mt-1">

                      <Mail
                        size={15}
                        className="
                          absolute
                          left-3
                          top-3
                          text-[#8A7F6B]
                        "
                      />

                      <input
                        type="email"
                        required
                        value={requestForm.email}
                        onChange={(e) =>
                          setRequestForm({
                            ...requestForm,
                            email:
                              e.target.value
                          })
                        }
                        placeholder="Your email"
                        className="
                          modal-input
                          pl-9
                        "
                      />

                    </div>

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label className="text-xs font-medium text-[#5B6478]">

                    Phone Number

                  </label>

                  <div className="relative mt-1">

                    <Phone
                      size={15}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#8A7F6B]
                      "
                    />

                    <input
                      type="tel"
                      required
                      value={requestForm.phone}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          phone:
                            e.target.value
                        })
                      }
                      placeholder="Your phone number"
                      className="
                        modal-input
                        pl-9
                      "
                    />

                  </div>

                </div>

                {/* CITY */}

                <div>

                  <label className="text-xs font-medium text-[#5B6478]">

                    City

                  </label>

                  <div className="relative mt-1">

                    <MapPin
                      size={15}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#8A7F6B]
                      "
                    />

                    <input
                      type="text"
                      required
                      value={requestForm.city}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          city:
                            e.target.value
                        })
                      }
                      placeholder="Your city"
                      className="
                        modal-input
                        pl-9
                      "
                    />

                  </div>

                </div>

                {/* MESSAGE */}

                <div>

                  <label className="text-xs font-medium text-[#5B6478]">

                    Message to Owner

                  </label>

                  <div className="relative mt-1">

                    <MessageCircle
                      size={15}
                      className="
                        absolute
                        left-3
                        top-3
                        text-[#8A7F6B]
                      "
                    />

                    <textarea
                      rows="3"
                      value={requestForm.message}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          message:
                            e.target.value
                        })
                      }
                      placeholder="
                        Hi! I'd like to exchange
                        this book with you...
                      "
                      className="
                        modal-input
                        pl-9
                        resize-none
                      "
                    />

                  </div>

                </div>

                {/* TERMS */}

                <label
                  className="
                    flex
                    items-start
                    gap-2
                    text-xs
                    text-[#5B6478]
                    cursor-pointer
                  "
                >

                  <input
                    type="checkbox"
                    required
                    checked={
                      requestForm.agreeTerms
                    }
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        agreeTerms:
                          e.target.checked
                      })
                    }
                    className="
                      mt-0.5
                      accent-[#C9A567]
                    "
                  />

                  <span>

                    I agree to the exchange
                    request terms.

                  </span>

                </label>

                {/* BUTTONS */}

                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() =>
                      setShowRequestForm(false)
                    }
                    className="
                      flex-1
                      py-3
                      border
                      border-[#E2D5BC]
                      rounded-full
                      text-sm
                      text-[#5B6478]
                      hover:bg-[#F6EFE3]
                    "
                  >

                    Cancel

                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      flex-1
                      py-3
                      bg-[#C9A567]
                      text-[#1E2A42]
                      rounded-full
                      text-sm
                      font-semibold
                      shadow-lg
                      disabled:opacity-50
                    "
                  >

                    {submitting
                      ? "Sending..."
                      : "Send Request"}

                  </button>

                </div>

              </form>

              <p
                className="
                  text-center
                  text-[10px]
                  text-[#8A7F6B]
                  mt-4
                "
              >

                The book owner can review your request
                and accept or reject it.

              </p>

            </div>

          </div>

        )}

      {/* =====================================================
          SELLER LIST BOOK MODAL
          ===================================================== */}

      {showListModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowListModal(false)
          }
        >

          <div
            className="modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="flex justify-between items-start mb-5">

              <h2
                className="
                  font-display
                  text-xl
                  font-bold
                "
              >

                List a Book for Exchange

              </h2>

              <button
                onClick={() =>
                  setShowListModal(false)
                }
              >

                <X size={20} />

              </button>

            </div>

            <div className="space-y-3">

              <input
                className="modal-input"
                placeholder="Book Title *"
                value={listForm.title}
                onChange={(e) =>
                  setListForm({
                    ...listForm,
                    title:
                      e.target.value
                  })
                }
              />

              <input
                className="modal-input"
                placeholder="Author *"
                value={listForm.author}
                onChange={(e) =>
                  setListForm({
                    ...listForm,
                    author:
                      e.target.value
                  })
                }
              />

              <div className="grid grid-cols-2 gap-3">

                <input
                  className="modal-input"
                  placeholder="City *"
                  value={listForm.city}
                  onChange={(e) =>
                    setListForm({
                      ...listForm,
                      city:
                        e.target.value
                    })
                  }
                />

                <select
                  className="modal-input"
                  value={listForm.condition}
                  onChange={(e) =>
                    setListForm({
                      ...listForm,
                      condition:
                        e.target.value
                    })
                  }
                >

                  <option value="like new">
                    Like New
                  </option>

                  <option value="good">
                    Good
                  </option>

                  <option value="used">
                    Used
                  </option>

                </select>

              </div>

              <input
                className="modal-input"
                placeholder="ISBN (Optional)"
                value={listForm.isbn}
                onChange={(e) =>
                  setListForm({
                    ...listForm,
                    isbn:
                      e.target.value
                  })
                }
              />

              <textarea
                className="modal-input resize-none"
                rows="3"
                placeholder="Description"
                value={listForm.description}
                onChange={(e) =>
                  setListForm({
                    ...listForm,
                    description:
                      e.target.value
                  })
                }
              />

              <div className="flex gap-3 pt-2">

                <button
                  onClick={() =>
                    setShowListModal(false)
                  }
                  className="
                    flex-1
                    py-3
                    border
                    border-[#E2D5BC]
                    rounded-full
                  "
                >

                  Cancel

                </button>

                <button
                  onClick={handleConfirmListBook}
                  disabled={submitting}
                  className="
                    flex-1
                    py-3
                    bg-[#6B4C82]
                    text-white
                    rounded-full
                    font-semibold
                    disabled:opacity-50
                  "
                >

                  {submitting
                    ? "Listing..."
                    : "List Book"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default ExchangePage;