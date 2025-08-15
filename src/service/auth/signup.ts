import axios from "axios";

type ReqSignUp = {
  email: string;
  password: string;
  body: {
    name: string;
  };
};

type ResSignUp = {
  user: {
    id: number;
    name: string;
    email: string;
    loginType: string;
    profile: string;
    createdAt: string;
    updatedAt: string;
    version: number;
  };
};

export const signup = async (req: ReqSignUp) => {
  const basicHeader = btoa(`${req.email}:${req.password}`);

  const data = await axios.post<ResSignUp>(
    import.meta.env.VITE_API_URL + "/auth/register",
    req.body,
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
      },
    }
  );

  return data.data;
};
