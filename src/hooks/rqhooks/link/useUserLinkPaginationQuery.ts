import { getUserLinkByPagination } from "@/service/link/getUserLinkByPagination";
import { RQlinkKey } from "./RQlinkKey";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  take: number;
  order: "ASC" | "DESC";
  userId?: number; // 훅에서는 optional
  keyword: string;
  startDate?: string;
  endDate?: string;
  isBookmarked?: boolean;
  hasThumbnail?: boolean;
  tagKeyword?: string;
};

export const useUserLinkPaginationQuery = ({
  take,
  order,
  userId,
  keyword,
  startDate,
  endDate,
  isBookmarked,
  hasThumbnail,
}: Props) => {
  return useInfiniteQuery({
    queryKey: RQlinkKey.userLinks({
      take,
      order,
      userId,
      keyword,
      startDate,
      endDate,
      isBookmarked,
      hasThumbnail,
    }),
    queryFn: ({ pageParam }) => {
      // enabled 옵션으로 userId가 있을 때만 실행되므로 안전
      return getUserLinkByPagination({
        userId: userId as number, // enabled: !!userId로 보장됨
        query: {
          take,
          id: pageParam ?? 0,
          order,
          keyword,
          startDate,
          endDate,
          isBookmarked,
          hasThumbnail,
        },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined,

    enabled: !!userId, // userId가 있을 때만 실행
  });
};

export const useUserLinkPaginationUtils = (props: Props) => {
  const query = useUserLinkPaginationQuery(props);
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
