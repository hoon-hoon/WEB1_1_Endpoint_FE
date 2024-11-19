import Avatar from '@eolluga/eolluga-ui/Display/Avatar';
import defaultImageURL from '@/shared/defaultImage';
import FlexBox from '@/shared/FlexBox';
import { Badge } from './common/Badge';
import { ShadcnButton } from './common/Button/ShadcnButton';

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
      <FlexBox className="gap-2 pb-1" direction="col">
        {/* 닉네임과 호스트 표시 */}
        <span className="text-sm font-medium mb-1 whitespace-nowrap">{member.nickName}</span>

        {/* 레이팅 배지 */}
        <Badge variant="secondary" className="mb-1">
          <span className="font-bold">{member.rating}</span>
        </Badge>

        {/* 호스트가 아닌 경우 강퇴 버튼 표시 */}
        {!member.isHost ? (
          <ShadcnButton variant="ghost" color="secondary" size="sm" onClick={handleExit}>
            <span className="font-extrabold">강퇴</span>
          </ShadcnButton>
        ) : (
          <p className="text-sm text-blue-500 py-1 font-extrabold">방장</p>
        )}
      </FlexBox>
    </div>
  );
}
