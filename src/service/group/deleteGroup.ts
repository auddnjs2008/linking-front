import { apiInstance } from "../api";

type ReqDeleteGroup = {
  id: number;
};

type ResDeleteGroup = {
  id: number;
};

export const deleteGroup = async (
  req: ReqDeleteGroup
): Promise<ResDeleteGroup> => {
  const result = await apiInstance.delete<ResDeleteGroup>(
    `/group/${req.id}`,
    {}
  );
  return result.data;
};
