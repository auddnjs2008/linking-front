import axios from "axios";

type ResRefresh = {
  accessToken: string;
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const data = await axios.post<ResRefresh>(
    import.meta.env.VITE_API_URL + "/auth/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return data.data;
};
