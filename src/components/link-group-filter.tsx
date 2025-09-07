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
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface LinkGroupFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  // 필터 상태들
  isBookmarked?: "all" | "bookmarked" | "notBookmarked";
  onBookmarkedChange?: (value: "all" | "bookmarked" | "notBookmarked") => void;
  hasThumbnail?: "all" | "withThumbnail" | "withoutThumbnail";
  onThumbnailChange?: (
    value: "all" | "withThumbnail" | "withoutThumbnail"
  ) => void;
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
  className = "w-full",
  isBookmarked = "all",
  onBookmarkedChange,
  hasThumbnail = "all",
  onThumbnailChange,
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
      startDate !== undefined ||
      endDate !== undefined
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

    return tags;
  };

  return (
    <div className="space-y-3">
      {/* 필터 태그들 */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            적용된 필터:
          </span>
          {getFilterTags().map((tag) => (
            <div
              key={tag.key}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs"
            >
              <span>{tag.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-gray-300 rounded-full"
                onClick={tag.onRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-6 px-2 text-xs text-gray-600 hover:text-gray-800"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              모두 초기화
            </Button>
          )}
        </div>
      )}

      {/* 필터 컨트롤들 */}
      <div className="space-y-6">
        {/* 검색 필터 - 카드 형태 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <Label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-blue-500" />
            검색
          </Label>
          <div id="title" className={`relative ${className}`}>
            <Input
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="pl-10 pr-4 w-full h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md"
              autoComplete="off"
              spellCheck="false"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
        {/* 필터 그룹들 - 각각 카드 형태 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 시작 날짜 필터 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label
              htmlFor="startDate"
              className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              시작 날짜
            </Label>
            <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="startDate"
                  className="w-full justify-between font-normal text-sm h-10 border-gray-300 hover:border-green-500 hover:bg-green-50"
                >
                  {startDate ? startDate.toLocaleDateString() : "날짜 선택"}
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
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
          </div>
          {/* 종료 날짜 필터 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label
              htmlFor="endDate"
              className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              종료 날짜
            </Label>
            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="endDate"
                  className="w-full justify-between font-normal text-sm h-10 border-gray-300 hover:border-red-500 hover:bg-red-50"
                >
                  {endDate ? endDate.toLocaleDateString() : "날짜 선택"}
                  <ChevronDownIcon className="w-4 h-4 text-gray-500" />
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
          {/* 북마크 필터 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label
              htmlFor="bookmark"
              className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
            >
              <Bookmark className="w-4 h-4 text-yellow-500" />
              북마크 상태
            </Label>
            <Select value={isBookmarked} onValueChange={onBookmarkedChange}>
              <SelectTrigger
                id="bookmark"
                className="w-full h-10 border-gray-300 hover:border-yellow-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              >
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="bookmarked">북마크된 것만</SelectItem>
                <SelectItem value="notBookmarked">북마크 안된 것만</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* 썸네일 필터 */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label
              htmlFor="thumbnail"
              className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
            >
              <Image className="w-4 h-4 text-purple-500" />
              썸네일 상태
            </Label>
            <Select value={hasThumbnail} onValueChange={onThumbnailChange}>
              <SelectTrigger
                id="thumbnail"
                className="w-full h-10 border-gray-300 hover:border-purple-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="withThumbnail">썸네일 있는 것만</SelectItem>
                <SelectItem value="withoutThumbnail">
                  썸네일 없는 것만
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 초기화 버튼 - 카드 형태 */}
        {onReset && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-center md:justify-end">
              <Button
                variant="outline"
                onClick={onReset}
                className="w-full md:w-auto flex items-center gap-2 h-10 border-gray-300 hover:border-gray-500 hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4" />
                모든 필터 초기화
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default LinkGroupFilter;
