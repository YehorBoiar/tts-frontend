import { useState, useEffect } from 'react';

function useTtsType(bookPath) {
  const [ttsType, setTtsType] = useState(null);
  const [awsConfig, setAwsConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTtsType = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await fetch(`${backendUrl}/tts_model?book_path=${encodeURIComponent(bookPath)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTtsType(data.name);
        setAwsConfig(data.keys);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTtsType();
  }, [bookPath]);

  return { ttsType, awsConfig, error };
}

export default useTtsType;
