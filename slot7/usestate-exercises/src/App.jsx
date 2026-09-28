import { Container } from 'react-bootstrap';
import Counter from './components/Counter';

function App() {
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        React useState Exercises
      </h2>

      <Counter />
    </Container>
  );
}

export default App;