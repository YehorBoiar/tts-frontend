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

  return (
    <div className="mb-2 bg-gray-200 flex flex-col items-center p-2 rounded-md">
      <button onClick={() => onClick(book.path)} className="text-black hover:underline justify-center items-center flex flex-col">
        {imageSrc && <img src={imageSrc} alt="Book cover" className="w-24 h-32 mr-2 rounded-md" />}
        {book.metadata && book.metadata["/Title"] ? `${book.metadata["/Title"]} by ${book.metadata["/Author"]}` : "Unknown Book"}
      </button>
    </div>
  );
};

export default BookButton;
