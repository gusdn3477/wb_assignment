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
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-8 w-7/10 rounded-md border`}
      />
    </div>
  );
}
