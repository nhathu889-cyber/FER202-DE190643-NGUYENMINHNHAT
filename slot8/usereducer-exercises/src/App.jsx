import StepCounter from './usereducer/StepCounter';
import OrderTracker from './usereducer/OrderTracker';
import KanbanBoard from './usereducer/KanbanBoard';
import CourseWizard from './usereducer/CourseWizard';

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

      <hr className="my-5" />

      {/* Bài 4 */}
      <div className="mb-5">
        <h2 className="text-center mb-4">
          Bài 4: Form đăng ký khóa học
        </h2>

        <CourseWizard />
      </div>
    </div>
  );
}

export default App;