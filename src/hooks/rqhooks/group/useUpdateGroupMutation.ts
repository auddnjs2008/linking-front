import { editGroup } from "@/service/group/editGroup";
import { useMutation } from "@tanstack/react-query";

export const useUpdateGroupMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: editGroup,
    onSuccess,
  });
};
