export const RQgroupKey = {
  groups: (
    limit: number,
    order: "ASC" | "DESC",
    keyword: string,
    startDate?: string,
    endDate?: string,
    isBookmarked?: boolean,
    createdByMe?: boolean
  ) =>
    [
      "group",
      "cursor-pagination",
      limit,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked,
      createdByMe,
    ] as const,
  popularGroups: ["group", "popular"] as const,
  userGroups: ({
    take,
    order,
    userId,
    keyword,
    startDate,
    endDate,
    isBookmarked,
  }: {
    take: number;
    order: "ASC" | "DESC";
    userId?: number;
    keyword: string;
    startDate?: string;
    endDate?: string;
    isBookmarked?: boolean;
  }) =>
    [
      "group",
      "cursor-pagination",
      userId ?? "no-user",
      take,
      order,
      keyword,
      startDate,
      endDate,
      isBookmarked,
    ] as const,
  groupDetail: (id: number) => ["group", "detail", id] as const,
};
