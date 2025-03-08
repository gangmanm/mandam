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

export const NavBarContainer = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  padding: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    flex-direction: column;
    padding: 0px;
  }
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


export const LeftContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 40%;
    padding: 0px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 220px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
    padding: 10px;
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
  width: 80px;
  height: 70px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AllCommentsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: auto;
  padding-right: 15px;
  margin-top: 20px;

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
    padding: 10px;

    margin-top: 60px;
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
  width: 24px;
  height: 24px;
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
  text-shadow: 0 2px 4px rgba(54, 54, 54, 0.1);
`;


export const VideoInfoContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  background-color :rgb(26, 26, 26);
 flex-direction: column;
 padding: 20px;

   @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-top: 170px;
    font-size: 12px;
    position: fixed;
  }
`;

export const InfoLeftContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const InfoRightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  color : white;
`;

export const UserCommentContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-top: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    padding: 10px;
    background-color:rgb(34, 34, 34);
  }
`;

export const UserCommentScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;


`;

export const CommentAddButton = styled.button`
  height: 30px;
  background-color: rgb(179, 54, 54);
  border: none;
  text-wrap: nowrap;
  padding: 0 10px;
  color: white;
`;


export const CommentInput = styled.input`
  width: 100%;
  height: 30px;
  background-color: rgb(60, 60, 60);
  border: none;
  color: white;
  padding-left: 10px;
`;

export const UserCommentTextContainer = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(39, 39, 39);
  border : 1px dashed rgb(110, 110, 110);
  margin-top: 10px;
  padding: 10px;
`;

export const UserCommentText = styled.div`
  width:  100%;
  font-size: 14px;
  font-weight: 600;
  color: white;
`;

export const UserCommentUsername = styled.div`
  width: 150px;
  height: 100%;

  font-size: 14px;
  font-weight: 600;
  color: white;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 90px;
    font-size: 12px;
  }
`;

export const ToastButton = styled.div`
  width: 50px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 400;
  transition: all 0.2s ease;
  margin-left: 10px;
  background-color: #ff4444;

  &:hover {
    background-color: #ff0000;
    transform: scale(1.05);
  }
`;