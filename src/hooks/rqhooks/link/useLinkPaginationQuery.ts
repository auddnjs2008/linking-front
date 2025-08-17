import { useInfiniteQuery } from "@tanstack/react-query";
import { RQlinkKey } from "./RQlinkKey";
import { getLinkByPagination } from "@/service/link/getLinkByPagination";

export const useLinkPaginationQuery = (take: number, order: "ASC" | "DESC") => {
  return useInfiniteQuery({
    queryKey: RQlinkKey.links(take, order), // limit만 포함
    queryFn: ({ pageParam }) =>
      getLinkByPagination({
        take,
        id: pageParam ?? 0,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.hasPrev ? firstPage.prevCursor : undefined,
  });
};

// 커서 기반 페이지네이션을 위한 유틸리티 함수들
export const useLinkPaginationUtils = (take: number, order: "ASC" | "DESC") => {
  const query = useLinkPaginationQuery(take, order);

  const allLinks = query.data?.pages.flatMap((page) => page.data) ?? [];

  const goToNextPage = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  const goToPreviousPage = () => {
    if (query.hasPreviousPage && !query.isFetchingPreviousPage) {
      query.fetchPreviousPage();
    }
  };

  const refresh = () => {
    query.refetch();
  };

  return {
    ...query,
    allLinks,

    goToNextPage,
    goToPreviousPage,
    refresh,
  };
};
