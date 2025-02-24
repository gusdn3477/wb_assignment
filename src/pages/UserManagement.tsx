import { useCallback, useState } from 'react';
import users from '@/data/Users';
import { User } from '@/types';
import { useModalStore } from '@/store/useModalStore';
import { formatDate } from '@/utils/formatDate';
import Button from '@/components/Button';
import Grid, { Column } from '@/components/Grid';
import Pagination from '@/component\s/Pagination';
import SignupModal from '@/components/SignupModal';

const SIZE = 25;

export default function UserManagement() {
  const modalOpen = useModalStore((state) => state.visible.signup);
  const setModalOpen = useModalStore((state) => state.handleOpen);
  const setModalClose = useModalStore((state) => state.handleClose);
  const [data, setData] = useState<User[]>(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const startIndex = (currentPage - 1) * SIZE;
  const selectedData = data.slice(startIndex, startIndex + SIZE);
  const [selectedUser, setSelectedUser] = useState<User>();

  const columns: Column<User>[] = [
    { key: 'id', label: '번호', hidden: true },
    { key: 'email', label: '아이디' },
    { key: 'name', label: '이름' },
    {
      key: 'last_login_at',
      label: '마지막 로그인 일시',
      render: (row) => <span>{formatDate(new Date(row.last_login_at))}</span>,
    },
    {
      key: 'edit',
      label: '수정',
      render: (row) => (
        <div className="flex items-center justify-center">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
            onClick={() => {
              handleEdit(row);
            }}
          >
            수정
          </button>
        </div>
      ),
      renderHeader: () => <div className="flex justify-center">{'상태'}</div>,
    },
  ];

  const handlePageChange = useCallback((id: number) => {
    setCurrentPage(id);
  }, []);

  const handleEdit = useCallback((user: User) => {
    setEditMode(true);
    setModalOpen('signup');
    setSelectedUser(user);
  }, []);

  const handleModalOpen = useCallback(() => {
    setEditMode(false);
    setModalOpen('signup');
  }, []);

  const handleModalClose = useCallback(() => {
    setModalClose('signup');
  }, []);

  return (
    <div>
      <h2>사용자 관리</h2>
      <Button text="생성" onClick={handleModalOpen} className="ml-2" />
      <Grid data={selectedData} columns={columns} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(data.length / 25)}
        onPageChange={handlePageChange}
        className="flex h-16 items-center justify-center"
      />
      <SignupModal
        open={modalOpen}
        onClose={handleModalClose}
        isEdit={editMode}
        user={selectedUser}
      />
    </div>
  );
}
