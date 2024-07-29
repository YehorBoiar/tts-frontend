import React from 'react';
import axios from 'axios';
import PlayAudioButton from './PlayAudioButton';

const PageSelector = ({ totalPages, bookPath, currentPage, onPageTextUpdate, setCurrentPage, pageText }) => {

  const handlePageChange = async (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await axios.get(`${backendUrl}/flip`, {
          params: {
            path: bookPath,
            page_num: newPage
          }
        });
        const newText = response.data.text;
        onPageTextUpdate(newText); // Call the callback with the new page text
      } catch (error) {
        console.error('Error fetching page text:', error);
      }
    }
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 border rounded">
      <div className="flex items-center space-x-2 bg-gray-400 p-1 rounded">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="text-white"
        >
          &lt;
        </button>
        <span className="text-white">
          {currentPage+1} / {totalPages+1}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="text-white"
        >
          &gt;
        </button>
      </div>
      <PlayAudioButton text={pageText} bookPath={bookPath} /> {/* Pass the text to PlayAudioButton */}
    </div>
  );
};

export default PageSelector;
