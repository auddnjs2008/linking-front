import { useQuery } from "@tanstack/react-query";
import { RQtagKey } from "./RQtagKey";
import { getPopularTag } from "@/service/tag/getPopularTag";

export const usePopularTagQuery = () => {
  return useQuery({
    queryKey: RQtagKey.popularTags,
    queryFn: () => getPopularTag({ query: { limit: 10 } }),
  });
};
