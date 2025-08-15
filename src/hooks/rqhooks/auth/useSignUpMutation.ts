import { signup } from "@/service/auth/signup";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("회원가입에 성공했습니다. 다시 로그인 해주세요.");
      navigate("/auth/signin");
      // 전역 로컬 저장 필요
    },
  });
};
