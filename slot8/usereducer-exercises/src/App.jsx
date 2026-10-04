import { useState } from 'react';
import Bai1 from './usereducer/Bai1';
import Bai2 from './usereducer/Bai2';
import Bai3 from './usereducer/Bai3';
import Bai4 from './usereducer/Bai4';
import Bai5 from './usereducer/Bai5';

function App() {
  const [activeExercise, setActiveExercise] = useState(1);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-5">
        React useReducer Exercises
      </h1>

      <nav
        className="d-flex flex-wrap justify-content-center gap-2 mb-4"
        aria-label="Chọn bài tập"
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <button
            key={number}
            type="button"
            className={`btn ${activeExercise === number ? 'btn-primary' : 'btn-outline-primary'}`}
            aria-pressed={activeExercise === number}
            aria-controls={`bai-${number}`}
            onClick={() => setActiveExercise(number)}
          >
            Bài {number}
          </button>
        ))}
      </nav>

      {/* Giữ trạng thái từng bài khi chuyển qua lại. */}
      <div id="bai-1" className="mb-5" hidden={activeExercise !== 1}>
        <Bai1 />
      </div>

      <div id="bai-2" className="mb-5" hidden={activeExercise !== 2}>
        <Bai2 />
      </div>

      <div id="bai-3" className="mb-5" hidden={activeExercise !== 3}>
        <Bai3 />
      </div>

      <div id="bai-4" className="mb-5" hidden={activeExercise !== 4}>
        <h2 className="text-center mb-4">
          Bài 4: Form đăng ký khóa học
        </h2>

        <Bai4 />
      </div>

      <div id="bai-5" className="mb-5" hidden={activeExercise !== 5}>
        <Bai5 />
      </div>
    </div>
  );
}

export default App;
