import * as S from "../styles/components/postComponent";
import { useState, useEffect } from "react";

export default function PostComponent({ title, youtubeUrl }: { title: string, youtubeUrl: string }) {
        
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

      
  return <S.PostComponent>
     <S.PostComponentImage src={thumbnailUrl} alt="YouTube Thumbnail" />
     <S.PostInfoContainer>
        <S.PostComponentTitle>{title}</S.PostComponentTitle>
     </S.PostInfoContainer>

  </S.PostComponent>;
}
