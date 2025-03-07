import { CommentaryItem } from "../types";
import { srtTimeToSeconds } from "../utils/srtUtils";


export const useParseSrt = (srtContent: string): CommentaryItem[] => {
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
        const cleanText = speakerMatch
          ? text.replace(/^\[(.*?)\]\s*/, "")
          : text;

        return {
          startTime,
          endTime,
          text: cleanText,
          speaker: currentSpeaker,
        } as CommentaryItem;
      })
      .filter((item): item is CommentaryItem => item !== null); // null 값 필터링
  };