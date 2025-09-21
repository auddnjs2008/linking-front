import { apiInstance } from "../api";
import type { ParentComment } from "@/types/comment";

export type ReqGetLinkComments = {
  linkId: number;
};

export type ResGetLinkComments = ParentComment[];
export const getLinkComments = async (req: ReqGetLinkComments) => {
  const result = await apiInstance.get<ResGetLinkComments>(
    `/linkComment/link/${req.linkId}`
  );

  return result.data;
};
