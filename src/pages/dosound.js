import React, { useState } from 'react';
import BookText from '../components/BookText';
import PageSelector from '../components/PageSelector';
import SidePanel from '../components/SidePanel';
import usePagesCount from '../hooks/usePagesCount';

const Dosound = () => {
  const [text, setText] = useState('');
  const [bookPath, setBookPath] = useState('');
  const { totalPages } = usePagesCount(bookPath);


  const handleBookSelected = (bookText, path) => {
    setText(bookText);
    setBookPath(path);
  };

  return (
    <div className="h-screen flex">
      <SidePanel setText={handleBookSelected} />
      <div className="flex-1 p-4 ml-64">
        {text && <BookText text={text} bookPath={bookPath}/>}
      </div>
    </div>
  );
};

export default Dosound;
