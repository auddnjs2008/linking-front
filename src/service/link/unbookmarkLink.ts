import { apiInstance } from "../api";

type ReqUnBookmarkLink = {
  id: number;
};

export const unBookmarkLink = async (req: ReqUnBookmarkLink) => {
  const result = await apiInstance.post(`/link/${req.id}/unbookmark`, {});
  return result.data;
};
