import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqCreateLinkComment = {
  linkId: number;
  body: {
    comment: string;
    parentCommentId?: number;
  };
};

type ResCreateLinkComment = {
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

export const createLinkComment = async (
  req: ReqCreateLinkComment
): Promise<ResCreateLinkComment> => {
  const result = await apiInstance.post<ResCreateLinkComment>(
    `/linkComment/link/${req.linkId}`,
    req.body
  );
  return result.data;
};
