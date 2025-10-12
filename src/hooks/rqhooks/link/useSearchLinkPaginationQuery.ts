import { useInfiniteQuery } from "@tanstack/react-query";
import { RQlinkKey } from "./RQlinkKey";
import { getSearchLinkByPagination } from "@/service/link/getSearchLinkByPagination";

type Props = {
  take: number;
  order: "ASC" | "DESC";
  keyword: string;
  startDate?: string;
  endDate?: string;
  isBookmarked?: boolean;
  hasThumbnail?: boolean;
  tagKeyword?: string;
};

export const useSearchLinkPaginationQuery = ({
  take,
  order,
  keyword,
  startDate,
  endDate,
  isBookmarked,
  hasThumbnail,
}: Props) => {
  return useInfiniteQuery({
    queryKey: RQlinkKey.searchLinks(
      take,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked,
      hasThumbnail
    ),
    queryFn: ({ pageParam }) =>
      getSearchLinkByPagination({
        take,
        id: pageParam ?? 0,
        order,
        keyword,
        startDate,
        endDate,
        isBookmarked,
        hasThumbnail,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta.nextCursor : undefined,
  });
};

// 커서 기반 페이지네이션을 위한 유틸리티 함수들
export const useSearchLinkPaginationUtils = ({
  take,
  order,
  keyword,
  startDate,
  endDate,
  isBookmarked,
  hasThumbnail,
}: Props) => {
  const query = useSearchLinkPaginationQuery({
    take,
    order,
    keyword,
    startDate,
    endDate,
    isBookmarked,
    hasThumbnail,
  });

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
