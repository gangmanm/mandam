import * as S from "../styles/pages/list";
import { getPosts } from "../api/post";
import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";

export default function List() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts().then((data) => {
      const sortedPosts = data.sort((a: any, b: any) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      setPosts(sortedPosts);
      setIsLoading(false);
    });
  }, []);

  return (
    <S.MainContainer>
      <NavBar />
      {isLoading ? (
        <Loading />
      ) : (
        <S.ContentContainer>
          {posts.map((post) =>
            post.youtube_url ? (
              <PostComponent
                key={post.id}
                title={post.title}
                youtubeUrl={post.youtube_url}
                username={post.username}
                id={post.id}
                comments_count={post.comments_count}
                likes_count={post.likes_count}
                date={post.created_at ? new Date(post.created_at).toLocaleString() : "날짜 없음"}
              />
            ) : null
          )}
        </S.ContentContainer>
      )}
    </S.MainContainer>
  );
}
