import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  background-color: #1f1f1f;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  padding: 20px;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  gap: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px;
  }
`;

export const MovieContainer = styled.div`
  width: 100%;
  min-height: 160px;
  max-height: 200px;
  padding: 20px;
  border-radius: 5px;
  background: rgba(42, 42, 42, 0.9);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.4);
  display: flex;
  transition: transform 0.3s, box-shadow 0.3s;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100px; /* 부모 요소의 너비에 맞춤 */
  height: 100%; /* 원하는 높이로 설정 */
  overflow: hidden; /* 이미지가 부모 요소를 넘지 않도록 설정 */
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  color: #e0e0e0;
  flex-direction: column;
  display: flex;
  align-items: center;
  border-radius: 6px;
  background: #333333;
  box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.4);
  margin-left: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 70%;
  }
`;

export const InfoRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  justify-content: center;
  background-color: #1a1a1a;
`;

export const InfoText = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
`;
