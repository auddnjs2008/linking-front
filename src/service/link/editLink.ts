import { apiInstance } from "../api";

type ReqEditLink = {
  id: number;
  body: {
    title?: string;
    description?: string;
    linkUrl?: string;
    tags?: string[];
  };
};

type ResEditLink = {
  id: number;
  title: string;
  linkUrl: string;
  description: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
};

export const editLink = async (req: ReqEditLink): Promise<ResEditLink> => {
  const result = await apiInstance.patch<ResEditLink>(
    `/link/${req.id}`,
    req.body
  );
  return result.data;
};
