import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SidePanel = ({ setText }) => {
  const [books, setBooks] = useState([]);
// TODO - handle the case when user is not logged in
  useEffect(() => {
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
    <div className="w-72 h-screen bg-gray-100 shadow-lg p-5 flex flex-col">
      <input id="file-upload" type="file" className="hidden" accept="application/pdf" />
      <div className="overflow-y-auto flex-1 mt-4">
        {books.map((book, index) => (
          <div key={index} className="mb-2">
            <button onClick={() => handleBookClick(book.path)} className="text-blue-500 hover:underline">
              {book.metadata && book.metadata["/Title"] ? `${book.metadata["/Title"]} by ${book.metadata["/Author"]}` : "Unknown Book"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
