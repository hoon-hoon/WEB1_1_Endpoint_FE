interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return <main className={`flex-1 pt-20 pb-6 px-4 ${className}`}>{children}</main>;
};

export default Container;
