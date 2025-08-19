import LinkCard from "@/components/link-card";
import { PaginationObserver } from "@/components/pagination-observer";
import { useLinkPaginationUtils } from "@/hooks/rqhooks/link/useLinkPaginationQuery";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Plus, Link as LinkIcon } from "lucide-react";

export default function Home() {
  const { allLinks, hasNextPage, fetchNextPage, isLoading, error } =
    useLinkPaginationUtils(10, "ASC");

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">링크를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            링크를 불러올 수 없습니다
          </h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  // 빈 상태 (데이터가 없을 때)
  if (allLinks.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LinkIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            아직 저장된 링크가 없습니다
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            흥미로운 링크를 발견했다면 저장해보세요. 나중에 쉽게 찾아볼 수
            있습니다.
          </p>
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />첫 번째 링크 저장하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* 링크 개수 표시 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">모든 링크</h2>
        <p className="text-gray-600">
          총 {allLinks.length}개의 링크가 있습니다
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allLinks.map((link) => (
          <LinkCard
            key={link.id}
            id={link.id}
            thumbnailUrl={
              link.thumbnail ??
              `https://picsum.photos/200/300?random=${link.id}`
            }
            title={link.title}
            description={link.description}
            author={link.author}
            isBookmarked={link.isBookmarked}
          />
        ))}

        {/* 페이지네이션 옵저버 */}
        {hasNextPage && (
          <PaginationObserver
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </div>
  );
}
