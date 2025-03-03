import * as S from "../styles/components/postComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function PostComponent({ title, youtubeUrl, username, id }: { title: string, youtubeUrl: string, username: string, id: string }) {
    const navigate = useNavigate();
        
    const [videoId, setVideoId] = useState("");
    const [videoStart, setVideoStart] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailError, setThumbnailError] = useState(false);
    const defaultThumbnail = "/images/mandam.png";

    useEffect(() => {
        console.log(youtubeUrl);
        const videoId = youtubeUrl.split("v=").slice(1)[0];
        const videoRealId = videoId.split("&")[0];
        setVideoId(videoRealId);
        console.log(videoRealId);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoRealId}/0.jpg`;
        setThumbnailUrl(thumbnailUrl);
      }, [youtubeUrl]);

      
  return <S.PostComponent onClick={() => navigate(`/content/${id}`)}>
     <S.PostComponentImage src={thumbnailError ? defaultThumbnail : thumbnailUrl} alt="YouTube Thumbnail" onError={() => setThumbnailError(true)} />
     <S.PostInfoContainer>
        <S.PostComponentTitleContainer>
            <S.PostComponentTitle>{title}</S.PostComponentTitle>
            <S.PostComponentUsername>작성자 : {username}</S.PostComponentUsername>
        </S.PostComponentTitleContainer>
     </S.PostInfoContainer>

  </S.PostComponent>;
}
