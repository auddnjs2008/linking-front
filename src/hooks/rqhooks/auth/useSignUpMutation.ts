import { signup } from "@/service/auth/signup";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignUpMutation = () => {
  const navigator = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success("회원가입 및 로그인에 성공했습니다.");
      const { refreshToken, accessToken } = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setTimeout(() => navigator("/"), 500);
      // 전역 로컬 저장 필요
    },
  });
};
