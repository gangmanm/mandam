import * as S from "../styles/pages/post";
import { useState, useRef } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import * as H from "../styles/components/header";
import { createPost, createCharacter } from "../api/post";
import Preview from "./Preview";
import YouTube from "react-youtube";
export default function Post() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<{ img: File | null; name: string }[]>([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const post = {
      title: "test",
      content: "test",
      File: file as File,
      youtubeUrl: "test",
      userId: 5,
      text: "test",
    };

    const response = await createPost(post);

    characters.forEach(async (character) => {
      await createCharacter(character, response.postId);
    });

    console.log(response);
  };

  const addCharacter = () => {
    setCharacters((prev) => [...prev, { img: null, name: "" }]);
  };

  const handleCharacterImageClick = (index: number) => {
    characterImageInputRefs.current[index]?.click();
  };

  const handleCharacterImageChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const newImage = event.target.files[0];
      setCharacters((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = { ...updatedImages[index], img: newImage };
        return updatedImages;
      });
    }
  };

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddCharacter = (character: { img: File; name: string }) => {
    setCharacters((prev) => [...prev, { img: character.img, name: character.name }]);
    handleModalClose();
  };

  return (
    <S.Container>
      <S.LeftContainer>
      <H.HeaderContainer>
        <H.Title>글 목록</H.Title>
        <H.Title onClick={handleSubmit}>글 작성하기</H.Title>
      </H.HeaderContainer>

      <S.ContentContainer>
        <S.YoutubeContainer>
          <S.Label>유튜브 영상 링크</S.Label>
          <S.Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="유튜브 영상 링크를 입력해주세요." />
        </S.YoutubeContainer>

        <S.FileInput onDrop={handleDrop} onClick={handleClick}>
          {file ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FaFileUpload color="white" size={30} style={{ marginBottom: "10px" }} />
              <span style={{ color: "white" }}>{file.name}</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FaFileUpload color="white" size={30} style={{ marginBottom: "10px" }} />
              <span style={{ color: "white" }}>파일 업로드</span>
              <S.FileInputInput type="file" ref={fileInputRef} onChange={handleFileChange} />
            </div>
          )}
        </S.FileInput>

        <S.CharacterBox>
          <S.CharacterBoxTitle>
            <div>영상 등장인물</div>
            <div onClick={handleModalOpen}>+</div>
          </S.CharacterBoxTitle>

          <S.CharcterContainer>
            {characters.map((character, index) => (
              <S.CharacterBoxItem key={index}>
                {character.img && (
                  <S.CharacterBoxItemImage
                    src={URL.createObjectURL(character.img)}
                    onClick={() => handleCharacterImageClick(index)}
                  />
                )}
                <S.CharacterBoxItemNameInput
                  placeholder="이름"
                  value={character.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setCharacters((prev) =>
                      prev.map((char, i) => (i === index ? { ...char, name: newName } : char))
                    );
                  }}
                />
                <S.CharacterRemoveButton
                  onClick={() => setCharacters((prev) => prev.filter((_, i) => i !== index))}
                >
                  X
                </S.CharacterRemoveButton>
              </S.CharacterBoxItem>
            ))}
          </S.CharcterContainer>
        </S.CharacterBox>
      </S.ContentContainer>
      {isModalOpen && <CharacterAddModal onAddCharacter={handleAddCharacter} handleModalClose={handleModalClose} />}
      </S.LeftContainer>
      <S.RightContainer>
        {youtubeUrl && <Preview youtubeLink={youtubeUrl} srtFile={file as File} characterImages={characters.map((character) => ({ image: character.img as File, name: character.name }))} />}
      </S.RightContainer>
    </S.Container>
  );
}
const CharacterAddModal = ({ onAddCharacter, handleModalClose }: { onAddCharacter: (character: { img: File; name: string }) => void, handleModalClose: () => void }) => {
    const [img, setImg] = useState<File | null>(null);
    const [name, setName] = useState("");
    const imageInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setImg(event.target.files[0]);
      }
    };
  
    return (
      <S.CharacterAddModal>
        <S.CharacterAddModalTitle>캐릭터 추가
            <div onClick={() => handleModalClose()}>X</div>
        </S.CharacterAddModalTitle>
        <S.CharacterBox>
          <S.CharacterBoxItemImageWrapper onClick={() => imageInputRef.current?.click()}>
            {img ? (
              <S.CharacterBoxItemImage src={URL.createObjectURL(img)} />
            ) : (
              <FaPlus size={20} color="gray" />
            )}
          </S.CharacterBoxItemImageWrapper>
  
          <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
          <S.CharacterBoxItemNameInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
          <S.CancelButton onClick={() => img && name && onAddCharacter({ img , name })}>추가하기</S.CancelButton>
        </S.CharacterBox>


      </S.CharacterAddModal>
    );
  };