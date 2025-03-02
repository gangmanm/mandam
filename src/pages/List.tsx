import * as S from "../styles/pages/list";
import { getPosts } from "../api/post";
import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent";
export default function List() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    console.log("getPosts");
    getPosts().then((data) => {
      console.log(data);
      setPosts(data);
    });
  }, []);
  return (
    <S.MainContainer>
      <S.Header>글 목록</S.Header>
      <S.ContentContainer>
        {posts.map((post) => (
          post.youtube_url ? <PostComponent key={post.id} title={post.title} youtubeUrl={post.youtube_url} /> : null
        ))}
      </S.ContentContainer>
    </S.MainContainer>
  );
}
