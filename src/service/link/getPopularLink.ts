import { apiInstance } from "../api";

type ResGetPopularLink = {
  id: number;
  title: string;
  description: string;
  linkUrl: string;
  thumbnail: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile: string;
  };
  tags: {
    id: number;
    name: string;
    usageCount: number;
  }[];
  bookmarkedUsers: {
    linkId: number;
    userId: number;
    isBookmarked: boolean;
  }[];
}[];

export const getPopularLink = async () => {
  const result = await apiInstance.get<ResGetPopularLink>(`/link/popular`);
  return result.data;
};
