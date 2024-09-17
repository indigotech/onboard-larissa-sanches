import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

const StyledButton = styled.button<{ disabled?: boolean; loading?: boolean }>`
  width: 100%;
  max-width: 250px;
  font-size: 16px;
  font-weight: regular;
  color: #ffffff;
  background-color: ${(props) => (props.disabled ? '#cccccc' : '#007bff')};
  height: 44px;
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 16px;

  &:hover {
    opacity: ${(props) => (props.loading ? 1 : 0.8)};
  }
`;

const LoadingText = styled.span<{ loading?: boolean }>`
  color: #ffffff;
  font-size: 16px;
`;

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = 'button',
  disabled = false,
  loading = false,
}) => (
  <StyledButton
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    loading={loading}
    aria-busy={loading}
  >
    {loading ? (
      <LoadingText loading={loading}>Carregando...</LoadingText>
    ) : (
      children
    )}
  </StyledButton>
);

export default Button;
