import { ArrowUpIcon, FilterIcon, GridIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import GroupActionModal from "./group-action-modal";
import { useCreateLinkMutation } from "@/hooks/rqhooks/link/useCreateLinkMutation";
import { useState } from "react";
import LinkActionModal from "./link-action-modal";

export default function ButtonController({ type }: { type: "group" | "link" }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { mutate } = useCreateLinkMutation();

  const handleCreate = (data: {
    title: string;
    description: string;
    linkUrl: string;
    tags: string[];
  }) => {
    mutate(data);
  };

  return (
    <>
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
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5" />
          </Button>
        )}
        {type === "group" && (
          <GroupActionModal>
            <Button
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          </GroupActionModal>
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
      <LinkActionModal
        onSubmit={handleCreate}
        mode="create"
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
      />
    </>
  );
}
