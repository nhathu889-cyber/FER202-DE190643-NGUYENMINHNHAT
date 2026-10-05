import { useState } from "react";

import ThemeExample from "./example1-theme/ThemeExample";
import CartExample from "./example2-cart/CartExample";
import AuthExample from "./example3-auth/AuthExample";

export default function App() {
  const [example, setExample] = useState(1);

  return (
    <div>
      <h1>Slot 9 - useContext Examples</h1>

      <div>
        <button onClick={() => setExample(1)}>
          Ví dụ 1 - Theme
        </button>

        <button onClick={() => setExample(2)}>
          Ví dụ 2 - Cart
        </button>

        <button onClick={() => setExample(3)}>
          Ví dụ 3 - Auth
        </button>
      </div>

      <hr />

      {example === 1 && <ThemeExample />}

      {example === 2 && <CartExample />}

      {example === 3 && <AuthExample />}
    </div>
  );
}
