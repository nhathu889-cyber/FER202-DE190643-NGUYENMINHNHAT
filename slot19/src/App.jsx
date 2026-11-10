import { useState } from 'react';
import Counter from './components/Counter.jsx';
import FilterBar from './components/FilterBar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import UserList from './components/UserList.jsx';
import UserPosts from './components/UserPosts.jsx';

export default function App() {
  const [activeExercise, setActiveExercise] = useState('users');
  const isTodoExercise = activeExercise === 'todos';
  const isCounterExercise = activeExercise === 'counter';

  return (
    <main className="app-shell">
      <div className="container">
        <header className="page-heading text-center">
          <span className="eyebrow">FER202 · SLOT 19 · BÀI TẬP REDUX</span>
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
            className={`exercise-tab${isCounterExercise ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isCounterExercise}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('counter')}
          >
            Bài 1 · Counter
          </button>
          <button
            id="users-tab"
            className={`exercise-tab${activeExercise === 'users' ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeExercise === 'users'}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('users')}
          >
            Bài 3 · Users
          </button>
        </div>
        <section
          id="exercise-panel"
          className="exercise-panel"
          role="tabpanel"
          aria-labelledby={
            isTodoExercise ? 'todos-tab' : isCounterExercise ? 'counter-tab' : 'users-tab'
          }
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
          ) : isCounterExercise ? (
            <Counter />
          ) : (
            <section className="users-card mx-auto shadow-sm" aria-labelledby="users-heading">
              <header className="users-card-header">
                <span className="counter-mark" aria-hidden="true">U</span>
                <div>
                  <span className="todo-kicker">REDUX THUNK · JSONPLACEHOLDER</span>
                  <h2 id="users-heading">Người dùng &amp; bài viết</h2>
                  <p>Tải dữ liệu bất đồng bộ và lưu vào Redux store.</p>
                </div>
              </header>
              <div className="users-layout">
                <div className="users-column">
                  <h3 className="users-section-title">Danh sách người dùng</h3>
                  <UserList />
                </div>
                <div className="posts-column">
                  <UserPosts />
                </div>
              </div>
            </section>
          )}
        </section>
        <p className="page-note text-center">
          Mỗi thao tác được gửi đến store thông qua một action.
        </p>
      </div>
    </main>
  );
}
