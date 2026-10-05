import { products } from "../data/products";
import { useCartDispatch } from "../contexts/CartContext";

export default function ProductList() {
  const dispatch = useCartDispatch();

  return (
    <div>
      <h3>Sản phẩm</h3>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} — {p.price.toLocaleString("vi-VN")}đ{" "}

          <button
            onClick={() =>
              dispatch({
                type: "ADD",
                payload: p,
              })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}