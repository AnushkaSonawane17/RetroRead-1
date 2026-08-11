import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

const BookReader = ({ book }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');

  const totalPages = 324; // Will be dynamic from book data

  const themes = {
    light: 'bg-white text-[#2D3436]',
    dark: 'bg-[#2D3436] text-white',
    sepia: 'bg-[#F4ECD8] text-[#2D3436]',
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        {/* Reader Controls */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Button size="small" variant="outline" onClick={() => setFontSize(f => f - 2)}>
              A-
            </Button>
            <span className="text-sm font-medium">{fontSize}px</span>
            <Button size="small" variant="outline" onClick={() => setFontSize(f => f + 2)}>
              A+
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {Object.keys(themes).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-8 h-8 rounded-full border-2 ${
                  theme === t ? 'border-[#0984E3]' : 'border-transparent'
                }`}
                style={{
                  background: t === 'light' ? '#FFFFFF' : t === 'dark' ? '#2D3436' : '#F4ECD8',
                  border: t === 'dark' ? '2px solid #636E72' : undefined,
                }}
              />
            ))}
          </div>

          <Button
            size="small"
            variant={isBookmarked ? 'primary' : 'outline'}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </Button>
        </div>

        {/* Book Content */}
        <div 
          className={`flex-1 p-6 rounded-lg ${themes[theme]} transition-all duration-300`}
          style={{ fontSize: `${fontSize}px` }}
        >
          <h2 className="text-2xl font-bold mb-4">Chapter {Math.ceil(currentPage / 20)}</h2>
          <p className="leading-relaxed">
            This is where the book content will be displayed. The text will flow 
            naturally and be readable in different themes and font sizes.
          </p>
          {/* More content will be rendered here */}
        </div>

        {/* Page Navigation */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <Button
            size="small"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            ← Previous
          </Button>

          <span className="text-sm text-[#636E72]">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            size="small"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next →
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookReader;