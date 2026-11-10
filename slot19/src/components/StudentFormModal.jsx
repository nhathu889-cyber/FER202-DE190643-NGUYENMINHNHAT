import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  updateStudent,
} from '../features/students/studentsSlice.js';

const EMPTY_FORM = {
  code: '',
  name: '',
  email: '',
  gpa: '',
  major: 'SE',
};

function validateForm(form) {
  const errors = {};

  if (!/^[A-Z]{2}\d{6}$/i.test(form.code.trim())) {
    errors.code = 'Mã sinh viên cần đúng định dạng HE170001.';
  }
  if (form.name.trim().length < 2) {
    errors.name = 'Họ tên cần có ít nhất 2 ký tự.';
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Vui lòng nhập email hợp lệ.';
  }

  const gpa = Number(form.gpa);
  if (form.gpa === '' || !Number.isFinite(gpa) || gpa < 0 || gpa > 10) {
    errors.gpa = 'GPA phải nằm trong khoảng từ 0 đến 10.';
  }

  return errors;
}

export default function StudentFormModal({ show, onHide, editing }) {
  const dispatch = useDispatch();
  const saving = useSelector((state) => state.students.saving);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!show) return;

    setForm(
      editing
        ? { ...editing, gpa: String(editing.gpa) }
        : { ...EMPTY_FORM },
    );
    setErrors({});
    setServerError('');
  }, [show, editing]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setServerError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const student = {
      ...form,
      ...(editing ? { id: editing.id } : {}),
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      email: form.email.trim(),
      gpa: Number(form.gpa),
    };

    try {
      if (editing) {
        await dispatch(updateStudent(student)).unwrap();
      } else {
        await dispatch(addStudent(student)).unwrap();
      }
      onHide();
    } catch (error) {
      setServerError(
        typeof error === 'string'
          ? error
          : error?.message ?? 'Không thể lưu sinh viên. Vui lòng thử lại.',
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {serverError && (
            <Alert variant="danger" className="py-2">
              {serverError}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="student-code">
            <Form.Label>Mã sinh viên</Form.Label>
            <Form.Control
              name="code"
              value={form.code}
              onChange={handleChange}
              isInvalid={Boolean(errors.code)}
              disabled={Boolean(editing) || saving}
              autoComplete="off"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student-name">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={Boolean(errors.name)}
              disabled={saving}
              autoComplete="name"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="student-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={Boolean(errors.email)}
              disabled={saving}
              autoComplete="email"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="student-form-row">
            <Form.Group controlId="student-gpa">
              <Form.Label>GPA</Form.Label>
              <Form.Control
                name="gpa"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={form.gpa}
                onChange={handleChange}
                isInvalid={Boolean(errors.gpa)}
                disabled={saving}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.gpa}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="student-major">
              <Form.Label>Chuyên ngành</Form.Label>
              <Form.Select
                name="major"
                value={form.major}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="SE">SE – Kỹ thuật phần mềm</option>
                <option value="AI">AI – Trí tuệ nhân tạo</option>
                <option value="IA">IA – An toàn thông tin</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onHide} disabled={saving}>
            Hủy
          </Button>
          <Button type="submit" disabled={saving}>
            {saving && <Spinner size="sm" className="me-2" />}
            {editing ? 'Lưu thay đổi' : 'Thêm sinh viên'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
