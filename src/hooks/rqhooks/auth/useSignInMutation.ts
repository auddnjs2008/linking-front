import { login } from "@/service/auth/signin";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignInMutation = () => {
  const navigator = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("로그인에 성공했습니다.");
      const { refreshToken, accessToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      navigator("/");
    },
  });
};
