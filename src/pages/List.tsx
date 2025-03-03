import * as S from "../styles/pages/list";
import { getPosts } from "../api/post";
import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/components/header";

export default function List() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((data) => {
      console.log(data);
      setPosts(data.reverse());
    });
  }, []);
  return (
    <S.MainContainer>
      <S.Header>
          <H.Title>글 목록</H.Title>
        <H.Title onClick={() => {
          navigate("/post");
        }}>새로운 글 작성하기</H.Title>
      </S.Header>
      <S.ContentContainer>
        {posts.map((post) => (
          post.youtube_url ? <PostComponent key={post.id} title={post.title} youtubeUrl={post.youtube_url} username={post.username} id={post.id} comments_count={post.comments_count} likes_count={post.likes_count} date={post.created_at} /> : null
        ))}
      </S.ContentContainer>
    </S.MainContainer>
  );
}
