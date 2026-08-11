// src/api/googleBooks.browser.js
// ✅ Browser-safe version - NO Node.js modules!

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1';

console.log('🔑 Browser API Key:', API_KEY ? '✅ Loaded' : '❌ Not loaded');

export const searchBooks = async (query, maxResults = 12, startIndex = 0) => {
  if (!API_KEY) {
    console.error('❌ API Key missing!');
    return { items: [], totalItems: 0 };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Books found:', data.totalItems || 0);
    return data;
  } catch (error) {
    console.error('❌ Error fetching books:', error);
    return { items: [], totalItems: 0 };
  }
};

export const getTrendingBooks = async () => {
  if (!API_KEY) return { items: [] };
  try {
    const response = await fetch(
      `${BASE_URL}/volumes?q=subject:fiction&orderBy=relevance&maxResults=10&key=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending books:', error);
    return { items: [] };
  }
};

export const getBookDetails = async (bookId) => {
  if (!API_KEY) return null;
  try {
    const response = await fetch(
      `${BASE_URL}/volumes/${bookId}?key=${API_KEY}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};