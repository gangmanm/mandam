"use client";

import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/pages/preview";
import { useSearchParams } from "next/navigation";
import YouTube from "react-youtube";
import { ToastContainer, toast } from "react-toastify";

interface Speaker {
  name: string;
  color: string;
  image: string;
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
  characterImages?: { image: File; name: string }[];
  characters?: { img_file_path: string | null; name: string , id : string , post_id : string}[];
  edit?: boolean;
}

export default function Preview({ youtubeLink, srtFile, characterImages , characters , edit}: PreviewProps) {
     const currentTime = useRef<number>(0);

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
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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

    console.log(characterImages);
    if(edit && characters){
      const speakers = characters.map((character) => ({
        name: character.name,
        color: getRandomColor(),
        image: `${SERVER_URL}/posts/get-file?file_path=${character.img_file_path}`,
      }));
      setSpeakers(speakers);
    }else if(characterImages){
      const speakers = characterImages.map((character) => ({
        name: character.name,
        color: getRandomColor(),
        image: URL.createObjectURL(character.image),
      }));
      setSpeakers(speakers);
    }
  }, [srtFile, characterImages]);

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
    event.target.playVideo();
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
        currentTime.current = player.getCurrentTime();
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
      start: videoStart || 0,
    },
  };


  useEffect(() => {
    if (youtubeLink) {
      if (youtubeLink.includes("youtube.com")) {
        const videoIdArray = youtubeLink.split("=");

        if (youtubeLink.includes("t=")) {
          const videoStartArray = youtubeLink.split("t=");
          const videoStart = videoStartArray[1].split("s")[0];
          setVideoStart(Number(videoStart));
        }
        setVideoId(videoIdArray[1].split("&")[0]);
      } else {
        toast.error("유튜브 영상 링크가 올바르지 않습니다.");
      }
    }
  }, [youtubeLink]);


  return (
    <S.MainContainer onKeyDown={(e) => e.stopPropagation()} tabIndex={-1}>

      <S.VideoContainer tabIndex={0} onFocus={(e) => e.currentTarget.blur()}>
        {youtubeLink && (
          <YouTube
            key={videoId}
            videoId={videoId}
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
                      src={speakerData.image}
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
    </S.MainContainer>
  );
}
