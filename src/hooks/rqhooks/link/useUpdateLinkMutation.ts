import { editLink } from "@/service/link/editLink";
import { useMutation } from "@tanstack/react-query";

export const useUpdateLinkMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: editLink,
    onSuccess,
  });
};
