// 페이지네이션 데이터의 타입 정의
export type PaginationData = {
  pages: Array<{
    data: Array<{
      id: number;
      isBookmarked: boolean;
      title: string;
      linkUrl: string;
      thumbnail: string;
      description: string;
      creatorId: number;
      createdAt: string;
      updatedAt: string;
      author: {
        id: number;
        username: string;
        [key: string]: unknown;
      };
    }>;
    nextCursor: number;
    prevCursor: number;
    hasNext: boolean;
    hasPrev: boolean;
  }>;
};
