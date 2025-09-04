import { bookmarkLink } from "@/service/link/bookmarkLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PaginationData } from "./types";

import type { ResGetGroupDetail } from "@/service/group/getGroupDetail";

export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkLink,
    onMutate: async ({ id }) => {
      // 모든 링크 관련 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: ["link"],
      });

      await queryClient.cancelQueries({ queryKey: ["group", "detail"] });

      // 이전 데이터들을 저장할 객체
      const previousQueries: Record<
        string,
        PaginationData | ResGetGroupDetail
      > = {};

      // 모든 페이지네이션 쿼리에서 해당 링크의 북마크 상태를 옵티미스틱하게 업데이트
      queryClient
        .getQueriesData({ queryKey: ["link", "cursor-pagination"] })
        .forEach(([queryKey, data]) => {
          if (
            data &&
            typeof data === "object" &&
            "pages" in data &&
            Array.isArray((data as PaginationData).pages)
          ) {
            const paginationData = data as PaginationData;
            // 이전 데이터 저장
            previousQueries[JSON.stringify(queryKey)] = paginationData;

            // 새로운 데이터 생성
            const newData: PaginationData = {
              ...paginationData,
              pages: paginationData.pages.map((page) => ({
                ...page,
                data: page.data.map((link) =>
                  link.id === id ? { ...link, isBookmarked: true } : link
                ),
              })),
            };

            // 쿼리 데이터 업데이트
            queryClient.setQueryData(queryKey, newData);
          }
        });

      queryClient
        .getQueriesData({ queryKey: ["group", "detail"] })
        .forEach(([queryKey, data]) => {
          const groupData = data as ResGetGroupDetail;
          previousQueries[JSON.stringify(queryKey)] =
            groupData as ResGetGroupDetail;

          const newData = {
            ...groupData,
            linkedLinks: groupData.linkedLinks.map((link) =>
              link.id !== id ? link : { ...link, isBookmarked: true }
            ),
          };

          queryClient.setQueryData(queryKey, newData);
        });

      return { previousQueries };
    },
    onError: (err, data, context) => {
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
    onSettled: () => {
      // 성공/실패 상관없이 모든 링크 관련 쿼리를 무효화하여 최신 상태 동기화
      queryClient.invalidateQueries({
        queryKey: ["link"],
      });
    },
  });
};
