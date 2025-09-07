export const RQgroupKey = {
  groups: (limit: number, order: "ASC" | "DESC", keyword: string) =>
    ["group", "cursor-pagination", limit, order, keyword] as const,
  userGroups: ({
    take,
    order,
    userId,
    keyword,
  }: {
    take: number;
    order: "ASC" | "DESC";
    userId?: number;
    keyword: string;
  }) =>
    [
      "group",
      "cursor-pagination",
      userId ?? "no-user",
      take,
      order,
      keyword,
    ] as const,
  groupDetail: (id: number) => ["group", "detail", id] as const,
};
