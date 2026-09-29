import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleVisibility from './components/ToggleVisibility';
import TodoList from './components/TodoList';
import ColorSwitcher from './components/ColorSwitcher';
import SearchFilter from './components/SearchFilter';
import DragDropList from './components/DragDropList';

import FaqAccordion from './usestate/FaqAccordion';
import ReviewForm from './usestate/ReviewForm';
import BmiCalculator from './usestate/BmiCalculator';
import StudentManager from './usestate/StudentManager';

function App() {
  return (
    <div className="container py-4">
      {/* 7 bài cũ */}
      <h1 className="text-center mb-4">
        React useState Exercises
      </h1>

      <div className="mb-4">
        <Counter />
      </div>

      <div className="mb-4">
        <ControlledInput />
      </div>

      <div className="mb-4">
        <ToggleVisibility />
      </div>

      <div className="mb-4">
        <TodoList />
      </div>

      <div className="mb-4">
        <ColorSwitcher />
      </div>

      <div className="mb-4">
        <SearchFilter />
      </div>

      <div className="mb-4">
        <DragDropList />
      </div>

      <hr className="my-5" />

      {/* BTVN */}
      <h1 className="text-center mb-4">
        useState BTVN
      </h1>

      <div className="mb-5">
        <FaqAccordion />
      </div>

      <div className="mb-5">
        <ReviewForm />
      </div>

      <div className="mb-5">
        <BmiCalculator />
      </div>

      <div className="mb-5">
        <StudentManager />
      </div>
    </div>
  );
}

export default App;