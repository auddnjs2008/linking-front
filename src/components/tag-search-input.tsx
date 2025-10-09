import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useTagSearchQuery } from "@/hooks/rqhooks/tag/useTagSearchQuery";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type TagSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAddTag: (tag: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function TagSearchInput({
  value,
  onChange,
  onAddTag,
  disabled = false,
  placeholder = "Search tags or create new...",
}: TagSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(value, 300);
  const { data: tags, isLoading } = useTagSearchQuery(debouncedValue, 10);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open dropdown when typing
  useEffect(() => {
    if (value.trim()) {
      setIsOpen(true);
    }
  }, [value]);

  // Reset highlighted index when results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [tags]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag(value);
      }
      return;
    }

    const suggestions = getSuggestions();

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (suggestions[highlightedIndex]) {
          handleSelectTag(suggestions[highlightedIndex].name);
        } else {
          handleAddTag(value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleSelectTag = (tagName: string) => {
    onAddTag(tagName);
    onChange("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleAddTag = (tagName: string) => {
    if (tagName.trim()) {
      onAddTag(tagName.trim());
      onChange("");
      setIsOpen(false);
    }
  };

  const getSuggestions = () => {
    if (!tags || tags.length === 0) return [];
    return tags;
  };

  const suggestions = getSuggestions();
  const showCreateOption =
    value.trim() &&
    !suggestions.some(
      (tag) => tag.name.toLowerCase() === value.trim().toLowerCase()
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim() && setIsOpen(true)}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => handleAddTag(value)}
          disabled={!value.trim() || disabled}
        >
          Add
        </Button>
      </div>

      {isOpen && (value.trim() || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              Searching tags...
            </div>
          ) : suggestions.length === 0 && !showCreateOption ? (
            <div className="px-4 py-3 text-sm text-gray-500">No tags found</div>
          ) : (
            <>
              {suggestions.map((tag, index) => (
                <button
                  key={tag.id}
                  type="button"
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center justify-between transition-colors",
                    highlightedIndex === index && "bg-gray-100"
                  )}
                  onClick={() => handleSelectTag(tag.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">#{tag.name}</span>
                    <span className="text-xs text-gray-500">
                      ({tag.usageCount} uses)
                    </span>
                  </div>
                  {highlightedIndex === index && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))}
              {showCreateOption && (
                <button
                  type="button"
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-gray-100 border-t border-gray-200 transition-colors",
                    highlightedIndex === suggestions.length && "bg-gray-100"
                  )}
                  onClick={() => handleAddTag(value)}
                  onMouseEnter={() => setHighlightedIndex(suggestions.length)}
                >
                  <span className="text-blue-600 font-medium">
                    Create new tag: "#{value.trim()}"
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
