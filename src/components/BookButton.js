import React, { useEffect, useRef, useState } from 'react';
import ContextMenu from './ContextMenu';
import deleteButton from '../hooks/deleteButton';
import TtsDropdownMenu from './TtsDropMenu';

const BookButton = ({ book, onClick, onDelete }) => {
  const deleteBook = deleteButton();
  const contextMenuRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    position: { x: 0, y: 0 },
    toggled: false
  });
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

  useEffect(() => {
    function handler(e) {
      if(!contextMenuRef.current) return;
      if (!contextMenuRef.current.contains(e.target)) {
        setContextMenu({
          position: { x: 0, y: 0 },
          toggled: false
        });
      }
    }

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

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

  const handleContextMenu = (e) => {
    e.preventDefault();
    const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
    const isLeft = e.clientX < window.innerWidth / 2;
    let x 
    let y = e.clientY
    if(isLeft){
      x = e.clientX
    }else{
      x = e.clientX - contextMenuAttr.width
    }

    setContextMenu({
      position: { x, y },
      toggled: true
    });
    console.log("Context menu clicked");
  };

  return (
    <div className="mb-2 bg-gray-200 flex flex-col items-center p-2 rounded-md ">
      <button onClick={handleClick} onContextMenu={(e) => handleContextMenu(e)} className="text-black hover:underline justify-center items-center flex flex-col">
        {renderImage()}
        {renderTitle()}
      </button>
      <div className="flex flex-col items-center justify-center">
            <TtsDropdownMenu />
      </div>
      <ContextMenu 
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x} 
        positionY={contextMenu.position.y}
        buttons={[
          { text: 'Delete', icon: 'icon-trash', onClick: () => deleteBook(book.path, onDelete) },
        ]}
      />
    </div>
  );
};

export default BookButton;
