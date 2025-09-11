import ButtonController from "@/components/button-controller";
import GroupActionModal from "@/components/group-action-modal";
import GroupCard from "@/components/group-card";
import { PaginationObserver } from "@/components/pagination-observer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateGroupMutation } from "@/hooks/rqhooks/group/useCreateGroupMutation";
import { useUserGroupPaginationUtils } from "@/hooks/rqhooks/group/useUserGroupPaginationQuery";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import LinkGroupFilter from "@/components/link-group-filter";
import { LinkIcon, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { useViewMode } from "@/contexts/ViewModeContext";
import { useDebounce } from "@/hooks/useDebounce";
import type { BookmarkFilter } from "@/types/link";
import { formatDateToKorean } from "@/utils/formatDateToKorean";

export default function MyGroupPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const { viewMode } = useViewMode();

  const { data: user, isLoading: userLoading, error: userError } = useMeQuery();

  const { mutate: createGroup, isPending } = useCreateGroupMutation();

  // 검색 키워드가 있는지 확인
  const isSearching = debouncedSearchKeyword.trim().length > 0;

  //filter 관련
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isBookmarked, setIsBookmarked] = useState<BookmarkFilter>("all");

  const handleDateChange = (type: "start" | "end") => (date?: Date) => {
    if (type === "start") {
      setStartDate(date ? formatDateToKorean(date) : "");
    } else {
      setEndDate(date ? formatDateToKorean(date) : "");
    }
  };

  const handleBookmarkedChange = (filterStatus: BookmarkFilter) => {
    setIsBookmarked(filterStatus);
  };
  const getBookmarkedFilter = (): boolean | undefined => {
    if (isBookmarked === "all") return undefined;
    return isBookmarked === "bookmarked";
  };
  const getStartDateFilter = (): string | undefined => {
    return startDate.trim() === "" ? undefined : startDate;
  };

  const getEndDateFilter = (): string | undefined => {
    return endDate.trim() === "" ? undefined : endDate;
  };

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
    keyword: debouncedSearchKeyword,
    startDate: getStartDateFilter(),
    endDate: getEndDateFilter(),
    isBookmarked: getBookmarkedFilter(),
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

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* 헤더 및 검색 - 항상 렌더링하여 포커스 유지 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSearching ? `"${debouncedSearchKeyword}" 검색 결과` : "내 그룹"}
          </h2>
          {isSearching && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchKeyword("")}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              검색 초기화
            </Button>
          )}
        </div>

        {/* 검색 입력 필드 - 항상 렌더링 */}
        <LinkGroupFilter
          value={searchKeyword}
          onChange={setSearchKeyword}
          placeholder="그룹 제목으로 검색..."
          startDate={startDate ? new Date(startDate) : undefined}
          endDate={endDate ? new Date(endDate) : undefined}
          isBookmarked={isBookmarked}
          onBookmarkedChange={handleBookmarkedChange}
          onStartDateChange={handleDateChange("start")}
          onEndDateChange={handleDateChange("end")}
          className="max-w-md"
        />

        <p className="text-gray-600 mt-2">
          {isSearching
            ? `검색 결과 ${allGroups.length}개의 그룹을 찾았습니다`
            : `총 ${allGroups.length}개의 그룹이 있습니다`}
        </p>
      </div>

      {/* 로딩 상태 - 인라인으로 처리하여 화면 끊김 방지 */}
      {groupsLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">
              {isSearching ? "검색 중..." : "내 그룹을 불러오는 중..."}
            </p>
          </div>
        </div>
      ) : allGroups.length === 0 ? (
        /* 빈 상태 메시지 - 인라인으로 처리 */
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {isSearching ? (
                <Search className="w-10 h-10 text-gray-400" />
              ) : (
                <LinkIcon className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {isSearching
                ? `"${debouncedSearchKeyword}"에 대한 검색 결과가 없습니다`
                : "아직 저장된 그룹이 없습니다"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {isSearching
                ? "다른 키워드로 검색해보거나 검색을 초기화해보세요."
                : "그룹을 만들어보세요. 나중에 쉽게 찾아볼 수 있습니다."}
            </p>
            {isSearching ? (
              <Button
                variant="outline"
                onClick={() => setSearchKeyword("")}
                className="mr-2"
              >
                검색 초기화
              </Button>
            ) : (
              <Button
                onClick={() => setCreateModalOpen(true)}
                className="w-full"
                size="lg"
              >
                <Plus className="w-4 h-4 mr-2" />첫 번째 그룹 만들기
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* 그룹 목록 - 정상 상태 */
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {allGroups.map((group, index) => (
            <GroupCard
              key={index}
              id={group.id}
              title={group.title}
              description={group.description}
              linkedLinks={group.linkedLinks}
              createdDate={group.createdAt}
              author={group.author}
              isBookmarked={group.isBookmarked}
              viewMode={viewMode}
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
      )}

      <ButtonController type="group" />
      <GroupActionModal
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        isPending={isPending}
        mode="create"
        onSubmit={(input) => {
          createGroup({
            title: input.title,
            description: input.description,
            linkIds: input.selectedLinks.map((l) => l.id),
          });
        }}
      />
    </div>
  );
}
