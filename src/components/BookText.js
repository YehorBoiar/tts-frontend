// BookText.js
import React from 'react';

const BookText = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[800px] h-[600px] p-4 border border-gray-300 rounded bg-white shadow-lg">
        <textarea
          className="w-full h-full p-2 border-none outline-none resize-none"
          value={text}
          readOnly
        />
      </div>
    </div>
  );
};

export default BookText;
