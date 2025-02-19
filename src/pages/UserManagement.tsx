import { useCallback, useState } from 'react';
import SignupModal from '@/components/SignupModal';

export default function UserManagement() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div>
      <h2>사용자 관리</h2>
      <SignupModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
}
