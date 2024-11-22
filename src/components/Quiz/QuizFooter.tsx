import Icon from '@eolluga/eolluga-ui/icon/Icon';

interface QuizFooterProps {
  likes: number;
  comments: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onCommentsClick: () => void;
}

function QuizFooter({ likes, comments, isLiked, onToggleLike, onCommentsClick }: QuizFooterProps) {
  return (
    <div className="flex items-center mt-4 text-gray-600">
      <button className="flex items-center mr-6" onClick={onToggleLike} aria-label="좋아요">
        <Icon icon={isLiked ? 'heart_filled' : 'heart_outlined'} />
        <span className="ml-1">{likes}</span>
      </button>

      <button className="flex items-center" onClick={onCommentsClick} aria-label="댓글">
        <Icon icon="chat" />
        <span className="ml-1">{comments}</span>
      </button>
    </div>
  );
}

export default QuizFooter;
