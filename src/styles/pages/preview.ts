import { styled } from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #1a1a1a, #2a2a2a);
  padding: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 100%;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 50%;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 22px;
  color: #ffffff;
  font-weight: 700;
  background: linear-gradient(to right, #333333, #404040);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SpeakerImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: white;
  margin-right: 20px;
`;

export const CommentTextContainer = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  color: white;
`;

export const SpeakerText = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 600;
`;

export const CommentText = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: rgb(0, 0, 0);
`;

export const AllScenesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

export const AllCommentsContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  margin-top: 20px;
  padding: 15px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
    display: block;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 100%;
  }
`;

export const CommentContainer = styled.div<{ $active: boolean }>`
  display: flex;
  gap: 15px;
  padding: 15px;
  border-radius: 12px;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(145deg, #ffffff, #b0b0b0)"
      : "linear-gradient(145deg, #333333, #404040)"};
  color: ${(props) => (props.$active ? "#ffffff" : "#b0b0b0")};
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.$active ? "0 8px 16px rgba(0,0,0,0.2)" : "0 4px 8px rgba(0,0,0,0.1)"};
`;

export const SpeakerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const SpeakerImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

export const SpeakerName = styled.span`
  font-weight: bold;
  font-size: 14px;
  background: linear-gradient(90deg, #000000, #202020);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
