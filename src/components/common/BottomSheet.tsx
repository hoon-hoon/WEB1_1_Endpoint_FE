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
  loading: boolean;
};

export default function BottomSheet({ isOpen, setOpen, comments, loading }: BottomSheetProps) {
  const [inputValue, setInputValue] = useState<string>('');
  //const [sortOption, setSortOption] = useState<string>('최신 순'); // 정렬 옵션 상태

  /*
  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };
  */

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="h-3/5 w-full bg-white border-t-2" aria-describedby="set-positions">
        <DrawerHeader className="relative">
          <DrawerTitle>댓글</DrawerTitle>
          <DrawerDescription />
          <div className="flex items-center gap-2">
            {/* <Dropdown
              options={['최신 순', '좋아요 순']}
              selectedOption={sortOption}
              onOptionSelect={handleSortOptionChange}
            /> */}
            <button
              type="button"
              className="absolute top-5 right-7"
              onClick={() => setOpen(!isOpen)}
            >
              <Icon icon="close" />
            </button>
          </div>
        </DrawerHeader>

        <div className="flex flex-col space-y-4 justify-between overflow-y-scroll">
          <div className="overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-gray-500">로딩 중...</span>
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
        <div className="w-full border-t-2 sticky bottom-4 pt-1">
          <div className="flex px-2">
            <div className="flex items-center w-full bg-white border border-gray-100 rounded-lg overflow-hidden gap-1">
              <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                size="M"
                mode="outlined"
                placeholder="댓글을 입력하세요"
              />
              <button
                onClick={() => console.log('댓글 게시')}
                className="flex items-center justify-center px-2 py-2 bg-black text-white text-sm rounded-sm"
              >
                <Icon icon="add" className="fill-white" />
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
