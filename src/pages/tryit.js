import React, { useState } from 'react';
import BookText from '../components/BookText';

const TryIt = () => {
  const [text, setText] = useState('');
  const [bookPath, setBookPath] = useState('');

  return (
    <div className="h-screen flex">
      <div className="flex-1 p-4 ml-64">
        {text && <BookText text={text} bookPath={bookPath}/>}
      </div>
    </div>
  );
};

export default TryIt;
