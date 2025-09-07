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
  EllipsisVerticalIcon,
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

type GroupCardProps = {
  id: number;
  title: string;
  description: string;
  linkedLinks: { id: number; title: string }[];
  createdDate: string;
  author: User;
  isBookmarked: boolean;
};

export default function GroupCard({
  id,
  title,
  description,
  linkedLinks,
  createdDate,
  author,
  isBookmarked,
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

  return (
    <Card className="bg-white rounded-2xl shadow-lg max-w-sm flex flex-col items-stretch transition-shadow hover:shadow-xl p-0">
      <CardHeader className="pt-5 pb-2 px-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-500 text-base mb-2 line-clamp-2">
              {description}
            </CardDescription>
          </div>
          <div>
            <Button variant="ghost" size="sm">
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </div>

          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
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
                className="text-gray-400 hover:text-gray-600"
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
          </div> */}
        </div>
      </CardHeader>

      <CardContent className="px-6 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LinkIcon className="w-4 h-4" />
          <span>{linkedLinks.length} links</span>
          <span>•</span>
          <span>{getRelativeTime(createdDate)}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-2 flex justify-between">
        <Button onClick={handleViewGroup}>View Group</Button>
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={author.profile} />
            <AvatarFallback>{author.name}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-500">{author.name}</span>
        </div>
      </CardFooter>
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
