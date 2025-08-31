export const RQlinkKey = {
  links: (limit: number, order: "ASC" | "DESC") =>
    ["link", "cursor-pagination", limit, order] as const,

  searchLinks: (limit: number, order: "ASC" | "DESC", keyword: string) =>
    ["link", "cursor-pagination", limit, order, keyword] as const,

  userLinks: ({
    take,
    order,
    userId,
  }: {
    take: number;
    order: "ASC" | "DESC";
    userId?: number; // optional로 변경
  }) =>
    [
      "link",
      "cursor-pagination",
      "user",
      userId ?? "no-user", // undefined인 경우 "no-user" 사용
      take,
      order,
    ] as const,

  linkDetail: (id: number) => ["link", id] as const,
};
