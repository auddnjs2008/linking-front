import { deleteLinkComment } from "@/service/linkComment/deleteLinkComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RQlinkCommentKey } from "./RQlinkCommentKey";
import type { ResGetLinkComments } from "@/service/linkComment/getLinkComments";

export const useDeleteLinkCommentMutation = (linkId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLinkComment,
    onMutate: async ({ commentId }) => {
      await queryClient.cancelQueries({
        queryKey: RQlinkCommentKey.linkComments(linkId),
      });

      const previousQueries: Record<string, ResGetLinkComments> = {};

      queryClient
        .getQueriesData({ queryKey: RQlinkCommentKey.linkComments(linkId) })
        .forEach(([queryKey, data]) => {
          const commentsData = data as ResGetLinkComments;
          previousQueries[JSON.stringify(queryKey)] = commentsData;

          // 깊은 복사로 참조 변경 보장
          const newData: ResGetLinkComments = commentsData.map((comment) => ({
            ...comment,
            replies: [...comment.replies], // replies 배열도 새로 생성
          }));

          let found = false;
          for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === commentId) {
              newData.splice(i, 1);
              found = true;
              break;
            }

            for (let j = 0; j < newData[i].replies.length; j++) {
              if (newData[i].replies[j].id === commentId) {
                newData[i].replies.splice(j, 1);
                found = true;
                break;
              }
            }
            if (found) break;
          }

          queryClient.setQueryData(queryKey, newData);
        });
      return { previousQueries };
    },

    onError: (_, __, context) => {
      if (context?.previousQueries) {
        Object.entries(context.previousQueries).forEach(
          ([queryKeyStr, data]) => {
            const queryKey = JSON.parse(queryKeyStr);
            queryClient.setQueriesData(queryKey, data);
          }
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: RQlinkCommentKey.linkComments(linkId),
      });
    },
  });
};
