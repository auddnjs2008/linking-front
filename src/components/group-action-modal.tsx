"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import LinkSummaryCard from "./link-summary-card";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchLinkPaginationUtils } from "@/hooks/rqhooks/link/useSearchLinkPaginationQuery";
import { PaginationObserver } from "./pagination-observer";
import { Skeleton } from "./ui/skeleton";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InlineSpinner } from "./ui/spinner";

type Inputs = {
  title: string;
  description: string;
  selectedLinks: { id: number; title: string }[];
};

const schema = z.object({
  title: z.string().min(5, "타이틀은 5자 이상이어야 합니다."),
  description: z.string().min(10, "설명은 10자 이상이어야 합니다."),
  selectedLinks: z
    .array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .min(1, "최소 1개의 링크를 선택해야 합니다."),
});

type GroupActionModalProps = {
  mode: "create" | "edit";
  open: boolean;
  handleClose: () => void;
  initalData?: Inputs;
  isPending?: boolean;
  onSubmit: (data: Inputs) => void;
};

export default function GroupActionModal({
  mode,
  open,
  handleClose,
  onSubmit,
  initalData,
  isPending,
}: GroupActionModalProps) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectCards, setSelectCards] = useState<
    { id: number; title: string }[]
  >([]);
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Group" : "Create Group";
  const description = isEditMode
    ? "Edit Group."
    : "Create a new group to share with others.";

  const submitText = isEditMode ? "Update" : "Create";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: initalData || {
      title: "",
      description: "",
      selectedLinks: [],
    },
  });

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

  const handleNext = () => {
    if (step === 2) return;
    setStep((prev) => prev + 1);
  };

  const handleCardSelect = (id: number, title: string) => {
    const goalIdx = selectCards.findIndex((value) => value.id === id);
    let newSelectCards;

    if (goalIdx !== -1) {
      newSelectCards = selectCards.filter((_, index) => index !== goalIdx);
    } else {
      newSelectCards = [...selectCards, { id, title }];
    }

    setSelectCards(newSelectCards);
    setValue("selectedLinks", newSelectCards);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value);
  };

  useEffect(() => {
    if (mode === "create" || !initalData) return;
    setSelectCards(initalData.selectedLinks);
  }, [mode, initalData]);

  useEffect(() => {
    if (open) return;
    setStep(1);
  }, [open]);

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
      <DialogContent
        onCloseButton={handleClose}
        className="sm:max-w-5xl min-h-[600px]"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          id="group-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 flex-1"
        >
          {step === 1 && (
            <>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="grid flex-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  className="h-50"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
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
                          type="button"
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

              {/* 선택된 링크 에러 메시지 */}
              {errors.selectedLinks && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    {errors.selectedLinks.message}
                  </p>
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
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {step === 1 && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
          {step === 2 && (
            <>
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
              >
                Back
              </Button>
              <Button type="submit" disabled={isPending} form="group-form">
                {isPending && <InlineSpinner />}
                {submitText}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
