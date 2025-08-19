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
  }[];
  nextCursor: number;
  prevCursor: number;
  hasNext: boolean;
  hasPrev: boolean;
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
