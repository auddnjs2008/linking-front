import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqUpdateLinkComment = {
  commentId: number;
  body: {
    comment: string;
    parentCommentId?: number;
  };
};

type ResUpdateLinkComment = {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  replies: {
    id: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    parentComment: {
      id: number;
      comment: string;
      createdAt: string;
      updatedAt: string;
      user: User;
    };
    parentCommentId: number;
  }[];
  parentComment: {
    id: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: User;
  } | null;
  parentCommentId: number | null;
};

export const updateLinkComment = async (
  req: ReqUpdateLinkComment
): Promise<ResUpdateLinkComment> => {
  const result = await apiInstance.patch<ResUpdateLinkComment>(
    `/linkComment/${req.commentId}`,
    req.body
  );
  return result.data;
};
