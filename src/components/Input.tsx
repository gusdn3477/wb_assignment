import { ChangeEvent } from 'react';

interface InputProps {
  type?: string;
  name: string;
  labelText?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
}
export default function Input({
  type = 'text',
  name,
  labelText,
  placeholder,
  value,
  onChange,
  disabled,
  className,
  required = false,
  error,
  errorMessage,
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {labelText && (
        <label htmlFor={name}>
          {labelText} {required && <span className="mb-3.5 text-red-600">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-8 w-7/10 ${disabled ? 'border-none' : 'rounded-md border'} `}
      />
      {error && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
}
