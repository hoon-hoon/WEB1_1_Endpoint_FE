import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';

interface QuizFooterProps {
  likes: number;
  comments: number;
  isLiked: boolean;
  onToggleLike: () => void;
  onCommentsClick: () => void;
}

function QuizFooter({ likes, comments, isLiked, onToggleLike, onCommentsClick }: QuizFooterProps) {
  return (
    <div className="flex mt-2 text-gray-600">
      <button
        className="flex items-center p-2  mr-1 rounded-full hover:bg-gray-100 active:bg-gray-200"
        onClick={onToggleLike}
      >
        {isLiked ? (
          <AiFillHeart className="w-6 h-6 text-red-500" />
        ) : (
          <AiOutlineHeart className="w-6 h-6" />
        )}
        <span className="ml-1">{likes}</span>
      </button>

      <button
        className="flex items-center p-2 rounded-full hover:bg-gray-100 active:bg-gray-200"
        onClick={onCommentsClick}
      >
        <AiOutlineMessage className="w-6 h-6" />
        <span className="ml-1">{comments}</span>
      </button>
    </div>
  );
}

export default QuizFooter;
