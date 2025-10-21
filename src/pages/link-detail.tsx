import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { useLinkDetailQuery } from "@/hooks/rqhooks/link/useLinkDetailQuery";
import { useBookmarkMutation } from "@/hooks/rqhooks/link/useBookmarkMutation";
import { useUnBookmarkMutation } from "@/hooks/rqhooks/link/useUnBookmarkMutation";
import CommentSection from "@/components/comment-section";
import { EyeIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function LinkDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;

  const { data: linkData } = useLinkDetailQuery(id || -1);
  const { mutate: bookmark } = useBookmarkMutation();
  const { mutate: unbookmark } = useUnBookmarkMutation();

  const handleBookmark = () => {
    if (!id) return;
    bookmark({ id });
  };

  const handleUnBookmark = () => {
    if (!id) return;
    unbookmark({ id });
  };

  if (!id) {
    return (
      <>
        <Helmet>
          <title>링크를 찾을 수 없습니다 - Linking</title>
        </Helmet>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            링크 ID가 필요합니다
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {linkData ? `${linkData.title} - Linking` : "링크 상세 - Linking"}
        </title>
        <meta
          name="description"
          content={linkData?.description || "링크 상세 정보를 확인하세요"}
        />
      </Helmet>
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
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {linkData?.tags[0]}
                </span>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <EyeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {linkData?.views?.toLocaleString() || 0}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {linkData?.title}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {linkData?.description}
              </p>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {linkData?.tags.map((tag, index) => (
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
                src={linkData?.thumbnail}
                alt={linkData?.title}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* 댓글 섹션 */}
            <CommentSection />
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* 작성자 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Author
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={linkData?.user.profile}
                        alt={linkData?.user.name}
                      />
                      <AvatarFallback>
                        {linkData?.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">
                        {linkData?.user.name}
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
                    <span className="font-medium">
                      {linkData?.createdAt.split("T")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{linkData?.tags[0]}</span>
                  </div>
                </CardContent>
              </Card>

              {/* 액션 버튼들 */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.open(linkData?.linkUrl, "_blank")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Visit External Link
                    </Button>
                    <Button variant="outline" className="w-full">
                      Share Link
                    </Button>
                    <Button
                      onClick={
                        linkData?.isBookmarked
                          ? handleUnBookmark
                          : handleBookmark
                      }
                      variant="outline"
                      className="w-full"
                    >
                      {linkData?.isBookmarked
                        ? "Remove to Bookmarks"
                        : "Add to Bookmarks"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
