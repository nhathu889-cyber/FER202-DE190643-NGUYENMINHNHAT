import { Container } from 'react-bootstrap';
import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';

function App() {
  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        React useState Exercises
      </h2>

      <div className="mb-4">
        <Counter />
      </div>

      <div className="mb-4">
        <ControlledInput />
      </div>
    </Container>
  );
}

export default App;