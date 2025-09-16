import { useQuery } from "@tanstack/react-query";
import { RQlinkCommentKey } from "./RQlinkCommentKey";
import { getLinkComments } from "@/service/linkComment/getLinkComments";

export const useLinkCommentsQuery = (linkId: number) => {
  return useQuery({
    queryKey: RQlinkCommentKey.linkComments(linkId),
    queryFn: () => getLinkComments({ linkId }),
    staleTime: 60 * 1000 * 5,
    enabled: !!linkId,
  });
};
