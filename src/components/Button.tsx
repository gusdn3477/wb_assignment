interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick: () => void;
}
export default function Button({ text, variant = 'primary', className, onClick }: ButtonProps) {
  const getClassName = () => {
    if (variant === 'primary') {
      return 'bg-blue-500 text-white';
    }
    if (variant === 'secondary') {
      return 'bg-gray-300 text-black';
    }
  };
  return (
    <button
      type="button"
      className={`${getClassName()} h-12 w-16 rounded-md ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
