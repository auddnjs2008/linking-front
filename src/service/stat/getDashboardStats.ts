import { apiInstance } from "../api";

type ResGetDashboardStats = {
  totalLinks: number;
  totalGroups: number;
  totalUsers: number;
  addedToday: number;
};

export const getDashboardStats = async () => {
  const result = await apiInstance.get<ResGetDashboardStats>("/common/stats");
  return result.data;
};
