import { Input } from "./ui/input";
import {
  ChevronDownIcon,
  Search,
  Bookmark,
  Image,
  RotateCcw,
  X,
} from "lucide-react";
import { memo, useState } from "react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { BookmarkFilter, ThumbnailFilter } from "@/types/link";
import TagFilter from "./tag-filter";

interface LinkGroupFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  // 필터 상태들
  isBookmarked?: BookmarkFilter;
  onBookmarkedChange?: (value: BookmarkFilter) => void;
  hasThumbnail?: ThumbnailFilter;
  onThumbnailChange?: (value: ThumbnailFilter) => void;
  tagKeyword?: string;
  onTagFilterChange?: (value: string | undefined) => void;
  // 내가 생성한 글만 보기
  createdByMe?: boolean;
  onCreatedByMeChange?: (value: boolean) => void;

  // 날짜 필터들
  startDate?: Date | undefined;
  onStartDateChange?: (date: Date | undefined) => void;
  endDate?: Date | undefined;
  onEndDateChange?: (date: Date | undefined) => void;
  // 초기화 함수
  onReset?: () => void;
}

const LinkGroupFilter = memo(function LinkGroupFilter({
  value,
  onChange,
  placeholder = "링크 제목으로 검색...",
  isBookmarked = "all",
  onBookmarkedChange,
  hasThumbnail = "all",
  onThumbnailChange,
  tagKeyword,
  onTagFilterChange,
  createdByMe = false,
  onCreatedByMeChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onReset,
}: LinkGroupFilterProps) {
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // 필터 태그들을 위한 헬퍼 함수들
  const hasActiveFilters = () => {
    return (
      value.trim() !== "" ||
      isBookmarked !== "all" ||
      hasThumbnail !== "all" ||
      createdByMe === true ||
      startDate !== undefined ||
      endDate !== undefined ||
      tagKeyword !== undefined
    );
  };

  const getFilterTags = () => {
    const tags = [];

    if (value.trim() !== "") {
      tags.push({
        key: "search",
        label: `검색: "${value}"`,
        onRemove: () => onChange(""),
      });
    }

    if (isBookmarked !== "all") {
      const label = isBookmarked === "bookmarked" ? "북마크됨" : "북마크 안됨";
      tags.push({
        key: "bookmark",
        label: `북마크: ${label}`,
        onRemove: () => onBookmarkedChange?.("all"),
      });
    }

    if (hasThumbnail !== "all") {
      const label =
        hasThumbnail === "withThumbnail" ? "썸네일 있음" : "썸네일 없음";
      tags.push({
        key: "thumbnail",
        label: `썸네일: ${label}`,
        onRemove: () => onThumbnailChange?.("all"),
      });
    }

    if (createdByMe) {
      tags.push({
        key: "createdByMe",
        label: "내가 만든 것만",
        onRemove: () => onCreatedByMeChange?.(false),
      });
    }

    if (startDate) {
      tags.push({
        key: "startDate",
        label: `시작: ${startDate.toLocaleDateString()}`,
        onRemove: () => onStartDateChange?.(undefined),
      });
    }

    if (endDate) {
      tags.push({
        key: "endDate",
        label: `종료: ${endDate.toLocaleDateString()}`,
        onRemove: () => onEndDateChange?.(undefined),
      });
    }

    if (tagKeyword) {
      tags.push({
        key: "tagKeyword",
        label: `태그 : ${tagKeyword}`,
        onRemove: () => onTagFilterChange?.(undefined),
      });
    }

    return tags;
  };

  return (
    <div className="space-y-4">
      {/* 검색 필터 - 간단한 형태 */}
      <div className="relative">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 w-full h-9 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md text-sm"
          autoComplete="off"
          spellCheck="false"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* 필터 컨트롤들 - 한 줄에 배치 */}
      <div className="flex flex-wrap items-center gap-4">
        {/* 날짜 필터 그룹 */}
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600 whitespace-nowrap">날짜:</span>
          <div className="flex items-center gap-1">
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs font-normal border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                >
                  {startDate ? startDate.toLocaleDateString() : "시작"}
                  <ChevronDownIcon className="w-3 h-3 ml-1 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    onStartDateChange?.(date);
                    setStartDateOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <span className="text-xs text-gray-400">~</span>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs font-normal border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                >
                  {endDate ? endDate.toLocaleDateString() : "종료"}
                  <ChevronDownIcon className="w-3 h-3 ml-1 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={endDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    onEndDateChange?.(date);
                    setEndDateOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 북마크 필터 */}
        <div className="flex items-center gap-2">
          <Bookmark className="w-3 h-3 text-yellow-500" />
          <span className="text-xs text-gray-600 whitespace-nowrap">
            북마크:
          </span>
          <Select value={isBookmarked} onValueChange={onBookmarkedChange}>
            <SelectTrigger className="h-7 px-2 min-w-[90px] text-xs border-gray-300 hover:border-yellow-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="bookmarked">북마크됨</SelectItem>
              <SelectItem value="notBookmarked">북마크 안됨</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 내가 만든 것만 */}
        {onCreatedByMeChange && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="createdByMe"
              checked={createdByMe}
              onCheckedChange={(checked) =>
                onCreatedByMeChange(Boolean(checked))
              }
            />
            <label
              htmlFor="createdByMe"
              className="text-xs text-gray-600 whitespace-nowrap select-none"
            >
              내가 만든 것만
            </label>
          </div>
        )}

        {/* 썸네일 필터 */}
        {onThumbnailChange && (
          <div className="flex items-center gap-2">
            <Image className="w-3 h-3 text-purple-500" />
            <span className="text-xs text-gray-600 whitespace-nowrap">
              썸네일:
            </span>
            <Select value={hasThumbnail} onValueChange={onThumbnailChange}>
              <SelectTrigger className="h-7 px-2 min-w-[90px] text-xs border-gray-300 hover:border-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="withThumbnail">썸네일 있음</SelectItem>
                <SelectItem value="withoutThumbnail">썸네일 없음</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 태그 필터 */}
        {onTagFilterChange && <TagFilter onChange={onTagFilterChange} />}

        {/* 초기화 버튼 */}
        {onReset && hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 px-2 text-xs text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            초기화
          </Button>
        )}
      </div>

      {/* 활성 필터 태그들 */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
          <span className="text-xs text-gray-500 mr-2">활성 필터:</span>
          {getFilterTags().map((tag) => (
            <div
              key={tag.key}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs border border-blue-200"
            >
              <span>{tag.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 p-0 hover:bg-blue-200 rounded-full"
                onClick={tag.onRemove}
              >
                <X className="h-2 w-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default LinkGroupFilter;
