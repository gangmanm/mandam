import * as S from "../styles/pages/post";
import { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { createCharacter, getPost, editPost, deleteCharacter, getFile, getAutoSave, editCharacter } from "../api/post";
import Preview from "./Preview";
import { heicTo } from "heic-to"
import { ToastContainer, toast } from "react-toastify";
import { data, useNavigate } from "react-router-dom";
import { checkUser } from "../api/auth";
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from 'react-dropdown';
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import { Post, Character } from "../types";

export default function Edit() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCharacters, setNewCharacters] = useState<{ img: File | null; name: string }[]>([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [title, setTitle] = useState("");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [autoSaveFiles, setAutoSaveFiles] = useState<{ file_name: string, file_path: string, created_at: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownOptions = autoSaveFiles.map(file => ({
    value: file.file_path,
    label: `${file.file_name} (${new Date(file.created_at).toLocaleString()})`
  }));

  const id = window.location.pathname.split("/")[2];


  useEffect(() => {
    checkUser().then((data) => {
      if (data.success) {
        setUserId(data.userId);
      } else {
        navigate("/signin");
      }
    });
  }, [navigate]);

  const extractCharactersFromSrt = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const speakers = new Set<string>();
      
      lines.forEach(line => {

        const speakerMatch = line.match(/^\[([^\]]+)\]/);
        if (speakerMatch) {
          const speaker = speakerMatch[1].trim();
          speakers.add(speaker);
        }
      });

      const extractedCharacters = Array.from(speakers).map(name => ({
        name: name,
        img: null,
        isDelete: false
      }));

      return extractedCharacters;
    } catch (error) {
      console.error('자막 파일 파싱 오류:', error);
      return [];
    }
  };


  useEffect(() => {   
    getPost(id).then(async (data: any) => {
      setTitle(data.title);
      setYoutubeUrl(data.youtube_url);
      
      const fileResponse = await getFile(data.file_path);
      setFile(fileResponse as File);
      
      // 기존 캐릭터 설정
      const existingCharacters = data.characters.map((char: Character) => ({
        ...char,
        isDelete: false
      }));
      
      // 자막에서 새로운 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(fileResponse as File);
      
      // 기존 캐릭터와 새로 추출된 캐릭터 병합
      const existingNames = new Set(existingCharacters.map((char: Character) => char.name));
      const newCharacters = extractedCharacters.filter(char => !existingNames.has(char.name));
      
      setCharacters([...existingCharacters, ...newCharacters]);
      setIsLoading(false);
    });
  }, [id]);


  

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // 새 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(selectedFile);
      
      // 기존 캐릭터들의 이미지 정보를 저장
      const characterImages = new Map(
        characters
          .filter(char => (char.img || char.img_file_path) && !char.isDelete)
          .map(char => [char.name, { img: char.img, img_file_path: char.img_file_path, id: char.id }])
      );

      // 새로운 캐릭터 목록 생성
      const newCharacterList = extractedCharacters.map(newChar => ({
        ...newChar,
        ...(characterImages.get(newChar.name) || {}), // 기존 이미지 정보가 있으면 유지
      }));

      setCharacters(newCharacterList as Character[]);

      if (extractedCharacters.length > 0) {
        toast.success(`${extractedCharacters.length}개의 등장인물이 설정되었습니다.`);
      }
    }
  };


  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);

      // 새 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(selectedFile);
      
      // 기존 캐릭터들의 이미지 정보를 저장
      const characterImages = new Map(
        characters
          .filter(char => (char.img || char.img_file_path) && !char.isDelete)
          .map(char => [char.name, { img: char.img, img_file_path: char.img_file_path, id: char.id }])
      );

      // 새로운 캐릭터 목록 생성
      const newCharacterList = extractedCharacters.map(newChar => ({
        ...newChar,
        ...(characterImages.get(newChar.name) || {}), // 기존 이미지 정보가 있으면 유지
      }));

      setCharacters(newCharacterList as Character[]);

      if (extractedCharacters.length > 0) {
        toast.success(`${extractedCharacters.length}개의 등장인물이 설정되었습니다.`);
      }
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

    try {
      // 1. 게시글 수정
      const post = {
        id: id,
        title: title,
        File: file as File,
        userId: localStorage.getItem("userId") as string,
        youtubeUrl: youtubeUrl,
        text: "test",
      };

      const response = await editPost(post as Post);  

      if (!response.success) {
        toast.error("글 편집 실패");
        return;
      }

      // 2. 캐릭터 처리
      for (const character of characters) {
        // 삭제된 캐릭터
        if (character.isDelete && character.id) {
          await deleteCharacter(character.id);
          continue;
        }

        // 이미지가 변경된 기존 캐릭터
        if (character.id && character.img) {
          await editCharacter({
            id: character.id,
            name: character.name,
            img: character.img,
            postId: parseInt(id)
          });
          continue;
        }

        // 새로 추가된 캐릭터
        if (!character.id && !character.isDelete && character.img) {
          await createCharacter({
            img: character.img,
            name: character.name
          }, parseInt(id)); 
        }
      }

      toast.success("글 편집 완료");
      navigate(`/content/${id}`);

    } catch (error) {
      console.error("글 편집 오류:", error);
      toast.error("글 편집 중 오류가 발생했습니다.");
    }
  };
  const [youtubeUrl, setYoutubeUrl] = useState("");


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


  // cleanup에서 toast.dismiss() 제거
  useEffect(() => {
    return () => {
      // toast.dismiss(); // 제거함
    };
  }, []);


  const handleLoadAutoSave = async (filePath: string) => {
    try {
      const selectedFile = autoSaveFiles.find(file => file.file_path === filePath);
      if (!selectedFile) return;

      const response = await getFile(filePath);
      if (response instanceof Blob) {
        const text = await response.text();
        
        // 텍스트를 Blob으로 변환 후 File 객체 생성
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const file = new File([blob], selectedFile.file_name + '.srt', { type: 'text/plain;charset=utf-8' });
        
      // 새 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(file);
      
      // 기존 캐릭터들의 이미지 정보를 저장
      const characterImages = new Map(
        characters
          .filter(char => (char.img || char.img_file_path) && !char.isDelete)
          .map(char => [char.name, { img: char.img, img_file_path: char.img_file_path, id: char.id }])
      );
      
      // 새로운 캐릭터 목록 생성
      const newCharacterList = extractedCharacters.map(newChar => ({
        ...newChar,
        ...(characterImages.get(newChar.name) || {}), // 기존 이미지 정보가 있으면 유지
      }));

      setFile(file);
      setCharacters(newCharacterList as Character[]);

    }
    } catch (error) {
      console.error('파일 불러오기 오류:', error);
    }
  };

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

  // 이미지 변경 처리 함수 추가
  const handleCharacterImageChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        let imageFile: File;
        const file = event.target.files[0];

        // HEIC/HEIF 이미지 처리
        if (file.type === "image/heic" || file.type === "image/heif") {
          const jpeg = await heicTo({
            blob: file,
            type: "image/jpeg",
            quality: 0.5,
          });
          imageFile = new File([jpeg as Blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
            type: "image/jpeg",
          });
        } else {
          imageFile = file;
        }

        // characters 배열 업데이트
        setCharacters(prev => 
          prev.map((char, i) => {
            if (i === index) {
              // 기존 이미지 경로 유지하면서 새 이미지 추가
              return {
                ...char,
                img: imageFile,
                img_file_path: char.img_file_path // 기존 경로 유지
              };
            }
            return char;
          })
        );
      } catch (error) {
        console.error("이미지 처리 오류:", error);
      }
    }
  };

  // 먼저 필터링된 캐릭터 배열을 변수로 저장하고 사용
  const filteredCharacters = characters.filter(char => !char.isDelete);

  // useEffect 수정
  useEffect(() => {
    characterImageInputRefs.current = filteredCharacters.map((_, i) => characterImageInputRefs.current[i] || null);
  }, [filteredCharacters.length]);

  return (
    <S.Container>
      <NavBar />
      {isLoading && <Loading />}
      {!isLoading && (
      <S.MainContainer>
      <S.LeftContainer>

      <S.ContentContainer>
      <S.YoutubeContainer style={{marginBottom: "10px"}}>
          <S.Label style={{backgroundColor: "white", color: "black"}}>글 제목</S.Label>
          <S.Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="글 제목을 입력해주세요." />
          <S.Button onClick={handleSubmit}>
            글 편집하기
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
            placeholder="자동 저장된 파일 선택"
            className=""
          />
          </S.StyledDropdown>
          </S.DropdownContainer>
          </S.AutoSaveContainer>
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
          </S.CharacterBoxTitle>

          <S.CharcterContainer>
            {filteredCharacters.map((character, index) => (
              <S.CharacterBoxItem key={index}>
                <S.CharacterBoxItemImageWrapper
                  onClick={() => characterImageInputRefs.current[index]?.click()}
                  style={{ cursor: 'pointer' }}
                >
                  {character.img ? (
                    <S.CharacterBoxItemImage
                      src={URL.createObjectURL(character.img)}
                    />
                  ) : character.img_file_path ? (
                    <S.CharacterBoxItemImage
                      src={`${SERVER_URL}/posts/get-file?file_path=${character.img_file_path}`}
                    />
                  ) : (
                    <FaPlus size={20} color="gray" />
                  )}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    background: 'rgba(0,0,0,0.5)', 
                    padding: '2px',
                    borderRadius: '50%'
                  }}>
                  </div>
                </S.CharacterBoxItemImageWrapper>
                <input
                  type="file"
                  accept="image/*"
                  ref={el => characterImageInputRefs.current[index] = el}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const originalIndex = characters.findIndex(c => c.name === character.name);
                    handleCharacterImageChange(originalIndex, e);
                  }}
                />
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
      </S.LeftContainer>

      <S.RightContainer>
        {youtubeUrl && file && (
          <Preview 
            youtubeUrl={youtubeUrl} 
            srtFile={file} 
            characters={characters.filter(char => !char.isDelete).map(char => ({
              img: char.img || null,
              name: char.name,
              img_file_path: char.img_file_path,
              id: char.id || '',
              postId: id
            }))}
            edit={true} 
          />
        )}
      </S.RightContainer>
      <ToastContainer
        autoClose={1000}
        closeOnClick
        theme="light"
      />

      </S.MainContainer>
      )}
    </S.Container>
  );
}