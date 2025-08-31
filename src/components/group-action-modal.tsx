"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import LinkSummaryCard from "./link-summary-card";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLinkPaginationUtils } from "@/hooks/rqhooks/link/useSearchLinkPaginationQuery";
import { PaginationObserver } from "./pagination-observer";
import { Skeleton } from "./ui/skeleton";

type GroupActionModalProps = {
  children: React.ReactNode;
};

export default function GroupActionModal({ children }: GroupActionModalProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectCards, setSelectCards] = useState<
    { id: number; title: string }[]
  >([]);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const {
    allLinks,
    hasNextPage,
    fetchNextPage,
    isLoading: linksLoading,
    error,
  } = useSearchLinkPaginationUtils({
    take: 10,
    order: "ASC",
    keyword: debouncedSearchKeyword,
  });

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    if (step === 2) return;
    setStep((prev) => prev + 1);
  };

  const handleCardSelect = (id: number, title: string) => {
    const goalIdx = selectCards.findIndex((value) => value.id === id);
    if (goalIdx !== -1) {
      setSelectCards((prev) => {
        const newIds = [...prev];
        newIds.splice(goalIdx, 1);
        return newIds;
      });
    } else {
      setSelectCards((prev) => [...prev, { id, title }]);
    }
  };

  const handleModalTriggerClick = () => {
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectCards([]);
    setTimeout(() => {
      setStep(1);
    }, 150);
  };

  // 스켈레톤 카드 컴포넌트
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-20 w-full rounded" />
    </div>
  );

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={handleModalTriggerClick} asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        onCloseButton={handleClose}
        className="sm:max-w-5xl min-h-[600px]"
      >
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Create a new group to share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 flex-1">
          {step === 1 && (
            <>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" />
              </div>

              <div className="grid flex-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="thumbnail" className="h-50" />
              </div>
            </>
          )}
          {step === 2 && (
            <div className="w-full h-[500px] flex flex-col">
              <Input
                onChange={handleInputChange}
                placeholder="링크 검색"
                className="mb-4"
              />

              {/* 선택된 링크들 표시 */}
              {selectCards.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">
                      선택된 링크 ({selectCards.length}개)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectCards.map((link) => (
                      <div
                        key={link.id}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                      >
                        <span className="truncate max-w-32">{link.title}</span>
                        <button
                          onClick={() => handleCardSelect(link.id, link.title)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 min-h-0">
                {linksLoading && (
                  <div className="w-full h-full overflow-auto grid grid-cols-2 gap-5 p-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                )}

                {!linksLoading && !error && (
                  <div className="w-full h-full overflow-auto grid grid-cols-2 gap-5 p-3">
                    {allLinks.map((item) => (
                      <LinkSummaryCard
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        url={item.linkUrl}
                        thumbnailUrl={item.thumbnail}
                        isSelected={Boolean(
                          selectCards.find((prev) => prev.id === item.id)
                        )}
                        onSelect={() => handleCardSelect(item.id, item.title)}
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

                {!linksLoading && error && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-red-600">
                        링크를 불러오는 중 오류가 발생했습니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {step === 1 && <Button onClick={handleNext}>Next</Button>}
          {step === 2 && <Button>Create</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
