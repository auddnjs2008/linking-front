import { apiInstance } from "../api";

type ReqGetUserLinkByPagination = {
  userId: number;
  query: {
    take: number;
    order: "ASC" | "DESC";
    id: number;
  };
};

type ResGetuserLinkByPagination = {
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
