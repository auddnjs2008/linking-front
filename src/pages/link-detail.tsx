import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LinkDetailPage() {
  // 임시 데이터 - 실제로는 props나 API에서 받아올 데이터
  const linkData = {
    id: 1,
    title: "The Complete Guide to Modern UI/UX Design Principles",
    description:
      "This comprehensive guide covers all the essential principles of modern UI/UX design, from user research and wireframing to prototyping and user testing. Learn how to create intuitive, accessible, and visually appealing digital experiences that users love.",
    thumbnailUrl: "https://picsum.photos/800/400?random=1",
    url: "https://example.com/design-guide",
    author: {
      name: "Sarah Johnson",
      avatar: "https://github.com/shadcn.png",
    },
    createdAt: "2024-01-15",
    tags: ["UI/UX", "Design", "Web Design", "User Experience"],
    readTime: "8 min read",
    category: "Design",
  };

  return (
    <div className="p-6 h-full flex flex-col w-full max-w-6xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-gray-600 hover:text-gray-900"
          onClick={() => window.history.back()}
        >
          ← Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 메인 컨텐츠 영역 */}
        <div className="lg:col-span-2">
          {/* 헤더 섹션 */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {linkData.category}
              </span>
              <span className="text-gray-500 text-sm">{linkData.readTime}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {linkData.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {linkData.description}
            </p>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-6">
              {linkData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 썸네일 이미지 */}
          <div className="mb-8">
            <img
              src={linkData.thumbnailUrl}
              alt={linkData.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* 외부 링크 컨텐츠 영역 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                External Content Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500 mb-4">
                  <div className="text-2xl mb-2">🔗</div>
                  <p className="text-sm">
                    External content will be displayed here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    This could be an iframe, embedded content, or preview
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => window.open(linkData.url, "_blank")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Open External Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* 작성자 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={linkData.author.avatar}
                      alt={linkData.author.name}
                    />
                    <AvatarFallback>
                      {linkData.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900">
                      {linkData.author.name}
                    </div>
                    <div className="text-sm text-gray-500">Design Expert</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 링크 정보 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Link Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Added</span>
                  <span className="font-medium">{linkData.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Read time</span>
                  <span className="font-medium">{linkData.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{linkData.category}</span>
                </div>
              </CardContent>
            </Card>

            {/* 액션 버튼들 */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open(linkData.url, "_blank")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Visit External Link
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Link
                  </Button>
                  <Button variant="outline" className="w-full">
                    Add to Bookmarks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
