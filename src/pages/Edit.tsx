import * as S from "../styles/pages/post";
import { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import * as H from "../styles/components/header";
import { createPost, createCharacter, getPost, editPost, deleteCharacter, getFile } from "../api/post";
import Preview from "./Preview";
import { heicTo } from "heic-to"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/auth";
import 'react-toastify/dist/ReactToastify.css';

interface Character {
  img?: File;
  name: string;
  isDelete?: boolean;
  img_file_path?: string;
}

export default function Edit() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCharacters, setNewCharacters] = useState<{ img: File | null; name: string }[]>([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  
  const id = window.location.pathname.split("/")[2];
  useEffect(() => {
    getPost(id).then((data: any ) => {
      console.log(data);
      setTitle(data.title);
      setYoutubeUrl(data.youtube_url);
      getFile(data.file_path).then((res) => {
        setFile(res as File);
      })    
      setCharacters(data.characters);
    });
  }, []);

  useEffect(() => {
    checkUser().then((data) => {
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
      post_id: id,
      title: title,
      File: file as File,
      userId: localStorage.getItem("userId") as string,
      youtube_url: youtubeUrl,
      text: "test",
    };

    const response = await editPost(post);

    
    console.log(characters);
    for(const character of characters){
      if(character.isDelete){
        deleteCharacter(character.id);
      }
    }
    

    if(response.success){
      toast.success("글 편집 완료");
    } else {
      toast.error("글 편집 실패");
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

  const handleRemoveCharacter = (index: number) => {
    setCharacters(prev => prev.map((char, idx) => {
      if (idx === index) {
        if (char.img_file_path) {
          return { ...char, isDelete: true };
        }
        // 새로 추가된 캐릭터인 경우
        return { ...char, isDelete: true };
      }
      return char;
    }));
  };

  const handleAddCharacter = async (character: { img: File; name: string }) => {  
    setNewCharacters((prev) => [...prev, { img: character.img, name: character.name }]);
    handleModalClose();
    const res = await createCharacter(character, id);       

    if(res.success){

      window.location.reload();
      toast.success("영상 등장인물이 추가되었습니다.", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });


    } else {
      toast.error("영상 등장인물 추가 실패");
    }
  };

  // cleanup에서 toast.dismiss() 제거
  useEffect(() => {
    return () => {
      // toast.dismiss(); // 제거함
    };
  }, []);

  return (
    <S.Container>
      <S.LeftContainer>
      <H.HeaderContainer>
        <H.Title onClick={() => navigate("/list")}>글 목록</H.Title>
        <H.Title onClick={handleSubmit}>글 편집하기</H.Title>
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
              {file.name ? <span style={{ color: "white" }}>{file.name}</span> : <span style={{ color: "white" }}>파일 편집하기</span>}
              <S.FileInputInput type="file" ref={fileInputRef} onChange={handleFileChange} />

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
            {characters
              .filter(char => !char.isDelete)
              .map((character, index) => (
                <S.CharacterBoxItem key={index}>
                  {character.img_file_path && (
                    <S.CharacterBoxItemImage
                      src={`${SERVER_URL}/posts/get-file?file_path=${character.img_file_path}`}
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
                    onClick={() => handleRemoveCharacter(index)}
                  >
                    X
                  </S.CharacterRemoveButton>
                </S.CharacterBoxItem>
              ))}
            {newCharacters.map((character, index) => (
              <S.CharacterBoxItem key={index}>
                <S.CharacterBoxItemImage src={URL.createObjectURL(character.img as Blob)} />
                <S.CharacterBoxItemNameInput value={character.name} onChange={(e) => setNewCharacters((prev) => prev.map((c, i) => i === index ? { ...c, name: e.target.value } : c))} />
                <S.CharacterRemoveButton
                  onClick={() =>  setNewCharacters((prev) => prev.filter((_, i) => i !== index))}
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
        {youtubeUrl && <Preview youtubeLink={youtubeUrl} srtFile={file as File} characters={characters} characterImages={newCharacters} edit={true} />}
      </S.RightContainer>
      <ToastContainer
        autoClose={1000}
        closeOnClick
        theme="light"
      />
    </S.Container>
  );
}

const CharacterAddModal = ({ onAddCharacter, handleModalClose }: { onAddCharacter: (character: { img: File; name: string }) => void, handleModalClose: () => void }) => {
  const [img, setImg] = useState<File | null>(null);
  const [name, setName] = useState("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === "image/heic" || event.target.files[0].type === "image/heif") {
        const jpeg = await heicTo({
          blob: event.target.files[0],
          type: "image/jpeg",
          quality: 0.5
        });
        setImg(new File([jpeg as Blob], event.target.files[0].name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" }));
      } else {
        setImg(event.target.files[0]);
      }
    }
  };

  return (
    <S.CharacterAddModal>
      <S.CharacterAddModalTitle>
        캐릭터 추가
        <div onClick={() => handleModalClose()}>X</div>
      </S.CharacterAddModalTitle>
      <S.CharacterBox>
        <S.CharacterBoxItemImageWrapper onClick={() => imageInputRef.current?.click()}>
          {img ? (
            <S.CharacterBoxItemImage src={URL.createObjectURL(img as Blob)} />
          ) : (
            <FaPlus size={20} color="gray" />
          )}
        </S.CharacterBoxItemImageWrapper>
        <input type="file" ref={imageInputRef} style={{ display: "none" }} onChange={handleImageChange} />
        <S.CharacterBoxItemNameInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="이름 입력" />
        <S.CancelButton onClick={() => img && name && onAddCharacter({ img, name })}>
          추가하기
        </S.CancelButton>
      </S.CharacterBox>
    </S.CharacterAddModal>
  );
};
