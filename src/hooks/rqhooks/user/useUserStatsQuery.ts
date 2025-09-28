import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/service/user/getUserStats";
import { RQuserKey } from "./RQuserKey";

export const useUserStatsQuery = (id: number) => {
  return useQuery({
    queryKey: RQuserKey.stats(id),
    queryFn: () => getUserStats({ id }),
    staleTime: 5 * 60 * 1000, // 5분: 통계 정보는 자주 변경되지 않음
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!id && id !== -1,
  });
};
