import { useState } from 'react';
import './App.css';

import Bai1 from './bai1/Bai1';
import Bai2 from './bai2/Bai2';
import Bai3 from './bai3/Bai3';
import Bai4 from './bai4/Bai4';
import Bai5 from './bai5/Bai5';
import Bai6 from './bai6/Bai6';
import Bai7 from './bai7/Bai7';
import Bai8 from './bai8/Bai8';
import Bai9 from './bai9/Bai9';
import Bai10 from './bai10/Bai10';

const App = () => {
  const [currentBai, setCurrentBai] =
    useState(10);

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

        <button onClick={() => setCurrentBai(4)}>
          Bài 4
        </button>

        <button onClick={() => setCurrentBai(5)}>
          Bài 5
        </button>

        <button onClick={() => setCurrentBai(6)}>
          Bài 6
        </button>

        <button onClick={() => setCurrentBai(7)}>
          Bài 7
        </button>

        <button onClick={() => setCurrentBai(8)}>
          Bài 8
        </button>

        <button onClick={() => setCurrentBai(9)}>
          Bài 9
        </button>

        <button onClick={() => setCurrentBai(10)}>
          Bài 10
        </button>
      </div>

      <hr />

      {currentBai === 1 && <Bai1 />}
      {currentBai === 2 && <Bai2 />}
      {currentBai === 3 && <Bai3 />}
      {currentBai === 4 && <Bai4 />}
      {currentBai === 5 && <Bai5 />}
      {currentBai === 6 && <Bai6 />}
      {currentBai === 7 && <Bai7 />}
      {currentBai === 8 && <Bai8 />}
      {currentBai === 9 && <Bai9 />}
      {currentBai === 10 && <Bai10 />}
    </>
  );
};

export default App;