import { useEffect } from 'react';
import { Alert, Badge, Button, Spinner, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  deleteStudent,
  fetchStudents,
  selectStudentsState,
  selectVisibleStudents,
} from '../features/students/studentsSlice.js';

export default function StudentTable({ onEdit }) {
  const students = useSelector(selectVisibleStudents);
  const { status, error, saving } = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchStudents());
  }, [status, dispatch]);

  const handleDelete = (student) => {
    if (window.confirm(`Xóa sinh viên ${student.name}?`)) {
      dispatch(deleteStudent(student.id));
    }
  };

  if (status === 'loading') {
    return (
      <div className="student-loading" role="status">
        <Spinner animation="border" />
        <span>Đang tải danh sách sinh viên...</span>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <Alert variant="danger" className="student-load-error">
        <p>
          Không tải được dữ liệu: {error}. Hãy chạy <code>npm start</code> để mở
          giao diện và API cùng lúc.
        </p>
        <Button size="sm" onClick={() => dispatch(fetchStudents())}>
          Thử tải lại
        </Button>
      </Alert>
    );
  }

  return (
    <>
      {error && (
        <Alert
          variant="warning"
          dismissible
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}
      <Table striped bordered hover responsive className="student-table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Mã sinh viên</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th className="text-center">GPA</th>
            <th>Ngành</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted py-4">
                Không có sinh viên phù hợp.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td className="student-code-cell">{student.code}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="text-center">
                  <Badge
                    bg={
                      student.gpa >= 8
                        ? 'success'
                        : student.gpa >= 5
                          ? 'primary'
                          : 'danger'
                    }
                  >
                    {Number(student.gpa).toFixed(1)}
                  </Badge>
                </td>
                <td>{student.major}</td>
                <td className="text-center text-nowrap">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-1"
                    disabled={saving}
                    onClick={() => onEdit(student)}
                  >
                    Sửa
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    disabled={saving}
                    onClick={() => handleDelete(student)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}
