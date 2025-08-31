export const RQgroupKey = {
  groups: (limit: number, order: "ASC" | "DESC") =>
    ["group", "cursor-pagination", limit, order] as const,
  userGroups: ({
    take,
    order,
    userId,
  }: {
    take: number;
    order: "ASC" | "DESC";
    userId?: number;
  }) =>
    ["group", "cursor-pagination", userId ?? "no-user", take, order] as const,
};
