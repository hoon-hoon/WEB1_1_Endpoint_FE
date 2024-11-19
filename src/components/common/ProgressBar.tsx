interface ProgressBarProps {
  progress: number;
  color?: string;
}

export default function ProgressBar({ progress, color = 'black' }: ProgressBarProps) {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-black transition-all"
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
  );
}
