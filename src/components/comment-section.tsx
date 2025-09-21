import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Reply, Edit2, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { useParams } from "react-router-dom";
import { useLinkCommentsQuery } from "@/hooks/rqhooks/linkComment/useLinkCommentsQuery";
import type { ParentComment, Reply as TReply } from "@/types/comment";
import { useCreateLinkCommentMutation } from "@/hooks/rqhooks/linkComment/useCreateLinkCommentMutation";
import { useMeQuery } from "@/hooks/rqhooks/user/useMeQuery";
import { useUpdateLinkCommentMutation } from "@/hooks/rqhooks/linkComment/useUpdateLinkCommentMutation";
import { useDeleteLinkCommentMutation } from "@/hooks/rqhooks/linkComment/useDeleteLinkCommentMutation";

interface CommentProps {
  comment: ParentComment | TReply;
  isReply?: boolean;
  isReReply?: boolean;
  linkId: number;
  commentId: number;
  parentId?: number;
  canEdit: boolean;
  myProfile: string;
}

function CommentItem({
  comment,
  isReply = false,
  isReReply = false,
  linkId,
  commentId,
  parentId,
  canEdit,
  myProfile,
}: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.comment);

  const [replyComment, setReplyComment] = useState("");
  const { mutate, isSuccess } = useCreateLinkCommentMutation();
  const { mutate: updateMutate } = useUpdateLinkCommentMutation(linkId);
  const { mutate: deleteMutate } = useDeleteLinkCommentMutation(linkId);

  const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyComment.trim()) return;

    const parentCommentId = isReply ? parentId : comment.id;
    mutate({
      linkId,
      body: { parentCommentId, comment: replyComment },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setReplyComment("");
      setShowReplyForm(false);
    }
  }, [isSuccess]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // 실제로는 API 호출
    setIsEditing(false);
    updateMutate({
      commentId,
      body: { parentCommentId: parentId, comment: editContent },
    });
  };

  const handleCancelEdit = () => {
    setEditContent(comment.comment);
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteMutate({ commentId });
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
                {comment.comment}
              </p>
            )}
          </div>

          {!isEditing && (
            <div className="flex items-center gap-4 mt-2 ml-2">
              {/* <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{comment.likes + (isLiked ? 1 : 0)}</span>
              </button> */}

              {!isReReply && (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  <span>답글</span>
                </button>
              )}

              {canEdit && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleEdit}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 답글 폼 */}
      {!isReReply && showReplyForm && (
        <form onSubmit={handleReplySubmit} className="ml-11 mt-3">
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={myProfile} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                placeholder="답글을 작성하세요..."
                className="min-h-[80px] resize-none"
              />
              <div className="flex gap-2 mt-2">
                <Button type="submit" size="sm" disabled={!replyComment.trim()}>
                  답글 작성
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyComment("");
                  }}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function CommentSection() {
  const params = useParams<{ id: string }>();
  const id = params.id ? parseInt(params.id, 10) : null;
  const { data: me } = useMeQuery();

  const { data: comments } = useLinkCommentsQuery(id || -1);

  const [newComment, setNewComment] = useState("");

  const {
    mutate,
    isPending: isSubmiting,
    isSuccess,
  } = useCreateLinkCommentMutation();

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;

    mutate({ linkId: id, body: { comment: newComment } });
  };

  useEffect(() => {
    if (isSuccess) {
      setNewComment("");
    }
  }, [isSuccess]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          댓글 {comments?.length}개
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={me?.profile || ""} alt={me?.name || "User"} />
              <AvatarFallback>{me?.name?.charAt(0) || "U"}</AvatarFallback>
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
                  type="submit"
                  disabled={!newComment.trim() || isSubmiting}
                  className="px-6"
                >
                  {isSubmiting ? "작성 중..." : "댓글 작성"}
                </Button>
              </div>
            </div>
          </div>
        </form>

        <Separator />

        {/* 댓글 목록 */}
        <div className="space-y-6">
          {comments?.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                linkId={id ?? -1}
                commentId={comment.id}
                myProfile={me?.profile ?? ""}
                canEdit={me?.id === comment.user.id}
              />

              {/* 답글들 */}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      linkId={id ?? -1}
                      isReply
                      isReReply={true}
                      commentId={reply.id}
                      parentId={comment.id}
                      myProfile={me?.profile ?? ""}
                      canEdit={me?.id === reply.user.id}
                    />
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
