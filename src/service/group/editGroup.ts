import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqEditGroup = {
  id: number;
  body: {
    title?: string;
    description?: string;
    linkIds?: number[];
  };
};

type ResEditGroup = {
  id: number;
  title: string;
  description: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export const editGroup = async (req: ReqEditGroup): Promise<ResEditGroup> => {
  const result = await apiInstance.patch<ResEditGroup>(
    `/group/${req.id}`,
    req.body
  );
  return result.data;
};
