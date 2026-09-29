import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  ListGroup,
} from 'react-bootstrap';
import StarRating from './StarRating';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const canSubmit =
    rating > 0 && comment.trim().length >= 5;

  const average =
    reviews.length === 0
      ? '0.0'
      : (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    setReviews((prev) => [
      {
        id: Date.now(),
        rating,
        comment: comment.trim(),
      },
      ...prev,
    ]);

    setRating(0);
    setComment('');
  };

  return (
    <Card
      className="p-4 shadow-sm mx-auto"
      style={{ maxWidth: '650px' }}
    >
      <h3 className="text-center mb-3">
        Bài 2: Đánh giá sao
      </h3>

      <h5 className="text-center mb-3">
        Trung bình {average}/5 ({reviews.length} lượt)
      </h5>

      <Form onSubmit={handleSubmit}>
        <div className="text-center mb-3">
          <StarRating
            value={rating}
            onChange={setRating}
          />
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Nhận xét</Form.Label>

          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập nhận xét ít nhất 5 ký tự..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={!canSubmit}
          className="w-100"
        >
          Gửi đánh giá
        </Button>
      </Form>

      {reviews.length > 0 && (
        <ListGroup className="mt-4">
          {reviews.map((review) => (
            <ListGroup.Item key={review.id}>
              <div>
                <span style={{ color: '#ffc107' }}>
                  {'★'.repeat(review.rating)}
                </span>

                <span style={{ color: '#ccc' }}>
                  {'★'.repeat(5 - review.rating)}
                </span>
              </div>

              <div>{review.comment}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
}

export default ReviewForm;