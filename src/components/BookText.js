import React, { useState } from 'react';
import usePagesCount from '../hooks/usePagesCount';
import PageSelector from './PageSelector';

const BookText = ({ text, bookPath }) => {
  const { totalPages } = usePagesCount(bookPath);
  const [newText, setText] = useState(text);

  const handlePageTextUpdate = (text) => {
    setText(text);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[800px] h-[600px] p-4 rounded bg-white">
        <textarea
          className="w-full h-full p-2"
          value={newText}
          readOnly
        />
      </div>
      <div>
        <PageSelector totalPages={totalPages} bookPath={bookPath} onPageTextUpdate={handlePageTextUpdate} />
      </div>
    </div>
  );
};

export default BookText;
