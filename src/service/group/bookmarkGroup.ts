import { apiInstance } from "../api";

type ReqBookmarkGroup = {
  id: number;
};

export const bookmarkGroup = async (req: ReqBookmarkGroup) => {
  const result = await apiInstance.post(`/group/${req.id}/bookmark`, {});
  return result.data;
};
