import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqGetGroupDetail = {
  id: number;
};

type LinkedLink = {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  thumbnail: string;
  tags: string[];
  user: User;
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
};

type BookmarkedUser = {
  groupId: number;
  userId: number;
  user: User;
  isBookmarked: boolean;
};

export type ResGetGroupDetail = {
  id: number;
  title: string;
  description: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  linkedLinks: LinkedLink[];
  bookmarkedUsers: BookmarkedUser[];
  isBookmarked: boolean;
};

export const getGroupDetail = async (req: ReqGetGroupDetail) => {
  const result = await apiInstance.get<ResGetGroupDetail>(`/group/${req.id}`);
  return result.data;
};
