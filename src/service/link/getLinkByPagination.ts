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
    url: string;
    description: string;
    creatorId: number;
    createdAt: string;
    updatedAt: string;
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
