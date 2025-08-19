export type User = {
  id: number;
  name: string;
  email: string;
  loginType: "google" | "local";
  profile: string;
  createdAt: string;
  updatedAt: string;
};
