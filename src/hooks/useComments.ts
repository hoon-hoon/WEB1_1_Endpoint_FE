import { useState } from 'react';
import { Comment } from '@/types';
import { dummyComments } from '@/data/dummyComment';

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async (quizId: number) => {
    setLoading(true);
    setComments([]);

    const response = dummyComments.filter((comment) => comment.quizId === quizId);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setComments(response);
    setLoading(false);
  };

  const addComment = async (commentId: number, writerId: number, parentCommentId: number, Content: string) => {
    setLoading(true);
    console.log(Content);
    
    setLoading(false);
  };

  const deleteComment = async (commentId: number) => {
    setLoading(true);

    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);

    setLoading(false);
  };

  const editComment = async (commentId: number, newContent: string) => {
    setLoading(true);

    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment,
    );
    setComments(updatedComments);

    setLoading(false);
  };

  return {
    comments,
    loading,
    fetchComments,
    addComment,
    deleteComment,
    editComment,
  };
};

export default useComments;
