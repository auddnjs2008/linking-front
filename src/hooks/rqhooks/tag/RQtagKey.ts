export const RQtagKey = {
  search: (query: string, limit: number) => ["tag", query, limit] as const,
  popularTags: ["tag", "popular"] as const,
};
