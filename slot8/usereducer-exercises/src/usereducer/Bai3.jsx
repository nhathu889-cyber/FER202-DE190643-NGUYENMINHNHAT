import { useReducer, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

const COLUMNS = [
  { key: 'todo', title: 'Cần làm' },
  { key: 'doing', title: 'Đang làm' },
  { key: 'done', title: 'Hoàn thành' },
];

const ORDER = COLUMNS.map((column) => column.key);

const TASK_ACTIONS = {
  ADD: 'tasks/add',
  MOVE: 'tasks/move',
  RENAME: 'tasks/rename',
  DELETE: 'tasks/delete',
  CLEAR_DONE: 'tasks/clearDone',
};

const initialTaskState = {
  nextId: 4,
  tasks: [
    {
      id: 1,
      title: 'Đọc lý thuyết useReducer',
      priority: 'high',
      column: 'done',
    },
    {
      id: 2,
      title: 'Làm bài Kanban',
      priority: 'high',
      column: 'doing',
    },
    {
      id: 3,
      title: 'Ôn lại spread operator',
      priority: 'low',
      column: 'todo',
    },
  ],
};

const addTask = (title, priority) => ({
  type: TASK_ACTIONS.ADD,
  payload: { title, priority },
});

const moveTask = (id, direction) => ({
  type: TASK_ACTIONS.MOVE,
  payload: { id, direction },
});

const renameTask = (id, title) => ({
  type: TASK_ACTIONS.RENAME,
  payload: { id, title },
});

const deleteTask = (id) => ({
  type: TASK_ACTIONS.DELETE,
  payload: id,
});

const clearDone = () => ({
  type: TASK_ACTIONS.CLEAR_DONE,
});

const taskReducer = (state, action) => {
  switch (action.type) {
    case TASK_ACTIONS.ADD: {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      const task = {
        id: state.nextId,
        title,
        priority: action.payload.priority,
        column: 'todo',
      };

      return {
        nextId: state.nextId + 1,
        tasks: [...state.tasks, task],
      };
    }

    case TASK_ACTIONS.MOVE: {
      const { id, direction } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== id) {
            return task;
          }

          const nextIndex =
            ORDER.indexOf(task.column) + direction;

          if (
            nextIndex < 0 ||
            nextIndex >= ORDER.length
          ) {
            return task;
          }

          return {
            ...task,
            column: ORDER[nextIndex],
          };
        }),
      };
    }

    case TASK_ACTIONS.RENAME: {
      const { id, title } = action.payload;
      const newTitle = title.trim();

      if (!newTitle) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, title: newTitle }
            : task
        ),
      };
    }

    case TASK_ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.id !== action.payload
        ),
      };

    case TASK_ACTIONS.CLEAR_DONE:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.column !== 'done'
        ),
      };

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
};

function Bai3() {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState
  );

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('high');
  const [filter, setFilter] = useState('all');

  const handleAdd = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch(addTask(title, priority));
    setTitle('');
  };

  const handleRename = (task) => {
    const newTitle = window.prompt(
      'Nhập tên mới:',
      task.title
    );

    if (newTitle === null) {
      return;
    }

    dispatch(renameTask(task.id, newTitle));
  };

  const visibleTasks =
    filter === 'all'
      ? state.tasks
      : state.tasks.filter(
          (task) => task.priority === filter
        );

  const doneCount = state.tasks.filter(
    (task) => task.column === 'done'
  ).length;

  return (
    <div>
      <h2 className="text-center mb-4">
        Bài 3: Bảng Kanban
      </h2>

      <Card className="p-3 shadow-sm mb-4">
        <Form onSubmit={handleAdd}>
          <Row className="g-2">
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Tên công việc..."
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </Col>

            <Col md={2}>
              <Form.Select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option value="high">
                  Cao
                </option>

                <option value="low">
                  Thấp
                </option>
              </Form.Select>
            </Col>

            <Col md={2}>
              <Button
                type="submit"
                className="w-100"
                disabled={!title.trim()}
              >
                Thêm
              </Button>
            </Col>

            <Col md={3}>
              <Form.Select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value)
                }
              >
                <option value="all">
                  Tất cả ưu tiên
                </option>

                <option value="high">
                  Ưu tiên cao
                </option>

                <option value="low">
                  Ưu tiên thấp
                </option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        <div className="mt-3">
          <Button
            variant="outline-danger"
            disabled={doneCount === 0}
            onClick={() =>
              dispatch(clearDone())
            }
          >
            Dọn cột xong
          </Button>
        </div>
      </Card>

      <Row className="g-3">
        {COLUMNS.map((column, columnIndex) => {
          const tasks = visibleTasks.filter(
            (task) => task.column === column.key
          );

          const totalInColumn =
            state.tasks.filter(
              (task) =>
                task.column === column.key
            ).length;

          return (
            <Col md={4} key={column.key}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <strong>{column.title}</strong>

                  <Badge bg="secondary">
                    {totalInColumn}
                  </Badge>
                </Card.Header>

                <Card.Body>
                  {tasks.length === 0 && (
                    <p className="text-muted text-center">
                      Không có công việc
                    </p>
                  )}

                  {tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="mb-3"
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <span
                            role="button"
                            title="Nhấp đúp để đổi tên"
                            onDoubleClick={() =>
                              handleRename(task)
                            }
                            className="fw-semibold"
                          >
                            {task.title}
                          </span>

                          <Badge
                            bg={
                              task.priority ===
                              'high'
                                ? 'danger'
                                : 'secondary'
                            }
                          >
                            {task.priority ===
                            'high'
                              ? 'Cao'
                              : 'Thấp'}
                          </Badge>
                        </div>

                        <div className="d-flex gap-2">
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            disabled={
                              columnIndex === 0
                            }
                            onClick={() =>
                              dispatch(
                                moveTask(
                                  task.id,
                                  -1
                                )
                              )
                            }
                          >
                            ←
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={
                              columnIndex ===
                              COLUMNS.length - 1
                            }
                            onClick={() =>
                              dispatch(
                                moveTask(
                                  task.id,
                                  1
                                )
                              )
                            }
                          >
                            →
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() =>
                              dispatch(
                                deleteTask(task.id)
                              )
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Bai3;