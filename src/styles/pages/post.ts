import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: black;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
`;

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
  }
`;

export const AutoSaveContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
    margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 20px;
  margin-top: 10px;
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

export const FileInput = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px dashed #ccc;
  background-color: transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const FileInputInput = styled.input`
  display: none;
  background-color: transparent;
  color: white;
  &:hover {
    background-color: transparent;
  }
`;

export const CharacterBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #2b2b2b;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const CharacterBoxTitle = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #3a3a3a;
  color: #f1faee;
`;

export const CharcterContainer = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CharacterBoxItem = styled.div`
  width: 100px;
  min-width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  position:relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CharacterRemoveButton = styled.button`
  width: 20%;
  height: 20px;
  background-color: #e63946;
  color: white;

  border-radius: 50%;
  position:absolute;
  right:0;
  top:0;

  &:hover {
    background-color: #d62839;
  }
`;

export const CharacterBoxItemName = styled.div`
  font-size: 14px;
  color: white;
`;

export const CharacterBoxItemImageInput = styled.input`
width: 70px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: white;
  border-radius: 50%;
`;

export const CharacterBoxAddButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: #457b9d;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  position:absolute;
  right:0;
  top:0;

  &:hover {
    background-color: #1d3557;
  }
`;

export const CharacterBoxItemNameInput = styled.input`
  width: 90%;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  color: white;
  margin-top: 10px;
`;

export const CharacterAddModal = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-color: #2a2a2a;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
  top: 50%;
    left: 50%;
  }
`;

export const CharacterAddModalTitle = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  color: #f1faee;
  background-color:rgb(34, 34, 34);
`;

export const CharacterBoxItemImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background-color: #f1faee;
  border: 2px solid #ccc;
`;

export const CharacterBoxItemImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
`;

export const CancelButton = styled.div`
  width: 100%;
  height: 40px;
  background-color:rgb(0, 0, 0);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

export const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
    min-height: 700px;
  }
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

export const DropdownContainer = styled.div`
  width: 100%;
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
  margin-left: 10px;
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
