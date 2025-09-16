import type { Link } from "./link";
import type { User } from "./user";

export type ParentComment = {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  user: User; // 작성자 정보
  link: Link; // 링크 정보
  parentComment: null; // 원댓글이므로 null
  parentCommentId: null; // 원댓글이므로 null
  replies: Reply[];
};

export type Reply = {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  user: User; // 재댓글 작성자 정보
  link: Link; // 링크 정보
  parentComment: { id: number; comment: string }; // 부모 댓글 (원댓글)
  parentCommentId: number; // 부모 댓글 ID
  replies: [];
};
