import ProductFilter from './components/ProductFilter';
import { products } from './data/products';

const Bai3 = () => {
  return (
    <>
      <h2>Bài 3 - Tìm kiếm, lọc và sắp xếp sản phẩm</h2>

      <ProductFilter products={products} />
    </>
  );
};

export default Bai3;