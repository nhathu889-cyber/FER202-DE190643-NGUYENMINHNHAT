import { useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const MIN = 0;
const MAX = 100;

const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset',
};

const initialState = {
  count: 0,
  step: 1,
  history: [],
};

const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta =
        action.type === ACTIONS.INCREMENT
          ? state.step
          : -state.step;

      const next = clamp(state.count + delta);

      if (next === state.count) {
        return state;
      }

      return {
        ...state,
        count: next,
        history: [
          `${state.count} → ${next}`,
          ...state.history,
        ].slice(0, 5),
      };
    }

    case ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
};

function Bai1() {
  const [state, dispatch] = useReducer(
    counterReducer,
    initialState
  );

  const { count, step, history } = state;

  return (
    <Card
      className="shadow-sm mx-auto"
      style={{ maxWidth: '420px' }}
    >
      <Card.Body>
        <Card.Title className="text-center">
          Bộ đếm có bước nhảy
        </Card.Title>

        <div className="display-4 text-center my-3">
          {count}
        </div>

        <div className="d-flex gap-2 justify-content-center mb-3">
          <Button
            variant="outline-secondary"
            disabled={count <= MIN}
            onClick={() =>
              dispatch({
                type: ACTIONS.DECREMENT,
              })
            }
          >
            {`− ${step}`}
          </Button>

          <Button
            disabled={count >= MAX}
            onClick={() =>
              dispatch({
                type: ACTIONS.INCREMENT,
              })
            }
          >
            {`+ ${step}`}
          </Button>

          <Button
            variant="outline-danger"
            onClick={() =>
              dispatch({
                type: ACTIONS.RESET,
              })
            }
          >
            Đặt lại
          </Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Bước nhảy</Form.Label>

          <Form.Select
            value={step}
            onChange={(e) =>
              dispatch({
                type: ACTIONS.SET_STEP,
                payload: Number(e.target.value),
              })
            }
          >
            {[1, 5, 10, 25].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <h6>5 thay đổi gần nhất</h6>

        <ListGroup>
          {history.length === 0 && (
            <ListGroup.Item className="text-muted">
              Chưa có thay đổi
            </ListGroup.Item>
          )}

          {history.map((item, index) => (
            <ListGroup.Item
              key={`${item}-${index}`}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Bai1;