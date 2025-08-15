import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);

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
