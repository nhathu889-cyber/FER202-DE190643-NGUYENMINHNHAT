import { useState } from 'react';
import './App.css';
import Bai1 from './bai1/Bai1';
import Bai2 from './bai2/Bai2';

const App = () => {
  const [currentBai, setCurrentBai] = useState(1);

  return (
    <>
      <div className="exercise-menu">
        <button onClick={() => setCurrentBai(1)}>
          Bài 1
        </button>

        <button onClick={() => setCurrentBai(2)}>
          Bài 2
        </button>
      </div>

      <hr />

      {currentBai === 1 && <Bai1 />}
      {currentBai === 2 && <Bai2 />}
    </>
  );
};

export default App;