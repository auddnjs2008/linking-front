import { useInfiniteQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getGroupByPagination } from "@/service/group/getGroupByPagination";

type Props = {
  take: number;
  order: "ASC" | "DESC";
  keyword: string;
  startDate?: string;
  endDate?: string;
  isBookmarked?: boolean;
};

export const useGropuPaginationQuery = ({
  take,
  order,
  keyword,
  startDate,
  endDate,
  isBookmarked,
}: Props) => {
  return useInfiniteQuery({
    queryKey: RQgroupKey.groups(
      take,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked
    ),
    queryFn: ({ pageParam }) =>
      getGroupByPagination({
        take,
        id: pageParam ?? 0,
        order,
        keyword,
        startDate,
        endDate,
        isBookmarked,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined,
  });
};

export const useGroupPaginationUtils = ({
  take,
  order,
  keyword,
  startDate,
  endDate,
  isBookmarked,
}: Props) => {
  const query = useGropuPaginationQuery({
    take,
    order,
    keyword,
    startDate,
    endDate,
    isBookmarked,
  });

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
