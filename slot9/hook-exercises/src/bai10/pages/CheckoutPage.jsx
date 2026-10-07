import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import { useAuth } from '../context/useAuth';
import { useCart } from '../context/useCart';

import { formatVND } from '../../utils/format';
import InputField from '../../bai5/components/InputField';

const validateCheckout = (values) => {
  const errors = {};

  if (!values.receiver.trim()) {
    errors.receiver = 'Vui lòng nhập người nhận';
  } else if (values.receiver.trim().length < 3) {
    errors.receiver =
      'Người nhận phải có ít nhất 3 ký tự';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^0\d{9}$/.test(values.phone.trim())) {
    errors.phone =
      'Số điện thoại phải gồm 10 số và bắt đầu bằng 0';
  }

  if (!values.address.trim()) {
    errors.address = 'Vui lòng nhập địa chỉ';
  } else if (values.address.trim().length < 10) {
    errors.address =
      'Địa chỉ phải có ít nhất 10 ký tự';
  }

  if (!values.payment) {
    errors.payment =
      'Vui lòng chọn phương thức thanh toán';
  }

  return errors;
};

const CheckoutPage = ({ onNavigate }) => {
  const { user } = useAuth();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const [values, setValues] = useState({
    receiver: user?.name ?? '',
    phone: '',
    address: '',
    payment: '',
    note: '',
  });

  const [submitted, setSubmitted] =
    useState(false);

  const [order, setOrder] = useState(null);

  const errors = validateCheckout(values);

  const shippingFee =
    totalPrice >= 1000000 ? 0 : 30000;

  const finalTotal =
    totalPrice + shippingFee;

  const errorOf = (name) => {
    if (!submitted) {
      return '';
    }

    return errors[name] ?? '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const orderCode =
      `DH${Date.now()
        .toString()
        .slice(-6)}`;

    const newOrder = {
      code: orderCode,
      receiver: values.receiver.trim(),
      total: finalTotal,
    };

    setOrder(newOrder);

    clearCart();
  };

  if (order) {
    return (
      <div className="text-center">
        <Alert variant="success">
          <Alert.Heading>
            Đặt hàng thành công!
          </Alert.Heading>

          <p>
            Mã đơn hàng:{' '}
            <strong>{order.code}</strong>
          </p>

          <p>
            Người nhận:{' '}
            <strong>
              {order.receiver}
            </strong>
          </p>

          <p className="mb-0">
            Tổng thanh toán:{' '}
            <strong>
              {formatVND(order.total)}
            </strong>
          </p>
        </Alert>

        <Button
          onClick={() =>
            onNavigate('shop')
          }
        >
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <>
        <h2 className="mb-4">
          Thanh toán
        </h2>

        <Alert variant="warning">
          Giỏ hàng đang trống.
        </Alert>

        <Button
          onClick={() =>
            onNavigate('shop')
          }
        >
          Quay lại cửa hàng
        </Button>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-4">
        Thanh toán
      </h2>

      <Row className="g-4">
        <Col md={7}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                Thông tin giao hàng
              </Card.Title>

              <Form
                noValidate
                onSubmit={handleSubmit}
              >
                <InputField
                  id="checkout-receiver" label="Người nhận" name="receiver"
                  value={values.receiver} onChange={handleChange}
                  error={errorOf('receiver')} required
                />
                <InputField
                  id="checkout-phone" label="Số điện thoại" name="phone"
                  type="tel" placeholder="09xxxxxxxx"
                  value={values.phone} onChange={handleChange}
                  error={errorOf('phone')} required
                />
                <InputField
                  id="checkout-address" label="Địa chỉ" name="address"
                  as="textarea" rows={2}
                  value={values.address} onChange={handleChange}
                  error={errorOf('address')} required
                />

                <Form.Group className="mb-3">
                  <Form.Label>
                    Phương thức thanh toán
                  </Form.Label>

                  <Form.Check
                    type="radio"
                    name="payment"
                    id="payment-cod"
                    label="COD"
                    value="COD"
                    checked={
                      values.payment === 'COD'
                    }
                    onChange={handleChange}
                    isInvalid={
                      Boolean(
                        errorOf('payment')
                      )
                    }
                  />

                  <Form.Check
                    type="radio"
                    name="payment"
                    id="payment-bank"
                    label="Chuyển khoản"
                    value="BANK"
                    checked={
                      values.payment === 'BANK'
                    }
                    onChange={handleChange}
                    isInvalid={
                      Boolean(
                        errorOf('payment')
                      )
                    }
                  />

                  <Form.Check
                    type="radio"
                    name="payment"
                    id="payment-wallet"
                    label="Ví điện tử"
                    value="WALLET"
                    checked={
                      values.payment ===
                      'WALLET'
                    }
                    onChange={handleChange}
                    isInvalid={
                      Boolean(
                        errorOf('payment')
                      )
                    }
                  />

                  {errorOf('payment') && (
                    <div className="text-danger small mt-1">
                      {errorOf('payment')}
                    </div>
                  )}
                </Form.Group>

                <InputField
                  id="checkout-note" label="Ghi chú" name="note"
                  as="textarea" rows={2} placeholder="Không bắt buộc"
                  value={values.note} onChange={handleChange}
                />

                <Button type="submit">
                  Đặt hàng
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">
                Tóm tắt đơn hàng
              </Card.Title>

              <Table
                responsive
                className="align-middle"
              >
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.name}
                        {' × '}
                        {item.quantity}
                      </td>

                      <td className="text-end">
                        {formatVND(
                          item.price *
                            item.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Tiền hàng:</span>

                <strong>
                  {formatVND(totalPrice)}
                </strong>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Phí giao hàng:</span>

                <strong>
                  {shippingFee === 0
                    ? 'Miễn phí'
                    : formatVND(
                        shippingFee
                      )}
                </strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong>
                  Tổng thanh toán:
                </strong>

                <strong>
                  {formatVND(finalTotal)}
                </strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutPage;