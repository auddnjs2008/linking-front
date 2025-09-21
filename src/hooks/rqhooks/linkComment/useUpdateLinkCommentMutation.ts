import { updateLinkComment } from "@/service/linkComment/updateLinkComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RQlinkCommentKey } from "./RQlinkCommentKey";
import type { ResGetLinkComments } from "@/service/linkComment/getLinkComments";

export const useUpdateLinkCommentMutation = (linkId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLinkComment,
    onMutate: async ({ commentId, body: { parentCommentId, comment } }) => {
      await queryClient.cancelQueries({
        queryKey: RQlinkCommentKey.linkComments(linkId),
      });

      const previousQueries: Record<string, ResGetLinkComments> = {};

      queryClient
        .getQueriesData({ queryKey: RQlinkCommentKey.linkComments(linkId) })
        .forEach(([queryKey, data]) => {
          if (data && Array.isArray(data)) {
            const commentsData = data as ResGetLinkComments;
            previousQueries[JSON.stringify(queryKey)] = commentsData;

            let newData: ResGetLinkComments = [...commentsData];

            if (parentCommentId) {
              newData = commentsData.map((parent) => {
                if (parent.id === parentCommentId) {
                  return {
                    ...parent,
                    replies: parent.replies.map((reply) => {
                      if (reply.id === commentId) {
                        return { ...reply, comment };
                      } else {
                        return reply;
                      }
                    }),
                  };
                }
                return parent;
              });
            } else {
              newData = commentsData.map((parent) => {
                if (parent.id === commentId) {
                  return {
                    ...parent,
                    comment,
                  };
                }
                return parent;
              });
            }

            queryClient.setQueryData(queryKey, newData);
          }
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
