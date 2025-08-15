import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthFail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  useEffect(() => {
    // 에러가 없으면 로그인 페이지로 리다이렉트
    if (!error) {
      navigate("/auth/signin");
    }
  }, [error, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">인증 실패</h1>
          <p className="text-gray-600">로그인 과정에서 문제가 발생했습니다</p>
        </div>

        {/* 에러 카드 */}
        <Card className="bg-white rounded-2xl shadow-lg border-red-100">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-900">
              인증 실패
            </CardTitle>
            <CardDescription className="text-red-700">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 에러 코드 표시 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-800">
                    에러 코드:
                  </span>
                  <code className="text-sm bg-red-100 text-red-900 px-2 py-1 rounded">
                    {error}
                  </code>
                </div>
              </div>
            )}

            {/* 해결 방법 안내 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                해결 방법
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 브라우저를 새로고침해보세요</li>
                <li>• 다시 로그인을 시도해보세요</li>
                <li>• 네트워크 연결을 확인해보세요</li>
                <li>• 문제가 지속되면 관리자에게 문의하세요</li>
              </ul>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/auth/signin")}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                로그인 페이지로 돌아가기
              </Button>

              {/* <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50"
              >
                <Home className="w-4 h-4 mr-2" />
                홈으로 이동
              </Button> */}
            </div>

            {/* 추가 도움말 */}
            {/* <div className="text-center">
              <p className="text-sm text-gray-500">
                계속 문제가 발생하나요?{" "}
                <button
                  type="button"
                  onClick={() => {
                    // 여기에 고객 지원 링크나 이메일 열기 로직 추가
                    window.open("mailto:support@example.com", "_blank");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  고객 지원팀에 문의
                </button>
              </p>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
