import { apiInstance } from "../api";

type ReqGetUserStats = {
  id: number;
};

type ResGetUserStats = {
  createdLinkCount: number;
  createdGroupCount: number;
  receivedLinkBookmark: number;
  receivedGroupBookmark: number;
};

export const getUserStats = async ({
  id,
}: ReqGetUserStats): Promise<ResGetUserStats> => {
  const result = await apiInstance.get<ResGetUserStats>(`/user/${id}/stats`);
  return result.data;
};
