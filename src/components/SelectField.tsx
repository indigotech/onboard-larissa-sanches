import React from 'react';
import styled from 'styled-components';

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: { value: string; label: string }[];
}

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin: 12px 16px;
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

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  error,
  options,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <Select value={value} onChange={onChange} hasError={!!error}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};

export default SelectField;
