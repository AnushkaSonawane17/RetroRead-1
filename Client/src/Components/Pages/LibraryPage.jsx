// // import React from 'react';
// // import { BookCard } from '../MarketPlace';

// // const LibraryPage = () => {
// //   const books = [
// //     { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, rating: 4.5 },
// //     { id: 2, title: '1984', author: 'George Orwell', price: 9.99, rating: 4.7 },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <h1 className="text-3xl font-bold">My Library</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {books.map(book => (
// //           <BookCard key={book.id} book={book} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LibraryPage;

// // import React from 'react';
// // import { BookCard } from '../MarketPlace';

// // const LibraryPage = () => {
// //   const books = [
// //     { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, rating: 4.5 },
// //     { id: 2, title: '1984', author: 'George Orwell', price: 9.99, rating: 4.7 },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <h1 className="text-3xl font-bold">My Library</h1>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {books.map(book => (
// //           <BookCard key={book.id} book={book} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default LibraryPage;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// // Import your shelf background image
// import shelfImage from '../../assets/Shelf.png';

// const LibraryPage = () => {
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchTerm, setSearchTerm] = useState('');

//   // 📚 16 BOOKS - PERFECT SIZES
//   const books = [
//     // ============ SHELF 1 ============
//     {
//       id: 1,
//       title: "Atomic Habits",
//       author: "James Clear",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
//       color: "#E8D5B7",
//       progress: 75,
//       pages: 180,
//       category: "Self-Development",
//       shelf: 1,
//       height: 160
//     },
//     {
//       id: 2,
//       title: "Deep Work",
//       author: "Cal Newport",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/81bGXaJ9PLL.jpg",
//       color: "#D4A5A5",
//       progress: 45,
//       pages: 328,
//       category: "Productivity",
//       shelf: 1,
//       height: 135
//     },
//     {
//       id: 3,
//       title: "Psychology of Money",
//       author: "Morgan Housel",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71TR5M0nVdL.jpg",
//       color: "#A8C4D6",
//       progress: 90,
//       pages: 281,
//       category: "Finance",
//       shelf: 1,
//       height: 148
//     },
//     {
//       id: 4,
//       title: "Think and Grow Rich",
//       author: "Napoleon Hill",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71VT6DScUFL.jpg",
//       color: "#D4C4B5",
//       progress: 20,
//       pages: 277,
//       category: "Self-Development",
//       shelf: 1,
//       height: 125
//     },

//     // ============ SHELF 2 ============
//     {
//       id: 5,
//       title: "The Almanack of Naval",
//       author: "Eric Jorgenson",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71V2fCgxZdL.jpg",
//       color: "#D4C4A8",
//       progress: 100,
//       pages: 208,
//       category: "Philosophy",
//       shelf: 2,
//       height: 142
//     },
//     {
//       id: 6,
//       title: "The 7 Habits",
//       author: "Stephen R. Covey",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71nX4DvT4ML.jpg",
//       color: "#C9B1D4",
//       progress: 30,
//       pages: 432,
//       category: "Self-Improvement",
//       shelf: 2,
//       height: 168
//     },
//     {
//       id: 7,
//       title: "Can't Hurt Me",
//       author: "David Goggins",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71byaodnCwL.jpg",
//       color: "#B5C9A8",
//       progress: 60,
//       pages: 310,
//       category: "Motivation",
//       shelf: 2,
//       height: 130
//     },
//     {
//       id: 8,
//       title: "The Lean Startup",
//       author: "Eric Ries",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/81-48BgN4QL.jpg",
//       color: "#C4A882",
//       progress: 85,
//       pages: 454,
//       category: "Business",
//       shelf: 2,
//       height: 155
//     },

//     // ============ SHELF 3 ============
//     {
//       id: 9,
//       title: "Clean Code",
//       author: "Robert C. Martin",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71i1R8w7e-L.jpg",
//       color: "#A8A8A8",
//       progress: 100,
//       pages: 96,
//       category: "Programming",
//       shelf: 3,
//       height: 148
//     },
//     {
//       id: 10,
//       title: "Ikigai",
//       author: "Héctor García",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/81l3rZK4HFL.jpg",
//       color: "#B5A8C4",
//       progress: 50,
//       pages: 256,
//       category: "Philosophy",
//       shelf: 3,
//       height: 158
//     },
//     {
//       id: 11,
//       title: "Wings of Fire",
//       author: "Tui T. Sutherland",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/91t3RZbqUPL.jpg",
//       color: "#C4D4A8",
//       progress: 30,
//       pages: 541,
//       category: "Fantasy",
//       shelf: 3,
//       height: 138
//     },
//     {
//       id: 12,
//       title: "Design of Everyday",
//       author: "Don Norman",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71FvZg6uZ7L.jpg",
//       color: "#C4D4A8",
//       progress: 30,
//       pages: 541,
//       category: "Design",
//       shelf: 3,
//       height: 125
//     },

//     // ============ SHELF 4 ============
//     {
//       id: 13,
//       title: "The Mom Test",
//       author: "Rob Fitzpatrick",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71jI--KxGWL.jpg",
//       color: "#D4B5A8",
//       progress: 60,
//       pages: 250,
//       category: "Startup",
//       shelf: 4,
//       height: 142
//     },
//     {
//       id: 14,
//       title: "Zero to One",
//       author: "Peter Thiel",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71HkSkcjoiL.jpg",
//       color: "#A8C4D4",
//       progress: 80,
//       pages: 224,
//       category: "Startup",
//       shelf: 4,
//       height: 155
//     },
//     {
//       id: 15,
//       title: "Rework",
//       author: "Jason Fried",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71bqHoRgGWL.jpg",
//       color: "#D4C4A8",
//       progress: 40,
//       pages: 290,
//       category: "Business",
//       shelf: 4,
//       height: 130
//     },
//     {
//       id: 16,
//       title: "Hooked",
//       author: "Nir Eyal",
//       coverImage: "https://images-na.ssl-images-amazon.com/images/I/71gKulWojwL.jpg",
//       color: "#C4A8B5",
//       progress: 70,
//       pages: 310,
//       category: "Product Design",
//       shelf: 4,
//       height: 148
//     }
//   ];

//   // Group books by shelf
//   const booksByShelf = books.reduce((acc, book) => {
//     if (!acc[book.shelf]) acc[book.shelf] = [];
//     acc[book.shelf].push(book);
//     return acc;
//   }, {});

//   const totalBooks = books.length;
//   const completedBooks = books.filter(b => b.progress === 100).length;
//   const readingBooks = books.filter(b => b.progress > 0 && b.progress < 100).length;

//   return (
//     <div 
//       className="library-page shelf-layout"
//       style={{
//         backgroundImage: `url(${shelfImage})`,
//         backgroundSize: 'contain',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundAttachment: 'fixed',
//         minHeight: '100vh',
//         padding: '20px 0',
//         backgroundColor: '#1a1a2e',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}
//     >
//       {/* Very light overlay */}
//       <div style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         background: 'rgba(0,0,0,0.06)',
//         zIndex: 0,
//         pointerEvents: 'none'
//       }}></div>

//       <div className="shelf-content" style={{ 
//         maxWidth: '980px', 
//         width: '100%',
//         margin: '0 auto', 
//         padding: '0 15px',
//         position: 'relative',
//         zIndex: 1
//       }}>
//         {/* Header */}
//         <div style={{
//           background: 'rgba(255,255,255,0.08)',
//           backdropFilter: 'blur(12px)',
//           padding: '14px 20px',
//           borderRadius: '10px',
//           marginBottom: '14px',
//           border: '1px solid rgba(255,255,255,0.06)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <div>
//             <h1 style={{ color: 'white', fontSize: '22px', fontWeight: '700', textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
//               📚 My Bookshelf
//             </h1>
//             <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
//               {totalBooks} books • {completedBooks} completed
//             </p>
//           </div>
//           <div style={{ display: 'flex', gap: '6px' }}>
//             <button style={{
//               padding: '6px 14px',
//               background: 'rgba(255,255,255,0.08)',
//               border: '1px solid rgba(255,255,255,0.08)',
//               borderRadius: '6px',
//               color: 'white',
//               cursor: 'pointer',
//               fontSize: '12px'
//             }}>
//               📤
//             </button>
//             <button style={{
//               padding: '6px 14px',
//               background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
//               border: 'none',
//               borderRadius: '6px',
//               color: 'white',
//               cursor: 'pointer',
//               fontWeight: '600',
//               fontSize: '12px'
//             }}>
//               ➕ Add
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(4, 1fr)',
//           gap: '10px',
//           marginBottom: '14px'
//         }}>
//           {[
//             { icon: '📚', number: totalBooks, label: 'Total' },
//             { icon: '📖', number: completedBooks, label: 'Done' },
//             { icon: '🔄', number: readingBooks, label: 'Reading' },
//             { icon: '🏆', number: '12', label: 'Badges' }
//           ].map((stat, i) => (
//             <div key={i} style={{
//               background: 'rgba(255,255,255,0.06)',
//               backdropFilter: 'blur(8px)',
//               border: '1px solid rgba(255,255,255,0.06)',
//               borderRadius: '8px',
//               padding: '10px 14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px'
//             }}>
//               <span style={{ fontSize: '22px' }}>{stat.icon}</span>
//               <div>
//                 <div style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>{stat.number}</div>
//                 <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px' }}>{stat.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Search */}
//         <div style={{
//           display: 'flex',
//           gap: '10px',
//           marginBottom: '20px',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{
//             flex: 1,
//             position: 'relative',
//             background: 'rgba(255,255,255,0.06)',
//             backdropFilter: 'blur(8px)',
//             border: '1px solid rgba(255,255,255,0.06)',
//             borderRadius: '6px',
//             minWidth: '150px'
//           }}>
//             <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>🔍</span>
//             <input
//               type="text"
//               placeholder="Search..."
//               style={{
//                 width: '100%',
//                 padding: '8px 12px 8px 32px',
//                 background: 'transparent',
//                 border: 'none',
//                 color: 'white',
//                 fontSize: '13px',
//                 outline: 'none'
//               }}
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div style={{ display: 'flex', gap: '4px' }}>
//             <button style={{
//               padding: '6px 12px',
//               background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
//               border: 'none',
//               borderRadius: '6px',
//               color: 'white',
//               fontWeight: '500',
//               cursor: 'pointer',
//               fontSize: '11px'
//             }}>All</button>
//             <button style={{
//               padding: '6px 12px',
//               background: 'rgba(255,255,255,0.05)',
//               border: '1px solid rgba(255,255,255,0.05)',
//               borderRadius: '6px',
//               color: 'rgba(255,255,255,0.6)',
//               cursor: 'pointer',
//               fontSize: '11px'
//             }}>Reading</button>
//             <button style={{
//               padding: '6px 12px',
//               background: 'rgba(255,255,255,0.05)',
//               border: '1px solid rgba(255,255,255,0.05)',
//               borderRadius: '6px',
//               color: 'rgba(255,255,255,0.6)',
//               cursor: 'pointer',
//               fontSize: '11px'
//             }}>Done</button>
//           </div>
//         </div>

//         {/* ===== BOOKSHELF - PERFECTLY CENTERED ===== */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
//           {[1, 2, 3, 4].map((shelfNum) => {
//             const shelfBooks = booksByShelf[shelfNum] || [];
//             // Calculate total width of books + gaps
//             const bookWidth = 155;
//             const gap = 16;
//             const totalBooksWidth = shelfBooks.length * bookWidth + (shelfBooks.length - 1) * gap;
            
//             return (
//               <div key={shelfNum} style={{
//                 background: 'rgba(0,0,0,0.08)',
//                 backdropFilter: 'blur(4px)',
//                 borderRadius: '10px',
//                 padding: '12px 14px',
//                 border: '1px solid rgba(255,255,255,0.02)'
//               }}>
//                 <div style={{
//                   color: 'rgba(255,255,255,0.4)',
//                   fontSize: '10px',
//                   fontWeight: '600',
//                   letterSpacing: '2px',
//                   textTransform: 'uppercase',
//                   marginBottom: '8px'
//                 }}>
//                   Shelf {shelfNum}
//                 </div>
                
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'flex-end',
//                   gap: `${gap}px`,
//                   padding: '4px 2px 12px 2px',
//                   minHeight: '180px',
//                   position: 'relative',
//                   justifyContent: 'center' // ← PERFECT CENTERING
//                 }}>
//                   {/* Shelf Line */}
//                   <div style={{
//                     position: 'absolute',
//                     bottom: '0',
//                     left: '0',
//                     right: '0',
//                     height: '4px',
//                     background: 'linear-gradient(to bottom, rgba(139,69,19,0.5), rgba(101,67,33,0.7))',
//                     borderRadius: '0 0 3px 3px',
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
//                   }}></div>

//                   {/* Books */}
//                   {shelfBooks.map((book) => (
//                     <div
//                       key={book.id}
//                       style={{
//                         flex: `0 0 ${bookWidth}px`,
//                         height: `${book.height}px`,
//                         width: `${bookWidth}px`,
//                         background: book.color || '#D4C4A8',
//                         borderRadius: '4px 4px 0 0',
//                         position: 'relative',
//                         cursor: 'pointer',
//                         transition: 'all 0.25s ease',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'flex-start',
//                         padding: '6px 4px',
//                         overflow: 'hidden',
//                         boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.04)'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
//                         e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
//                         e.currentTarget.style.zIndex = '10';
//                         const hover = e.currentTarget.querySelector('.book-hover');
//                         if (hover) {
//                           hover.style.opacity = '1';
//                           hover.style.visibility = 'visible';
//                           hover.style.transform = 'translateX(-50%) scale(1)';
//                         }
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                         e.currentTarget.style.boxShadow = 'inset -1px 0 3px rgba(0,0,0,0.04)';
//                         e.currentTarget.style.zIndex = '1';
//                         const hover = e.currentTarget.querySelector('.book-hover');
//                         if (hover) {
//                           hover.style.opacity = '0';
//                           hover.style.visibility = 'hidden';
//                           hover.style.transform = 'translateX(-50%) scale(0.9)';
//                         }
//                       }}
//                     >
//                       {/* Book Cover Image */}
//                       {book.coverImage ? (
//                         <img
//                           src={book.coverImage}
//                           alt={book.title}
//                           style={{
//                             width: '135px',
//                             height: 'auto',
//                             maxHeight: '74%',
//                             objectFit: 'contain',
//                             borderRadius: '2px',
//                             marginTop: '4px',
//                             flexShrink: 0
//                           }}
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             const parent = e.target.parentNode;
//                             const span = document.createElement('span');
//                             span.style.fontSize = '40px';
//                             span.style.marginTop = '10px';
//                             span.textContent = '📚';
//                             parent.insertBefore(span, e.target);
//                             e.target.remove();
//                           }}
//                         />
//                       ) : (
//                         <span style={{ fontSize: '40px', marginTop: '10px' }}>📚</span>
//                       )}

//                       {/* Book Title */}
//                       <div style={{
//                         fontSize: '8px',
//                         fontWeight: '700',
//                         color: 'rgba(0,0,0,0.8)',
//                         writingMode: 'vertical-rl',
//                         letterSpacing: '1px',
//                         lineHeight: '1.2',
//                         maxHeight: '40px',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         marginTop: '2px',
//                         flexShrink: 0
//                       }}>
//                         {book.title}
//                       </div>

//                       {/* Progress Bar */}
//                       <div style={{
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: '3px',
//                         background: 'rgba(0,0,0,0.05)',
//                         borderRadius: '0 0 4px 4px',
//                         overflow: 'hidden'
//                       }}>
//                         <div style={{
//                           width: `${book.progress}%`,
//                           height: '100%',
//                           background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
//                           borderRadius: '0 0 4px 4px',
//                           transition: 'width 0.5s ease'
//                         }} />
//                       </div>

//                       {/* Hover Info */}
//                       <div className="book-hover" style={{
//                         position: 'absolute',
//                         bottom: 'calc(100% + 12px)',
//                         left: '50%',
//                         transform: 'translateX(-50%) scale(0.9)',
//                         background: 'rgba(0,0,0,0.92)',
//                         backdropFilter: 'blur(16px)',
//                         padding: '10px 14px',
//                         borderRadius: '8px',
//                         minWidth: '140px',
//                         opacity: 0,
//                         visibility: 'hidden',
//                         transition: 'all 0.25s ease',
//                         pointerEvents: 'none',
//                         border: '1px solid rgba(255,255,255,0.05)',
//                         zIndex: 100
//                       }}>
//                         <div style={{ color: 'white', fontSize: '12px', fontWeight: '600', marginBottom: '2px' }}>
//                           {book.title}
//                         </div>
//                         <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', marginBottom: '4px' }}>
//                           {book.author}
//                         </div>
//                         <div style={{ color: '#A29BFE', fontSize: '10px', marginBottom: '4px' }}>
//                           {book.progress}% • {book.pages}p
//                         </div>
//                         <Link to={`/read/${book.id}`}>
//                           <button style={{
//                             width: '100%',
//                             padding: '4px 8px',
//                             background: 'linear-gradient(135deg, #6C5CE7, #0984E3)',
//                             color: 'white',
//                             border: 'none',
//                             borderRadius: '4px',
//                             fontSize: '10px',
//                             fontWeight: '500',
//                             cursor: 'pointer'
//                           }}>
//                             Read Now
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LibraryPage;

// import React, { useState, useMemo, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const BOOKS_PER_ROW = 5;
// const ROWS_PER_PAGE = 3;
// const PAGE_SIZE = BOOKS_PER_ROW * ROWS_PER_PAGE;

// const LibraryPage = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('name'); // 'name' | 'date'
//   const [page, setPage] = useState(0);
//   const [pageAnimKey, setPageAnimKey] = useState(0);

//   const books = [
//     { id: 1, title: "Atomic Habits", author: "James Clear", coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", dateAdded: "2024-06-01" },
//     { id: 2, title: "Deep Work", author: "Cal Newport", coverImage: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", dateAdded: "2024-01-15" },
//     { id: 3, title: "Psychology of Money", author: "Morgan Housel", coverImage: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg", dateAdded: "2024-03-22" },
//     { id: 4, title: "Think and Grow Rich", author: "Napoleon Hill", coverImage: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg", dateAdded: "2023-11-09" },
//     { id: 5, title: "The Almanack of Naval", author: "Eric Jorgenson", coverImage: "https://covers.openlibrary.org/b/isbn/9780578680101-L.jpg", dateAdded: "2024-05-02" },
//     { id: 6, title: "The 7 Habits", author: "Stephen R. Covey", coverImage: "https://covers.openlibrary.org/b/isbn/9781982137274-L.jpg", dateAdded: "2023-09-18" },
//     { id: 7, title: "Can't Hurt Me", author: "David Goggins", coverImage: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg", dateAdded: "2024-02-11" },
//     { id: 8, title: "The Lean Startup", author: "Eric Ries", coverImage: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", dateAdded: "2023-12-30" },
//     { id: 9, title: "Clean Code", author: "Robert C. Martin", coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", dateAdded: "2024-04-07" },
//     { id: 10, title: "Ikigai", author: "Héctor García", coverImage: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg", dateAdded: "2024-01-28" },
//     { id: 11, title: "Wings of Fire", author: "Tui T. Sutherland", coverImage: "https://covers.openlibrary.org/b/isbn/9780545349185-L.jpg", dateAdded: "2023-10-05" },
//     { id: 12, title: "Design of Everyday", author: "Don Norman", coverImage: "https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg", dateAdded: "2024-06-19" },
//     { id: 13, title: "The Mom Test", author: "Rob Fitzpatrick", coverImage: "https://covers.openlibrary.org/b/isbn/9781492180746-L.jpg", dateAdded: "2023-08-14" },
//     { id: 14, title: "Zero to One", author: "Peter Thiel", coverImage: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg", dateAdded: "2024-03-03" },
//     { id: 15, title: "Rework", author: "Jason Fried", coverImage: "https://covers.openlibrary.org/b/isbn/9780307463746-L.jpg", dateAdded: "2023-07-21" },
//     { id: 16, title: "Hooked", author: "Nir Eyal", coverImage: "https://covers.openlibrary.org/b/isbn/9781591847786-L.jpg", dateAdded: "2024-05-30" },
//   ];

//   const filtered = useMemo(() => {
//     let list = books.filter(b =>
//       b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       b.author.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     list = [...list].sort((a, b) =>
//       sortBy === 'name'
//         ? a.title.localeCompare(b.title)
//         : new Date(b.dateAdded) - new Date(a.dateAdded)
//     );
//     return list;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchTerm, sortBy]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
//   const clampedPage = Math.min(page, totalPages - 1);
//   const pageBooks = filtered.slice(clampedPage * PAGE_SIZE, clampedPage * PAGE_SIZE + PAGE_SIZE);

//   const rows = [];
//   for (let i = 0; i < pageBooks.length; i += BOOKS_PER_ROW) {
//     rows.push(pageBooks.slice(i, i + BOOKS_PER_ROW));
//   }

//   const goToPage = (next) => {
//     if (next < 0 || next > totalPages - 1) return;
//     setPage(next);
//     setPageAnimKey(k => k + 1);
//   };

//   useEffect(() => { setPage(0); }, [searchTerm, sortBy]);

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'radial-gradient(ellipse at top, #3a2a24 0%, #1c1310 60%, #120c0a 100%)',
//       padding: '32px 20px',
//       display: 'flex',
//       justifyContent: 'center',
//       fontFamily: "'Inter', sans-serif"
//     }}>
//       <style>{`
//         @keyframes bookRise {
//           from { opacity: 0; transform: translateY(18px) scale(0.96); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         @keyframes shimmer {
//           0%,100% { opacity: 0.55; }
//           50% { opacity: 0.9; }
//         }
//       `}</style>

//       <div style={{ width: '100%', maxWidth: '1140px' }}>

//         <div style={{
//           background: 'linear-gradient(180deg, #C9A88A 0%, #B08D68 100%)',
//           borderRadius: '16px',
//           padding: '14px 22px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           boxShadow: '0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
//           marginBottom: '4px'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//             background: '#4A342B',
//             borderRadius: '999px',
//             padding: '9px 16px',
//             width: '230px',
//             boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
//           }}>
//             <input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search"
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 outline: 'none',
//                 color: '#F1E4D6',
//                 fontSize: '13px',
//                 width: '100%'
//               }}
//             />
//             <span style={{ color: '#D9C2AE', fontSize: '13px' }}>Search</span>
//           </div>

//           <h1 style={{
//             color: '#3A2418',
//             fontSize: '20px',
//             fontWeight: 800,
//             letterSpacing: '0.3px',
//             margin: 0,
//             textShadow: '0 1px 0 rgba(255,255,255,0.3)'
//           }}>
//             My Books
//           </h1>

//           <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//             <button
//               onClick={() => setSortBy('name')}
//               style={sortPillStyle(sortBy === 'name')}
//             >
//               Name
//             </button>
//             <button
//               onClick={() => setSortBy('date')}
//               style={sortPillStyle(sortBy === 'date')}
//             >
//               Date
//             </button>
//             <button style={{
//               width: '34px', height: '34px', borderRadius: '50%',
//               background: '#4A342B', border: 'none', color: '#F1E4D6',
//               cursor: 'pointer', fontSize: '14px',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
//             }}>
//               &#8599;
//             </button>
//           </div>
//         </div>

//         <div style={{
//           background: 'repeating-linear-gradient(180deg, #6B4A38 0px, #6B4A38 2px, #6f4d3a 2px, #6f4d3a 4px)',
//           borderRadius: '0 0 16px 16px',
//           padding: '10px 18px 18px',
//           boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
//         }}>
//           {rows.map((row, rowIdx) => (
//             <div key={`${clampedPage}-${rowIdx}`} style={{ position: 'relative', marginBottom: '22px' }}>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 gap: '18px',
//                 paddingBottom: '14px',
//                 position: 'relative',
//                 zIndex: 2
//               }}>
//                 {row.map((book, i) => (
//                   <Link
//                     to={`/read/${book.id}`}
//                     key={`${pageAnimKey}-${book.id}`}
//                     style={{
//                       textDecoration: 'none',
//                       width: '150px',
//                       animation: `bookRise 0.45s ease ${(rowIdx * BOOKS_PER_ROW + i) * 0.05}s both`
//                     }}
//                   >
//                     <div
//                       className="shelf-book"
//                       style={{
//                         width: '150px',
//                         height: '196px',
//                         borderRadius: '3px 6px 6px 3px',
//                         overflow: 'hidden',
//                         position: 'relative',
//                         boxShadow: '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)',
//                         transition: 'transform 0.25s ease, box-shadow 0.25s ease',
//                         cursor: 'pointer'
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.transform = 'translateY(-10px)';
//                         e.currentTarget.style.boxShadow = '4px 14px 22px rgba(0,0,0,0.55), -1px 0 0 rgba(0,0,0,0.25)';
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.transform = 'translateY(0)';
//                         e.currentTarget.style.boxShadow = '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)';
//                       }}
//                     >
//                       <div style={{
//                         position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
//                         background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0))',
//                         zIndex: 3
//                       }} />
//                       <img
//                         src={book.coverImage}
//                         alt={book.title}
//                         style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                           e.target.parentNode.style.background =
//                             'linear-gradient(135deg,#7a6252,#4d3a2d)';
//                           e.target.parentNode.style.display = 'flex';
//                           e.target.parentNode.style.alignItems = 'center';
//                           e.target.parentNode.style.justifyContent = 'center';
//                           const span = document.createElement('span');
//                           span.textContent = 'Book';
//                           span.style.fontSize = '13px';
//                           span.style.color = '#eee';
//                           e.target.parentNode.appendChild(span);
//                         }}
//                       />
//                       <div style={{
//                         position: 'absolute', inset: 0,
//                         background: 'linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%)',
//                         pointerEvents: 'none'
//                       }} />
//                     </div>
//                   </Link>
//                 ))}
//               </div>

//               <div style={{
//                 position: 'relative',
//                 height: '20px',
//                 background: 'linear-gradient(180deg, #8B5E3C 0%, #6E4726 55%, #5A381D 100%)',
//                 borderRadius: '3px',
//                 boxShadow: '0 6px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
//                 zIndex: 1
//               }}>
//                 <div style={{
//                   position: 'absolute', top: '2px', left: '4%', right: '4%', height: '2px',
//                   background: 'rgba(255,255,255,0.15)', borderRadius: '2px',
//                   animation: 'shimmer 3.5s ease-in-out infinite'
//                 }} />
//               </div>
//             </div>
//           ))}

//           {pageBooks.length === 0 && (
//             <p style={{ color: '#D9C2AE', textAlign: 'center', padding: '40px 0' }}>
//               No books match "{searchTerm}"
//             </p>
//           )}
//         </div>

//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '14px',
//           marginTop: '20px',
//           position: 'relative'
//         }}>
//           <button
//             onClick={() => goToPage(clampedPage - 1)}
//             disabled={clampedPage === 0}
//             style={navBtnStyle(clampedPage === 0)}
//           >
//             Prev
//           </button>

//           <span style={{
//             background: '#3A2418',
//             color: '#F1E4D6',
//             padding: '8px 18px',
//             borderRadius: '999px',
//             fontSize: '13px',
//             fontWeight: 600,
//             minWidth: '52px',
//             textAlign: 'center',
//             boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
//           }}>
//             {clampedPage + 1} / {totalPages}
//           </span>

//           <button
//             onClick={() => goToPage(clampedPage + 1)}
//             disabled={clampedPage >= totalPages - 1}
//             style={navBtnStyle(clampedPage >= totalPages - 1)}
//           >
//             Next
//           </button>

//           <button style={{
//             position: 'absolute',
//             right: 0,
//             width: '38px', height: '38px', borderRadius: '50%',
//             background: 'linear-gradient(180deg,#C9A88A,#B08D68)',
//             border: 'none', cursor: 'pointer', fontSize: '15px',
//             boxShadow: '0 3px 8px rgba(0,0,0,0.4)'
//           }}>
//             &#8599;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const sortPillStyle = (active) => ({
//   padding: '7px 14px',
//   borderRadius: '999px',
//   border: 'none',
//   fontSize: '12px',
//   fontWeight: 600,
//   cursor: 'pointer',
//   background: active ? '#3A2418' : '#4A342B',
//   color: active ? '#F1E4D6' : '#C9B39F',
//   boxShadow: active ? 'inset 0 1px 3px rgba(0,0,0,0.5)' : 'none',
//   transition: 'all 0.2s ease'
// });

// const navBtnStyle = (disabled) => ({
//   padding: '9px 18px',
//   borderRadius: '999px',
//   border: 'none',
//   fontSize: '13px',
//   fontWeight: 600,
//   cursor: disabled ? 'default' : 'pointer',
//   background: disabled ? '#5a4a3f' : 'linear-gradient(180deg,#C9A88A,#B08D68)',
//   color: disabled ? '#8a7566' : '#3A2418',
//   opacity: disabled ? 0.5 : 1,
//   boxShadow: disabled ? 'none' : '0 3px 8px rgba(0,0,0,0.35)',
//   transition: 'all 0.2s ease'
// });

// export default LibraryPage;


import React, { useState, useMemo, useEffect } from 'react';
import { searchBooks } from '../lib/googleBooks.js';

const BOOKS_PER_ROW = 5;
const ROWS_PER_PAGE = 3;
const PAGE_SIZE = BOOKS_PER_ROW * ROWS_PER_PAGE;

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'date'
  const [page, setPage] = useState(0);
  const [pageAnimKey, setPageAnimKey] = useState(0);

  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", dateAdded: "2024-06-01" },
    { id: 2, title: "Deep Work", author: "Cal Newport", coverImage: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", dateAdded: "2024-01-15" },
    { id: 3, title: "Psychology of Money", author: "Morgan Housel", coverImage: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg", dateAdded: "2024-03-22" },
    { id: 4, title: "Think and Grow Rich", author: "Napoleon Hill", coverImage: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg", dateAdded: "2023-11-09" },
    { id: 5, title: "The Almanack of Naval", author: "Eric Jorgenson", coverImage: "https://covers.openlibrary.org/b/isbn/9780578680101-L.jpg", dateAdded: "2024-05-02" },
    { id: 6, title: "The 7 Habits", author: "Stephen R. Covey", coverImage: "https://covers.openlibrary.org/b/isbn/9781982137274-L.jpg", dateAdded: "2023-09-18" },
    { id: 7, title: "Can't Hurt Me", author: "David Goggins", coverImage: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg", dateAdded: "2024-02-11" },
    { id: 8, title: "The Lean Startup", author: "Eric Ries", coverImage: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", dateAdded: "2023-12-30" },
    { id: 9, title: "Clean Code", author: "Robert C. Martin", coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", dateAdded: "2024-04-07" },
    { id: 10, title: "Ikigai", author: "Héctor García", coverImage: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg", dateAdded: "2024-01-28" },
    { id: 11, title: "Wings of Fire", author: "Tui T. Sutherland", coverImage: "https://covers.openlibrary.org/b/isbn/9780545349185-L.jpg", dateAdded: "2023-10-05" },
    { id: 12, title: "Design of Everyday", author: "Don Norman", coverImage: "https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg", dateAdded: "2024-06-19" },
    { id: 13, title: "The Mom Test", author: "Rob Fitzpatrick", coverImage: "https://covers.openlibrary.org/b/isbn/9781492180746-L.jpg", dateAdded: "2023-08-14" },
    { id: 14, title: "Zero to One", author: "Peter Thiel", coverImage: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg", dateAdded: "2024-03-03" },
    { id: 15, title: "Rework", author: "Jason Fried", coverImage: "https://covers.openlibrary.org/b/isbn/9780307463746-L.jpg", dateAdded: "2023-07-21" },
    { id: 16, title: "Hooked", author: "Nir Eyal", coverImage: "https://covers.openlibrary.org/b/isbn/9781591847786-L.jpg", dateAdded: "2024-05-30" },
  ];

  async function openBook(title, author = "") {
    try {
      const result = await searchBooks(`${title} ${author}`.trim(), 1);
      const book = result.items?.[0];
      const link = book?.volumeInfo?.previewLink || book?.volumeInfo?.infoLink;
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        alert("Couldn't find this book online. Try another title.");
      }
    } catch {
      alert("Something went wrong opening this book.");
    }
  }

  const filtered = useMemo(() => {
    let list = books.filter(b =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    list = [...list].sort((a, b) =>
      sortBy === 'name'
        ? a.title.localeCompare(b.title)
        : new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages - 1);
  const pageBooks = filtered.slice(clampedPage * PAGE_SIZE, clampedPage * PAGE_SIZE + PAGE_SIZE);

  const rows = [];
  for (let i = 0; i < pageBooks.length; i += BOOKS_PER_ROW) {
    rows.push(pageBooks.slice(i, i + BOOKS_PER_ROW));
  }

  const goToPage = (next) => {
    if (next < 0 || next > totalPages - 1) return;
    setPage(next);
    setPageAnimKey(k => k + 1);
  };

  useEffect(() => { setPage(0); }, [searchTerm, sortBy]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #3a2a24 0%, #1c1310 60%, #120c0a 100%)',
      padding: '32px 20px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @keyframes bookRise {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1140px' }}>

        <div style={{
          background: 'linear-gradient(180deg, #C9A88A 0%, #B08D68 100%)',
          borderRadius: '16px',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#4A342B',
            borderRadius: '999px',
            padding: '9px 16px',
            width: '230px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
          }}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#F1E4D6',
                fontSize: '13px',
                width: '100%'
              }}
            />
            <span style={{ color: '#D9C2AE', fontSize: '13px' }}>Search</span>
          </div>

          <h1 style={{
            color: '#3A2418',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.3px',
            margin: 0,
            textShadow: '0 1px 0 rgba(255,255,255,0.3)'
          }}>
            My Books
          </h1>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setSortBy('name')}
              style={sortPillStyle(sortBy === 'name')}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('date')}
              style={sortPillStyle(sortBy === 'date')}
            >
              Date
            </button>
            <button style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: '#4A342B', border: 'none', color: '#F1E4D6',
              cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
            }}>
              &#8599;
            </button>
          </div>
        </div>

        <div style={{
          background: 'repeating-linear-gradient(180deg, #6B4A38 0px, #6B4A38 2px, #6f4d3a 2px, #6f4d3a 4px)',
          borderRadius: '0 0 16px 16px',
          padding: '10px 18px 18px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
        }}>
          {rows.map((row, rowIdx) => (
            <div key={`${clampedPage}-${rowIdx}`} style={{ position: 'relative', marginBottom: '22px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '18px',
                paddingBottom: '14px',
                position: 'relative',
                zIndex: 2
              }}>
                {row.map((book, i) => (
                  <div
                    onClick={() => openBook(book.title, book.author)}
                    key={`${pageAnimKey}-${book.id}`}
                    style={{
                      textDecoration: 'none',
                      width: '150px',
                      animation: `bookRise 0.45s ease ${(rowIdx * BOOKS_PER_ROW + i) * 0.05}s both`
                    }}
                  >
                    <div
                      className="shelf-book"
                      style={{
                        width: '150px',
                        height: '196px',
                        borderRadius: '3px 6px 6px 3px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '4px 14px 22px rgba(0,0,0,0.55), -1px 0 0 rgba(0,0,0,0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)';
                      }}
                    >
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0))',
                        zIndex: 3
                      }} />
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.style.background =
                            'linear-gradient(135deg,#7a6252,#4d3a2d)';
                          e.target.parentNode.style.display = 'flex';
                          e.target.parentNode.style.alignItems = 'center';
                          e.target.parentNode.style.justifyContent = 'center';
                          const span = document.createElement('span');
                          span.textContent = 'Book';
                          span.style.fontSize = '13px';
                          span.style.color = '#eee';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%)',
                        pointerEvents: 'none'
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                position: 'relative',
                height: '20px',
                background: 'linear-gradient(180deg, #8B5E3C 0%, #6E4726 55%, #5A381D 100%)',
                borderRadius: '3px',
                boxShadow: '0 6px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute', top: '2px', left: '4%', right: '4%', height: '2px',
                  background: 'rgba(255,255,255,0.15)', borderRadius: '2px',
                  animation: 'shimmer 3.5s ease-in-out infinite'
                }} />
              </div>
            </div>
          ))}

          {pageBooks.length === 0 && (
            <p style={{ color: '#D9C2AE', textAlign: 'center', padding: '40px 0' }}>
              No books match "{searchTerm}"
            </p>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginTop: '20px',
          position: 'relative'
        }}>
          <button
            onClick={() => goToPage(clampedPage - 1)}
            disabled={clampedPage === 0}
            style={navBtnStyle(clampedPage === 0)}
          >
            Prev
          </button>

          <span style={{
            background: '#3A2418',
            color: '#F1E4D6',
            padding: '8px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600,
            minWidth: '52px',
            textAlign: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
          }}>
            {clampedPage + 1} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(clampedPage + 1)}
            disabled={clampedPage >= totalPages - 1}
            style={navBtnStyle(clampedPage >= totalPages - 1)}
          >
            Next
          </button>

          <button style={{
            position: 'absolute',
            right: 0,
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(180deg,#C9A88A,#B08D68)',
            border: 'none', cursor: 'pointer', fontSize: '15px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.4)'
          }}>
            &#8599;
          </button>
        </div>
      </div>
    </div>
  );
};

const sortPillStyle = (active) => ({
  padding: '7px 14px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  background: active ? '#3A2418' : '#4A342B',
  color: active ? '#F1E4D6' : '#C9B39F',
  boxShadow: active ? 'inset 0 1px 3px rgba(0,0,0,0.5)' : 'none',
  transition: 'all 0.2s ease'
});

const navBtnStyle = (disabled) => ({
  padding: '9px 18px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '13px',
  fontWeight: 600,
  cursor: disabled ? 'default' : 'pointer',
  background: disabled ? '#5a4a3f' : 'linear-gradient(180deg,#C9A88A,#B08D68)',
  color: disabled ? '#8a7566' : '#3A2418',
  opacity: disabled ? 0.5 : 1,
  boxShadow: disabled ? 'none' : '0 3px 8px rgba(0,0,0,0.35)',
  transition: 'all 0.2s ease'
});

export default LibraryPage;