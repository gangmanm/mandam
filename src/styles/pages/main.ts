import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
  }
  background-color: black;
`;

export const ContentContainer = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 100px;
  padding: 10px;
  color: white;
`;


export const SubTitle = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: white;
    margin-top: 100px;
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
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;
  color: white;

  &:hover {

    cursor: pointer;
    transform: scale(1.05);
  }
`;

export const TextContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;


  margin-top: 100px;
`;

export const TitleText = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 50px;
  font-weight: 800;
  color: white;
  margin-right : 10px;
`;

export const SubTitleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > div {
    width: 100%;
  }
`;

export const RedBox = styled.div`
  width: 00px;
  height: 150px;
  background-color: #861717;
  border-radius: 10px;
`;
