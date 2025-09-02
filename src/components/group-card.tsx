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
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { useGroupBookmarkMutation } from "@/hooks/rqhooks/group/useGroupBookmarkMutation";
import { useGroupUnBookmarkMutation } from "@/hooks/rqhooks/group/useGroupUnBookmarkMutation";

type GroupCardProps = {
  id: number;
  title: string;
  description: string;
  linkCount: number;
  createdDate: string;
  ownerAvatar: string;
  ownerInitials: string;
  ownerName: string;
  isBookmarked: boolean;
};

export default function GroupCard({
  id,
  title,
  description,
  linkCount,
  createdDate,
  ownerAvatar,
  ownerInitials,
  ownerName,
  isBookmarked,
}: GroupCardProps) {
  const navigate = useNavigate();

  const { mutate: bookmark } = useGroupBookmarkMutation();

  const { mutate: unbookmark } = useGroupUnBookmarkMutation();

  const handleBookmark = () => {
    bookmark({ id });
  };
  const handleUnBookmark = () => {
    unbookmark({ id });
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
          <div className="flex gap-2">
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
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-gray-600"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <LinkIcon className="w-4 h-4" />
          <span>{linkCount} links</span>
          <span>•</span>
          <span>{getRelativeTime(createdDate)}</span>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-2 flex justify-between">
        <Button onClick={handleViewGroup}>View Group</Button>
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={ownerAvatar} />
            <AvatarFallback>{ownerInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-500">{ownerName}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
