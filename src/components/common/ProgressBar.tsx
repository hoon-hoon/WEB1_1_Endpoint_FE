interface ProgressBarProps {
  progress: number;
  colorClass?: string;
}

export default function ProgressBar({ progress, colorClass = 'bg-black' }: ProgressBarProps) {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full transition-all ${colorClass}`} style={{ width: `${progress}%` }} />
    </div>
  );
}
