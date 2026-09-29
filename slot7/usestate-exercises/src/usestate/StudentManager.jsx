import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Form,
  Table,
} from 'react-bootstrap';

const CITIES = [
  'Hà Nội',
  'Đà Nẵng',
  'TP.HCM',
  'Cần Thơ',
];

const initialStudents = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    score: 8.5,
    contact: { city: 'Hà Nội' },
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    score: 4.5,
    contact: { city: 'Đà Nẵng' },
  },
  {
    id: 3,
    name: 'Lê Minh Châu',
    score: 6,
    contact: { city: 'TP.HCM' },
  },
];

function StudentManager() {
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const addStudent = (e) => {
    e.preventDefault();

    const name = newName.trim();

    if (name.length < 3) return;

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        score: 0,
        contact: {
          city: CITIES[0],
        },
      },
    ]);

    setNewName('');
  };

  const updateScore = (id, text) => {
    const value = Number(text);

    if (Number.isNaN(value)) return;

    const score = Math.min(10, Math.max(0, value));

    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, score }
          : student
      )
    );
  };

  const updateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              contact: {
                ...student.contact,
                city,
              },
            }
          : student
      )
    );
  };

  const removeStudent = (id) => {
    setStudents((prev) =>
      prev.filter((student) => student.id !== id)
    );
  };

  const bonusAll = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        score: Math.min(10, student.score + 0.5),
      }))
    );
  };

  const sorted =
    sortBy === 'name'
      ? [...students].sort((a, b) =>
          a.name.localeCompare(b.name, 'vi')
        )
      : sortBy === 'score'
        ? [...students].sort(
            (a, b) => b.score - a.score
          )
        : students;

  const average =
    students.length === 0
      ? 0
      : students.reduce(
          (sum, student) => sum + student.score,
          0
        ) / students.length;

  const passed = students.filter(
    (student) => student.score >= 5
  ).length;

  return (
    <Card
      className="p-4 shadow-sm mx-auto"
      style={{ maxWidth: '900px' }}
    >
      <h3 className="text-center mb-4">
        Bài 4: Quản lý điểm sinh viên
      </h3>

      <Form
        onSubmit={addStudent}
        className="d-flex gap-2 mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Nhập họ tên sinh viên..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <Button
          type="submit"
          variant="primary"
          disabled={newName.trim().length < 3}
        >
          Thêm
        </Button>
      </Form>

      <div className="d-flex gap-2 mb-3">
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">
            Thứ tự nhập
          </option>

          <option value="name">
            Theo tên A → Z
          </option>

          <option value="score">
            Điểm cao → thấp
          </option>
        </Form.Select>

        <Button
          variant="success"
          onClick={bonusAll}
        >
          +0.5 cả lớp
        </Button>
      </div>

      <Table
        bordered
        striped
        hover
        responsive
        className="align-middle"
      >
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Điểm</th>
            <th>Thành phố</th>
            <th>Kết quả</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>

              <td style={{ width: '120px' }}>
                <Form.Control
                  type="number"
                  min="0"
                  max="10"
                  step="0.5"
                  value={student.score}
                  onChange={(e) =>
                    updateScore(
                      student.id,
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
                <Form.Select
                  value={student.contact.city}
                  onChange={(e) =>
                    updateCity(
                      student.id,
                      e.target.value
                    )
                  }
                >
                  {CITIES.map((city) => (
                    <option
                      value={city}
                      key={city}
                    >
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </td>

              <td>
                {student.score >= 5 ? (
                  <Badge bg="success">Đạt</Badge>
                ) : (
                  <Badge bg="danger">
                    Chưa đạt
                  </Badge>
                )}
              </td>

              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    removeStudent(student.id)
                  }
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="fw-bold">
        Sĩ số: {students.length}
        {' · '}
        Điểm trung bình: {average.toFixed(2)}
        {' · '}
        Đạt: {passed}/{students.length}
      </div>
    </Card>
  );
}

export default StudentManager;