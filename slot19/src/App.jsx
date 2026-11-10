import { useState } from 'react';
import Counter from './components/Counter.jsx';
import FilterBar from './components/FilterBar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

export default function App() {
  const [activeExercise, setActiveExercise] = useState('todos');
  const isTodoExercise = activeExercise === 'todos';

  return (
    <main className="app-shell">
      <div className="container">
        <header className="page-heading text-center">
          <span className="eyebrow">FER202 · SLOT 19 · REDUX</span>
          <h1>Redux Lab</h1>
          <p>Thực hành quản lý state với Redux thuần và React Redux.</p>
        </header>
        <div className="exercise-tabs" role="tablist" aria-label="Bài tập Redux">
          <button
            id="todos-tab"
            className={`exercise-tab${isTodoExercise ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isTodoExercise}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('todos')}
          >
            Bài 2 · Todo List
          </button>
          <button
            id="counter-tab"
            className={`exercise-tab${!isTodoExercise ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={!isTodoExercise}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('counter')}
          >
            Bài 1 · Counter
          </button>
        </div>
        <section
          id="exercise-panel"
          className="exercise-panel"
          role="tabpanel"
          aria-labelledby={isTodoExercise ? 'todos-tab' : 'counter-tab'}
        >
          {isTodoExercise ? (
            <section className="todo-card mx-auto shadow-sm" aria-labelledby="todo-heading">
              <header className="todo-card-header">
                <div>
                  <span className="todo-kicker">REDUX THUẦN · COMBINEREDUCERS</span>
                  <h2 id="todo-heading">Danh sách công việc</h2>
                  <p>Thêm, cập nhật và lọc công việc trong Redux store.</p>
                </div>
              </header>
              <div className="todo-card-body">
                <TodoForm />
                <FilterBar />
                <TodoList />
              </div>
            </section>
          ) : (
            <Counter />
          )}
        </section>
        <p className="page-note text-center">
          Mỗi thao tác được gửi đến store thông qua một action.
        </p>
      </div>
    </main>
  );
}
