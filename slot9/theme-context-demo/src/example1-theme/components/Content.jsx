import { useTheme } from '../contexts/ThemeContext';

function Content() {
  const { theme } = useTheme();

  return (
    <main className={`content ${theme}`}>
      <h2>Nội dung chính</h2>

      <p>
        Đây là ví dụ sử dụng useContext trong React.
      </p>

      <p>
        Theme hiện tại:{' '}
        <strong>
          {theme === 'light' ? 'Sáng' : 'Tối'}
        </strong>
      </p>
    </main>
  );
}

export default Content;