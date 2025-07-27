import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";

type LinkSummaryCardProps = {
  thumbnailUrl: string;
  title: string;
  description: string;
  url: string;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
  showCheckbox?: boolean;
};

export default function LinkSummaryCard({
  thumbnailUrl,
  title,
  description,
  url,
  isSelected = false,
  onSelect,
  showCheckbox = false,
}: LinkSummaryCardProps) {
  return (
    <Card
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-0 max-w-sm cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
      }`}
      onClick={() => onSelect?.(!isSelected)}
    >
      <CardContent className="p-0 relative">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-32 object-cover rounded-t-xl"
        />
        {showCheckbox && (
          <div className="absolute top-2 right-2">
            <Checkbox
              checked={isSelected}
              //   onChange={(checked) => onSelect?.(checked)}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-2 border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
          </div>
        )}
      </CardContent>
      <CardHeader className="pt-4 pb-2 px-4">
        <CardTitle className="font-semibold text-gray-900 text-base mb-1 truncate">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm mb-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-4 pb-4 pt-2 flex justify-between items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-1.5 rounded-md bg-gray-800 text-white font-medium text-xs hover:bg-gray-700 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Visit
        </a>
        {isSelected && (
          <div className="text-xs text-blue-600 font-medium">Selected</div>
        )}
      </CardFooter>
    </Card>
  );
}
