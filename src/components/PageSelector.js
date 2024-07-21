import React, { useState } from 'react';
import axios from 'axios';

const PageSelector = ({ totalPages, bookPath, onPageTextUpdate }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageText, setPageText] = useState("");

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
        setPageText(newText); // Set the new page text
        onPageTextUpdate(newText); // Call the callback with the new page text
      } catch (error) {
        console.error('Error fetching page text:', error);
      }
    }
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 border rounded">
      <div className="flex items-center space-x-2">
        <select className="p-1 border rounded">
          <option>api</option>
        </select>
        <input
          type="text"
          placeholder="speed"
          className="p-1 border rounded"
        />
        <button className="p-1 border rounded bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center space-x-2 bg-gray-400 p-1 rounded">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="text-white"
        >
          &lt;
        </button>
        <span className="text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="text-white"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PageSelector;
