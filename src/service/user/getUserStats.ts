import { apiInstance } from "../api";

type ResGetUserStats = {
  totalLinks: number;
  totalGroups: number;
  totalLinkBookmarks: number;
  totalGroupBookmarks: number;
};

export const getUserStats = async (): Promise<ResGetUserStats> => {
  const result = await apiInstance.get<ResGetUserStats>("/user/me/stats");
  return result.data;
};
