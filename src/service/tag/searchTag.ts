import { apiInstance } from "../api";

type ReqGetSearchTag = {
  query?: string;
  limit?: number;
};

type ResGetSearchTag = {
  id: number;
  name: string;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}[];

export const getSearchTag = async (req: ReqGetSearchTag) => {
  const result = await apiInstance.get<ResGetSearchTag>("/tag/search", {
    params: req,
  });
  return result.data;
};
