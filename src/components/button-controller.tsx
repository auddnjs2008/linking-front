import { ArrowUpIcon, FilterIcon, GridIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import LinkCreateModalTrigger from "./link-create-modal";
import GroupCreateModal from "./group-create-modal";

export default function ButtonController({ type }: { type: "group" | "link" }) {
  return (
    <div className="fixed right-10 bottom-8 flex flex-col gap-3 z-50">
      {/* 맨 위로 버튼 */}
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </Button>

      {/* 링크 생성 버튼 */}

      {type === "link" && (
        <LinkCreateModalTrigger>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
            onClick={() => {
              /* 링크 생성 모달/페이지 */
            }}
          >
            <PlusIcon className="w-5 h-5" />
          </Button>
        </LinkCreateModalTrigger>
      )}
      {type === "group" && (
        <GroupCreateModal>
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
            onClick={() => {
              /* 링크 생성 모달/페이지 */
            }}
          >
            <PlusIcon className="w-5 h-5" />
          </Button>
        </GroupCreateModal>
      )}

      {/* 필터 버튼 */}
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        <FilterIcon className="w-5 h-5" />
      </Button>

      {/* 뷰 모드 토글 */}
      <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
      >
        <GridIcon className="w-5 h-5" />
      </Button>
    </div>
  );
}
