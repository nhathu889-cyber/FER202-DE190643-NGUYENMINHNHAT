import { Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/actions.js';
import { selectFilter } from '../redux/selectors.js';

const FILTERS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'active', label: 'Chưa xong' },
  { key: 'done', label: 'Đã xong' },
];

export default function FilterBar() {
  const current = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="todo-filters" role="group" aria-label="Lọc công việc">
      {FILTERS.map((filter) => (
        <Button
          key={filter.key}
          variant={current === filter.key ? 'primary' : 'outline-primary'}
          aria-pressed={current === filter.key}
          onClick={() => dispatch(setFilter(filter.key))}
        >
          {filter.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}
