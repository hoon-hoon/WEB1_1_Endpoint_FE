interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className={`p-6 mb-6 bg-white border rounded-lg ${className}`}>{children}</div>
    </div>
  );
};

export default Card;
