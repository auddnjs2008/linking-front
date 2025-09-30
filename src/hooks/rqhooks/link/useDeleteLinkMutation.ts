import { deleteLink } from "@/service/link/deleteLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["link", "cursor-pagination"],
      });
      queryClient.invalidateQueries({ queryKey: ["user", "stats"] });
    },
  });
};
