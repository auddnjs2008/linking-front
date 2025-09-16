import { createLinkComment } from "@/service/linkComment/createLinkComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLinkCommentMutation = (id: number) => {
  const queryClient = useQueryClient();
  console.log(queryClient, id);
  return useMutation({
    mutationFn: createLinkComment,
  });
};
