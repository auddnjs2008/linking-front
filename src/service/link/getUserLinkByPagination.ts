import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqGetUserLinkByPagination = {
  userId: number;
  query: {
    take: number;
    order: "ASC" | "DESC";
    id: number;
    keyword: string;
    startDate?: string;
    endDate?: string;
    isBookmarked?: boolean;
    hasThumbnail?: boolean;
  };
};

type ResGetuserLinkByPagination = {
  data: {
    id: number;
    title: string;
    linkUrl: string;
    thumbnail: string;
    description: string;
    creatorId: number;
    createdAt: string;
    updatedAt: string;
    isBookmarked: boolean;
    author: User;
    tags: string[];
  }[];
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
    order: "ASC" | "DESC";
    take: number;
    currentCursor: number;
  };
};

export const getUserLinkByPagination = async (
  req: ReqGetUserLinkByPagination
) => {
  const result = await apiInstance.get<ResGetuserLinkByPagination>(
    `/link/user/${req.userId}/cursor-pagination`,
    {
      params: req.query,
    }
  );

  return result.data;
};
