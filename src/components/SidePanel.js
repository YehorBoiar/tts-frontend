import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookButton from './AddBookButton';
import BookButton from './BookButton';

const SidePanel = ({ setText }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const cookie = document.cookie.split(';').find(cookie => cookie.startsWith('token')).split('=')[1];
    try {
      const response = await axios.get(`${backendUrl}/books`, {
        headers: {
          'Authorization': `Bearer ${cookie}`
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
    console.log(path);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const cookie = document.cookie.split(';').find(cookie => cookie.startsWith('token')).split('=')[1];
    try {
      const response = await axios.get(`${backendUrl}/get_book`, {
        params: { path },
        headers: {
          'Authorization': `Bearer ${cookie}`
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
