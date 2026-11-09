import Counter from './components/Counter.jsx';

export default function App() {
  return (
    <main className="app-shell">
      <div className="container">
        <header className="page-heading text-center">
          <span className="eyebrow">FER202 · SLOT 19 · BÀI 1</span>
          <h1>Redux Counter</h1>
          <p>Quản lý state tập trung với Redux thuần và React Redux.</p>
        </header>
        <Counter />
        <p className="page-note text-center">
          Mỗi thao tác được gửi đến store thông qua một action.
        </p>
      </div>
    </main>
  );
}
