import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    padding: 0px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  padding: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    flex-direction: column;
    padding: 0px;
  }
`;



export const LeftContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 1200px;
    padding: 0px;
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;    
  padding: 10px;
  overflow-y: auto;
`;

export const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  background-color: blue;
`;
