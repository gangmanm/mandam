import * as S from "../styles/pages/myPage";
import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useState, useEffect } from "react"; 
import { getMyLikesPosts, getMyCommentsPosts, getMyPosts, getAutoSave, deleteAutoSave as apiDeleteAutoSave, getFile } from "../api/post";
import PostComponent from "../components/PostComponent";
import { Post, AutoSave, PostPreview } from "../types";
import { FaTrash, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyPage() {

  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(1);
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [autoSavePosts, setAutoSavePosts] = useState<AutoSave[]>([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
 

  useEffect(() => {
    if (!userId) {
      navigate("/signin");
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      let result: PostPreview[] = [];
      if (selectedBoxId === 1) {
        result = await getMyPosts(userId || "");
      } else if (selectedBoxId === 2) {
        result = await getMyCommentsPosts(userId || "");
      } else if (selectedBoxId === 3) {
        result = await getMyLikesPosts(userId || "");
      } else if (selectedBoxId === 4) {
        const autoSaveResult = await getAutoSave(userId || "");
        // created_at 기준으로 최신순 정렬
        const sortedAutoSaves = autoSaveResult.data.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setAutoSavePosts(sortedAutoSaves);
        return;
      }

      const uniquePosts = result.filter((post, index, self) =>
        index === self.findIndex((p) => p.id === post.id)
      );

      setPosts(uniquePosts);
    };

    fetchPosts();
  }, [selectedBoxId, userId]);

  const handleDeleteAutoSave = async (userId: string, fileName: string) => {
    const result = await apiDeleteAutoSave(userId, fileName);
    const autoSaveResult = await getAutoSave(userId || "");
    setAutoSavePosts(autoSaveResult.data);
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const response = await getFile(filePath);
      const text = await response.text();
      
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.srt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
    }
  };

  return (
    <S.MainContainer>
      <NavBar />
      <S.ContentContainer>
        <S.LeftContainer>
          <UserInfo selectedBoxId={selectedBoxId} setSelectedBoxId={setSelectedBoxId} />
         
        </S.LeftContainer>
        <S.RightContainer>
        <S.PostContainer>
            {selectedBoxId !== 4 && posts.map((post) =>
              post.youtube_url ? (
                <div style={{marginBottom: "10px"}}>
                <PostComponent
                  key={post.id}
                  title={post.title}
                  youtubeUrl={post.youtube_url}
                  username={post.username}
                  id={post.id || ""}
                  comments_count={post.comments_count}
                  likes_count={post.likes_count}
                  date={post.created_at ? new Date(post.created_at).toLocaleString() : "날짜 없음"}
                />
                </div>
              ) : null
            )}
            {selectedBoxId === 4 && autoSavePosts.map((post) => (
              <S.AutoSaveContainer key={post.file_path}>
                <S.AutoSaveFileName>
                  <p>파일 이름: {post.file_name}</p>
                  <div style={{display: "flex", gap: "10px"}}>
                  <FaDownload onClick={() => handleDownload(post.file_path, post.file_name)} />
                    <FaTrash onClick={() => handleDeleteAutoSave(userId || "", post.file_name)} />
       
                  </div>
                </S.AutoSaveFileName>
                <S.AutoSaveCreatedAt>{new Date(post.created_at || "").toLocaleString()}</S.AutoSaveCreatedAt>
              </S.AutoSaveContainer>
            ))}
          </S.PostContainer>
        </S.RightContainer>
      </S.ContentContainer>
    </S.MainContainer>
  );
}