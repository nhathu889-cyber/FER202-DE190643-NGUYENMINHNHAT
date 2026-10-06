import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';

const Bai1 = () => {
  return (
    <>
      <h2>Bài 1 - useState</h2>

      <h5>Phần 1. Bộ chọn số lượng</h5>

      <div>
        <QuantityPicker />
        <QuantityPicker min={2} max={5} />
      </div>

      <h5>Phần 2. Giỏ hàng mini</h5>

      <MiniCart />
    </>
  );
};

export default Bai1;