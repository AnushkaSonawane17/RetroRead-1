// src/lib/gutenberg.js

const GUTENBERG_API = 'https://gutendex.com/books';

export const searchGutenberg = async (query) => {
  try {
    const response = await fetch(`${GUTENBERG_API}?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Gutenberg search error:', error);
    return [];
  }
};

export const getGutenbergBook = async (bookId) => {
  try {
    const response = await fetch(`${GUTENBERG_API}/${bookId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Gutenberg book:', error);
    return null;
  }
};

export const getGutenbergText = async (bookId) => {
  try {
    const response = await fetch(`https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`);
    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error('Error fetching book text:', error);
    return null;
  }
};