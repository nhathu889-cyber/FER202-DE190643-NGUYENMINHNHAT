import { useState } from 'react';

const LABELS = [
  '',
  'Rất tệ',
  'Tệ',
  'Bình thường',
  'Tốt',
  'Tuyệt vời',
];

function StarRating({ value, onChange, max = 5 }) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div onMouseLeave={() => setHovered(0)}>
      <div className="mb-2">
        {Array.from({ length: max }, (_, i) => i + 1).map(
          (star) => (
            <span
              key={star}
              role="button"
              onMouseEnter={() => setHovered(star)}
              onClick={() =>
                onChange(star === value ? 0 : star)
              }
              style={{
                fontSize: '32px',
                cursor: 'pointer',
                color: star <= display ? '#ffc107' : '#ccc',
              }}
            >
              ★
            </span>
          )
        )}
      </div>

      <p className="mb-0">
        {display === 0 ? 'Chưa đánh giá' : LABELS[display]}
      </p>
    </div>
  );
}

export default StarRating;