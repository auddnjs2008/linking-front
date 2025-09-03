import { useQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getGroupDetail } from "@/service/group/getGroupDetail";

export const useGroupDetailQuery = (id: number) => {
  return useQuery({
    queryKey: RQgroupKey["groupDetail"](id),
    queryFn: () => getGroupDetail({ id }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};
