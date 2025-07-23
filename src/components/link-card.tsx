import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type LinkCardProps = {
  thumbnailUrl: string;
  title: string;
  description: string;
  url: string;
};

export default function LinkCard({
  thumbnailUrl,
  title,
  description,
  url,
}: LinkCardProps) {
  return (
    <Card className="bg-white rounded-2xl shadow-lg max-w-xs flex flex-col items-stretch transition-shadow hover:shadow-xl p-0">
      <CardContent className="p-0">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-t-2xl"
        />
      </CardContent>
      <CardHeader className="pt-5 pb-2 px-6">
        <CardTitle className="font-bold text-gray-900 text-lg mb-1 truncate">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500 text-base mb-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="px-6 pb-6 pt-2 flex justify-between">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-700 transition-colors"
        >
          See more
        </a>
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
