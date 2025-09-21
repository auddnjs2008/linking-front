import { createLinkComment } from "@/service/linkComment/createLinkComment";
import type { ResGetLinkComments } from "@/service/linkComment/getLinkComments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RQlinkCommentKey } from "./RQlinkCommentKey";

export const useCreateLinkCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLinkComment,
    onMutate: async ({ linkId, body: { parentCommentId, comment } }) => {
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
              // 답글인 경우
              newData = commentsData.map((parent) => {
                if (parent.id === parentCommentId) {
                  return {
                    ...parent,
                    replies: [
                      ...parent.replies,
                      {
                        id: Date.now(), // 임시 ID
                        comment,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        version: 1,
                        user: {
                          id: 0,
                          name: "작성 중...",
                          profile: "",
                          email: "",
                          loginType: "local" as const,
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        },
                        link: parent.link,
                        parentComment: {
                          id: parent.id,
                          comment: parent.comment,
                        },
                        parentCommentId: parent.id,
                        replies: [],
                      },
                    ],
                  };
                }
                return parent;
              });
            } else {
              // 원댓글인 경우
              newData = [
                ...commentsData,
                {
                  id: Date.now(), // 임시 ID
                  comment,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  version: 1,
                  user: {
                    id: 0,
                    name: "작성 중...",
                    profile: "",
                    email: "",
                    loginType: "local" as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  },
                  link: commentsData[0]?.link || {
                    id: 0,
                    title: "",
                    description: "",
                    linkUrl: "",
                    thumbnail: "",
                    tags: [],
                    readTime: 0,
                    isBookmarked: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    version: 1,
                    user: {
                      id: 0,
                      name: "",
                      profile: "",
                      email: "",
                      loginType: "local" as const,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                    },
                  },
                  parentComment: null,
                  parentCommentId: null,
                  replies: [],
                },
              ];
            }
            queryClient.setQueryData(queryKey, newData);
          }
        });

      return { previousQueries };
    },
    onError: (_, __, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousQueries) {
        Object.entries(context.previousQueries).forEach(
          ([queryKeyStr, data]) => {
            const queryKey = JSON.parse(queryKeyStr);
            queryClient.setQueryData(queryKey, data);
          }
        );
      }
    },
    onSettled: (_, __, variables) => {
      // 성공/실패 상관없이 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: RQlinkCommentKey.linkComments(variables.linkId),
      });
    },
  });
};
