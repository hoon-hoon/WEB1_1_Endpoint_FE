import Button from './Button/Button';
import FlexBox from '@/shared/FlexBox';
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
          <div className="flex flex-row justify-between items-start gap-4">
            <div className="flex flex-col body-04-bold whitespace-nowrap">
              {label && <div>{label}</div>}
              {title}
            </div>
            {dismissible && (
              <button onClick={onClose} className="mr-2">
                <Icon icon={'close'} size={24} />
              </button>
            )}
          </div>
          {description && <div className="body-02-regular">{description}</div>}
          {(leftText || rightText) && (
            <FlexBox className="gap-4 mt-4 justify-around items-center w-full">
              {leftText && (
                <Button size="long" color="black" onClick={leftOnClick} label={leftText} />
              )}
              {rightText && (
                <Button size="long" color="black" onClick={rightOnClick} label={rightText} />
              )}
            </FlexBox>
          )}
        </div>
      </div>
    )
  );
}
