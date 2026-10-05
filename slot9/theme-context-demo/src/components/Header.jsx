import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${theme}`}>
      <h1>Theme Context Demo</h1>

      <button onClick={toggleTheme}>
        {theme === 'light'
          ? '🌙 Chế độ tối'
          : '☀️ Chế độ sáng'}
      </button>
    </header>
  );
}

export default Header;