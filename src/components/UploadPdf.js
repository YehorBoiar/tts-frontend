// UploadPdf.js
import React, { useState } from 'react';

const UploadPdf = ({ setText }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      const response = await fetch('http://localhost:8000/text', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setText(data.text);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.detail);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-2"/>
      <button
        className="mt-2 px-4 py-2 text-black rounded"
        onClick={handleUpload}
      >
        Upload PDF
      </button>
    </div>
  );
};

export default UploadPdf;
