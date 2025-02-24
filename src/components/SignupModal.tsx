import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { UserRepository } from '@/apis/UserRepository';
import { User } from '@/types';
import { useModalStore } from '@/store/useModalStore';
import { emailRegex, nameRegex, passwordRegex } from '@/utils/regex';
import Button from './Button';
import Input from './Input';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  user?: User;
}

const SignupModal = ({ open, onClose, isEdit = false, user }: ModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');

  const modalOpen = useModalStore((state) => state.handleOpen);

  const nameError = name.length > 0 && !nameRegex.test(name);
  const passwordError = password.length > 0 && !passwordRegex.test(password);
  const emailError = email.length > 0 && !emailRegex.test(email);

  const init = () => {
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setName('');
  };

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const handleSubmit = async () => {
    if (!isEdit) {
      const response = await UserRepository.create({
        name,
        email,
        password,
        repeat_password: repeatPassword,
      });

      if (response?.result === true) {
        alert('회원가입 성공!');
      } else {
        modalOpen('error');
      }
    } else {
      const response = await UserRepository.patch({
        id: user?.id as number,
        name: name,
      });

      if (response?.result === true) {
        alert('회원 수정 성공!');
      } else {
        modalOpen('error');
      }
    }
  };
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleModalClose();
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleModalClose]);

  // 모달이 열려있지 않다면 렌더링하지 않음
  if (!open) return null;

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleModalClose} // 바깥쪽 클릭하면 닫힘
    >
      <div
        className="relative w-[540px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막음
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={handleModalClose}
        >
          ✕
        </button>
        <form className="flex h-full flex-col">
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-bold">{isEdit ? '사용자 수정' : '사용자 생성'}</h2>
            <Input
              name="userId"
              value={isEdit ? (user?.email as string) : email}
              onChange={handleEmailChange}
              labelText="아이디"
              disabled={isEdit}
              required
              error={emailError}
              errorMessage={'올바른 이메일 주소를 입력하세요.'}
            />
            {!isEdit && (
              <>
                <Input
                  type="password"
                  name="password"
                  labelText="비밀번호"
                  placeholder="영문, 숫자, 특수문자 포함 8~15자"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-4"
                  error={passwordError}
                  errorMessage="8~15자 영문, 숫자, 특수문자를 사용하세요."
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
                  error={repeatPassword.length > 0 && password !== repeatPassword}
                  errorMessage={'비밀번호가 일치하지 않습니다.'}
                />
              </>
            )}

            <Input
              name="name"
              labelText="이름"
              value={name}
              onChange={handleNameChange}
              className="mt-4"
              required
              error={nameError}
              errorMessage={'이름을 올바르게 입력하세요'}
            />
          </div>
          <div className="flex h-20 w-full items-center justify-center">
            <div className="flex w-[140px] justify-between">
              <Button variant="secondary" text="취소" onClick={handleModalClose} />
              <Button variant="primary" text={isEdit ? '저장' : '생성'} onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
