import { useInfiniteQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getGroupByPagination } from "@/service/group/getGroupByPagination";

export const useGropuPaginationQuery = (
  take: number,
  order: "ASC" | "DESC"
) => {
  return useInfiniteQuery({
    queryKey: RQgroupKey.groups(take, order),
    queryFn: ({ pageParam }) =>
      getGroupByPagination({
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

export const useGroupPaginationUtils = (
  take: number,
  order: "ASC" | "DESC"
) => {
  const query = useGropuPaginationQuery(take, order);

  const allGroups = query.data?.pages.flatMap((page) => page.data) ?? [];

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
    allGroups,

    goToNextPage,
    goToPreviousPage,
    refresh,
  };
};
