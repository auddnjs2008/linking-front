import type { User } from "@/types/user";
import { apiInstance } from "../api";

type ReqCreateGroup = {
  title: string;
  description: string;
  linkIds: number[];
};

type ResCreateGroup = {
  id: number;
  title: string;
  description: string;
  author: User;
  createdAt: string;
  updatedAt: string;
};

export const createGroup = async (
  req: ReqCreateGroup
): Promise<ResCreateGroup> => {
  const result = await apiInstance.post<ResCreateGroup>("/group", req);
  return result.data;
};
