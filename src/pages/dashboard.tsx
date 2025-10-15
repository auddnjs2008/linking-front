import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Eye,
  Bookmark,
  Tag,
  Users,
  Link as LinkIcon,
  FolderOpen,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  // Mock data - 실제로는 API에서 가져올 데이터
  const popularLinks = [
    {
      id: 1,
      title: "React 18 New Features",
      description:
        "Complete guide to React 18's new features including concurrent rendering",
      linkUrl: "https://react.dev",
      thumbnail: "https://picsum.photos/200/300?random=1",
      tags: ["React", "JavaScript", "Frontend"],
      author: {
        id: 1,
        name: "John Doe",
        profile: "https://picsum.photos/50/50?random=1",
      },
      isBookmarked: false,
    },
    {
      id: 2,
      title: "TypeScript Best Practices",
      description:
        "Advanced TypeScript patterns and best practices for large applications",
      linkUrl: "https://typescript.dev",
      thumbnail: "https://picsum.photos/200/300?random=2",
      tags: ["TypeScript", "JavaScript", "Development"],
      author: {
        id: 2,
        name: "Jane Smith",
        profile: "https://picsum.photos/50/50?random=2",
      },
      isBookmarked: true,
    },
  ];

  const popularGroups = [
    {
      id: 1,
      title: "Frontend Development",
      description: "Collection of the best frontend development resources",
      linkedLinks: [
        { id: 1, title: "React Guide" },
        { id: 2, title: "Vue Tutorial" },
      ],
      createdDate: "2024-01-15",
      author: {
        id: 1,
        name: "John Doe",
        profile: "https://picsum.photos/50/50?random=1",
      },
      isBookmarked: false,
    },
    {
      id: 2,
      title: "Design Resources",
      description: "Curated design tools and inspiration",
      linkedLinks: [
        { id: 3, title: "Figma Tips" },
        { id: 4, title: "Color Palettes" },
      ],
      createdDate: "2024-01-20",
      author: {
        id: 2,
        name: "Jane Smith",
        profile: "https://picsum.photos/50/50?random=2",
      },
      isBookmarked: true,
    },
  ];

  const trendingTags = [
    { name: "React", count: 156 },
    { name: "JavaScript", count: 142 },
    { name: "TypeScript", count: 98 },
    { name: "Design", count: 87 },
    { name: "Frontend", count: 76 },
    { name: "Vue", count: 65 },
    { name: "CSS", count: 54 },
    { name: "Node.js", count: 43 },
  ];

  const globalStats = {
    totalLinks: 1247,
    totalGroups: 89,
    totalUsers: 234,
    todayLinks: 23,
  };

  return (
    <div className="p-6 h-full flex flex-col w-full max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📈 Dashboard</h1>
        <p className="text-gray-600 text-lg">
          플랫폼의 트렌드와 인기 콘텐츠를 확인해보세요
        </p>
      </div>

      {/* 전체 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 링크</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {globalStats.totalLinks.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">전체 저장된 링크</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 그룹</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {globalStats.totalGroups.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">생성된 그룹</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {globalStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">가입한 사용자</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 추가</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalStats.todayLinks}</div>
            <p className="text-xs text-muted-foreground">오늘 추가된 링크</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 인기 링크 섹션 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <CardTitle className="text-lg font-semibold">
                🔥 인기 링크
              </CardTitle>
            </div>
            <Button variant="outline" size="sm">
              더 보기
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
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
                      <span>1,234</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Bookmark className="w-3 h-3" />
                      <span>89</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 인기 그룹 섹션 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-500" />
              <CardTitle className="text-lg font-semibold">
                📁 인기 그룹
              </CardTitle>
            </div>
            <Button variant="outline" size="sm">
              더 보기
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
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
                      <span>24명</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 트렌딩 태그 섹션 */}
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
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <Button
                key={tag.name}
                variant="outline"
                size="sm"
                className={`h-8 px-3 text-sm ${
                  index < 3
                    ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 hover:bg-green-200"
                    : "hover:bg-gray-100"
                }`}
              >
                #{tag.name}
                <span className="ml-1 text-xs opacity-70">({tag.count})</span>
              </Button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            💡 인기 태그를 클릭하면 해당 태그로 필터링된 링크를 볼 수 있습니다
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
