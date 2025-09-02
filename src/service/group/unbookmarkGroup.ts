import { apiInstance } from "../api";

type ReqUnBookmarkGroup = {
  id: number;
};

export const unBookmarkGroup = async (req: ReqUnBookmarkGroup) => {
  const result = await apiInstance.post(`/group/${req.id}/unbookmark`, {});
  return result.data;
};
