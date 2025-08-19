import { useQuery } from "@tanstack/react-query";
import { RQlinkKey } from "./RQlinkKey";
import { getLinkDetail } from "@/service/link/getLinkDetail";

export const useLinkDetailQuery = (id: number) => {
  return useQuery({
    queryKey: RQlinkKey.linkDetail(id),
    queryFn: () => getLinkDetail({ id }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};
