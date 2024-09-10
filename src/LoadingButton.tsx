import React from 'react';

interface LoadingButtonProps {
  loading: boolean;
  children: string;
  type?: 'button' | 'submit' | 'reset';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  type = 'button',
}) => {
  return (
    <button type={type} disabled={loading}>
      {loading ? (
        <>
          Carregando...
          <span className="loading-spinner" />
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default LoadingButton;
