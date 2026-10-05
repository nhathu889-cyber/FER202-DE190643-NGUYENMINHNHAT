import {
  useCart,
  useCartDispatch,
} from "../contexts/CartContext";

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const total = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  if (items.length === 0) {
    return <p>Giỏ hàng trống.</p>;
  }

  return (
    <div>
      <h3>Giỏ hàng</h3>

      {items.map((i) => (
        <div key={i.id}>
          {i.name} x {i.qty}{" "}

          <button
            onClick={() =>
              dispatch({
                type: "ADD",
                payload: i,
              })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "DECREASE",
                payload: i.id,
              })
            }
          >
            -
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                payload: i.id,
              })
            }
          >
            Xoá
          </button>
        </div>
      ))}

      <p>
        <b>
          Tổng: {total.toLocaleString("vi-VN")}đ
        </b>
      </p>

      <button
        onClick={() =>
          dispatch({ type: "CLEAR" })
        }
      >
        Xoá hết
      </button>
    </div>
  );
}