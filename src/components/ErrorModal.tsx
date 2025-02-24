import Button from './Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal = ({ open, onClose }: ModalProps) => {
  // 모달이 열려있지 않다면 렌더링하지 않음
  if (!open) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="relative w-[420px] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막음
      >
        <p>
          에러가 발생했습니다. <br />
          같은 현상이 반복되면 고객센터에 문의 바랍니다.
        </p>

        <p className="mt-4">* 고객센터 이메일</p>
        <p>- email: helpdesk@wisebirds.ai</p>
        <div className="flex h-16 w-full items-end justify-end">
          <Button variant="primary" text={'확인'} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
