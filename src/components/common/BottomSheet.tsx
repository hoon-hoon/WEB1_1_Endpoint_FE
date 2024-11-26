import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '../../shared/drawer';
import TextField from '@eolluga/eolluga-ui/Input/TextField';
import Icon from '@eolluga/eolluga-ui/icon/Icon';
import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { useState } from 'react';
import { Comment } from '@/types';

type BottomSheetProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comments: Comment[];
  loading?: boolean;
};

export default function BottomSheet({ isOpen, setOpen, comments, loading }: BottomSheetProps) {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent
        className="h-[60dvh] max-h-[60dvh] w-full bg-white border-t-2 flex flex-col"
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

        <div className="overflow-y-scroll pb-16">
          <div className="p-4">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-full">
                {/* 스켈레톤 컴포넌트 적용 예정 */}
                <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse mb-4"></div>
                <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse mb-4"></div>
                <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse mb-4"></div>
                <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse mb-4"></div>
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4 flex flex-col gap-2">
                  <div className="flex items-start gap-3 border-b pb-2">
                    <Avatar size="S" />
                    <div>
                      <div className="text-sm font-bold">User {comment.writerId}</div>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                  </div>
                  {(comment.childComments || []).length > 0 && (
                    <div className="ml-8 border-l-2 pl-2">
                      {(comment.childComments || []).map((childComment) => (
                        <div key={childComment.id} className="flex items-start gap-3 mb-2">
                          <Avatar size="S" />
                          <div>
                            <div className="text-sm font-bold">User {childComment.writerId}</div>
                            <p className="text-sm text-gray-600">{childComment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                아직 댓글이 없습니다. 첫 번째로 댓글을 남겨보세요!
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t-2 bg-white">
          <div className="flex px-4 py-4 gap-4">
            <div className="flex items-center w-full bg-white border border-gray-100 rounded-lg overflow-hidden gap-1">
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                size="M"
                mode="outlined"
                placeholder="댓글을 입력하세요"
              />
              <div
                className="p-3 bg-black rounded-xl cursor-pointer"
                onClick={() => console.log('댓글 게시')}
              >
                <Icon icon="add" className="fill-white" />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
