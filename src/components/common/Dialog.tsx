import Button from './Button/Button';
import FlexBox from '@/components/layout/FlexBox';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

export interface DialogProps {
  open: boolean;
  title: string;
  leftText?: string;
  rightText?: string;
  description?: string;
  leftOnClick?: () => void;
  rightOnClick?: () => void;
  onClose?: () => void;
}

export default function Dialog({
  open,
  title,
  description,
  leftText,
  rightText,
  leftOnClick,
  rightOnClick,
  onClose,
}: DialogProps) {
  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="max-w-xs flex flex-col justify-center items-center p-4 bg-white rounded-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-center font-bold text-lg text-balance"> {title}</p>
          <button onClick={onClose} className="absolute top-4 right-2">
            <Icon icon={'close'} size={28} />
          </button>

          {description && <div className="p-4 text-neutral-500 ">{description}</div>}
          {(leftText || rightText) && (
            <FlexBox className="gap-4 mt-4 justify-around items-center w-full">
              {leftText && (
                <Button size="long" color="black" onClick={leftOnClick} label={leftText} />
              )}
              {rightText && (
                <Button
                  size="long"
                  variant="unfill"
                  color="black"
                  onClick={rightOnClick}
                  label={rightText}
                />
              )}
            </FlexBox>
          )}
        </div>
      </div>
    )
  );
}
