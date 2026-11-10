import { Badge, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAverageGpa,
  setKeyword,
  setSortBy,
} from '../features/students/studentsSlice.js';

export default function Toolbar({ onAdd }) {
  const { keyword, sortBy, items } = useSelector((state) => state.students);
  const averageGpa = useSelector(selectAverageGpa);
  const dispatch = useDispatch();

  return (
    <div className="student-toolbar">
      <Form.Control
        className="student-search"
        aria-label="Tìm sinh viên theo tên hoặc mã"
        placeholder="Tìm theo tên / mã sinh viên..."
        value={keyword}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      <Form.Select
        className="student-sort"
        aria-label="Sắp xếp danh sách sinh viên"
        value={sortBy}
        onChange={(event) => dispatch(setSortBy(event.target.value))}
      >
        <option value="code">Sắp xếp: Mã sinh viên</option>
        <option value="name">Sắp xếp: Họ tên</option>
        <option value="gpa">Sắp xếp: GPA cao nhất</option>
      </Form.Select>
      <Badge bg="primary" className="student-stat">
        Tổng: {items.length}
      </Badge>
      <Badge bg="success" className="student-stat">
        GPA TB: {averageGpa}
      </Badge>
      <Button className="student-add-button" onClick={onAdd}>
        + Thêm sinh viên
      </Button>
    </div>
  );
}
