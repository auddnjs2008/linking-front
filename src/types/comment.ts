export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  linkId: number;
  user: {
    id: number;
    name: string;
    profile: string;
  };
  replies?: Comment[];
  parentId?: number;
};

export type CreateCommentRequest = {
  content: string;
  linkId: number;
  parentId?: number;
};

export type UpdateCommentRequest = {
  id: number;
  content: string;
};

export type CommentPaginationParams = {
  linkId: number;
  page?: number;
  limit?: number;
};
