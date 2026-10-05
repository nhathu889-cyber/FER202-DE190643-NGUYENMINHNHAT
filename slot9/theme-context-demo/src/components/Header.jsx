import { useTheme } from '../contexts/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

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