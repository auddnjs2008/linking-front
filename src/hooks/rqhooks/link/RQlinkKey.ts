export const RQlinkKey = {
  links: (limit: number, order: "ASC" | "DESC") =>
    ["link", "cursor-pagination", limit, order] as const,

  searchLinks: (
    limit: number,
    order: "ASC" | "DESC",
    keyword: string,
    startDate?: string,
    endDate?: string,
    isBookmarked?: boolean,
    hasThumbnail?: boolean,
    tagKeyword?: string
  ) =>
    [
      "link",
      "cursor-pagination",
      limit,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked,
      hasThumbnail,
      tagKeyword,
    ] as const,

  userLinks: ({
    take,
    order,
    userId,
    keyword,
    startDate,
    endDate,
    isBookmarked,
    hasThumbnail,
    tagKeyword,
  }: {
    take: number;
    order: "ASC" | "DESC";
    userId?: number; // optional로 변경
    keyword: string;
    startDate?: string;
    endDate?: string;
    isBookmarked?: boolean;
    hasThumbnail?: boolean;
    tagKeyword?: string;
  }) =>
    [
      "link",
      "cursor-pagination",
      "user",
      userId ?? "no-user", // undefined인 경우 "no-user" 사용
      take,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked,
      hasThumbnail,
      tagKeyword,
    ] as const,

  linkDetail: (id: number) => ["link", "detail", id] as const,
};
