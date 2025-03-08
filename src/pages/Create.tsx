import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import * as S from "../styles/pages/create";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import "react-range-slider-input/dist/style.css";
import React from "react";
import styled from "styled-components";
import { autoSavePost, getAutoSave, getFile } from "../api/post";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/NavBar";
import { useMediaQuery } from "react-responsive";
import { srtTimeToSeconds } from "../utils/srtUtils";

interface Subtitle {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

interface DragState {
  isDragging: boolean;
  subtitleId: number | null;
  handle: "left" | "right" | null;
  initialX: number;
  initialTime: number;
}

interface SubtitleDragState {
  isDragging: boolean;
  subtitleId: number | null;
  startX: number;
  originalStartTime: number;
  originalEndTime: number;
}

interface MarkerDragState {
  isDragging: boolean;
  subtitleId: number | null;
  startX: number;
  originalStartTime: number;
  originalEndTime: number;
}

export default function Create() {
  const location = useLocation();
  const navigate = useNavigate();
  const [videoId, setVideoId] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [range, setRange] = useState([0, 100]);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [isAddingSubtitle, setIsAddingSubtitle] = useState(false);
  const [newSubtitleText, setNewSubtitleText] = useState("");
  const [editingSubtitle, setEditingSubtitle] = useState<Subtitle | null>(null);
  const [subtitleRange, setSubtitleRange] = useState<[number, number]>([0, 0]);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    subtitleId: null,
    handle: null,
    initialX: 0,
    initialTime: 0,
  });
  const timelineRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [subtitleDragState, setSubtitleDragState] = useState<SubtitleDragState>(
    {
      isDragging: false,
      subtitleId: null,
      startX: 0,
      originalStartTime: 0,
      originalEndTime: 0,
    }
  );
  const [markerDragState, setMarkerDragState] = useState<MarkerDragState>({
    isDragging: false,
    subtitleId: null,
    startX: 0,
    originalStartTime: 0,
    originalEndTime: 0,
  });
  const intervalRef = useRef<number | null>(null);
  const [srtFile, setSrtFile] = useState<File | null>(null);
  const [characterImages, setCharacterImages] = useState<
    { image: File; name: string }[]
  >([]);
  const [characters, setCharacters] = useState<
    {
      img_file_path: string | null;
      name: string;
      id: string;
      post_id: string;
    }[]
  >([]);
  const [edit, setEdit] = useState(false);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const activeCommentRef = useRef<HTMLDivElement>(null);
  const subtitleListRef = useRef<HTMLDivElement>(null);
  const currentSubtitleRef = useRef<HTMLDivElement>(null);
  const [projectName, setProjectName] = useState("");
  const [autoSaveFiles, setAutoSaveFiles] = useState<
    { file_name: string; file_path: string; created_at: string }[]
  >([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const dropdownOptions = autoSaveFiles.map((file) => ({
    value: file.file_path,
    label: `${file.file_name} (${new Date(file.created_at).toLocaleString()})`,
  }));

  useEffect(() => {
    if (location.state?.youtubeUrl) {
      setYoutubeUrl(location.state.youtubeUrl);
    }
  }, [location]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const formatSrtTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")},${milliseconds
      .toString()
      .padStart(3, "0")}`;
  };

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
      start: range[0],
    },
  };

  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);
    setRange([0, videoDuration]);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(() => {
        if (player) {
          const newTime = player.getCurrentTime();
          if (Math.abs(newTime - currentTime) > 0.1) {
            setCurrentTime(newTime);
          }
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleAddSubtitleClick = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      const newSubtitle: Subtitle = {
        id: Date.now(),
        startTime: currentTime,
        endTime: Math.min(currentTime + 0.5, duration),
        text: "",
      };
      setSubtitles((prev) =>
        [...prev, newSubtitle].sort((a, b) => a.startTime - b.startTime)
      );
    }
  };

  const handleSubtitleClick = (subtitle: Subtitle) => {
    if (player) {
      player.seekTo(subtitle.startTime);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    subtitleId: number,
    handle: "left" | "right"
  ) => {
    e.stopPropagation();
    const subtitle = subtitles.find((s) => s.id === subtitleId);
    if (!subtitle) return;

    setDragState({
      isDragging: true,
      subtitleId,
      handle,
      initialX: e.clientX,
      initialTime: handle === "left" ? subtitle.startTime : subtitle.endTime,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.isDragging || !timelineRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineWidth = timelineRect.width;
    const pixelOffset = e.clientX - dragState.initialX;
    const timeOffset = (pixelOffset / timelineWidth) * duration;

    setSubtitles((prev) =>
      prev.map((subtitle) => {
        if (subtitle.id === dragState.subtitleId) {
          if (dragState.handle === "left") {
            const newStartTime = Math.max(
              0,
              Math.min(subtitle.endTime - 1, dragState.initialTime + timeOffset)
            );
            return { ...subtitle, startTime: newStartTime };
          } else {
            const newEndTime = Math.min(
              duration,
              Math.max(
                subtitle.startTime + 1,
                dragState.initialTime + timeOffset
              )
            );
            return { ...subtitle, endTime: newEndTime };
          }
        }
        return subtitle;
      })
    );
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      subtitleId: null,
      handle: null,
      initialX: 0,
      initialTime: 0,
    });
  };

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragState.isDragging]);

  useEffect(() => {
    if (youtubeUrl) {
      if (youtubeUrl.includes("youtube.com")) {
        const videoIdArray = youtubeUrl.split("=");
        setVideoId(videoIdArray[1].split("&")[0]);
      } else if (youtubeUrl.includes("youtu.be")) {
        console.log(youtubeUrl);
        // youtu.be 형식의 URL 처리
        const videoIdArray = youtubeUrl.split("/")[3].split("?")[0];
        setVideoId(videoIdArray);
      } else {
        toast.error("유튜브 영상 링크가 올바르지 않습니다.");
      }
    }
  }, [youtubeUrl]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      // 줌 기능
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      const newZoom = Math.min(Math.max(zoom + delta, 1), 400);
      setZoom(newZoom);
    } else {
      // 일반 스크롤 - 타임라인 이동
      e.preventDefault();
      if (timelineRef.current) {
        const newScrollLeft =
          timelineRef.current.scrollLeft + e.deltaX + e.deltaY;
        timelineRef.current.scrollLeft = newScrollLeft;
        setScrollLeft(newScrollLeft);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleTimelineMouseDown = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).classList.contains("left-handle") ||
      (e.target as HTMLElement).classList.contains("right-handle") ||
      (e.target as HTMLElement).classList.contains("subtitle-marker")
    ) {
      return;
    }

    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      if (player) {
        player.seekTo(newTime);
        setCurrentTime(newTime);
      }
    }

    setIsDraggingTimeline(true);
    setDragStartX(e.clientX);
    setInitialTime(currentTime);
  };

  const handleTimelineMouseMove = (e: MouseEvent) => {
    if (!isDraggingTimeline || !timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = Math.max(
      0,
      Math.min(duration, (offsetX / rect.width) * duration)
    );

    if (player) {
      player.seekTo(newTime);
      setCurrentTime(newTime);
    }
  };

  const handleTimelineMouseUp = () => {
    setIsDraggingTimeline(false);
  };

  useEffect(() => {
    if (isDraggingTimeline) {
      window.addEventListener("mousemove", handleTimelineMouseMove);
      window.addEventListener("mouseup", handleTimelineMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleTimelineMouseMove);
      window.removeEventListener("mouseup", handleTimelineMouseUp);
    };
  }, [isDraggingTimeline, dragStartX, initialTime, zoom]);

  const handleSubtitleItemMouseDown = (
    e: React.MouseEvent,
    subtitle: Subtitle
  ) => {
    e.preventDefault();
    setSubtitleDragState({
      isDragging: true,
      subtitleId: subtitle.id,
      startX: e.clientX,
      originalStartTime: subtitle.startTime,
      originalEndTime: subtitle.endTime,
    });
  };

  const autoSave = () => {
    // 현재 자막을 SRT 파일로 생성
    const srtFile = generateSrt();

    const autoSave = {
      fileName: projectName,
      userId: localStorage.getItem("userId"),
      File: srtFile, // 새로 생성된 SRT 파일 사용
    };

    // 자동 저장 요청 전송
    autoSavePost(autoSave);
    toast.success("자동 저장되었습니다.");
  };

  const handleSubtitleItemMouseMove = (e: MouseEvent) => {
    if (!subtitleDragState.isDragging || !timelineRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineWidth = timelineRect.width;
    const pixelOffset = e.clientX - subtitleDragState.startX;
    const timeOffset = (pixelOffset / timelineWidth) * duration;

    const duration =
      subtitleDragState.originalEndTime - subtitleDragState.originalStartTime;
    let newStartTime = Math.max(
      0,
      subtitleDragState.originalStartTime + timeOffset
    );
    let newEndTime = newStartTime + duration;

    if (newEndTime > player.getDuration()) {
      newEndTime = player.getDuration();
      newStartTime = newEndTime - duration;
    }

    setSubtitles((prev) =>
      prev.map((s) =>
        s.id === subtitleDragState.subtitleId
          ? { ...s, startTime: newStartTime, endTime: newEndTime }
          : s
      )
    );
  };

  const handleSubtitleItemMouseUp = () => {
    setSubtitleDragState({
      isDragging: false,
      subtitleId: null,
      startX: 0,
      originalStartTime: 0,
      originalEndTime: 0,
    });
  };

  useEffect(() => {
    if (subtitleDragState.isDragging) {
      window.addEventListener("mousemove", handleSubtitleItemMouseMove);
      window.addEventListener("mouseup", handleSubtitleItemMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleSubtitleItemMouseMove);
      window.removeEventListener("mouseup", handleSubtitleItemMouseUp);
    };
  }, [subtitleDragState.isDragging]);

  const handleMarkerMouseDown = (e: React.MouseEvent, subtitle: Subtitle) => {
    if (
      (e.target as HTMLElement).classList.contains("left-handle") ||
      (e.target as HTMLElement).classList.contains("right-handle")
    ) {
      return;
    }

    e.stopPropagation();
    setMarkerDragState({
      isDragging: true,
      subtitleId: subtitle.id,
      startX: e.clientX,
      originalStartTime: subtitle.startTime,
      originalEndTime: subtitle.endTime,
    });
  };

  const handleMarkerMouseMove = (e: MouseEvent) => {
    if (!markerDragState.isDragging || !timelineRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineWidth = timelineRect.width;
    const pixelOffset = e.clientX - markerDragState.startX;
    const timeOffset = (pixelOffset / timelineWidth) * duration * 2;

    const subtitleDuration =
      markerDragState.originalEndTime - markerDragState.originalStartTime;
    let newStartTime = Math.max(
      0,
      markerDragState.originalStartTime + timeOffset
    );
    let newEndTime = newStartTime + subtitleDuration;

    if (newEndTime > duration) {
      newEndTime = duration;
      newStartTime = newEndTime - subtitleDuration;
    }

    setSubtitles((prev) =>
      prev
        .map((s) =>
          s.id === markerDragState.subtitleId
            ? { ...s, startTime: newStartTime, endTime: newEndTime }
            : s
        )
        .sort((a, b) => a.startTime - b.startTime)
    );
  };

  const handleMarkerMouseUp = () => {
    setMarkerDragState({
      isDragging: false,
      subtitleId: null,
      startX: 0,
      originalStartTime: 0,
      originalEndTime: 0,
    });
  };

  useEffect(() => {
    if (markerDragState.isDragging) {
      window.addEventListener("mousemove", handleMarkerMouseMove);
      window.addEventListener("mouseup", handleMarkerMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMarkerMouseMove);
      window.removeEventListener("mouseup", handleMarkerMouseUp);
    };
  }, [markerDragState.isDragging]);

  const generateSrt = () => {
    const sortedSubtitles = [...subtitles].sort(
      (a, b) => a.startTime - b.startTime
    );
    let srtContent = "";

    sortedSubtitles.forEach((subtitle, index) => {
      srtContent += (index + 1).toString() + "\n";
      srtContent += `${formatSrtTime(subtitle.startTime)} --> ${formatSrtTime(
        subtitle.endTime
      )}\n`;
      srtContent += subtitle.text + "\n\n";
    });

    // File 객체 생성
    const blob = new Blob([srtContent], { type: "text/plain;charset=utf-8" });
    const file = new File([blob], "subtitles.srt", {
      type: "text/plain;charset=utf-8",
    });

    return file;
  };

  useEffect(() => {
    if (subtitles.length > 0) {
      const file = generateSrt();
      setSrtFile(file);
    } else {
      setSrtFile(null);
    }
  }, [subtitles]);

  const handleDownloadSrt = () => {
    if (srtFile) {
      const url = URL.createObjectURL(srtFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectName}.srt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (!player || !subtitles.length) return;

    const intervalId = setInterval(() => {
      const currentVideoTime = player.getCurrentTime();
      setCurrentTime(currentVideoTime);

      const currentSub = subtitles.find(
        (sub) =>
          currentVideoTime >= sub.startTime && currentVideoTime <= sub.endTime
      );

      if (JSON.stringify(currentSub) !== JSON.stringify(currentSubtitle)) {
        setCurrentSubtitle(currentSub || null);

        // 활성화된 자막으로 스크롤 (오른쪽 목록)
        if (activeCommentRef.current && commentsContainerRef.current) {
          activeCommentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        // 활성화된 자막 입력창으로 스크롤 (왼쪽 목록)
        if (currentSubtitleRef.current && subtitleListRef.current) {
          currentSubtitleRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [player, subtitles, currentSubtitle]);

  // SRT 파일 처리 함수
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const blocks = text.trim().split(/\n\s*\n/);
      const newSubtitles: Subtitle[] = [];

      blocks.forEach((block) => {
        const lines = block.trim().split("\n");
        if (lines.length >= 3) {
          // 시간 범위 파싱
          const timeRange = lines[1].split(" --> ");
          const startTime = srtTimeToSeconds(timeRange[0].trim());
          const endTime = srtTimeToSeconds(timeRange[1].trim());

          // 자막 텍스트 (여러 줄일 수 있음)
          const text = lines.slice(2).join("\n");

          newSubtitles.push({
            id: Date.now() + Math.random(),
            startTime,
            endTime,
            text,
          });
        }
      });

      if (newSubtitles.length > 0) {
        setSubtitles((prev) =>
          [...newSubtitles].sort((a, b) => a.startTime - b.startTime)
        );
        toast.success("SRT 파일을 성공적으로 불러왔습니다.");
      } else {
        toast.error("올바른 형식의 자막을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("SRT 파일 파싱 오류:", error);
      toast.error("SRT 파일을 불러오는데 실패했습니다.");
    }

    // 파일 입력 초기화
    e.target.value = "";
  };

  const pullAutoSave = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const autoSave = await getAutoSave(userId);
    setAutoSaveFiles(autoSave.data.reverse());

    if (autoSave.success) {
      console.log(autoSave);
    }
  };

  useEffect(() => {
    pullAutoSave();
  }, []);

  const handleLoadAutoSave = async (filePath: string) => {
    const selectedFile = autoSaveFiles.find(
      (file) => file.file_path === filePath
    );
    if (!selectedFile) return;

    setProjectName(selectedFile.file_name);
    setSubtitles([]);
    try {
      const response = await getFile(selectedFile.file_path);
      const text = await response.text();
      const blocks = text.trim().split(/\n\s*\n/);
      const newSubtitles: Subtitle[] = [];

      blocks.forEach((block) => {
        const lines = block.trim().split("\n");
        if (lines.length >= 3) {
          const timeRange = lines[1].split(" --> ");
          const startTime = srtTimeToSeconds(timeRange[0].trim());
          const endTime = srtTimeToSeconds(timeRange[1].trim());
          const text = lines.slice(2).join("\n");

          newSubtitles.push({
            id: Date.now() + Math.random(),
            startTime,
            endTime,
            text,
          });
        }
      });

      if (newSubtitles.length > 0) {
        // 이전 기록 삭제 후 새로운 자막 설정
        setSubtitles(newSubtitles.sort((a, b) => a.startTime - b.startTime));
        toast.success("자동 저장된 파일을 불러왔습니다.");
      }
    } catch (error) {
      console.error("파일 불러오기 오류:", error);
      toast.error("파일을 불러오는데 실패했습니다.");
    }
  };

  if (isMobile) {
    return (
      <S.MobileWarningContainer>
        <S.WarningBox>
          <S.WarningTitle>PC 환경 권장</S.WarningTitle>
          <S.WarningText>
            자막 만들기 기능은
            <br />
            PC 환경에 최적화되어 있습니다.
            <br />
            원활한 이용을 위해 PC로 접속해 주세요.
          </S.WarningText>
        </S.WarningBox>
      </S.MobileWarningContainer>
    );
  }

  return (
    <S.MainContainer>
      <NavBar />
      <S.ContentContainer>
        <S.LeftContainer>
          <S.YoutubeContainer>
            <S.Label>유튜브 영상 링크</S.Label>
            <S.Input
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="유튜브 영상 링크를 입력해주세요."
            />
          </S.YoutubeContainer>

          <S.AutoSaveContainer>
            <S.DropdownContainer>
              <S.StyledDropdown>
                <Dropdown
                  options={dropdownOptions}
                  onChange={(option: any) => handleLoadAutoSave(option.value)}
                  placeholder="저장된 파일 선택"
                  className="auto-save-dropdown"
                />
              </S.StyledDropdown>
            </S.DropdownContainer>
            <S.FileInputLabel htmlFor="srtFileInput">
              자막 파일 (SRT) 불러오기
              <input
                id="srtFileInput"
                type="file"
                accept=".srt"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </S.FileInputLabel>
            <S.Button onClick={handleDownloadSrt}>자막 파일 다운로드</S.Button>
          </S.AutoSaveContainer>
          <S.ProjectNameContainer>
            <S.ProjectNameInput
              placeholder="자막 파일 명"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <S.Button onClick={autoSave}>자막 파일 저장</S.Button>
          </S.ProjectNameContainer>

          <S.VideoContainer
            tabIndex={0}
            onFocus={(e) => e.currentTarget.blur()}
          >
            {youtubeUrl && (
              <YouTube
                key={videoId}
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

          <S.SliderContainer>
            <S.TimeDisplay>
              <span>
                현재 시각: {formatTime(currentTime)} / 전체 구간:{" "}
                {formatTime(range[0])} - {formatTime(range[1])}
              </span>
            </S.TimeDisplay>

            <S.ButtonGroup>
              <FaPlus
                style={{ cursor: "pointer", fontSize: "20px", color: "white" }}
                onClick={handleAddSubtitleClick}
              />
            </S.ButtonGroup>
            <S.TimelineWrapper onWheel={handleWheel} onScroll={handleScroll}>
              <S.TimelineContainer
                ref={timelineRef}
                style={{
                  width: `${100 * zoom}%`,
                  transform: `translateX(-${scrollLeft}px)`,
                }}
                onMouseDown={handleTimelineMouseDown}
              >
                <S.TimelineBackground />
                <S.TimeMarker
                  style={{
                    left: `${(currentTime / duration) * 100}%`,
                  }}
                />
                {subtitles.map((subtitle) => (
                  <S.SubtitleMarker
                    key={subtitle.id}
                    style={{
                      left: `${(subtitle.startTime / duration) * 100}%`,
                      width: `${
                        ((subtitle.endTime - subtitle.startTime) / duration) *
                        100
                      }%`,
                    }}
                    onMouseDown={(e) => handleMarkerMouseDown(e, subtitle)}
                    onClick={() => handleSubtitleClick(subtitle)}
                    isDragging={markerDragState.subtitleId === subtitle.id}
                  >
                    <S.SubtitleHandle
                      className="left-handle"
                      onMouseDown={(e) =>
                        handleMouseDown(e, subtitle.id, "left")
                      }
                    />
                    <S.SubtitleText>{subtitle.text}</S.SubtitleText>
                    <S.SubtitleHandle
                      className="right-handle"
                      onMouseDown={(e) =>
                        handleMouseDown(e, subtitle.id, "right")
                      }
                    />
                  </S.SubtitleMarker>
                ))}
              </S.TimelineContainer>
            </S.TimelineWrapper>

            <div style={{ color: "white" }}>
              <li>등장인물은 [등장인물 이름] 형식으로 자막 앞에 표기합니다</li>
              <li>Ctrl + 스크롤 을 통해 타임라인을 확대/축소 할 수 있습니다</li>
              <li>+ 클릭하여 자막을 추가할 수 있습니다</li>
            </div>
          </S.SliderContainer>
        </S.LeftContainer>

        {youtubeUrl && (
          <S.SubtitleList ref={subtitleListRef}>
            {subtitles.map((subtitle) => (
              <S.SubtitleItem
                key={subtitle.id}
                isActive={
                  currentTime >= subtitle.startTime &&
                  currentTime <= subtitle.endTime
                }
                ref={
                  currentTime >= subtitle.startTime &&
                  currentTime <= subtitle.endTime
                    ? currentSubtitleRef
                    : null
                }
              >
                <S.SubtitleTimeSpan>
                  {formatTime(subtitle.startTime)} -{" "}
                  {formatTime(subtitle.endTime)}
                </S.SubtitleTimeSpan>
                <S.SubtitleInput
                  value={subtitle.text}
                  onChange={(e) => {
                    setSubtitles((prev) =>
                      prev.map((s) =>
                        s.id === subtitle.id
                          ? { ...s, text: e.target.value }
                          : s
                      )
                    );
                  }}
                  placeholder="자막을 입력하세요"
                />
                <S.DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubtitles((prev) =>
                      prev.filter((s) => s.id !== subtitle.id)
                    );
                  }}
                >
                  삭제
                </S.DeleteButton>
              </S.SubtitleItem>
            ))}
          </S.SubtitleList>
        )}
      </S.ContentContainer>
    </S.MainContainer>
  );
}

export const TimeMarker = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: #ff0000;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: none;
  will-change: transform;
  transition: left 0.1s linear;

  &::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #ff0000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: rgb(0, 0, 0);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  text-wrap: nowrap;
  &:hover {
    background-color: rgb(74, 74, 74);
  }
`;
