import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1a1a1a;
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

export const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.Mobile}) {
    width: 100%;
  }
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

  color: black;
`;

export const FileInput = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 20px;

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
  margin-top: 20px;
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
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;

export const CharacterBoxItem = styled.div`
  width: 100px;
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
`;

export const CharacterAddModalTitle = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #f1faee;
  background-color:rgb(3, 3, 3);
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

export const CancelButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #e63946;
  color: white;

  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #d62839;
  }
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
