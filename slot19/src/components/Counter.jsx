import { useState } from 'react';
import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from '../redux/counterActions.js';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [step, setStep] = useState('2');
  const amount = Number(step);
  const canAddAmount = step.trim() !== '' && Number.isFinite(amount);
  const isEven = count % 2 === 0;

  return (
    <Card className="counter-card mx-auto shadow-sm">
      <Card.Header className="counter-card-header">
        <span className="counter-mark" aria-hidden="true">
          ±
        </span>
        <div>
          <h2 className="counter-title">Bộ đếm của bạn</h2>
          <p className="counter-subtitle mb-0">State được lưu trong Redux store</p>
        </div>
      </Card.Header>
      <Card.Body className="counter-card-body">
        <div className="count-panel" aria-live="polite" aria-atomic="true">
          <span className="count-label">GIÁ TRỊ HIỆN TẠI</span>
          <output className="count-value">{count}</output>
          <Badge bg={isEven ? 'success' : 'warning'} className="parity-badge">
            {isEven ? 'Số chẵn' : 'Số lẻ'}
          </Badge>
        </div>

        <div className="counter-actions" aria-label="Thao tác bộ đếm">
          <Button
            variant="outline-danger"
            className="counter-button"
            aria-label="Giảm 1"
            onClick={() => dispatch(decrement())}
          >
            −
          </Button>
          <Button
            variant="primary"
            className="counter-button"
            aria-label="Tăng 1"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>
          <Button
            variant="outline-primary"
            className="counter-button add-five-button"
            onClick={() => dispatch(incrementByAmount(5))}
          >
            +5
          </Button>
          <Button
            variant="light"
            className="counter-button reset-button"
            onClick={() => dispatch(reset())}
          >
            Reset
          </Button>
        </div>

        <Form.Label htmlFor="counter-step" className="step-label">
          Tùy chỉnh số bước
        </Form.Label>
        <InputGroup>
          <Form.Control
            id="counter-step"
            type="number"
            value={step}
            onChange={(event) => setStep(event.target.value)}
            aria-label="Số bước muốn cộng"
          />
          <Button
            variant="dark"
            disabled={!canAddAmount}
            onClick={() => dispatch(incrementByAmount(amount))}
          >
            Cộng {canAddAmount ? amount : '…'}
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
