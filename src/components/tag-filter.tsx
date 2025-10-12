import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Tag } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useTagSearchQuery } from "@/hooks/rqhooks/tag/useTagSearchQuery";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  onChange: (value: string | undefined) => void;
}

export default function TagFilter({ onChange }: TagFilterProps) {
  const [tagInputValue, setTagInputValue] = useState("");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [highlightedTagIndex, setHighlightedTagIndex] = useState(0);
  const tagDropdownRef = useRef<HTMLDivElement>(null);

  const debouncedTagValue = useDebounce(tagInputValue, 300);
  const { data: tagSuggestions, isLoading: isTagLoading } = useTagSearchQuery(
    debouncedTagValue,
    5
  );

  // 태그 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tagDropdownRef.current &&
        !tagDropdownRef.current.contains(event.target as Node)
      ) {
        setTagDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 태그 입력 시 드롭다운 열기
  useEffect(() => {
    if (tagInputValue.trim()) {
      setTagDropdownOpen(true);
    }
  }, [tagInputValue]);

  // 태그 제안이 변경되면 하이라이트 인덱스 리셋
  useEffect(() => {
    setHighlightedTagIndex(0);
  }, [tagSuggestions]);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (!tagDropdownOpen) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag(tagInputValue);
      }
      return;
    }

    const suggestions = tagSuggestions || [];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedTagIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedTagIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (suggestions[highlightedTagIndex]) {
          handleSelectTag(suggestions[highlightedTagIndex].name);
        } else {
          handleAddTag(tagInputValue);
        }
        break;
      case "Escape":
        e.preventDefault();
        setTagDropdownOpen(false);
        break;
    }
  };

  const handleSelectTag = (tagName: string) => {
    onChange(tagName);
    setTagInputValue("");
    setTagDropdownOpen(false);
  };

  const handleAddTag = (tagName: string) => {
    if (tagName.trim()) {
      onChange(tagName.trim());
      setTagInputValue("");
      setTagDropdownOpen(false);
    }
  };

  return (
    <div className="flex items-center gap-2 relative" ref={tagDropdownRef}>
      <Tag className="w-3 h-3 text-green-500" />
      <span className="text-xs text-gray-600 whitespace-nowrap">태그:</span>
      <div className="relative">
        <Input
          value={tagInputValue}
          onChange={(e) => setTagInputValue(e.target.value)}
          onKeyDown={handleTagKeyDown}
          onFocus={() => tagInputValue.trim() && setTagDropdownOpen(true)}
          placeholder="태그 검색..."
          className="h-7 px-2 text-xs w-24 border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
          autoComplete="off"
        />

        {tagDropdownOpen && (tagInputValue.trim() || isTagLoading) && (
          <div className="absolute z-50 w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-auto">
            {isTagLoading ? (
              <div className="px-3 py-2 text-xs text-gray-500">검색 중...</div>
            ) : tagSuggestions && tagSuggestions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-gray-500">
                태그를 찾을 수 없음
              </div>
            ) : (
              <>
                {tagSuggestions?.map((tag, index) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={cn(
                      "w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100 flex items-center justify-between transition-colors",
                      highlightedTagIndex === index && "bg-gray-100"
                    )}
                    onClick={() => handleSelectTag(tag.name)}
                    onMouseEnter={() => setHighlightedTagIndex(index)}
                  >
                    <span className="font-medium">#{tag.name}</span>
                    <span className="text-xs text-gray-400">
                      ({tag.usageCount})
                    </span>
                  </button>
                ))}
                {tagInputValue.trim() &&
                  !tagSuggestions?.some(
                    (tag) =>
                      tag.name.toLowerCase() ===
                      tagInputValue.trim().toLowerCase()
                  ) && (
                    <button
                      type="button"
                      className={cn(
                        "w-full px-3 py-1.5 text-left text-xs hover:bg-gray-100 border-t border-gray-200 transition-colors",
                        highlightedTagIndex === (tagSuggestions?.length || 0) &&
                          "bg-gray-100"
                      )}
                      onClick={() => handleAddTag(tagInputValue)}
                      onMouseEnter={() =>
                        setHighlightedTagIndex(tagSuggestions?.length || 0)
                      }
                    >
                      <span className="text-green-600 font-medium">
                        새 태그: #{tagInputValue.trim()}
                      </span>
                    </button>
                  )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
