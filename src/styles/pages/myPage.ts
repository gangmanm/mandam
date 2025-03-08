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
    height: fit-content;
    padding: 0px;
  }
`;

export const PostContainer = styled.div`
  width: 100%;
  height: 100%;

  gap: 10px;    
  padding: 10px;
  overflow-y: scroll;
`;

export const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;


export const AutoSaveContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const AutoSaveFileName = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid #3a3a3a;
  padding: 10px;
`;

export const AutoSaveCreatedAt = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 13px;
  color:rgb(255, 255, 255);
  background-color: #1a1a1a;
  text-align: center;
  padding: 10px;
`;

