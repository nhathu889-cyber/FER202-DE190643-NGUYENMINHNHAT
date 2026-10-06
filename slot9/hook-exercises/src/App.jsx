import QuantityPicker from './components/QuantityPicker';

const App = () => (
  <div className="container my-4">
    <h5>Phần 1. Bộ chọn số lượng</h5>

    <div className="d-flex flex-column gap-3 mb-4">
      <QuantityPicker />
      <QuantityPicker min={2} max={5} />
    </div>
  </div>
);

export default App;
