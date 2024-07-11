import React, { useState } from 'react';
import BookText from '../components/BookText';
import PageSelector from '../components/PageSelector';
import SidePanel from '../components/SidePanel';
import AddBookButton from '../components/AddBookButton'; // Ensure correct import path

const Dosound = () => {
  const [text, setText] = useState('');
  const totalPages = 3; // Example total pages, you can adjust this as needed

  const handlePageChange = (page) => {
    console.log('Selected page:', page);
    // Implement the logic to display the text of the selected page
  };

  return (
    <div className="flex">
      <SidePanel setText={setText}/>
      <div className="flex-1 p-4">
        {text && <BookText text={text} />}
        {text && (
          <div>
            <PageSelector totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
        <AddBookButton /> 
      </div>
    </div>
  );
};

export default Dosound;
