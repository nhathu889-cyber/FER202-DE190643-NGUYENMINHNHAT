import {
  useReducer,
  useState,
} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const HISTORY_LIMIT = 20;

const undoable = (reducer) => (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) {
        return state;
      }

      return {
        past: past.slice(0, -1),
        present: past[past.length - 1],
        future: [present, ...future],
      };
    }

    case 'REDO': {
      if (future.length === 0) {
        return state;
      }

      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    }

    default: {
      const newPresent = reducer(
        present,
        action
      );

      if (newPresent === present) {
        return state;
      }

      return {
        past: [
          ...past,
          present,
        ].slice(-HISTORY_LIMIT),

        present: newPresent,

        future: [],
      };
    }
  }
};

const createHistory = (present) => ({
  past: [],
  present,
  future: [],
});

const COLORS = [
  '#fff3a3',
  '#c8f7c5',
  '#cfe8ff',
  '#ffd6e0',
];

const initialNotes = {
  nextId: 3,

  items: [
    {
      id: 1,
      text: 'Reducer phải là hàm thuần',
      color: COLORS[0],
      pinned: true,
    },
    {
      id: 2,
      text: 'Không sửa trực tiếp state',
      color: COLORS[2],
      pinned: false,
    },
  ],
};

const notesReducer = (
  state,
  action
) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const text =
        action.payload.text.trim();

      if (!text) {
        return state;
      }

      const note = {
        id: state.nextId,
        text,
        color: action.payload.color,
        pinned: false,
      };

      return {
        nextId: state.nextId + 1,
        items: [
          note,
          ...state.items,
        ],
      };
    }

    case 'CHANGE_COLOR':
      return {
        ...state,

        items: state.items.map(
          (note) =>
            note.id ===
            action.payload.id
              ? {
                  ...note,
                  color:
                    action.payload
                      .color,
                }
              : note
        ),
      };

    case 'TOGGLE_PIN':
      return {
        ...state,

        items: state.items.map(
          (note) =>
            note.id === action.payload
              ? {
                  ...note,
                  pinned:
                    !note.pinned,
                }
              : note
        ),
      };

    case 'DELETE':
      return {
        ...state,

        items: state.items.filter(
          (note) =>
            note.id !== action.payload
        ),
      };

    case 'CLEAR_ALL':
      return state.items.length === 0
        ? state
        : {
            ...state,
            items: [],
          };

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
};

const notesWithHistory =
  undoable(notesReducer);

function Bai5() {
  const [history, dispatch] = useReducer(
    notesWithHistory,
    initialNotes,
    createHistory
  );

  const [text, setText] =
    useState('');

  const [color, setColor] =
    useState(COLORS[0]);

  const {
    past,
    present,
    future,
  } = history;

  const notes = [
    ...present.items,
  ].sort(
    (a, b) =>
      Number(b.pinned) -
      Number(a.pinned)
  );

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch({
      type: 'ADD_NOTE',
      payload: {
        text,
        color,
      },
    });

    setText('');
  };

  const handleKeyDown = (e) => {
    if (!e.ctrlKey) {
      return;
    }

    if (e.key === 'z') {
      e.preventDefault();

      dispatch({
        type: 'UNDO',
      });
    }

    if (e.key === 'y') {
      e.preventDefault();

      dispatch({
        type: 'REDO',
      });
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <h2 className="text-center mb-4">
        Bài 5: Bảng ghi chú
      </h2>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <Form
          onSubmit={handleAdd}
          className="flex-grow-1"
        >
          <InputGroup>
            <Form.Control
              placeholder="Nội dung ghi chú"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
            />

            <Form.Select
              style={{
                maxWidth: 120,
              }}
              value={color}
              onChange={(e) =>
                setColor(
                  e.target.value
                )
              }
              aria-label="Màu"
            >
              {COLORS.map(
                (itemColor, index) => (
                  <option
                    key={itemColor}
                    value={itemColor}
                  >
                    {`Màu ${index + 1}`}
                  </option>
                )
              )}
            </Form.Select>

            <Button
              type="submit"
              disabled={!text.trim()}
            >
              Thêm
            </Button>
          </InputGroup>
        </Form>

        <ButtonGroup>
          <Button
            variant="outline-dark"
            disabled={
              past.length === 0
            }
            onClick={() =>
              dispatch({
                type: 'UNDO',
              })
            }
          >
            {`↶ Hoàn tác (${past.length})`}
          </Button>

          <Button
            variant="outline-dark"
            disabled={
              future.length === 0
            }
            onClick={() =>
              dispatch({
                type: 'REDO',
              })
            }
          >
            {`↷ Làm lại (${future.length})`}
          </Button>
        </ButtonGroup>

        <Button
          variant="outline-danger"
          onClick={() =>
            dispatch({
              type: 'CLEAR_ALL',
            })
          }
        >
          Xóa hết
        </Button>
      </div>

      <Row
        xs={1}
        md={3}
        className="g-3"
      >
        {notes.map(
          ({
            id,
            text: noteText,
            color: noteColor,
            pinned,
          }) => (
            <Col key={id}>
              <Card
                style={{
                  background:
                    noteColor,
                }}
                className="h-100 border-0 shadow-sm"
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Text className="flex-grow-1">
                    {pinned && '📌 '}
                    {noteText}
                  </Card.Text>

                  <div className="d-flex gap-1 align-items-center">
                    {COLORS.map(
                      (itemColor) => (
                        <button
                          key={
                            itemColor
                          }
                          type="button"
                          aria-label={`Đổi màu ${itemColor}`}
                          onClick={() =>
                            dispatch({
                              type: 'CHANGE_COLOR',
                              payload: {
                                id,
                                color:
                                  itemColor,
                              },
                            })
                          }
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius:
                              '50%',
                            background:
                              itemColor,

                            border:
                              itemColor ===
                              noteColor
                                ? '2px solid #333'
                                : '1px solid #999',
                          }}
                        />
                      )
                    )}

                    <Button
                      size="sm"
                      variant="link"
                      className="ms-auto p-0"
                      onClick={() =>
                        dispatch({
                          type: 'TOGGLE_PIN',
                          payload: id,
                        })
                      }
                    >
                      {pinned
                        ? 'Bỏ ghim'
                        : 'Ghim'}
                    </Button>

                    <Button
                      size="sm"
                      variant="link"
                      className="text-danger p-0 ms-2"
                      onClick={() =>
                        dispatch({
                          type: 'DELETE',
                          payload: id,
                        })
                      }
                    >
                      Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>

      {notes.length === 0 && (
        <p className="text-muted mt-3">
          Chưa có ghi chú. Thử bấm
          Hoàn tác.
        </p>
      )}
    </div>
  );
}

export default Bai5;