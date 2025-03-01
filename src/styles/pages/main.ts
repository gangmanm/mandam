import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
  background-color: black;
`;

export const SubTitle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: white;
`;

export const Title = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 46px;
  font-weight: 800;
  color: white;

  border-radius: 10px;
  background: #373737;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

export const Link = styled.div`
  width: 300px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: white;

  &:hover {

    cursor: pointer;
    transform: scale(1.05);
  }
`;
