import { usePopularTagQuery } from "@/hooks/rqhooks/tag/usePopularTagQuery";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tag } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardTags() {
  const { data: trendingTags, isLoading, error } = usePopularTagQuery();
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    navigate(`/links?tag=${encodeURIComponent(tag)}`);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg font-semibold">
              🏷️ 트렌딩 태그
            </CardTitle>
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-20 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
          <div className="mt-4 h-4 w-full bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg font-semibold">
              🏷️ 트렌딩 태그
            </CardTitle>
          </div>
          <Button variant="outline" size="sm">
            전체 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              트렌딩 태그를 불러올 수 없습니다
            </h3>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!trendingTags || trendingTags.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-500" />
            <CardTitle className="text-lg font-semibold">
              🏷️ 트렌딩 태그
            </CardTitle>
          </div>
          <Button variant="outline" size="sm">
            전체 보기
          </Button>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              아직 트렌딩 태그가 없습니다
            </h3>
            <p className="text-gray-600 mb-4">링크에 태그를 추가해보세요!</p>
            <Button onClick={() => navigate("/links")} variant="outline">
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
          <Tag className="w-5 h-5 text-green-500" />
          <CardTitle className="text-lg font-semibold">
            🏷️ 트렌딩 태그
          </CardTitle>
        </div>
        {/* <Button variant="outline" size="sm">
          전체 보기
        </Button> */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {trendingTags?.map((tag, index) => (
            <Button
              key={tag.name}
              variant="outline"
              onClick={() => handleTagClick(tag.name)}
              size="sm"
              className={`h-8 px-3 text-sm ${
                index < 3
                  ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 hover:bg-green-200"
                  : "hover:bg-gray-100"
              }`}
            >
              #{tag.name}
              <span className="ml-1 text-xs opacity-70">
                ({tag.usageCount})
              </span>
            </Button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          💡 인기 태그를 클릭하면 해당 태그로 필터링된 링크를 볼 수 있습니다
        </div>
      </CardContent>
    </Card>
  );
}
