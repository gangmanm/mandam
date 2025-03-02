import * as S from "../styles/components/postComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function PostComponent({ title, youtubeUrl, username, id }: { title: string, youtubeUrl: string, username: string, id: string }) {
    const navigate = useNavigate();
        
    const [videoId, setVideoId] = useState("");
    const [videoStart, setVideoStart] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    useEffect(() => {
        console.log(youtubeUrl);
        const videoId = youtubeUrl.split("v=").slice(1)[0];
        const videoRealId = videoId.split("&")[0];
        setVideoId(videoRealId);
        console.log(videoRealId);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoRealId}/maxresdefault.jpg`;
        setThumbnailUrl(thumbnailUrl);
      }, [youtubeUrl]);

      
  return <S.PostComponent onClick={() => navigate(`/content/${id}`)}>
     <S.PostComponentImage src={thumbnailUrl} alt="YouTube Thumbnail" />
     <S.PostInfoContainer>
        <S.PostComponentTitleContainer>
            <S.PostComponentTitle>{title}</S.PostComponentTitle>
            <S.PostComponentUsername>작성자 : {username}</S.PostComponentUsername>
        </S.PostComponentTitleContainer>
     </S.PostInfoContainer>

  </S.PostComponent>;
}
