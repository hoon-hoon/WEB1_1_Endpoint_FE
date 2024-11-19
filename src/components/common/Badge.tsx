interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'gray';
}

export function Badge({ children, variant = 'primary', className = '', ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium';
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-green-100 text-green-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <span className={styles} {...props}>
      {children}
    </span>
  );
}
