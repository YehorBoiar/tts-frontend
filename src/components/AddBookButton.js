import React from 'react';
import axios from 'axios';

const AddBookButton = ({ onBookAdded }) => {
  const fileInputRef = React.createRef();

  const addBook = async () => {
    const fileInput = fileInputRef.current;
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const formData = new FormData();
    formData.append('pdf_file', file);
    const cookie = document.cookie.split(';').find(cookie => cookie.startsWith('token')).split('=')[1];
    try {
      await axios.post(`${backendUrl}/add_book`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${cookie}`
        }
      });

      fileInput.value = '';
      if (onBookAdded) {
        onBookAdded();
      }
    } catch (error) {
      console.error("There was an error adding the book:", error);
      alert("There was an error adding the book.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={addBook}
      />
      <button className="text-white bg-black py-2 px-4 rounded-md" onClick={handleButtonClick}>Add Book</button>
    </div>
  );
};

export default AddBookButton;
