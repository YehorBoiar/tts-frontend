import React, { useState } from 'react';
import UploadPdf from '../components/UploadPdf';
import BookText from '../components/BookText';
import PageSelector from '../components/PageSelector';
import SidePanel from '../components/SidePanel';

const Dosound = () => {
  const [text, setText] = useState('');
  const totalPages = 3; // Example total pages, you can adjust this as needed

  const handlePageChange = (page) => {
    console.log('Selected page:', page);
    // Implement the logic to display the text of the selected page
  };

  return (
    <div className="flex">
      <SidePanel />
      <div className="flex-1 p-4">
        {!text && <UploadPdf setText={setText} />}
        {text && <BookText text={text} />}
        {text && (
          <div>
            <PageSelector totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dosound;
