import React from 'react';
import { Form } from 'react-bootstrap';

export default function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  as,
  rows,
  children,
  required = false
}) {
  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label className="fw-semibold">
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Control
        as={as}
        rows={rows}
        type={as ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={Boolean(error)}
      >
        {children}
      </Form.Control>
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
}
