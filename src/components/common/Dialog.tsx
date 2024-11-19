import Button from './Button/Button';
import Icon from '@eolluga/eolluga-ui/icon/Icon';

export interface DialogProps {
  open: boolean;
  title: string;
  leftText?: string;
  rightText?: string;
  dismissible?: boolean;
  description?: string;
  label?: string;
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
  dismissible = true,
  leftOnClick,
  rightOnClick,
  label,
  onClose,
}: DialogProps) {
  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className="w-[320px] flex flex-col justify-center items-center p-6 bg-white rounded-xl"
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
            <div className="flex flex-row gap-spacing-02 w-[272px] mt-spacing-06 justify-around items-center">
              {leftText && (
                <Button size="long" color="gray" onClick={leftOnClick} label={leftText} />
              )}
              {rightText && (
                <Button size="long" color="gray" onClick={rightOnClick} label={rightText} />
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
}
