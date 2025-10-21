import LinkCard from "@/components/link-card";
import { useGroupDetailQuery } from "@/hooks/rqhooks/group/useGroupDetailQuery";
import { useParams } from "react-router-dom";
import { EyeIcon, Users, Link } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function GroupDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;

  const { data: groupData } = useGroupDetailQuery(id || -1);

  return (
    <>
      <Helmet>
        <title>
          {groupData ? `${groupData.title} - Linking` : "그룹 상세 - Linking"}
        </title>
        <meta
          name="description"
          content={groupData?.description || "그룹 상세 정보를 확인하세요"}
        />
      </Helmet>
      <div className="p-6 h-full flex flex-col w-full">
        {/* 그룹 헤더 섹션 */}
        <div className="mb-8">
          <div className="flex items-center flex-col justify-between mb-4 sm:flex-row gap-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {groupData?.title}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                {groupData?.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg min-w-[70px]">
                <Users className="w-4 h-4 text-gray-600" />
                <div className="font-bold text-base text-gray-900">
                  {groupData?.bookmarkedUsers.length || 0}
                </div>
                <div className="text-xs text-gray-600">Members</div>
              </div>
              <div className="flex flex-col items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg min-w-[70px]">
                <Link className="w-4 h-4 text-gray-600" />
                <div className="font-bold text-base text-gray-900">
                  {groupData?.linkedLinks.length || 0}
                </div>
                <div className="text-xs text-gray-600">Links</div>
              </div>
              <div className="flex flex-col items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg min-w-[70px]">
                <EyeIcon className="w-4 h-4 text-gray-600" />
                <div className="font-bold text-base text-gray-900">
                  {groupData?.views?.toLocaleString() || 0}
                </div>
                <div className="text-xs text-gray-600">Views</div>
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
    </>
  );
}
