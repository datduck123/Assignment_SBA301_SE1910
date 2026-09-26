import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export default function SearchBar({ value, onChange, placeholder = "Tìm kiếm nhanh..." }) {
  return (
    <InputGroup className="shadow-sm" style={{ maxWidth: "350px" }}>
      <Form.Control
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
}
