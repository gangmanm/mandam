import * as S from "../styles/components/postComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComment, FaHeart, FaTrash } from "react-icons/fa";
import { deletePost } from "../api/post";
import { toast } from "react-toastify";
export default function PostComponent({ title, youtubeUrl, username, id, comments_count, likes_count, date }: { title: string, youtubeUrl: string, username: string, id: string, comments_count: number, likes_count: number, date: string }) {
    const navigate = useNavigate();
        
    const [videoId, setVideoId] = useState("");
    const [videoStart, setVideoStart] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailError, setThumbnailError] = useState(false);
    const defaultThumbnail = "/images/mandam.png";

    useEffect(() => {
        if(youtubeUrl){
            if (youtubeUrl.includes("youtube.com")) {
                const videoId = youtubeUrl.split("v=").slice(1)[0];
                const videoRealId = videoId.split("&")[0];
                setVideoId(videoRealId);
                const thumbnailUrl = `https://img.youtube.com/vi/${videoRealId}/0.jpg`;
                setThumbnailUrl(thumbnailUrl);
            } else if (youtubeUrl.includes("youtu.be")) {
                const videoIdArray = youtubeUrl.split("/")[3].split("?")[0];
                setVideoId(videoIdArray);
                const thumbnailUrl = `https://img.youtube.com/vi/${videoIdArray}/0.jpg`;
                setThumbnailUrl(thumbnailUrl);
            }
        }
    }, [youtubeUrl]);

     
      const handleDeletePost = async (postId: string) => {
        const response = await deletePost(postId);
        if (response.success) {
          navigate("/list");
        }
      };
      
      
  return <S.PostComponent onClick={() => navigate(`/content/${id}`)}>
     <S.PostComponentImage src={thumbnailError ? defaultThumbnail : thumbnailUrl} alt="YouTube Thumbnail" onError={() => setThumbnailError(true)} />
     <S.PostInfoContainer>
        <S.PostComponentTitleContainer>
            <S.PostComponentTitle>{title}</S.PostComponentTitle>

        </S.PostComponentTitleContainer>
        <S.PostComponentTitleContainer>
        <S.PostComponentUsername>작성자 : {username}</S.PostComponentUsername>
        </S.PostComponentTitleContainer>

        <S.PostComponentInfoContainer>
            <S.PostComponentInfo>
                <S.PostComponentInfoText>
                    <FaComment style={{marginRight: "10px"}}/>
                    {comments_count}
                </S.PostComponentInfoText>
                <S.PostComponentInfoText>
                    <FaHeart style={{marginRight: "10px"}}/>
                    {likes_count}
                </S.PostComponentInfoText>
            </S.PostComponentInfo>
            <S.PostComponentDate>{date.toLocaleString().split("T")[0].split("-").join(".")}</S.PostComponentDate>
        </S.PostComponentInfoContainer>
     </S.PostInfoContainer>

  </S.PostComponent>;
}
