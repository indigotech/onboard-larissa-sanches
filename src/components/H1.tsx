import React from 'react';
import styled from 'styled-components';

interface H1Props {
  children: string;
  className?: string;
}

const StyledH1 = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin: 20px 16px;
`;

const H1: React.FC<H1Props> = ({ children, className = '' }) => {
  return <StyledH1 className={className}>{children}</StyledH1>;
};

export default H1;
