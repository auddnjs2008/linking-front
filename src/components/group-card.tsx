import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  LinkIcon,
  EditIcon,
  BookmarkPlusIcon,
  BookmarkCheckIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { useGroupBookmarkMutation } from "@/hooks/rqhooks/group/useGroupBookmarkMutation";
import { useGroupUnBookmarkMutation } from "@/hooks/rqhooks/group/useGroupUnBookmarkMutation";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import type { User } from "@/types/user";
import { useState } from "react";
import GroupActionModal from "./group-action-modal";
import { useUpdateGroupMutation } from "@/hooks/rqhooks/group/useUpdateGroupMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDeleteGroupMutation } from "@/hooks/rqhooks/group/useDeleteGroupMutation";
import DeletePopover from "./delete-popover";
import type { ViewMode } from "@/contexts/ViewModeContext";

type GroupCardProps = {
  id: number;
  title: string;
  description: string;
  linkedLinks: { id: number; title: string }[];
  createdDate: string;
  author: User;
  isBookmarked: boolean;
  viewMode?: ViewMode;
};

export default function GroupCard({
  id,
  title,
  description,
  linkedLinks,
  createdDate,
  author,
  isBookmarked,
  viewMode = "grid",
}: GroupCardProps) {
  const navigate = useNavigate();
  const { data: currentUser } = useMeQuery();
  const queryClient = useQueryClient();
  const { mutate: bookmark } = useGroupBookmarkMutation();

  const { mutate: unbookmark } = useGroupUnBookmarkMutation();

  const { mutate: deleteGroup, isPending: deletePending } =
    useDeleteGroupMutation();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletePopover, setDeletePopover] = useState(false);

  const { mutate: editGroup, isPending } = useUpdateGroupMutation(() => {
    setEditModalOpen(false);
    toast.success("업데이트에 성공하였습니다.");
    queryClient.invalidateQueries({ queryKey: ["group", "cursor-pagination"] });
  });

  const handleBookmark = () => {
    bookmark({ id });
  };
  const handleUnBookmark = () => {
    unbookmark({ id });
  };

  const handleDelete = () => {
    deleteGroup({ id });
    setDeletePopover(false);
  };

  const handleViewGroup = () => {
    navigate(`/groups/${id}`);
  };

  if (viewMode === "list") {
    return (
      <>
        <Card
          onClick={handleViewGroup}
          className="bg-white cursor-pointer rounded-2xl shadow-lg transition-shadow hover:shadow-xl p-0 min-h-32"
        >
          <div className="flex items-center p-4 h-full">
            {/* 왼쪽 콘텐츠 영역 */}
            <div className="flex-1 min-w-0 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate flex-1 min-w-0">
                    {title}
                  </CardTitle>
                  <div className="flex gap-1 ml-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                      onClick={
                        !isBookmarked ? handleBookmark : handleUnBookmark
                      }
                    >
                      {!isBookmarked ? (
                        <BookmarkPlusIcon className="size-4 text-red-400" />
                      ) : (
                        <BookmarkCheckIcon className="size-4 text-green-400" />
                      )}
                    </Button>
                    {author.id === currentUser?.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditModalOpen(true);
                        }}
                      >
                        <EditIcon className="w-4 h-4" />
                      </Button>
                    )}
                    {author.id === currentUser?.id && (
                      <DeletePopover
                        mode="group"
                        title={title}
                        open={deletePopover}
                        handleClose={() => setDeletePopover(false)}
                        handleDelete={handleDelete}
                        isLoading={deletePending}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                          onClick={() => setDeletePopover(true)}
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </DeletePopover>
                    )}
                  </div>
                </div>

                <div className="flex flex-col flex-1 justify-between min-h-0">
                  <div className="flex-1 overflow-hidden">
                    <CardDescription className="text-gray-500 text-sm mb-2 line-clamp-2">
                      {description}
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <span>{linkedLinks.length} links</span>
                    </div>
                    <span>•</span>
                    <span>{getRelativeTime(createdDate)}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={author.profile} />
                        <AvatarFallback>{author.name}</AvatarFallback>
                      </Avatar>
                      <span>{author.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <GroupActionModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          mode="edit"
          initalData={{
            title,
            description,
            selectedLinks: linkedLinks,
          }}
          onSubmit={(input) => {
            editGroup({
              id,
              body: {
                title: input.title,
                description: input.description,
                linkIds: input.selectedLinks.map((link) => link.id),
              },
            });
          }}
          isPending={isPending}
        />
      </>
    );
  }

  return (
    <Card className="bg-white rounded-2xl shadow-lg max-w-xl flex flex-col items-stretch transition-shadow hover:shadow-xl p-0 h-full">
      {/* 버튼 영역 - 제목 위 */}
      <div className="px-2 py-2 flex justify-end">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-400 hover:text-gray-600 h-8 px-2"
            onClick={!isBookmarked ? handleBookmark : handleUnBookmark}
          >
            {!isBookmarked ? (
              <BookmarkPlusIcon className="size-4 text-red-400" />
            ) : (
              <BookmarkCheckIcon className="size-4 text-green-400" />
            )}
          </Button>
          {author.id === currentUser?.id && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600 h-8 px-2"
              onClick={() => setEditModalOpen(true)}
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          )}
          {author.id === currentUser?.id && (
            <DeletePopover
              mode="group"
              title={title}
              open={deletePopover}
              handleClose={() => setDeletePopover(false)}
              handleDelete={handleDelete}
              isLoading={deletePending}
            >
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 h-8 px-2"
                onClick={() => setDeletePopover(true)}
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </DeletePopover>
          )}
        </div>
      </div>

      {/* 카드 본문 영역 - flex-1로 남은 공간 차지 */}
      <div className="flex flex-col flex-1 px-6 pt-0 pb-6">
        <CardHeader className="pt-0 pb-2 px-0 flex-1 flex flex-col">
          <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-500 text-base mb-2 line-clamp-2 flex-1">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LinkIcon className="w-4 h-4" />
            <span>{linkedLinks.length} links</span>
            <span>•</span>
            <span>{getRelativeTime(createdDate)}</span>
          </div>
        </CardContent>

        {/* 하단 버튼 영역 */}
        <CardFooter className="px-0 pt-2 pb-0 flex justify-between items-end">
          <Button onClick={handleViewGroup}>View Group</Button>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={author.profile} />
              <AvatarFallback>{author.name}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500">{author.name}</span>
          </div>
        </CardFooter>
      </div>
      <GroupActionModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        mode="edit"
        initalData={{
          title,
          description,
          selectedLinks: linkedLinks,
        }}
        onSubmit={(input) => {
          editGroup({
            id,
            body: {
              title: input.title,
              description: input.description,
              linkIds: input.selectedLinks.map((link) => link.id),
            },
          });
        }}
        isPending={isPending}
      />
    </Card>
  );
}
