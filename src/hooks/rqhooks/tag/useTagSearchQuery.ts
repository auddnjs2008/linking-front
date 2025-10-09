import { useQuery } from "@tanstack/react-query";
import { RQtagKey } from "./RQtagKey";
import { getSearchTag } from "@/service/tag/searchTag";

export const useTagSearchQuery = (name: string, limit: number) => {
  return useQuery({
    queryKey: RQtagKey["search"](name, limit),
    queryFn: () => getSearchTag({ query: name, limit }),
    enabled: name.trim().length > 0, // Only run query if name is not empty
  });
};
