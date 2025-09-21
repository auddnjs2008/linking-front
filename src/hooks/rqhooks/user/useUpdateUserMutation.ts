import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/service/user/updateUser";
import { RQuserKey } from "./RQuserKey";
import { toast } from "sonner";

type UpdateUserData = {
  name?: string;
  profile?: string;
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => updateUser({ body: data }),
    onSuccess: () => {
      // 유저 정보 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: RQuserKey.me });
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
    },
    onError: (error) => {
      console.error("프로필 업데이트 실패:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });
};
