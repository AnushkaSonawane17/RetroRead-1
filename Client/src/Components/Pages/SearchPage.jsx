// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { searchBooks } from '../lib/googleBooks.js';
// import { searchGutenberg } from '../lib/gutenberg.js';

// const SearchPage = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [gutenbergResults, setGutenbergResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [totalResults, setTotalResults] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0);
//   const RESULTS_PER_PAGE = 12;
//   const navigate = useNavigate();

//   const freeBooks = [
//     { id: '1342', title: 'Pride and Prejudice', author: 'Jane Austen' },
//     { id: '2701', title: 'Moby Dick', author: 'Herman Melville' },
//     { id: '1661', title: 'Sherlock Holmes', author: 'Arthur Conan Doyle' },
//     { id: '345', title: 'Dracula', author: 'Bram Stoker' },
//     { id: '84', title: 'Frankenstein', author: 'Mary Shelley' },
//     { id: '64317', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
//   ];

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     setCurrentPage(0);
//     try {
//       const googleData = await searchBooks(query, RESULTS_PER_PAGE, 0);
//       setResults(googleData.items || []);
//       setTotalResults(googleData.totalItems || 0);

//       const gutenbergData = await searchGutenberg(query);
//       setGutenbergResults(gutenbergData || []);
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMore = async () => {
//     const nextPage = currentPage + 1;
//     setLoading(true);
//     try {
//       const startIndex = nextPage * RESULTS_PER_PAGE;
//       const data = await searchBooks(query, RESULTS_PER_PAGE, startIndex);
//       setResults(prev => [...prev, ...(data.items || [])]);
//       setCurrentPage(nextPage);
//     } catch (error) {
//       console.error('Load more error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBookClick = (bookId) => {
//     navigate(`/book/${bookId}`);
//   };

//   const handleGutenbergClick = (bookId) => {
//     window.open(`https://www.gutenberg.org/ebooks/${bookId}`, '_blank');
//   };

//   const hasMore = results.length < totalResults;

//   return (
//     <div className="min-h-screen bg-[#F6EFE3] py-10 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-[#1E2A42] mb-2">📚 Search Books</h1>
//         <p className="text-gray-600 mb-6">Search millions of books from Google Books &amp; Project Gutenberg</p>

//         <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Search by title, author, or genre..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1 px-5 py-3 rounded-full border border-[#E2D5BC] bg-white focus:outline-none focus:ring-2 focus:ring-[#D8472F] text-[#1E2A42]"
//             autoFocus
//           />
//           <button 
//             type="submit" 
//             className="px-8 py-3 bg-[#D8472F] text-white rounded-full hover:bg-[#C0392B] transition font-medium"
//             disabled={loading}
//           >
//             {loading ? 'Searching...' : '🔍 Search'}
//           </button>
//         </form>

//         {/* Free Books Section */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-[#1E2A42] mb-3">📖 Free Full Books (Public Domain)</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
//             {freeBooks.map((book) => (
//               <button 
//                 key={book.id}
//                 onClick={() => handleGutenbergClick(book.id)}
//                 className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition text-center hover:-translate-y-1"
//               >
//                 <div className="text-3xl mb-2">📚</div>
//                 <p className="text-xs font-medium text-[#1E2A42] line-clamp-2">{book.title}</p>
//                 <p className="text-[10px] text-gray-500">{book.author}</p>
//                 <p className="text-[10px] text-[#D8472F] mt-1 font-medium">Read Free →</p>
//               </button>
//             ))}
//           </div>
//         </div>

//         {totalResults > 0 && (
//           <p className="text-gray-600 mb-4">Found {totalResults} books on Google Books</p>
//         )}

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {results.map((book) => {
//             const info = book.volumeInfo || {};
//             return (
//               <div 
//                 key={book.id} 
//                 onClick={() => handleBookClick(book.id)}
//                 className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
//               >
//                 <div className="relative">
//                   <img 
//                     src={info.imageLinks?.thumbnail || '📚'} 
//                     alt={info.title}
//                     className="w-full h-48 object-contain mb-2 group-hover:scale-105 transition duration-300"
//                     onError={(e) => e.target.src = '📚'}
//                   />
//                 </div>
//                 <p className="text-sm font-medium text-[#1E2A42] line-clamp-2 h-10">{info.title || 'Unknown'}</p>
//                 <p className="text-xs text-gray-500">{info.authors?.join(', ') || 'Unknown Author'}</p>
//                 {info.averageRating && (
//                   <p className="text-xs text-[#D8472F] mt-1">⭐ {info.averageRating}</p>
//                 )}
//                 <div className="mt-2 text-xs text-green-600">📖 Preview Available</div>
//               </div>
//             );
//           })}
//         </div>

//         {gutenbergResults.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-lg font-semibold text-[#1E2A42] mb-3">📚 Free Books from Project Gutenberg</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//               {gutenbergResults.map((book) => (
//                 <button
//                   key={book.id}
//                   onClick={() => handleGutenbergClick(book.id)}
//                   className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-xl transition hover:-translate-y-1"
//                 >
//                   <div className="text-4xl mb-2">📖</div>
//                   <p className="text-sm font-medium text-[#1E2A42] line-clamp-2">{book.title}</p>
//                   <p className="text-xs text-gray-500">{book.authors?.[0]?.name || 'Unknown'}</p>
//                   <p className="text-[10px] text-[#D8472F] mt-1 font-medium">Read Full Book →</p>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {results.length === 0 && query && !loading && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No books found.</p>
//             <p className="text-gray-400 text-sm mt-2">Try a different search term.</p>
//           </div>
//         )}

//         {hasMore && results.length > 0 && (
//           <div className="text-center mt-8">
//             <button
//               onClick={loadMore}
//               disabled={loading}
//               className="px-8 py-3 bg-white border border-[#D8472F] text-[#D8472F] rounded-full hover:bg-[#FFF5F0] transition font-medium disabled:opacity-50"
//             >
//               {loading ? 'Loading...' : 'Load More Books'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
import React, { useState, useEffect } from 'react';
import { searchBooks } from '../lib/googleBooks.js';
import { searchGutenberg } from '../lib/gutenberg.js';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [gutenbergResults, setGutenbergResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const RESULTS_PER_PAGE = 12;

  const freeBooks = [
    { id: '1342', title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: '2701', title: 'Moby Dick', author: 'Herman Melville' },
    { id: '1661', title: 'Sherlock Holmes', author: 'Arthur Conan Doyle' },
    { id: '345', title: 'Dracula', author: 'Bram Stoker' },
    { id: '84', title: 'Frankenstein', author: 'Mary Shelley' },
    { id: '64317', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: '11', title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll' },
    { id: '98', title: 'A Tale of Two Cities', author: 'Charles Dickens' },
    { id: '514', title: 'Little Women', author: 'Louisa May Alcott' },
    { id: '174', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde' },
    { id: '1260', title: 'Jane Eyre', author: 'Charlotte Bronte' },
    { id: '74', title: 'The Adventures of Tom Sawyer', author: 'Mark Twain' },
  ];

  // Cycling placeholder — loops through book titles present on this page
  const placeholderTitles = [...freeBooks.map(b => b.title), 'Atomic Habits', 'Dune', 'The Hobbit'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholderTitles.length);
    }, 2200);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setCurrentPage(0);
    try {
      const googleData = await searchBooks(query, RESULTS_PER_PAGE, 0);
      setResults(googleData.items || []);
      setTotalResults(googleData.totalItems || 0);

      const gutenbergData = await searchGutenberg(query);
      setGutenbergResults(gutenbergData || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);
    try {
      const startIndex = nextPage * RESULTS_PER_PAGE;
      const data = await searchBooks(query, RESULTS_PER_PAGE, startIndex);
      setResults(prev => [...prev, ...(data.items || [])]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Opens the real book page — previously navigated to a /book/:id route
  // that didn't exist, so clicks silently did nothing.
  const handleBookClick = (book) => {
    const link = book.volumeInfo?.previewLink || book.volumeInfo?.infoLink;
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      alert("Couldn't find this book online.");
    }
  };

  const handleGutenbergClick = (bookId) => {
    window.open(`https://www.gutenberg.org/ebooks/${bookId}`, '_blank');
  };

  const hasMore = results.length < totalResults;

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1E2A42] mb-2">📚 Search Books</h1>
        <p className="text-gray-600 mb-6">Search millions of books from Google Books &amp; Project Gutenberg</p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder={`Search "${placeholderTitles[placeholderIndex]}"...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full border border-[#E2D5BC] bg-white focus:outline-none focus:ring-2 focus:ring-[#D8472F] text-[#1E2A42] transition-all"
            autoFocus
          />
          <button 
            type="submit" 
            className="px-8 py-3 bg-[#D8472F] text-white rounded-full hover:bg-[#C0392B] transition font-medium"
            disabled={loading}
          >
            {loading ? 'Searching...' : '🔍 Search'}
          </button>
        </form>

        {/* Free Books Section — now with real covers */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#1E2A42] mb-3">📖 Free Full Books (Public Domain)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {freeBooks.map((book) => (
              <button 
                key={book.id}
                onClick={() => handleGutenbergClick(book.id)}
                className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition text-center hover:-translate-y-1"
              >
                <img
                  src={`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`}
                  alt={book.title}
                  className="w-full h-28 object-cover rounded mb-2 bg-[#E2D5BC]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-28 rounded mb-2 bg-gradient-to-br from-[#7a6252] to-[#4d3a2d] items-center justify-center text-3xl">
                  📚
                </div>
                <p className="text-xs font-medium text-[#1E2A42] line-clamp-2">{book.title}</p>
                <p className="text-[10px] text-gray-500">{book.author}</p>
                <p className="text-[10px] text-[#D8472F] mt-1 font-medium">Read Free →</p>
              </button>
            ))}
          </div>
        </div>

        {totalResults > 0 && (
          <p className="text-gray-600 mb-4">Found {totalResults} books on Google Books</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((book) => {
            const info = book.volumeInfo || {};
            return (
              <div 
                key={book.id} 
                onClick={() => handleBookClick(book)}
                className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
              >
                <div className="relative">
                  {info.imageLinks?.thumbnail ? (
                    <img 
                      src={info.imageLinks.thumbnail} 
                      alt={info.title}
                      className="w-full h-48 object-contain mb-2 group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 mb-2 flex items-center justify-center text-5xl bg-[#F6EFE3] rounded">
                      📚
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium text-[#1E2A42] line-clamp-2 h-10">{info.title || 'Unknown'}</p>
                <p className="text-xs text-gray-500">{info.authors?.join(', ') || 'Unknown Author'}</p>
                {info.averageRating && (
                  <p className="text-xs text-[#D8472F] mt-1">⭐ {info.averageRating}</p>
                )}
                <div className="mt-2 text-xs text-green-600">📖 Preview Available</div>
              </div>
            );
          })}
        </div>

        {gutenbergResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#1E2A42] mb-3">📚 Free Books from Project Gutenberg</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {gutenbergResults.map((book) => (
                <button
                  key={book.id}
                  onClick={() => handleGutenbergClick(book.id)}
                  className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-xl transition hover:-translate-y-1"
                >
                  <img
                    src={`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`}
                    alt={book.title}
                    className="w-full h-28 object-cover rounded mb-2 bg-[#E2D5BC]"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-28 rounded mb-2 bg-gradient-to-br from-[#7a6252] to-[#4d3a2d] items-center justify-center text-3xl">
                    📖
                  </div>
                  <p className="text-sm font-medium text-[#1E2A42] line-clamp-2">{book.title}</p>
                  <p className="text-xs text-gray-500">{book.authors?.[0]?.name || 'Unknown'}</p>
                  <p className="text-[10px] text-[#D8472F] mt-1 font-medium">Read Full Book →</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && query && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found.</p>
            <p className="text-gray-400 text-sm mt-2">Try a different search term.</p>
          </div>
        )}

        {hasMore && results.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-white border border-[#D8472F] text-[#D8472F] rounded-full hover:bg-[#FFF5F0] transition font-medium disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load More Books'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;