import LinkCard from "@/components/link-card";
import { PaginationObserver } from "@/components/pagination-observer";
import ButtonController from "@/components/button-controller";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { useUserLinkPaginationUtils } from "@/hooks/rqhooks/link/useUserLinkPaginationQuery";
import { Spinner } from "@/components/ui/spinner";
import { LinkIcon, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateLinkMutation } from "@/hooks/rqhooks/link/useCreateLinkMutation";
import LinkActionModal from "@/components/link-action-modal";
import LinkGroupFilter from "@/components/link-group-filter";
import { useViewMode } from "@/contexts/ViewModeContext";
import { useDebounce } from "@/hooks/useDebounce";
import type { BookmarkFilter, ThumbnailFilter } from "@/types/link";

export default function LinkMe() {
  const { data: user, isLoading: userLoading, error: userError } = useMeQuery();
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { viewMode } = useViewMode();

  const { mutate: createLink, isPending } = useCreateLinkMutation();

  // 검색 키워드가 있는지 확인
  const isSearching = debouncedSearchKeyword.trim().length > 0;

  //filter 관련

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isBookmarked, setIsBookmarked] = useState<BookmarkFilter>("all");
  const [hasThumbnail, setHasThumbnail] = useState<ThumbnailFilter>("all");

  const handleDateChange = (type: "start" | "end") => (date?: Date) => {
    if (type === "start") {
      setStartDate(date ? date.toISOString().split("T")[0] : "");
    } else {
      setEndDate(date ? date.toISOString().split("T")[0] : "");
    }
  };

  const handleBookmarkedChange = (filterStatus: BookmarkFilter) => {
    setIsBookmarked(filterStatus);
  };

  const handleThumbnailChange = (filterStatus: ThumbnailFilter) => {
    setHasThumbnail(filterStatus);
  };

  // 필터 상태를 적절한 타입으로 변환
  const getBookmarkedFilter = (): boolean | undefined => {
    if (isBookmarked === "all") return undefined;
    return isBookmarked === "bookmarked";
  };

  const getThumbnailFilter = (): boolean | undefined => {
    if (hasThumbnail === "all") return undefined;
    return hasThumbnail === "withThumbnail";
  };

  const getStartDateFilter = (): string | undefined => {
    return startDate.trim() === "" ? undefined : startDate;
  };

  const getEndDateFilter = (): string | undefined => {
    return endDate.trim() === "" ? undefined : endDate;
  };

  const {
    allLinks,
    hasNextPage,
    fetchNextPage,
    isLoading: linksLoading,
    error: linksError,
  } = useUserLinkPaginationUtils({
    userId: user?.id,
    take: 10,
    order: "ASC",
    keyword: debouncedSearchKeyword,
    startDate: getStartDateFilter(),
    endDate: getEndDateFilter(),
    isBookmarked: getBookmarkedFilter(),
    hasThumbnail: getThumbnailFilter(),
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

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* 헤더 및 검색 - 항상 렌더링하여 포커스 유지 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {isSearching ? `"${debouncedSearchKeyword}" 검색 결과` : "내 링크"}
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
          startDate={startDate ? new Date(startDate) : undefined}
          endDate={endDate ? new Date(endDate) : undefined}
          hasThumbnail={hasThumbnail}
          isBookmarked={isBookmarked}
          onBookmarkedChange={handleBookmarkedChange}
          onStartDateChange={handleDateChange("start")}
          onEndDateChange={handleDateChange("end")}
          onThumbnailChange={handleThumbnailChange}
          className="max-w-md"
        />

        <p className="text-gray-600 mt-2">
          {isSearching
            ? `검색 결과 ${allLinks.length}개의 링크를 찾았습니다`
            : `총 ${allLinks.length}개의 링크가 있습니다`}
        </p>
      </div>

      {/* 로딩 상태 - 인라인으로 처리하여 화면 끊김 방지 */}
      {linksLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">
              {isSearching ? "검색 중..." : "내 링크를 불러오는 중..."}
            </p>
          </div>
        </div>
      ) : allLinks.length === 0 ? (
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
                : "아직 저장된 링크가 없습니다"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {isSearching
                ? "다른 키워드로 검색해보거나 검색을 초기화해보세요."
                : "흥미로운 링크를 발견했다면 저장해보세요. 나중에 쉽게 찾아볼 수 있습니다."}
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
                className="w-full"
                size="lg"
                onClick={() => setCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />첫 번째 링크 저장하기
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* 링크 목록 - 정상 상태 */
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {allLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              thumbnailUrl={
                link.thumbnail ??
                `https://picsum.photos/200/300?random=${link.id}`
              }
              title={link.title}
              linkUrl={link.linkUrl}
              tags={link.tags}
              description={link.description}
              author={link.author}
              isBookmarked={link.isBookmarked}
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

      <ButtonController type="link" />
      <LinkActionModal
        mode="create"
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        isPending={isPending}
        onSubmit={(input) => createLink(input)}
      />
    </div>
  );
}
