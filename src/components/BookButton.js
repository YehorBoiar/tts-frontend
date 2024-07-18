import React from 'react';

const BookButton = ({ book, onClick }) => {
  return (
    <div className="mb-2 bg-gray-200">
      <button onClick={() => onClick(book.path)} className="text-black hover:underline">
        {book.metadata && book.metadata["/Title"] ? `${book.metadata["/Title"]} by ${book.metadata["/Author"]}` : "Unknown Book"}
      </button>
    </div>
  );
};

export default BookButton;
