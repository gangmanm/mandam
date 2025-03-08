import { Variant } from "motion/react";
import * as React from "react";

export type AnimatedTextProps = {
  text: string | string[];
  el?: keyof React.JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

export interface CommentaryItem {
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
  user_id?: string;
  id?: string;
  user?: {
    username: string;
  };
  created_at: string;
  comment: string;
}

export interface Character {
  id?: string;
  img?: File;
  name: string;
  isDelete?: boolean;
  img_file_path?: string;
  postId?: string | number;
}

export interface Comment {
  comment: string;
  created_at: string;
  id: string;
  user: {
    username: string;
  }
  user_id: string;
}

export interface VideoState {
  id: string;
  link: string;
  start: number;
  info: {
    title: string;
    text: string;
    username: string;
    created_at: string;
  };
}

export interface CommentState {
  text: string;
  list: Comment[];
  isVisible: boolean;
}

export interface LikeState {
  count: number;
  isLiked: boolean;
}

export interface Post {
  id? : string | undefined;
  title: string;
  File: File;
  userId: string;
  text: string;
  content?: string;
  characters?: Character[];
  youtubeUrl?: string;
}

export interface AutoSave {
  id?: string;
  postId?: string | number;
  created_at?: string;
  fileName: string;
  userId: string;
  File: File;
}

export interface Speaker {
  name: string;
  color: string;
  image: string;
}

export interface PreviewProps {
  youtubeUrl: string | null;
  srtFile: File;
  characters?: {
    img_file_path?: string | null;
    name: string;
    id: string;
    postId: string | number;
    img?: File | null;
  }[];
  edit?: boolean;
}


export interface Subtitle {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  speaker?: string;
}

export interface DragState {
  isDragging: boolean;
  subtitleId: number | null;
  handle: "left" | "right" | null;
  initialX: number;
  initialTime: number;
}

export interface SubtitleDragState {
  isDragging: boolean;
  subtitleId: number | null;
  startX: number;
  originalStartTime: number;
  originalEndTime: number;
}

export interface MarkerDragState {
  isDragging: boolean;
  subtitleId: number | null;
  startX: number;
  originalStartTime: number;
  originalEndTime: number;
}
