import React from 'react';
import styled from 'styled-components';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  error?: string;
  min?: string;
  max?: string;
  options?: { value: string; label: string }[];
}

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin: 12px 16px;
  display: block;
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

const Select = styled.select<{ hasError?: boolean }>`
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
  options,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      {type === 'select' ? (
        <Select
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void
          }
          hasError={!!error}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={
            onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
          }
          min={min}
          max={max}
          hasError={!!error}
        />
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default FormField;
