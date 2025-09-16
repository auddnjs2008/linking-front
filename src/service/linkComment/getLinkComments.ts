import { apiInstance } from "../api";
import type { ParentComment } from "@/types/comment";

type ReqGetLinkComments = {
  linkId: number;
};

type ResGetLinkComments = ParentComment[];
export const getLinkComments = async (req: ReqGetLinkComments) => {
  const result = await apiInstance.get<ResGetLinkComments>(
    `/linkComment/link/${req.linkId}`
  );

  return result.data;
};
