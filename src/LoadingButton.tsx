import React from 'react';

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  type = 'button',
}) => {
  return (
    <button type={type} disabled={isLoading}>
      {isLoading ? (
        <>
          Carregando...
          <span className="loading-spinner" />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
