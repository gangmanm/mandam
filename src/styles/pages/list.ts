import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #000;

  position: relative;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
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

  position:fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const ContentContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px;
    gap: 10px;

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

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export const PostTitle = styled.div`
  font-size: clamp(10px, 1vw, 11px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostDate = styled.div`
  font-size: clamp(12px, 1.5vw, 16px);
  color: #666;
  white-space: nowrap;
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px;
  }
`;

