import styled from 'styled-components';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #e0e0e0;
  font-weight: 700;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 5px;
`;

export const Label = styled.label`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input<{ $width: string }>`
  width: ${(props) => props.$width};
  padding: 10px;
  font-size: 16px;
  color: white;
  &:disabled {
    background-color: #555;
  }

   &:-webkit-autofill {
     -webkit-box-shadow: 0 0 0px 1000px #2a2a2a inset !important;
    background-color: #2a2a2a; !important;
   }
`;

export const EmailWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const VerificationButton = styled.button`  
  width: 100px;
  height: 40px;
  background-color: #444;
  color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #555;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #444;
  color: #e0e0e0;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  font-weight: 700;
  &:hover {
    background-color: #555;
  }
`;

