"use client";

import React, { useState, useEffect, useRef } from "react";
import * as S from "../styles/pages/preview";
import YouTube from "react-youtube";
import { ToastContainer, toast } from "react-toastify";
import { CommentaryItem } from "../types";
import { useParseSrt } from "../hooks/useParseSrt";

interface Speaker {
  name: string;
  color: string;
  image: string;
}

interface PreviewProps {
  youtubeLink: string;
  srtFile: File;
  characters?: {
    img_file_path?: string | null;
    name: string;
    id: string;
    post_id: string;
    img?: File;
  }[];
  edit?: boolean;
}

export default function Preview({
  youtubeLink,
  srtFile,
  characters,
  edit,
}: PreviewProps) {
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

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // speakers 데이터 로드
  useEffect(() => {
    if (characters && characters.length > 0) {  // characters가 존재하고 비어있지 않은지 확인
      const speakers = characters.map((character) => {


        if (character.img_file_path && !character.img) {
          return {
            name: character.name,
            color: getRandomColor(),
            image: `${SERVER_URL}/posts/get-file?file_path=${character.img_file_path}`,
          };
        } else if (character.img) {  // character.img가 있는 경우 추가
          return {
            name: character.name,
            color: getRandomColor(),
            image: URL.createObjectURL(character.img),
          };
        } else {
          // 이미지가 없는 경우의 기본값 처리
          return {
            name: character.name,
            color: getRandomColor(),
            image: '', // 또는 기본 이미지 URL
          };
        }
      });
      setSpeakers(speakers);
    }
  }, [characters]); // srtFile 제거하고 edit 추가

  // SRT 파일 로드
  useEffect(() => {
    const fetchSRT = async () => {
      if (!srtFile) {
        return;
      }

      try {
        const srtContent = await srtFile.text();
        const parsedSubtitles = useParseSrt(srtContent);
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
        (sub) =>
          currentVideoTime >= sub.startTime && currentVideoTime <= sub.endTime
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
