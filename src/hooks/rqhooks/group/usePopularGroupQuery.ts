import { useQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getPopularGroup } from "@/service/group/getPopularGroup";

export const usePopularGroupsQuery = () => {
  return useQuery({
    queryKey: RQgroupKey.popularGroups,
    queryFn: () => getPopularGroup(),
  });
};
