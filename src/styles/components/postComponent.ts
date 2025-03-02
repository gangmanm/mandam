import styled from "styled-components";

export const PostComponent = styled.div`
  width: 100%;
  height: 100px;
  background-color: #1a1a1a;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
`;


export const PostComponentImage = styled.img`
  width: 150px;
  height: 80px;

  border-radius: 10px;
`;

export const PostInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 10px;
`;


export const PostComponentTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

