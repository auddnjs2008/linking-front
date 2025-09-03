import LinkCard from "@/components/link-card";
import { useGroupDetailQuery } from "@/hooks/rqhooks/group/useGroupDetailQuery";
import { useParams } from "react-router-dom";

export default function GroupDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;

  const { data: groupData } = useGroupDetailQuery(id || -1);

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* 그룹 헤더 섹션 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {groupData?.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
              {groupData?.description}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {groupData?.bookmarkedUsers.length}
              </div>
              <div>Members</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">
                {groupData?.linkedLinks.length}
              </div>
              <div>Links</div>
            </div>
          </div>
        </div>

        {/* 그룹 메타 정보 */}
        <div className="flex items-center gap-6 text-sm text-gray-500 border-t pt-4">
          <div className="flex items-center gap-2">
            <span>Created</span>
            <span className="font-medium">{groupData?.createdAt}</span>
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
            Links ({groupData?.linkedLinks.length})
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
          {groupData?.linkedLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              thumbnailUrl={link.thumbnail}
              linkUrl={link.linkUrl}
              tags={link.tags}
              title={link.title}
              description={link.description}
              author={link.user}
              isBookmarked={link.isBookmarked}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
