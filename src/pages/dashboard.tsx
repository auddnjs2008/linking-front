import DashboardStats from "@/components/dashboard-stats";
import DashboardLinks from "@/components/dashboard-links";
import DashboardGroups from "@/components/dashboard-groups";
import DashboardTags from "@/components/dashboard-tags";

export default function DashboardPage() {
  return (
    <div className="p-6 h-full flex flex-col w-full max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          플랫폼의 트렌드와 인기 콘텐츠를 확인해보세요
        </p>
      </div>

      {/* 전체 통계 카드 */}
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <DashboardLinks />
        <DashboardGroups />
      </div>

      {/* 트렌딩 태그 섹션 */}
      <DashboardTags />
    </div>
  );
}
