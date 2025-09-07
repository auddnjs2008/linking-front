import {
  ArrowUpIcon,
  FilePlusIcon,
  GridIcon,
  ListIcon,
  XIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import GroupActionModal from "./group-action-modal";
import { useCreateLinkMutation } from "@/hooks/rqhooks/link/useCreateLinkMutation";
import { useState } from "react";
import LinkActionModal from "./link-action-modal";
import { useCreateGroupMutation } from "@/hooks/rqhooks/group/useCreateGroupMutation";
import { useViewMode } from "@/contexts/ViewModeContext";
import { cn } from "@/lib/utils";

export default function ButtonController({ type }: { type: "group" | "link" }) {
  const [fabActive, setFabActive] = useState(false);

  const [createLinkModalOpen, setCreateLinkModalOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const { viewMode, toggleViewMode } = useViewMode();

  const { mutate: createLink } = useCreateLinkMutation();
  const { mutate: createGroup, isPending: createGroupPending } =
    useCreateGroupMutation(() => setCreateGroupModalOpen(false));

  const handleCreateLink = (data: {
    title: string;
    description: string;
    linkUrl: string;
    tags: string[];
  }) => {
    createLink(data);
  };

  const handleCreateGroup = (data: {
    title: string;
    description: string;
    selectedLinks: { id: number; title: string }[];
  }) => {
    const { title, description, selectedLinks } = data;
    createGroup({
      title,
      description,
      linkIds: selectedLinks.map((link) => link.id),
    });
  };

  return (
    <>
      <div
        className="fixed right-10 bottom-8  z-50"
        onMouseLeave={() => setFabActive(false)}
      >
        {fabActive && (
          <div className="flex flex-col gap-3">
            {/* 맨 위로 버튼 */}
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
              onClick={() => {
                // Outlet을 감싸고 있는 스크롤 컨테이너를 찾아서 스크롤
                const scrollContainer =
                  document.querySelector(".overflow-y-auto");
                if (scrollContainer) {
                  scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <ArrowUpIcon className="w-5 h-5" />
            </Button>

            {/* 링크 생성 버튼 */}

            {type === "link" && (
              <Button
                size="icon"
                className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
                onClick={() => setCreateLinkModalOpen(true)}
              >
                <FilePlusIcon className="w-5 h-5" />
              </Button>
            )}
            {type === "group" && (
              <Button
                size="icon"
                className="w-12 h-12 rounded-full shadow-lg bg-black text-white hover:bg-gray-800"
                onClick={() => setCreateGroupModalOpen(true)}
              >
                <FilePlusIcon className="w-5 h-5" />
              </Button>
            )}

            {/* 뷰 모드 토글 */}
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full shadow-lg bg-white hover:bg-gray-50"
              onClick={toggleViewMode}
              title={
                viewMode === "grid" ? "리스트 뷰로 전환" : "그리드 뷰로 전환"
              }
            >
              {viewMode === "grid" ? (
                <ListIcon className="w-5 h-5" />
              ) : (
                <GridIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        )}
        <Button
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg mt-2 bg-black text-white hover:bg-gray-800"
          onMouseEnter={() => setFabActive(true)}
        >
          <XIcon
            className={cn(fabActive ? "rotate-45" : "", "transition-transform")}
          />
        </Button>
      </div>
      <LinkActionModal
        onSubmit={handleCreateLink}
        mode="create"
        open={createLinkModalOpen}
        handleClose={() => setCreateLinkModalOpen(false)}
      />
      <GroupActionModal
        onSubmit={handleCreateGroup}
        mode="create"
        open={createGroupModalOpen}
        handleClose={() => setCreateGroupModalOpen(false)}
        isPending={createGroupPending}
      />
    </>
  );
}
