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
import { Spinner } from "./ui/spinner";

type GroupActionModalProps = {
  children: React.ReactNode;
};

export default function GroupActionModal({ children }: GroupActionModalProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
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

  const handleModalTriggerClick = () => {
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
    }, 150);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={handleModalTriggerClick} asChild>
        {children}
      </DialogTrigger>
      <DialogContent onCloseButton={handleClose} className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Create a new group to share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  gap-2">
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
            <div>
              <Input onChange={handleInputChange} placeholder="링크 검색" />
              {linksLoading && (
                <div className="p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Spinner size="lg" className="mx-auto mb-4" />
                    <p className="text-gray-600">링크를 불러오는 중...</p>
                  </div>
                </div>
              )}
              {!linksLoading && !error && (
                <div className="w-full h-96  overflow-auto  grid grid-cols-2 gap-5 p-3 mt-10">
                  {allLinks.map((item) => (
                    <LinkSummaryCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      url={item.linkUrl}
                      thumbnailUrl={item.thumbnail}
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
