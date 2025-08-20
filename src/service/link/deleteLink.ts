import { apiInstance } from "../api";

type ReqDeleteLink = {
  id: number;
};

type ResDeleteLink = {
  id: number;
};

export const deleteLink = async (
  req: ReqDeleteLink
): Promise<ResDeleteLink> => {
  const result = await apiInstance.delete<ResDeleteLink>(`/link/${req.id}`, {});
  return result.data;
};
