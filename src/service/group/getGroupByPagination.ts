import { apiInstance } from "../api";

type ReqGetGroupByPagination = {
  id?: number;
  order: "ASC" | "DESC";
  take: number;
};

type ResGetGroupByPagination = {
  data: {
    id: number;
    name: string;
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

export const getGroupByPagination = async (req: ReqGetGroupByPagination) => {
  const result = await apiInstance.get<ResGetGroupByPagination>(
    "/group/cursor-pagination",
    {
      params: req,
    }
  );

  return result.data;
};
