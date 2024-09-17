import React from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string;
  max?: string;
}

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin: 12px 16px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  max-width: 250px;
  padding: 8px;
  border: 1px solid ${(props) => (props.hasError ? '#ff0000' : '#777777')};
  border-radius: 12px;
  box-sizing: border-box;
  margin: 0 16px;
`;

const ErrorText = styled.p`
  font-size: 12px;
  font-weight: normal;
  color: #ff0000;
  margin-top: 8px;
  margin: 0 16px;
`;

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  min,
  max,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        hasError={!!error}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default FormField;
