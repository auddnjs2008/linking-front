import { useInfiniteQuery } from "@tanstack/react-query";
import { RQgroupKey } from "./RQgroupKey";
import { getUserGroupByPagination } from "@/service/group/getUserGroupByPagination";

type Props = {
  take: number;
  order: "ASC" | "DESC";
  userId?: number;
};

export const useUserGroupPaginationQuery = ({ take, order, userId }: Props) => {
  return useInfiniteQuery({
    queryKey: RQgroupKey.userGroups({ take, order, userId }),
    queryFn: ({ pageParam }) => {
      return getUserGroupByPagination({
        userId: userId as number,
        query: {
          take,
          id: pageParam ?? 0,
          order,
        },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined,
    enabled: !!userId,
  });
};

export const useUserGroupPaginationUtils = (props: Props) => {
  const query = useUserGroupPaginationQuery(props);
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
