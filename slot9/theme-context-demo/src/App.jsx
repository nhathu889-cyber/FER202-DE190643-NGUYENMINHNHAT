import { useState } from 'react';
import ThemeExample from './example1-theme/ThemeExample';
import CartExample from './example2-cart/CartExample';

export default function App() {
  const [example, setExample] = useState('theme');
  return (
    <>
      <nav className="example-nav" aria-label="Chọn ví dụ">
        { [['theme', 'Ví dụ 1: Theme'], ['cart', 'Ví dụ 2: Cart'], ['auth', 'Ví dụ 3: Auth']].map(([id, label]) => (
          <button key={id} aria-pressed={example === id} onClick={() => setExample(id)}>{label}</button>
        )) }
      </nav>
      <div hidden={example !== 'theme'}><ThemeExample /></div>
      <div hidden={example !== 'cart'}><CartExample /></div>
      {example === 'auth' && <main className="content"><h1>Ví dụ 3: Auth</h1><p>Phần đăng nhập sẽ làm sau.</p></main>}
    </>
  );
}
