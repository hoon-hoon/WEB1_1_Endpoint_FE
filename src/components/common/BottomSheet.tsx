import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shadcn/ui/drawer';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import CommentSection from '../comments/CommentSection';
import CommentInput from '../comments/CommentInput';
import { useComments } from '@/hooks';
import { useEffect } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quizId: number;
}

export default function BottomSheet({ isOpen, setOpen, quizId }: BottomSheetProps) {
  const { comments, loading, fetchComments, addComment, editComment, deleteComment } = useComments();

  useEffect(() => {
    if (isOpen) {
      fetchComments(quizId);
    }
  }, [isOpen, quizId]);

  const handleAddComment = (content: string, parentCommentId: number) => {
    const writerId = 1; // 예시 작성자 ID
    addComment(quizId, writerId, parentCommentId, content);
  };

  const handleEditComment = (commentId: number, newContent: string) => {
    editComment(commentId, newContent);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent
        className="min-h-[80dvh] max-h-[80dvh] w-full bg-white border-t-2 flex flex-col"
        aria-describedby="set-positions"
      >
        <DrawerHeader className="relative flex-shrink-0">
          <DrawerTitle>댓글</DrawerTitle>
          <DrawerDescription />
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="absolute top-5 right-7"
              onClick={() => setOpen(!isOpen)}
            >
              <Icon icon="close" />
            </button>
          </div>
        </DrawerHeader>
        <CommentSection
          comments={comments}
          loading={loading}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
        />
        <CommentInput onSubmit={(content) => handleAddComment(content, 0)} />
      </DrawerContent>
    </Drawer>
  );
}
