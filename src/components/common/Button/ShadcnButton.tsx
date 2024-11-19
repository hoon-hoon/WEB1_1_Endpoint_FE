interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'fill' | 'ghost';
  color?: 'primary' | 'secondary' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

export function ShadcnButton({
  children,
  variant = 'fill',
  color = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none';
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const variantStyles = {
    fill: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-red-600 text-white hover:bg-red-700',
      gray: 'bg-gray-600 text-white hover:bg-gray-700',
    },
    ghost: {
      primary: 'text-blue-600 bg-transparent hover:bg-blue-100',
      secondary: 'text-red-600 bg-transparent hover:bg-red-100',
      gray: 'text-gray-600 bg-transparent hover:bg-gray-100',
    },
  };

  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant][color]} ${className}`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
