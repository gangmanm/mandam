import * as S from "../styles/pages/post";
import { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import * as H from "../styles/components/header";
import { createPost, createCharacter, getAutoSave, getFile } from "../api/post";
import Preview from "./Preview";
import { heicTo } from "heic-to"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/auth";
import Dropdown from 'react-dropdown';
import NavBar from "../components/NavBar";

export default function Post() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<{ img: File | null; name: string }[]>([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [autoSaveFiles, setAutoSaveFiles] = useState<{ file_name: string, file_path: string, created_at: string }[]>([]);

  const dropdownOptions = autoSaveFiles.map(file => ({
    value: file.file_path,
    label: `${file.file_name} (${new Date(file.created_at).toLocaleString()})`
  }));

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

    console.log("file",file);
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
    
    setTimeout(() => {
      toast.success("영상 등장인물이 추가되었습니다.", {
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    }, 0);
  };

    // cleanup에서 toast.dismiss() 제거
    useEffect(() => {
      return () => {
        toast.dismiss(); // 제거함
      };
    }, []);
  

    const pullAutoSave = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const autoSave = await getAutoSave(userId);
      setAutoSaveFiles(autoSave.data.reverse());
  
      if (autoSave.success) {
        console.log(autoSave);
      }
    }
  
    useEffect(() => {
      pullAutoSave();
    }, []);

    const handleLoadAutoSave = async (filePath: string) => {
      try {
        const selectedFile = autoSaveFiles.find(file => file.file_path === filePath);
        if (!selectedFile) return;

        const response = await getFile(filePath);
        const text = await response.text();
        
        // 텍스트를 Blob으로 변환 후 File 객체 생성
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const file = new File([blob], selectedFile.file_name + '.srt', { type: 'text/plain;charset=utf-8' });
        
        setFile(file);
        toast.success('자동 저장된 파일을 불러왔습니다.');
      } catch (error) {
        console.error('파일 불러오기 오류:', error);
        toast.error('파일을 불러오는데 실패했습니다.');
      }
    };
  
    
  return (
    <S.Container>
      <NavBar />

      <S.MainContainer>
      <S.LeftContainer>

      <S.ContentContainer>
      <S.YoutubeContainer style={{marginBottom: "10px"}}>
          <S.Label style={{backgroundColor: "white", color: "black"}}>글 제목</S.Label>
          <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="글 제목을 입력해주세요." />
          <S.Button onClick={handleSubmit}>
            글 작성하기
          </S.Button>
        </S.YoutubeContainer>
        <S.YoutubeContainer>
          <S.Label>유튜브 영상 링크</S.Label>
          <S.Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="유튜브 영상 링크를 입력해주세요." />
        </S.YoutubeContainer>

        <S.AutoSaveContainer>
          <S.DropdownContainer>
            <S.StyledDropdown>
              <Dropdown
                options={dropdownOptions}
                onChange={(option: any) => handleLoadAutoSave(option.value)}
                placeholder="저장된 파일 선택"
          />
          </S.StyledDropdown>
          </S.DropdownContainer>
</S.AutoSaveContainer>
        <S.FileInput onDrop={handleDrop} onClick={handleClick}>
          {file ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <FaFileUpload color="white" size={30} style={{ marginBottom: "10px" }} />
              <span style={{ color: "white" }}>파일 업로드 완료</span>
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
      </S.MainContainer>
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