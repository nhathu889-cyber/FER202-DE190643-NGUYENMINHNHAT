import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

export default function ThemeExample() {
  return <ThemeProvider><Header /><Content /><Footer /></ThemeProvider>;
}
