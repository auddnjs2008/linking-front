import { apiInstance } from "../api";

type ReqCreateLink = {
  title: string;
  description: string;
  linkUrl: string;
  tags: string[];
};

type ResCreateLink = {
  id: number;
  title: string;
  linkUrl: string;
  description: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
};

export const createLink = async (
  req: ReqCreateLink
): Promise<ResCreateLink> => {
  const result = await apiInstance.post<ResCreateLink>("/link", req);
  return result.data; // 응답 데이터 반환
};
