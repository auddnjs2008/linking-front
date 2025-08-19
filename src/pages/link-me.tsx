import LinkCard from "@/components/link-card";
import ButtonController from "@/components/button-controller";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { useUserLinkPaginationUtils } from "@/hooks/rqhooks/link/useUserLinkPaginationQuery";
import { Spinner } from "@/components/ui/spinner";
import { LinkIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LinkMe() {
  const { data: user, isLoading: userLoading, error: userError } = useMeQuery();

  const {
    allLinks,
    isLoading: linksLoading,
    error: linksError,
    isFetchingNextPage,
  } = useUserLinkPaginationUtils({
    userId: user?.id,
    take: 10,
    order: "ASC",
  });

  // 사용자 정보 로딩 중
  if (userLoading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 사용자 정보 에러
  if (userError) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            사용자 정보를 불러올 수 없습니다
          </h3>
          <p className="text-gray-600 mb-4">{userError.message}</p>
        </div>
      </div>
    );
  }

  // 사용자가 로그인하지 않음
  if (!user) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔒</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            로그인이 필요합니다
          </h3>
          <p className="text-gray-600 mb-6">
            내 링크를 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    );
  }

  // 링크 로딩 중
  if (linksLoading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">내 링크를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 링크 에러
  if (linksError) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            링크를 불러올 수 없습니다
          </h3>
          <p className="text-gray-600 mb-4">{linksError.message}</p>
        </div>
      </div>
    );
  }

  // 빈 상태 (링크가 없음)
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
        <ButtonController type="link" />
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">내 링크</h2>
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
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <Spinner size="md" />
        </div>
      )}

      <ButtonController type="link" />
    </div>
  );
}
