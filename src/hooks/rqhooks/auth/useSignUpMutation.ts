import { signup } from "@/service/auth/signup";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signup,
  });
};
