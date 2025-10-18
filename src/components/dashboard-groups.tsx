import { usePopularGroupsQuery } from "@/hooks/rqhooks/group/usePopularGroupQuery";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FolderOpen, LinkIcon, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardGroups() {
  const { data: popularGroups, isLoading, error } = usePopularGroupsQuery();
  const navigate = useNavigate();

  const handleGroupRoute = () => {
    navigate("/groups");
  };

  const handleGroupDetailRoute = (id: number) => {
    navigate(`/groups/${id}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold">
              📁 인기 그룹
            </CardTitle>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3 p-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2 mt-2">
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold">
              📁 인기 그룹
            </CardTitle>
          </div>
          <Button onClick={handleGroupRoute} variant="outline" size="sm">
            더 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              인기 그룹을 불러올 수 없습니다
            </h3>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!popularGroups || popularGroups.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-lg font-semibold">
              📁 인기 그룹
            </CardTitle>
          </div>
          <Button onClick={handleGroupRoute} variant="outline" size="sm">
            더 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              아직 인기 그룹이 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              그룹을 만들고 링크를 정리해보세요!
            </p>
            <Button onClick={handleGroupRoute} variant="outline">
              그룹 보러가기
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg font-semibold">📁 인기 그룹</CardTitle>
        </div>
        <Button onClick={handleGroupRoute} variant="outline" size="sm">
          더 보기
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {popularGroups?.map((group) => (
          <div
            key={group.id}
            onClick={() => handleGroupDetailRoute(group.id)}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {group.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {group.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <LinkIcon className="w-3 h-3" />
                  <span>{group.linkedLinks.length}개 링크</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{group.bookmarkedUsers.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
