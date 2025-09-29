import { apiInstance } from "../api";

type ReqUpdateUser = {
  id: number;
  body: {
    name?: string;
    profile?: string;
  };
};

type ResUpdateUser = {
  id: number;
  name: string;
  email: string;
  loginType: "google" | "local";
  profile: string;
  createdAt: string;
  updatedAt: string;
};

export const updateUser = async (
  req: ReqUpdateUser
): Promise<ResUpdateUser> => {
  const result = await apiInstance.patch<ResUpdateUser>(
    `/user/${req.id}`,
    req.body
  );
  return result.data;
};
