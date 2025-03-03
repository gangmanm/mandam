import * as S from "../styles/pages/post";
import { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import * as H from "../styles/components/header";
import { createPost, createCharacter } from "../api/post";
import Preview from "./Preview";
import { heicTo } from "heic-to"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/auth";
export default function Post() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<{ img: File | null; name: string }[]>([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    checkUser().then((data) => {
      console.log(data);
      if (data.success) {
        setUserId(data.userId);
      } else {
        navigate("/signin");
      }
    });
  }, [navigate]);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
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
    if (!youtubeUrl || !file) {
      toast.error("유튜브 영상 링크와 자막 파일을 입력해주세요.");
      return;
    }

    const post = {
      title: title,
      File: file as File,
      youtubeUrl: youtubeUrl,
      userId: localStorage.getItem("userId") as string,
      text: "test",
    };

    const response = await createPost(post);

    characters.forEach(async (character) => {
      await createCharacter(character, response.postId);
    });

    if(response.success){
      toast.success("글 작성 완료");
    } else {
      toast.error("글 작성 실패");
    }

    console.log(response);
  };
  const handleCharacterImageClick = (index: number) => {
    characterImageInputRefs.current[index]?.click();
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
    toast.success("영상 등장인물이 추가되었습니다.");
  };

  return (
    <S.Container>
      <S.LeftContainer>
      <H.HeaderContainer>
        <H.Title onClick={() => navigate("/list")}>글 목록</H.Title>
        <H.Title onClick={handleSubmit}>글 작성하기</H.Title>
      </H.HeaderContainer>

      <S.ContentContainer>
      <S.YoutubeContainer style={{marginBottom: "10px"}}>
          <S.Label style={{backgroundColor: "white", color: "black"}}>글 제목</S.Label>
          <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="글 제목을 입력해주세요." />
        </S.YoutubeContainer>
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
              <span style={{ color: "white" }}>.srt 자막 파일 업로드</span>
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
      <ToastContainer />
    </S.Container>
  );
}
const CharacterAddModal = ({ onAddCharacter, handleModalClose }: { onAddCharacter: (character: { img: File; name: string }) => void, handleModalClose: () => void }) => {
    const [img, setImg] = useState<File | null>(null);
    const [name, setName] = useState("");
    const imageInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        if (event.target.files[0].type === "image/heic" || event.target.files[0].type === "image/heif") {
            const jpeg = await heicTo({
                blob: event.target.files[0],
                type: "image/jpeg",
                quality: 0.5
              })
           setImg(new File([jpeg as Blob], event.target.files[0].name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" }));
        } else {
            setImg(event.target.files[0]);
        }
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