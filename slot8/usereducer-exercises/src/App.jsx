import StepCounter from './usereducer/StepCounter';
import OrderTracker from './usereducer/OrderTracker';
import KanbanBoard from './usereducer/KanbanBoard';

function App() {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-5">
        React useReducer Exercises
      </h1>

      {/* Bài 1 */}
      <div className="mb-5">
        <StepCounter />
      </div>

      <hr className="my-5" />

      {/* Bài 2 */}
      <div className="mb-5">
        <OrderTracker />
      </div>

      <hr className="my-5" />

      {/* Bài 3 */}
      <div className="mb-5">
        <KanbanBoard />
      </div>
    </div>
  );
}

export default App;