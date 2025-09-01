import ButtonController from "@/components/button-controller";
import GroupCard from "@/components/group-card";
import { PaginationObserver } from "@/components/pagination-observer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useUserGroupPaginationUtils } from "@/hooks/rqhooks/group/useUserGroupPaginationQuery";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { LinkIcon, Plus } from "lucide-react";

export default function MyGroupPage() {
  const { data: user, isLoading: userLoading, error: userError } = useMeQuery();

  const {
    allGroups,
    hasNextPage,
    fetchNextPage,
    isLoading: groupsLoading,
    error,
  } = useUserGroupPaginationUtils({
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

  // 로딩 상태
  if (groupsLoading) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">그룹을 불러오는 중...</p>
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
            그룹을 불러올 수 없습니다
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
  if (allGroups.length === 0) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LinkIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            아직 저장된 그룹이 없습니다
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            그룹을 만들어보세요. 나중에 쉽게 찾아볼 수 있습니다.
          </p>
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              <Plus className="w-4 h-4 mr-2" />첫 번째 그룹 만들기
            </Button>
          </div>
        </div>
        <ButtonController type="group" />
      </div>
    );
  }

  return (
    <div className="p-6 h-full flex flex-col w-full ">
      {/* 그룹 개수 표시 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">모든 링크</h2>
        <p className="text-gray-600">
          총 {allGroups?.length}개의 링크가 있습니다
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allGroups?.map((group, index) => (
          <GroupCard
            key={index}
            id={group.id}
            title={group.title}
            description={group.description}
            linkCount={group.linkedLinksCount}
            createdDate={group.createdAt}
            ownerAvatar={group.author.profile}
            ownerInitials={group.author.name}
            ownerName={group.author.name}
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
      <ButtonController type="group" />
    </div>
  );
}
