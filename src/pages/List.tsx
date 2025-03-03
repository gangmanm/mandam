import * as S from "../styles/pages/list";
import { getPosts } from "../api/post";
import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("getPosts");
    getPosts().then((data) => {
      console.log(data);

      setPosts(data.reverse());
    });
  }, []);
  return (
    <S.MainContainer>
      <S.Header>
        <div style={{fontSize: "20px", fontWeight: "bold"}}>글 목록</div>
        <div style={{fontSize: "16px", fontWeight: "bold"}} onClick={() => {
          navigate("/post");
        }}>새로운 글 작성하기</div>
      </S.Header>
      <S.ContentContainer>
        {posts.map((post) => (
          post.youtube_url ? <PostComponent key={post.id} title={post.title} youtubeUrl={post.youtube_url} username={post.username} id={post.id} /> : null
        ))}
      </S.ContentContainer>
    </S.MainContainer>
  );
}
