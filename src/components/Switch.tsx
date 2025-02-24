interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const Switch = ({ checked, onChange, disabled = false }: SwitchProps) => {
  const handleToggle = () => {
    if (disabled) return;
    onChange();
  };

  return (
    <button
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${checked ? 'bg-blue-500' : 'bg-gray-300'} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      onClick={handleToggle}
      disabled={disabled}
    >
      <span
        className={`absolute left-1 h-4 w-4 transform rounded-full bg-white transition ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default Switch;
