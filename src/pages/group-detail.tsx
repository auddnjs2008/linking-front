import LinkCard from "@/components/link-card";

export default function GroupDetailPage() {
  // 임시 데이터 - 실제로는 props나 API에서 받아올 데이터
  const groupData = {
    name: "UI/UX Design Resources",
    description:
      "A curated collection of the best UI/UX design resources, tools, and inspiration for designers and developers.",
    memberCount: 12,
    linkCount: 8,
    createdAt: "2024-01-15",
  };

  const groupLinks = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
    thumbnailUrl: `https://picsum.photos/200/300?random=${index}`,
    title: `Design Resource ${index + 1}`,
    description:
      "This article provides an in-depth overview of the latest trends in UI/UX design, offering practical tips and real-world examples to inspire your next project.",
    url: "https://www.google.com",
  }));

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* 그룹 헤더 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {groupData.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              {groupData.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {groupData.memberCount}
              </div>
              <div>Members</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {groupData.linkCount}
              </div>
              <div>Links</div>
            </div>
          </div>
        </div>

        {/* 그룹 메타 정보 */}
        <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center gap-2">
            <span>Created</span>
            <span className="font-medium">{groupData.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Last updated</span>
            <span className="font-medium">2 days ago</span>
          </div>
        </div>
      </div>

      {/* 링크 그리드 섹션 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Links ({groupData.linkCount})
          </h2>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sort by
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {groupLinks.map((link) => (
            <LinkCard
              id={1}
              key={link.id}
              thumbnailUrl={link.thumbnailUrl}
              title={link.title}
              description={link.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
