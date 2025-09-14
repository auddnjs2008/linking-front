import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Heart, Reply, Edit2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

// 임시 댓글 데이터 (실제로는 API에서 가져올 데이터)
const mockComments = [
  {
    id: 1,
    content:
      "정말 유용한 링크네요! 특히 React Query 부분이 도움이 많이 되었습니다.",
    createdAt: "2024-01-15T10:30:00Z",
    user: {
      id: 1,
      name: "김개발",
      profile:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    likes: 12,
    replies: [
      {
        id: 2,
        content: "저도 그 부분이 정말 좋았어요!",
        createdAt: "2024-01-15T11:00:00Z",
        user: {
          id: 2,
          name: "박프론트",
          profile:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        },
        likes: 3,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    content:
      "이런 자료를 찾고 있었는데 정말 감사합니다. 공유해주셔서 고마워요!",
    createdAt: "2024-01-14T15:20:00Z",
    user: {
      id: 3,
      name: "이백엔드",
      profile:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    likes: 8,
    replies: [],
  },
];

interface CommentProps {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      profile: string;
    };
    likes: number;
    replies: CommentProps["comment"][];
  };
  isReply?: boolean;
}

function CommentItem({ comment, isReply = false }: CommentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // 실제로는 API 호출
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className={`${isReply ? "ml-12 mt-4" : ""}`}>
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.user.profile} alt={comment.user.name} />
          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm text-gray-900">
                {comment.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[80px] resize-none"
                  placeholder="댓글을 수정하세요..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit}>
                    저장
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">
                {comment.content}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center gap-4 mt-2 ml-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{comment.likes + (isLiked ? 1 : 0)}</span>
              </button>

              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Reply className="w-4 h-4" />
                <span>답글</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleEdit}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 답글 폼 */}
      {showReplyForm && (
        <div className="ml-11 mt-3">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="답글을 작성하세요..."
                className="min-h-[80px] resize-none"
              />
              <div className="flex gap-2 mt-2">
                <Button size="sm">답글 작성</Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowReplyForm(false)}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommentSection() {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setNewComment("");
    setIsSubmitting(false);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          댓글 {mockComments.length}개
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 댓글 작성 폼 */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 작성하세요..."
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-6"
                >
                  {isSubmitting ? "작성 중..." : "댓글 작성"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 댓글 목록 */}
        <div className="space-y-6">
          {mockComments.map((comment) => (
            <div key={comment.id}>
              <CommentItem comment={comment} />

              {/* 답글들 */}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <div className="text-center">
          <Button variant="outline" className="w-full">
            더 많은 댓글 보기
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
