import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  ProgressBar,
} from 'react-bootstrap';

const questions = [
  {
    id: 1,
    question: 'Hook nào dùng để quản lý state trong function component?',
    options: ['useEffect', 'useState', 'useMemo', 'useRef'],
    answer: 'useState',
  },
  {
    id: 2,
    question: 'Cách cập nhật state đúng là gì?',
    options: [
      'Thay đổi trực tiếp state',
      'Dùng hàm setState',
      'Dùng biến thông thường',
      'Dùng console.log',
    ],
    answer: 'Dùng hàm setState',
  },
  {
    id: 3,
    question: 'Khi state thay đổi, React sẽ làm gì?',
    options: [
      'Không làm gì',
      'Render lại component',
      'Tải lại toàn bộ trang',
      'Xóa component',
    ],
    answer: 'Render lại component',
  },
  {
    id: 4,
    question: 'Giá trị khởi tạo của state được truyền vào đâu?',
    options: [
      'useState()',
      'useEffect()',
      'return',
      'props',
    ],
    answer: 'useState()',
  },
];

function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[current];

  const answeredCount = Object.keys(answers).length;

  const progress =
    (answeredCount / questions.length) * 100;

  const score = questions.filter(
    (item) => answers[item.id] === item.answer
  ).length;

  const selectAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (answeredCount === questions.length) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Card
        className="p-4 shadow-sm mx-auto text-center"
        style={{ maxWidth: '650px' }}
      >
        <h3 className="mb-4">
          Bài 5: Quiz trắc nghiệm
        </h3>

        <Alert variant="success">
          <h4>Kết quả</h4>

          <h2>
            {score}/{questions.length}
          </h2>
        </Alert>

        <Button
          variant="primary"
          onClick={handleReset}
        >
          Làm lại
        </Button>
      </Card>
    );
  }

  return (
    <Card
      className="p-4 shadow-sm mx-auto"
      style={{ maxWidth: '650px' }}
    >
      <h3 className="text-center mb-4">
        Bài 5: Quiz trắc nghiệm
      </h3>

      <div className="mb-2">
        Đã trả lời: {answeredCount}/{questions.length}
      </div>

      <ProgressBar
        now={progress}
        label={`${Math.round(progress)}%`}
        className="mb-4"
      />

      <h5 className="mb-3">
        Câu {current + 1}/{questions.length}
      </h5>

      <p className="fw-bold">
        {question.question}
      </p>

      <Form>
        {question.options.map((option) => (
          <Form.Check
            key={option}
            type="radio"
            name={`question-${question.id}`}
            id={`${question.id}-${option}`}
            label={option}
            value={option}
            checked={answers[question.id] === option}
            onChange={() => selectAnswer(option)}
            className="mb-2"
          />
        ))}
      </Form>

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={current === 0}
        >
          Trước
        </Button>

        {current < questions.length - 1 ? (
          <Button
            variant="primary"
            onClick={handleNext}
          >
            Tiếp
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={
              answeredCount !== questions.length
            }
          >
            Nộp bài
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Quiz;