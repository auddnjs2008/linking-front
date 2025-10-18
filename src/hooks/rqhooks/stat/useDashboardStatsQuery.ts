import { useQuery } from "@tanstack/react-query";
import { RQstatKeys } from "./RQstatKey";
import { getDashboardStats } from "@/service/stat/getDashboardStats";

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: RQstatKeys.dashboardStat,
    queryFn: () => getDashboardStats(),
  });
};
