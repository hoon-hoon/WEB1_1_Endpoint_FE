import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import { AiOutlineCrown } from 'react-icons/ai';
import defaultImageURL from '@/assets/defaultImage';
import { Badge } from './common/Badge';

export type Member = {
  id: string;
  nickName: string;
  isHost: boolean;
  rating: number;
};

export default function MemberItem({
  member,
  handleExit,
}: {
  member: Member;
  handleExit: () => void;
}) {
  return (
    <div className="flex flex-col space-y-1 items-center justify-end text-center">
      <span className="border border-white rounded-full">
        <Avatar size="S" input="image" image={defaultImageURL} />
      </span>
      <div className="flex flex-col gap-2 pb-1">
        <span className="text-sm font-medium mb-1 whitespace-nowrap">{member.nickName}</span>

        <Badge variant="secondary" className="mb-1 flex justify-center">
          <span className="font-bold">{member.rating}</span>
        </Badge>

        {!member.isHost ? (
          <button
            className="inline-flex items-center justify-center font-medium rounded-md px-2 py-1 text-sm text-red-600 bg-transparent hover:bg-red-100 focus:outline-none"
            onClick={handleExit}
          >
            <span className="font-extrabold">강퇴</span>
          </button>
        ) : (
          <div className="flex justify-center items-center">
            <AiOutlineCrown size={28} color="blue" />
          </div>
        )}
      </div>
    </div>
  );
}
