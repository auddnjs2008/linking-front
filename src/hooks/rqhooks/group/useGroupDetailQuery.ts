import { useQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getGroupDetail } from "@/service/group/getGroupDetail";

export const useGroupDetailQuery = (id: number) => {
  return useQuery({
    queryKey: RQgroupKey["groupDetail"](id),
    queryFn: () => getGroupDetail({ id }),
    staleTime: 1 * 60 * 1000, // 1분: 조회수 같은 동적 데이터 때문에 짧게 설정
    gcTime: 10 * 60 * 1000, // 10분: 캐시는 유지
    refetchOnMount: true, // 페이지 재방문 시 stale하면 재요청
    enabled: !!id,
  });
};
