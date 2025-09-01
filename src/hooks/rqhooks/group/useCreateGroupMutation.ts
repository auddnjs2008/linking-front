import { createGroup } from "@/service/group/createGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGroupMutation = (onClose?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group"] });
      toast.success("그룹이 생성되었습니다.");
      onClose?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
