import React, { useState, useEffect } from 'react';
import axios from 'axios';
import usePagesCount from '../hooks/usePagesCount';
import PageSelector from './PageSelector';

const BookText = ({ bookPath }) => {
  const { totalPages } = usePagesCount(bookPath);
  const [pageText, setPageText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchInitialText = async () => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await axios.get(`${backendUrl}/flip`, {
          params: {
            path: bookPath,
            page_num: currentPage
          }
        });
        console.log(currentPage);
        const initialText = response.data.text;
        setPageText(initialText);
      } catch (error) {
        console.error('Error fetching initial page text:', error);
      }
    };

    fetchInitialText();
  }, [bookPath, currentPage]);

  const handlePageTextUpdate = (text) => {
    setPageText(text);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[800px] h-[600px] p-4 rounded bg-white">
        <textarea
          className="w-full h-full p-2"
          value={pageText}
          readOnly
        />
      </div>
      <div>
        <PageSelector
          totalPages={totalPages}
          bookPath={bookPath}
          currentPage={currentPage}
          onPageTextUpdate={handlePageTextUpdate}
          setCurrentPage={setCurrentPage}
          pageText={pageText} // Pass the text to PageSelector
        />
      </div>
    </div>
  );
};

export default BookText;
