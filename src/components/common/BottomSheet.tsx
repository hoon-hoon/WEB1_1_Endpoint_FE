import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/shadcn/ui/drawer';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import CommentSection from '../comments/CommentSection';
import { useEffect } from 'react';
import CommentInput from '../comments/CommentInput';
import useFetchComments from '@/api/comments/fetchComments';
import useAddComment from '@/api/comments/addComments';
import useDeleteComment from '@/api/comments/deleteComments';

interface BottomSheetProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  quizId: number;
}

export default function BottomSheet({ isOpen, setOpen, quizId }: BottomSheetProps) {
  const { comments, loading, fetchComments } = useFetchComments(quizId);
  const addCommentMutation = useAddComment(quizId);
  const deleteCommentMutation = useDeleteComment(quizId);

  useEffect(() => {
    if (isOpen) {
      console.log(`fetchComments 호출 ${quizId}`);
      fetchComments()
        .then(() => console.log('댓글 데이터 로드 완료'))
        .catch((err) => console.error('댓글 데이터 로드 실패:', err));
    }
  }, [isOpen, fetchComments]);

  const handleAddComment = (content: string, parentCommentId: number) => {
    addCommentMutation.mutate({ content, parentCommentId });
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
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
        <CommentInput onSubmit={(content) => handleAddComment(content, 0)} />
        <CommentSection comments={comments} loading={loading} onDelete={handleDeleteComment} />
      </DrawerContent>
    </Drawer>
  );
}
