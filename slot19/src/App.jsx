import { useState } from 'react';
import Counter from './components/Counter.jsx';
import FilterBar from './components/FilterBar.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import UserList from './components/UserList.jsx';
import UserPosts from './components/UserPosts.jsx';
import Cart from './components/Cart.jsx';
import CartBadge from './components/CartBadge.jsx';
import ProductList from './components/ProductList.jsx';
import StudentFormModal from './components/StudentFormModal.jsx';
import StudentTable from './components/StudentTable.jsx';
import Toolbar from './components/Toolbar.jsx';

export default function App() {
  const [activeExercise, setActiveExercise] = useState('students');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const isTodoExercise = activeExercise === 'todos';
  const isCounterExercise = activeExercise === 'counter';
  const isShopExercise = activeExercise === 'shop';
  const isStudentExercise = activeExercise === 'students';

  const openAddStudent = () => {
    setEditingStudent(null);
    setShowStudentModal(true);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setShowStudentModal(true);
  };

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
          <button
            id="shop-tab"
            className={`exercise-tab${isShopExercise ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isShopExercise}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('shop')}
          >
            Bài 4 · Shop
          </button>
          <button
            id="students-tab"
            className={`exercise-tab${isStudentExercise ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={isStudentExercise}
            aria-controls="exercise-panel"
            onClick={() => setActiveExercise('students')}
          >
            Bài 5 · Sinh viên
          </button>
        </div>
        <section
          id="exercise-panel"
          className="exercise-panel"
          role="tabpanel"
          aria-labelledby={
            isTodoExercise
              ? 'todos-tab'
              : isCounterExercise
                ? 'counter-tab'
                : activeExercise === 'users'
                  ? 'users-tab'
                    : isShopExercise
                      ? 'shop-tab'
                      : 'students-tab'
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
          ) : activeExercise === 'users' ? (
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
          ) : isShopExercise ? (
            <section className="shop-card mx-auto" aria-labelledby="shop-heading">
              <header className="shop-header">
                <div>
                  <span className="shop-kicker">REDUX TOOLKIT · CREATE SLICE</span>
                  <h2 id="shop-heading">Mini Store</h2>
                  <p>Sản phẩm và giỏ hàng cùng cập nhật từ Redux store.</p>
                </div>
                <CartBadge />
              </header>
              <div className="shop-layout">
                <div className="shop-products">
                  <ProductList />
                </div>
                <aside className="shop-cart" aria-labelledby="cart-heading">
                  <header className="shop-section-heading">
                    <div>
                      <span className="shop-kicker">ĐƠN HÀNG</span>
                      <h2 id="cart-heading">Giỏ hàng</h2>
                    </div>
                  </header>
                  <Cart />
                </aside>
              </div>
            </section>
          ) : (
            <section className="students-card mx-auto" aria-labelledby="students-heading">
              <header className="students-header">
                <span className="counter-mark" aria-hidden="true">SV</span>
                <div>
                  <span className="shop-kicker">REDUX TOOLKIT · CREATE ASYNC THUNK</span>
                  <h2 id="students-heading">Quản lý sinh viên</h2>
                  <p>CRUD với API json-server, tìm kiếm và sắp xếp danh sách.</p>
                </div>
              </header>
              <div className="students-content">
                <Toolbar onAdd={openAddStudent} />
                <StudentTable onEdit={openEditStudent} />
              </div>
              <StudentFormModal
                show={showStudentModal}
                onHide={() => setShowStudentModal(false)}
                editing={editingStudent}
              />
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
