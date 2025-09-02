import { apiInstance } from "../api";

type ReqGetUserGroupByPagination = {
  userId: number;
  query: {
    id?: number;
    order: "ASC" | "DESC";
    take: number;
  };
};

type ResGetUserGroupByPagination = {
  data: {
    id: number;
    title: string;
    description: string;
    linkedLinksCount: number;
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

export const getUserGroupByPagination = async (
  req: ReqGetUserGroupByPagination
) => {
  const result = await apiInstance.get<ResGetUserGroupByPagination>(
    `/group/user/${req.userId}/cursor-pagination`,
    {
      params: req.query,
    }
  );
  return result.data;
};
