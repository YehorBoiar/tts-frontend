import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookButton from './AddBookButton';
import BookButton from './BookButton';

const SidePanel = ({ setText }) => {
  const [books, setBooks] = useState([]);
  const [selectedBookPath, setSelectedBookPath] = useState(null);

  const getCookie = (name) => {
    const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${name}=`));
    return cookie ? cookie.split('=')[1] : null;
  };

  const fetchBooks = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = getCookie('token');
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/books`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookClick = async (path) => {
    if (path === selectedBookPath) {
      return; // Do nothing if the same book is clicked
    }  
    setSelectedBookPath(path);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const token = getCookie('token');
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/get_book`, {
        params: { path },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setText(response.data.text, path);
    } catch (error) {
      console.error("There was an error fetching the book text:", error);
    }
  };

  return (
    <div className="w-72 h-screen bg-gray-700 space-y-3 shadow-lg p-5 flex flex-col">
      <div className="flex justify-center mb-4">
        <AddBookButton onBookAdded={fetchBooks} />
      </div>
      <div className="overflow-y-auto flex-1 space-y-8">
        {books.map((book, index) => (
          <BookButton key={index} book={book} onClick={handleBookClick} />
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
