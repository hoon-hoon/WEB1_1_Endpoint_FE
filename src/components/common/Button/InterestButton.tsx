import { Button } from "@/shadcn/ui/button";

interface InterestButtonProps {
  label: string;
  selected: boolean;
  variant?: "sm" | "md" | "lg";
  onClick?: () => void;
}

function InterestButton({ label, selected, variant = "md", onClick }: InterestButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
  };

  return (
    <Button
      variant={selected ? "outline" : "ghost"}
      className={`w-full text-left ${sizeClasses[variant]} ${
        selected ? "shadow-sm bg-neutral-100" : "shadow-sm  bg-white border border-neutral-200"
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default InterestButton;
