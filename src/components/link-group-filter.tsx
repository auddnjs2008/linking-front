import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { memo } from "react";

interface LinkGroupFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const LinkGroupFilter = memo(function LinkGroupFilter({
  value,
  onChange,
  placeholder = "링크 제목으로 검색...",
  className = "w-full",
}: LinkGroupFilterProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4"
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  );
});

export default LinkGroupFilter;
