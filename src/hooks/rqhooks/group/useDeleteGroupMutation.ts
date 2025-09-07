import { deleteGroup } from "@/service/group/deleteGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", "cursor-pagination"],
      });
    },
  });
};
