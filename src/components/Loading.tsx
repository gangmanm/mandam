import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0%, 100% {
    background-color: rgba(255, 255, 255, 0.2);
  }
  50% {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0);
`;

const LoadingBar = styled.div<{ delay: number }>`
  width: 70px;
  height: 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  animation: ${loadingAnimation} 1.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <LoadingContainer>
      <LoadingBar delay={0} />
      <LoadingBar delay={0.5} />
      <LoadingBar delay={1} />
    </LoadingContainer>
  );
}