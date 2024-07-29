import { useState, useEffect } from 'react';
import axios from 'axios';

const usePagesCount = (bookPath) => {
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    const fetchPagesCount = async () => {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      try {
        const response = await axios.get(`${backendUrl}/get_pages_num`, {
          params: { path: bookPath }
        });
        setTotalPages(parseInt(response.data.text, 10)-1);
      } catch (err) {
        console.error('Error fetching pages count:', err);
      }
    };

    fetchPagesCount();
  }, [bookPath]);

  return { totalPages };
};

export default usePagesCount;
