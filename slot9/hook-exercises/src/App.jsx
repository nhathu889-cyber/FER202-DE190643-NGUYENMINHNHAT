import { useState } from 'react';
import './App.css';

import Bai1 from './bai1/Bai1';
import Bai2 from './bai2/Bai2';
import Bai3 from './bai3/Bai3';

const App = () => {
  const [currentBai, setCurrentBai] = useState(3);

  return (
    <>
      <div className="exercise-menu">
        <button onClick={() => setCurrentBai(1)}>
          Bài 1
        </button>

        <button onClick={() => setCurrentBai(2)}>
          Bài 2
        </button>

        <button onClick={() => setCurrentBai(3)}>
          Bài 3
        </button>
      </div>

      <hr />

      {currentBai === 1 && <Bai1 />}
      {currentBai === 2 && <Bai2 />}
      {currentBai === 3 && <Bai3 />}
    </>
  );
};

export default App;