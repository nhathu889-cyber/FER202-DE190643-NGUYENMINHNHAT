import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import {
  CART_ACTIONS,
  MAX_QUANTITY,
  getCartTotals,
} from '../reducers/cartReducer';

import { formatVND } from '../../utils/format';

const CartSummary = ({ cart, dispatch }) => {
  const {
    totalQuantity,
    totalPrice,
  } = getCartTotals(cart);

  return (
    <>
      <h4 className="mb-3">
        Giỏ hàng{' '}
        <Badge bg="primary">
          {totalQuantity}
        </Badge>
      </h4>

      {cart.items.length === 0 ? (
        <Alert variant="info">
          Giỏ hàng đang trống
        </Alert>
      ) : (
        <>
          <Table
            bordered
            responsive
            className="align-middle"
          >
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>
                    {formatVND(item.price)}
                  </td>

                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() =>
                          dispatch({
                            type:
                              CART_ACTIONS.DECREASE,
                            payload: item.id,
                          })
                        }
                      >
                        −
                      </Button>

                      <span>
                        {item.quantity}
                      </span>

                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={
                          item.quantity >=
                          MAX_QUANTITY
                        }
                        onClick={() =>
                          dispatch({
                            type:
                              CART_ACTIONS.INCREASE,
                            payload: item.id,
                          })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>

                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        dispatch({
                          type:
                            CART_ACTIONS.REMOVE,
                          payload: item.id,
                        })
                      }
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end">
            Tổng cộng:{' '}
            {formatVND(totalPrice)}
          </h5>

          <Button
            variant="outline-danger"
            onClick={() =>
              dispatch({
                type: CART_ACTIONS.CLEAR,
              })
            }
          >
            Xóa toàn bộ giỏ
          </Button>
        </>
      )}
    </>
  );
};

export default CartSummary;