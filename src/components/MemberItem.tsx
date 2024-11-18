import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import defaultImageURL from '@/shared/defaultImage';

export type Member = {
  id: string;
  nickName: string;
  isHost: boolean;
  rating: number;
};

export default function MemberItem({ member }: { member: Member }) {
  return (
    <div className="flex flex-col space-y-1 items-center justify-end text-center">
      <span className="border border-white rounded-full">
        <Avatar size="S" input="image" image={defaultImageURL} />
      </span>
      <div className="pb-2">
        <p className="body-02-medium-compact text-[#6F6F6F]">{member.nickName}</p>
        <p className="body-01-medium-compact text-[#6F6F6F]">{member.rating}</p>
      </div>
    </div>
  );
}
