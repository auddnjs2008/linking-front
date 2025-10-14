import { useQuery } from "@tanstack/react-query";
import { RQlinkKey } from "./RQlinkKey";
import { getLinkDetail } from "@/service/link/getLinkDetail";

export const useLinkDetailQuery = (id: number) => {
  return useQuery({
    queryKey: RQlinkKey.linkDetail(id),
    queryFn: () => getLinkDetail({ id }),
    staleTime: 1 * 60 * 1000, // 1분: 조회수 같은 동적 데이터 때문에 짧게 설정
    gcTime: 10 * 60 * 1000, // 10분: 캐시는 유지
    refetchOnMount: true, // 페이지 재방문 시 stale하면 재요청
    enabled: !!id,
  });
};
