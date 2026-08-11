import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookDetails } from '../lib/googleBooks.js';

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookDetails(bookId);
        if (data) {
          setBook(data);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Error loading book details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-pulse">📖</div>
          <p className="text-gray-500 mt-3">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-[#F6EFE3] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl">📚</div>
          <p className="text-gray-500 mt-3">{error || 'Book not found'}</p>
          <Link to="/search" className="text-[#D8472F] hover:underline mt-4 inline-block">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const info = book.volumeInfo || {};
  const description = info.description || 'No description available.';

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Link to="/search" className="inline-flex items-center gap-2 text-[#8A7F6B] hover:text-[#D8472F] transition mb-6 text-sm">
          <span>←</span> Back to Search
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 p-8 bg-[#FFFBF3] flex items-center justify-center">
              <div className="relative">
                <img 
                  src={info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || '📚'} 
                  alt={info.title}
                  className="w-full max-w-xs rounded-lg shadow-2xl"
                  onError={(e) => e.target.src = '📚'}
                />
                {info.averageRating && (
                  <div className="absolute -bottom-3 -right-3 bg-[#D8472F] text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                    ⭐ {info.averageRating}
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <h1 className="text-3xl font-bold text-[#1E2A42] leading-tight">
                {info.title || 'Unknown Title'}
              </h1>

              <p className="text-lg text-gray-600 mt-2">
                by {info.authors?.join(', ') || 'Unknown Author'}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                {info.publisher && <span>📚 {info.publisher}</span>}
                {info.publishedDate && <span>📅 {info.publishedDate}</span>}
                {info.pageCount && <span>📄 {info.pageCount} pages</span>}
              </div>

              {info.categories && info.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {info.categories.slice(0, 4).map((category) => (
                    <span key={category} className="px-3 py-1 bg-[#F6EFE3] rounded-full text-xs text-[#8A7F6B]">
                      {category}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[#8A7F6B] uppercase tracking-wider mb-2">
                  About this book
                </h3>
                <div className="prose prose-sm max-h-72 overflow-y-auto text-gray-700 leading-relaxed pr-2">
                  {description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-3">{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-700">
                  📖 <strong>Tip:</strong> Check the <strong>"Free Full Books"</strong> section on the Search page for complete books!
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#E2D5BC]">
                {info.previewLink && (
                  <a 
                    href={info.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#D8472F] text-white rounded-full hover:bg-[#C0392B] transition hover:shadow-lg flex items-center gap-2 text-sm font-medium"
                  >
                    📖 Read Preview
                  </a>
                )}
                {info.infoLink && (
                  <a 
                    href={info.infoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#D8472F] text-[#D8472F] rounded-full hover:bg-[#FFF5F0] transition text-sm font-medium"
                  >
                    🔗 More Info
                  </a>
                )}
                {!info.previewLink && (
                  <a 
                    href={`https://books.google.com/books?id=${book.id}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#D8472F] text-white rounded-full hover:bg-[#C0392B] transition hover:shadow-lg flex items-center gap-2 text-sm font-medium"
                  >
                    📖 Read on Google Books
                  </a>
                )}
              </div>

              {info.previewLink && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-[#8A7F6B] uppercase tracking-wider mb-3">
                    📖 Book Preview
                  </h3>
                  <div className="border rounded-lg overflow-hidden" style={{ height: '500px' }}>
                    <iframe
                      src={info.previewLink}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="Book Preview"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .prose p { margin-bottom: 0.75rem; line-height: 1.8; }
        .prose { color: #4A4A4A; }
      `}</style>
    </div>
  );
};

export default BookDetailsPage;