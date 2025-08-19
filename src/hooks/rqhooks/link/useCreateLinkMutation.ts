import { createLink } from "@/service/link/createLink";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["link"] });
      toast.success("링크가 생성되었습니다.");
    },
  });
};
