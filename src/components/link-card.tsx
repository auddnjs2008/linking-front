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
import { StarIcon, EditIcon } from "lucide-react";
import LinkActionModal from "./link-action-modal";

type LinkCardProps = {
  id: number;
  thumbnailUrl: string;
  title: string;
  description: string;
};

export default function LinkCard({
  id,
  thumbnailUrl,
  title,
  description,
}: LinkCardProps) {
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate(`/links/${id}`);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg max-w-xs flex flex-col items-stretch transition-shadow hover:shadow-xl p-0">
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
          >
            <StarIcon className="w-4 h-4" />
          </Button>
          <LinkActionModal
            mode="edit"
            initialData={{
              title: "수정 테스트다",
              description: "나는 이 카드를 수정 할 것이다.",
              url: "https://www.naver.com",
              tags: ["design", "ui/ux", "next.js"],
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600 h-8 px-2"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          </LinkActionModal>
        </div>
      </div>

      <CardHeader className="pt-0 pb-2 px-6 ">
        <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 text-base mb-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-6 pb-6 pt-2 flex justify-between">
        <Button onClick={handleSeeMore}>See more</Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>John Doe</div>
        </div>
      </CardFooter>
    </Card>
  );
}
