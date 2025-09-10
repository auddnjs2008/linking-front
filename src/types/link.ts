export type Link = {
  id: number;
  title: string;
  linkUrl: string;
  thumbnail: string;
  description: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  isBookmarked: boolean;
};

export type BookmarkFilter = "all" | "bookmarked" | "notBookmarked";

export type ThumbnailFilter = "all" | "withThumbnail" | "withoutThumbnail";
