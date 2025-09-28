export const RQuserKey = {
  me: ["user", "me"],
  stats: (id: number) => ["user", "stats", id] as const,
};
