import CommentItem from './CommentItem';
import { Comment } from '@/types';

interface CommentListProps {
  comments: Comment[];
  onDelete: (commentId: number) => void;
  expandedComments: { [key: number]: boolean };
  toggleReplies: (commentId: number) => void;
  onReply: (parentCommentId: number) => void;
}

const CommentList = ({
  comments,
  onDelete,
  expandedComments,
  toggleReplies,
  onReply,
}: CommentListProps) => {
  return (
    <div className="p-4">
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 flex flex-col gap-2">
          <div className="border-b pb-2">
            <CommentItem
              comment={comment}
              onDelete={onDelete}
              toggleReplies={() => toggleReplies(comment.id)}
              expanded={!!expandedComments[comment.id]}
              onReply={onReply}
            />
          </div>
          {expandedComments[comment.id] && comment.childComments && (
            <div className="ml-6 border-l-2 pl-2">
              {comment.childComments.map((childComment) => (
                <CommentItem
                  key={childComment.id}
                  comment={childComment}
                  onDelete={onDelete}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
