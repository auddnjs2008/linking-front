import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { InlineSpinner } from "./ui/spinner";

export default function LinkDeletePopover({
  title,
  open,
  handleClose,
  handleDelete,
  children,
  isLoading,
}: {
  title: string;
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trash2Icon className="w-5 h-5 text-red-400" />
            <h4 className="font-semibold text-gray-900">링크 삭제</h4>
          </div>
          <p className="text-sm text-gray-600">
            정말로 이 링크를 삭제하시겠습니까?
            <br />
            <span className="font-medium text-gray-800">"{title}"</span>
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="flex-1"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading && <InlineSpinner />}
              삭제
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
