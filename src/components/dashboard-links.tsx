import { usePopularLinkQuery } from "@/hooks/rqhooks/link/usePopularLinkQuery";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bookmark, Eye, TrendingUp, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardLinks() {
  const { data: popularLinks, isLoading, error } = usePopularLinkQuery();
  const navigate = useNavigate();

  const handleLinkRoute = () => {
    navigate("/links");
  };

  const handleLinkDetailRoute = (id: number) => {
    navigate(`/links/${id}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <CardTitle className="text-lg font-semibold">
              🔥 인기 링크
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
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
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
            <TrendingUp className="w-5 h-5 text-red-500" />
            <CardTitle className="text-lg font-semibold">
              🔥 인기 링크
            </CardTitle>
          </div>
          <Button onClick={handleLinkRoute} variant="outline" size="sm">
            더 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              인기 링크를 불러올 수 없습니다
            </h3>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!popularLinks || popularLinks.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            <CardTitle className="text-lg font-semibold">
              🔥 인기 링크
            </CardTitle>
          </div>
          <Button onClick={handleLinkRoute} variant="outline" size="sm">
            더 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              아직 인기 링크가 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              링크를 추가하고 북마크를 받아보세요!
            </p>
            <Button onClick={handleLinkRoute} variant="outline">
              링크 보러가기
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
          <TrendingUp className="w-5 h-5 text-red-500" />
          <CardTitle className="text-lg font-semibold">🔥 인기 링크</CardTitle>
        </div>
        <Button onClick={handleLinkRoute} variant="outline" size="sm">
          더 보기
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {popularLinks?.map((link) => (
          <div
            onClick={() => handleLinkDetailRoute(link.id)}
            key={link.id}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <img
              src={link.thumbnail}
              alt={link.title}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {link.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {link.description}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>{link.views}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Bookmark className="w-3 h-3" />
                  <span>{link.bookmarkedUsers.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
