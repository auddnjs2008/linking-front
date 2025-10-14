import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqGetSearchLinkByPagination = {
  keyword: string;
  id: number;
  order: "ASC" | "DESC";
  take: number;
  startDate?: string;
  endDate?: string;
  isBookmarked?: boolean;
  hasThumbnail?: boolean;
  tagKeyword?: string;
  createdByMe?: boolean;
};

type ResGetSearchLinkByPagination = {
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

export const getSearchLinkByPagination = async (
  req: ReqGetSearchLinkByPagination
) => {
  const result = await apiInstance.get<ResGetSearchLinkByPagination>(
    "/link/search",
    {
      params: req,
    }
  );
  return result.data;
};
