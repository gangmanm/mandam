
import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/pages/content";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { getPost, getFile } from "../api/post";


interface Speaker {
  name: string;
  color: string;
  image: File;
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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [subtitles, setSubtitles] = useState<CommentaryItem[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<CommentaryItem | null>(
    null
  );
  const [player, setPlayer] = useState<any>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const activeCommentRef = useRef<HTMLDivElement>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [videoId, setVideoId] = useState<string>("");
  const [videoStart, setVideoStart] = useState<number>(0);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [characters, setCharacters] = useState<{ image_file_path: string; name: string }[]>([]);

  useEffect(() => {
    getPost(id as string).then((res) => {
        console.log(res);
      setYoutubeLink(res.youtube_url);
      getFile(res.file_path).then((res) => {
        setSrtFile(res);
      });
      setCharacters(res.characters);
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
        image: getFile(character.img_file_path),
      }));
      setSpeakers(speakers);
    }
  }, [srtFile, characters]);

  // SRT 파일 파싱
  const parseSRT = (srtContent: string): CommentaryItem[] => {
    if (!srtContent) return []; // 빈 문자열이나 undefined인 경우 빈 배열 반환

    const blocks = srtContent.trim().split("\n\n");
    let currentSpeaker: string | undefined;

    return blocks.map((block) => {
      if (!block)
        return {
          startTime: 0,
          endTime: 0,
          text: "",
          speaker: undefined,
        };

      const lines = block.split("\n");
      if (lines.length < 2)
        return {
          startTime: 0,
          endTime: 0,
          text: "",
          speaker: undefined,
        };

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
    });
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
      } catch (error) {
        console.error("Failed to fetch SRT:", error);
      }
    };

    fetchSRT();
  }, [srtFile]);

  // 현재 자막 업데이트
  useEffect(() => {
    if (subtitles.length > 0) {
      const currentSub = subtitles.find(
        (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime
      );

      if (JSON.stringify(currentSub) !== JSON.stringify(currentSubtitle)) {
        setCurrentSubtitle(currentSub || null);

        // 활성화된 자막으로 스크롤
        if (activeCommentRef.current && commentsContainerRef.current) {
          activeCommentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [currentTime, subtitles, currentSubtitle]);

  const onPlayerReady = (event: any) => {
    const player = event.target;
    setPlayer(player);
    player.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    const player = event.target;
    if (event.data === YouTube.PlayerState.PLAYING) {
      let animationFrameId: number;

      const updateTime = () => {
        setCurrentTime(player.getCurrentTime());
        animationFrameId = requestAnimationFrame(updateTime);
      };
      updateTime();

      // 컴포넌트가 언마운트되거나 동영상이 일시정지될 때 정리
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  };

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
    if (player) {
      const updateTime = () => {
        setCurrentTime(player.getCurrentTime());
        requestAnimationFrame(updateTime);
      };
      updateTime();
    }
  }, [player]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      controls: 1, // 컨트롤을 활성화하여 키보드 이벤트 충돌 방지
      disablekb: 1, // YouTube 기본 키보드 컨트롤 비활성화
      fs: 0,
      enablejsapi: 1, // JavaScript API 활성화
      start: 100,
    },
  };


  useEffect(() => {
    if (youtubeLink) {
      const videoIdArray = youtubeLink.split("=");
      setVideoId(videoIdArray[1].split("&")[0]);
      const videoStartArray = youtubeLink.split("t=");
      const videoStart = videoStartArray[1].split("s")[0];
      setVideoStart(Number(videoStart));
    }
  }, [youtubeLink]);


  return (
    <S.MainContainer onKeyDown={(e) => e.stopPropagation()} tabIndex={-1}>

      <S.VideoContainer tabIndex={0} onFocus={(e) => e.currentTarget.blur()}>
        {youtubeLink && (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
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

      <S.AllCommentsContainer ref={commentsContainerRef}>
        {subtitles.map((subtitle, index) => {
          const isActive =
            currentTime >= subtitle.startTime &&
            currentTime <= subtitle.endTime;
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
                      src={URL.createObjectURL(speakerData.image)}
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
    </S.MainContainer>
  );
}
