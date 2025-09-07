import { useInfiniteQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getGroupByPagination } from "@/service/group/getGroupByPagination";

export const useGropuPaginationQuery = (
  take: number,
  order: "ASC" | "DESC",
  keyword: string
) => {
  return useInfiniteQuery({
    queryKey: RQgroupKey.groups(take, order, keyword),
    queryFn: ({ pageParam }) =>
      getGroupByPagination({
        take,
        id: pageParam ?? 0,
        order,
        keyword,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined,
  });
};

export const useGroupPaginationUtils = (
  take: number,
  order: "ASC" | "DESC",
  keyword: string
) => {
  const query = useGropuPaginationQuery(take, order, keyword);

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
