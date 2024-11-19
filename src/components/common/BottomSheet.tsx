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
import FlexBox from '../../shared/FlexBox';
import { Comment } from '@/types';

type BottomSheetProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comments: Comment[];
};

export default function BottomSheet({ isOpen, setOpen, comments }: BottomSheetProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('최신 순'); // 정렬 옵션 상태

  const handleSortOptionChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="h-3/5 w-full bg-white" aria-describedby="set-positions">
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

        <div className="flex flex-col space-y-4 justify-between h-full">
          <div className="overflow-y-auto p-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="mb-4 flex items-start gap-3 border-b pb-2">
                  <Avatar size="S" />
                  <div>
                    <div className="text-sm font-bold">{comment.author}</div>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                아직 댓글이 없습니다. 첫 번째로 댓글을 남겨보세요!
              </p>
            )}
          </div>
        </div>
        <div className="w-full border-t-2 fixed bottom-4 pt-3 bg-white">
          <FlexBox className="px-4 gap-4">
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size="M"
              mode="outlined"
              placeholder="댓글을 입력하세요"
            />
            <div className="p-3 bg-black rounded-xl" onClick={() => console.log('댓글 게시')}>
              <Icon icon="add" className="fill-white" />
            </div>
          </FlexBox>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
