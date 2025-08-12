import { login } from "@/service/auth/signin";
import { useMutation } from "@tanstack/react-query";

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
