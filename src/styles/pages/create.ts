import styled from "styled-components";
import Dropdown from 'react-dropdown';

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow : hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    flex-direction: column;
    padding: 0px;
  }
`;

export const LeftContainer = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
  background-color: rgb(0, 0, 0);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    padding: 0px;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  height: 300px;
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
  height: 100%;
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

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
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
  background: rgba(147, 147, 147, 0.05);
  border-radius: 8px;

  .range-slider {
    height: 5px;
    background: #ddd;
    border-radius: 5px;
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
  width: 100%;
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
  margin-left: 10px;
  padding: 8px 16px;
  background-color:rgb(17, 17, 17);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-wrap: nowrap;

  &:hover {
    background-color:rgb(74, 74, 74);
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
  height: calc(100% - 60px);
  padding: 20px;
  margin-top: 20px;
  background-color:rgb(0, 0, 0);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
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
  width: 100%;
`;

export const SubtitleTimeSpan = styled.span<{ isActive?: boolean }>`
  min-width: 120px;
  flex-shrink: 0;
  color: ${props => props.isActive ? '#ff0000' : '#666666'};
`;

export const SubtitleInput = styled.textarea<{ isActive?: boolean }>`
  height: 100%;
  flex: 1;
  min-width: 0;
  padding: 8px;
  border: 1px solid ${props => props.isActive ? '#ff0000' : '#e0e0e0'};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ff0000;
  }
`;

export const DeleteButton = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #da190b;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content : flex-end;
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
  background-color:rgb(0, 0, 0);
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

export const Button = styled.button`
  flex: 1;
  height: 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-wrap: nowrap;
  padding: 0 10px;
  &:hover {
    background: linear-gradient(135deg, #2d2d2d 0%, #404040 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;


export const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color:rgb(0, 0, 0);
  overflow-y: scroll;
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



export const ProjectNameContainer = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
`;

export const ProjectNameLabel = styled.label`
  width: 160px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  background-color: #e63946;
`;

export const ProjectNameInput = styled.input`
padding-left: 10px;
  width: calc(100% - 40px);
  height: 100%;
  border-radius: 4px;
  font-size: 16px;
  color: #f1faee;
  background-color: #333;
  border: 1px solid #555;
  &:disabled {
    background-color: #555;
  }
`;

export const AutoSaveContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #888;
  }
  
  &:focus {
    outline: none;
    border-color: #000;
  }
  
  option {
    padding: 8px;
  }
`;

export const ContentContainer = styled.div`
  width: calc(100% - 60px)
  height: 100%;
  display: flex;
  overflow-y: scroll;
`;


export const DropdownContainer = styled.div`
  width: 100%;
`;

export const StyledDropdown = styled.div`
  .auto-save-dropdown {
    width: 100%;
    
    .Dropdown-control {
      width: 100%;
      height: 40px;
      background-color: #333;
      border: 1px solid #555;
      color: #f1faee;
      display: flex;
      align-items: center;
      padding: 0 15px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #444;
        border-color: #666;
      }
    }

    .Dropdown-menu {
      width: 100%;
      background-color: #333;
      border: 1px solid #555;
      border-top: none;
      max-height: 200px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-track {
        background: #222;
      }

      &::-webkit-scrollbar-thumb {
        background: #555;
        border-radius: 4px;
        
        &:hover {
          background: #666;
        }
      }
    }

    .Dropdown-option {
      padding: 12px 15px;
      color: #f1faee;
      transition: all 0.2s ease;

      &:hover {
        background-color: #444;
      }

      &.is-selected {
        background-color: #457b9d;
      }
    }

    .Dropdown-arrow {
      border-color: #f1faee transparent transparent;
      transition: all 0.2s ease;
    }

    .is-open .Dropdown-arrow {
      border-color: transparent transparent #f1faee;
    }
  }
`;

export const MobileWarningContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 20px;
`;

export const WarningBox = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 90%;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const WarningTitle = styled.h2`
  color: #ff4444;
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const WarningText = styled.p`
  color: #ffffff;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
`;

export const FileInputLabel = styled.label`
  flex: 1;
  height: 40px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-wrap: nowrap;
  padding: 0 10px;
  
  &:hover {
    background: linear-gradient(135deg, #34495e 0%, #2980b9 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  input {
    display: none;
  }
`;


