import { uploadProfile } from "@/service/user/uploadProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RQuserKey } from "./RQuserKey";
import { toast } from "sonner";

export const useUploadProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RQuserKey.me });
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 업데이트 실패:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });
};
