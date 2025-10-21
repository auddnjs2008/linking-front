import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 쿠키에 토큰 저장 (httpOnly: false)
      document.cookie = `accessToken=${accessToken}; path=/; max-age=${
        7 * 24 * 60 * 60
      }; secure; samesite=strict`;
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${
        30 * 24 * 60 * 60
      }; secure; samesite=strict`;

      console.log("✅ 토큰이 쿠키에 저장되었습니다");
    } else {
      console.log("❌ 토큰이 없습니다");
    }

    // 토큰 저장 후 메인 페이지로 리다이렉트
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          인증에 성공하였습니다.
        </h2>
        <p className="text-gray-600">Google 로그인을 완료하고 있습니다</p>
      </div>
    </div>
  );
}
