export type GroupPaginationData = {
  pages: Array<{
    data: Array<{
      id: number;
      title: string;
      description: string;
      linkedLinksCount: number;
      author: {
        id: number;
        name: string;
        email: string;
        loginType: "google" | "local";
        profile: string;
        createdAt: string;
        updatedAt: string;
      };
      createdAt: string;
      updatedAt: string;
      isBookmarked: boolean;
    }>;
    meta: {
      hasNextPage: boolean;
      nextCursor: number;
      order: "ASC" | "DESC";
      take: number;
      currentCursor: number;
    };
  }>;
};
