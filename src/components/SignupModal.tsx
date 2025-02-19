import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const SignupModal = ({ open, onClose, isEdit = false }: ModalProps) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');

  const init = () => {
    setUserId('');
    setPassword('');
    setRepeatPassword('');
    setName('');
  };

  const handleIdChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handlerepeatPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  }, []);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleModalClose = useCallback(() => {
    init();
    onClose();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // 모달이 열려있지 않다면 렌더링하지 않음
  if (!open) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // 바깥쪽 클릭하면 닫힘
    >
      <div
        className="relative h-[480px] w-[540px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막음
      >
        {/* 닫기 버튼 */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-bold">사용자 생성</h2>
            <Input
              name="userId"
              value={userId}
              onChange={handleIdChange}
              labelText="아이디"
              disabled={isEdit}
              required
            />
            <Input
              type="password"
              name="password"
              labelText="비밀번호"
              placeholder="영문, 숫자, 특수문자 포함 8~15자"
              value={password}
              onChange={handlePasswordChange}
              className="mt-4"
              required
            />

            <Input
              type="password"
              name="repeatPassword"
              labelText="비밀번호 확인"
              value={repeatPassword}
              onChange={handlerepeatPasswordChange}
              className="mt-4"
              required
            />

            <Input
              name="name"
              labelText="이름"
              value={name}
              onChange={handleNameChange}
              className="mt-4"
              required
            />
          </div>
          <div className="flex h-12 w-full items-center justify-center">
            <Button variant="secondary" text="취소" onClick={handleModalClose} />
            <Button variant="primary" text="생성" onClick={() => alert('확인')} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
