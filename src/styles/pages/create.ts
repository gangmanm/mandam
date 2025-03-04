import { styled } from "styled-components";
import * as S from "../styles/pages/create";

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow : hidden;
  padding: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
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

  padding: 20px;
  background-color: rgb(44, 44, 44);
  overflow-y: scroll;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    padding: 0px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 100%;
    min-height: 200px;
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


export const SpeakerText = styled.div`
  width: 100%;
  font-size: 17px;
  font-weight: 600;
`;


export const AllScenesContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  margin-top: 20px;
 flex-direction: column;
 padding: 20px;

   @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 12px;

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
    background-color:rgb(165, 165, 165);
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

export const YoutubeContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  background-color: #e63946;
`;

export const Input = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  color: #f1faee;
  background-color: #333;
  border: 1px solid #555;
  &:disabled {
    background-color: #555;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 20px;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  .range-slider {
    height: 5px;
    background: #ddd;
    border-radius: 5px;
    margin: 20px 0;
  }

  .range-slider .range-slider__range {
    background-color: #ff0000;
  }

  .range-slider .range-slider__thumb {
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #666;
  font-size: 14px;
`;

export const GenerateButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #cc0000;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const TimelineWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  position: relative;
  margin: 20px 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
    
    &:hover {
      background: #555;
    }
  }
`;

export const CurrentTimeIndicator = styled.div`
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: #ff0000;
  z-index: 3;
  pointer-events: none;
`;

export const TimelineContainer = styled.div`
  position: relative;
  height: 40px;
  margin: 20px 0;
  cursor: pointer;
`;

export const SubtitleBlock = styled.div`
  position: absolute;
  height: 20px;
  background-color: rgba(76, 175, 80, 0.3);
  border: 1px solid rgba(76, 175, 80, 0.5);
  top: -25px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(76, 175, 80, 0.5);
  }
`;

export const SubtitleEditor = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

export const SubtitleTimeRange = styled.div`
  margin-bottom: 15px;
`;

export const TimeRangeDisplay = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
`;

export const SubtitleControls = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  padding: 4px 8px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1976D2;
  }
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const CancelButton = styled(AddButton)`
  background-color: #f44336;

  &:hover {
    background-color: #da190b;
  }
`;

export const SubtitleList = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  user-select: none;
  overflow: scroll;
`;


export const SubtitleItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.isActive ? '#fff3f3' : '#ffffff'};
  border: 1px solid ${props => props.isActive ? '#ff0000' : '#e0e0e0'};
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.isActive ? '#ffe5e5' : '#f5f5f5'};
  }
`;

export const SubtitleTimeSpan = styled.span<{ isActive?: boolean }>`
  min-width: 120px;
  color: ${props => props.isActive ? '#ff0000' : '#666666'};
`;

export const SubtitleInput = styled.input<{ isActive?: boolean }>`
  flex: 1;
  padding: 4px 8px;
  border: 1px solid ${props => props.isActive ? '#ff0000' : '#e0e0e0'};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ff0000;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #f44336;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #da190b;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const SubtitleTime = styled.div`
  min-width: 150px;
  color: #666;
  font-size: 14px;
`;

export const SubtitleText = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  font-size: 12px;
  color: white;
`;

export const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

export const SubtitleEditorInline = styled.div`
  margin: 10px 0;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`;

export const SubtitleInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
`;

export const SubtitleDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  
  span {
    color: #888;
    font-size: 0.9em;
  }
`;

export const SubtitleMarker = styled.div<{ isDragging?: boolean }>`
  position: absolute;
  height: 20px;
  background-color: ${props => props.isDragging ? 'rgba(255, 0, 0, 0.5)' : 'rgba(255, 0, 0, 0.3)'};
  border: 1px solid red;
  border-radius: 4px;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  margin-top: 10px;
  z-index: 2;

  &:hover {
    background-color: rgba(255, 0, 0, 0.5);
  }
`;

export const SubtitleHandle = styled.div`
  width: 12px;
  height: 100%;
  background-color: red;
  cursor: ew-resize;
  position: absolute;
  top: 0;
  z-index: 3;

  &.left-handle {
    left: -6px;
  }
  
  &.right-handle {
    right: -6px;
  }

  &:hover {
    background-color: darkred;
  }
`;

export const TimelineBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const TimeMarker = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #ff0000;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 3;
  transition: transform 0.1s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.9);
  }
`;

export const DownloadButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #45a049;
  }
`;

export const RightContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
`;


export const CommentTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #333;
`;

export const CommentTime = styled.div`
  font-size: 12px;
  color: #666;
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

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #357abd;
  }

  &:active {
    background-color: #2a5f9e;
  }
`;

export const TimeInfo = styled.div`
  margin-bottom: 10px;
`;

export const CharacterSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-right: 8px;
  font-size: 14px;
`;

export const CharacterInputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CharacterInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
`;

export const AddCharacterButton = styled.button`
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;



export const SubtitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const SpeakerTag = styled.span`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

