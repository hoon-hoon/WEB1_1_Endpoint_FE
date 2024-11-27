import { useState } from 'react';
import { Skeleton } from '@/shadcn/ui/skeleton';
import { Button } from '@/shadcn/ui/button';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { Comment } from '@/types';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface CommentSectionProps {
  comments: Comment[];
  loading?: boolean;
  onEdit: (commentId: number, newContent: string) => void;
  onDelete: (commentId: number) => void;
}

export default function CommentSection({
  comments,
  loading,
  onEdit,
  onDelete,
}: CommentSectionProps) {
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-sm text-gray-500">아직 댓글이 없습니다. 첫 번째로 댓글을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-scroll pb-16">
      <div className="p-4">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 flex flex-col gap-2">
            <div className="flex items-start gap-3 border-b pb-2">
              <Avatar size="S" />
              <div className="flex-1">
                <div className="text-sm flex justify-between items-center">
                  <span className="font-medium">User {comment.writerId}</span>
                  <div>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="flex items-center justify-center pb-1 rounded bg-transparent hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-300"
                    >
                      <Icon icon="delete" size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{comment.content}</p>
              </div>
            </div>
            {comment.childComments && comment.childComments.length > 0 && (
              <div className="ml-6">
                {!expandedComments[comment.id] ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleReplies(comment.id)}
                  >
                    답글 {comment.childComments.length}개 더보기
                  </Button>
                ) : (
                  <div className="border-l-2 pl-2">
                    {comment.childComments.map((childComment) => (
                      <div key={childComment.id} className="flex items-start gap-3 mb-2">
                        <Avatar size="S" />
                        <div className="flex-1">
                          <div className="text-sm flex justify-between items-center">
                            <span className="font-medium">User {childComment.writerId}</span>
                            <div>
                              <button
                                onClick={() => onDelete(childComment.id)}
                                className="flex items-center justify-center pb-1 rounded bg-transparent hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-300"
                              >
                                <Icon icon="delete" size={20} className="text-gray-500" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{childComment.content}</p>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:underline"
                      onClick={() => toggleReplies(comment.id)}
                    >
                      답글 숨기기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
