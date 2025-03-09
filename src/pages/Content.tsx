import { useState, useEffect, useRef } from "react";
import * as S from "../styles/pages/content";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import {
  getPost,
  getFile,
  getComments,
  likePost,
  getLike,
  deletePost,
  updateView,
  getView,
} from "../api/post";
import { addComment } from "../api/post";
import { FaEdit, FaEye, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { deleteComment } from "../api/post";
import { FaTrash } from "react-icons/fa";
import { CommentaryItem } from "../types";
import { useParseSrt } from "../hooks/useParseSrt";
import UserCommentSection from "../components/UserCommentSection";
import { VideoState, CommentState, LikeState } from "../types";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
export default function Content() {
  const { id } = useParams();
  const currentTime = useRef<number>(0);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const activeCommentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // 비디오 관련 상태 통합
  const [videoState, setVideoState] = useState<VideoState>({
    id: "",
    link: "",
    start: 0,
    info: {
      title: "",
      text: "",
      username: "",
      created_at: "",
    }
  });

  // 자막 관련 상태
  const [subtitles, setSubtitles] = useState<CommentaryItem[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<CommentaryItem | null>(null);
  const [srtFile, setSrtFile] = useState<File | null>(null);
  
  // 플레이어 상태
  const [player, setPlayer] = useState<any>(null);
  
  // 캐릭터 상태
  const [characters, setCharacters] = useState<{ img_file_path: string; name: string }[]>([]);
  
  // 댓글 관련 상태 통합
  const [commentState, setCommentState] = useState<CommentState>({
    text: "",
    list: [],
    isVisible: false
  });

  // 좋아요 관련 상태 통합
  const [likeState, setLikeState] = useState<LikeState>({
    count: 0,
    isLiked: false
  });

  //조회수 관련 상태
  const [viewState, setViewState] = useState<number>(0);

  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(true);

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
      start: videoState.start,
    },
  };

  useEffect(() => {
    getPost(id as string).then((res) => {
      setVideoState({
        id: res.youtube_url.split("=")[1].split("&")[0],
        link: res.youtube_url,
        start: 0,
        info: {
          title: res.title,
          text: res.text,
          username: res.username,
          created_at: res.created_at,
        }
      });
      getFile(res.file_path).then((res) => {
        setSrtFile(res);
      });
      setCharacters(res.characters);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    });
  }, [id]);


  useEffect(() => {
    const fetchSRT = async () => {
      if (!srtFile) {
        return;
      }
      try {
        const srtContent = await srtFile.text();
        const parsedSubtitles = useParseSrt(srtContent);
        setSubtitles(parsedSubtitles);

        if (parsedSubtitles.length > 0) {
          setVideoState({
            ...videoState,
            start: parsedSubtitles[0].startTime
          });
        }
      } catch (error) {
        console.error("Failed to fetch SRT:", error);
      }
    };

    fetchSRT();
  }, [srtFile, videoState.start]);

  useEffect(() => {
    if (!player || !subtitles.length) return;

    const intervalId = setInterval(() => {
      const currentVideoTime = player.getCurrentTime();
      currentTime.current = currentVideoTime;

      const currentSub = subtitles.find(
        (sub) =>
          currentVideoTime >= sub.startTime && currentVideoTime <= sub.endTime
      );

      if (JSON.stringify(currentSub) !== JSON.stringify(currentSubtitle)) {
        setCurrentSubtitle(currentSub || null);

        if (activeCommentRef.current && commentsContainerRef.current) {
          activeCommentRef.current.style.scrollMarginBottom = "200px";
          activeCommentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 100); 

    return () => clearInterval(intervalId);
  }, [player, subtitles, currentSubtitle]);


  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    if (subtitles.length > 0) {
      event.target.seekTo(subtitles[0].startTime);
    }
    event.target.playVideo();
  };

  useEffect(() => {
    if (subtitles.length > 0) {
      setVideoState({
        ...videoState,
        start: subtitles[0].startTime
      });
    }
  }, [subtitles, videoState.start]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!player) return;

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
    if (videoState.link) {
      if (videoState.link.includes("youtube.com")) {
        const videoIdArray = videoState.link.split("=");
        setVideoState({
          ...videoState,
          id: videoIdArray[1].split("&")[0]
        });
      } else if (videoState.link.includes("youtu.be")) {
        const videoIdArray = videoState.link.split("/")[3].split("?")[0];
        setVideoState({
          ...videoState,
          id: videoIdArray
        });
      } else {
        toast.error("유튜브 영상 링크가 올바르지 않습니다.");
      }
    }
  }, [videoState.link]);

  const handleAddComment = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error(
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>댓글을 작성하려면 로그인을 진행해주세요</span>
          <button
            onClick={() => navigate("/signin")}
            style={{
              padding: "5px 10px",
              backgroundColor: "rgb(182, 18, 18)",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            로그인
          </button>
        </div>,
        { autoClose: false }
      );
      return;
    }

    const res = await addComment(commentState.text, id as string, userId as string);
    if (res.success) {
      toast.success("댓글 추가 완료");
      const updatedComments = await getComments(id as string);
      setCommentState({
        ...commentState,
        list: updatedComments,
        text: ""
      });
    } else {
      toast.error("댓글 추가 실패");
    }
  };

  useEffect(() => {
    getComments(id as string).then((res) => {
      setCommentState({
        ...commentState,
        list: res
      });
    });
  }, [id]);

  const handleLikePost = async () => {
    const userId = localStorage.getItem("userId");
    await likePost(id as string, userId as string);
    getLike(id as string).then((res) => {
      const like = res.length;
      setLikeState({
        ...likeState,
        count: like
      });
    });
    setLikeState({
      ...likeState,
      isLiked: true
    });
  };

  useEffect(() => {
    getLike(id as string).then((res) => {
      const userId = localStorage.getItem("userId");
      const like = res.length;
      setLikeState({
        ...likeState,
        count: like
      });
      setLikeState({
        ...likeState,
        isLiked: res.some((like: any) => like.user_id === userId)
      });
    });
  }, [id]);

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment(commentId);
    if (res.success) {
      const res = await getComments(id as string);
      toast.success("댓글 삭제 완료");
      setCommentState({
        ...commentState,
        list: res
      });
    }
  };

  const handleEditPost = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const fetchViewCount = async () => {
      if (!id) return;

      await updateView(id as string);

      // 조회수 표시 업데이트
      const viewResponse = await getView(id);
      setViewState(viewResponse.views);
    };

    fetchViewCount();
  }, []); // 의존성 배열을 비워두어 컴포넌트 마운트 시 한 번만 실행

  const handleDeletePost = (id: string) => {
    toast.info(
      <div style={{ display: "flex", alignItems: "center" }}>
        게시글을 삭제하시겠습니까?
        <S.ToastButton
          onClick={async () => {
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
          }}
        >
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
      <S.NavBarContainer>
        <NavBar />
      </S.NavBarContainer>
      {isLoading ? (
        <Loading />
      ) : (
          <S.ContentContainer>
          <S.LeftContainer>
            <S.VideoContainer
              tabIndex={0}
              onFocus={(e) => e.currentTarget.blur()}
            >
              {videoState.link && (
                <YouTube
                  videoId={videoState.id}
                  opts={opts}
                  onReady={onPlayerReady}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </S.VideoContainer>

            <S.VideoInfoContainer>
              <S.TitleContainer>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
                  }}
                >
                  {videoState.info.title}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {window.innerWidth < 768 && (
                    <div
                      style={{ marginRight: "10px" }}
                      onClick={() => setCommentState({
                        ...commentState,
                        isVisible: !commentState.isVisible
                      })}
                    >
                      댓글 {commentState.isVisible ? "닫기" : "보기"}
                    </div>
                  )}
               
                  {userId && userId === localStorage.getItem("userId") && (
                    <FaTrash
                      style={{
                        cursor: "pointer",
                        marginLeft: "10px",
                        color: "white",
                        width: "15px",
                        height: "15px",
                      }}
                      onClick={() => handleDeletePost(id as string)}
                    />
                  )}
                  <div style={{ marginLeft: "10px" }}>
                    {userId && userId === localStorage.getItem("userId") && (
                      <FaEdit
                        style={{
                          cursor: "pointer",
                          color: "white",
                          width: "15px",
                          height: "15px",
                        }}
                        onClick={() => handleEditPost()}
                      />
                    )}
                  </div>
                  <FaHeart
                    onClick={handleLikePost}
                    color={likeState.isLiked ? "red" : "white"}
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                  <div style={{ marginLeft: "5px" }}>{likeState.count}</div>
                  <FaEye
                    style={{
                      marginLeft: "10px",
                      color: "white",
                    }}
                  />
                  <div style={{ marginLeft: "10px", fontSize: "12px" }}>
                    {viewState}
                  </div>
                </div>
              </S.TitleContainer>

              {window.innerWidth > 768 && (
                <UserCommentSection comments={commentState.list} userId={userId as string} handleDeleteComment={handleDeleteComment} comment={commentState.text} setComment={(text) => setCommentState({
                  ...commentState,
                  text
                })} handleAddComment={handleAddComment} />
              )}
            </S.VideoInfoContainer>
          </S.LeftContainer>
  
          <S.AllCommentsContainer ref={commentsContainerRef}>
            {subtitles.map((subtitle, index) => {
              const isActive =
                currentTime.current >= subtitle.startTime &&
                currentTime.current <= subtitle.endTime;
              const characterData = characters.find(
                (c) => c.name === subtitle.speaker
              );

              return (
                <S.CommentContainer
                  key={index}
                  $active={isActive}
                  ref={isActive ? activeCommentRef : null}
                >
                  <S.CommentTextContainer>
                    {characterData && (
                      <S.SpeakerInfo>
                        <S.SpeakerImage
                          src={`${SERVER_URL}/posts/get-file?file_path=${characterData.img_file_path}`}
                          alt={characterData.name}
                        />
                        <S.SpeakerName>
                          {characterData.name}
                        </S.SpeakerName>
                      </S.SpeakerInfo>
                    )}
                    <S.CommentText>{subtitle.text}</S.CommentText>
                  </S.CommentTextContainer>
                </S.CommentContainer>
              );
            })}
          </S.AllCommentsContainer>
          {window.innerWidth < 768 && commentState.isVisible && (
            <UserCommentSection comments={commentState.list} userId={userId as string} handleDeleteComment={handleDeleteComment} comment={commentState.text} setComment={(text) => setCommentState({
              ...commentState,
              text
            })} handleAddComment={handleAddComment} />
          )}
        </S.ContentContainer>
      )}

    </S.MainContainer>
  );
}
