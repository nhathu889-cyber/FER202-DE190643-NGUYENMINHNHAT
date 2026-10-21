
import { useState, useEffect } from 'react';
import postApi from '../api/postApi';

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getById(1);
        setData(response.data);
      } catch (err) {
        setError(err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Axios Demo - Async/Await</h2>
      <h3>{data?.title}</h3>
      <p>{data?.body}</p>
    </div>
  );
}

export default AxiosDemo;
