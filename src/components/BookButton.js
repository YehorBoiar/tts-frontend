import React, { useEffect, useState } from 'react';

const BookButton = ({ book, onClick }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const getImageSrc = (path) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const imageUrl = `${backendUrl}/get_image?book_path=${encodeURIComponent(path)}`;
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    if (book.path) {
      getImageSrc(book.path);
    }
  }, [book.path]);

  const handleClick = () => {
    onClick(book.path);
  };

  const renderImage = () => {
    if (imageSrc) {
      return <img src={imageSrc} alt="Book cover" className="w-24 h-32 mr-2 rounded-md" />;
    }
    return null;
  };

  const renderTitle = () => {
    if (book.metadata && book.metadata["/Title"]) {
      return `${book.metadata["/Title"]} by ${book.metadata["/Author"]}`;
    }
    return "Unknown Book";
  };

  return (
    <div className="mb-2 bg-gray-200 flex flex-col items-center p-2 rounded-md">
      <button onClick={handleClick} className="text-black hover:underline justify-center items-center flex flex-col">
        {renderImage()}
        {renderTitle()}
      </button>
    </div>
  );
};

export default BookButton;
