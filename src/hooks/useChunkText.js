import { useState } from 'react';

function useChunkText() {
  const [textChunks, setTextChunks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chunkText = async (text, chunkSize = 300) => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/chunk_text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, chunk_size: chunkSize })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTextChunks(data.chunks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearTextChunks = () => {
    setTextChunks([]);
  };

  return { textChunks, chunkText, clearTextChunks, loading, error };
}

export default useChunkText;
