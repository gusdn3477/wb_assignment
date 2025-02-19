import { ChangeEvent, useCallback, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}

const SignupModal = ({ isOpen, onClose, isEdit = false }: ModalProps) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleIdChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.validationMessage);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 모달이 열려있지 않다면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose} // 바깥쪽 클릭하면 닫힘
    >
      <div
        className="relative w-96 rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막음
      >
        {/* 닫기 버튼 */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
          ✕
        </button>
        <form onSubmit={handleSubmit} className="modal-content">
          <h2>회원 가입</h2>
          {isEdit ? (
            <input
              name="userId"
              placeholder="아이디"
              value={userId}
              onChange={handleIdChange}
              disabled
            />
          ) : (
            <input name="userId" placeholder="아이디" value={userId} onChange={handleIdChange} />
          )}

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <input name="name" placeholder="이름" value={name} onChange={handleNameChange} />
          <button type="submit">가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
