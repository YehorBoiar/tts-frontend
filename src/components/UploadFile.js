import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setDownloadUrl(null);

    if (!file) {
      setError("No file selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const backendUrl = process.env.BACKEND_URL;
    try {
      const response = await axios.post(`${backendUrl}/synthesize`, formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);
    } catch (err) {
      setError("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Upload PDF to Generate .wav</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-3 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Upload and Generate'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download="output.wav"
              className="text-blue-500"
            >
              Download .wav file
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
