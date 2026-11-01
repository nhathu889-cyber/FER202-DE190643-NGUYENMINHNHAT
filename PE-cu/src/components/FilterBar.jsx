import { Form, InputGroup } from 'react-bootstrap';

function FilterBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
}

export default FilterBar;
