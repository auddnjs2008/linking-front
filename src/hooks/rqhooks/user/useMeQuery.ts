import { getMe } from "@/service/user/getMe";
import { useQuery } from "@tanstack/react-query";
import { RQuserKey } from "./RQuserKey";

export const useMeQuery = () => {
  const query = useQuery({
    queryKey: RQuserKey.me,
    queryFn: getMe,
    staleTime: 10 * 60 * 1000, // 10분: 사용자 정보는 자주 변경되지 않음
    gcTime: 30 * 60 * 1000, // 30분: 자주 사용되는 데이터이므로 캐시 유지
  });

  return query;
};
