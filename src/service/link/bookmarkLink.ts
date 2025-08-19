import { apiInstance } from "../api";

type ReqBookmarkLink = {
  id: number;
};

export const bookmarkLink = async (req: ReqBookmarkLink) => {
  console.log("req");
  const result = await apiInstance.post(`/link/${req.id}/bookmark`, {});
  return result.data;
};
