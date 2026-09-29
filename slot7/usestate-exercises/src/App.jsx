import Counter from './components/Counter';
import ControlledInput from './components/ControlledInput';
import ToggleVisibility from './components/ToggleVisibility';
import TodoList from './components/TodoList';
import ColorSwitcher from './components/ColorSwitcher';
import SearchFilter from './components/SearchFilter';

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">
        React useState Exercises
      </h1>

      <div className="mb-4">
        <Counter />
      </div>

      <div className="mb-4">
        <ControlledInput />
      </div>

      <div className="mb-4">
        <ToggleVisibility />
      </div>

      <div className="mb-4">
        <TodoList />
      </div>

      <div className="mb-4">
        <ColorSwitcher />
      </div>

      <div className="mb-4">
        <SearchFilter />
      </div>
    </div>
  );
}

export default App;