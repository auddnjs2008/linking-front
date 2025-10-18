import { apiInstance } from "../api";

type ReqBookmarkLink = {
  id: number;
};

export const bookmarkLink = async (req: ReqBookmarkLink) => {
  const result = await apiInstance.post(`/link/${req.id}/bookmark`, {});
  return result.data;
};
