import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqGetLinkByPagination = {
  id: number;
  order: "ASC" | "DESC";
  take: number;
};

type ResGetLinkByPagination = {
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

export const getLinkByPagination = async (req: ReqGetLinkByPagination) => {
  const result = await apiInstance.get<ResGetLinkByPagination>(
    "/link/cursor-pagination",
    {
      params: req,
    }
  );
  return result.data;
};
