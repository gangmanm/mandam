import * as S from "../styles/pages/post";
import { useState, useRef, useEffect } from "react";
import { FaFileUpload, FaPlus } from "react-icons/fa";
import { createPost, createCharacter, getAutoSave, getFile } from "../api/post";
import Preview from "./Preview";
import { heicTo } from "heic-to";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { checkUser } from "../api/auth";
import Dropdown from "react-dropdown";
import NavBar from "../components/NavBar";

export default function Post() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [characters, setCharacters] = useState<
    { img: File | null; name: string }[]
  >([]);
  const characterImageInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [autoSaveFiles, setAutoSaveFiles] = useState<
    { file_name: string; file_path: string; created_at: string }[]
  >([]);

  const dropdownOptions = autoSaveFiles.map((file) => ({
    value: file.file_path,
    label: `${file.file_name} (${new Date(file.created_at).toLocaleString()})`,
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

  const extractCharactersFromSrt = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text.split('\n');
      const speakers = new Set<string>();
      
      lines.forEach(line => {
        // [캐릭터 이름] 형식 추출
        const speakerMatch = line.match(/^\[([^\]]+)\]/);
        if (speakerMatch) {
          const speaker = speakerMatch[1].trim();
          speakers.add(speaker);
        }
      });

      // 추출된 화자들을 characters 배열로 변환
      const extractedCharacters = Array.from(speakers).map(name => ({
        img: null,
        name: name
      }));

      return extractedCharacters;
    } catch (error) {
      console.error('자막 파일 파싱 오류:', error);
      return [];
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // 자막 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(selectedFile);
      
      // 기존 캐릭터와 중복되지 않게 새로운 캐릭터 추가
      setCharacters(prev => {
        const existingNames = new Set(prev.map(char => char.name));
        const newCharacters = extractedCharacters.filter(char => !existingNames.has(char.name));
        return [...prev, ...newCharacters];
      });

      if (extractedCharacters.length > 0 && !toast.isActive('character-toast')) {
        toast.success(`${extractedCharacters.length}개의 등장인물이 자동으로 추가되었습니다.`, {
          toastId: 'character-toast'
        });
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const selectedFile = event.dataTransfer.files[0];
      setFile(selectedFile);

      // 자막 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(selectedFile);
      
      // 기존 캐릭터와 중복되지 않게 새로운 캐릭터 추가
      setCharacters(prev => {
        const existingNames = new Set(prev.map(char => char.name));
        const newCharacters = extractedCharacters.filter(char => !existingNames.has(char.name));
        return [...prev, ...newCharacters];
      });

      if (extractedCharacters.length > 0 && !toast.isActive('character-toast')) {
        toast.success(`${extractedCharacters.length}개의 등장인물이 자동으로 추가되었습니다.`, {
          toastId: 'character-toast'
        });
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

    console.log("file", file);
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

    if (response.success) {
      toast.success("글 작성 완료");
    } else {
      toast.error("글 작성 실패");
    }

    console.log(response);
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
  };

  useEffect(() => {
    pullAutoSave();
  }, []);

  const handleLoadAutoSave = async (filePath: string) => {
    try {
      const selectedFile = autoSaveFiles.find(file => file.file_path === filePath);
      if (!selectedFile) return;

      const response = await getFile(filePath);
      const text = await response.text();
      
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const file = new File([blob], selectedFile.file_name + '.srt', { type: 'text/plain;charset=utf-8' });
      
      setFile(file);

      // 자막 파일에서 캐릭터 추출
      const extractedCharacters = await extractCharactersFromSrt(file);
      
      // 기존 캐릭터와 중복되지 않게 새로운 캐릭터 추가
      setCharacters(prev => {
        const existingNames = new Set(prev.map(char => char.name));
        const newCharacters = extractedCharacters.filter(char => !existingNames.has(char.name));
        return [...prev, ...newCharacters];
      });

      if (extractedCharacters.length > 0 && !toast.isActive('character-toast')) {
        toast.success(`${extractedCharacters.length}개의 등장인물이 자동으로 추가되었습니다.`, {
          toastId: 'character-toast'
        });
      }
      
      toast.success('자동 저장된 파일을 불러왔습니다.');
    } catch (error) {
      console.error('파일 불러오기 오류:', error);
      toast.error('파일을 불러오는데 실패했습니다.');
    }
  };

  // characterImageInputRefs 초기화 로직 추가
  useEffect(() => {
    characterImageInputRefs.current = characters.map(() => null);
  }, [characters.length]);

  // 캐릭터 이미지 변경 함수 추가
  const handleCharacterImageChange = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      try {
        let imageFile: File;
        
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
          prev.map((char, i) =>
            i === index ? { ...char, img: imageFile } : char
          )
        );

        toast.success("캐릭터 이미지가 추가되었습니다.");
      } catch (error) {
        console.error("이미지 처리 오류:", error);
        toast.error("이미지 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <S.Container>
      <NavBar />

      <S.MainContainer>
        <S.LeftContainer>
          <S.ContentContainer>
            <S.YoutubeContainer style={{ marginBottom: "10px" }}>
              <S.Label style={{ backgroundColor: "white", color: "black" }}>
                글 제목
              </S.Label>
              <S.Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="글 제목을 입력해주세요."
              />
              <S.Button onClick={handleSubmit}>글 작성하기</S.Button>
            </S.YoutubeContainer>
            <S.YoutubeContainer>
              <S.Label>유튜브 영상 링크</S.Label>
              <S.Input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="유튜브 영상 링크를 입력해주세요."
   
              />
            </S.YoutubeContainer>

            <S.AutoSaveContainer>
              <S.DropdownContainer>
                <S.StyledDropdown>
                  <Dropdown
                    options={dropdownOptions}
                    onChange={(option: any) => handleLoadAutoSave(option.value)}
                    placeholder="저장된 파일 선택"
                   className="auto-save-dropdown"
                  />
                </S.StyledDropdown>
              </S.DropdownContainer>
            </S.AutoSaveContainer>
            <S.FileInput onDrop={handleDrop} onClick={handleClick}>
              {file ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FaFileUpload
                    color="white"
                    size={30}
                    style={{ marginBottom: "10px" }}
                  />
                  <span style={{ color: "white" }}>파일 업로드 완료</span>
                  <S.FileInputInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FaFileUpload
                    color="white"
                    size={30}
                    style={{ marginBottom: "10px" }}
                  />
                  <span style={{ color: "white" }}>.srt 자막 파일 업로드</span>
                  <S.FileInputInput
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </S.FileInput>

            <S.CharacterBox>
              <S.CharacterBoxTitle>
                <div>영상 등장인물</div>
              </S.CharacterBoxTitle>

              <S.CharcterContainer>
                {characters.map((character, index) => (
                  <S.CharacterBoxItem key={index}>
                    <S.CharacterBoxItemImageWrapper
                      onClick={() => characterImageInputRefs.current[index]?.click()}
                    >
                      {character.img ? (
                        <S.CharacterBoxItemImage
                          src={URL.createObjectURL(character.img)}
                          alt={character.name}
                        />
                      ) : (
                        <FaPlus size={20} color="gray" />
                      )}
                    </S.CharacterBoxItemImageWrapper>
                    <input
                      type="file"
                      accept="image/*"
                      ref={el => characterImageInputRefs.current[index] = el}
                      style={{ display: 'none' }}
                      onChange={(e) => handleCharacterImageChange(index, e)}
                    />
                    <S.CharacterBoxItemNameInput
                      placeholder="이름"
                      value={character.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setCharacters(prev =>
                          prev.map((char, i) =>
                            i === index ? { ...char, name: newName } : char
                          )
                        );
                      }}
                    />
                    <S.CharacterRemoveButton
                      onClick={() =>
                        setCharacters((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
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
            <Preview
              youtubeUrl={youtubeUrl}
              srtFile={file as File}
              characters={characters.map((character) => ({
                img: character.img as File,
                name: character.name,
                id: '',
                post_id: '',
                img_file_path: null,
                isDelete: false,
                youtube_url: youtubeUrl,
                userId: localStorage.getItem("userId") as string,
                text: '',
              }))}
            />
        </S.RightContainer>
      </S.MainContainer>
      <ToastContainer autoClose={3000} />
    </S.Container>
  );
}