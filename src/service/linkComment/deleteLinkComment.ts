import { apiInstance } from "../api";

type ReqDeleteLinkComment = {
  commentId: number;
};

type ResDeleteLinkComment = {
  commentId: number;
};

export const deleteLinkComment = async (
  req: ReqDeleteLinkComment
): Promise<ResDeleteLinkComment> => {
  const result = await apiInstance.delete<ResDeleteLinkComment>(
    `/linkComment/${req.commentId}`,
    {}
  );
  return result.data;
};
