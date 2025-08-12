import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <LoaderCircle
        className={cn("animate-spin text-current", sizeClasses[size])}
      />
    </div>
  );
}

// 로딩 오버레이가 있는 스피너
export function SpinnerOverlay({
  size = "md",
  className,
  overlayClassName,
}: SpinnerProps & { overlayClassName?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/20 flex items-center justify-center z-50",
        overlayClassName
      )}
    >
      <div className={cn("bg-white rounded-lg p-6 shadow-lg", className)}>
        <Spinner size={size} />
      </div>
    </div>
  );
}

// 인라인 스피너 (텍스트와 함께 사용)
export function InlineSpinner({
  size = "sm",
  className,
  text = "Loading...",
}: SpinnerProps & { text?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Spinner size={size} />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
}

// 버튼 내부용 작은 스피너
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Spinner size="sm" />
      <span>Loading...</span>
    </div>
  );
}
