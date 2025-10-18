import { apiInstance } from "../api";

type ResGetPopularGroup = {
  id: number;
  title: string;
  description: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile: string;
  };
  bookmarkedUsers: {
    id: number;
    userId: number;
    groupId: number;
    isBookmarked: boolean;
  }[];
  linkedLinks: {
    createdAt: string;
    updatedAt: string;
    version: number;
    id: number;
    title: string;
    description: string;
    linkUrl: string;
    thumbnail: string;
    views: number;
  }[];
}[];

export const getPopularGroup = async () => {
  const result = await apiInstance.get<ResGetPopularGroup>(`/group/popular`);
  return result.data;
};
