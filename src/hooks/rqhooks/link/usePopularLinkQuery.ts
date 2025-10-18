import { useQuery } from "@tanstack/react-query";
import { RQlinkKey } from "./RQlinkKey";
import { getPopularLink } from "@/service/link/getPopularLink";

export const usePopularLinkQuery = () => {
  return useQuery({
    queryKey: RQlinkKey.popularLink,
    queryFn: () => getPopularLink(),
  });
};
