import { useState } from 'react';
import CommentSkeleton from './CommentSkeleton';
import CommentList from './CommentList';
import { Comment } from '@/types/CommentTypes';

interface CommentSectionProps {
  comments: Comment[];
  loading?: boolean;
  onDelete: (commentId: number) => void;
  onReply: (parentCommentId: number) => void;
}

export default function CommentSection({
  comments,
  loading,
  onDelete,
  onReply,
}: CommentSectionProps) {
  const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});

  const toggleReplies = (commentId: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (loading) {
    return <CommentSkeleton />;
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
      <CommentList
        comments={comments}
        onDelete={onDelete}
        expandedComments={expandedComments}
        toggleReplies={toggleReplies}
        onReply={onReply}
      />
    </div>
  );
}
