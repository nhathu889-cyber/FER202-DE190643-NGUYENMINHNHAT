import { useTheme } from '../contexts/ThemeContext';

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <p>© 2026 Theme Context Demo</p>
    </footer>
  );
}

export default Footer;