import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const faqs = [
  {
    id: 1,
    question: 'React là gì?',
    answer:
      'Thư viện JavaScript để xây dựng giao diện người dùng theo component.',
  },
  {
    id: 2,
    question: 'State khác props thế nào?',
    answer:
      'Props do cha truyền xuống và chỉ đọc; state do chính component quản lý và thay đổi được.',
  },
  {
    id: 3,
    question: 'Vì sao phải dùng setState?',
    answer:
      'Vì chỉ khi gọi hàm set, React mới biết dữ liệu đổi để render lại giao diện.',
  },
];

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-2">
      <Card.Header
        role="button"
        onClick={() => setIsOpen((open) => !open)}
        className="d-flex justify-content-between"
      >
        <span>{question}</span>
        <strong>{isOpen ? '−' : '+'}</strong>
      </Card.Header>

      {isOpen && <Card.Body>{answer}</Card.Body>}
    </Card>
  );
}

function FaqAccordion() {
  const [singleMode, setSingleMode] = useState(false);
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div
      className="mx-auto p-3"
      style={{ maxWidth: '650px' }}
    >
      <h3 className="text-center mb-4">
        Bài 1: FAQ Accordion
      </h3>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Check
          type="switch"
          label="Chỉ mở một câu tại một thời điểm"
          checked={singleMode}
          onChange={(e) => {
            setSingleMode(e.target.checked);
            setOpenId(null);
          }}
        />

        <Button
          variant="secondary"
          size="sm"
          disabled={!singleMode || openId === null}
          onClick={() => setOpenId(null)}
        >
          Đóng tất cả
        </Button>
      </div>

      {!singleMode &&
        faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}

      {singleMode &&
        faqs.map((faq) => (
          <Card className="mb-2" key={faq.id}>
            <Card.Header
              role="button"
              onClick={() => handleToggle(faq.id)}
              className="d-flex justify-content-between"
            >
              <span>{faq.question}</span>

              <strong>
                {openId === faq.id ? '−' : '+'}
              </strong>
            </Card.Header>

            {openId === faq.id && (
              <Card.Body>{faq.answer}</Card.Body>
            )}
          </Card>
        ))}
    </div>
  );
}

export default FaqAccordion;