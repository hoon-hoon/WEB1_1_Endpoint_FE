interface LabelProps {
  className?: string;
  htmlFor?: string;
  content: string;
}

const Label = ({ className, htmlFor, content }: LabelProps) => {
  return (
    <label
      className={`block text-base font-medium text-gray-700 mb-1 ${className}`}
      htmlFor={htmlFor}
    >
      {content}
    </label>
  );
};

export default Label;
