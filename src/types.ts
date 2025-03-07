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
}

export interface Comment {
  comment: string;
  username: string;
}

export interface PreviewProps {
  youtubeLink: string;
  srtFile: File;
  characterImages: { image: File; name: string }[];
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
  id? : string;
  post_id: string;
  title: string;
  File: File;
  userId: string;
  youtube_url: string;
  text: string;
}

export interface AutoSave {
  id: string;
  post_id: string;
  created_at: string;
}
