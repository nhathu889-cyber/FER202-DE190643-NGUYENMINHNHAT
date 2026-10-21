
import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosDemo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Axios Demo</h2>
      {data ? (
        <>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AxiosDemo;
