import axios from "axios";

type ReqSignIn = {
  email: string;
  password: string;
};

type ResSignIn = {
  accessToken: string;
  refreshToken: string;
};

export const login = async (req: ReqSignIn) => {
  const basicHeader = btoa(`${req.email}:${req.password}`);

  const data = await axios.post<ResSignIn>(
    import.meta.env.VITE_API_URL + "/auth/login",
    {},
    {
      headers: {
        Authorization: `Basic ${basicHeader}`,
      },
    }
  );
  return data.data;
};
