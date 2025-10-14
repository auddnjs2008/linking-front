import { apiInstance } from "../api";

type ReqGetLinkDetail = {
  id: number;
};

type ResGetLinkDetail = {
  id: number;
  title: string;
  linkUrl: string;
  thumbnail: string;
  description: string;
  views: number;
  user: {
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
  tags: string[];
};

export const getLinkDetail = async (req: ReqGetLinkDetail) => {
  const result = await apiInstance.get<ResGetLinkDetail>(`/link/${req.id}`);
  return result.data;
};
