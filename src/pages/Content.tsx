import React, { useState, useEffect, useRef, useCallback } from "react";
import * as S from "../styles/pages/content";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { getPost, getFile, getComments, likePost, getLike, deletePost } from "../api/post";
import { addComment } from "../api/post";
import { FaEdit, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { deleteComment } from "../api/post";
import { FaTrash } from "react-icons/fa";
import { checkUser } from "../api/auth";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

interface Speaker {
  name: string;
  color: string;
  img_file_path: string;
}

interface Comment {
  comment: string;
  username: string;
}

interface CommentaryItem {
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

interface PreviewProps {
  youtubeLink: string;
  srtFile: File;
  characterImages: { image: File; name: string }[];
}

export default function Content() {

 const { id } = useParams();
  const currentTime = useRef<number>(0);
  const [subtitles, setSubtitles] = useState<CommentaryItem[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<CommentaryItem | null>(
    null
  );
  const [player, setPlayer] = useState<any>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const activeCommentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [videoId, setVideoId] = useState<string>("");
  const [videoStart, setVideoStart] = useState<number>(0);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [characters, setCharacters] = useState<{ img_file_path: string; name: string }[]>([]);
  const [videoInfo, setVideoInfo] = useState<{ title: string; text: string, username: string ,created_at: string}>({ title: "", text: "", writer: "" ,created_at: ""});
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [like, setLike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");
  const [playerKey, setPlayerKey] = useState(0);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      controls: 1,
      disablekb: 1,
      fs: 0,
      enablejsapi: 1,
      start: videoStart
    },
  };

  useEffect(() => {
    getPost(id as string).then((res) => {
      setYoutubeLink(res.youtube_url);
      getFile(res.file_path).then((res) => {
        setSrtFile(res);
      });
      setCharacters(res.characters);
      setVideoInfo(res);
    });
  }, [id]);

  // SRT 타임코드를 초로 변환하는 함수
  const srtTimeToSeconds = (timeString: string): number => {
    const [time, milliseconds] = timeString.split(",");
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds + Number(milliseconds) / 1000;
  };

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // speakers 데이터 로드
  useEffect(() => {
    if (characters.length > 0) {
      const speakers = characters.map((character) => ({
        name: character.name,
        color: getRandomColor(),
        img_file_path: character.img_file_path,
      }));
      setSpeakers(speakers);
    }
  }, [srtFile, characters]);

  // SRT 파일 파싱
  const parseSRT = (srtContent: string): CommentaryItem[] => {
    if (!srtContent) return [];
  
    // 자막 블록을 자막 번호와 시간 코드 사이의 공백을 기준으로 분리
    const blocks = srtContent.split(/\n\s*\n/);
    let currentSpeaker: string | undefined;
  
    return blocks
      .map((block) => {
        if (!block.trim()) return null; // 빈 블록 무시
  
        const lines = block.split("\n");
        if (lines.length < 2) return null; // 유효하지 않은 블록 무시
  
        const [startTime, endTime] = lines[1]
          .split(" --> ")
          .map(srtTimeToSeconds);
        const text = lines.slice(2).join("\n");
  
        // 화자 정보 추출
        const speakerMatch = text.match(/^\[(.*?)\]/);
        if (speakerMatch) {
          currentSpeaker = speakerMatch[1];
        }
        const cleanText = speakerMatch ? text.replace(/^\[(.*?)\]\s*/, "") : text;
  
        return {
          startTime,
          endTime,
          text: cleanText,
          speaker: currentSpeaker,
        };
      })
      .filter((item): item is CommentaryItem => item !== null); // null 값 필터링
  };


  // SRT 파일 로드
  useEffect(() => {
    const fetchSRT = async () => {
      if (!srtFile) {
        return;
      }

      try {
        const srtContent = await srtFile.text();
        const parsedSubtitles = parseSRT(srtContent);
        setSubtitles(parsedSubtitles);
        
        // 첫 번째 자막의 시작 시간을 비디오 시작 시간으로 설정
        if (parsedSubtitles.length > 0) {
          setVideoStart(parsedSubtitles[0].startTime);
        }
      } catch (error) {
        console.error("Failed to fetch SRT:", error);
      }
    };

    fetchSRT();
  }, [srtFile]);

  // 현재 자막 업데이트
  useEffect(() => {
    if (!player || !subtitles.length) return;

    const intervalId = setInterval(() => {
      const currentVideoTime = player.getCurrentTime();
      currentTime.current = currentVideoTime;

      
      const currentSub = subtitles.find(
        (sub) => currentVideoTime >= sub.startTime && currentVideoTime <= sub.endTime
      );

      if (JSON.stringify(currentSub) !== JSON.stringify(currentSubtitle)) {
        setCurrentSubtitle(currentSub || null);

        // 활성화된 자막으로 스크롤
        if (activeCommentRef.current && commentsContainerRef.current) {
          activeCommentRef.current.style.scrollMarginBottom = "200px"; // 스크롤 마진을 추가
          activeCommentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 100); // 100ms마다 체크

    return () => clearInterval(intervalId);
  }, [player, subtitles, currentSubtitle]);

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    // 첫 자막의 시작 시간으로 이동 후 재생
    if (subtitles.length > 0) {
      event.target.seekTo(subtitles[0].startTime);
    }
    event.target.playVideo();
  };

  useEffect(() => {
    if (subtitles.length > 0) {
      setVideoStart(subtitles[0].startTime);
    }
  }, [subtitles]);

  // window 레벨에서 이벤트 리스너 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!player) return;

      // input이나 textarea에서만 제외
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          player.seekTo(player.getCurrentTime() - 5, true);
          break;
        case "ArrowRight":
          e.preventDefault();
          player.seekTo(player.getCurrentTime() + 5, true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [player]);


  useEffect(() => {
    if (youtubeLink) {
      if (youtubeLink.includes("youtube.com")) {
        const videoIdArray = youtubeLink.split("=");
        setVideoId(videoIdArray[1].split("&")[0]);
      } else if (youtubeLink.includes("youtu.be")) {

        console.log(youtubeLink);
        // youtu.be 형식의 URL 처리
        const videoIdArray = youtubeLink.split("/")[3].split("?")[0];
        setVideoId(videoIdArray);
      } else {
        toast.error("유튜브 영상 링크가 올바르지 않습니다.");
      }
    }
  }, [youtubeLink]);

  // 댓글 추가
  const handleAddComment = async () => {

    const userId = localStorage.getItem("userId");
    const res = await addComment(comment, id as string, userId as string); 
    if (res.success) {
      toast.success("댓글 추가 완료");
      const res = await getComments(id as string);
      setComments(res);
      setComment("");
    } else {
      toast.error("댓글 추가 실패");
    }
    
  };

  useEffect(() => {
    getComments(id as string).then((res) => {
      setComments(res);
    });
  }, [id]);



  const handleLikePost = async () => {
    const userId = localStorage.getItem("userId");

    await likePost(id as string, userId as string);
    getLike(id as string).then((res) => {
      const like = res.length;
      setLike(like);
    });
    setIsLiked(true);
  };

  useEffect(() => {
    getLike(id as string).then((res) => {
      const userId = localStorage.getItem("userId");
      const like = res.length;
      setLike(like);
      setIsLiked(res.some((like: any) => like.user_id === userId));
    });
  }, [id]);

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment(commentId);
    if (res.success) {
      const res = await getComments(id as string);
      toast.success("댓글 삭제 완료");
      setComments(res);
    }
  };

  const handleEditPost = () => {
    navigate(`/edit/${id}`);

  };

  const handleDeletePost = () => {
    toast.info(
      <div style={{display: "flex", alignItems: "center"}}>
        게시글을 삭제하시겠습니까?
        <S.ToastButton onClick={async () => {
          try {
            const res = await deletePost(id as string);
            if (res.success) {
              toast.success("게시글이 삭제되었습니다.");
              navigate("/list");
            } else {
              toast.error("게시글 삭제에 실패했습니다.");
            }
          } catch (error) {
            toast.error("게시글 삭제 중 오류가 발생했습니다.");
          }
        }}>
          삭제
        </S.ToastButton>
      </div>,
      {
        closeOnClick: true,
      }
    );
  };

  return (
    <S.MainContainer onKeyDown={(e) => e.stopPropagation()} tabIndex={-1}>

<S.LeftContainer>
      <S.VideoContainer tabIndex={0} onFocus={(e) => e.currentTarget.blur()}>
        {youtubeLink && (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "1px solid white",
          }}
        />
        )}
      </S.VideoContainer>

        <S.VideoInfoContainer>
            <S.TitleContainer>
                <div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%"}}>{videoInfo.title}</div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <FaHeart onClick={handleLikePost} color={isLiked ? "red" : "white"}/>
                    <div style={{marginLeft: "5px"}}>{like}</div>
                    {userId === localStorage.getItem("userId") && <FaTrash style={{cursor: "pointer", marginLeft: "10px", color: "white" , width: "15px", height: "15px"}} onClick={() => handleDeletePost(id as string)} />}
                    <div style={{marginLeft: "10px"}}>
                    <FaEdit style={{cursor: "pointer", color: "white" , width: "15px", height: "15px"}} onClick={() => handleEditPost()} />
                  </div>
                </div>
            </S.TitleContainer>

         
         {window.innerWidth > 768 && (
         <S.UserCommentContainer>
            <div style={{display: "flex", justifyContent: "space-between"}}>
            <S.CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
            <S.CommentAddButton onClick={handleAddComment}>댓글 추가</S.CommentAddButton>
            </div>
            {comments.map((comment) => (
              <S.UserCommentTextContainer key={comment.id}>
                <S.UserCommentUsername>{comment.user.username}</S.UserCommentUsername>
               <div style={{display: "flex", alignItems: "center"}}>
                <S.UserCommentText>{comment.comment}           </S.UserCommentText>
                {comment.user_id === userId && <FaTrash style={{cursor: "pointer", marginLeft: "10px", color: "white" , width: "15px", height: "15px"}} onClick={() => handleDeleteComment(comment.id)} />} 
               </div>
            
              </S.UserCommentTextContainer>
            ))}
         </S.UserCommentContainer>
         )}

        </S.VideoInfoContainer>
      </S.LeftContainer>

      <S.AllCommentsContainer ref={commentsContainerRef}>
        {subtitles.map((subtitle, index) => {
          const isActive =
            currentTime.current >= subtitle.startTime &&
            currentTime.current <= subtitle.endTime;
          const speakerData = speakers.find((s) => s.name === subtitle.speaker);

          return (
            <S.CommentContainer
              key={index}
              $active={isActive}
              ref={isActive ? activeCommentRef : null}
            >
              <S.CommentTextContainer>
                {speakerData && (
                  <S.SpeakerInfo>
                    <S.SpeakerImage
                      src={`${SERVER_URL}/posts/get-file?file_path=${speakerData.img_file_path}`}
                      alt={speakerData.name}
                    />
                    <S.SpeakerName style={{ color: speakerData.color }}>
                      {speakerData.name}
                    </S.SpeakerName>
                  </S.SpeakerInfo>
                )}
                <S.CommentText>{subtitle.text}</S.CommentText>
              </S.CommentTextContainer>
            </S.CommentContainer>
          );
        })}
      </S.AllCommentsContainer>

      
    <ToastContainer />
    {window.innerWidth < 768 && (
              <S.UserCommentContainer>
              <div style={{display: "flex", justifyContent: "space-between"}}>
              <S.CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
              <S.CommentAddButton onClick={handleAddComment}>댓글 추가</S.CommentAddButton>
              </div>
              {comments.map((comment) => (
                   <S.UserCommentTextContainer key={comment.id}>
                   <S.UserCommentUsername>{comment.user.username}</S.UserCommentUsername>
                  <div style={{display: "flex", alignItems: "center"}}>
                   <S.UserCommentText>{comment.comment}           </S.UserCommentText>
                   {comment.user_id === userId && <FaTrash style={{cursor: "pointer", marginLeft: "10px", color: "white" , width: "15px", height: "15px"}} onClick={() => handleDeleteComment(comment.id)} />} 
                  </div>
                 </S.UserCommentTextContainer>
              ))}
           </S.UserCommentContainer>
      )}
    </S.MainContainer>
  )
}
