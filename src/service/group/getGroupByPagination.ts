import { apiInstance } from "../api";

type ReqGetGroupByPagination = {
  id?: number;
  order: "ASC" | "DESC";
  take: number;
  keyword: string;
  startDate?: string;
  endDate?: string;
  isBookmarked?: boolean;
  hasThumbnail?: boolean;
  createdByMe?: boolean;
};

type ResGetGroupByPagination = {
  data: {
    id: number;
    title: string;
    description: string;
    linkedLinks: { id: number; title: string }[];
    author: {
      id: number;
      name: string;
      email: string;
      loginType: "google" | "local";
      profile: string;
      createdAt: string;
      updatedAt: string;
    };
    createdAt: string;
    updatedAt: string;
    isBookmarked: boolean;
  }[];
  meta: {
    hasNextPage: boolean;
    nextCursor: number;
    order: "ASC" | "DESC";
    take: number;
    currentCursor: number;
  };
};

export const getGroupByPagination = async (req: ReqGetGroupByPagination) => {
  const result = await apiInstance.get<ResGetGroupByPagination>(
    "/group/cursor-pagination",
    {
      params: req,
    }
  );

  return result.data;
};
