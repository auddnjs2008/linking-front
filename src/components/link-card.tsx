import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  EditIcon,
  BookmarkPlusIcon,
  BookmarkCheckIcon,
  Trash2Icon,
} from "lucide-react";
import type { User } from "@/types/user";
import { useBookmarkMutation } from "@/hooks/rqhooks/link/useBookmarkMutation";
import { useUnBookmarkMutation } from "@/hooks/rqhooks/link/useUnBookmarkMutation";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import LinkActionModal from "./link-action-modal";
import { useState } from "react";
import { useUpdateLinkMutation } from "@/hooks/rqhooks/link/useUpdateLinkMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import DeletePopover from "./delete-popover";
import { useDeleteLinkMutation } from "@/hooks/rqhooks/link/useDeleteLinkMutation";
import type { ViewMode } from "@/contexts/ViewModeContext";

type LinkCardProps = {
  id: number;
  thumbnailUrl: string;
  linkUrl: string;
  tags: string[];
  title: string;
  description: string;
  author: User;
  isBookmarked: boolean;
  viewMode?: ViewMode;
};

export default function LinkCard({
  id,
  thumbnailUrl,
  title,
  description,
  linkUrl,
  tags,
  author,
  isBookmarked,
  viewMode = "grid",
}: LinkCardProps) {
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate(`/links/${id}`);
  };

  const queryClient = useQueryClient();
  const { data: currentUser } = useMeQuery();
  const { mutate: bookmark } = useBookmarkMutation();
  const { mutate: unbookmark } = useUnBookmarkMutation();
  const { mutate: deleteLink, isPending: deletePending } =
    useDeleteLinkMutation();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletePopover, setDeletePopover] = useState(false);

  const { mutate: editLink, isPending } = useUpdateLinkMutation(() => {
    setEditModalOpen(false);
    toast.success("업데이트에 성공하였습니다.");
    queryClient.invalidateQueries({ queryKey: ["link", "cursor-pagination"] });
  });

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    bookmark({ id });
  };
  const handleUnBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    unbookmark({ id });
  };

  const handleDelete = () => {
    deleteLink({ id });
  };

  if (viewMode === "list") {
    return (
      <>
        <Card
          onClick={handleSeeMore}
          className="bg-white cursor-pointer rounded-2xl shadow-lg transition-shadow hover:shadow-xl p-0 min-h-40"
        >
          <div className="flex h-full">
            {/* 썸네일 */}
            <div className="flex-shrink-0">
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-32 h-full object-cover rounded-l-2xl"
              />
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 flex flex-col p-4 min-h-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate flex-1">
                    {title}
                  </CardTitle>
                  <div className="flex gap-1 ml-2">
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
                        mode="link"
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

                    {/* 태그 표시 */}
                    {tags.length > 0 && (
                      <div className="flex items-center gap-1 mb-2 flex-wrap">
                        {tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                          >
                            #{tag}
                          </span>
                        ))}
                        {tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{tags.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <span>{author.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <LinkActionModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          mode="edit"
          initialData={{
            title,
            description,
            linkUrl,
            tags,
          }}
          onSubmit={(input) => {
            editLink({ id, body: input });
          }}
          isPending={isPending}
        />
      </>
    );
  }

  return (
    <Card className="bg-white rounded-2xl shadow-lg max-w-xs flex flex-col items-stretch transition-shadow hover:shadow-xl p-0 h-full">
      <CardContent className="p-0">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-t-2xl"
        />
      </CardContent>

      {/* 버튼 영역 - 이미지 아래, 제목 위 */}
      <div className="px-2 py-2 flex justify-end ">
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
              onClick={() => {
                setEditModalOpen(true);
              }}
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          )}
          {author.id === currentUser?.id && (
            <DeletePopover
              mode="link"
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
                onClick={() => {
                  setDeletePopover(true);
                }}
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

          {/* 태그 표시 */}
          {tags.length > 0 && (
            <div className="flex items-center gap-1 mb-2 flex-wrap">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-gray-400">
                  +{tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </CardHeader>

        {/* 하단 버튼 영역 */}
        <CardFooter className="px-0 pt-2 pb-0 flex justify-between items-end">
          <Button onClick={handleSeeMore}>See more</Button>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={author.profile} alt="@shadcn" />
              <AvatarFallback>{author.name}</AvatarFallback>
            </Avatar>
            <div>{author.name}</div>
          </div>
        </CardFooter>
      </div>
      <LinkActionModal
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        mode="edit"
        initialData={{
          title,
          description,
          linkUrl,
          tags,
        }}
        onSubmit={(input) => {
          editLink({ id, body: input });
        }}
        isPending={isPending}
      />
    </Card>
  );
}
