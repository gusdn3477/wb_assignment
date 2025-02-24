interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}
export default function Button({
  text,
  variant = 'primary',
  className,
  onClick,
  disabled = false,
}: ButtonProps) {
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
      className={`${getClassName()} h-10 w-16 rounded-md ${className} ${disabled ? 'opacity-0.7 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
