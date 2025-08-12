import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onSuccess: () => {
          toast.success("요청이 정상적으로 이루어졌습니다.");
        },
        onError: (error: unknown) => {
          // 에러 타입에 따른 메시지 처리
          let errorMessage = "알 수 없는 오류가 발생했습니다";

          if (error instanceof AxiosError) {
            errorMessage = error.response?.data.message;
          }

          toast.error(errorMessage);
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
