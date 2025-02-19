import { useEffect, useRef, useState } from 'react';

interface Option {
  id: number;
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function CustomSelect({ options, defaultValue, onChange }: SelectProps) {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value || '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[160px]" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <button
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-blue-500 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === selected)?.label || '선택하세요'}
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <ul className="absolute left-0 z-10 mt-1 w-full overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-600 shadow-lg">
          {options.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer px-4 py-2 transition hover:bg-blue-500 hover:text-white"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
