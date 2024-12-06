interface FlexBoxProps {
  className?: string;
  direction?: 'row' | 'col';
  children: React.ReactNode;
}

export default function FlexBox({ className, direction, children }: FlexBoxProps) {
  return (
    <div
      className={`flex ${
        direction === 'col' ? 'flex-col' : 'flex-row'
      } max-w-xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
