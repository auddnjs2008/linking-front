import { apiInstance } from "../api";

type ResGetMe = {
  id: number;
  name: string;
  email: string;
  loginType: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
};

export const getMe = async () => {
  const result = await apiInstance.get<ResGetMe>("/user/me");
  return result.data;
};
