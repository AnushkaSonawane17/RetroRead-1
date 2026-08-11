import React from 'react';
import Card from '../Common/Card';
import Button from '../Common/Button';

const BookCard = ({ book }) => {
  const { title, author, price, rating } = book;

  return (
    <Card hover className="overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-[#0984E3]/10 to-[#6C5CE7]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📚</div>
          <p className="text-sm text-[#636E72]">No cover</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#2D3436] truncate">{title}</h3>
        <p className="text-sm text-[#636E72]">by {author}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            <span className="text-[#FDCB6E]">★</span>
            <span className="font-medium text-sm">{rating}</span>
          </div>
          <span className="text-lg font-bold text-[#0984E3]">${price}</span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Button variant="primary" size="small" fullWidth>Buy Now</Button>
      </div>
    </Card>
  );
};

export default BookCard;