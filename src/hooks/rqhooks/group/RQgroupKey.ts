export const RQgroupKey = {
  groups: (limit: number, order: "ASC" | "DESC") =>
    ["group", "cursor-pagination", limit, order] as const,
};
