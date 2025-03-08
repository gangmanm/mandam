import * as S from "../styles/pages/myPage";
import NavBar from "../components/NavBar";
import UserInfo from "../components/UserInfo";
import { useState, useEffect } from "react"; 
import { getMyLikesPosts, getMyCommentsPosts, getMyPosts } from "../api/post";
import PostComponent from "../components/PostComponent";
import { Post } from "../types";

export default function MyPage() {
  const [selectedBoxId, setSelectedBoxId] = useState<number | null>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      let result: Post[] = [];
      if (selectedBoxId === 1) {
        result = await getMyPosts(userId || "");
      } else if (selectedBoxId === 2) {
        result = await getMyCommentsPosts(userId || "");
      } else if (selectedBoxId === 3) {
        result = await getMyLikesPosts(userId || "");
      }

      console.log("Fetched posts:", result);

      const uniquePosts = result.filter((post, index, self) =>
        index === self.findIndex((p) => p.id === post.id)
      );

      setPosts(uniquePosts);
    };

    fetchPosts();
  }, [selectedBoxId, userId]);

  return (
    <S.MainContainer>
      <NavBar />
      <S.ContentContainer>
        <S.LeftContainer>
          <UserInfo selectedBoxId={selectedBoxId} setSelectedBoxId={setSelectedBoxId} />
          <S.PostContainer>
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
          </S.PostContainer>
        </S.LeftContainer>
        <S.RightContainer></S.RightContainer>
      </S.ContentContainer>
    </S.MainContainer>
  );
}