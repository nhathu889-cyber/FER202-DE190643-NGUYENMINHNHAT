import { useState } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Form,
} from 'react-bootstrap';

function classify(bmi) {
  if (bmi < 18.5) {
    return { label: 'Thiếu cân', variant: 'info' };
  }

  if (bmi < 23) {
    return { label: 'Bình thường', variant: 'success' };
  }

  if (bmi < 25) {
    return { label: 'Thừa cân', variant: 'warning' };
  }

  return { label: 'Béo phì', variant: 'danger' };
}

function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  const h = Number(height);
  const w = Number(weight);

  const heightInMeters = unit === 'cm' ? h / 100 : h;

  const errors = {};

  if (height !== '') {
    if (unit === 'cm' && !(h >= 50 && h <= 250)) {
      errors.height = 'Chiều cao từ 50 đến 250 cm';
    }

    if (unit === 'm' && !(h >= 0.5 && h <= 2.5)) {
      errors.height = 'Chiều cao từ 0.5 đến 2.5 m';
    }
  }

  if (weight !== '' && !(w >= 10 && w <= 300)) {
    errors.weight = 'Cân nặng từ 10 đến 300 kg';
  }

  const ready =
    height !== '' &&
    weight !== '' &&
    !errors.height &&
    !errors.weight;

  const bmi = ready
    ? w / (heightInMeters * heightInMeters)
    : null;

  const result = bmi !== null ? classify(bmi) : null;

  const changeUnit = (next) => {
    if (next === unit) return;

    if (height !== '') {
      if (next === 'm') {
        setHeight(String(h / 100));
      } else {
        setHeight(String(h * 100));
      }
    }

    setUnit(next);
  };

  return (
    <Card
      className="p-4 shadow-sm mx-auto"
      style={{ maxWidth: '650px' }}
    >
      <h3 className="text-center mb-4">
        Bài 3: Máy tính BMI
      </h3>

      <div className="text-center mb-3">
        <ButtonGroup>
          <Button
            variant={unit === 'cm' ? 'primary' : 'outline-primary'}
            onClick={() => changeUnit('cm')}
          >
            cm
          </Button>

          <Button
            variant={unit === 'm' ? 'primary' : 'outline-primary'}
            onClick={() => changeUnit('m')}
          >
            m
          </Button>
        </ButtonGroup>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Chiều cao ({unit})</Form.Label>

        <Form.Control
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          isInvalid={!!errors.height}
          placeholder={unit === 'cm' ? 'Ví dụ: 170' : 'Ví dụ: 1.7'}
        />

        <Form.Control.Feedback type="invalid">
          {errors.height}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cân nặng (kg)</Form.Label>

        <Form.Control
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          isInvalid={!!errors.weight}
          placeholder="Ví dụ: 65"
        />

        <Form.Control.Feedback type="invalid">
          {errors.weight}
        </Form.Control.Feedback>
      </Form.Group>

      {result ? (
        <Alert variant={result.variant} className="mb-0">
          BMI = {bmi.toFixed(1)} → {result.label}
        </Alert>
      ) : (
        <p className="text-muted text-center mb-0">
          Nhập chiều cao và cân nặng để tính BMI.
        </p>
      )}
    </Card>
  );
}

export default BmiCalculator;